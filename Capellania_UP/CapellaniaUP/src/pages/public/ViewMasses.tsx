import React, { useState, useEffect } from "react";
import axios from "axios";

interface Mass {
  id: number;
  date: string;
  time: string;
  description: string;
}

const ViewMasses: React.FC = () => {
  const [masses, setMasses] = useState<Mass[]>([]);
  const role = localStorage.getItem("role"); // Obtén el rol del usuario autenticado

  const fetchMasses = async () => {
    try {
      const response = await axios.get(
        "http://servercap.ioslab.dev/api/masses"
      );
      setMasses(response.data);
    } catch (error) {
      console.error("Error al obtener las misas:", error);
    }
  };

  useEffect(() => {
    fetchMasses();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    try {
      await axios.delete(`http://servercap.ioslab.dev/api/masses/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMasses(masses.filter((mass) => mass.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 403) {
            console.error("No tienes permiso para eliminar esta misa.");
          } else if (err.response.status === 401) {
            console.error("No estás autenticado.");
          } else {
            console.error("Error al eliminar la misa:", err.response.data);
          }
        } else {
          console.error("Error al eliminar la misa:", err.message);
        }
      } else {
        console.error("Unexpected error:", err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9EFE4] to-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">
          Misas Programadas
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {masses.length > 0 ? (
            masses.map((mass) => (
              <div
                key={mass.id}
                className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Fecha: {new Date(mass.date).toLocaleDateString()}
                </h3>
                <p className="text-gray-600">Hora: {mass.time}</p>
                <p className="text-gray-600 mt-4">{mass.description}</p>
                {role === "capellan" && (
                  <button
                    onClick={() => handleDelete(mass.id)}
                    className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">
              No hay misas programadas.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewMasses;
