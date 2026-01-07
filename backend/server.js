// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// require('dotenv').config();

// const connectDB = require('./config/db');

// // Initialize Express
// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(helmet()); // Security headers
// app.use(cors({
//   origin: process.env.ALLOWED_ORIGINS.split(','),
//   credentials: true
// }));
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));
// app.use(morgan('dev')); // Logging

// // Static files for uploads
// app.use('/uploads', express.static('uploads'));

// // API Routes
// app.get('/', (req, res) => {
//   res.json({
//     success: true,
//     message: 'Thermal-Based Fertilizer Efficiency Tracker API',
//     version: '1.0.0',
//     status: 'active',
//     endpoints: {
//       health: '/health',
//       api: '/api'
//     }
//   });
// });

// // Health check endpoint
// app.get('/health', (req, res) => {
//   res.json({
//     success: true,
//     status: 'OK',
//     timestamp: new Date().toISOString(),
//     uptime: process.uptime(),
//     database: 'connected',
//     memory: {
//       used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
//       total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
//     }
//   });
// });

// // Test database connection
// app.get('/api/test-db', async (req, res) => {
//   try {
//     const mongoose = require('mongoose');
//     const dbState = mongoose.connection.readyState;
    
//     const states = {
//       0: 'disconnected',
//       1: 'connected',
//       2: 'connecting',
//       3: 'disconnecting'
//     };

//     res.json({
//       success: true,
//       database: {
//         status: states[dbState],
//         name: mongoose.connection.name,
//         host: mongoose.connection.host
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Database test failed',
//       error: error.message
//     });
//   }
// });

// // Routes will be added here
// // app.use('/api/auth', require('./routes/auth'));
// // app.use('/api/crops', require('./routes/crops'));
// // app.use('/api/thermal', require('./routes/thermal'));
// // app.use('/api/analysis', require('./routes/analysis'));

// // 404 handler
// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//     path: req.originalUrl
//   });
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   console.error('❌ Error:', err.stack);
  
//   res.status(err.status || 500).json({
//     success: false,
//     message: err.message || 'Internal server error',
//     error: process.env.NODE_ENV === 'development' ? err.stack : {}
//   });
// });

// // Start server
// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log('='.repeat(50));
//   console.log(`🚀 Server running in ${process.env.NODE_ENV} mode`);
//   console.log(`📡 Listening on port ${PORT}`);
//   console.log(`🌐 URL: http://localhost:${PORT}`);
//   console.log('='.repeat(50));
// });

// module.exports = app;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();


const allowedOrigins = process.env.ALLOWED_ORIGINS 
  ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) 
  : ['http://localhost:3000'];


const connectDB = require('./config/db');

const app = express();

connectDB();

app.use(helmet());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      callback(null, true);
    } else {
      console.log("Blocked by CORS: ", origin); // This will show in your Render logs!
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

// app.use(cors({
//   // This allows you to set multiple URLs in the Render dashboard
//   origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : "http://localhost:3000",
//   credentials: true
// }));


// Middleware
// app.use(helmet());
// app.use(cors({
//   origin: "https://fertilizer-tracker.vercel.app"
//   // origin: process.env.ALLOWED_ORIGINS.split(','),
//   // credentials: true
// }));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(morgan('dev'));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Thermal-Based Fertilizer Efficiency Tracker API',
    version: '1.0.0',
    endpoints: {
      health: '/health',
      auth: '/api/auth',
      crops: '/api/crops',
      thermal: '/api/thermal',
      analysis: '/api/analysis',
      upload: '/api/upload'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({
    success: true,
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'connected'
  });
});

// Mount routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/crops', require('./routes/crops'));
app.use('/api/thermal', require('./routes/thermal'));
app.use('/api/analysis', require('./routes/analysis'));
app.use('/api/upload', require('./routes/upload'));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    path: req.originalUrl
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : {}
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log(`🚀 Server running in ${process.env.NODE_ENV} mode`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`🌐 URL: http://localhost:${PORT}`);
  console.log('='.repeat(60));
});

module.exports = app;
