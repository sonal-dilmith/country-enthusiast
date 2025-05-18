// src/pages/Favorites.tsx
import { useEffect, useState } from "react";
import { getFavorites } from "../services/favoriteService"; // your axios with token
import { useNavigate } from "react-router-dom";
import { getCountryByCode } from "../services/countryServices";
import { Country } from "../types/country";

const Favorites = () => {
    const [favoriteCountries, setFavoriteCountries] = useState<Country[]>([]);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const favCodes = await getFavorites();
                console.log("Fetched favorite codes:", favCodes);
                const countryPromises = favCodes.map(code => getCountryByCode(code));
                const countries = await Promise.all(countryPromises);
                console.log("Fetched countries:", countries);
                setFavoriteCountries(countries);
            } catch (err) {
                setError("Failed to fetch favorites");
            }
        };
        fetchFavorites();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Your Favorites</h1>
            {error && <p className="text-red-500">{error}</p>}
            {favoriteCountries.length === 0 ? (
                <p>No favorites yet.</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {favoriteCountries.map((country) => (
                        <div
                            key={country.cca3}
                            className="p-4 border rounded shadow hover:shadow-md cursor-pointer"
                            onClick={() => navigate(`/country/${country.cca3}`)}
                        >
                            <p className="text-lg font-medium">{country.name.common}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
