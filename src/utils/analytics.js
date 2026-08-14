// src/utils/analytics.js
// Utility for pushing GA4 / GTM events to window.dataLayer.
//
// GTM reads window.dataLayer. We initialize it (if missing) and provide a
// single `pushToDataLayer` function used everywhere analytics events fire.

/**
 * Ensure window.dataLayer exists before GTM loads.
 */
export function initDataLayer() {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
}

/**
 * Push an event object to window.dataLayer.
 * @param {Object} event - The event payload. MUST include an `event` key.
 * @example
 *   pushToDataLayer({ event: 'page_view', page_title: 'Home' });
 */
export function pushToDataLayer(event) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/**
 * Fire a GA4 `page_view` event.
 * @param {string} pagePath  - e.g. '/narendra-bhawan'
 * @param {string} pageTitle - document title or a custom page name.
 */
export function trackPageView(pagePath, pageTitle) {
  pushToDataLayer({
    event: 'page_view',
    page_path: pagePath,
    page_title: pageTitle,
  });
}

/**
 * Fire a GA4 `view_item` event when a user views a specific property page.
 * @param {Object} property - { name, hotelId, slug }
 */
export function trackViewItem(property) {
  pushToDataLayer({
    event: 'view_item',
    ecommerce: {
      currency: 'INR',
      value: 0,
      items: [
        {
          item_id: String(property.hotelId),
          item_name: property.name,
          item_category: 'Hotel',
          price: 0,
          quantity: 1,
        },
      ],
    },
  });
}

/**
 * Fire a GA4 `begin_checkout` event just before an outbound booking redirect.
 * This captures the user's selected dates & guests plus the target hotel.
 *
 * @param {Object} params
 * @param {Object} params.property   - { name, hotelId, slug }
 * @param {string} params.checkIn    - ISO date string (YYYY-MM-DD)
 * @param {string} params.checkOut   - ISO date string (YYYY-MM-DD)
 * @param {number} params.adults     - number of adults
 * @param {number} params.children   - number of children
 * @param {string} params.redirectUrl - the outbound URL the user is sent to
 */
export function trackBeginCheckout({
  property,
  checkIn,
  checkOut,
  adults,
  children,
  redirectUrl,
}) {
  pushToDataLayer({
    event: 'begin_checkout',
    ecommerce: {
      currency: 'INR',
      value: 0,
      check_in: checkIn,
      check_out: checkOut,
      adults: adults,
      children: children,
      redirect_url: redirectUrl,
      items: [
        {
          item_id: String(property.hotelId),
          item_name: property.name,
          item_category: 'Hotel',
          price: 0,
          quantity: 1,
        },
      ],
    },
  });
}
