export function replaceCommasWithDots(stringAmount) {
	return String(stringAmount ?? "").replace(",", ".");
}

export function prepareNumber(stringifiedNumber) {
	return Number(replaceCommasWithDots(stringifiedNumber));
}

export function formatNumberPrecision(number) {
	return Number(number).toFixed(3);
}

export function formatCurrencyCode(code) {
	return code?.toUpperCase();
}
