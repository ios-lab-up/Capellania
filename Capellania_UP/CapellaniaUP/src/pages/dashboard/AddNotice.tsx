import React, { useState } from "react";
import axios from "axios";

const AddNotice: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Obtén el token del localStorage

    if (!token) {
      console.error("No hay token disponible");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/notices",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en los encabezados
          },
        }
      );
      console.log("Aviso creado:", response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error al crear el aviso:", error.response.data);
        } else {
          console.error("Error al crear el aviso:", error.message);
        }
      } else {
        console.error("Error inesperado:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Agregar Noticia
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Contenido
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
              rows={6}
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#176AE5] text-white font-semibold rounded-lg hover:bg-[#0F5ACC] transition"
          >
            Agregar Noticia
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNotice;
