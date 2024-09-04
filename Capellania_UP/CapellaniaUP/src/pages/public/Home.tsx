import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

const Home: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/events")
      .then((response) => {
        const upcomingEvents = response.data.filter(
          (event: Event) => new Date(event.date) >= new Date()
        );
        setEvents(upcomingEvents);
      })
      .catch((error) => {
        console.error("Error al obtener los eventos:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9EFE4] to-[#F0D8BE] flex flex-col">
      <img
        src="/logoup.png"
        alt="Logotipo UP"
        className="absolute top-20 left-4 h-10 w-auto sm:h-12 md:h-14 lg:h-16 xl:h-18 sm:left-8 md:left-10 lg:left-12 xl:left-16"
      />
      <div className="container mx-auto p-8 flex-grow">
        <div className="flex flex-col items-center">
          <h1 className="text-5xl font-bold text-gray-800 mb-8">
            Capellanía UP
          </h1>

          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            ¿Quiénes Somos?
          </h2>
          <video
            className="mb-8 w-full max-w-3xl rounded-lg shadow-lg transition-transform transform hover:scale-105"
            controls
            src="/video.mp4"
          >
            Tu navegador no soporta el elemento de video.
          </video>

          <p className="text-xl text-gray-700 mb-12 text-center max-w-4xl leading-relaxed">
            Bienvenido a la página de la Capellanía de la Universidad
            Panamericana. Aquí encontrarás toda la información sobre nuestras
            misas, eventos y avisos. Conéctate con nosotros y descubre cómo la
            capellanía puede ser un espacio para fortalecer tu vida espiritual
            mientras formas parte de la comunidad universitaria.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-16">
            <Link
              to="/masses"
              className="py-3 px-8 bg-[#F0D8BE] text-black font-medium rounded-full shadow-lg hover:bg-[#e2c1a4] transition text-lg transform hover:-translate-y-1"
            >
              Ver Misas
            </Link>
            <Link
              to="/events"
              className="py-3 px-8 bg-[#F0D8BE] text-black font-medium rounded-full shadow-lg hover:bg-[#e2c1a4] transition text-lg transform hover:-translate-y-1"
            >
              Ver Eventos
            </Link>
            <Link
              to="/notices"
              className="py-3 px-8 bg-[#F0D8BE] text-black font-medium rounded-full shadow-lg hover:bg-[#e2c1a4] transition text-lg transform hover:-translate-y-1"
            >
              Ver Avisos
            </Link>
          </div>

          {/* Botón para que los capellanes inicien sesión */}
          <button
            onClick={() => navigate("/login")}
            className="py-3 px-8 bg-[#2d3748] text-white font-semibold rounded-full shadow-lg hover:bg-[#4a5568] transition text-lg transform hover:-translate-y-1"
          >
            Inicia sesión si eres capellán
          </button>
        </div>

        {/* Sección de Eventos Destacados */}
        <div className="mt-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
            Próximos Eventos
          </h2>
          <div className="flex overflow-x-auto space-x-6 pb-4">
            {events.length > 0 ? (
              events.slice(0, 3).map((event) => (
                <div
                  key={event.id}
                  className="flex-none bg-white shadow-lg rounded-lg p-6 w-72 transform hover:scale-105 transition"
                >
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="text-gray-600 mt-4">{event.description}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-700">No hay eventos próximos.</p>
            )}
          </div>
        </div>

        {/* Sección de Testimonios */}
        <div className="mt-20 mb-12">
          <h2 className="text-4xl font-semibold text-gray-800 mb-8 text-center">
            Testimonios
          </h2>
          <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
            <div className="flex-1 bg-[#f0e7dc] p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition">
              <p className="text-xl text-gray-700 italic">
                "La Capellanía de la UP ha sido un espacio fundamental en mi
                crecimiento espiritual. Los eventos y las misas me han ayudado a
                mantener mi fe viva durante mi vida universitaria."
              </p>
              <p className="mt-4 text-lg font-semibold">- María, Alumna</p>
            </div>
            <div className="flex-1 bg-[#f0e7dc] p-8 rounded-lg shadow-lg text-center transform hover:scale-105 transition">
              <p className="text-xl text-gray-700 italic">
                "Participar en las actividades de la Capellanía me ha permitido
                conocer a otros estudiantes con valores similares, creando una
                comunidad unida y de apoyo."
              </p>
              <p className="mt-4 text-lg font-semibold">- Carlos, Alumno</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
