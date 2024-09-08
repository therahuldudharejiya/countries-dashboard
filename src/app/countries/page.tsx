'use client';
import React, { useState } from 'react';
import useFetch from '@/app/hooks/useFetch';
import Country from '@/app/types/country';
import Link from 'next/link';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import ErrorMessage from '@/app/components/ErrorMessage';
import CountryCard from '@/app/components/CountryCard';
import { sortCountriesByPopulation, filterCountriesByRegion, searchCountries } from '../utils/countryUtils';

const CountriesPage: React.FC = () => {
    const { data, error, isLoading } = useFetch<Country[]>('https://restcountries.com/v3.1/all');

    const [region, setRegion] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [sortAsc, setSortAsc] = useState<boolean>(true);

    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error.message} />;

    const handleSearchChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => setSearch(e.target.value);
    const handleRegionChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ) => setRegion(e.target.value);
    const handleSortToggle = () => setSortAsc(prevSortAsc => !prevSortAsc);

    const getFilteredAndSortedCountries = () => {
        let filteredCountries = data || [];

        if (region) {
            filteredCountries = filterCountriesByRegion(filteredCountries, region);
        }

        if (search) {
            filteredCountries = searchCountries(filteredCountries, search);
        }

        return sortCountriesByPopulation(filteredCountries, sortAsc);
    };

    const countries = getFilteredAndSortedCountries();

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
                <SearchInput search={search} onSearchChange={handleSearchChange} />
                <RegionSelect region={region} onRegionChange={handleRegionChange} />
                <SortButton sortAsc={sortAsc} onSortToggle={handleSortToggle} />
            </div>
            <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                {countries.map((country) => (
                    <Link href={`/countries/${country.name.common}`} key={country.name.common}>
                        <CountryCard country={country} />
                    </Link>

                ))}
            </div>
        </div>
    );
};

const SearchInput: React.FC<{ search: string; onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void }> = ({ search, onSearchChange }) => (
    <label className="input input-bordered flex items-center gap-2 flex-grow">
        <input
            type="text"
            className="flex-grow p-2 rounded-md"
            placeholder="Search by name or capital"
            value={search}
            onChange={onSearchChange}
        />
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
            />
        </svg>
    </label>
);

const RegionSelect: React.FC<{ region: string; onRegionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }> = ({ region, onRegionChange }) => (
    <select
        className="select select-bordered w-full max-w-xs p-2 rounded-md"
        value={region}
        onChange={onRegionChange}
    >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
    </select>
);

const SortButton: React.FC<{ sortAsc: boolean; onSortToggle: () => void }> = ({ sortAsc, onSortToggle }) => (
    <button className="btn btn-primary p-2 rounded-md" onClick={onSortToggle}>
        Sort by Population {sortAsc ? 'Ascending' : 'Descending'}
    </button>
);

export default CountriesPage;
