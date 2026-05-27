import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createTaskSchema,
  CreateTaskInput,
  editTaskFormSchema,
  EditTaskFormInput,
} from '../types/task';
import { Button } from './ui/Button';
import { Input, Textarea } from './ui/Input';

interface TaskFormProps {
  mode?: 'create' | 'edit';
  defaultValues?: CreateTaskInput;
  isLoading?: boolean;
  onSubmit: (values: CreateTaskInput) => void;
}

export const TaskForm = ({
  mode = 'create',
  defaultValues,
  isLoading = false,
  onSubmit,
}: TaskFormProps) => {
  const isEdit = mode === 'edit';

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTaskInput>({
    resolver: zodResolver(isEdit ? editTaskFormSchema : createTaskSchema),
    defaultValues,
  });

  const description = watch('description') || '';

  const handleFormSubmit = (values: CreateTaskInput | EditTaskFormInput): void => {
    onSubmit(values);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
      <Input
        label="Title"
        placeholder="Task title"
        aria-label="Task title"
        {...register('title')}
        error={errors.title?.message}
      />

      <div>
        <Textarea
          multiline
          label="Description"
          placeholder="Task details"
          rows={4}
          maxLength={300}
          aria-label="Task description"
          {...register('description')}
          error={errors.description?.message}
        />
        <p
          className={`mt-1 text-right text-xs ${
            description.length >= 280 ? 'text-danger' : 'text-ink-secondary'
          }`}
        >
          {description.length}/300
        </p>
      </div>

      <Button type="submit" className="w-full" isLoading={isLoading} aria-label="Save task">
        {isEdit ? 'Update Task' : 'Save Task'}
      </Button>
    </form>
  );
};
