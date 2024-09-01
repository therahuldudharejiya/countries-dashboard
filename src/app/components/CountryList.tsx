// src/components/CountryList.tsx
import React, { useState } from 'react';
import { Country } from '@/app/types/country';
import { useCountries } from '@/app/hooks/useCountries';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import CountryCard from './CountryCard';
import { sortByPopulationAscending, sortByPopulationDescending } from '@/app/utils/sortCountries';
import { filterByRegion } from '@/app/utils/filterCountries';
import { searchCountries } from '@/app/utils/searchCountries';

const CountryList: React.FC = () => {
    const { countries, loading, error } = useCountries();
    const [sortedCountries, setSortedCountries] = useState<Country[]>([]);

    const handleSort = (order: 'asc' | 'desc') => {
        const sorted = order === 'asc' ? sortByPopulationAscending(countries) : sortByPopulationDescending(countries);
        setSortedCountries(sorted);
    };

    const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);

    const handleFilter = (region: string) => {
        const filtered = filterByRegion(countries, region);
        setFilteredCountries(filtered);
    };

    const [searchQuery, setSearchQuery] = useState<string>('');
    const [searchedCountries, setSearchedCountries] = useState<Country[]>([]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
        const results = searchCountries(countries, query);
        setSearchedCountries(results);
    };

    const displayCountries =
        searchedCountries.length || searchQuery
            ? searchedCountries
            : filteredCountries.length
                ? filteredCountries
                : sortedCountries.length
                    ? sortedCountries
                    : countries;

    if (loading) return <LoadingSpinner />;
    if (error) return <ErrorMessage message={error} />;

    const regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-between mb-4">
                <input
                    type="text"
                    placeholder="Search by name or capital"
                    value={searchQuery}
                    onChange={handleSearch}
                    className="border p-2 rounded"
                />
                <button onClick={() => handleSort('asc')}>Sort Ascending</button>
                <button onClick={() => handleSort('desc')} className="ml-2">
                    Sort Descending
                </button>
                {regions.map((region) => (
                    <button key={region} onClick={() => handleFilter(region)}>
                        {region}
                    </button>
                ))}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {displayCountries.map((country) => (
                    <CountryCard key={country.cca3} country={country} />
                ))}
            </div>
        </div>
    );
};

export default CountryList;


