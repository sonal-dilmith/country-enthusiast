import { Country } from "../types/country";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";

interface Props {
    country: Country;
    favorites: string[]; // list of favorited country codes
    onToggleFavorite: (countryCode: string, isFavorite: boolean) => void;
    isAuthenticated: boolean;
    isFavorite: boolean;
}

const CountryCard = ({ country, onToggleFavorite, isAuthenticated, isFavorite }: Props) => {


    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.preventDefault(); // prevent navigating to country page
        onToggleFavorite(country.cca3, isFavorite);
    };
    return (
        <Link to={`/country/${country.cca3}`}>
            <div className="bg-white shadow-md rounded-2xl hover:shadow-2xl transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105">
                <img src={country.flags.svg} alt={`${country.name.common} flag`} className="w-full h-40 object-cover rounded-t-2xl" />
                <div className="p-4">
                    <h2 className="text-xl font-semibold">{country.name.common}</h2>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
                </div>
                {isAuthenticated && (
                    <button
                        onClick={handleFavoriteClick}
                        className="absolute top-2 right-2 p-1 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
                    >
                        {isFavorite ? (
                            <SolidHeartIcon className="w-6 h-6 text-red-500" />
                        ) : (
                            <OutlineHeartIcon className="w-6 h-6 text-gray-500" />
                        )}
                    </button>
                )}
            </div>
        </Link>
    );
};

export default CountryCard;
