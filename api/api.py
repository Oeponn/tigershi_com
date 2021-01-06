import flask
from flask import Flask
import mercari
import os
import sqlite3
import hashlib
import uuid

app = Flask(__name__)

app.config['SECRET_KEY'] = b'\xa3P\x13\xaeg\x86%\x93\xde]R\xc38K\xc4\xef' \
                          b'\x88c\xe4\xb5h\xb4\xc5\xea'

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
    password = flask.request.form['password']
    algorithm = 'sha512'
    salt = uuid.uuid4().hex
    hash_obj = hashlib.new(algorithm)
    password_salted = salt + password
    hash_obj.update(password_salted.encode('utf-8'))
    password_hash = hash_obj.hexdigest()
    return "$".join([algorithm, salt, password_hash])

@app.route('/')
def home():
    return "Hello!", 200

@app.route('/test/')
def test():
    return "test", 200

@app.route('/api/login/', methods=['POST'])
def login():
    req = flask.request.get_json()

    conn, cursor = get_connection()
    cur = cursor.execute('SELECT password, role FROM users WHERE username=?',
                                 (req['username'],))
    password = cur.fetchone()
    conn.close()
    # user doesn't exist
    if password is None or not login_password_check(req['password'], password[0]):
        flask.abort(403)

    flask.session['username'] = req['username']
    flask.session['role'] = password[1]
    return 'Welcome, ' + flask.session['role'] + ' ' + req['username'], 200

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
    cur = cursor.execute('SELECT term FROM search_terms WHERE site="mercari" OR site="all"')

    search_terms = list(cur.fetchall()[0])

    conn.close()
    print(search_terms)
    results = {}
    try:
        for term in search_terms:
            results[term] = []
            for item in mercari.search(term, use_google_proxy=False):
                results[term].append({
                        "url": item.productURL,
                        "imageURL": item.imageURL,
                        "name": item.productName,
                        "price": item.price
                    })
    except Exception as e:
        return 'Internal Server Error', 500

    return results, 200


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




