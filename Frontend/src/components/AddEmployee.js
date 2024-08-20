import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddEmployee = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [empId, setEmpId] = useState('');
    const [joiningDate, setJoiningDate] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/addEmp', {
                first_name: firstName,
                last_name: lastName,
                dob,
                emp_id: empId,
                joining_date: joiningDate
            }, { withCredentials: true });

            setMessage(response.data.message); 

            setFirstName('');
            setLastName('');
            setDob('');
            setEmpId('');
            setJoiningDate('');


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
                            placeholder='First Name'
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder='Last Name'
                            className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <input
                            type="date"
                            className="form-control"
                            value={dob}
                            onChange={(e) => setDob(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <input
                            type="text"
                            placeholder='Employee ID'
                            className="form-control"
                            value={empId}
                            onChange={(e) => setEmpId(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="row mb-3 justify-content-center">
                    <div className="col-md-6">
                        <input
                            type="date"
                            className="form-control"
                            value={joiningDate}
                            onChange={(e) => setJoiningDate(e.target.value)}
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
