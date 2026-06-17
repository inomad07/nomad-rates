import { exchangeByNBKR } from "../src/utils/exchangeByNBKR.mjs";
import { exchangeByCustom } from "../src/utils/exchangeByCustom.mjs";
import { getAvailableCurrencyCodes } from "../src/utils/currencyFormatter.mjs";

async function runTest() {
    console.log("--- Starting conversion test ---");

    // Simulate input data from user
    const input = {
        currencyAmount: "100", // 100 units
        currencyCode: "USD", // currency code
        from: "USD", // from currency
        to: "KGS", // to currency
    };

    try {
        console.log("Request:", input);
        const result = await exchangeByNBKR(input);
        console.log("Result:", result);
    } catch (error) {
        console.error("Testing error:", error.message);
    }

    // EUR conversion test
    const inputEur = {
        currencyAmount: "100",
        currencyCode: "EUR",
        from: "EUR",
        to: "KGS",
    };
    const resultEur = await exchangeByNBKR(inputEur);
    console.log("Result for EUR:", resultEur);
}

async function testCustomConversion() {
    console.log("\n--- Starting custom conversion test ---");

    // Simulate a scenario with a manual exchange rate
    // Note: 'currencyAmount' matches the internal calculation logic
    const customInput = {
        exchangeRate: "88.50", // Manual exchange rate
        currencyAmount: "200", // Amount to convert
        from: "USD",
        to: "KGS",
    };

    try {
        const { result } = exchangeByCustom(customInput);
        console.log("Custom calculation:", result);

        // Verification: 200 * 88.50 = 17700
        if (result === 17700) {
            console.log("Test passed successfully!");
        } else {
            console.log("Error: expected 17700, but got", result);
        }
    } catch (error) {
        console.error("Custom test error:", error.message);
    }
}

// Function to test the retrieval of supported currency codes
function testCurrencyCodes() {
    console.log("\n--- Starting currency codes test ---");

    const codes = getAvailableCurrencyCodes();
    console.log("Available currency codes:", codes);

    // Check if the output is a non-empty string
    if (codes && typeof codes === "string") {
        console.log("Test passed: Codes retrieved successfully.");
    } else {
        console.log("Error: Failed to retrieve currency codes.");
    }
}

// Run all test scenarios
async function main() {
    await runTest();
    await testCustomConversion();
    testCurrencyCodes();
}

main();
