export function formatCurrencyDataFromXML(data) {
    const { CurrencyRates } = data;

    const currencies = CurrencyRates.Currency.map((item) => ({
        ISOCode: item.ISOCode,
        nominal: item.Nominal,
        rate: item.Value,
    }));

    return {
        title: CurrencyRates.Name,
        date: CurrencyRates.Date,
        currencies,
    };
}
