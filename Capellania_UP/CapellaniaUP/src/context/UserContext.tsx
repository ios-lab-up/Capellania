import React, { createContext, useState, useEffect } from 'react';

// Define la interfaz para el contexto del usuario
export type UserContextProps = {
  role: string | null;
  setRole: (role: string) => void;
};

// Crea el contexto con un valor inicial indefinido
const UserContext = createContext<UserContextProps | undefined>(undefined);

const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(localStorage.getItem('role'));

  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  );
};

// Exporta el proveedor y el contexto
export { UserProvider, UserContext };
