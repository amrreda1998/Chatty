import express from 'express';
import { updateProfile } from '../controllers/userController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const userRouter = express.Router();

userRouter.put('/profile', protectRoute, upload.single('image'), updateProfile);

export default userRouter;
