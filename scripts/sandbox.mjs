import {
	exchangeByNBKR,
	exchangeByNBKRWeekly,
} from "../src/utils/exchangeByNBKR.mjs";
import { exchangeByCustom } from "../src/utils/exchangeByCustom.mjs";
import { SUPPORTED_CURRENCIES, Currency } from "../src/constants/index.mjs";

async function testDailyConversion() {
	console.log("--- Starting daily conversion test ---");

	const inputUsd = {
		currencyAmount: "100",
		currencyCode: "USD",
		from: "USD",
		to: "KGS",
	};

	const inputEur = {
		currencyAmount: "100",
		currencyCode: "EUR",
		from: "EUR",
		to: "KGS",
	};

	try {
		console.log("Request (USD):", inputUsd);
		const resultUsd = await exchangeByNBKR(inputUsd);
		console.log("Result for USD:", resultUsd);

		const resultEur = await exchangeByNBKR(inputEur);
		console.log("Result for EUR:", resultEur);

		if (resultUsd?.result && resultEur?.result) {
			console.log("Test passed: Daily rates converted successfully.");
		} else {
			console.log("Error: Invalid daily calculation result.");
		}
	} catch (error) {
		console.error("Daily conversion test error:", error.message);
	}
}

async function testWeeklyConversion() {
	console.log("\n--- Starting weekly conversion test ---");

	const inputWeekly = {
		currencyAmount: "100",
		currencyCode: "GBP",
		from: "GBP",
		to: "KGS",
	};

	try {
		const result = await exchangeByNBKRWeekly(inputWeekly);
		console.log("Weekly Result for GBP:", result);

		if (result?.result) {
			console.log("Test passed: Weekly rate converted successfully.");
		} else {
			console.log("Error: Invalid weekly calculation result.");
		}
	} catch (error) {
		console.error("Weekly conversion test error:", error.message);
	}
}

async function testCustomConversion() {
	console.log("\n--- Starting custom conversion test ---");

	const customInput = {
		exchangeRate: "88.50",
		currencyAmount: "200",
		from: "USD",
		to: "KGS",
	};

	const customGbpInput = {
		exchangeRate: "117,50",
		currencyAmount: "100",
		from: "GBP",
		to: "KGS",
	};

	const customKztInput = {
		exchangeRate: "18.50",
		currencyAmount: "5000",
		nominal: "100",
		from: "KZT",
		to: "KGS",
	};

	try {
		const { result: resUsd } = exchangeByCustom(customInput);
		console.log("Custom USD calculation (200 * 88.50):", resUsd);

		const { result: resGbp } = exchangeByCustom(customGbpInput);
		console.log("Custom GBP calculation (100 * 117.50):", resGbp);

		const { result: resKzt } = exchangeByCustom(customKztInput);
		console.log("Custom KZT calculation (5000 / 100 * 18.50):", resKzt);

		const isUsdOk = resUsd === 17700;
		const isGbpOk = resGbp === 11750;
		const isKztOk = resKzt === 925;

		if (isUsdOk && isGbpOk && isKztOk) {
			console.log(
				"Test passed: Custom calculations processed successfully."
			);
		} else {
			console.log("Error in calculations:", { resUsd, resGbp, resKzt });
		}
	} catch (error) {
		console.error("Custom test error:", error.message);
	}
}

function testSupportedCurrencies() {
	console.log("\n--- Starting Supported Currencies Test ---");
	console.log("SUPPORTED_CURRENCIES:", SUPPORTED_CURRENCIES);

	if (
		Array.isArray(SUPPORTED_CURRENCIES) &&
		SUPPORTED_CURRENCIES.length > 0
	) {
		console.log(
			`Supported currencies: ${SUPPORTED_CURRENCIES.length} - ✔ Test passed: SUPPORTED_CURRENCIES is a valid non-empty array.`
		);
	} else {
		console.error(
			"✖ Error: SUPPORTED_CURRENCIES array is invalid or empty."
		);
	}
}

function testCurrencyObject() {
	console.log("\n--- Starting Currency Object Test ---");
	console.log("Currency lookup samples:", {
		usd: Currency.usd,
		eur: Currency.eur,
		kzt: Currency.kzt,
		kgs: Currency.kgs,
	});

	if (
		Currency.usd === "USD" &&
		Currency.eur === "EUR" &&
		Currency.kzt === "KZT" &&
		Currency.kgs === "KGS"
	) {
		console.log(
			`Supported currencies: ${
				Object.keys(Currency).length
			} - ✔ Test passed: Currency lookup object works correctly.`
		);
	} else {
		console.error("✖ Error: Currency lookup object failed.");
	}
}

async function main() {
	await testDailyConversion();
	await testWeeklyConversion();
	await testCustomConversion();
	testSupportedCurrencies();
	testCurrencyObject();
}

main();
