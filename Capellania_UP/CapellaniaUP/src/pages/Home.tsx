// src/pages/Home.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BaseLayout from '../layouts/BaseLayout';

interface Content {
  id: number;
  title: string;
  body: string;
}

const Home: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);

  useEffect(() => {
    axios.get('/api/contents')
      .then((res) => {
        // Verifica la estructura de los datos
        console.log(res.data);
        if (Array.isArray(res.data)) {
          setContents(res.data);
        } else {
          console.error("La respuesta de la API no es un array:", res.data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener los contenidos:", error);
      });
  }, []);

  return (
    <BaseLayout>
      <h1 className="text-2xl font-semibold mb-6">Bienvenido a la Capellanía</h1>
      {contents.length > 0 ? (
        <ul>
          {contents.map((content) => (
            <li key={content.id} className="mb-4">
              <h2 className="text-xl font-semibold">{content.title}</h2>
              <p>{content.body}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay contenidos disponibles.</p>
      )}
    </BaseLayout>
  );
};

export default Home;
