import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

import { getMe, loginUser, logoutUser, registerUser } from '../api/auth.api';
import { queryKeys } from '../constants/queryKeys';
import { LoginInput, RegisterInput } from '../types/auth';
import { toastSuccess, toastError } from '../utils/toast';

export const useCurrentUser = () => {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    retry: false,
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: LoginInput) => loginUser(payload),
    onSuccess: async () => {
      toastSuccess('Logged in successfully');
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      navigate('/dashboard');
    },
    onError: toastError,
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: RegisterInput) => registerUser(payload),
    onSuccess: async () => {
      toastSuccess('Account created successfully');
      await queryClient.invalidateQueries({ queryKey: queryKeys.auth.me });
      navigate('/dashboard');
    },
    onError: toastError,
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      toastSuccess('Logged out');
      queryClient.clear();
      localStorage.clear();
      sessionStorage.clear();
      navigate('/login');
    },
    onError: toastError,
  });
};