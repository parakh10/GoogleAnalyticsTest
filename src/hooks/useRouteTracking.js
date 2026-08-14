// src/hooks/useRouteTracking.js
// Fires a GA4 `page_view` event on every route change.
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../utils/analytics';

export function useRouteTracking() {
  const location = useLocation();

  useEffect(() => {
    // page_view fires on every route change, capturing path + title.
    trackPageView(location.pathname, document.title);
  }, [location.pathname]);
}
