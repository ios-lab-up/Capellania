// src/pages/dashboard/DashboardHome.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHome: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Capellanía</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/dashboard/add-mass" className="text-blue-500">Agregar Misa</Link>
          </li>
          <li>
            <Link to="/dashboard/add-event" className="text-blue-500">Agregar Evento</Link>
          </li>
          <li>
            <Link to="/dashboard/add-notice" className="text-blue-500">Agregar Aviso</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashboardHome;
