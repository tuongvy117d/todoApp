import express from 'express';
import { register, login, getMe } from '../controllers/auth';
import { protect } from '../middleware/auth';

const router = express.Router();

// Register and login routes
router.post('/register', register);
router.post('/login', login);

// Protected route to get current user
router.get('/me', protect, getMe);

export default router; 