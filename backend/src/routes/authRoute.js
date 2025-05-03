import express from 'express';
import {
  checkAuth,
  logIn,
  logOut,
  signUp,
} from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';
const authRouter = express.Router();

authRouter.post('/signup', signUp);

authRouter.post('/login', logIn);

authRouter.post('/logout', logOut);

authRouter.get('/check-auth', protectRoute, checkAuth);

export default authRouter;
