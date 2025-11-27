const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mernapp');
    
    if (conn.connection.readyState === 1) {
      console.log('✅ MongoDB connected successfully');
    } else {
      console.log('❌ MongoDB connection failed');
    }
    
  } catch (error) {
    console.log('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;