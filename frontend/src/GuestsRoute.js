import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const GuestsRoute = ({ element: Component, ...rest }) => {
    const isAuthenticated = useSelector(state => state.auth.isRegister);

    return isAuthenticated.token ? <Component /> : <Navigate to="/dashboard" />;
};

export default GuestsRoute;