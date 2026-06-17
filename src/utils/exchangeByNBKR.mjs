import { fetchAndParseXmlData } from "../services/nbkr.mjs";
import { calculateExchange } from "./currencyConverter.mjs";
import {
    findCurrency,
    findCurrencyByCode,
    normalizeCurrencyCode,
} from "./currencyFormatter.mjs";
import { CURRENCY_RATES_NBKR_URL } from "../constants/index.mjs";

function normalizeExchangeData(currencies, inputData) {
    const { currencyAmount, currencyCode } = inputData;
    const isoCode = normalizeCurrencyCode(currencyCode);

    if (!findCurrency(isoCode)) {
        return { error: "Currency not found in DB!" };
    }

    const { rate } = findCurrencyByCode(currencies, isoCode);

    return {
        exchangeRate: rate,
        currencyAmount,
        currencyCode: isoCode,
    };
}

export async function exchangeByNBKR(inputData) {
    const { currencies } = await fetchAndParseXmlData(CURRENCY_RATES_NBKR_URL);

    const rates = normalizeExchangeData(currencies, inputData);

    if (rates.error) return rates;

    return calculateExchange({
        ...rates,
        from: inputData.from,
        to: inputData.to,
    });
}
