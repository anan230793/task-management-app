import mongoose from 'mongoose';

import Task, { TaskStatus } from '../models/Task.model';
import { AppError } from '../utils/AppError';

export interface TaskInput {
  title: string;
  description?: string;
}

export interface TaskUpdateInput {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

export interface TaskQueryInput {
  status?: TaskStatus;
  search?: string;
}

const ensureOwnership = async (taskId: string, userId: string) => {
  const task = await Task.findOne({ _id: taskId, user: userId, isDeleted: false });

  if (!task) {
    throw new AppError('Task not found', 404);
  }

  return task;
};

export const createTask = async (userId: string, payload: TaskInput) => {
  const task = await Task.create({ ...payload, user: userId });
  return task;
};

export const getTasks = async (userId: string, query: TaskQueryInput) => {
  const filter: Record<string, unknown> = {
    user: new mongoose.Types.ObjectId(userId),
    isDeleted: false,
  };

  if (query.status) {
    filter.status = query.status;
  }

  if (query.search) {
    const escapedSearch = query.search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.title = { $regex: escapedSearch, $options: 'i' };
  }

  const tasks = await Task.find(filter).sort({ createdAt: -1 });

  return { tasks };
};

export const getTaskById = async (taskId: string, userId: string) => {
  return ensureOwnership(taskId, userId);
};

export const updateTask = async (taskId: string, userId: string, payload: TaskUpdateInput) => {
  await ensureOwnership(taskId, userId);

  const updatedTask = await Task.findOneAndUpdate(
    { _id: taskId, user: userId, isDeleted: false },
    payload,
    { new: true, runValidators: true },
  );

  if (!updatedTask) {
    throw new AppError('Task not found', 404);
  }

  return updatedTask;
};

export const deleteTask = async (taskId: string, userId: string) => {
  const task = await Task.findOneAndUpdate(
    { _id: taskId, user: userId, isDeleted: false },
    { isDeleted: true, deletedAt: new Date() },
    { new: true },
  );

  if (!task) {
    throw new AppError('Task not found', 404);
  }
};
