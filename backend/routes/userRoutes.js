import express from "express";
import { register, login, data } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/data", protect, data);

export default router;

