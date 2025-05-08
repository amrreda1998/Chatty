import express from 'express';
import authRouter from './routes/authRoute.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';
import userRouter from './routes/userRoute.js';
import cookieParser from 'cookie-parser';
import messageRouter from './routes/messageRoute.js';
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT;

const app = express();

// Allow CORS for your frontend origin
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true, // allow cookies and credentials
  })
);

app.use(cookieParser());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/message', messageRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
