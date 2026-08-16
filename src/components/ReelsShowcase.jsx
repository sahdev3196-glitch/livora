import React from 'react';
import { Play } from 'lucide-react';
import { CUSTOMER_REELS } from '../data/wallpapers';

export default function ReelsShowcase() {
  return (
    <section className="py-6 sm:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Smooth 4 Cards Row matching Quirky Looks reference */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-5">
          {CUSTOMER_REELS.map((reel, index) => (
            <div
              key={reel.id || index}
              className="group relative rounded-2xl sm:rounded-3xl overflow-hidden aspect-[9/16] bg-slate-100 shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer"
            >
              <img
                src={reel.image}
                alt={reel.title || 'Wallpaper Transformation'}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=600&q=80';
                }}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />

              {/* Subtle Gradient at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

              {/* Card 1 POV Text Overlay */}
              {index === 0 && (
                <div className="absolute top-1/4 sm:top-1/3 left-0 right-0 px-3 sm:px-4 text-center">
                  <p className="text-white font-serif font-bold text-xs sm:text-sm drop-shadow-md tracking-wide">
                    "POV"
                  </p>
                  <p className="text-white font-serif text-[11px] sm:text-xs drop-shadow-md font-medium mt-0.5">
                    You brought the mountains HOME
                  </p>
                </div>
              )}

              {/* Bottom Brand Logo Watermark */}
              <div className="absolute bottom-4 left-0 right-0 flex justify-center items-center pointer-events-none">
                <span className="font-serif text-white/90 text-sm sm:text-base tracking-[0.25em] font-light drop-shadow-md">
                  LIVORA
                </span>
              </div>

              {/* Hover Play Button */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-slate-900 shadow-xl group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
