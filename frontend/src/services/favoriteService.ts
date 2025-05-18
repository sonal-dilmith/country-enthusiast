import axios from "axios";

export const getFavorites = async (): Promise<string[]> => {
    const res = await axios.get("https://country-enthusiast-backend.onrender.com/api/favorites", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data.favorites; // array of country codes
};

export const addFavorite = async (countryCode: string): Promise<void> => {
    await axios.post(
        "https://country-enthusiast-backend.onrender.com/api/favorites",
        { countryCode },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
};

export const removeFavorite = async (countryCode: string): Promise<void> => {
    await axios.delete(`https://country-enthusiast-backend.onrender.com/api/favorites`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { countryCode },
    });
};
