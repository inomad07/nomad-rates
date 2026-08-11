import { calculateExchange } from "./currencyConverter.mjs";
import { normalizeRawNumbers } from "./currencyNormalizer.mjs";

export function exchangeCurrency(inputData) {
	const normalized = normalizeRawNumbers(inputData);
	return calculateExchange(normalized);
}
