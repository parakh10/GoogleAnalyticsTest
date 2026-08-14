# AGENTS.md

## Project Overview

A demo multi-page React site for the "Suryagarh Collection" of luxury hotels,
purpose-built for testing Google Analytics 4 (GA4) and Google Tag Manager (GTM)
implementations. There is no backend booking system — "Reserve" clicks redirect
to a mock external booking engine, firing analytics events just beforehand.

## Key Technologies

- **Vite + React 18** (SPA)
- **React Router DOM v6** (`BrowserRouter` + nested `Routes`)
- **Tailwind CSS** (utility-first styling)
- **No database / no persistence** — all data is mock data in `src/data/properties.js`

## Architecture

### Routing

`src/App.jsx` defines a single `Layout` route (with `<Outlet/>`) wrapping:
- `/` → `Home`
- `/:slug` → `Property` (dynamic, keyed by slug)

`netlify.toml` includes a SPA catch-all redirect (`/* → /index.html`) so client
routes resolve on deploy.

### Data Model

`src/data/properties.js` exports a `properties` array and a `propertyBySlug`
lookup map. Each property has:
- `slug` (used in the URL)
- `hotelId` (mock booking-engine ID)
- `name`, `tagline`, `shortDescription`, `heroImage`, `gallery[]`

### Reservation Bar (`src/components/ReservationBar.jsx`)

The booking widget. On "Reserve" it:
1. Builds the outbound URL via `buildBookingUrl()` using the exact query-string
   format specified (chain, currency, locale, level, productcurrency, rooms,
   segment, plus dynamic adult/child/arrive/depart/hotel values).
2. Fires `begin_checkout` to the dataLayer (via `trackBeginCheckout`).
3. Sets `window.location.href` to the outbound URL (synchronous after the push).

### Analytics (`src/utils/analytics.js`)

Single source of truth for dataLayer interactions:
- `initDataLayer()` — ensures `window.dataLayer` exists.
- `pushToDataLayer(event)` — low-level push.
- `trackPageView(path, title)` — `page_view` event.
- `trackViewItem(property)` — `view_item` event with `ecommerce.items[]`.
- `trackBeginCheckout({...})` — `begin_checkout` event with dates, guests, hotel.

`src/hooks/useRouteTracking.js` calls `trackPageView` on every `location.pathname`
change inside `Layout`.

## Coding Conventions

- Plain JS (`.js`/`.jsx`), no TypeScript.
- Named exports for components where natural; default export for page/layout components.
- Tailwind utility classes inline; theme tokens (`gold`, `charcoal`) defined in
  `tailwind.config.js`.
- Comments are concentrated around analytics firing points and the redirect
  timing — these are the load-bearing parts of the demo.

## GTM Configuration

GTM container snippets live in `index.html`:
- Head snippet at top of `<head>`.
- Noscript iframe immediately after `<body>`.

Replace `GTM-XXXXXXX` (appears twice) with the real container ID before testing.

## Non-Obvious Decisions

- **Slug-based routing, not ID-based**: per spec, URLs use `/narendra-bhawan`
  etc. The `propertyBySlug` map translates back to the hotel ID needed for the
  booking URL.
- **begin_checkout fires before redirect**: the dataLayer push happens
  synchronously immediately before `window.location.href` is set, so GTM (which
  reads dataLayer asynchronously) still captures the event before navigation.
- **Home reservation bar uses the first property** (Suryagarh Jaisalmer) as a
  sensible default, since the homepage isn't tied to a single hotel.
- **Images are Unsplash source URLs** — no local image assets are used.
