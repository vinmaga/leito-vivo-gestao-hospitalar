
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { authState } = useAuth();
  
  if (authState.loading) {
    // Pode-se adicionar um componente de loading aqui
    return <div className="flex items-center justify-center h-screen">Carregando...</div>;
  }
  
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
