import React from 'react';
import { Link } from 'react-router-dom';

const DashboardHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F0D8BE] flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Dashboard de Capellanía</h1>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/dashboard/add-mass"
                className="block w-full text-center py-3 bg-[#176AE5] text-white font-semibold rounded-lg hover:bg-[#0F5ACC] transition"
              >
                Agregar Misa
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-event"
                className="block w-full text-center py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Agregar Evento
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-notice"
                className="block w-full text-center py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
              >
                Agregar Aviso
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default DashboardHome;
