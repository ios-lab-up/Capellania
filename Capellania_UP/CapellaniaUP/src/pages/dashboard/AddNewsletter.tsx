import React, { useState } from "react";
import axios from "axios";

const AddNewsletter: React.FC = () => {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Obtener el token del localStorage

    try {
      const response = await axios.post(
        "http://localhost:4100/api/newsletters",
        {
          title,
          imageUrl,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en la solicitud
          },
        }
      );
      console.log("Newsletter creado:", response.data);
    } catch (error) {
      console.error("Error al crear el newsletter:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Agregar Newsletter
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
              URL de la Imagen
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
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
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#176AE5] text-white font-semibold rounded-lg hover:bg-[#0F5ACC] transition"
          >
            Agregar Newsletter
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNewsletter;
