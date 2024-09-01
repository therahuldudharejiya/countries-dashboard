export interface Country {
    name: {
        common: string;
        official: string;
    };
    capital: string[];
    region: string;
    population: number;
    flags: {
        png: string;
    };
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    languages: {
        [key: string]: string;
    };
    timezones: string[];
}
