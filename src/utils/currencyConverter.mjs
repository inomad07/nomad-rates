import { prepareNumber, formatNumberPrecision } from "./currencyFormatter.mjs";
import { DEFAULT_CURRENCY } from "../constants/index.mjs";

function convertToDefaultCurrency(rate, amount) {
    return formatNumberPrecision(prepareNumber(rate) * prepareNumber(amount));
}

function convertToTargetCurrency(rate, amount) {
    return formatNumberPrecision(prepareNumber(amount) / prepareNumber(rate));
}

export function calculateExchange(data) {
    const isToDefault = data.to === DEFAULT_CURRENCY;
    const currencyCode = isToDefault ? DEFAULT_CURRENCY : data.to;

    const calculate = isToDefault
        ? convertToDefaultCurrency
        : convertToTargetCurrency;

    return {
        result: calculate(data.exchangeRate, data.currencyAmount),
        currencyCode,
    };
}
