import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F0D8BE] text-black py-4 mt-auto shadow-lg w-full">
      <div className="container mx-auto text-center">
        <p className="text-sm text-gray-700">
          &copy; {new Date().getFullYear()} Capellanía UP. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
