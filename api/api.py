import flask
from flask import Flask
import mercari

app = Flask(__name__)

app.config['SECRET_KEY'] = b'\xa3P\x13\xaeg\x86%\x93\xde]R\xc38K\xc4\xef' \
                          b'\x88c\xe4\xb5h\xb4\xc5\xea'

@app.route('/test/')
def test():
    return "test"

@app.route('/login/', methods=['POST'])
def login():
    if flask.request.form['username'] != 'oponn':
        flask.abort(403)
    flask.session['username'] = flask.request.form['username']
    return {}, 200

@app.route('/logout/', methods=['GET'])
def logout():
    flask.session.clear()
    return {}, 200


@app.route('/mercari/', methods=['GET'])
def search_mercari():
    search_terms = ["東方 ふもふも"]
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

    return results

