import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import axios from './api/axios';
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Missing from './routes/Missing';
import Layout from './routes/Layout';
import RequiereAutorizacion from './routes/RequiereAutorizacion';

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  <Routes>
    <Route path="/" element={<Layout />}>
      {/* Rutas publicas */}
      <Route path="login" element={<Login />} />
      {/* Rutas protegidas */}
      <Route element={<RequiereAutorizacion allowedRoles={[ROLES.User]} />}>
        <Route path="/" element={<Home />} />
      </Route>
      {/* En esta ruta cualquiera puede ingresar */}
      <Route path="*" element={<Missing />} />
    </Route>
  </Routes>
}

export default App;
