import React, { useState, useEffect } from "react";
import axios from "axios";

interface Notice {
  id: number;
  title: string;
  content: string;
}

const ViewNotices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const role = localStorage.getItem("role"); // Obtén el rol del usuario autenticado

  const fetchNotices = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/notices"
      );
      setNotices(response.data);
    } catch (error) {
      console.error("Error al obtener los avisos:", error);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token"); // Obtén el token del localStorage

    try {
      await axios.delete(`http://localhost:3000/api/notices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Asegúrate de incluir el token aquí
        },
      });
      setNotices(notices.filter((notice) => notice.id !== id)); // Actualiza el estado de los avisos
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          if (err.response.status === 403) {
            console.error("No tienes permiso para eliminar este aviso.");
          } else if (err.response.status === 401) {
            console.error("No estás autenticado.");
          } else {
            console.error("Error al eliminar el aviso:", err.response.data);
          }
        } else {
          console.error("Error al eliminar el aviso:", err.message);
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
          Avisos Recientes
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.length > 0 ? (
            notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition"
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {notice.title}
                </h3>
                <p className="text-gray-600 mt-4">{notice.content}</p>
                {role === "capellan" && (
                  <button
                    onClick={() => handleDelete(notice.id)}
                    className="mt-4 py-2 px-4 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">
              No hay avisos disponibles.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewNotices;
