import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Notice {
  id: number;
  title: string;
  content: string;
}

const ViewNotices: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/notices')
      .then(response => {
        setNotices(response.data);
      })
      .catch(error => {
        console.error("Error al obtener los avisos:", error);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F9EFE4] to-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="container mx-auto p-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-8 text-center">Avisos Recientes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.length > 0 ? (
            notices.map(notice => (
              <div key={notice.id} className="bg-white shadow-lg rounded-lg p-6 transform hover:scale-105 transition">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{notice.title}</h3>
                <p className="text-gray-600 mt-4">{notice.content}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-700 text-center col-span-full">No hay avisos disponibles.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewNotices;
