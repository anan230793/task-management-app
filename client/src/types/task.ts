import { z } from 'zod';

export const taskStatusSchema = z.enum(['PENDING', 'COMPLETED']);

export type TaskStatus = z.infer<typeof taskStatusSchema>;
export type StatusFilter = 'ALL' | TaskStatus;

export const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  description: z.string().trim().max(300, 'Description must be 300 characters or less').optional(),
});

export const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(300).optional(),
    status: taskStatusSchema.optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field is required',
  });

export const editTaskFormSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200, 'Title must be 200 characters or less'),
  description: z.string().trim().max(300, 'Description must be 300 characters or less').optional(),
});

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateTaskInput = z.infer<typeof createTaskSchema>;
export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
export type EditTaskFormInput = z.infer<typeof editTaskFormSchema>;

export interface TasksResponse {
  tasks: Task[];
}
