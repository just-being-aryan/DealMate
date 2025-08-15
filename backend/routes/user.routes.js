import express from "express";
import { deleteMe } from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.delete("/profile", protect, deleteMe);

export default router;
