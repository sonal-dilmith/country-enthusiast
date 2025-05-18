import { useEffect, useState } from "react";
import { getAllCountries } from "../services/countryServices";
import { Country } from "../types/country";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getFavorites, addFavorite, removeFavorite } from "../services/favoriteService";
import CountryCard from "../components/card";


const Home = () => {
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRegion, setSelectedRegion] = useState("All");
    const { isAuthenticated } = useAuth();
    const [favorites, setFavorites] = useState<string[]>([]);
    
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const data = await getAllCountries();
                setCountries(data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load countries.");
                setLoading(false);
            }
        };

        fetchCountries();
        const fetchFavorites = async () => {
            if (!isAuthenticated) return;
            try {
                const favs = await getFavorites();
                setFavorites(favs);
            } catch (err) {
                console.error("Error fetching favorites", err);
            }
        };

        fetchFavorites();
    }, [isAuthenticated]);

    const handleToggleFavorite = async (countryCode: string, isFav: boolean) => {
        try {
            if (isFav) {
                await removeFavorite(countryCode);
                setFavorites((prev) => prev.filter((code) => code !== countryCode));
            } else {
                await addFavorite(countryCode);
                setFavorites((prev) => [...prev, countryCode]);
            }
        } catch (err) {
            console.error("Error updating favorite", err);
        }
    };

    const regions = ["All", "Africa", "Americas", "Asia", "Europe", "Oceania"];

    const filteredCountries = countries
        .filter((country) =>
            country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .filter((country) =>
            selectedRegion === "All" ? true : country.region === selectedRegion
        );

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;


    return (
        <div className="p-6 bg-blue-200">
            <h1 className="text-3xl font-bold mb-10 text-center">World Map 🌍</h1>
            <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <input
                    disabled={!isAuthenticated}
                    type="text"
                    placeholder="Search countries..."
                    value={searchTerm}
                    onChange={(e) => {
                        if (!isAuthenticated) {
                            alert("Login to use search.");
                            return;
                        }
                        setSearchTerm(e.target.value);
                    }}
                    className={`mb-6 ml-10 w-full max-w-md px-5 py-3 bg-gray-200 border rounded shadow-sm ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}`}
                />
                <select
                    disabled={!isAuthenticated}
                    value={selectedRegion}
                    onChange={(e) => {
                        if (!isAuthenticated) {
                            alert("Login to filter by region.");
                            return;
                        }
                        setSelectedRegion(e.target.value);
                    }}
                    className={`mb-6 mr-10 px-10 py-3 bg-gray-200 border rounded ${!isAuthenticated ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                    {regions.map((region) => (
                        <option key={region} value={region}>
                            {region}
                        </option>
                    ))}
                </select>
            </div>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {filteredCountries.map((country) => (
                    <CountryCard
                    key={country.cca3}
                    country={country}
                    favorites={favorites}
                    isAuthenticated={isAuthenticated}
                    isFavorite={Array.isArray(favorites) && favorites.includes(country.cca3)}
                    onToggleFavorite={handleToggleFavorite}
                    />

                ))}

            </div>
        </div>

    );
}


export default Home;
