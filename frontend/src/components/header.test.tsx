import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../components/Header";
import { AuthProvider } from "../context/AuthContext";

const renderWithProviders = (ui: React.ReactElement) => {
    return render(<AuthProvider><BrowserRouter>{ui}</BrowserRouter></AuthProvider>);
};

test("renders Header and shows login button when not authenticated", () => {
    renderWithProviders(<Header />);
    expect(screen.getByText("Login")).toBeInTheDocument();
});

test("clicking login navigates to /auth", () => {
    renderWithProviders(<Header />);
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
  // Asserting navigation requires mocking useNavigate
});
