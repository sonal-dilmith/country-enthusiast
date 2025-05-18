import axios from "axios";

export const getFavorites = async (): Promise<string[]> => {
    const res = await axios.get("http://localhost:5000/api/favorites", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });
    return res.data.favorites; // array of country codes
};

export const addFavorite = async (countryCode: string): Promise<void> => {
    await axios.post(
        "http://localhost:5000/api/favorites",
        { countryCode },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        }
    );
};

export const removeFavorite = async (countryCode: string): Promise<void> => {
    await axios.delete(`http://localhost:5000/api/favorites`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: { countryCode },
    });
};
