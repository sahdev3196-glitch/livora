import React from 'react';
import { Link } from 'react-router-dom';
import { THEME_CATEGORIES } from '../data/wallpapers';

export default function ShopByThemes({ activeTheme }) {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Left Aligned Clean Title */}
        <h2 className="text-3xl sm:text-4xl font-serif text-slate-900 mb-8">
          Shop By Themes
        </h2>

        {/* Circular Category Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-7 gap-4 sm:gap-6 items-start">
          {THEME_CATEGORIES.filter(t => t.id !== 'all').map((theme) => {
            const isSelected = activeTheme === theme.id;
            const hasImage = !!theme.img;
            
            return (
              <Link
                key={theme.id}
                to={theme.path}
                onClick={() => {
                  setTimeout(() => {
                    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }}
                className="flex flex-col items-center text-center group focus:outline-none cursor-pointer"
              >
                {/* Circular Image / Icon Container */}
                <div className={`w-24 h-24 sm:w-32 lg:w-36 sm:h-32 lg:h-36 rounded-full overflow-hidden transition-all duration-300 ${
                  isSelected 
                    ? 'ring-4 ring-sky-500 shadow-md scale-105' 
                    : 'group-hover:scale-105 group-hover:shadow-lg'
                }`}>
                  {hasImage ? (
                    <img
                      src={theme.img}
                      alt={theme.name}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => { e.target.src = `${import.meta.env.BASE_URL}crsl.webp`; }}
                      className="w-full h-full object-cover object-top scale-110 rounded-full group-hover:scale-125 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full flex flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-sky-100 via-sky-50 to-blue-100 group-hover:from-sky-200 group-hover:to-blue-200 transition-all duration-500">
                      <span className="text-3xl sm:text-4xl group-hover:scale-110 transition-transform duration-300">{theme.icon || '🎨'}</span>
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-widest text-sky-800/70">Explore</span>
                    </div>
                  )}
                </div>

                {/* Title Below Circle */}
                <span className={`mt-3 text-xs sm:text-sm font-medium transition ${
                  isSelected ? 'text-sky-900 font-bold' : 'text-slate-800 group-hover:text-sky-700'
                }`}>
                  {theme.name}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}

