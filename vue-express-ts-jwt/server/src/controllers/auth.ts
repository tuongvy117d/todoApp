import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import { generateToken } from '../utils/jwt';

// Define a type for Mongoose document with _id
interface WithId {
  _id: mongoose.Types.ObjectId;
}

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    // Check if all required fields are provided
    if (!email || !password || !username) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user
    const user = await User.create({
      email,
      password,
      username,
    });

    if (user) {
      // Type assertion to handle _id property5123
      const userWithId = user as unknown as IUser & WithId;
      
      // Generate token using the string representation of the ObjectId
      const token = generateToken({ id: userWithId._id.toString() });

      return res.status(201).json({
        success: true,
        user: {
          id: userWithId._id,
          username: userWithId.username,
          email: userWithId.email,
          role: userWithId.role,
        },
        token,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Invalid user data',
      });
    }
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Find user by email with explicit typing
    const userDoc = await User.findOne({ email }).exec();
    if (!userDoc) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }
    
    const user = userDoc as unknown as IUser & WithId;

    // Check if password is correct
    if (!(await user.comparePassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Generate token
    const token = generateToken({ id: user._id.toString() });

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
};

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req: Request, res: Response) => {
  try {
    const userDoc = await User.findById(req.userId).select('-password');

    if (!userDoc) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
    
    // Type assertion to handle _id property
    const user = userDoc as unknown as Omit<IUser, 'password'> & WithId;

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message || 'Server error',
    });
  }
}; 