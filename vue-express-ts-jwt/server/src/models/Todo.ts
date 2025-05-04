import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface ITodo extends Document {
  title: string;
  description?: string;
  completed: boolean;
  user: mongoose.Types.ObjectId | IUser;
  createdAt: Date;
  updatedAt: Date;
}

const TodoSchema = new Schema<ITodo>(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: [100, 'Title cannot be more than 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },
    completed: {
      type: Boolean,
      default: false
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model<ITodo>('Todo', TodoSchema); 