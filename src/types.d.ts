export type CurrencyCode = string;

export interface ExchangeOptions {
	from: string;
	to?: string;
	currencyAmount: number | string;
	currencyCode?: string;
	exchangeRate?: number | string;
	nominal?: number | string;
}

export interface ExchangeSuccess {
	result: number;
	currencyCode: string;
}

export interface ExchangeError {
	error: string;
}

export type ExchangeResult = ExchangeSuccess | ExchangeError;

export function exchangeByNBKR(
	options: ExchangeOptions
): Promise<ExchangeResult>;

export function exchangeByNBKRWeekly(
	options: ExchangeOptions
): Promise<ExchangeResult>;

export function exchangeByCustom(options: ExchangeOptions): ExchangeResult;

export const SUPPORTED_CURRENCIES: readonly CurrencyCode[];
export const Currency: Record<Lowercase<CurrencyCode>, CurrencyCode>;
