// backend/controllers/authController.ts
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/authModel";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void>  => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists)  res.status(400).json({ message: "Email already exists" });

        if (!password || password.length < 6) {
            res.status(400).json({ message: "Password must be at least 6 characters long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, email, password: hashedPassword });

        res.status(201).json({ message: "User registered", user: newUser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Registration failed" });
        next(err);
    }
};

// Generate access token (30 mins)
const generateAccessToken = (user: any) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
        expiresIn: '30m',
    });
};

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1d" });

        res.status(200).json({ message: "Login successful", token, user });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
        next(err);
    }
};

export const addFavorite = async (req: Request, res: Response): Promise<void>  => {
    const { countryCode } = req.body;
    if (!req.user) {
        res.status(401).json({ message: "Unauthorized: User not found" });
        return;
    }
    const userId = req.user.id;

    if (!countryCode) {
        res.status(400).json({ message: "Country code is required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) { 
            res.status(404).json({ message: "User not found" });
            return;
        }
        // Prevent duplicates
        if (user.favorites.includes(countryCode)) {
            res.status(400).json({ message: "Already favorited" });
        }

        user.favorites.push(countryCode);
        await user.save();

        res.status(200).json({ message: "Favorite added", favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Remove a country from user's favorites
export const removeFavorite = async (req: Request, res: Response): Promise<void>  => {

    if (!req.user) {
        res.status(401).json({ message: "Unauthorized: User not found" });
        return;
    }

    const userId = req.user.id;
    const { countryCode } = req.body;

    if (!countryCode) {
        res.status(400).json({ message: "Country code is required" });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }

        user.favorites = user.favorites.filter(code => code !== countryCode);
        await user.save();

        res.status(200).json({ message: "Favorite removed", favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};

// Get all favorites for the logged-in user
export const getFavorites = async (req: Request, res: Response): Promise<void> => {

    if (!req.user) {
        res.status(401).json({ message: "Unauthorized: User not found" });
        return;
    }
    const userId = req.user.id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        res.status(200).json({ favorites: user.favorites });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};