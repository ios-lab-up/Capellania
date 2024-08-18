import React from 'react';

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout: React.FC<BaseLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold">Capellanía UP</h1>
        </div>
      </header>
      <main className="container mx-auto flex-grow px-4 py-6">
        {children}
      </main>
      {/* Aquí asegúrate de incluir el Footer */}
    </div>
  );
};

export default BaseLayout;
