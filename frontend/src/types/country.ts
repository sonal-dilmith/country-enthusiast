export interface Country {
    name: { common: string, official: string };
    capital: string[];
    region: string;
    population: number;
    flags: { svg: string };
    languages: { [key: string]: string };
    cca3: string; // Unique country code
}