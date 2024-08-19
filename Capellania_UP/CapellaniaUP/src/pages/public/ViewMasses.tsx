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
    <div className="min-h-screen bg-gradient-to-b from-[#F9EFE4] to-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">Misas Programadas</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masses.length > 0 ? (
            masses.map(mass => (
              <div key={mass.id} className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Fecha: {new Date(mass.date).toLocaleDateString()}</h3>
                <p className="text-gray-600">Hora: {mass.time}</p>
                <p className="text-gray-600 mt-4">{mass.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">No hay misas programadas.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMasses;
