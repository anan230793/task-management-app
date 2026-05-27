import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { createTask, deleteTask, getTaskById, getTasks, updateTask } from '../api/task.api';
import { queryKeys } from '../constants/queryKeys';
import {
  CreateTaskInput,
  StatusFilter,
  Task,
  TasksResponse,
  UpdateTaskInput,
} from '../types/task';
import { toastError, toastSuccess } from '../utils/toast';

const updateOptimisticList = (
  current: TasksResponse | undefined,
  updater: (tasks: Task[]) => Task[],
): TasksResponse | undefined => {
  if (!current) {
    return current;
  }

  return {
    ...current,
    tasks: updater(current.tasks),
  };
};

const rollbackList = (
  queryClient: QueryClient,
  queryKey: ReturnType<typeof queryKeys.tasks.list>,
  previous: TasksResponse | undefined,
): void => {
  if (previous) {
    queryClient.setQueryData(queryKey, previous);
  }
};

const invalidateTaskQueries = async (
  queryClient: QueryClient,
  taskId?: string,
): Promise<void> => {
  await queryClient.invalidateQueries({ queryKey: queryKeys.tasks.all });
  if (taskId) {
    await queryClient.invalidateQueries({ queryKey: queryKeys.tasks.detail(taskId) });
  }
};

export const useTasks = (status: StatusFilter, search: string) => {
  return useQuery({
    queryKey: queryKeys.tasks.list(status, search),
    queryFn: () =>
      getTasks({
        status: status === 'ALL' ? undefined : status,
        search: search || undefined,
      }),
  });
};

export const useTaskById = (taskId: string) => {
  return useQuery({
    queryKey: queryKeys.tasks.detail(taskId),
    queryFn: () => getTaskById(taskId),
    enabled: taskId.trim().length > 0,
    retry: false,
  });
};

export const useCreateTask = (status: StatusFilter, search: string) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.tasks.list(status, search);

  return useMutation({
    mutationFn: (payload: CreateTaskInput) => createTask(payload),
    onMutate: async (payload) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<TasksResponse>(queryKey);

      const tempTask: Task = {
        _id: `temp-${Date.now()}`,
        title: payload.title,
        description: payload.description,
        status: 'PENDING',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<TasksResponse | undefined>(queryKey, (current) =>
        updateOptimisticList(current, (tasks) => [tempTask, ...tasks]),
      );

      return { previous };
    },
    onSuccess: () => {
      toastSuccess('Task created');
    },
    onError: (error, _variables, context) => {
      rollbackList(queryClient, queryKey, context?.previous);
      toastError(error);
    },
    onSettled: async () => {
      await invalidateTaskQueries(queryClient);
    },
  });
};

export const useUpdateTask = (status: StatusFilter, search: string) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.tasks.list(status, search);

  return useMutation({
    mutationFn: ({ taskId, payload }: { taskId: string; payload: UpdateTaskInput }) =>
      updateTask(taskId, payload),
    onMutate: async ({ taskId, payload }) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<TasksResponse>(queryKey);

      queryClient.setQueryData<TasksResponse | undefined>(queryKey, (current) =>
        updateOptimisticList(current, (tasks) =>
          tasks.map((task) =>
            task._id === taskId ? { ...task, ...payload, updatedAt: new Date().toISOString() } : task,
          ),
        ),
      );

      return { previous };
    },
    onSuccess: () => {
      toastSuccess('Task updated');
    },
    onError: (error, _variables, context) => {
      rollbackList(queryClient, queryKey, context?.previous);
      toastError(error);
    },
    onSettled: async (_data, _error, variables) => {
      await invalidateTaskQueries(queryClient, variables.taskId);
    },
  });
};

export const useDeleteTask = (status: StatusFilter, search: string) => {
  const queryClient = useQueryClient();
  const queryKey = queryKeys.tasks.list(status, search);

  return useMutation({
    mutationFn: (taskId: string) => deleteTask(taskId),
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({ queryKey });
      const previous = queryClient.getQueryData<TasksResponse>(queryKey);

      queryClient.setQueryData<TasksResponse | undefined>(queryKey, (current) =>
        updateOptimisticList(current, (tasks) => tasks.filter((task) => task._id !== taskId)),
      );

      return { previous };
    },
    onSuccess: () => {
      toastSuccess('Task deleted');
    },
    onError: (error, _variables, context) => {
      rollbackList(queryClient, queryKey, context?.previous);
      toastError(error);
    },
    onSettled: async (_data, _error, taskId) => {
      await invalidateTaskQueries(queryClient, taskId);
    },
  });
};
