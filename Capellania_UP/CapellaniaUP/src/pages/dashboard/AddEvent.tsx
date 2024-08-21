import React, { useState } from "react";
import axios from "axios";

const AddEvent: React.FC = () => {
  const [eventType, setEventType] = useState("evento"); // Valor por defecto
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No hay token disponible");
      return;
    }

    const payload = {
      title: eventType === "evento" ? title : "",
      date,
      time: eventType === "misa" ? time : "",
      description,
      type: eventType, // Asegurando que el tipo de evento se envíe
    };

    try {
      const response = await axios.post(
        "http://servercap.ioslab.dev/api/events",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(
        `${eventType.charAt(0).toUpperCase() + eventType.slice(1)} creado:`,
        response.data
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error(`Error al crear el ${eventType}:`, error.response.data);
        } else {
          console.error(`Error al crear el ${eventType}:`, error.message);
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
          Agregar {eventType === "misa" ? "Misa" : "Evento"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Tipo de Evento
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full mt-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#176AE5]"
            >
              <option value="evento">Evento</option>
              <option value="misa">Misa</option>
            </select>
          </div>
          {eventType === "evento" && (
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
          )}
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
          {eventType === "misa" && (
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
          )}
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
            Agregar {eventType === "misa" ? "Misa" : "Evento"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
