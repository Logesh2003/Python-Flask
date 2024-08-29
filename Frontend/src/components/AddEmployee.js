import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [employeeData, setEmployeeData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        empId: '',
        joiningDate: ''
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployeeData({
            ...employeeData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/addEmp', employeeData, { withCredentials: true });

            setMessage(response.data.message);

            // Reset form fields
            setEmployeeData({
                firstName: '',
                lastName: '',
                dob: '',
                empId: '',
                joiningDate: ''
            });

            navigate('/employees');
        } catch (err) {
            console.error("Error adding employee:", err.response ? err.response.data : err.message);
            setMessage('Error adding employee');
            
        }
    };

    return (
        <div className="container mt-5">
            <h3 className="mb-4 text-center">Add Employee</h3>
            <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: '600px' }}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            className="form-control"
                            value={employeeData.firstName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            className="form-control"
                            value={employeeData.lastName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="date"
                            name="dob"
                            className="form-control"
                            value={employeeData.dob}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            name="empId"
                            placeholder="Employee ID"
                            className="form-control"
                            value={employeeData.empId}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3 justify-content-center">
                    <div className="col-md-6">
                        <input
                            type="date"
                            name="joiningDate"
                            className="form-control"
                            value={employeeData.joiningDate}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {message && <div className="alert alert-info text-center">{message}</div>}
                <div className="text-center">
                    <button type="submit" className="btn btn-primary">Add Employee</button>
                </div>
            </form>
        </div>
    );
};

export default AddEmployee;
