import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = sessionStorage.getItem('token');

    // Redirect to the login page if not authenticated
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
