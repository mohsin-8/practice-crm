import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './ProtectedRoute';
import AdminDashboard from './pages/admin/AdminDashboard';
import SalesDashboard from './pages/sales/SalesDashboard';
import SupportDashboard from './pages/support/SupportDashboard';
import ForgotPassword from './pages/forgot-password/ForgotPassword';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>

        {/* Protected Routes for Sales */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "sales"]} />}>
          <Route path="/sales-dashboard" element={<SalesDashboard />} />
        </Route>

        {/* Protected Routes for Support */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "support"]} />}>
          <Route path="/support-dashboard" element={<SupportDashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;