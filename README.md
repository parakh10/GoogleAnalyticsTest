# Suryagarh Collection — GA4 / GTM Demo

A basic multi-page React website for a luxury hotel collection, built as a demo
environment to test **Google Analytics 4 (GA4)** and **Google Tag Manager (GTM)**
implementations. Inspired by suryagarhcollection.com.

## Tech Stack

- **React 18** (Vite)
- **React Router DOM** for client-side routing
- **Tailwind CSS** for styling

## Pages

| Route                            | Page        | Notes                                         |
| -------------------------------- | ----------- | --------------------------------------------- |
| `/`                              | Home        | Hero, reservation bar, three-property grid    |
| `/suryagarh-jaisalmer`           | Property    | Hotel ID `48497`                              |
| `/narendra-bhawan`               | Property    | Hotel ID `48498`                              |
| `/mary-budden-estate-binsar`     | Property    | Hotel ID `48499`                              |

Property pages are keyed by **slug** (not ID) in the URL, and a mock data object
maps each slug back to its hotel ID so the reservation bar works correctly.

## Reservation Bar & External Booking

There is **no internal booking form**. Clicking "Reserve" on any Reservation Bar
constructs an outbound URL and redirects the browser:

```
https://bookings.suryagarhcollection.com/?adult={adults}&arrive={check_in}&chain=33343&child={children}&currency=INR&depart={check_out}&hotel={hotel_id}&level=hotel&locale=en-US&productcurrency=INR&rooms=1&segment=STD
```

## Analytics (GA4 / GTM)

### GTM Setup

The GTM container snippet is in `index.html`:
- **Head snippet** (top of `<head>`): loads `gtm.js`.
- **Noscript snippet** (top of `<body>`): iframe fallback.

Replace `GTM-XXXXXXX` with your real GTM container ID in both places.

### dataLayer Events

A single utility file, `src/utils/analytics.js`, manages all pushes to
`window.dataLayer`:

| Event            | Fires when                                    | Key payload                                      |
| ---------------- | --------------------------------------------- | ------------------------------------------------ |
| `page_view`      | Every route change (`useRouteTracking` hook)  | `page_path`, `page_title`                        |
| `view_item`      | User lands on a property page                 | `ecommerce.items[]` with item_id (hotel ID) + name |
| `begin_checkout` | User clicks "Reserve", just before redirect  | `check_in`, `check_out`, `adults`, `children`, `redirect_url`, `ecommerce.items[]` |

The `begin_checkout` event fires synchronously immediately before
`window.location.href` is set, ensuring GTM captures the outbound intent.

## Project Structure

```
.
├── index.html                # GTM head + noscript snippets live here
├── netlify.toml              # Build command + SPA redirect rule
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── vite.config.js
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx              # React entry
    ├── App.jsx               # BrowserRouter + Routes (Layout wraps all pages)
    ├── index.css            # Tailwind directives
    ├── components/
    │   ├── Layout.jsx        # Nav + footer + route tracking
    │   └── ReservationBar.jsx# Booking widget, URL builder, outbound redirect
    ├── data/
    │   └── properties.js     # Mock property data (slug -> hotelId)
    ├── hooks/
    │   └── useRouteTracking.js # Fires page_view on route change
    ├── pages/
    │   ├── Home.jsx
    │   └── Property.jsx
    └── utils/
        └── analytics.js      # pushToDataLayer + event helpers
```

## Run Locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

To preview with Netlify platform emulation:

```bash
netlify dev --port 8889
```
