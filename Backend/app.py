from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from functools import wraps
from datetime import datetime, timedelta
import pytz
import jwt

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app, supports_credentials=True)

JWT_SECRET = 'your_jwt_secret'
JWT_ALGORITHM = 'HS256'

def create_connection():
    try:
        client = MongoClient("mongodb://localhost:27017/")
        db = client.login
        return db
    except Exception as e:
        print(f"Connection failed: {e}")
        return None

@app.route('/login', methods=['POST'])
def login():
    userName = request.form.get('userName')
    password = request.form.get('password')

    db = create_connection()
    if db is None:
        return "Unable to connect to the database", 500
    
    user = db.credentials.find_one()
    if user:
        payload = {
            "userName": userName,
            "exp": datetime.utcnow() + timedelta(hours=1)
        }
        token = jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)
        return jsonify({"token": token}), 200
    else:
        return "Invalid username or password", 401

def login_required(f):
    @wraps(f)
    def wrap(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({"error": "Unauthorized"}), 401
        
        try:
            decoded = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token has expired"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Invalid token"}), 401
        
        return f(*args, **kwargs)
    return wrap

@app.route('/addEmp', methods=['POST'])
def add_employee():
    data = request.json
    db = create_connection()
    
    if db is None:
        return "Unable to connect to the database", 500
    
    try:
        dob = datetime.strptime(data['dob'], '%Y-%m-%d').replace(tzinfo=pytz.UTC)
        joiningDate = datetime.strptime(data['joiningDate'], '%Y-%m-%d').replace(tzinfo=pytz.UTC)
        
        employee = {
            "firstName": data['firstName'],
            "lastName": data['lastName'],
            "dob": dob,
            "empId": data['empId'],
            "joiningDate": joiningDate
        }

        existing_employee = db.employees.find_one({"empId": employee["empId"]})
        if existing_employee:
            return jsonify({"message": "Employee with this ID already exists"}), 400

        db.employees.insert_one(employee)
        return jsonify({"message": "Employee added successfully"}), 201

    except Exception as e:
        return jsonify({"message": str(e)}), 400

@app.route('/employees', methods=['GET'])
def get_employees():
    sort_by = request.args.get('sort_by', '_id')
    direction = 1 if request.args.get('direction', 'asc') == 'asc' else -1
    
    if sort_by == 'id':
        sort_by = '_id'
    
    try:
        db = create_connection()
        employees = list(db.employees.find().sort(sort_by, direction))
        print(employees)
        for emp in employees:
            emp['_id'] = str(emp['_id'])
        
        return jsonify(employees), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
