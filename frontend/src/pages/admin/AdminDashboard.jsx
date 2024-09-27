import React from 'react';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("role");
        navigate("/login");
    };

    return (
        <div>
            <h1>AdminDashboard</h1>
            <Button onClick={handleLogOut}>Log Out</Button>
        </div>
    )
}

export default AdminDashboard;