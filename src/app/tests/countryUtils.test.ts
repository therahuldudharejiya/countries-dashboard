import { sortCountriesByPopulation, filterCountriesByRegion, searchCountries } from '../utils/countryUtils';
import { Country } from '../types/country';

const mockCountries: Country[] = [
    { name: { common: 'Country A', official: 'Country A' }, capital: ['Capital A'], region: 'Asia', population: 1000, flags: { png: '' }, currencies: {}, languages: {}, timezones: [] },
    { name: { common: 'Country B', official: 'Country B' }, capital: ['Capital B'], region: 'Europe', population: 2000, flags: { png: '' }, currencies: {}, languages: {}, timezones: [] },
];

test('sortCountriesByPopulation sorts countries in ascending order', () => {
    const sorted = sortCountriesByPopulation(mockCountries);
    expect(sorted[0].population).toBe(1000);
});

test('filterCountriesByRegion filters countries by region', () => {
    const filtered = filterCountriesByRegion(mockCountries, 'Asia');
    expect(filtered.length).toBe(1);
    expect(filtered[0].region).toBe('Asia');
});

test('searchCountries finds countries by name or capital', () => {
    const searched = searchCountries(mockCountries, 'Country A');
    expect(searched.length).toBe(1);
    expect(searched[0].name.common).toBe('Country A');
});
