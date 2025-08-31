import mongoose from 'mongoose';
import { MONGODB_URI } from '$env/static/private';

export async function connectDB() {
  try {
    console.log('=== DATABASE CONNECTION ===');
    console.log('MongoDB URI:', MONGODB_URI ? 'Set' : 'NOT SET');
    
    // Check if already connected
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to MongoDB');
      return;
    }
    
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully');
  } catch (error) {
    console.error('=== DATABASE CONNECTION ERROR ===');
    console.error('MongoDB connection error:', error);
    console.error('Error message:', error.message);
    // Don't exit the process, just throw the error
    throw error;
  }
}
