// backend/models/authModel.ts
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: {
        type: [String], // array of country codes like ['USA', 'IND']
        default: [],
    }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
