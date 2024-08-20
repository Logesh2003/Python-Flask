import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const UpdateEmployee = () => {
    const { id } = useParams();  // Get the employee ID from the URL
    const navigate = useNavigate();
    const [employee, setEmployee] = useState({
        first_name: '',
        last_name: '',
        dob: '',
        emp_id: '',
        joining_date: ''
    });

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/employees/${id}`);
            setEmployee(response.data);
        } catch (err) {
            console.error('Error fetching employee details', err);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/employees/${id}`, employee, {
                withCredentials: true
            });
            navigate('/');  // Redirect to the employee list page after successful update
        } catch (err) {
            console.error('Error updating employee', err);
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="text-primary mb-4">Update Employee</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="first_name"
                        value={employee.first_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formLastName" className="mt-3">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="last_name"
                        value={employee.last_name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formDOB" className="mt-3">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                        type="date"
                        name="dob"
                        value={employee.dob}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formEmpID" className="mt-3">
                    <Form.Label>Employee ID</Form.Label>
                    <Form.Control
                        type="text"
                        name="emp_id"
                        value={employee.emp_id}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="formJoiningDate" className="mt-3">
                    <Form.Label>Joining Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="joining_date"
                        value={employee.joining_date}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className="mt-4">
                    Update Employee
                </Button>
            </Form>
        </div>
    );
};

export default UpdateEmployee;
