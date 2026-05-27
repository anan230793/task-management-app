import { axiosInstance } from './axiosInstance';
import { CreateTaskInput, Task, TaskStatus, TasksResponse, UpdateTaskInput } from '../types/task';

interface TaskResponse {
  task: Task;
}

interface TaskListQuery {
  status?: TaskStatus;
  search?: string;
}

export const getTasks = async (query: TaskListQuery): Promise<TasksResponse> => {
  const { data } = await axiosInstance.get<TasksResponse>('/tasks', { params: query });
  return data;
};

export const createTask = async (payload: CreateTaskInput): Promise<TaskResponse> => {
  const { data } = await axiosInstance.post<TaskResponse>('/tasks', payload);
  return data;
};

export const updateTask = async (taskId: string, payload: UpdateTaskInput): Promise<TaskResponse> => {
  const { data } = await axiosInstance.put<TaskResponse>(`/tasks/${taskId}`, payload);
  return data;
};

export const deleteTask = async (taskId: string): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(`/tasks/${taskId}`);
  return data;
};

export const getTaskById = async (taskId: string): Promise<TaskResponse> => {
  const { data } = await axiosInstance.get<TaskResponse>(`/tasks/${taskId}`);
  return data;
};
