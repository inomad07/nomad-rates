export const NBKR_DAILY_RATES_URL = "https://www.nbkr.kg/XML/daily.xml";
export const NBKR_WEEKLY_RATES_URL = "https://www.nbkr.kg/XML/weekly.xml";

export const DEFAULT_NOMINAL = 1;
export const DEFAULT_CURRENCY = "KGS";
export const DAILY_CURRENCY_CODES = ["USD", "EUR", "CNY", "KZT", "RUB"];
export const WEEKLY_CURRENCY_CODES = [
	"GBP",
	"DKK",
	"INR",
	"CAD",
	"KRW",
	"NOK",
	"XDR",
	"SEK",
	"CHF",
	"JPY",
	"AMD",
	"BYR",
	"MDL",
	"TJS",
	"UAH",
	"KWD",
	"HUF",
	"CZK",
	"NZD",
	"PKR",
	"AUD",
	"TRY",
	"AZN",
	"SGD",
	"AFN",
	"BRL",
	"GEL",
	"AED",
	"MYR",
	"MNT",
	"TWD",
	"TMT",
	"PLN",
	"SAR",
	"BYN",
	"OMR",
	"HKD",
	"IDR",
	"IRR",
	"UZS",
	"BHD",
	"VND",
	"THB",
];

export const SUPPORTED_CURRENCIES = [
	DEFAULT_CURRENCY,
	...DAILY_CURRENCY_CODES,
	...WEEKLY_CURRENCY_CODES,
];

export const Currency = SUPPORTED_CURRENCIES.reduce((acc, code) => {
	acc[code] = code;
	return acc;
}, {});
