import { render, screen, fireEvent } from "@testing-library/react";
import AuthPage from "../pages/AuthPage";
import { BrowserRouter } from "react-router-dom";

test("renders login form initially", () => {
    render(<BrowserRouter><AuthPage /></BrowserRouter>);
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
});

test("switches to register form", () => {
    render(<BrowserRouter><AuthPage /></BrowserRouter>);
    fireEvent.click(screen.getByText("Register here"));
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
});
