import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    id: 1,
    title: 'Enhanced Tropical Dining Room',
    image: '/Enhanced Tropical Dining Room.webp'
  },
  {
    id: 2,
    title: 'Pichwai & Chinoiserie Heritage',
    image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85'
  },
  {
    id: 3,
    title: 'Emerald Mist Tropical Canopy',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=2000&q=85'
  },
  {
    id: 4,
    title: 'Golden Horizon Mountains & Fog',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=2000&q=85'
  },
  {
    id: 5,
    title: 'Royal Palace Architecture',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=2000&q=85'
  },
  {
    id: 6,
    title: 'Explorer World Map & Animals',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2000&q=85'
  }
];

export default function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % HERO_SLIDES.length);
  };

  return (
    <section className="relative w-full h-[65vh] sm:h-[85vh] bg-[#faf8f5] overflow-hidden group">

      {/* Carousel Image Items */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
          }`}
        >
          <img
            src={slide.image}
            alt={slide.title}
            className="w-full h-full object-cover object-center transform scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
        </div>
      ))}

      {/* Manual Navigation Controls (Light Glassmorphic Arrows) */}
      <button
        onClick={goToPrev}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-white/80 hover:bg-white text-slate-800 hover:text-amber-900 backdrop-blur-md transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 shadow-xl border border-amber-900/10 cursor-pointer"
        title="Previous Wallpaper"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 sm:p-3.5 rounded-full bg-white/80 hover:bg-white text-slate-800 hover:text-amber-900 backdrop-blur-md transition-all opacity-80 sm:opacity-0 group-hover:opacity-100 shadow-xl border border-amber-900/10 cursor-pointer"
        title="Next Wallpaper"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Slide Indicators Bar (Light Glass Theme) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 bg-white/85 backdrop-blur-md px-4 py-2 rounded-full border border-amber-900/10 shadow-lg">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              idx === currentIndex ? 'w-8 bg-amber-700' : 'w-2 bg-amber-900/30 hover:bg-amber-800'
            }`}
            title={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>

    </section>
  );
}
