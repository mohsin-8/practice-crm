import React from 'react';
import { Routes, Route } from "react-router-dom";
import Register from './pages/register/Register';

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<h1>Home Page</h1>} />
      </Routes>
    </>
  )
}

export default App;