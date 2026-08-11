import { XMLParser } from "fast-xml-parser";
import { formatCurrencyDataFromXML } from "../utils/xmlFormatter.mjs";
import {
	NBKR_DAILY_RATES_URL,
	NBKR_WEEKLY_RATES_URL,
} from "../constants/index.mjs";

async function fetchXmlText(url) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`HTTP error: status ${response.status}`);
	return await response.text();
}

async function fetchAndParseXmlData(url) {
	try {
		const xmlString = await fetchXmlText(url);

		const parser = new XMLParser({
			ignoreAttributes: false,
			attributeNamePrefix: "",
		});

		const parsedData = parser.parse(xmlString);

		return formatCurrencyDataFromXML(parsedData);
	} catch (error) {
		console.error("Error while fetching or parsing XML:", error);
		throw error;
	}
}

export async function getDailyRates() {
	return await fetchAndParseXmlData(NBKR_DAILY_RATES_URL);
}

export async function getWeeklyRates() {
	return await fetchAndParseXmlData(NBKR_WEEKLY_RATES_URL);
}
