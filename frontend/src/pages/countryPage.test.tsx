import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryList from './countryPage';

// Mock the global fetch function
global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve([
            { name: 'India', capital: 'New Delhi', population: 1393409038, region: 'Asia' },
            { name: 'Brazil', capital: 'Brasília', population: 213993437, region: 'Americas' },
        ]),
    })
);

describe('CountryList Component', () => {
    it('renders a list of countries', async () => {
        render(<CountryList />);
    
        // Wait for the API to respond and populate the component
        await waitFor(() => expect(screen.getByText('India')).toBeInTheDocument());
        expect(screen.getByText('Brazil')).toBeInTheDocument();
    });
});
