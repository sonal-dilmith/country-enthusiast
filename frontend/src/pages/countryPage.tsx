import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryByCode } from "../services/countryServices";
import { Country } from "../types/country";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CountryPage = () => {
    const { code } = useParams<{ code: string }>();
    const [country, setCountry] = useState<Country | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/"); // or show a message instead
            return;
        }
        const fetchCountry = async () => {
            try {
                if (code) {
                    const data = await getCountryByCode(code);
                    setCountry(data);
                }
                setLoading(false);
            } catch (err) {
                setError("Failed to load country details.");
                setLoading(false);
            }
        };

        fetchCountry();
    }, [code, isAuthenticated, navigate]);

    if (!isAuthenticated) {
        return <div className="text-center p-6 text-red-600">Please log in to view country details.</div>;
    }

    if (loading) return <div className="p-4 text-center">Loading...</div>;
    if (error) return <div className="p-4 text-center text-red-500">{error}</div>;
    if (!country) return <div className="p-4 text-center">Country not found.</div>;

    return (
        <div className=" min-h-screen bg-radial from-cyan-200 from-40% via-teal-200 to-fuchsia-400 relative">
            <div className="absolute top-6 left-8 ">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 font-bold py-2 rounded mb-4">
                    <Link to="/home" className=" hover:underline inline-block">← Back</Link>
                </button>
            </div>
            <div className="max-w-4xl mx-auto px-4 pt-24">
                <div className="bg-sky-900/70 text-white text-bold backdrop-blur-md p-6 rounded shadow">
                    <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} className="w-64 mb-4 rounded border" />
                    <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
                    <p><strong>Official Name:</strong> {country.name.official}</p>
                    <p><strong>Capital:</strong> {country.capital?.[0] || "N/A"}</p>
                    <p><strong>Region:</strong> {country.region}</p>
                    <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
                    <p><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(", ") : "N/A"}</p>
                </div>
            </div>
        </div>
    );
};

export default CountryPage;
