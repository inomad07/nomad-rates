import { fetchAndParseXmlData } from "../services/nbkr.mjs";
import { calculateExchange } from "./currencyConverter.mjs";
import { normalizeExchangeData } from "./currencyNormalizer.mjs";
import {
	NBKR_DAILY_RATES_URL,
	NBKR_WEEKLY_RATES_URL,
} from "../constants/index.mjs";

async function processExchange(url, inputData) {
	const { currencies } = await fetchAndParseXmlData(url);

	const rates = normalizeExchangeData(currencies, inputData);

	if (rates.error) return rates;

	return calculateExchange({
		...rates,
		from: inputData.from,
		to: inputData.to,
	});
}

export function exchangeByNBKR(inputData) {
	return processExchange(NBKR_DAILY_RATES_URL, inputData);
}

export function exchangeByNBKRWeekly(inputData) {
	return processExchange(NBKR_WEEKLY_RATES_URL, inputData);
}
