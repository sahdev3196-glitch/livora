import React, { useState, useEffect } from 'react';
import { INITIAL_WALLPAPERS } from '../data/wallpapers';
import { Sparkles } from 'lucide-react';

function SingleReelCard({ column, delayOffset = 0 }) {
  const images = column.images && column.images.length > 0 ? column.images : [`${import.meta.env.BASE_URL}crsl.webp`];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    let intervalId;
    // Initial staggered delay so cards change one after another sequentially
    const initialTimer = setTimeout(() => {
      // Trigger first cycle
      setPrevIndex(0);
      setCurrentIndex(1 % images.length);
      setIsTransitioning(true);

      // Recurring 3-second interval
      intervalId = setInterval(() => {
        setCurrentIndex(curr => {
          setPrevIndex(curr);
          setIsTransitioning(true);
          return (curr + 1) % images.length;
        });
      }, 3000);
    }, delayOffset);

    return () => {
      clearTimeout(initialTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [images.length, delayOffset]);

  const currentImg = images[currentIndex] || images[0];
  const prevImg = prevIndex !== null ? images[prevIndex] : null;

  return (
    <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] bg-slate-900 shadow-md hover:shadow-2xl transition-all duration-700 cursor-pointer border border-slate-200/80">
      
      {/* Previous Image Layer (for cross-dissolve) */}
      {prevImg && (
        <img
          src={prevImg}
          alt={column.title}
          onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}crsl.webp`; }}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}

      {/* Current Active Image with Smooth Ken-Burns Zoom & Fade */}
      <img
        key={currentIndex}
        src={currentImg}
        alt={column.title}
        onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}crsl.webp`; }}
        className="absolute inset-0 w-full h-full object-cover z-1 transition-all duration-1000 ease-in-out transform scale-100 group-hover:scale-108 animate-fade-in"
      />

      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/35 opacity-70 group-hover:opacity-85 transition-opacity z-10" />

      {/* Top Category Badge */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-20">
        <span className="bg-black/60 backdrop-blur-md text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full border border-white/20 shadow-xs">
          {column.tag}
        </span>
        <span className="text-[10px] text-white/90 font-mono bg-black/50 backdrop-blur-md px-2 py-0.5 rounded-full border border-white/10">
          {currentIndex + 1}/{images.length}
        </span>
      </div>

      {/* Bottom Content & Brand Overlay */}
      <div className="absolute bottom-4 left-3 right-3 text-center z-20 space-y-1">
        <p className="text-white font-serif font-bold text-xs sm:text-sm drop-shadow-md">
          {column.title}
        </p>
        <p className="text-white/80 text-[10px] sm:text-[11px] font-sans drop-shadow-sm font-medium">
          100% Made-to-Measure
        </p>
        <div className="pt-1.5 flex justify-center items-center">
          <span className="font-serif text-white/90 text-xs sm:text-sm tracking-[0.25em] font-light drop-shadow-md border-t border-white/30 pt-1 px-3">
            LIVORA
          </span>
        </div>
      </div>

      {/* 3-Second Smooth Animated Progress Line at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20 overflow-hidden">
        <div 
          key={currentIndex}
          className="h-full bg-sky-400"
          style={{
            animation: 'progress 3000ms linear infinite',
            width: '100%'
          }}
        />
      </div>

    </div>
  );
}

export default function ReelsShowcase() {
  // Group real products for each of the 4 showcase columns
  const pichwaiImages = INITIAL_WALLPAPERS.filter(p => p.theme === 'Pichwai').slice(0, 15).map(p => p.image);
  const bohoImages = INITIAL_WALLPAPERS.filter(p => p.theme === 'Boho Tales').slice(0, 15).map(p => p.image);
  const kidsImages = INITIAL_WALLPAPERS.filter(p => p.theme === 'Kids Wallpapers').slice(0, 15).map(p => p.image);
  const tropicalImages = INITIAL_WALLPAPERS.filter(p => p.theme === 'Tropical').slice(0, 15).map(p => p.image);

  const REEL_COLUMNS = [
    {
      id: 'reel-pichwai',
      title: 'Pichwai Heritage',
      tag: 'Sacred Art',
      images: pichwaiImages.length > 0 ? pichwaiImages : [`${import.meta.env.BASE_URL}crsl.webp`]
    },
    {
      id: 'reel-boho',
      title: 'Boho Minimalist',
      tag: 'Living Space',
      images: bohoImages.length > 0 ? bohoImages : [`${import.meta.env.BASE_URL}crsl.webp`]
    },
    {
      id: 'reel-kids',
      title: 'Kids Dreamy Tots',
      tag: 'Nursery & Kids',
      images: kidsImages.length > 0 ? kidsImages : [`${import.meta.env.BASE_URL}crsl.webp`]
    },
    {
      id: 'reel-tropical',
      title: 'Tropical Heaven',
      tag: 'Botanical Luxury',
      images: tropicalImages.length > 0 ? tropicalImages : [`${import.meta.env.BASE_URL}crsl.webp`]
    }
  ];

  return (
    <section className="py-4 sm:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* 4 Portrait Cards with staggered 3-second cascading transitions */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
          {REEL_COLUMNS.map((column, colIdx) => (
            <SingleReelCard
              key={column.id}
              column={column}
              delayOffset={colIdx * 750} // Staggered by 750ms each so they rotate one after another smoothly
            />
          ))}
        </div>

      </div>
    </section>
  );
}
