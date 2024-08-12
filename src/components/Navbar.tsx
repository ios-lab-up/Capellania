import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-navbar-color p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="text-3xl font-bold text-gray-900 hover:text-gray-700 transition-colors">
          Capellanía UP
        </a>
        <div className="space-x-6 flex items-center">
          <a href="/" className="text-gray-800 hover:text-gray-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100">
            Inicio
          </a>
          <a href="/about" className="text-gray-800 hover:text-gray-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100">
            Sobre Nosotros
          </a>
          <a href="/directory" className="text-gray-800 hover:text-gray-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100">
            Directorio
          </a>
          <a href="/contact" className="text-gray-800 hover:text-gray-600 transition-colors px-4 py-2 rounded-lg hover:bg-gray-100">
            Contacto
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
