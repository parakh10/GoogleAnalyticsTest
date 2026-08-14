// src/pages/Property.jsx
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { propertyBySlug, properties } from '../data/properties';
import { trackViewItem } from '../utils/analytics';
import ReservationBar from '../components/ReservationBar';

export default function Property() {
  const { slug } = useParams();
  const property = propertyBySlug[slug];

  // Keep the document title in sync (also used by the `page_view` event).
  useEffect(() => {
    if (property) {
      document.title = `${property.name} — Suryagarh Collection`;
    }
  }, [property]);

  // 🔔 Analytics: fire `view_item` when a user lands on a property page.
  useEffect(() => {
    if (property) {
      trackViewItem(property);
    }
  }, [property]);

  if (!property) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-3xl">Property not found</h1>
        <p className="mt-4 text-charcoal/60">
          The property “{slug}” does not exist in the collection.
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[60vh] min-h-[420px]">
        <img
          src={property.heroImage}
          alt={property.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/45" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
          <h1 className="font-serif text-4xl md:text-5xl">{property.name}</h1>
          <p className="mt-3 text-sm md:text-base text-white/90 tracking-wide uppercase">
            {property.tagline}
          </p>
        </div>
      </section>

      {/* Description + reservation bar */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-2xl mb-4">An Address of Distinction</h2>
            <p className="text-charcoal/80 leading-relaxed">{property.shortDescription}</p>
            <p className="text-charcoal/70 leading-relaxed mt-4">
              Surrounded by evocative landscapes, {property.name} offers an
              immersive stay that blends regional craft, cuisine, and
              hospitality. Every detail is curated to evoke a sense of place —
              a singular experience unique to this corner of India.
            </p>
          </div>
          <div className="lg:col-span-1 flex flex-col items-center lg:items-start">
            <h3 className="font-serif text-lg mb-4 text-center lg:text-left">
              Reserve Your Stay
            </h3>
            <ReservationBar property={property} mode="button" />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <h2 className="font-serif text-2xl mb-6">Gallery</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {property.gallery.map((src, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-md border border-charcoal/10"
            >
              <img
                src={src}
                alt={`${property.name} ${i + 1}`}
                className="w-full h-44 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
