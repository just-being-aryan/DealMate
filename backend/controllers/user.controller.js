// controllers/user.controller.js
import asyncHandler from "express-async-handler";
import User from "../models/user.model.js";
import ApiError from "../utils/apiError.js";

export const deleteMe = asyncHandler(async (req, res, next) => {
  const deletedUser = await User.findByIdAndDelete(req.user.id);

  if (!deletedUser) {
    return next(new ApiError(404, "User not found"));
  }

  res.status(204).json({
    status: "success",
    message: "User deleted successfully",
  });
});
