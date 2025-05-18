import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/"); // route to login/register page
  };

  const handleLogoutClick = () => {
    logout(); // clears token + auth state
    navigate("/"); // redirect to home
  };

    const handleFavoritesClick = () => {
    navigate("/favorites");
  };

  return (
    <header className="bg-sky-900 text-white p-5  shadow">
      <div className="max-w-8xl  flex justify-between items-center">
        <div className="flex-1 text-center hover:scale-115">
          <Link
            to="/home"
            className="text-4xl font-bold hover:text-red-500 hover:underline hover:underline-white transition-colors duration-200"
          >
            🌍 Country Enthusiast
          </Link>
          {/* Optional placeholder for login, theme toggle, etc. */}
        </div>
                <div className="flex items-center space-x-3 pr-3">
          {isAuthenticated && (
            <button
              onClick={handleFavoritesClick}
              className="bg-yellow-400 text-white font-medium px-4 py-1 rounded  hover:bg-yellow-500 transition-colors"
            >
              ❤️ Favorites
            </button>
          )}
          {!isAuthenticated ? (
            <button
              onClick={handleLoginClick}
              className="bg-white text-blue-600 font-semibold px-4 py-1 rounded border border-blue-600 hover:bg-gray-200 "
            >
              Login
            </button>
          ) : (
            <button
              onClick={handleLogoutClick}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
