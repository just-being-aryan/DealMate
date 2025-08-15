// controllers/auth.controller.js
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import ApiError from "../utils/apiError.js";
import User from "../models/user.model.js";
import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 10,
  message: { message: "Too many attempts, try again later." },
});


const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};


export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    throw new ApiError(400, "All fields are required.");
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(400, "Email already registered.");
  }

  const user = await User.create({ name, email, password, role });

  res.status(201).json({
    status: "success",
    token: generateToken(user._id, user.role),
    data: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});


export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Please provide email and password.");
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.matchPassword(password))) {
    throw new ApiError(401, "Invalid email or password.");
  }

  res.status(200).json({
    status: "success",
    token: generateToken(user._id, user.role),
    data: { id: user._id, name: user.name, email: user.email, role: user.role },
  });
});


