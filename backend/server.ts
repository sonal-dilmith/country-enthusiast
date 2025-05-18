// backend/src/server.ts
import app from "./app";
import connectDB from "./config/db";

// Port
const PORT = process.env.PORT || 5000;

// Connect to DB and then start server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    } catch (error) {
    console.error("❌ Server failed to start:", error);
    process.exit(1);
    }
};

startServer();
