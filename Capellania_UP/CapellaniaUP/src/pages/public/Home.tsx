// src/pages/public/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';  // Asegúrate de tener esta importación
import Header from '../../components/Header';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9EFE4]">
      <Header />
      <div className="flex flex-col items-center justify-center p-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
          <video
            className="mb-8 w-full rounded-lg shadow-md"
            controls
            src="/video.mp4" // Ruta directa al video en la carpeta public
          >
            Tu navegador no soporta el elemento de video.
          </video>
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Capellanía UP</h1>
          <p className="text-lg text-gray-700 mb-6">
            Bienvenido a la página de la Capellanía de la Universidad Panamericana. Aquí encontrarás toda la información sobre nuestras misas, eventos y avisos.
          </p>
          <nav className="space-y-4">
            <Link
              to="/masses"
              className="block w-full py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Ver Misas
            </Link>
            <Link
              to="/events"
              className="block w-full py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Ver Eventos
            </Link>
            <Link
              to="/notices"
              className="block w-full py-3 bg-gray-300 text-black font-semibold rounded-lg hover:bg-gray-400 transition"
            >
              Ver Avisos
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Home;
