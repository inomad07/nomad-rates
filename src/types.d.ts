export interface CurrencyRate {
    code: string;
    value: number;
    name: string;
}

export interface CurrencyResult {
    date: string;
    currencies: CurrencyRate[];
}

export function fetchAndParseXmlData(url: string): Promise<CurrencyResult>;
