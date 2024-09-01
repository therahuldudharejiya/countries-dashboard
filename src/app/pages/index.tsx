"use client"
import { useState } from 'react';
import { useCountries } from '../hooks/useCountries';
import { Country } from '../types/country';
import CountryCard from '../components/CountryCard';
import { sortCountriesByPopulation, filterCountriesByRegion, searchCountries } from '../utils/countryUtils';

const HomeDashboard = () => {
    const { data, isLoading, error } = useCountries();
    const [region, setRegion] = useState<string>('');
    const [search, setSearch] = useState<string>('');
    const [sortAsc, setSortAsc] = useState<boolean>(true);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading data</p>;

    let countries = data || [];

    if (region) {
        countries = filterCountriesByRegion(countries, region);
    }

    if (search) {
        countries = searchCountries(countries, search);
    }

    countries = sortCountriesByPopulation(countries, sortAsc);

    return (
        <div>
            <input type="text" placeholder="Search by name or capital" onChange={(e) => setSearch(e.target.value)} />
            <select onChange={(e) => setRegion(e.target.value)}>
                <option value="">All Regions</option>
                <option value="Africa">Africa</option>
                <option value="Americas">Americas</option>
                <option value="Asia">Asia</option>
                <option value="Europe">Europe</option>
                <option value="Oceania">Oceania</option>
            </select>
            <button onClick={() => setSortAsc(!sortAsc)}>Sort by Population</button>

            <div className="grid">
                {countries.map((country) => (
                    <CountryCard key={country.name.common} country={country} onClick={() => { }} />
                ))}
            </div>
        </div>
    );
};

export default HomeDashboard;
