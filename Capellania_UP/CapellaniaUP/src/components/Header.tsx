import React from 'react';
import { Link } from 'react-router-dom';
import useUser from '../context/useUser';

const Header: React.FC = () => {
  const { role } = useUser();

  return (
    <header className="bg-[#F0D8BE] text-black py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Logo o Título */}
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-extrabold text-[#4A403A] hover:text-[#362F2D] transition">
            Capellanía UP
          </h1>
          {role === 'capellan' && (
            <span className="ml-4 px-4 py-1 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-white text-sm font-medium rounded-full shadow">
              Modo Capellán
            </span>
          )}
        </div>

        {/* Navegación */}
        <nav className="flex items-center space-x-6 text-lg font-medium">
          <Link
            to="/"
            className="text-[#4A403A] hover:text-white hover:bg-[#4A403A] py-2 px-4 rounded transition"
          >
            Inicio
          </Link>
          <Link
            to="/masses"
            className="text-[#4A403A] hover:text-white hover:bg-[#4A403A] py-2 px-4 rounded transition"
          >
            Misas
          </Link>
          <Link
            to="/events"
            className="text-[#4A403A] hover:text-white hover:bg-[#4A403A] py-2 px-4 rounded transition"
          >
            Eventos
          </Link>
          <Link
            to="/notices"
            className="text-[#4A403A] hover:text-white hover:bg-[#4A403A] py-2 px-4 rounded transition"
          >
            Avisos
          </Link>
          {role === 'capellan' && (
            <Link
              to="/dashboard"
              className="text-[#4A403A] hover:text-white hover:bg-[#4A403A] py-2 px-4 rounded transition"
            >
              Dashboard
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
