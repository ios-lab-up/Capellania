import { useContext } from 'react';
import { UserContext, UserContextProps } from './UserContext';

// Hook personalizado para usar el contexto de usuario
const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export default useUser;
