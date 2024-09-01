import { useQuery } from 'react-query';
import axios from 'axios';
import { Country } from '../types/country';

const fetchCountries = async () => {
    const { data } = await axios.get<Country[]>('https://restcountries.com/v3.1/all');
    return data;
};

export const useCountries = () => {
    return useQuery('countries', fetchCountries, {
        staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
    });
};
