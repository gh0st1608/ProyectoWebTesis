import mongoose from 'mongoose'
import initializeConfig from '../config'

initializeConfig();

const url = process.env.DB_DIP!;

const connectDB = async () => {
    try {
         await mongoose.connect(url);
  
        console.log('MongoDB connected!!');
    } catch (err) {
        console.log('Failed to connect to MongoDB', err);
    }
  };
  
  
  export default connectDB;
  