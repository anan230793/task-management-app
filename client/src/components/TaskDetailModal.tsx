import { useMemo } from 'react';

import { Task } from '../types/task';
import { BaseModal } from './ui/BaseModal';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { Loader } from './ui/Loader';

interface TaskDetailModalProps {
  isOpen: boolean;
  task: Task | null;
  isLoading: boolean;
  isError: boolean;
  onClose: () => void;
}

const formatDateTime = (value: string): string =>
  new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value));

export const TaskDetailModal = ({
  isOpen,
  task,
  isLoading,
  isError,
  onClose,
}: TaskDetailModalProps) => {
  const titleId = useMemo(() => `task-detail-title-${Math.random().toString(36).slice(2, 9)}`, []);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} labelledBy={titleId}>
      <h2 id={titleId} className="text-xl font-semibold text-ink-primary">
        Task details
      </h2>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <Loader size="lg" />
        </div>
      ) : isError || !task ? (
        <p className="mt-4 text-sm text-danger">Task not found or invalid task ID.</p>
      ) : (
        <div className="mt-4 min-w-0 space-y-4 overflow-y-auto pr-1">
          <div className="flex min-w-0 items-start justify-between gap-3">
            <h3 className="min-w-0 flex-1 break-words text-lg font-medium text-ink-primary">{task.title}</h3>
            <Badge status={task.status} />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-wide text-ink-secondary">Description</p>
            <p className="mt-1 max-h-40 overflow-y-auto break-words text-sm leading-relaxed text-ink-secondary">
              {task.description || 'No description'}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-secondary">Created</p>
              <p className="mt-1 text-sm text-ink-primary">{formatDateTime(task.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-ink-secondary">Updated</p>
              <p className="mt-1 text-sm text-ink-primary">{formatDateTime(task.updatedAt)}</p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button variant="secondary" onClick={onClose} aria-label="Close task details">
          Close
        </Button>
      </div>
    </BaseModal>
  );
};
