import { CheckCircle2, Circle, Eye, Pencil, Trash2 } from 'lucide-react';

import { Task } from '../types/task';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';

interface TaskCardProps {
  task: Task;
  onView: (task: Task) => void;
  onEdit: (task: Task) => void;
  onDelete: (task: Task) => void;
  onToggle: (task: Task) => void;
  isToggling?: boolean;
}

export const TaskCard = ({ task, onView, onEdit, onDelete, onToggle, isToggling = false }: TaskCardProps) => {
  const formattedDate = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(task.createdAt));

  const isCompleted = task.status === 'COMPLETED';

  return (
    <article
      className={`rounded-2xl border border-surface-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md border-l-4 ${
        isCompleted ? 'border-l-brand' : 'border-l-pending'
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-ink-primary">{task.title}</h3>
        <Badge status={task.status} />
      </div>

      <p className="line-clamp-2 min-h-[2.5rem] text-sm leading-relaxed text-ink-secondary">
        {task.description || 'No description'}
      </p>
      <p className="mt-3 text-xs text-ink-secondary">Created {formattedDate}</p>

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-surface-border pt-4">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => onToggle(task)}
          isLoading={isToggling}
          aria-label={isCompleted ? 'Mark as pending' : 'Mark as done'}
        >
          {isCompleted ? <Circle size={16} /> : <CheckCircle2 size={16} />}
          {isCompleted ? 'Pending' : 'Done'}
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onView(task)} aria-label="View task details">
          <Eye size={16} />
          View
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(task)} aria-label="Edit task">
          <Pencil size={16} />
          Edit
        </Button>
        <Button variant="danger" size="sm" onClick={() => onDelete(task)} aria-label="Delete task">
          <Trash2 size={16} />
          Delete
        </Button>
      </div>
    </article>
  );
};
