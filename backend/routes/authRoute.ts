// backend/routes/authRoute.ts
import express from "express";
import { login, register } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();
router.post("/login", login);
router.post("/register", register);

export default router;
