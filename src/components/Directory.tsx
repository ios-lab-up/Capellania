import React from 'react';
import CapellanCard from './CapellanCard';

interface Capellan {
  id: number;
  name: string;
  title: string;
  image: string;
  bio: string;
}

interface DirectoryProps {
  capellanes: Capellan[];
}

const Directory: React.FC<DirectoryProps> = ({ capellanes }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {capellanes.map((capellan) => (
        <CapellanCard
          key={capellan.id}
          name={capellan.name}
          title={capellan.title}
          image={capellan.image}
          bio={capellan.bio}
        />
      ))}
    </div>
  );
};

export default Directory;
