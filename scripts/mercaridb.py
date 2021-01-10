import sqlite3
import mercari

def get_connection():
	conn = sqlite3.connect('db/tiger_shi.sqlite3', isolation_level=None)
	cursor = conn.cursor()
	return conn, cursor

def search_mercari():
	conn, cursor = get_connection()
	cur = cursor.execute('SELECT term FROM search_terms WHERE site="mercari" OR site="all"')

	search_terms = cur.fetchall()
	try:
		for term in search_terms:
			term = term[0]
			for item in mercari.search(term, use_google_proxy=False):
				# If it's not already in the database, add it
				if cursor.execute('SELECT url FROM mercari_results WHERE url=?', (item.productURL,)).fetchone() is None:
					cursor.execute('INSERT INTO mercari_results(term, url, imageURL, name, price) VALUES(?, ?, ?, ?, ?)', (term, item.productURL, item.imageURL, item.productName, item.price))
	except Exception as e:
		print(e)

	conn.close()

if __name__ == '__main__':
	search_mercari()
