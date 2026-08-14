// src/components/Layout.jsx
import { Link, Outlet } from 'react-router-dom';
import { useRouteTracking } from '../hooks/useRouteTracking';

export default function Layout() {
  // Fires `page_view` on every route change (see hook).
  useRouteTracking();

  return (
    <div className="min-h-screen flex flex-col bg-white text-charcoal">
      <header className="border-b border-charcoal/10">
        <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 py-5">
          <Link to="/" className="font-serif text-xl tracking-wide">
            <span className="text-gold">Suryagarh</span> Collection
          </Link>
          <div className="hidden md:flex gap-8 text-sm tracking-widest uppercase">
            <Link to="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <Link
              to="/suryagarh-jaisalmer"
              className="hover:text-gold transition-colors"
            >
              Suryagarh
            </Link>
            <Link to="/narendra-bhawan" className="hover:text-gold transition-colors">
              Narendra Bhawan
            </Link>
            <Link
              to="/mary-budden-estate-binsar"
              className="hover:text-gold transition-colors"
            >
              Mary Budden
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-charcoal/10 py-8 text-center text-xs uppercase tracking-widest text-charcoal/50">
        © {new Date().getFullYear()} Suryagarh Collection — Demo for GA4 / GTM testing
      </footer>
    </div>
  );
}
