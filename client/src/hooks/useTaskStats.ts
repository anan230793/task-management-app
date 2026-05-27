import { useQueries } from '@tanstack/react-query';

import { getTasks } from '../api/task.api';
import { queryKeys } from '../constants/queryKeys';
import { TasksResponse } from '../types/task';

const STATS_STALE_TIME = 30_000;

export const useTaskStats = () => {
  const [allQuery, pendingQuery, completedQuery] = useQueries({
    queries: [
      {
        queryKey: queryKeys.tasks.list('ALL', ''),
        queryFn: () => getTasks({}),
        staleTime: STATS_STALE_TIME,
        select: (data: TasksResponse) => data.tasks.length,
      },
      {
        queryKey: queryKeys.tasks.list('PENDING', ''),
        queryFn: () => getTasks({ status: 'PENDING' }),
        staleTime: STATS_STALE_TIME,
        select: (data: TasksResponse) => data.tasks.length,
      },
      {
        queryKey: queryKeys.tasks.list('COMPLETED', ''),
        queryFn: () => getTasks({ status: 'COMPLETED' }),
        staleTime: STATS_STALE_TIME,
        select: (data: TasksResponse) => data.tasks.length,
      },
    ],
  });

  return {
    total: allQuery.data ?? 0,
    pending: pendingQuery.data ?? 0,
    completed: completedQuery.data ?? 0,
    isLoading: allQuery.isLoading || pendingQuery.isLoading || completedQuery.isLoading,
  };
};
