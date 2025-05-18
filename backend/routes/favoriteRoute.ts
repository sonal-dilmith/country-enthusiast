import express from "express";
import { getFavorites, addFavorite, removeFavorite } from "../controllers/authController";
import { protect } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", protect, getFavorites)
router.post("/", protect, addFavorite);
router.delete("/", protect, removeFavorite);


export default router;