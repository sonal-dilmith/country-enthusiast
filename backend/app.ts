// backend/src/app.ts
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoute";
import favoriteRoutes from "./routes/favoriteRoute";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors({ origin: "https://country-enthusiast-backend.onrender.com", credentials: true }));
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes); 

export default app;

