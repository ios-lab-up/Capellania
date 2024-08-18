import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header';

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        const upcomingEvents = response.data.filter((event: Event) =>
          new Date(event.date) >= new Date()
        );
        setEvents(upcomingEvents);
      })
      .catch(error => {
        console.error("Error al obtener los eventos:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9EFE4] to-[#F0D8BE] relative">
      <Header />
      <img
        src="/logoup.png"
        alt="Logotipo UP"
        className="absolute top-20 left-4 h-10 w-auto sm:h-12 md:h-14 lg:h-16 xl:h-18 sm:left-8 md:left-10 lg:left-12 xl:left-16"
      />
      <div className="container mx-auto p-8">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">Capellanía UP</h1>

          <h2 className="text-3xl font-bold text-gray-800 mb-4">¿Quiénes Somos?</h2>
          <video
            className="mb-8 w-full max-w-2xl rounded-lg shadow-md"
            controls
            src="/video.mp4"
          >
            Tu navegador no soporta el elemento de video.
          </video>

          <p className="text-lg text-gray-700 mb-12 text-center max-w-4xl">
            Bienvenido a la página de la Capellanía de la Universidad Panamericana. Aquí encontrarás toda la información sobre nuestras misas, eventos y avisos. Conéctate con nosotros y descubre cómo la capellanía puede ser un espacio para fortalecer tu vida espiritual mientras formas parte de la comunidad universitaria.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8">
            <Link
              to="/masses"
              className="py-3 px-6 bg-[#F0D8BE] text-black font-semibold rounded-lg hover:bg-[#e2c1a4] transition text-lg"
            >
              Ver Misas
            </Link>
            <Link
              to="/events"
              className="py-3 px-6 bg-[#F0D8BE] text-black font-semibold rounded-lg hover:bg-[#e2c1a4] transition text-lg"
            >
              Ver Eventos
            </Link>
            <Link
              to="/notices"
              className="py-3 px-6 bg-[#F0D8BE] text-black font-semibold rounded-lg hover:bg-[#e2c1a4] transition text-lg"
            >
              Ver Avisos
            </Link>
          </div>
        </div>

        {/* Sección de Eventos Destacados */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Próximos Eventos</h2>
          <div className="flex overflow-x-scroll space-x-4">
            {events.length > 0 ? (
              events.slice(0, 3).map(event => (
                <div key={event.id} className="flex-none bg-white shadow-lg rounded-lg p-4 w-64">
                  <h3 className="text-xl font-bold text-gray-800">{event.title}</h3>
                  <p className="text-gray-700 mt-2">{new Date(event.date).toLocaleDateString()}</p>
                  <p className="text-gray-600 text-sm mt-2">{event.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No hay eventos próximos.</p>
            )}
          </div>
        </div>

        {/* Sección de Testimonios */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Testimonios</h2>
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
            <div className="flex-1 text-center bg-[#f0e7dc] p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "La Capellanía de la UP ha sido un espacio fundamental en mi crecimiento espiritual. Los eventos y las misas me han ayudado a mantener mi fe viva durante mi vida universitaria."
              </p>
              <p className="mt-4 font-semibold">- María, Alumna</p>
            </div>
            <div className="flex-1 text-center bg-[#f0e7dc] p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "Participar en las actividades de la Capellanía me ha permitido conocer a otros estudiantes con valores similares, creando una comunidad unida y de apoyo."
              </p>
              <p className="mt-4 font-semibold">- Carlos, Alumno</p>
            </div>
          </div>
        </div>

        {/* Sección de Redes Sociales */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Síguenos en Redes Sociales</h2>
          <div className="flex justify-center space-x-6">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-3xl hover:text-blue-800 transition">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-3xl hover:text-pink-700 transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-3xl hover:text-blue-600 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-500 text-3xl hover:text-red-700 transition">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
