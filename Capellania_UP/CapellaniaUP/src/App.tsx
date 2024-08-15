import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHome from './pages/dashboard/DashboardHome';
import AddMass from './pages/dashboard/AddMass';
import Home from './pages/public/Home';
import ViewMasses from './pages/public/ViewMasses';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas para el dashboard */}
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/add-mass" element={<AddMass />} />
        {/* Agregar otras rutas del dashboard */}

        {/* Rutas para la página pública */}
        <Route path="/" element={<Home />} />
        <Route path="/masses" element={<ViewMasses />} />
        {/* Agregar otras rutas públicas */}
      </Routes>
    </Router>
  );
};

export default App;
