import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginRequest } from './actions/Actions';
import LoginForm from './components/Login';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import PrivateRoute from './PrivateRoute';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loginRequest());
    }, [dispatch]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route
                    path="/employees"
                    element={
                        <PrivateRoute>
                            <EmployeeList />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/add-employee"
                    element={
                        <PrivateRoute>
                            <AddEmployee />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
