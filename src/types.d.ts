export type CurrencyCode = string;

export interface ExchangeOptions {
	from: string;
	to?: string;
	currencyAmount: number | string;
	currencyCode?: string;
	exchangeRate?: number | string;
	nominal?: number | string;
	currencies?: Array<{
		ISOCode: string;
		nominal: number | string;
		rate: number | string;
	}>;
}

export interface ExchangeSuccess {
	result: string; // либо number, в зависимости от того, возвращает ли движок строку
	currencyCode: string;
}

export interface ExchangeError {
	error: string;
}

export type ExchangeResult = ExchangeSuccess | ExchangeError;

export interface RateResponse {
	title: string;
	date: string;
	currencies: Array<{
		ISOCode: string;
		nominal: number;
		rate: string;
	}>;
}

export function getDailyRates(): Promise<RateResponse>;

export function getWeeklyRates(): Promise<RateResponse>;

export function exchangeCurrency(options: ExchangeOptions): ExchangeResult;

export const SUPPORTED_CURRENCIES: readonly CurrencyCode[];
export const Currency: Record<string, CurrencyCode>;
