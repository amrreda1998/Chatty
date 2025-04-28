import express from 'express';
import authRouter from './routes/authRoute.js';

const app = express();

app.use("/api/auth",authRouter);


app.listen(5001, () => {
  console.log('server is running on port 5001');
});
