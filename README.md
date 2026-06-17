# Nomad Rates

[![npm version](https://img.shields.io/npm/v/nomad-rates.svg)](https://www.npmjs.com/package/nomad-rates)
[![license](https://img.shields.io/npm/l/nomad-rates.svg)](https://github.com/nomad/nomad-rates/blob/master/LICENSE)
[![npm download count](https://img.shields.io/npm/dt/nomad-rates.svg)](https://www.npmjs.com/package/nomad-rates)

A lightweight, ESM-native JavaScript library for currency conversion. Get real-time exchange rates from the **National Bank of the Kyrgyz Republic (NBKR)** — or plug in your own custom rates for full control.

---

## Features

| Feature | Description |
| --- | --- |
| 🔄 Smart API | Automatically detects conversion direction based on the provided currency pair (`from` → `to`). |
| 🏦 Official Rates | Fetches real-time exchange rates directly from [nbkr.kg](https://www.nbkr.kg/). |
| ⚙️ Custom Rates | Convert using your own manually defined exchange rates — ideal for internal accounting or margin-based pricing. |
| 📦 ESM-ready | Native ES Module support with zero dependencies. |

---

## Installation

```bash
npm install nomad-rates
```

---

## Quick Start

```js
import {
  exchangeByNBKR,
  exchangeByCustom,
  getAvailableCurrencyCodes,
} from "nomad-rates";

// ── Official NBKR rates ────────────────────────────────────────
const result = await exchangeByNBKR({
  from: "USD",
  to: "KGS",
  amount: 100,
});
console.log(result); // => { amount: 100, from: "USD", to: "KGS", rate: 89.35, converted: 8935 }

// ── Custom rates ───────────────────────────────────────────────
const customResult = exchangeByCustom({
  from: "KGS",
  to: "EUR",
  amount: 1000,
  rate: 95.5,
});
console.log(customResult); // => { amount: 1000, from: "KGS", to: "EUR", rate: 95.5, converted: 95500 }

// ── Supported currencies ───────────────────────────────────────
console.log(getAvailableCurrencyCodes());
// => ["USD", "EUR", "KGS", "GBP", "RUB", ...]
```

---

## API Reference

### `exchangeByNBKR(inputData)`

Fetches the latest rates from NBKR and performs a currency conversion.

**Parameters**

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | Yes | Source currency code (e.g., `"USD"`) |
| `to` | `string` | Yes | Target currency code (e.g., `"KGS"`) |
| `amount` | `number` | Yes | Amount to convert |

**Returns** `Promise<ExchangeResult>`

```ts
interface ExchangeResult {
  amount: number;       // original amount
  from: string;         // source currency code
  to: string;           // target currency code
  rate: number;         // applied exchange rate
  converted: number;    // converted amount
}
```

---

### `exchangeByCustom(inputData)`

Converts an amount using a manually provided exchange rate.

**Parameters**

| Param | Type | Required | Description |
| --- | --- | --- | --- |
| `from` | `string` | Yes | Source currency code |
| `to` | `string` | Yes | Target currency code |
| `amount` | `number` | Yes | Amount to convert |
| `rate` | `number` | Yes | Your custom exchange rate |

**Returns** `ExchangeResult` (synchronous)

---

### `getAvailableCurrencyCodes()`

Returns a static array of supported ISO 4217 currency codes.

**Returns** `string[]`

---

## License

[ISC](LICENSE)
