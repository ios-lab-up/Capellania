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

  useEffect(() => {
    axios.get('http://localhost:5000/api/events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los eventos:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#E0EAFB] to-[#C2D7F0] flex items-center justify-center p-8">
      <div className="bg-white shadow-2xl rounded-xl p-10 max-w-2xl w-full">
        <h1 className="text-4xl font-bold text-center text-[#4A5568] mb-10">Eventos Programados</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {events.length > 0 ? (
            events.map(event => (
              <div key={event.id} className="bg-gradient-to-r from-[#6B46C1] to-[#9F7AEA] shadow-lg rounded-lg p-6 text-white transform hover:scale-105 transition">
                <h3 className="text-2xl font-semibold mb-2">{event.title}</h3>
                <p className="text-lg">{new Date(event.date).toLocaleDateString()}</p>
                <p className="mt-4">{event.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 col-span-full text-center">No hay eventos programados.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEvents;
