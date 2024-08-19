// src/pages/public/ViewNotices.tsx
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
    axios.get('http://localhost:5000/api/notices', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(response => {
      setNotices(response.data);
    })
    .catch(error => {
      console.error("Error al obtener los avisos:", error);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#F0D8BE] flex flex-col items-center justify-center p-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Avisos Recientes</h1>
        <ul className="space-y-4">
          {notices.map(notice => (
            <li key={notice.id} className="p-4 border border-gray-200 rounded-lg bg-[#F9F9F9] shadow">
              <p className="text-xl font-semibold text-gray-800">Título: {notice.title}</p>
              <p className="text-lg text-gray-700">{notice.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ViewNotices;