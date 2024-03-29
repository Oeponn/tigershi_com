import flask
from flask import Flask
import mercari
import os
import sqlite3
import hashlib
import uuid
import sys

app = Flask(__name__)

# Use the environment secret if it's set
app.config['SECRET_KEY'] = os.environ.get('FLASK_SECRET_KEY', b'\xa3P\x13\xaeg\x86%\x93\xde]R\xc38K\xc4\xef\x88c\xe4\xb5h\xb4\xc5\xea')

USE_MERCARI_DATABASE = True

def get_connection():
	conn = sqlite3.connect('../db/tiger_shi.sqlite3', isolation_level=None)
	cursor = conn.cursor()
	return conn, cursor

def login_password_check(given_password, db_password):
	# processing given password to see if its salted sha512 hash is the same as db

	algorithm = 'sha512'
	salt = db_password.split('$')[1]
	hash_obj = hashlib.new(algorithm)
	password_salted = salt + given_password
	hash_obj.update(password_salted.encode('utf-8'))
	password_hash = hash_obj.hexdigest()
	return db_password == "$".join([algorithm, salt, password_hash])

def create_password(given_password):
	password = given_password
	algorithm = 'sha512'
	salt = uuid.uuid4().hex
	hash_obj = hashlib.new(algorithm)
	password_salted = salt + password
	hash_obj.update(password_salted.encode('utf-8'))
	password_hash = hash_obj.hexdigest()
	return "$".join([algorithm, salt, password_hash])

def mercari_pull():
	conn, cursor = get_connection()

	cur = cursor.execute('SELECT term FROM search_terms WHERE site="mercari" OR site="all"')

	search_terms = cur.fetchall()
	temporary = cursor.execute('SELECT * FROM mercari_results WHERE term=? OR term=?', ("serial experiments lain","シリアルエクスペリメンツレイン",)).fetchall()
	# print("TWO LAINS TOGETHER:", len(temporary))
	try:
		for term in search_terms:
			term = term[0]
			print(term)
			searched = mercari.search(term, use_google_proxy=False)


			temp = cursor.execute('SELECT DISTINCT * FROM mercari_results WHERE term=?', (term,)).fetchall()
			print("In database:", len(temp))

			num_searched = 0
			for item in searched:
				num_searched += 1
				# If it's not already in the database, add it
				oneitem = cursor.execute('SELECT url FROM mercari_results WHERE url=?', (item.productURL,)).fetchone()
				# if term == "シリアルエクスペリメンツレイン" or term == "serial experiments lain":
				# 	print(oneitem[0], item.productURL)
				if oneitem is None:
					print("FOUND ONE THAT'S NOT IN HERE")
					cursor.execute('INSERT INTO mercari_results(term, url, imageURL, name, price) VALUES(?, ?, ?, ?, ?)', (term, item.productURL, item.imageURL, item.productName, item.price))
				else:
					original_price = int(cursor.execute('SELECT price FROM mercari_results WHERE url=?', (item.productURL,)).fetchone()[0])
					if original_price > item.price:
						cursor.execute('DELETE FROM mercari_results WHERE url=?', (item.productURL,))
						cursor.execute('INSERT INTO mercari_results(term, url, imageURL, name, price) VALUES(?, ?, ?, ?, ?)', (term, item.productURL, item.imageURL, item.productName, item.price))
					# pass
			print("SEARCHED TERMS FOR",term, ":", num_searched)

	except Exception as e:
		print(e)
		conn.close()
		return 500

	conn.close()
	return 200

@app.route('/')
def home():
	return "Hello!", 200

@app.route('/test/')
def test():
	return "test", 200

@app.route('/api/loggedin/', methods=['GET'])
def loggedin():
	response = {
		"response" : {
			"logged_in": False, 
			"login_type": 0, 
			"user": ""
		}
	}
	if 'username' in flask.session:
		response['response']['logged_in'] = True
		response['response']['login_type'] = 2
		response['response']['user'] = flask.session['username']
		return response, 200
	return response, 200

@app.route('/api/login/', methods=['POST'])
def login():
	req = flask.request.get_json()
	response = {
		"response" : {
			"logged_in": False, 
			"login_type": 0, 
			"user": ""
		}
	}
	if 'username' in flask.session and req['username'] == flask.session['username']:
		print(flask.session['username'])
		print(req['username'])
		response['response']['logged_in'] = True
		response['response']['login_type'] = 2
		response['response']['user'] = flask.session['username']
		return response, 200

	conn, cursor = get_connection()
	cur = cursor.execute('SELECT password, role FROM users WHERE username=?',
								 (req['username'],))
	password = cur.fetchone()
	conn.close()
	# user doesn't exist
	if password is None or not login_password_check(req['password'], password[0]):
		# flask.abort(403)
		flask.session.clear()
		pass
	else:
		flask.session['username'] = req['username']
		flask.session['role'] = password[1]
		response['response']['logged_in'] = True
		response['response']['login_type'] = 1
		response['response']['user'] = flask.session['username']

	return response, 200

@app.route('/api/logout/', methods=['GET'])
def logout():
	flask.session.clear()
	return 'Successfully logged out', 200

@app.route('/api/create_account/', methods=['POST'])
def create_account():
	req = flask.request.get_json()

	if len(req['password']) == 0:
		return "Password can't be blank", 400
	conn, cursor = get_connection()
	cur = cursor.execute('SELECT username FROM users WHERE username=?',
							 (req['username'],))
	user = cur.fetchone()

	if user is not None:
		return "Username already in existence.", 409

	password = create_password(req['password'])

	cursor.execute('INSERT INTO users(username, password, role) VALUES(?, ?, ?)', (req['username'], password, 'user',))
	conn.close()
	flask.session['username'] = req['username']
	return 'Account successfully created.', 200

@app.route('/api/change_role/', methods=['POST'])
def change_role():
	if 'username' not in flask.session or 'role' not in flask.session or role != 'owner' or role != 'admin':
		flask.abort(403)

	req = flask.request.get_json()

	if req['username'] is None:
		flask.abort(404)
	if req['role'] is None:
		req['role'] = 'user'
	conn, cursor = get_connection()
	cursor.execute('UPDATE users SET role = ? WHERE username = ?', (req['role'], req['username'],))

@app.route('/api/mercari/', methods=['GET'])
def search_mercari():
	conn, cursor = get_connection()
	results = {}
	results['results'] = []

	# If there are results already in the database, use those 
	if USE_MERCARI_DATABASE and cursor.execute('SELECT url FROM mercari_results LIMIT 1').fetchone() is not None:
		# Order results so that the newest results are returned first
		cur = cursor.execute('SELECT * FROM mercari_results ORDER BY timestamp DESC')
		mercari_results = cur.fetchall()
		for result in mercari_results:
			results['results'].append({
					"term": result[0],
					"url": result[1],
					"imageURL": result[2],
					"name": result[3],
					"price": result[4],
					"timestamp": result[5]
				})

	else:
		cur = cursor.execute('SELECT term FROM search_terms WHERE site="mercari" OR site="all"')

		search_terms = cur.fetchall()
		if len(search_terms) == 0:
			print('There are no search terms')

		try:
			for term in search_terms:
				term = term[0]
				for item in mercari.search(term, use_google_proxy=False):
					results['results'].append({
							"term": term,
							"url": item.productURL,
							"imageURL": item.imageURL,
							"name": item.productName,
							"price": item.price
						})
		except Exception as e:
			return 'Internal Server Error', 500
	conn.close()
	return results, 200

@app.route('/api/mercari_refresh/', methods=['GET'])
def refresh_mercari():
	print("Fetching /api/mercari_refresh/")
	# print('Hello world!', file=sys.stderr)
	if 'username' not in flask.session or 'role' not in flask.session or flask.session['role'] != 'owner' and flask.session['role'] != 'admin':
		flask.abort(403)
	return "Refreshed database.", mercari_pull()


@app.route('/api/get_search_terms/', methods=['GET'])
def get_search_terms():
	if 'username' not in flask.session:
		flask.abort(403)

	conn, cursor = get_connection()
	cur = cursor.execute('SELECT * FROM search_terms')
	cur = cur.fetchall()

	return {'results': cur}


@app.route('/api/add_search_term/', methods=['POST'])
def add_search_term():
	if 'username' not in flask.session or 'role' not in flask.session or flask.session['role'] != 'owner' or flask.session['role'] != 'admin':
		flask.abort(403)

	req = flask.request.get_json()

	conn, cursor = get_connection()

	cur = cursor.execute('SELECT * FROM search_terms WHERE term=?', (req['term'],))
	cur = cur.fetchall()

	if cur is not None:
		# if site is all then delete all copies of the term with different sites to avoid double querying
		if req['site'] == 'all':
			cursor.execute('DELETE FROM search_terms WHERE term=?', (req['term']))


	cursor.execute('INSERT INTO search_terms(term, site) VALUES(?, ?)', (req['term'], req['site']))
	conn.close()
	return "Term successfully added", 200

