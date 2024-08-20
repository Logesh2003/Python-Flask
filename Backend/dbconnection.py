import mysql.connector
from mysql.connector import Error

def create_connection():
    connection = None
    try:
        connection = mysql.connector.connect(
            host="localhost", 
            user="root", 
            password="Dharshini@96",  
            database="test_db"  
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

def close_connection(connection):
    if connection:
        connection.close()
        print("The connection is closed")
