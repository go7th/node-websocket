import MySQLdb
# get user input
# connect
conn = MySQLdb.connect(host="127.0.0.1", user="root", passwd="root", db="test",charset="utf8")

# create a cursor
cursor = conn.cursor()
# execute SQL statement
print("INSERT INTO authors (email,name) VALUES (%s,%s)"%("35135@qq.com","name"))

cursor.execute("update authors set email='2515@qq.com' where id=1")
# get ID of last inserted record
print("ID of last record is ", int(cursor.lastrowid))
print("ID of inserted record is ", int(conn.insert_id()))
conn.commit()
