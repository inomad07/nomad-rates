import { formatCurrencyCode, prepareNumber } from "./currencyFormatter.mjs";
import { findCurrency, findCurrencyByCode } from "./currencySearcher.mjs";
import { DEFAULT_CURRENCY, DEFAULT_NOMINAL } from "../constants/index.mjs";

export function normalizeRawNumbers(data) {
	return {
		exchangeRate: prepareNumber(data.exchangeRate),
		currencyAmount: prepareNumber(data.currencyAmount),
		nominal: prepareNumber(data.nominal) || DEFAULT_NOMINAL,
		from: formatCurrencyCode(data.from),
		to: formatCurrencyCode(data.to || DEFAULT_CURRENCY),
	};
}

export function normalizeExchangeData(currencies, inputData) {
	const { currencyAmount, currencyCode, from, to } = inputData;
	const isoCode = formatCurrencyCode(currencyCode || from);

	if (!findCurrency(isoCode)) {
		return { error: "Currency not found in DB!" };
	}

	const currencyItem = findCurrencyByCode(currencies, isoCode);

	if (!currencyItem) {
		return { error: `Currency ${isoCode} not found in rate list!` };
	}

	return normalizeRawNumbers({
		exchangeRate: currencyItem.rate,
		nominal: currencyItem.nominal,
		currencyAmount,
		from: from || isoCode,
		to,
	});
}
