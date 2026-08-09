import { calculateExchange } from "./currencyConverter.mjs";
import { normalizeRawNumbers } from "./currencyNormalizer.mjs";

export function exchangeByCustom(inputData) {
	const normalized = normalizeRawNumbers(inputData);
	return calculateExchange(normalized);
}
