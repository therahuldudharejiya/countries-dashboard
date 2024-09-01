import React from 'react';
import { Country } from '../types/country';

interface CountryDetailProps {
    country: Country;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Timezones: {country.timezones.join(', ')}</p>
            <p>Currencies: {Object.values(country.currencies).map((currency) => `${currency.name} (${currency.symbol})`).join(', ')}</p>
            <p>Languages: {Object.values(country.languages).join(', ')}</p>
        </div>
    );
};

export default CountryDetail;
