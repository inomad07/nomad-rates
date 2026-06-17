import { parseStringPromise } from "xml2js";
import { formatCurrencyDataFromXML } from "../utils/xmlFormatter.mjs";

function fetchXmlText(url) {
    return fetch(url).then((response) => {
        if (!response.ok)
            throw new Error(`HTTP error: status ${response.status}`);
        return response.text();
    });
}

export function fetchAndParseXmlData(url) {
    return Promise.try(() => fetchXmlText(url))
        .then((xmlString) => parseStringPromise(xmlString))
        .then((parsedData) => formatCurrencyDataFromXML(parsedData))
        .catch((error) => {
            console.error("Error while fetching or parsing XML:", error);
            throw error;
        });
}
