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
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_doc, ret) => {
        const sanitized = ret as Record<string, unknown>;
        delete sanitized.__v;
        delete sanitized.isDeleted;
        delete sanitized.deletedAt;
        return ret;
      },
    },
  },
);

export type TaskStatus = 'PENDING' | 'COMPLETED';

export type TaskDocument = InferSchemaType<typeof taskSchema> & {
  _id: mongoose.Types.ObjectId;
};

const Task = (mongoose.models.Task as Model<TaskDocument>) || mongoose.model<TaskDocument>('Task', taskSchema);

export default Task;
