# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

This is a monorepo with two separate Node.js projects:

- **`react-backend/`** — Express 4 backend server (entry: `bin/www`, port 3001). Uses jade templates for server-rendered views and exposes a `/users` JSON API route. Depends on `nem2-sdk` for blockchain interactions.
- **`react-backend/client/`** — Create React App frontend (React 16, `react-scripts@1.1.1`). Proxies API requests to `localhost:3001` (configured in `package.json`). UI built with Semantic UI React.

The React app never fetches from the backend in practice — the `/users` fetch in `App.js` is commented out. All blockchain operations happen directly from the frontend via `nem2-sdk`.

## Running the App

Both processes must run concurrently (two terminals):

```sh
# Terminal 1 — backend (from react-backend/)
PORT=3001 node bin/www

# Terminal 2 — frontend (from react-backend/client/)
yarn start     # CRA dev server at localhost:3000
```

## Blockchain Domain

The app interacts with the **NEM2 (Catapult / Symbol)** blockchain on the `MIJIN_TEST` network:

- API node: `http://api.beta.catapult.mijin.io:3000`
- Mosaic: `choice:nzdc` (namespace `choice`, mosaic name `nzdc`)
- Account address: `SCNV6D-ZMYA7P-CFSMSC-ZXLWPC-ML4Z2N-ZXYDEB-7XA2`
- Private key is hardcoded in most components (should come from `.env` via `process.env.PRIVATE_KEY` but that path is commented out)

### Component responsibilities

| Component | NEM2 operation |
|-----------|---------------|
| `InfoButton` | Query mosaic balance via `MosaicService` |
| `QrReader` | Scan QR code → parse amount → trigger transfer |
| `Transfer` | Submit a `TransferTransaction` for `choice:nzdc` |
| `AddToken` | `MosaicSupplyChangeTransaction` (Increase) |
| `DeleteToken` | `MosaicSupplyChangeTransaction` (Decrease, hardcoded 1,700,000 units) |
| `aggregate.js` | Standalone script: aggregate + cosignatory transaction pattern |
| `cosigner.ts` | TypeScript multisig cosignatory example (not wired into the UI) |

All components use `rxjs@5` observable style (`.subscribe()`), matching `nem2-sdk@0.9.2`.

## Environment Variables

`react-backend/client/.env` holds:
```
PRIVATE_KEY=...
COSIGNATORY_1_PRIVATE_KEY=...
```

CRA exposes only vars prefixed `REACT_APP_` by default; the current `.env` vars are accessed via `Object.assign(process.env, {...})` at the top of `App.js` as a workaround.

## NEM2 CLI (setup commands from README)

```sh
# Register root namespace
nem2-cli transaction namespace --name choice --rootnamespace --duration 50 --profile choice

# Create mosaic
nem2-cli transaction mosaic --mosaicname nzdc --namespacename choice --amount 1000000 \
  --transferable --supplymutable --divisibility 2 --duration 50 --profile choice

# Check account balance
nem2-cli account info --address SCNV6D-ZMYA7P-CFSMSC-ZXLWPC-ML4Z2N-ZXYDEB-7XA2 --profile choice
```
