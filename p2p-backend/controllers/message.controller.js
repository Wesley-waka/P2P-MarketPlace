import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import { getReceiverSocketId, io } from "../index.js";
import User from "../models/User.js";
import mongoose from 'mongoose';

export const sendMessage = async (req, res) => {
	try {
		const { message } = req.body;
		const { id: receiverId } = req.params;
		const senderId = req.query.id;

		if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
			return res.status(400).json({ error: 'Invalid user ID' });
		}

		let conversation = await Conversation.findOne({
			participants: { $all: [senderId, receiverId] },
		});

		if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

		const newMessage = new Message({
			senderId,
			receiverId,
			message,
		});

		if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

		await Promise.all([conversation.save(), newMessage.save()]);

		const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			io.to(receiverSocketId).emit('newMessage', newMessage);
		}

		res.status(201).json(newMessage);
	} catch (error) {
		console.log('Error in sendMessage controller: ', error.message);
		res.status(500).json({ error: 'Internal server error' });
	}
};



export const getMatchedUser = async (req, res) => {
	try {
		const { id: matchedUserId,userId: loggedInUserId } = req.query;
		// const loggedInUserId = req.query.id;

		console.log(matchedUserId,loggedInUserId, 'IDs in getMatchedUser ------');
		if (!mongoose.Types.ObjectId.isValid(matchedUserId) || !mongoose.Types.ObjectId.isValid(loggedInUserId)) {
			return res.status(400).json({ error: "Invalid user ID" });
		}

		const matchedUser = await User.findById(matchedUserId);
		const loggedInUser = await User.findById(loggedInUserId);

		if (!matchedUser || !loggedInUser) {
			return res.status(404).json({ message: "User not found" });
		}

		if (matchedUser.matchedUsers.includes(loggedInUserId) || loggedInUser.matchedUsers.includes(matchedUserId)) {
			return res.status(200).json({ message: "User already matched" });
		}

		matchedUser.matchedUsers.push(loggedInUserId);
		loggedInUser.matchedUsers.push(matchedUserId);

		await Promise.all([matchedUser.save(), loggedInUser.save()]);
		res.status(200).json({ message: "User matched successfully" });
	} catch (error) {
		console.error("Error in matchUser: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};

export const getUsersForSidebar = async (req, res) => {
	try {
		const loggedInUserId = req.query.id;

		const receiverObjectId = new mongoose.Types.ObjectId(loggedInUserId);
		const filteredUsers = await User.find({ matchedUsers: { $eq: loggedInUserId } }).select("-password");

		res.status(200).json(filteredUsers);
	} catch (error) {
		console.error("Error in getUsersForSidebar: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};


export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.query.id;

		if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(userToChatId)) {
			return res.status(400).json({ error: "Invalid user ID" });
		}

		const senderObjectId = new mongoose.Types.ObjectId(senderId);
		const receiverObjectId = new mongoose.Types.ObjectId(userToChatId);

		const conversation = await Conversation.findOne({
			participants: { $all: [senderObjectId, receiverObjectId] },
		}).populate("messages");

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};