# nomad-rates

[![npm version](https://img.shields.io/npm/v/nomad-rates.svg)](https://www.npmjs.com/package/nomad-rates)
[![Downloads](https://img.shields.io/npm/dt/nomad-rates.svg)](https://www.npmjs.com/package/nomad-rates)
[![License: ISC](https://img.shields.io/npm/l/nomad-rates.svg)](LICENSE)

A lightweight, ESM-native JavaScript library for currency conversion. Get real-time exchange rates from the **National Bank of the Kyrgyz Republic (NBKR)** — or plug in your own custom rates for full control.

## Features

| Feature           | Description                                                                                                     |
| ----------------- | --------------------------------------------------------------------------------------------------------------- |
| 🔄 Smart API      | Automatically detects conversion direction based on the provided currency pair (`from` → `to`).                 |
| 🏦 Official Rates | Fetches real-time exchange rates directly from [nbkr.kg](https://www.nbkr.kg/).                                 |
| ⚙️ Custom Rates   | Convert using your own manually defined exchange rates — ideal for internal accounting or margin-based pricing. |
| 📦 ESM-ready      | Native ES Module support with zero dependencies.                                                                |

## Installation

```bash
npm install nomad-rates
```

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

## API Reference

### `exchangeByNBKR(inputData)`

Fetches the latest rates from NBKR and performs a currency conversion.

| Param    | Type     | Required | Description                          |
| -------- | -------- | -------- | ------------------------------------ |
| `from`   | `string` | Yes      | Source currency code (e.g., `"USD"`) |
| `to`     | `string` | Yes      | Target currency code (e.g., `"KGS"`) |
| `amount` | `number` | Yes      | Amount to convert                    |

**Returns:** `Promise<ExchangeResult>`

```ts
interface ExchangeResult {
    amount: number; // original amount
    from: string; // source currency code
    to: string; // target currency code
    rate: number; // applied exchange rate
    converted: number; // converted amount
}
```

### `exchangeByCustom(inputData)`

Converts an amount using a manually provided exchange rate.

| Param    | Type     | Required | Description               |
| -------- | -------- | -------- | ------------------------- |
| `from`   | `string` | Yes      | Source currency code      |
| `to`     | `string` | Yes      | Target currency code      |
| `amount` | `number` | Yes      | Amount to convert         |
| `rate`   | `number` | Yes      | Your custom exchange rate |

**Returns:** `ExchangeResult` (synchronous)

### `getAvailableCurrencyCodes()`

Returns a static array of supported ISO 4217 currency codes.

**Returns:** `string[]`

## Warning

### ⚠️ CORS Limitation for Frontend Use

If you call `exchangeByNBKR` directly from a browser-based frontend (React, Vue, Svelte, etc.), the request **will fail with a CORS error**. NBKR's servers do not send the required `Access-Control-Allow-Origin` header, so browsers block direct requests from third-party origins.

#### Solution 1 — Recommended: Server-Side Route

Call `exchangeByNBKR` from your backend, not from the browser. For example:

```js
// pages/api/rates.js (Next.js API Route)
import { exchangeByNBKR } from "nomad-rates";

export default async function handler(req, res) {
  const result = await exchangeByNBKR({
    from: "USD",
    to: "KGS",
    amount: 1,
  });
  res.status(200).json(result);
}
```

Then call `GET /api/rates` from your frontend. This works with **Next.js API Routes**, **Express**, or any server framework.

#### Solution 2 — Development Only: Proxy for Localhost

During local development you can bypass CORS by configuring a proxy in your dev server:

**Vite** (`vite.config.js`):

```js
export default {
  server: {
    proxy: {
      "/api/rates": "http://localhost:3000", // forward to your backend
    },
  },
};
```

> This is for **local development only** — it does not work in production. Use Solution 1 for deployed applications.

#### Caching Recommendation

NBKR publishes exchange rates **once per day**. There's no reason to fetch them on every user request. Cache the result on your server:

- **In-memory** (`Map` / `SetTimeout`) — simplest; refresh on a cron or at startup
- **Redis / Memcached** — for multi-instance deployments
- **CDN edge cache** — with a long `stale-while-revalidate` TTL

This reduces latency, avoids unnecessary dependency on NBKR's uptime, and protects against rate-limiting.

### ⚠️ API Uptime & Availability

This library depends on the [NBKR website](https://www.nbkr.kg/) for live exchange rates. The author makes no guarantees about API availability, uptime, or rate freshness. If NBKR changes their site structure or experiences downtime, this library may temporarily stop working. For production-critical applications, consider using `exchangeByCustom` with your own data source as a fallback.

## Contributing

Contributions are welcome! If you've found a bug, have a feature request, or want to improve the docs — open an [issue](https://github.com/inomad07/nomad-rates/issues) or submit a [pull request](https://github.com/inomad07/nomad-rates/pulls).

Please ensure your PR includes:

- A clear description of the change
- Tests covering new or modified behavior (when applicable)
- Updated documentation for public API changes

## License

[ISC](https://github.com/inomad07/nomad-rates/blob/main/LICENSE) — Copyright &copy; 2026 Nomad.
