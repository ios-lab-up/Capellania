import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-navbar-color p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-gray-800">
          Capellanía UP
        </a>
        <div className="space-x-4">
          <a href="/" className="text-gray-800 hover:text-white hover:bg-gray-600 transition-colors px-4 py-2 rounded-md">
            Inicio
          </a>
          <a href="/about" className="text-gray-800 hover:text-white hover:bg-gray-600 transition-colors px-4 py-2 rounded-md">
            Sobre Nosotros
          </a>
          <a href="/directory" className="text-gray-800 hover:text-white hover:bg-gray-600 transition-colors px-4 py-2 rounded-md">
            Directorio
          </a>
          <a href="/contact" className="text-gray-800 hover:text-white hover:bg-gray-600 transition-colors px-4 py-2 rounded-md">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
