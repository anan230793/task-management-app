import { Search, X } from 'lucide-react';

import { StatusFilter } from '../types/task';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

interface TaskFiltersProps {
  status: StatusFilter;
  search: string;
  taskCount?: number;
  onStatusChange: (status: StatusFilter) => void;
  onSearchChange: (value: string) => void;
  onClearSearch: () => void;
}

const statuses: StatusFilter[] = ['ALL', 'PENDING', 'COMPLETED'];

export const TaskFilters = ({
  status,
  search,
  taskCount,
  onStatusChange,
  onSearchChange,
  onClearSearch,
}: TaskFiltersProps) => {
  return (
    <div className="rounded-2xl border border-surface-border bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          {statuses.map((item) => (
            <Button
              key={item}
              type="button"
              size="sm"
              variant={status === item ? 'primary' : 'secondary'}
              className="rounded-full"
              onClick={() => onStatusChange(item)}
              aria-label={`Filter ${item.toLowerCase()} tasks`}
            >
              {item}
            </Button>
          ))}
          {typeof taskCount === 'number' ? (
            <span className="rounded-full bg-surface-page px-2.5 py-1 text-xs font-medium text-ink-secondary">
              {taskCount} tasks
            </span>
          ) : null}
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-0 flex-1">
            <Input
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search tasks..."
              aria-label="Search tasks"
              rightElement={<Search size={16} className="text-ink-secondary" />}
            />
          </div>
          {search ? (
            <Button type="button" variant="ghost" size="sm" onClick={onClearSearch} aria-label="Clear search">
              <X size={16} />
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
