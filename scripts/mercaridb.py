import sqlite3
import mercari
import sys
import datetime

def get_connection():
	conn = sqlite3.connect('db/tiger_shi.sqlite3', isolation_level=None)
	cursor = conn.cursor()
	return conn, cursor

def prune():
	conn, cursor = get_connection()
	cur = cursor.execute('SELECT * FROM mercari_results')
	results = cur.fetchall()

	now = datetime.datetime.now()

	for result in results:
		dt = datetime.datetime.strptime(result[5], '%Y-%m-%d %H:%M:%S')
		if (now - dt).days > 2:
			# prune
			cursor.execute('DELETE FROM mercari_results WHERE url=?', (result[1],))
			print('PRUNING')

def search_mercari():
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
		return 0
	conn.close()
	prune()
	return 1

if __name__ == '__main__':
	search_mercari()
