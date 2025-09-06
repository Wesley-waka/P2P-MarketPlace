import express from 'express';
import { json, static as serveStatic } from 'express';
import bodyParser from 'body-parser';
import mongoose, { connect } from 'mongoose';
import { config } from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import authRouter from './routes/auth.js';
import reviewRouter from './routes/review.routes.js';
import messageRouter from './routes/message.js';
import tractorRouter from './routes/tractors.js';
import implementsRouter from './routes/implements.js';
import childDealerRouter from './routes/childDealer.js';
import DealerRouter from './routes/dealer.js';
import cookieParser from 'cookie-parser';

const app = express();

// Configure environment variables
config();

// File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware setup
app.use(cookieParser());
app.use(json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'fallback-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Database connection with caching for serverless
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb && mongoose.connection.readyState === 1) {
    return cachedDb;
  }

  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI environment variable is not set');
    }

    const connection = await connect(process.env.MONGO_URI, {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    cachedDb = connection;
    console.log('Connected to MongoDB');
    return connection;
  } catch (error) {
    console.error('Database connection error:', error);
    throw error;
  }
}

// Middleware to ensure database connection
app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (error) {
    console.error('Database connection failed:', error);
    res.status(500).json({ 
      error: 'Database connection failed',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

// Static files (Note: Static files don't work well on Vercel serverless functions)
// Consider using a CDN or separate static hosting for uploads
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/tractor', tractorRouter);
app.use('/api/implement', implementsRouter);
app.use("/api/review", reviewRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/child-dealer', childDealerRouter);
app.use('/api/dealer', DealerRouter);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello Tractor API is running....', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Handle 404 routes
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Export the Express app for Vercel
export default app;