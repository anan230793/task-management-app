import { CheckSquare } from 'lucide-react';
import { Navigate, Outlet } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { queryKeys } from '../constants/queryKeys';

interface UserResponse {
  user?: { id: string; name: string; email: string };
}

export const AuthLayout = () => {
  const queryClient = useQueryClient();
  const cachedUser = queryClient.getQueryData<UserResponse>(queryKeys.auth.me);

  if (cachedUser?.user) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F7F6] px-4 py-8">
      <div className="w-full max-w-md">
        <div className="mb-4 flex items-center justify-center gap-2">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E3FCF7] text-brand">
            <CheckSquare size={22} />
          </span>
          <span className="text-xl font-bold text-brand">Task Management</span>
        </div>
        <div className="rounded-2xl border border-surface-border bg-white p-8 shadow-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
