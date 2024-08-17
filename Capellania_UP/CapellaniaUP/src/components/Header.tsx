// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-[#F9EFE4] text-black py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center space-x-4">

          <h1 className="text-2xl font-bold">Capellanía UP</h1>
        </div>
        <nav className="space-x-4">
          <Link to="/" className="hover:text-gray-600 transition">Inicio</Link>
          <Link to="/masses" className="hover:text-gray-600 transition">Misas</Link>
          <Link to="/events" className="hover:text-gray-600 transition">Eventos</Link>
          <Link to="/notices" className="hover:text-gray-600 transition">Avisos</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
