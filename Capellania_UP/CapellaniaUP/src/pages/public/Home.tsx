// src/pages/public/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Capellanía UP</h1>
      <nav>
        <ul className="space-y-4">
          <li>
            <Link to="/masses" className="text-blue-500">Ver Misas</Link>
          </li>
          <li>
            <Link to="/events" className="text-blue-500">Ver Eventos</Link>
          </li>
          <li>
            <Link to="/notices" className="text-blue-500">Ver Avisos</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
