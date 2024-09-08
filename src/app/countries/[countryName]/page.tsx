'use client';
import React from 'react';
import { useParams } from 'next/navigation';
import useFetch from '@/app/hooks/useFetch';
import Image from 'next/image';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import ErrorMessage from '@/app/components/ErrorMessage';
import Country from '@/app/types/country';

const CountryDetailPage: React.FC = () => {
    const { countryName } = useParams<{ countryName: string }>();
    const url = `https://restcountries.com/v3.1/name/${countryName}`;

    const { data: country, error, isLoading } = useFetch<Country[]>(url);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;

    if (!country || country.length === 0) return <ErrorMessage message="Country not found." />;

    const [details] = country;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="card lg:card-side bg-base-100 shadow-xl border-2">
                <figure className="relative w-96 h-64 m-8 radius-0">
                    <Image
                        src={details.flags.png}
                        alt={`Flag of ${details.name.common}`}
                        layout="fill"
                        objectFit="cover"
                    />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{details.name.common}</h2>
                    <p className="text-gray-600">
                        Capital: {(details.capital && Array.isArray(details.capital) ? details.capital.join(', ') : 'N/A')}
                    </p>
                    <p className="text-gray-600">Region: {details.region}</p>
                    <p className="text-gray-600">Population: {details.population.toLocaleString()}</p>
                    <p className="text-gray-600">Currencies: {Object.values(details.currencies || {}).map(c => c.name).join(', ')}</p>
                    <p className="text-gray-600">Languages: {Object.values(details.languages || {}).join(', ')}</p>
                    <p className="text-gray-600">Timezones: {details.timezones.join(', ')}</p>
                </div>
                <div className="flex justify-end">
                    <button
                        onClick={() => window.history.back()}
                        className="btn btn-primary text-white m-4"
                    >
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CountryDetailPage;
