import React, { useState, useEffect } from "react";
import axios from "axios";

interface Event {
  id: number;
  title: string;
  date: string;
  description: string;
}

const ViewEvents: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(
        "https://servercap.ioslab.dev/api/events"
      );
      setEvents(response.data);
    } catch (error) {
      console.error("Error al obtener los eventos:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token"); // Obtén el token del localStorage

    if (!token) {
      console.error("No hay token disponible");
      return;
    }

    try {
      await axios.delete(`https://servercap.ioslab.dev/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Asegúrate de incluir el token aquí
        },
      });
      setEvents(events.filter((event) => event.id !== id)); // Actualiza el estado de los eventos
      console.log("Evento eliminado");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(
            "No tienes permiso para eliminar este evento:",
            error.response.data
          );
        } else {
          console.error("Error al eliminar el evento:", error.message);
        }
      } else {
        console.error("Error inesperado:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9EFE4] to-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
          Eventos Programados
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 mt-4">{event.description}</p>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">
              No hay eventos disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;
