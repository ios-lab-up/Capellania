import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: React.ReactElement;
  roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
  const token = localStorage.getItem('token');
  const decodedToken = token ? JSON.parse(atob(token.split('.')[1])) : null;

  if (!token || !decodedToken || !roles.includes(decodedToken.role)) {
    // Si el usuario no está autenticado o no tiene el rol correcto, redirigir al login
    return <Navigate to="/login" />;
  }

  // Si pasa las validaciones, renderizar el elemento
  return element;
};

export default ProtectedRoute;
