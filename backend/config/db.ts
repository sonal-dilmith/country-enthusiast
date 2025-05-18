// backend/src/config/db.ts
import mongoose from "mongoose";

const connectDB = async () => {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) throw new Error("MONGO_URI is not defined in .env");

    try {
        await mongoose.connect(mongoURI);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        throw error;
    }
};

export default connectDB;
