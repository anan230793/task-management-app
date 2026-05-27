import { Suspense, lazy } from 'react';
import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';

import { ProtectedRoute } from '../components/ProtectedRoute';
import { Loader } from '../components/ui/Loader';
import ErrorPage from '../pages/ErrorPage';

const MainLayout = lazy(() => import('../layouts/MainLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout').then((m) => ({ default: m.AuthLayout })));
const DashboardPage = lazy(() => import('../pages/DashboardPage'));
const LoginPage = lazy(() => import('../pages/LoginPage'));
const RegisterPage = lazy(() => import('../pages/RegisterPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        element: <AuthLayout />,
        children: [
          { path: '/login', element: <LoginPage /> },
          { path: '/register', element: <RegisterPage /> },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <MainLayout />,
            children: [{ path: '/dashboard', element: <DashboardPage /> }],
          },
        ],
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

export const AppRoutes = () => {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-surface-page">
          <Loader size="lg" />
        </div>
      }
    >
      <RouterProvider router={router} />
    </Suspense>
  );
};