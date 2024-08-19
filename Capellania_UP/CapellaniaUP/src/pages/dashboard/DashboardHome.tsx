import React from 'react';
import { Link } from 'react-router-dom';
import { FaChurch, FaCalendarPlus, FaBullhorn } from 'react-icons/fa';

const DashboardHome: React.FC = () => {
  const role = localStorage.getItem('role');

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0EAFB] to-[#C2D7F0] flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center text-[#4A5568] mb-10">Dashboard de Capellanía</h1>

        {role === 'capellan' && (
          <p className="text-lg text-[#6B46C1] mb-8 text-center flex items-center justify-center">
            <span className="mr-2">
              <FaChurch size={24} color="#6B46C1" />
            </span>
            Estás en modo Capellán
          </p>
        )}

        <nav>
          <ul className="space-y-5">
            <li>
              <Link
                to="/dashboard/add-mass"
                className="flex items-center justify-center py-3 bg-gradient-to-r from-[#6B46C1] to-[#9F7AEA] text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="mr-2">
                  <FaChurch size={24} />
                </span>
                Agregar Misa
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-event"
                className="flex items-center justify-center py-3 bg-gradient-to-r from-[#F56565] to-[#FC8181] text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="mr-2">
                  <FaCalendarPlus size={24} />
                </span>
                Agregar Evento
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/add-notice"
                className="flex items-center justify-center py-3 bg-gradient-to-r from-[#ED8936] to-[#F6AD55] text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <span className="mr-2">
                  <FaBullhorn size={24} />
                </span>
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
