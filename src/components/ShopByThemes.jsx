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

        {/* 6 Circular Category Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8 items-start">
          {THEME_CATEGORIES.slice(0, 6).map((theme) => {
            const isSelected = activeTheme === theme.id;
            
            return (
              <Link
                key={theme.id}
                to={theme.path}
                className="flex flex-col items-center text-center group focus:outline-none cursor-pointer"
              >
                {/* Circular Image Container */}
                <div className={`w-24 h-24 sm:w-32 lg:w-36 sm:h-32 lg:h-36 rounded-full overflow-hidden transition-all duration-300 ${
                  isSelected 
                    ? 'ring-4 ring-amber-700 shadow-md scale-105' 
                    : 'group-hover:scale-105 group-hover:shadow-lg'
                }`}>
                  <img
                    src={theme.img}
                    alt={theme.name}
                    onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80'; }}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Title Below Circle */}
                <span className={`mt-3 text-xs sm:text-sm font-medium transition ${
                  isSelected ? 'text-amber-900 font-bold' : 'text-slate-800 group-hover:text-amber-800'
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
