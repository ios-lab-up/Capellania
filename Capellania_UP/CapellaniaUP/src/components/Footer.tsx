import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#F0D8BE] text-black py-6 mt-auto shadow-lg w-full">
      <div className="container mx-auto flex flex-col items-center justify-center space-y-4">
        <div className="flex space-x-6">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 text-2xl hover:text-blue-800 transition transform hover:scale-110">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 text-2xl hover:text-pink-700 transition transform hover:scale-110">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 text-2xl hover:text-blue-600 transition transform hover:scale-110">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-red-500 text-2xl hover:text-red-700 transition transform hover:scale-110">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-700">
            &copy; {new Date().getFullYear()} Capellanía UP. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
