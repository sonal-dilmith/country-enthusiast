import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import * as countryService from "../services/countryServices";

jest.mock("../services/countryServices");

const mockCountries = [
  {
    name: { common: "Kenya" },
    region: "Africa",
    population: 53000000,
    capital: ["Nairobi"],
    flags: { svg: "https://flagcdn.com/ke.svg" },
    cca3: "KEN",
    }
];

test("displays countries when authenticated", async () => {
    (countryService.getAllCountries as jest.Mock).mockResolvedValue(mockCountries);

    render(
    <AuthProvider>
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    </AuthProvider>
);

    await waitFor(() => {
        expect(screen.getByText("Kenya")).toBeInTheDocument();
    });
});
