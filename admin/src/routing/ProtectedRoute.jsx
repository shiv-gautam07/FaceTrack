// src/routing/ProtectedRoute.tsx
import { useAuth } from '../auth/AuthContext';
import { Navigate, Outlet } from 'react-router';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.some(role => user.roles.includes(role)))
    return <Navigate to="/unauthorized" replace />;

  return children ? children : <Outlet />;
};
export default ProtectedRoute;
