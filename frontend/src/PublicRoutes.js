import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const { isAuthenticated } = useSelector(state => state.auth);
    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
};

export default PublicRoutes;