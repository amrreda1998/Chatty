import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connectDB } from './lib/db.js';

import authRoutes from './routes/auth.route.js';
import messageRoutes from './routes/message.route.js';
import { app, server } from './lib/socket.js';

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/messages', messageRoutes);

//testing server
app.get('/', async (req, res) => {
  try {
    res.status(200).send({ data: 'server is working' });
  } catch (err) {
    res.status(400).send({ message: 'Error' });
  }
});

server.listen(PORT, () => {
  console.log('server is running on PORT:' + PORT);
  connectDB();
});
