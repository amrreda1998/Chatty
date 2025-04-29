import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MogogoDBUrl);
    console.log(`MongoDB connected successfully !!`);
  } catch (error) {
    console.log(`MongoDB connection error `, error);
  }
};
