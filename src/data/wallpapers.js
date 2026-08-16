export const PAPER_OPTIONS = [
  {
    id: 'eco-matte',
    name: 'Non-Woven Eco Matte',
    pricePerSqFt: 60,
    isPopular: true,
    tag: 'Starting at ₹60/sqft',
    description: '100% Breathable, smooth luxury matte finish with eco-certified organic ink.'
  },
  {
    id: 'canvas-textured',
    name: 'Canvas Textured Premium',
    pricePerSqFt: 80,
    isPopular: false,
    tag: 'Best Seller',
    description: 'Painterly fine-art canvas texture adding rich architectural depth.'
  },
  {
    id: 'royal-silk',
    name: 'Royal Silk Satin Finish',
    pricePerSqFt: 95,
    isPopular: true,
    tag: 'Luxury Sheen',
    description: 'Subtle pearlescent silk gloss for vibrant colors and palace grandeur.'
  },
  {
    id: 'seamless-vinyl',
    name: 'Seamless Heavy-Duty Vinyl',
    pricePerSqFt: 110,
    isPopular: false,
    tag: '100% Washable',
    description: 'Jointless single-sheet roll. Water-resistant and ultra-durable.'
  },
  {
    id: 'peel-stick',
    name: 'Peel & Stick Self Adhesive',
    pricePerSqFt: 125,
    isPopular: false,
    tag: 'Easy DIY',
    description: 'No glue required. Easy peel-and-stick application for instant transformation.'
  }
];

const PICHWAI_PAGES_COUNT = 30;

const PICHWAI_FOLDER_WALLPAPERS = Array.from({ length: PICHWAI_PAGES_COUNT }, (_, i) => {
  const pageNum = i + 2; // Pichwai Collection files start at page-0002
  const num = String(pageNum).padStart(4, '0');
  const codeNum = String(i + 1).padStart(2, '0');
  const fileName = `Pichwai Collection_page-${num}.jpg`;
  const staticPath = `${import.meta.env.BASE_URL}pichwai/${encodeURIComponent(fileName)}`;
  
  const titles = [
    'Shrinathji Lotus Shrine Pichwai',
    'Golden Cow & Temple Pavilion',
    'Divine Vrindavan Cows & Trees',
    'Mughal Arch Pichwai Mural',
    'Royal Sacred Cow Heritage Art',
    'Peacock & Kadamba Tree Pichwai',
    'Traditional Gold Leaf Temple Art',
    'Jaipur Royal Palace Pichwai'
  ];
  
  const titleName = `${titles[i % titles.length]} - Design ${codeNum}`;

  return {
    id: `pichwai-coll-${i + 1}`,
    title: titleName,
    code: `LIV-PICH-${codeNum}`,
    startingPrice: 60,
    theme: 'Pichwai',
    room: 'Temple Room',
    rating: parseFloat((4.7 + (i % 4) * 0.1).toFixed(1)),
    reviewsCount: 75 + i * 5,
    image: staticPath,
    roomMockup: staticPath,
    description: `Authentic handcrafted Indian Pichwai wallpaper mural artwork featuring holy cows, lotus motifs, and traditional temple designs. Made-to-measure for your wall size.`,
    badge: i % 3 === 0 ? 'Pichwai Bestseller' : i % 5 === 0 ? 'Trending Heritage' : 'Exclusive Collection'
  };
});

export const THEME_CATEGORIES = [
  { id: 'all', name: 'Shop All', icon: '🎨', path: '/' },
  { id: 'Pichwai', name: 'Pichwai', slug: 'pichwai', path: '/category/pichwai', img: `${import.meta.env.BASE_URL}pichwai/${encodeURIComponent('Pichwai Collection_page-0002.jpg')}` },
  { id: 'Tropical', name: 'Tropical', slug: 'tropical', path: '/category/tropical', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=300&q=80' },
  { id: 'Indian Royal', name: 'Indian Royal', slug: 'indian-royal', path: '/category/indian-royal', img: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=300&q=80' },
  { id: 'Chinoiserie', name: 'Chinoiserie', slug: 'chinoiserie', path: '/category/chinoiserie', img: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=300&q=80' },
  { id: 'Wings & Petals', name: 'Wings & Petals', slug: 'wings-petals', path: '/category/wings-petals', img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=300&q=80' },
  { id: 'Kids Wallpapers', name: 'Kids Wallpapers', slug: 'kids-wallpapers', path: '/category/kids-wallpapers', img: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=300&q=80' }
];

export const ROOM_CATEGORIES = [
  { id: 'Temple Room', name: 'Temple Room', slug: 'temple-room', path: '/room/temple-room', img: `${import.meta.env.BASE_URL}pichwai/${encodeURIComponent('Pichwai Collection_page-0002.jpg')}` },
  { id: 'Living Room', name: 'Living Room', slug: 'living-room', path: '/room/living-room', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80' },
  { id: 'Bed Room', name: 'Bed Room', slug: 'bed-room', path: '/room/bed-room', img: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80' },
  { id: 'Kids Room', name: 'Kids Room', slug: 'kids-room', path: '/room/kids-room', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80' },
  { id: 'Dining Area', name: 'Dining Area', slug: 'dining-area', path: '/room/dining-area', img: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80' }
];

export function getThemeFromSlug(slug) {
  if (!slug || slug === 'all') return 'all';
  const found = THEME_CATEGORIES.find(t => t.slug === slug.toLowerCase() || t.id.toLowerCase() === slug.toLowerCase());
  if (found) return found.id;
  if (slug === 'wings-and-petals') return 'Wings & Petals';
  return 'all';
}

export function getRoomFromSlug(slug) {
  if (!slug) return 'all';
  const found = ROOM_CATEGORIES.find(r => r.slug === slug.toLowerCase() || r.id.toLowerCase() === slug.toLowerCase());
  if (found) return found.id;
  if (slug === 'bedroom') return 'Bed Room';
  return 'all';
}

export const INITIAL_WALLPAPERS = [
  ...PICHWAI_FOLDER_WALLPAPERS,
  {
    id: 'p2',
    title: 'Emerald Mist Tropical Canopy',
    code: 'LIV-TROP-02',
    startingPrice: 60,
    theme: 'Tropical',
    room: 'Living Room',
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
    description: 'Lush banana leaves, exotic birds, and soft atmospheric mist for a tranquil living space.',
    badge: 'Bestseller'
  },
  {
    id: 'p3',
    title: 'Royal Jaipur Garden Chinoiserie',
    code: 'LIV-ROYAL-03',
    startingPrice: 60,
    theme: 'Chinoiserie',
    room: 'Dining Area',
    rating: 5.0,
    reviewsCount: 156,
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1000&q=80',
    description: 'Classical Royal Mughal & Chinoiserie fusion with peafowls, arched corridors, and botanical flora.',
    badge: 'Designer Choice'
  },
  {
    id: 'p4',
    title: 'Golden Horizon Mountains & Fog',
    code: 'LIV-WNG-04',
    startingPrice: 60,
    theme: 'Wings & Petals',
    room: 'Bed Room',
    rating: 4.9,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1000&q=80',
    description: 'Serene misty mountain silhouette wallpaper with golden sun highlights.',
    badge: 'As Seen on Reels'
  },
  {
    id: 'p5',
    title: 'Explorer World Map & Safari',
    code: 'LIV-KIDS-05',
    startingPrice: 60,
    theme: 'Kids Wallpapers',
    room: 'Kids Room',
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1000&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1000&q=80',
    description: 'Playful illustrated world map with hot air balloons, whales, and cute land animals in soothing pastel tones.',
    badge: 'Kids Favorite'
  },
  {
    id: 'p6',
    title: 'Calacatta Gold Fluid Marble',
    code: 'LIV-MRB-06',
    startingPrice: 60,
    theme: 'Indian Royal',
    room: 'Living Room',
    rating: 4.7,
    reviewsCount: 64,
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1000&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
    description: 'High-definition fluid liquid marble art with metallic gold leaf veins.',
    badge: 'Modern Luxury'
  }
];

export const CUSTOMER_REELS = [
  {
    id: 'r1',
    title: '"POV: You brought the mountains HOME"',
    tagline: 'Bedroom Makeover with LIVORA',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80',
    views: '145K views'
  },
  {
    id: 'r2',
    title: 'Pichwai Temple Wall Transformation',
    tagline: 'Customized for 12ft x 9ft Wall',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80',
    views: '230K views'
  },
  {
    id: 'r3',
    title: 'Living Room Tropical Vibe @ ₹60/sqft',
    tagline: 'Non-Woven Eco Matte Paper',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
    views: '98K views'
  },
  {
    id: 'r4',
    title: 'Kids World Map Room Makeover',
    tagline: 'Seamless Vinyl Roll Install',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    views: '310K views'
  }
];
