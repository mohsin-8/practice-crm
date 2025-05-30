import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import Unauthorized from './components/Unauthorized';
import ProtectedRoute from './ProtectedRoute';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import ResetPassword from './pages/reset-password/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Users from './pages/Users/Users';
import AddNewUser from './pages/Users/AddNewUser';
import ProfileSettings from './pages/profile-settings/ProfileSettings';
import Projects from './pages/projects/Projects';
import AddNewLead from "./pages/leads/AddNewLead";
import LeadDetails from './pages/leads/LeadDetails';
import Leads from './pages/leads/Leads';
import PublicRoutes from './PublicRoutes';

const App = () => {

  return (
    <>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/sales/leads" element={<Leads />} />
        <Route path="/sales/lead/create" element={<AddNewLead />} />
        <Route path="/sales/lead/details/:id" element={<LeadDetails />} />

        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/hr/users" element={<Users />} />
          <Route path="/hr/users/add-new" element={<AddNewUser />} />
        </Route>

        {/* Protected Routes for Admin */}
        <Route element={<ProtectedRoute allowedRoles={["admin", "sales", "support", "team lead", "manager"]} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </>
  )
}

export default App;