import { useEffect, useMemo, useState } from 'react';

import { ConfirmModal } from '../components/ConfirmModal';
import { DashboardStats } from '../components/DashboardStats';
import { SkeletonCard } from '../components/SkeletonCard';
import { TaskCard } from '../components/TaskCard';
import { TaskDetailModal } from '../components/TaskDetailModal';
import { TaskFilters } from '../components/TaskFilters';
import { TaskForm } from '../components/TaskForm';
import { TaskModal } from '../components/TaskModal';
import { Button } from '../components/ui/Button';
import { EmptyState } from '../components/ui/EmptyState';
import { PageContainer } from '../components/ui/PageContainer';
import { useDebounce } from '../hooks/useDebounce';
import { useTaskStats } from '../hooks/useTaskStats';
import {
  useCreateTask,
  useDeleteTask,
  useTaskById,
  useTasks,
  useUpdateTask,
} from '../hooks/useTasks';
import { StatusFilter, Task } from '../types/task';
import { toastError } from '../utils/toast';

const DashboardPage = () => {
  const [status, setStatus] = useState<StatusFilter>('ALL');
  const [search, setSearch] = useState('');

  const [fetchedTaskId, setFetchedTaskId] = useState('');
  const [isDetailOpen, setDetailOpen] = useState(false);

  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  const debouncedSearch = useDebounce(search, 400);

  const { data, isLoading, isError } = useTasks(status, debouncedSearch);
  const { total, pending, completed, isLoading: isStatsLoading } = useTaskStats();

  const {
    data: taskDetailData,
    isLoading: isDetailLoading,
    isError: isDetailError,
    isFetched: isDetailFetched,
  } = useTaskById(fetchedTaskId);

  const createTaskMutation = useCreateTask(status, debouncedSearch);
  const updateTaskMutation = useUpdateTask(status, debouncedSearch);
  const deleteTaskMutation = useDeleteTask(status, debouncedSearch);

  const tasks = useMemo(() => data?.tasks ?? [], [data?.tasks]);
  const isSearchActive = debouncedSearch.trim().length > 0;

  useEffect(() => {
    if (isError) {
      toastError(new Error('Failed to load tasks. Please try again.'));
    }
  }, [isError]);

  useEffect(() => {
    if (!fetchedTaskId || !isDetailFetched || isDetailLoading) {
      return;
    }

    setDetailOpen(true);

    if (isDetailError) {
      toastError(new Error('Task not found'));
    }
  }, [fetchedTaskId, isDetailFetched, isDetailLoading, isDetailError]);

  const handleCloseDetail = (): void => {
    setDetailOpen(false);
    setFetchedTaskId('');
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-ink-primary">Dashboard</h1>
            <p className="mt-1 text-sm text-ink-secondary">Manage and track your tasks</p>
          </div>
          <Button onClick={() => setCreateModalOpen(true)} aria-label="Create new task">
            New Task
          </Button>
        </div>

        <DashboardStats
          total={total}
          pending={pending}
          completed={completed}
          isLoading={isStatsLoading}
        />

        <TaskFilters
          status={status}
          search={search}
          taskCount={tasks.length}
          onStatusChange={setStatus}
          onSearchChange={setSearch}
          onClearSearch={() => setSearch('')}
        />

        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : isError ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <EmptyState
              title="Unable to load tasks"
              subtitle="Something went wrong while fetching your tasks. Please refresh the page."
            />
          </div>
        ) : tasks.length === 0 ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <EmptyState
              title={isSearchActive ? 'No tasks found for this search.' : 'No tasks yet'}
              subtitle={
                isSearchActive
                  ? 'Try another keyword or clear your search filter.'
                  : 'Create your first task to get started with productivity.'
              }
              action={
                !isSearchActive ? (
                  <Button onClick={() => setCreateModalOpen(true)} aria-label="Create first task">
                    Create your first task
                  </Button>
                ) : undefined
              }
            />
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                isToggling={
                  updateTaskMutation.isPending && updateTaskMutation.variables?.taskId === task._id
                }
                onView={(currentTask) => {
                  setFetchedTaskId(currentTask._id);
                }}
                onEdit={setEditingTask}
                onDelete={setDeletingTask}
                onToggle={(currentTask) => {
                  updateTaskMutation.mutate({
                    taskId: currentTask._id,
                    payload: {
                      status: currentTask.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED',
                    },
                  });
                }}
              />
            ))}
          </div>
        )}
      </div>

      <TaskDetailModal
        isOpen={isDetailOpen}
        task={taskDetailData?.task ?? null}
        isLoading={isDetailLoading}
        isError={isDetailError}
        onClose={handleCloseDetail}
      />

      <TaskModal isOpen={isCreateModalOpen} title="Create task" onClose={() => setCreateModalOpen(false)}>
        <TaskForm
          isLoading={createTaskMutation.isPending}
          onSubmit={(values) => {
            createTaskMutation.mutate(values, {
              onSuccess: () => {
                setCreateModalOpen(false);
              },
            });
          }}
        />
      </TaskModal>

      <TaskModal isOpen={Boolean(editingTask)} title="Edit task" onClose={() => setEditingTask(null)}>
        <TaskForm
          mode="edit"
          defaultValues={
            editingTask
              ? {
                  title: editingTask.title,
                  description: editingTask.description || '',
                }
              : undefined
          }
          isLoading={updateTaskMutation.isPending}
          onSubmit={(values) => {
            if (!editingTask) {
              return;
            }

            updateTaskMutation.mutate(
              {
                taskId: editingTask._id,
                payload: values,
              },
              {
                onSuccess: () => {
                  setEditingTask(null);
                },
              },
            );
          }}
        />
      </TaskModal>

      <ConfirmModal
        isOpen={Boolean(deletingTask)}
        title="Delete task"
        description={`Are you sure you want to delete '${deletingTask?.title ?? ''}'? This action cannot be undone.`}
        isLoading={deleteTaskMutation.isPending}
        onCancel={() => setDeletingTask(null)}
        onConfirm={() => {
          if (!deletingTask) {
            return;
          }

          deleteTaskMutation.mutate(deletingTask._id, {
            onSuccess: () => {
              setDeletingTask(null);
            },
          });
        }}
      />
    </PageContainer>
  );
};

export default DashboardPage;
