import { XMLParser } from "fast-xml-parser";
import { formatCurrencyDataFromXML } from "../utils/xmlFormatter.mjs";

async function fetchXmlText(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error: status ${response.status}`);
    return await response.text();
}

export async function fetchAndParseXmlData(url) {
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
