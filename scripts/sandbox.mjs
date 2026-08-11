import {
	getDailyRates,
	getWeeklyRates,
	exchangeCurrency,
	SUPPORTED_CURRENCIES,
	Currency,
} from "../src/index.mjs";

async function testDailyRates() {
	console.log("--- Starting daily rates test ---");
	try {
		const dailyData = await getDailyRates();
		console.log("Daily rates response:", dailyData);

		if (dailyData?.currencies && Array.isArray(dailyData.currencies)) {
			console.log(
				`✔ Test passed: Fetched ${dailyData.currencies.length} daily currencies for date ${dailyData.date}`
			);
		} else {
			console.error("✖ Error: Invalid daily rates structure.");
		}
	} catch (error) {
		console.error("Daily rates test error:", error.message);
	}
}

async function testWeeklyRates() {
	console.log("\n--- Starting weekly rates test ---");
	try {
		const weeklyData = await getWeeklyRates();
		console.log("Weekly rates response:", weeklyData);

		if (weeklyData?.currencies && Array.isArray(weeklyData.currencies)) {
			console.log(
				`✔ Test passed: Fetched ${weeklyData.currencies.length} weekly currencies for date ${weeklyData.date}`
			);
		} else {
			console.error("✖ Error: Invalid weekly rates structure.");
		}
	} catch (error) {
		console.error("Weekly rates test error:", error.message);
	}
}

function testCustomConversion() {
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
		const { result: resUsd } = exchangeCurrency(customInput);
		console.log("Custom USD calculation (200 * 88.50):", resUsd);

		const { result: resGbp } = exchangeCurrency(customGbpInput);
		console.log("Custom GBP calculation (100 * 117.50):", resGbp);

		const { result: resKzt } = exchangeCurrency(customKztInput);
		console.log("Custom KZT calculation (5000 / 100 * 18.50):", resKzt);

		const isUsdOk = Number(resUsd) === 17700;
		const isGbpOk = Number(resGbp) === 11750;
		const isKztOk = Number(resKzt) === 925;

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
	if (
		Array.isArray(SUPPORTED_CURRENCIES) &&
		SUPPORTED_CURRENCIES.length > 0
	) {
		console.log(
			`Supported currencies: ${SUPPORTED_CURRENCIES.length} - ✔ Test passed.`
		);
	} else {
		console.error("✖ Error: SUPPORTED_CURRENCIES array is invalid.");
	}
}

function testCurrencyObject() {
	console.log("\n--- Starting Currency Object Test ---");
	if (
		Currency.USD === "USD" &&
		Currency.EUR === "EUR" &&
		Currency.KZT === "KZT" &&
		Currency.KGS === "KGS"
	) {
		console.log("✔ Test passed: Currency lookup object works correctly.");
	} else {
		console.error("✖ Error: Currency lookup object failed.");
	}
}

async function main() {
	await testDailyRates();
	await testWeeklyRates();
	testCustomConversion();
	testSupportedCurrencies();
	testCurrencyObject();
}

main();
