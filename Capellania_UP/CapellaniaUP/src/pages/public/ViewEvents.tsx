import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
      const response = await axios.get('http://localhost:5000/api/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error al obtener los eventos:', error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(events.filter(event => event.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        // Handle errors thrown by axios
        if (err.response) {
          if (err.response.status === 403) {
            console.error('No tienes permiso para eliminar este evento.');
          } else if (err.response.status === 401) {
            console.error('No estás autenticado.');
          } else {
            console.error('Error al eliminar el evento:', err.response.data);
          }
        } else {
          console.error('Error al eliminar el evento:', err.message);
        }
      } else {
        // Handle other types of errors
        console.error('Unexpected error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9EFE4] to-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">Eventos Programados</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                <p className="text-gray-600">{new Date(event.date).toLocaleDateString()}</p>
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
            <p className="text-gray-700 text-center col-span-full">No hay eventos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;
