// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { properties } from '../data/properties';

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[480px]">
        <img
          src="https://images.unsplash.com/photo-1542314843-a1b6bcb6a1b6?auto=format&fit=crop&w=1600&q=60"
          alt="Luxury hotel facade"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/50" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="font-serif text-4xl md:text-6xl tracking-wide">
            The Suryagarh Collection
          </h1>
          <p className="mt-4 max-w-xl text-sm md:text-base text-white/90 tracking-wide">
            Three extraordinary addresses across Rajasthan & the Himalayas —
            crafted for the discerning traveller.
          </p>
        </div>
      </section>

      {/* Our Collection */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="font-serif text-3xl text-center mb-12">Our Collection</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {properties.map((p) => (
            <Link
              key={p.slug}
              to={`/${p.slug}`}
              className="group block overflow-hidden rounded-md border border-charcoal/10 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="h-56 overflow-hidden">
                <img
                  src={p.heroImage}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5">
                <h3 className="font-serif text-xl">{p.name}</h3>
                <p className="text-xs uppercase tracking-widest text-gold mt-1">
                  {p.tagline}
                </p>
                <p className="text-sm text-charcoal/70 mt-3 line-clamp-3">
                  {p.shortDescription}
                </p>
                <span className="mt-4 inline-block text-xs uppercase tracking-widest border-b border-charcoal/40 group-hover:border-gold transition-colors">
                  Explore Property
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
