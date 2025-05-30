import Home from "./pages/home";
import AuthPage from "./pages/authPages";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import CountryPage from "./pages/countryPage";
import Header from "./components/header";
import Favorites from "./pages/favorite";



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/country/:code" element={<CountryPage />} />
        <Route path="/favorites" element={< Favorites/>} />
      </Routes>
    </Router>
  );
}

export default App;