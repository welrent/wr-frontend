# @welrent/sdk

Lightweight JavaScript client for the Welrent PHP JSON API.

## Install / use

```js
import { WelrentClient } from './src/index.js';

const client = new WelrentClient({ baseUrl: 'http://127.0.0.1:8080' });
await client.health();
await client.getCars();
await client.login({ email: 'demo@welrent.com', password: 'demo-pass' });
```

## Scripts

```bash
npm test          # unit tests (mocked fetch)
npm run smoke     # live smoke against WELRENT_API_BASE (default http://127.0.0.1:8080)
```
