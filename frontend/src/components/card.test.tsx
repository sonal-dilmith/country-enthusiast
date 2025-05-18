import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CountryCard from './card';

describe('CountryCard Component', () => {
it('renders country information correctly', () => {
    render(<CountryCard name="India" capital="New Delhi" population={1393409038} region="Asia" />);

    // Check if the name, capital, population, and region are displayed
    expect(screen.getByText('India')).toBeInTheDocument();
    expect(screen.getByText('Capital: New Delhi')).toBeInTheDocument();
    expect(screen.getByText('Population: 1393409038')).toBeInTheDocument();
    expect(screen.getByText('Region: Asia')).toBeInTheDocument();
});

it('renders the country card with correct class', () => {
    render(<CountryCard name="Brazil" capital="Brasília" population={213993437} region="Americas" />);
    const countryCard = screen.getByText('Brazil').closest('div');
    expect(countryCard).toHaveClass('country-card');
});
});
