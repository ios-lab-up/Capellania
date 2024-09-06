import React from 'react';
import { Link } from 'react-router-dom';
import { FaChurch, FaCalendarPlus, FaBullhorn, FaEnvelope } from 'react-icons/fa';

const DashboardHome: React.FC = () => {
  const role = localStorage.getItem('role');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9EFE4] to-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">Dashboard de Capellanía</h1>
        {role === 'capellan' && (
          <p className="text-xl text-[#7f5af0] mb-8 text-center flex items-center justify-center">
            <span className="mr-2">
              <FaChurch size={24} color="#7f5af0" />
            </span>
            Estás en modo Capellán
          </p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Link
            to="/dashboard/add-event"
            className="flex items-center justify-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition"
          >
            <span className="mr-2">
              <FaCalendarPlus size={24} />
            </span>
            <span className="text-xl font-semibold text-gray-800">Agregar Misa o Evento</span>
          </Link>
  
          <Link
            to="/dashboard/add-notice"
            className="flex items-center justify-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition"
          >
            <span className="mr-2">
              <FaEnvelope size={24} />
            </span>
            <span className="text-xl font-semibold text-gray-800">Agregar Newsletter</span>
          </Link>
          <Link
            to="/dashboard/add-readings"
            className="flex items-center justify-center bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition"
          >
            <span className="mr-2">
              <FaEnvelope size={24} />
            </span>
            <span className="text-xl font-semibold text-gray-800">Agregar Lectura</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
