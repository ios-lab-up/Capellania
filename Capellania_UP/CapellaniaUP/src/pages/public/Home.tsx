// src/pages/public/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Capellanía UP</h1>
        <p className="text-lg text-gray-700 mb-6">
          Bienvenido a la página de la Capellanía de la Universidad Panamericana. Aquí encontrarás toda la información sobre nuestras misas, eventos y avisos.
        </p>
        <nav className="space-y-4">
          <Link
            to="/masses"
            className="block w-full py-3 bg-[#176AE5] text-white font-semibold rounded-lg hover:bg-[#0F5ACC] transition"
          >
            Ver Misas
          </Link>
          <Link
            to="/events"
            className="block w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
          >
            Ver Eventos
          </Link>
          <Link
            to="/notices"
            className="block w-full py-3 bg-yellow-500 text-white font-semibold rounded-lg hover:bg-yellow-600 transition"
          >
            Ver Avisos
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Home;
