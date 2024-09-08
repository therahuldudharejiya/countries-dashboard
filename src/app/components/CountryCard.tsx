import React from 'react';
import Country from '@/app/types/country';
import Image from 'next/image';

interface CountryCardProps {
    country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
    const capital = Array.isArray(country.capital) && country.capital.length > 0
        ? country.capital[0]
        : 'N/A';

    return (
        <div
            className="card bg-base-100 w-full h-full max-w-sm shadow-lg rounded-lg overflow-hidden"
            key={country.name.common}
        >
            <figure className="relative w-full h-36">
                <Image
                    src={country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    layout="fill"
                    objectFit="cover"
                />
            </figure>
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{country.name.common}</h2>
                <p className="text-gray-600">Capital: {capital}</p>
                <p className="text-gray-600">Region: {country.region}</p>
                <p className="text-gray-600">Population: {country.population.toLocaleString()}</p>
            </div>
        </div>
    );
};

export default CountryCard;