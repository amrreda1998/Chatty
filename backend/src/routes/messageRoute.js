import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import {
  getAllMessages,
  getAllUsers,
  sendMessage,
} from '../controllers/messageController.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const messageRouter = express.Router();

messageRouter.get('/users', protectRoute, getAllUsers);
messageRouter.get('/get-all-messages', protectRoute, getAllMessages);
messageRouter.post(
  '/send-message',
  protectRoute,
  upload.single('image'),
  sendMessage
);

export default messageRouter;
