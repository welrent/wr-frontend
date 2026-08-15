# Welrent Act (linked repository)

Public source: https://github.com/welrent/Act

This marketplace frontend connects to Act agreement/legal pages and the WelrentAuth SSO SDK published from that repository.

## Act page routes

- `/` — Act home (agreements hub)
- `/pages/car-rental-agreement`
- `/pages/boat-rental-agreement`
- `/pages/equipment-rental-agreement`
- `/pages/terms`
- `/pages/privacy`
- `/pages/cookie`
- `/pages/accessibility`
- `/agreements`
- `/portal/[username]`

Configure `NEXT_PUBLIC_ACT_BASE_URL` (default `https://act.welrent.com`).
