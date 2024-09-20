import React, { useState } from "react";
import axios from "axios";

const AddNotice: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // Estado para la URL de la imagen
  const [summary, setSummary] = useState(""); // Estado para el resumen
  const [reference, setReference] = useState(""); // Nuevo estado para la referencia

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
          imageUrl,
          summary,
          reference, // Incluye la referencia en el cuerpo de la solicitud
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
          {/* Campo para el título */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
              placeholder="Título "
              required
            />
          </div>

          {/* Campo para el contenido */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Contenido
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
              placeholder="Escriba el contenido"
              rows={6}
            />
          </div>


          {/* Campo para la URL de la imagen */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              URL de la Imagen
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
              placeholder="https://example.com/imagen.jpg"
              required
            />
          </div>

          {/* Nuevo campo para la referencia */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Referencia
            </label>
            <input
              type="text"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
              placeholder="https://example.com/fuente-referencia"
            />
          </div>

          {/* Botón para enviar el formulario */}
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
