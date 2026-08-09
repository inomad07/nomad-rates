import { formatNumberPrecision } from "./currencyFormatter.mjs";
import { DEFAULT_CURRENCY, DEFAULT_NOMINAL } from "../constants/index.mjs";

function convertToDefaultCurrency(rate, amount, nominal = DEFAULT_NOMINAL) {
	const effectiveRate = rate / nominal;
	return formatNumberPrecision(effectiveRate * amount);
}

function convertToTargetCurrency(rate, amount, nominal = DEFAULT_NOMINAL) {
	const effectiveRate = rate / nominal;
	return formatNumberPrecision(amount / effectiveRate);
}

export function calculateExchange(data) {
	const isToDefault = data.to === DEFAULT_CURRENCY;
	const currencyCode = isToDefault ? DEFAULT_CURRENCY : data.to;

	const calculate = isToDefault
		? convertToDefaultCurrency
		: convertToTargetCurrency;

	return {
		result: calculate(data.exchangeRate, data.currencyAmount, data.nominal),
		currencyCode,
	};
}
