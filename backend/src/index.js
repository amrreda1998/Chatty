import express from 'express';
import authRouter from './routes/authRoute.js';
import dotenv from 'dotenv';
import { connectDB } from './lib/db.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use('/api/auth', authRouter);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
  connectDB();
});
