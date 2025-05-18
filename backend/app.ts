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
const allowedOrigins = [
    "http://localhost:5173",
    "https://country-enthusiast-frontend.onrender.com",
];

// Middleware
app.use(
    cors({
        origin: function (origin, callback) {
            // Allow requests with no origin (like Postman)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                return callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
    })
);
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/favorites", favoriteRoutes);

export default app;

