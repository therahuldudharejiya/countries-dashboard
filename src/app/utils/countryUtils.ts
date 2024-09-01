import { Country } from '../types/country';

export const sortCountriesByPopulation = (countries: Country[], ascending = true): Country[] => {
    return countries.sort((a, b) => (ascending ? a.population - b.population : b.population - a.population));
};

export const filterCountriesByRegion = (countries: Country[], region: string): Country[] => {
    return countries.filter((country) => country.region === region);
};

export const searchCountries = (countries: Country[], query: string): Country[] => {
    return countries.filter(
        (country) =>
            country.name.common.toLowerCase().includes(query.toLowerCase()) ||
            country.capital?.some((cap) => cap.toLowerCase().includes(query.toLowerCase()))
    );
};
