// src/pages/public/ViewMasses.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Mass {
  id: number;
  date: string;
  time: string;
  description: string;
}

const ViewMasses: React.FC = () => {
  const [masses, setMasses] = useState<Mass[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/masses')
      .then(response => {
        setMasses(response.data);
      })
      .catch(error => {
        console.error("Error al obtener las misas:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Misas Programadas</h1>
        <ul className="space-y-4">
          {masses.map(mass => (
            <li key={mass.id} className="p-4 border border-gray-200 rounded-lg bg-[#F9F9F9] shadow">
              <p className="text-xl font-semibold text-gray-800">
                Fecha: {new Date(mass.date).toLocaleDateString()}
              </p>
              <p className="text-lg text-gray-700">
                Hora: {mass.time}
              </p>
              <p className="text-lg text-gray-700">
                Descripción: {mass.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewMasses;
