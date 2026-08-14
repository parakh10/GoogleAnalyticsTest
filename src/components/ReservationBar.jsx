// src/components/ReservationBar.jsx
// Booking widget with check-in/out dates & guests. On "Reserve" it builds the
// outbound booking-engine URL and redirects the browser, firing a GA4
// `begin_checkout` event immediately before the redirect.
//
// Two presentation modes:
//   - mode="inline"  → renders the full form as a card (used on Home)
//   - mode="button"  → renders a single "Reserve" button that opens a modal
//                      containing the same form (used on property pages)
import { useState, useEffect } from 'react';
import { trackBeginCheckout } from '../utils/analytics';

// Fixed query params for the booking engine (per spec).
const CHAIN_ID = '33343';
const CURRENCY = 'INR';
const LOCALE = 'en-US';
const LEVEL = 'hotel';
const PRODUCT_CURRENCY = 'INR';
const SEGMENT = 'STD';
const ROOMS = '1';

/**
 * Build the outbound booking URL.
 * @param {Object} p - { hotelId, adults, children, checkIn, checkOut }
 * @returns {string}
 */
export function buildBookingUrl({ hotelId, adults, children, checkIn, checkOut }) {
  const params = new URLSearchParams({
    adult: String(adults),
    arrive: checkIn,
    chain: CHAIN_ID,
    child: String(children),
    currency: CURRENCY,
    depart: checkOut,
    hotel: String(hotelId),
    level: LEVEL,
    locale: LOCALE,
    productcurrency: PRODUCT_CURRENCY,
    rooms: ROOMS,
    segment: SEGMENT,
  });
  return `https://bookings.suryagarhcollection.com/?${params.toString()}`;
}

/**
 * ReservationBar
 * @param {Object} property - the property object { hotelId, name, slug, ... }
 * @param {('inline'|'button')} [mode='inline'] - inline form or modal button
 */
export default function ReservationBar({ property, mode = 'inline' }) {
  const today = new Date().toISOString().slice(0, 10);
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [open, setOpen] = useState(false);

  const handleReserve = () => {
    const redirectUrl = buildBookingUrl({
      hotelId: property.hotelId,
      adults,
      children,
      checkIn,
      checkOut,
    });

    // 🔔 Analytics: fire `begin_checkout` JUST BEFORE the redirect so GTM/GA4
    // captures the outbound booking intent with the selected dates & guests.
    trackBeginCheckout({
      property,
      checkIn,
      checkOut,
      adults,
      children,
      redirectUrl,
    });

    // Allow the dataLayer push to flush, then redirect to the external engine.
    window.location.href = redirectUrl;
  };

  // The shared form fields rendered in both inline and modal modes.
  const formFields = (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
      <div className="flex flex-col">
        <label className="text-xs uppercase tracking-widest text-charcoal/70 mb-1">
          Check-in
        </label>
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => setCheckIn(e.target.value)}
          className="border border-charcoal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs uppercase tracking-widest text-charcoal/70 mb-1">
          Check-out
        </label>
        <input
          type="date"
          value={checkOut}
          min={checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          className="border border-charcoal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
        />
      </div>

      <div className="flex flex-col">
        <label className="text-xs uppercase tracking-widest text-charcoal/70 mb-1">
          Adults
        </label>
        <select
          value={adults}
          onChange={(e) => setAdults(Number(e.target.value))}
          className="border border-charcoal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
        >
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col">
        <label className="text-xs uppercase tracking-widest text-charcoal/70 mb-1">
          Children
        </label>
        <select
          value={children}
          onChange={(e) => setChildren(Number(e.target.value))}
          className="border border-charcoal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
        >
          {[0, 1, 2, 3, 4].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  // Button mode: a single Reserve button that opens a modal with the form.
  if (mode === 'button') {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="bg-charcoal text-white tracking-widest text-sm uppercase px-6 py-2.5 rounded hover:bg-gold hover:text-charcoal transition-colors"
        >
          Reserve
        </button>
        <p className="text-[11px] text-charcoal/50 mt-3">
          Redirects to the external booking engine · Hotel ID {property.hotelId}
        </p>

        {open && (
          <ReservationModal
            property={property}
            onClose={() => setOpen(false)}
            onReserve={handleReserve}
          >
            {formFields}
          </ReservationModal>
        )}
      </>
    );
  }

  // Inline mode (default): the full form card.
  return (
    <div className="bg-white/95 backdrop-blur shadow-xl rounded-md border border-gold/30 p-5 md:p-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-widest text-charcoal/70 mb-1">
            Check-in
          </label>
          <input
            type="date"
            value={checkIn}
            min={today}
            onChange={(e) => setCheckIn(e.target.value)}
            className="border border-charcoal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-widest text-charcoal/70 mb-1">
            Check-out
          </label>
          <input
            type="date"
            value={checkOut}
            min={checkIn}
            onChange={(e) => setCheckOut(e.target.value)}
            className="border border-charcoal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-widest text-charcoal/70 mb-1">
            Adults
          </label>
          <select
            value={adults}
            onChange={(e) => setAdults(Number(e.target.value))}
            className="border border-charcoal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-xs uppercase tracking-widest text-charcoal/70 mb-1">
            Children
          </label>
          <select
            value={children}
            onChange={(e) => setChildren(Number(e.target.value))}
            className="border border-charcoal/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-gold"
          >
            {[0, 1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleReserve}
          className="bg-charcoal text-white tracking-widest text-sm uppercase py-2.5 rounded hover:bg-gold hover:text-charcoal transition-colors"
        >
          Reserve
        </button>
      </div>
      <p className="text-[11px] text-charcoal/50 mt-3">
        Redirects to the external booking engine · Hotel ID {property.hotelId}
      </p>
    </div>
  );
}

/**
 * ReservationModal
 * A lightweight accessible modal dialog wrapping the reservation form fields.
 * @param {Object} property
 * @param {Function} onClose
 * @param {Function} onReserve
 * @param {React.ReactNode} children - the form fields
 */
function ReservationModal({ property, onClose, onReserve, children }) {
  // Close on Escape key and lock body scroll while open.
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-lg rounded-lg shadow-2xl border border-gold/30 p-6 md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between mb-5">
          <div>
            <h3 className="font-serif text-2xl">{property.name}</h3>
            <p className="text-xs uppercase tracking-widest text-gold mt-1">
              Reserve Your Stay
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-charcoal/50 hover:text-charcoal text-2xl leading-none"
          >
            ×
          </button>
        </div>

        {children}

        <button
          onClick={onReserve}
          className="mt-6 w-full bg-charcoal text-white tracking-widest text-sm uppercase py-3 rounded hover:bg-gold hover:text-charcoal transition-colors"
        >
          Reserve
        </button>
      </div>
    </div>
  );
}
