import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';

const App: React.FC = () => {
  const isAuthenticated = true; // Lógica para verificar autenticación
  const userRole = 'admin'; // Lógica para obtener el rol del usuario

  return (
    <Router>
      <Routes>
        <Route
          path="/dashboard"
          element={
            isAuthenticated && userRole === 'admin' ? (
              <Dashboard />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
