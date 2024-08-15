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
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Misas Programadas</h1>
      <ul>
        {masses.map(mass => (
          <li key={mass.id} className="mb-4 p-4 border rounded-lg bg-white shadow">
            <p className="text-xl font-semibold">Fecha: {new Date(mass.date).toLocaleDateString()}</p>
            <p className="text-lg">Hora: {mass.time}</p>
            <p className="text-lg">Descripción: {mass.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewMasses;
