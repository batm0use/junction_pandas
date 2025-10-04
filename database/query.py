import sqlite3
import pandas as pd

conn = sqlite3.connect("uber.db")
cursor = conn.cursor()

# Prepared statement (parameterized query)
query = "SELECT * FROM earners WHERE earner_id = ? LIMIT ?"

# Example parameters
earner_id = "E10000"

limit = 5

cursor.execute(query, (earner_id, limit))
rows = cursor.fetchall()

for row in rows:
    print(row)

conn.close()