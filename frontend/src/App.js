import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Register from './pages/register/Register';
import Login from './pages/login/Login';
import ProtectedRoute from './ProtectedRoute';
import GuestsRoute from './GuestsRoute';

const App = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<ProtectedRoute element={<Navigate to="/dashboard" />} />} />
        <Route path='/register' element={<GuestsRoute element={Register} />} />
        <Route path='/login' element={<GuestsRoute element={Login} />} />
      </Routes>
    </>
  )
}

export default App;