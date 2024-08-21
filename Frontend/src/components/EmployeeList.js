import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [sortBy, setSortBy] = useState('id');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
        fetchEmployees();
    }, [sortBy, sortDirection]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/employees', {
                params: { sort_by: sortBy, direction: sortDirection },
                withCredentials: true
            });
            setEmployees(response.data);
        } catch (err) {
            console.error('Error fetching employees', err);
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
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="text-primary">Employee List</h3>
                <Link to="/add-employee" className="btn btn-outline-primary">Add Employee</Link>
            </div>
            <div className="d-flex justify-content-end mb-3">
                <DropdownButton
                    id="dropdown-sort-button"
                    title={`Sort by ${sortBy.charAt(0).toUpperCase() + sortBy.slice(1)} (${sortDirection === 'asc' ? '▲' : '▼'})`}
                    variant="outline-secondary"
                >
                    <Dropdown.Item onClick={() => handleSort('first_name')}>First Name</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('dob')}>Date of Birth</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('emp_id')}>Employee ID</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleSort('joining_date')}>Joining Date</Dropdown.Item>
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
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td className="text-center">{emp.first_name}</td>
                            <td className="text-center">{emp.last_name}</td>
                            <td className="text-center">{formatDate(emp.dob)}</td>
                            <td className="text-center">{emp.emp_id}</td>
                            <td className="text-center">{formatDate(emp.joining_date)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default EmployeeList;
