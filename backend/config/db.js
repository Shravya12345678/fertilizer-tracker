// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     // Connection options
//     const options = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       socketTimeoutMS: 45000,
//     };

//     const conn = await mongoose.connect(process.env.MONGODB_URI, options);

//     console.log('✅ MongoDB Connected Successfully!');
//     console.log(`   Host: ${conn.connection.host}`);
//     console.log(`   Database: ${conn.connection.name}`);
//     console.log(`   Port: ${conn.connection.port}`);

//     // Handle connection events
//     mongoose.connection.on('error', (err) => {
//       console.error('❌ MongoDB connection error:', err);
//     });

//     mongoose.connection.on('disconnected', () => {
//       console.log('⚠️  MongoDB disconnected');
//     });

//     // Graceful shutdown
//     process.on('SIGINT', async () => {
//       await mongoose.connection.close();
//       console.log('MongoDB connection closed through app termination');
//       process.exit(0);
//     });

//   } catch (error) {
//     console.error('❌ MongoDB connection failed:', error.message);
//     console.error('   Make sure MongoDB is running!');
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Simplified options for modern Mongoose versions
    const options = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    const conn = await mongoose.connect(process.env.MONGODB_URI, options);
    
    console.log('✅ MongoDB Connected Successfully!');
    console.log(`  Host: ${conn.connection.host}`);
    console.log(`  Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.error(' Make sure MongoDB is running!');
    process.exit(1);
  }
};

module.exports = connectDB;