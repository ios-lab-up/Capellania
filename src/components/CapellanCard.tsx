import React from 'react';

interface CapellanCardProps {
  name: string;
  title: string;
  image: string;
  bio: string;
}

const CapellanCard: React.FC<CapellanCardProps> = ({ name, title, image, bio }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
      <img className="w-full h-48 object-cover" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">{title}</p>
        <p className="text-gray-600 text-sm mt-2">{bio}</p>
      </div>
    </div>
  );
};

export default CapellanCard;
