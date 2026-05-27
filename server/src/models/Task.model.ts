import mongoose, { InferSchemaType, Model } from 'mongoose';

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: '',
      trim: true,
      maxlength: 300,
    },
    status: {
      type: String,
      enum: ['PENDING', 'COMPLETED'],
      default: 'PENDING',
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  },
);

export type TaskStatus = 'PENDING' | 'COMPLETED';

export type TaskDocument = InferSchemaType<typeof taskSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Task = (mongoose.models.Task as Model<TaskDocument>) || mongoose.model<TaskDocument>('Task', taskSchema);

export default Task;