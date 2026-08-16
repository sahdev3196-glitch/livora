import React from 'react';
import { Link } from 'react-router-dom';
import { ROOM_CATEGORIES } from '../data/wallpapers';
import { ArrowRight } from 'lucide-react';

export default function ShopByRoom({ activeRoom }) {
  return (
    <section className="py-12 bg-[#faf8f5] border-b border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
              Shop Wallpapers By Room
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Find accent designs crafted specifically for each space in your home
            </p>
          </div>
        </div>

        {/* Room Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 sm:gap-6">
          {ROOM_CATEGORIES.map((room) => {
            const isSelected = activeRoom === room.id;
            return (
              <Link
                key={room.id}
                to={room.path}
                className={`group relative rounded-2xl overflow-hidden aspect-[4/5] text-left transition-all duration-300 ${
                  isSelected ? 'ring-4 ring-amber-700 shadow-xl scale-[1.02]' : 'hover:shadow-lg'
                }`}
              >
                <img
                  src={room.img}
                  alt={room.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                
                {/* Title */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white">
                  <span className="font-serif font-semibold text-sm sm:text-base tracking-wide">
                    {room.name}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
