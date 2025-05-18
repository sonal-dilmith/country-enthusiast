import axios from "axios";

const API_BASE = "http://localhost:5000/api/auth"; 

export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE}/register`, userData);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${API_BASE}/login`, credentials);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
