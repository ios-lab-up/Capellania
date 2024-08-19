import React from 'react';
import { Link } from 'react-router-dom';
import useUser from '../context/useUser';

const Header: React.FC = () => {
  const { role } = useUser();

  return (
    <header className="bg-[#F0D8BE] text-black py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">Capellanía UP</h1>
          {role === 'capellan' && (
            <span className="ml-4 px-3 py-1 bg-blue-600 text-white rounded-full">
              Modo Capellán
            </span>
          )}
        </div>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-600 transition">Inicio</Link>
          <Link to="/masses" className="hover:text-gray-600 transition">Misas</Link>
          <Link to="/events" className="hover:text-gray-600 transition">Eventos</Link>
          <Link to="/notices" className="hover:text-gray-600 transition">Avisos</Link>
          {role === 'capellan' && (
            <Link to="/dashboard" className="hover:text-gray-600 transition">Dashboard</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
