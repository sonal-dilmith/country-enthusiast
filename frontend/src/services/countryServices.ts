import axios from "axios";
import { Country } from "../types/country";

const BASE_URL = "https://restcountries.com/v3.1";

export const getAllCountries = async (): Promise<Country[]> => {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data;
};

export const getCountryByName = async (name: string): Promise<Country[]> => {
    const response = await axios.get(`${BASE_URL}/name/${name}`);
    return response.data;
};

export const getCountryByRegion = async (region: string): Promise<Country[]> => {
    const response = await axios.get(`${BASE_URL}/region/${region}`);
    return response.data;
};

export const getCountryByCode = async (code: string): Promise<Country> => {
    const response = await axios.get(`${BASE_URL}/alpha/${code}`);
    return response.data[0]; // Because it's wrapped in an array
};