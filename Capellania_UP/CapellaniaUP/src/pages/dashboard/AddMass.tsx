import React, { useState } from "react";
import axios from "axios";

const AddMass: React.FC = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");
  const [massType, setMassType] = useState("ordinaria"); // Valor por defecto

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No hay token disponible");
      return;
    }

    try {
      const response = await axios.post(
        "http://servercap.ioslab.dev/api/events",
        {
          date,
          time,
          description,
          type: "misa",
          massType, // Enviar tipo de misa específico
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Misa creada:", response.data);
      // Aquí puedes añadir un redirect o resetear el formulario si lo deseas
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error al crear la misa:", error.response.data);
        } else {
          console.error("Error al crear la misa:", error.message);
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
          Agregar Misa
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Tipo de Misa
            </label>
            <select
              value={massType}
              onChange={(e) => setMassType(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
            >
              <option value="ordinaria">Ordinaria</option>
              <option value="funeral">Funeral</option>
              <option value="matrimonio">Matrimonio</option>
              <option value="especial">Especial</option>
            </select>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Fecha
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Hora
            </label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Descripción
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
              rows={4}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#176AE5] text-white font-semibold rounded-lg hover:bg-[#0F5ACC] transition"
          >
            Agregar Misa
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMass;
