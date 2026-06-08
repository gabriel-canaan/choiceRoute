---
name: run-choiceroute
description: run, start, launch, screenshot, smoke-test the choiceRoute app — Express backend + React CRA frontend
---

# run-choiceroute

choiceRoute is an Express 4 backend (`react-backend/`) plus a CRA React frontend (`react-backend/client/`). The driver is `smoke.sh`, which starts both processes, waits for them, and verifies with `curl`.

No browser is available in this container — interaction is via `curl`. The UI renders NEM2 blockchain components (InfoButton, QrReader, Transfer, AddToken, DeleteToken) using Semantic UI React.

## Prerequisites

- **Node 10** via nvm (required for `react-scripts@1.1.1` — see Gotchas)
- nvm must be installed at `~/.nvm`
- Both `react-backend/node_modules` and `react-backend/client/node_modules` must exist

If either `node_modules` is missing, install with `--ignore-scripts` (native builds fail):

```bash
# backend deps
cd react-backend && npm install --ignore-scripts

# frontend deps (must use Node 10)
source ~/.nvm/nvm.sh && nvm use 10
cd react-backend/client && npm install --ignore-scripts
```

## Run (agent path)

From the repo root:

```bash
bash .claude/skills/run-choiceroute/smoke.sh
```

Launches backend on `:3001` and frontend on `:3000`, waits for both, then prints confirmation. Exits non-zero if either fails to start within the timeout.

**Verify backend:**
```bash
curl -s http://localhost:3001/users
# → [{"id":1,"username":"ossie"}, ...]
```

**Verify frontend (HTML shell + compiled bundle):**
```bash
curl -s http://localhost:3000 | grep bundle.js
# → <script type="text/javascript" src="/static/js/bundle.js"></script>
```

**Stop:**
```bash
bash .claude/skills/run-choiceroute/smoke.sh --stop
```

## Run (human path)

Two terminals, both from `react-backend/`:

```bash
# T1 — backend
PORT=3001 node bin/www

# T2 — frontend (must be on Node 10)
source ~/.nvm/nvm.sh && nvm use 10
cd client && npm start
```

Browser opens at `http://localhost:3000`.

## Tests

```bash
cd react-backend/client
source ~/.nvm/nvm.sh && nvm use 10
npm test -- --watchAll=false
```

## Gotchas

- **Node 10 is required for the frontend.** `react-scripts@1.1.1` calls `process.binding('http_parser')`, an internal API removed in Node 12+. Running with Node 24 produces `Error: No such module: http_parser` and CRA never starts. Always `nvm use 10` before touching `react-backend/client/`.

- **`npm install` fails without `--ignore-scripts`.** The `bufferutil` package tries to compile a native addon with `node-gyp` and fails (`make` exit 2). Use `--ignore-scripts` for both the backend and client installs.

- **Private key is hardcoded.** `PRIVATE_KEY` is in `client/.env` and also hardcoded directly in each component file. The `process.env.*` reads are commented out; the literal key is used. Blockchain calls go to `api.beta.catapult.mijin.io:3000` which may not be reachable — button clicks will log errors to the browser console but the UI still loads.

- **The backend proxy exists but is unused.** `client/package.json` proxies `/` to `localhost:3001`, but the `componentDidMount` fetch in `App.js` is commented out. The Express backend runs only because the proxy config requires it to exist on port 3001.
