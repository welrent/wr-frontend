# Welrent Frontend (public proof)

Public repository: **[github.com/welrent/wr-frontend](https://github.com/welrent/wr-frontend)**  
Visibility verified: **PUBLIC** (`gh api repos/welrent/wr-frontend` → `"visibility":"public"`).

Welrent is a car / motorcycle / boat rental platform with:

- **Next.js web app** (`next-web/`) — marketplace UI + Welrent Act pages
- **PHP JSON API** (`index.php`, `api/`, `lib/`) — cars, auth, content, rentals
- **JavaScript SDK** (`sdk/`) — `@welrent/sdk` client for the public API
- **Flutter mobile scaffold** (`flutter-app/`) — consumes the same API

## Demo proof

Screenshots and walkthrough video captured from a local run of the public codebase:

| Asset | Description |
| --- | --- |
| ![Home](docs/proof/home.png) | Home hero + search |
| ![Act](docs/proof/act.png) | Welrent Act page (connected from nav/footer) |
| ![Offer list](docs/proof/offerlist.png) | Vehicles from API / demo fallback |
| ![Vehicle](docs/proof/vehicle.png) | Vehicle detail (`/vehicle/an-RS6`) |
| ![SDK](docs/proof/sdk-smoke.png) | `@welrent/sdk` smoke test against PHP API |
| Video | [`docs/proof/welrent-walkthrough.mp4`](docs/proof/welrent-walkthrough.mp4) |

## Quick start

### 1. PHP API

```bash
php -S 127.0.0.1:8080 index.php
```

Health check: `curl http://127.0.0.1:8080/` → `{"status":"success","message":"Welrent API is running"}`

### 2. Next.js web

```bash
cd next-web
cp .env.example .env.local   # set NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8080
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Key routes:

- `/` home
- `/act` Welrent Act (also linked from header + footer)
- `/offerlist` vehicles
- `/vehicle/[slug]` detail
- `/locations`, `/login`, `/privacy`, `/terms`

### 3. JavaScript SDK

```bash
cd sdk
node --test test/sdk.test.js
WELRENT_API_BASE=http://127.0.0.1:8080 node scripts/smoke.mjs
```

Example:

```js
import { WelrentClient } from './sdk/src/index.js';

const client = new WelrentClient({ baseUrl: 'http://127.0.0.1:8080' });
const cars = await client.getCars();
const session = await client.login({ email: 'demo@welrent.com', password: 'demo-pass' });
```

### 4. Flutter app

```bash
cd flutter-app
# requires Flutter SDK
flutter pub get
flutter run
```

`lib/api_service.dart` talks to `/api/cars` and `/api/auth/login`.

## Architecture

```text
Flutter App  ──┐
Next.js Web  ──┼──►  PHP JSON API  ──►  MySQL (optional; demo data if offline)
JS SDK       ──┘
```

When MySQL is unavailable the API serves demo cars/content so the web app and SDK keep working.

## Welrent Act connection

`act.welrent.com` is not yet publicly resolvable, so Act is first-class inside this app at **`/act`**:

- Header mobile strip → `/act`
- Navbar / footer About → `/act`
- Act page CTAs → `/offerlist`, `/sponsorship/f1/wr/designed`, home

## Public proof checklist

- [x] Repository is **public** on GitHub
- [x] Web app routes respond `200`
- [x] PHP API health + cars + login work
- [x] SDK unit tests + live smoke pass
- [x] Act pages linked through nav/footer
- [x] Screenshots + walkthrough video in `docs/proof/`

## License

ISC / project default. Brand assets in `assets/` and `next-web/public/assets/` remain Welrent property.
