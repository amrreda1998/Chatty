import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.put('/profile', protectRoute, updateProfile);

export default userRouter;
