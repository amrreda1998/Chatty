import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const options = {
      serverSelectionTimeoutMS: 60000, // Increase timeout to 60 seconds
      socketTimeoutMS: 45000,
      family: 4,
      retryWrites: true,
      keepAlive: true,
      maxPoolSize: 50,
      wtimeoutMS: 2500,
      connectTimeoutMS: 60000,
    };

    await mongoose.connect(process.env.MONGODB_URI, options);
    console.log('Connected to MongoDB');

    // Add connection error handlers
    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected. Attempting to reconnect...');
    });
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};
