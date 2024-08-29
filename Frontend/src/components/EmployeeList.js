import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [sortBy, setSortBy] = useState('firstName'); // Default to firstName
    const [sortDirection, setSortDirection] = useState('asc');
    const navigate = useNavigate();

    useEffect(() => {
        fetchEmployees();
    }, [sortBy, sortDirection]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employees', {
                params: { sort_by: sortBy, direction: sortDirection },
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Attach the token
                },
                withCredentials: true
            });
            setEmployees(response.data);
        } catch (err) {
            console.error('Error fetching employees:', err);
            navigate('/');
        }
    };

    const handleSort = (column) => {
        if (sortBy === column) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortDirection('asc');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('token');
            navigate('/');
        }
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-primary">Employee List</h3>
                <div>
                    <Button variant="outline-danger" onClick={handleLogout} className="me-3">
                        Logout
                    </Button>
                    <Link to="/add-employee" className="btn btn-outline-primary">
                        Add Employee
                    </Link>
                </div>
            </div>
            <div className="d-flex justify-content-end mb-3">
                <DropdownButton
                    id="dropdown-sort-button"
                    title={`Sort by ${sortBy.replace('_', ' ').toUpperCase()} (${sortDirection === 'asc' ? '▲' : '▼'})`}
                    variant="outline-secondary"
                >
                    <Dropdown.Item onClick={() => handleSort('firstName')}>First Name</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('lastName')}>Last Name</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('dob')}>Date of Birth</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('empId')}>Employee ID</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('joiningDate')}>Joining Date</Dropdown.Item>
                </DropdownButton>
            </div>
            <Table striped bordered hover className="shadow-sm">
                <thead className="thead-light">
                    <tr>
                        <th className="text-center">First Name</th>
                        <th className="text-center">Last Name</th>
                        <th className="text-center">Date of Birth</th>
                        <th className="text-center">Employee ID</th>
                        <th className="text-center">Joining Date</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.length ? (
                        employees.map(emp => (
                            <tr key={emp._id}>
                                <td className="text-center">{emp.firstName}</td>
                                <td className="text-center">{emp.lastName}</td>
                                <td className="text-center">{formatDate(emp.dob)}</td>
                                <td className="text-center">{emp.empId}</td>
                                <td className="text-center">{formatDate(emp.joiningDate)}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No employees found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
};

export default EmployeeList;
