import React from 'react';
import { Navigate } from 'react-router-dom';
import useUser from '../context/useUser';

interface ProtectedRouteProps {
  element: React.ReactElement;
  roles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
  const { role } = useUser();
  
  if (!role || !roles.includes(role)) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
