import express from 'express';
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/user';
import { protect, admin } from '../middleware/auth';

const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// Admin-only routes
router.get('/', admin, getUsers);
router.get('/:id', admin, getUserById);
router.put('/:id', admin, updateUser);
router.delete('/:id', admin, deleteUser);

export default router; 