import React from 'react';
import { Play, Sparkles, Heart } from 'lucide-react';
import { CUSTOMER_REELS } from '../data/wallpapers';

export default function ReelsShowcase() {
  return (
    <section className="py-16 bg-[#f7f3ee] border-t border-amber-900/10 text-slate-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold uppercase tracking-widest border border-amber-300">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" /> Real Homes, Real Magic
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 mt-3">
            Customer Transformations on Reels
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 font-light">
            Watch real home wall makeovers styled by top interior architects across India
          </p>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CUSTOMER_REELS.map((reel) => (
            <div
              key={reel.id}
              className="group relative rounded-3xl overflow-hidden aspect-[9/16] bg-slate-900 border border-amber-900/10 hover:border-amber-500/50 transition-all duration-500 shadow-xl cursor-pointer"
            >
              <img
                src={reel.image}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-95 group-hover:opacity-100"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/20" />

              {/* Play Icon Badge */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/50 flex items-center justify-center text-white group-hover:scale-125 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-xl">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
              </div>

              {/* Views Tag Top */}
              <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-semibold text-amber-200 border border-white/20 flex items-center gap-1">
                <Heart className="w-3 h-3 text-rose-500 fill-current" />
                {reel.views}
              </div>

              {/* Bottom Caption */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3 className="font-serif font-bold text-sm leading-snug text-white group-hover:text-amber-300 transition">
                  {reel.title}
                </h3>
                <p className="text-[11px] text-slate-200/90 font-light mt-1">
                  {reel.tagline}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
