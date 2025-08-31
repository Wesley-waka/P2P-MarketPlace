// import { Server } from 'socket.io';
// import http from 'http';
// import express from 'express';
// import mongoose from 'mongoose'; // Import mongoose for validation
//
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
// 	cors: {
// 		origin: process.env.CLIENT_ORIGIN || '*', // Restrict to your client's origin
// 		methods: ['GET', 'POST'],
// 	},
// });
//
// // Store online users
// const onlineUsers = new Map();
//
// // Utility function to get receiver's socket ID
// export const getReceiverSocketId = (receiverId) => {
// 	return onlineUsers.get(receiverId);
// };
//
// io.on('connection', (socket) => {
// 	console.log('A user connected:', socket.id);
//
// 	// Handle user login
// 	socket.on('login', (userId) => {
// 		if (!mongoose.Types.ObjectId.isValid(userId)) {
// 			console.error('Invalid userId:', userId);
// 			return;
// 		}
// 		console.log(`User ${userId} is online`);
// 		onlineUsers.set(userId, socket.id);
// 		io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
// 	});
//
// 	// Handle new messages
// 	socket.on('newMessage', (message) => {
// 		const { receiverId } = message;
// 		if (!mongoose.Types.ObjectId.isValid(receiverId)) {
// 			console.error('Invalid receiverId:', receiverId);
// 			return;
// 		}
// 		const receiverSocketId = getReceiverSocketId(receiverId);
// 		if (receiverSocketId) {
// 			io.to(receiverSocketId).emit('newMessage', message);
// 		}
// 	});
//
// 	// Handle user disconnect
// 	socket.on('disconnect', () => {
// 		console.log('A user disconnected:', socket.id);
// 		for (const [userId, socketId] of onlineUsers.entries()) {
// 			if (socketId === socket.id) {
// 				onlineUsers.delete(userId);
// 				break;
// 			}
// 		}
// 		io.emit('getOnlineUsers', Array.from(onlineUsers.keys()));
// 	});
// });
//
// export { app, io, server };