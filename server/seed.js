import { db } from './database.js';

export const initialPaperTypes = [
  {
    id: 'non-woven-wallpaper',
    name: 'Non Woven Wallpaper',
    width: '59"',
    regularPrice: 40,
    embossedPrice: 72,
    pricePerSqFt: 40,
    hasEmbossed: true,
    isPopular: true,
    tag: 'Popular Choice',
    description: '100% Breathable smooth luxury non-woven substrate with eco-friendly organic ink.'
  },
  {
    id: 'hd-pvc-paper',
    name: 'HD PVC Paper',
    width: '59"',
    regularPrice: 40,
    embossedPrice: 72,
    pricePerSqFt: 40,
    hasEmbossed: true,
    isPopular: false,
    tag: 'High Definition',
    description: 'Durable high-definition PVC paper with sharp vibrant colors and easy-wipe maintenance.'
  },
  {
    id: 'non-tearable-feather',
    name: 'Non Tearable Paper (Feather)',
    width: '50"',
    regularPrice: 56,
    embossedPrice: 88,
    pricePerSqFt: 56,
    hasEmbossed: true,
    isPopular: false,
    tag: 'Tear-Proof Feather',
    description: 'Lightweight ultra-durable non-tearable synthetic substrate with refined feather elegance.'
  },
  {
    id: 'texture-canvas-paper',
    name: 'Texture Canvas Paper',
    width: '49"',
    regularPrice: 96,
    embossedPrice: 128,
    pricePerSqFt: 96,
    hasEmbossed: true,
    isPopular: true,
    tag: 'Fine Art Texture',
    description: 'Painterly fine-art canvas texture adding rich architectural depth and brushstroke feel.'
  },
  {
    id: 'sandstone-texture-paper',
    name: 'Sandstone Texture Paper',
    width: '49"',
    regularPrice: 96,
    embossedPrice: 128,
    pricePerSqFt: 96,
    hasEmbossed: true,
    isPopular: false,
    tag: 'Granular Stone Finish',
    description: 'Tactile sandstone stippled grain texture creating an earthy bespoke mural look.'
  },
  {
    id: 'texture-canvas-fabric-back',
    name: 'Texture Canvas Fabric Back',
    width: '54"',
    regularPrice: 96,
    embossedPrice: 128,
    pricePerSqFt: 96,
    hasEmbossed: true,
    isPopular: false,
    tag: 'Reinforced Fabric',
    description: 'Heavy-duty textured canvas with reinforced woven fabric backing for lifetime durability.'
  },
  {
    id: 'pure-canvas-fabric-jointless',
    name: 'Pure Canvas Fabric Jointless',
    width: '122"',
    regularPrice: 96,
    embossedPrice: 128,
    pricePerSqFt: 96,
    hasEmbossed: true,
    isPopular: true,
    tag: 'Jointless 122" Roll',
    description: 'Seamless continuous ultra-wide 122" fabric roll for single-sheet seamless luxury walls.'
  },
  {
    id: 'texture-self-adhesive-vinyl',
    name: 'Texture Self Adhesive Vinyl',
    width: '53"',
    regularPrice: 96,
    embossedPrice: 128,
    pricePerSqFt: 96,
    hasEmbossed: true,
    isPopular: false,
    tag: 'Peel & Stick Textured',
    description: 'Textured peel-and-stick self-adhesive vinyl for quick tool-free DIY wall transformation.'
  },
  {
    id: 'self-adhesive-vinyl',
    name: 'Self Adhesive Vinyl',
    width: '59"',
    regularPrice: 40,
    embossedPrice: 72,
    pricePerSqFt: 40,
    hasEmbossed: true,
    isPopular: false,
    tag: 'Peel & Stick DIY',
    description: 'Smooth self-adhesive vinyl with strong peel-and-stick backing for clean flat walls.'
  },
  {
    id: 'one-way-vision-vinyl',
    name: 'One Way Vision Vinyl',
    width: '59"',
    regularPrice: 48,
    embossedPrice: null,
    pricePerSqFt: 48,
    hasEmbossed: false,
    isPopular: false,
    tag: 'Perforated Vinyl',
    description: 'Micro-perforated one-way vision film designed for glass partitions and exterior windows.'
  },
  {
    id: 'gold-foil-on-non-woven',
    name: 'Gold Foil on Non Woven',
    width: '59"',
    regularPrice: 88,
    embossedPrice: null,
    pricePerSqFt: 88,
    hasEmbossed: false,
    isPopular: true,
    tag: 'Luxury Metallic Foil',
    description: 'Opulent gold foil metallic sheen on premium non-woven base for palace aesthetics.'
  }
];

export const initialProducts = [
  {
    id: 'p1',
    title: 'Divine Shrinathji Pichwai Lotus',
    code: 'LIV-PICH-01',
    startingPrice: 60,
    theme: 'Pichwai',
    room: 'Temple Room',
    rating: 4.9,
    reviewsCount: 128,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80',
    description: 'Traditional Indian Pichwai artwork featuring holy cows, lotus flowers, and gold leaf hand-painted accents.',
    badge: 'Trending Heritage'
  },
  {
    id: 'p2',
    title: 'Emerald Mist Tropical Canopy',
    code: 'LIV-TROP-02',
    startingPrice: 60,
    theme: 'Tropical',
    room: 'Living Room',
    rating: 4.8,
    reviewsCount: 94,
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=1200&q=80',
    description: 'Serene misty mountain silhouette wallpaper with golden sun highlights. As seen in trending customer home videos.',
    badge: 'As Seen on Reels'
  },
  {
    id: 'p5',
    title: 'Explorer World Map & Animals',
    code: 'LIV-KIDS-05',
    startingPrice: 60,
    theme: 'Kids Wallpapers',
    room: 'Kids Room',
    rating: 4.9,
    reviewsCount: 210,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
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
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&w=1200&q=80',
    roomMockup: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80',
    description: 'High-definition fluid liquid marble art with metallic gold leaf veins.',
    badge: 'Modern Luxury'
  }
];

export function seedDB() {
  if (db.getProducts().length === 0) {
    db.setProducts(initialProducts);
  }
  if (db.getPaperTypes().length === 0) {
    db.setPaperTypes(initialPaperTypes);
  }
}
