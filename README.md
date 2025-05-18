[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)
# Country Enthusiast App 🌍

A React-based web application that allows users to explore and view details about countries using the REST Countries API.

## Features

- **Search**: Search for countries by name.
- **Filter by Region**: Filter countries by region (e.g., Africa, Asia, Europe).
- **Country Details**: View detailed information about each country, including name, capital, population, and languages.
- **Authentication**: Register, login, and manage authentication using JWT tokens.
- **Responsive Design**: Fully responsive design for mobile and desktop users.

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **API**: REST Countries API
- **Authentication**: JWT (JSON Web Tokens)
- **Routing**: React Router
- **State Management**: React Context API
- **Backend**: Node.js, Express (if applicable)

## Installation

### Prerequisites

Ensure that you have the following installed:

- **Node.js** (LTS version)
- **npm** (or **yarn**)

### Setup

1. Clone the repository:
    
    git clone (https://github.com/SE1020-IT2070-OOP-DSA-25/af-2-sonal-dilmith.git)
    

2. Install dependencies:
    
    cd af-2-sonal-dilmith
    npm install
    

3. Run the development server:
    
    npm run dev
    

4. Open the application in your browser at `http://localhost:5000`.

## Usage

1. **Home Page**: Browse through the list of countries. Use the search bar and region filter to find countries.
2. **Country Page**: Click on any country to view more detailed information about it.
3. **Authentication**: Users can register and log in to access additional features. Use the "Login" button to access the authentication page.

## How it Works

- The app fetches country data from the [REST Countries API](https://restcountries.com/).
- User authentication is handled using JSON Web Tokens (JWT). Tokens are stored in the local storage for session management.
- React Router is used for navigation between pages like Home, Country Detail, and Authentication.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -am 'Add feature'`).
4. Push to the branch (`git push origin feature-name`).
5. Create a new pull request.

## License

This project is licensed under the MIT License.