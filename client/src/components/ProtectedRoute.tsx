import { Navigate, Outlet } from 'react-router-dom';

import { useCurrentUser } from '../hooks/useAuth';
import { Loader } from './ui/Loader';

export const ProtectedRoute = () => {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-surface-page">
        <Loader size="lg" />
      </div>
    );
  }

  if (!data?.user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
