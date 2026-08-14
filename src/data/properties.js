// src/data/properties.js
// Mock data for the three properties in the Suryagarh Collection.
// `slug` is used in the URL (/:slug); `hotelId` is the mock booking-engine ID.
export const properties = [
  {
    slug: 'suryagarh-jaisalmer',
    name: 'Suryagarh, Jaisalmer',
    hotelId: 48497,
    tagline: 'A fortress of the Thar Desert',
    shortDescription:
      'Suryagarh is a luxury hotel in Jaisalmer that captures the spirit of the desert — sandstone courtyards, starlit dunes, and regal Rajasthani hospitality.',
    heroImage:
      'https://images.unsplash.com/photo-1587585889396-6125a6ba3f30?auto=format&fit=crop&w=1400&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1602213680543-caxhaa5a3bb6?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1564501049152-01616868a89a?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=60',
    ],
  },
  {
    slug: 'narendra-bhawan',
    name: 'Narendra Bhawan, Bikaner',
    hotelId: 48498,
    tagline: 'The last residence of a modern maharaja',
    shortDescription:
      'Narendra Bhawan is an intimate palace hotel in Bikaner, layered with stories of Maharaja Narendra Singhji through art, design, and refined cuisine.',
    heroImage:
      'https://images.unsplash.com/photo-1542314843-a1b6bcb6a1b6?auto=format&fit=crop&w=1400&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a560097f7c1?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=900&q=60',
    ],
  },
  {
    slug: 'mary-budden-estate-binsar',
    name: 'Mary Budden Estate, Binsar',
    hotelId: 48499,
    tagline: 'A Himalayan hideaway above the clouds',
    shortDescription:
      'Mary Budden Estate is a tranquil Himalayan retreat in Binsar, set amidst cedar forests with sweeping views of the snow peaks of Nanda Devi.',
    heroImage:
      'https://images.unsplash.com/photo-1626621341517-bbf3d9990a6b?auto=format&fit=crop&w=1400&q=60',
    gallery: [
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1512389142860-9c449e58a543?auto=format&fit=crop&w=900&q=60',
      'https://images.unsplash.com/photo-1487730116645-74489c95b41b?auto=format&fit=crop&w=900&q=60',
    ],
  },
];

// Convenience lookup: slug -> property object.
export const propertyBySlug = properties.reduce((acc, p) => {
  acc[p.slug] = p;
  return acc;
}, {});
