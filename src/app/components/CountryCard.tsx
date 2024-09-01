import React from 'react';
import { Country } from '../types/country';
import Image from 'next/image';

interface CountryCardProps {
    country: Country;
    onClick: () => void;
}

const CountryCard: React.FC<CountryCardProps> = ({ country, onClick }) => {
    return (
        <div onClick={onClick} className="card">
            <Image src={country.flags.png} alt={`${country.name.common} flag`} width={100} height={60} />
            <h3>{country.name.common}</h3>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
        </div>
    );
};

export default CountryCard;
