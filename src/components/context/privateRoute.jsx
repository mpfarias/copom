import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    console.log("Estado de autenticação no PrivateRoute:", isAuthenticated);
    
    return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
