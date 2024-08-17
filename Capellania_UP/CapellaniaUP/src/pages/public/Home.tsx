// src/pages/public/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#F9EFE4] relative">
      <Header />
      <img
        src="/logoup.png"
        alt="Logotipo UP"
        className="absolute top-24 left-4 h-12 w-auto sm:h-16 sm:left-8 md:h-20 md:left-12 lg:h-24 lg:left-16"
      /> {/* Logotipo más pequeño y responsive */}
      <div className="container mx-auto p-8">
        <div className="flex flex-col items-center justify-center">
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

          {/* Tarjetas de información debajo del video */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Misión</h2>
              <p className="text-gray-700">
                Guiar a la comunidad universitaria en su vida espiritual a través de la oración, los sacramentos y la formación cristiana.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Horarios</h2>
              <p className="text-gray-700">
                Consulta los horarios de nuestras misas y confesionarios disponibles para toda la comunidad.
              </p>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Contactos</h2>
              <p className="text-gray-700">
                Conoce a los capellanes disponibles para ayudarte en cualquier necesidad espiritual que tengas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
