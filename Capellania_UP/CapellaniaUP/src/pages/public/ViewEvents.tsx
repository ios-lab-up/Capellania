// src/pages/public/ViewEvents.tsx
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
    <div className="min-h-screen bg-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Eventos Programados</h1>
        <ul className="space-y-4">
          {events.map(event => (
            <li key={event.id} className="p-4 border border-gray-200 rounded-lg bg-[#F9F9F9] shadow">
              <p className="text-xl font-semibold text-gray-800">Título: {event.title}</p>
              <p className="text-lg text-gray-700">Fecha: {new Date(event.date).toLocaleDateString()}</p>
              <p className="text-lg text-gray-700">Descripción: {event.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewEvents;
