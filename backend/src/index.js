import express from 'express';
import authRouter from './routes/authRoute.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
