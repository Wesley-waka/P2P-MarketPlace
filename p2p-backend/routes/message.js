import express from "express";
import { getMatchedUser, getMessages, getUsersForSidebar, sendMessage } from "../controllers/message.controller.js";
import protectRoute from "../middlewares/protectRoute.js";

const messageRouter = express.Router();

const attachUser = (req, res, next) => {
  req.user = { _id: '67456d3e68a5c4e8e06bf299' }; // Attach the user object
  next();
};

messageRouter.get("/matched",  getUsersForSidebar);
messageRouter.get("/fetch/:id",  getMessages);
messageRouter.post("/send/:id", sendMessage);
messageRouter.get("/match", getMatchedUser);


// messageRouter.get("/:id", attachUser, getMessages);
// messageRouter.post("/send/:id", attachUser, sendMessage);
// messageRouter.get("/", attachUser, getUsersForSidebar);
// messageRouter.get('/match-user/:id', attachUser, getMatchedUser);
// messageRouter.get("/", protectRoute, getUsersForSidebar); - get users depending on the ones you have chatted with

// const attachUser = (req, res, next) => {
//   req.user = { _id: '673bf0890372797bcf82e2b7' }; // Attach the user object
//   next();
// };

// messageRouter.get("/:id",  attachUser, getMessages);
// messageRouter.post("/send/:id",  attachUser, sendMessage);

export default messageRouter;