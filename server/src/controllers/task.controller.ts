import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { z } from 'zod';

import * as taskService from '../services/task.service';
import { AppError } from '../utils/AppError';
import { asyncHandler } from '../utils/asyncHandler';

const createTaskSchema = z.object({
  title: z.string().trim().min(1, 'Title is required').max(200),
  description: z.string().trim().max(300).optional(),
});

const updateTaskSchema = z
  .object({
    title: z.string().trim().min(1).max(200).optional(),
    description: z.string().trim().max(300).optional(),
    status: z.enum(['PENDING', 'COMPLETED']).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field is required',
  });

const querySchema = z.object({
  status: z.enum(['PENDING', 'COMPLETED']).optional(),
  search: z.string().trim().max(100).optional(),
});

const ensureValidObjectId = (id: string): void => {
  if (!mongoose.isValidObjectId(id)) {
    throw new AppError('Invalid task id', 400);
  }
};

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const input = createTaskSchema.parse(req.body);
  const task = await taskService.createTask(req.user!.id, input);

  res.status(201).json({ task });
});

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const query = querySchema.parse(req.query);
  const result = await taskService.getTasks(req.user!.id, query);

  res.status(200).json(result);
});

export const getTaskById = asyncHandler(async (req: Request, res: Response) => {
  const taskId = String(req.params.id);
  ensureValidObjectId(taskId);
  const task = await taskService.getTaskById(taskId, req.user!.id);

  res.status(200).json({ task });
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const taskId = String(req.params.id);
  ensureValidObjectId(taskId);
  const input = updateTaskSchema.parse(req.body);
  const task = await taskService.updateTask(taskId, req.user!.id, input);

  res.status(200).json({ task });
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  const taskId = String(req.params.id);
  ensureValidObjectId(taskId);
  await taskService.deleteTask(taskId, req.user!.id);

  res.status(200).json({ message: 'Task deleted successfully' });
});