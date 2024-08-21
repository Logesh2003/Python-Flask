from flask import Flask, request, jsonify, session
from dbconnection import create_connection, close_connection
from flask_cors import CORS
from functools import wraps
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app, supports_credentials=True)

@app.route('/login', methods=['POST'])
def login():
    userName = request.form.get('userName')
    password = request.form.get('password')

    connection = create_connection()
    cursor = connection.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE username = %s AND password = %s", (userName, password))
    user = cursor.fetchone()
    close_connection(connection)

    if user:
        session['user'] = userName
        return "Login successful", 200
    else:
        return "Invalid username or password", 401

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        if 'user' not in session:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return wrap

@app.route('/addEmp', methods=['POST'])
def add_employee():
    data = request.json
    try:
        dob = datetime.strptime(data['dob'], '%Y-%m-%d')
        joining_date = datetime.strptime(data['joining_date'], '%Y-%m-%d')
        
        connection = create_connection()
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO employees (first_name, last_name, dob, emp_id, joining_date) VALUES (%s, %s, %s, %s, %s)",
            (data['first_name'], data['last_name'], dob, data['emp_id'], joining_date)
        )
        connection.commit() 
        close_connection(connection)
        return jsonify({"message": "Employee added successfully"}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
@app.route('/employees', methods=['GET'])
def get_employees():
    sort_by = request.args.get('sort_by', 'id')  
    direction = request.args.get('direction', 'asc') 
    
    valid_sort_columns = ['first_name', 'last_name', 'dob', 'emp_id', 'joining_date']
    if sort_by not in valid_sort_columns:
        sort_by = 'id'
    if direction not in ['asc', 'desc']:
        direction = 'asc'
    
    connection = create_connection()
    if connection is None:
        return jsonify({'error': 'Unable to connect to the database'}), 500
    
    cursor = connection.cursor(dictionary=True)
    
    query = f"""
    SELECT * FROM employees
    ORDER BY {sort_by} {direction}
    """
    
    try:
        cursor.execute(query)
        employees = cursor.fetchall()
        return jsonify(employees)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    finally:
        cursor.close()
        close_connection(connection)
        
        

if __name__ == '__main__':
    app.run(debug=True)
