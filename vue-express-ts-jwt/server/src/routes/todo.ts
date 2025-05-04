import express from 'express';
import { getTodos, getTodo, createTodo, updateTodo, deleteTodo } from '../controllers/todo';
import { protect } from '../middleware/auth';

const router = express.Router();

// All routes are protected with JWT authentication
router.use(protect);

// Get all todos and create a new todo
router.route('/')
  .get(getTodos)
  .post(createTodo);

// Get, update and delete a specific todo
router.route('/:id')
  .get(getTodo)
  .put(updateTodo)
  .delete(deleteTodo);

export default router; 