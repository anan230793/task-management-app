import { axiosInstance } from './axiosInstance';
import { AuthUser, LoginInput, RegisterInput } from '../types/auth';

interface AuthResponse {
  message: string;
  user: AuthUser;
}

export const loginUser = async (payload: LoginInput): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/login', payload);
  return data;
};

export const registerUser = async (payload: RegisterInput): Promise<AuthResponse> => {
  const { data } = await axiosInstance.post<AuthResponse>('/auth/register', payload);
  return data;
};

export const logoutUser = async (): Promise<{ message: string }> => {
  const { data } = await axiosInstance.post<{ message: string }>('/auth/logout');
  return data;
};

export const getMe = async (): Promise<{ user: AuthUser }> => {
  const { data } = await axiosInstance.get<{ user: AuthUser }>('/auth/me');
  return data;
};