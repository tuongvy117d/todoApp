import { Request, Response } from 'express';
import Todo, { ITodo } from '../models/Todo';

// Get all todos for the current user
export const getTodos = async (req: Request, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: todos.length,
      data: todos
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error
    });
  }
};

// Get a single todo
export const getTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
      return;
    }
    
    // Check if the todo belongs to the current user
    if (todo.user.toString() !== req.userId) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to access this todo'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error
    });
  }
};

// Create new todo
export const createTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description } = req.body;
    
    const todo = await Todo.create({
      title,
      description,
      user: req.userId
    });
    
    res.status(201).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to create todo',
      error
    });
  }
};

// Update todo
export const updateTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, completed } = req.body;
    
    let todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
      return;
    }
    
    // Check if the todo belongs to the current user
    if (todo.user.toString() !== req.userId) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to update this todo'
      });
      return;
    }
    
    todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { title, description, completed },
      { new: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: todo
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Failed to update todo',
      error
    });
  }
};

// Delete todo
export const deleteTodo = async (req: Request, res: Response): Promise<void> => {
  try {
    const todo = await Todo.findById(req.params.id);
    
    if (!todo) {
      res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
      return;
    }
    
    // Check if the todo belongs to the current user
    if (todo.user.toString() !== req.userId) {
      res.status(403).json({
        success: false,
        message: 'Not authorized to delete this todo'
      });
      return;
    }
    
    await todo.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
      error
    });
  }
}; 