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
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

// Configure environment variables
config();

// Store online users
const onlineUsers = new Map();

// Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_ORIGIN || '*',
    methods: ['GET', 'POST'],
  },
});

// Configure CORS
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Utility function to get receiver's socket ID
const getReceiverSocketId = (receiverId) => {
  return onlineUsers.get(receiverId);
};

// Socket.IO event handlers
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.on('login', (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.error('Invalid userId:', userId);
      return;
    }


    console.log(`User ${userId} is online`);
    onlineUsers.set(userId, socket.id);
    io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
  });

  socket.on('newMessage', (message) => {
    const { receiverId } = message;
    if (!mongoose.Types.ObjectId.isValid(receiverId)) {
      console.error('Invalid receiverId:', receiverId);
      return;
    }
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('newMessage', message);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
  });
});

// File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(cookieParser());
app.use(json());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Database connection
connect(process.env.MONGO_URI);

// Static files and routes
app.use('/uploads', serveStatic(path.join(__dirname, 'uploads')));
app.use('/api/tractor', tractorRouter);
app.use('/api/implement', implementsRouter);
app.use("/api/review", reviewRouter);
app.use('/api/auth', authRouter);
app.use('/api/messages', messageRouter);
app.use('/api/child-dealer', childDealerRouter);
app.use('/api/dealer', DealerRouter);




app.get('/', (req, res) => {
  res.send('Hello Tractor API is running....');
});

// Start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { io, getReceiverSocketId };