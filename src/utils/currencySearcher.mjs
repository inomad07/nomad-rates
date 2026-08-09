import { Currency } from "../constants/index.mjs";

export function findCurrency(name) {
	return Currency[name];
}

export function findCurrencyByCode(currencies, currencyCode) {
	return currencies.find(({ ISOCode }) => ISOCode === currencyCode);
}
