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

@app.route('/login/', methods=['POST'])
def login():
    conn, cursor = get_connection()
    cur = cursor.execute('SELECT password FROM users WHERE username=?',
                                 (flask.request.form['username'],))
    password = cur.fetchone()
    conn.close()
    # user doesn't exist
    if password is None or not login_password_check(flask.request.form['password'], password[0]):
        flask.abort(403)

    flask.session['username'] = flask.request.form['username']
    return 'Welcome, ' + flask.request.form['username'], 200

@app.route('/logout/', methods=['GET'])
def logout():
    flask.session.clear()
    return 'Successfully logged out', 200

@app.route('/create_account/', methods=['POST'])
def create_account():
    if len(flask.request.form['password']) == 0:
        return "Password can't be blank", 400
    conn, cursor = get_connection()
    cur = cursor.execute('SELECT username FROM users WHERE username=?',
                             (flask.request.form['username'],))
    user = cur.fetchone()

    if user is not None:
        return "Username already in existence.", 409

    password = create_password(flask.request.form['password'])

    cursor.execute('INSERT INTO users(username, password) VALUES(?, ?)', (flask.request.form['username'], password,))
    conn.close()
    flask.session['username'] = flask.request.form['username']
    return 'Account successfully created.', 200


@app.route('/mercari/', methods=['GET'])
def search_mercari():
    conn, cursor = get_connection()
    cur = cursor.execute('SELECT term FROM search_terms WHERE site="mercari" OR site="all"')

    search_terms = list(cur.fetchall()[0])
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

