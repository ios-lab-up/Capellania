// src/pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseLayout from '../layouts/BaseLayout';

interface Content {
  id: number;
  title: string;
  body: string;
}

const Dashboard: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [newContent, setNewContent] = useState({ title: '', body: '' });

  useEffect(() => {
    axios.get('/api/contents').then((res) => setContents(res.data));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('/api/contents', newContent).then((res) => {
      setContents([...contents, res.data]);
      setNewContent({ title: '', body: '' });
    });
  };

  return (
    <BaseLayout>
      <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Título
          </label>
          <input
            type="text"
            id="title"
            value={newContent.title}
            onChange={(e) => setNewContent({ ...newContent, title: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block text-sm font-medium text-gray-700">
            Contenido
          </label>
          <textarea
            id="body"
            value={newContent.body}
            onChange={(e) => setNewContent({ ...newContent, body: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Crear Contenido
        </button>
      </form>
      <ul>
        {contents.map((content) => (
          <li key={content.id} className="mb-4">
            <h2 className="text-xl font-semibold">{content.title}</h2>
            <p>{content.body}</p>
          </li>
        ))}
      </ul>
    </BaseLayout>
  );
};

export default Dashboard;
