export function replaceCommasWithDots(stringAmount) {
	return String(stringAmount ?? "").replace(",", ".");
}

export function prepareNumber(stringifiedNumber) {
	return parseFloat(replaceCommasWithDots(stringifiedNumber));
}

export function formatNumberPrecision(number) {
	return parseFloat(number.toFixed(2));
}

export function formatCurrencyCode(code) {
	return code?.toUpperCase();
}
