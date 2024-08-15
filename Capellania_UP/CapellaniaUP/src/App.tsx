import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DashboardHome from './pages/dashboard/DashboardHome';
import AddMass from './pages/dashboard/AddMass';
import AddEvent from './pages/dashboard/AddEvent';
import AddNotice from './pages/dashboard/AddNotice';
import Home from './pages/public/Home'; // Página pública principal
import ViewMasses from './pages/public/ViewMasses'; // Página para ver las misas
import ViewEvents from './pages/public/ViewEvents'; // Página para ver los eventos
import ViewNotices from './pages/public/ViewNotices'; // Página para ver los avisos

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas del dashboard */}
        <Route path="/dashboard" element={<DashboardHome />} />
        <Route path="/dashboard/add-mass" element={<AddMass />} />
        <Route path="/dashboard/add-event" element={<AddEvent />} />
        <Route path="/dashboard/add-notice" element={<AddNotice />} />
        
        {/* Rutas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/masses" element={<ViewMasses />} />
        <Route path="/events" element={<ViewEvents />} />
        <Route path="/notices" element={<ViewNotices />} />
      </Routes>
    </Router>
  );
};

export default App;
