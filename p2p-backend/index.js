import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import path from "path";
import { fileURLToPath } from "url";

import authRouter from "./routes/auth.js";
import reviewRouter from "./routes/review.routes.js";
import messageRouter from "./routes/message.js";
import tractorRouter from "./routes/tractors.js";
import implementsRouter from "./routes/implements.js";
import childDealerRouter from "./routes/childDealer.js";
import DealerRouter from "./routes/dealer.js";

const app = express();

// File path setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(cookieParser());
app.use(express.json());
app.use(session({
  secret: "secret",
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Connect to DB
mongoose.connect(process.env.MONGO_URI);

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/tractor", tractorRouter);
app.use("/api/implement", implementsRouter);
app.use("/api/review", reviewRouter);
app.use("/api/auth", authRouter);
app.use("/api/messages", messageRouter);
app.use("/api/child-dealer", childDealerRouter);
app.use("/api/dealer", DealerRouter);

app.get("/", (req, res) => {
  res.send("Hello Tractor API is running....");
});

// ✅ Export handler for Vercel
export default app;
