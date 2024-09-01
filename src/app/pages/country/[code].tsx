// src/pages/country/[code].tsx
import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import axiosInstance from '@/app/utils/axiosInstance';
import { Country } from '@/app/types/country';
import Image from 'next/image';
import Link from 'next/link';

interface CountryDetailProps {
    country: Country;
}

const CountryDetail: React.FC<CountryDetailProps> = ({ country }) => {
    return (
        <div className="container mx-auto px-4 py-8">
            <Link href="/">
                <a className="text-blue-500 mb-4 inline-block">← Back to Home</a>
            </Link>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="relative w-full h-64 md:h-96">
                    <Image
                        src={country.flags.svg}
                        alt={country.name.common}
                        layout="fill"
                        objectFit="contain"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{country.name.common}</h1>
                    <p>
                        <strong>Official Name:</strong> {country.name.official}
                    </p>
                    <p>
                        <strong>Capital:</strong> {country.capital ? country.capital.join(', ') : 'N/A'}
                    </p>
                    <p>
                        <strong>Population:</strong> {country.population.toLocaleString()}
                    </p>
                    <p>
                        <strong>Region:</strong> {country.region}
                    </p>
                    <p>
                        <strong>Subregion:</strong> {country.subregion || 'N/A'}
                    </p>
                    <p>
                        <strong>Time Zones:</strong> {country.timezones.join(', ')}
                    </p>
                    <p>
                        <strong>Currencies:</strong>{' '}
                        {country.currencies
                            ? Object.values(country.currencies)
                                .map((currency) => `${currency.name} (${currency.symbol})`)
                                .join(', ')
                            : 'N/A'}
                    </p>
                    <p>
                        <strong>Languages:</strong>{' '}
                        {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CountryDetail;

// src/pages/country/[code].tsx

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await axiosInstance.get<Country[]>('/all');
    const paths = response.data.map((country) => ({
        params: { code: country.cca3 },
    }));

    return {
        paths,
        fallback: false, // or 'blocking' if preferred
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
        const code = params?.code;
        const response = await axiosInstance.get<Country[]>(`/alpha/${code}`);
        const country = response.data[0];

        return {
            props: {
                country,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
};
