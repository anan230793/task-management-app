export const queryKeys = {
  auth: {
    me: ['auth', 'me'] as const,
  },
  tasks: {
    all: ['tasks'] as const,
    list: (filter?: string, search?: string) =>
      ['tasks', 'list', filter ?? 'ALL', search ?? ''] as const,
    detail: (taskId: string) => ['tasks', 'detail', taskId] as const,
  },
};
