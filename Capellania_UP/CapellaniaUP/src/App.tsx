// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHome from './pages/dashboard/DashboardHome';
import AddMass from './pages/dashboard/AddMass';
import AddEvent from './pages/dashboard/AddEvent';
import AddNotice from './pages/dashboard/AddNotice';
import Home from './pages/public/Home'; // Página pública para todos

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas del dashboard */}
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/add-mass" element={<AddMass />} />
        <Route path="/dashboard/add-event" element={<AddEvent />} />
        <Route path="/dashboard/add-notice" element={<AddNotice />} />
        {/* Ruta pública */}
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
