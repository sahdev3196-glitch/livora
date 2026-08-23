import React from 'react';
import { Link } from 'react-router-dom';
import { ROOM_CATEGORIES } from '../data/wallpapers';

export default function ShopByRoom({ activeRoom }) {
  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Left-Aligned Title */}
        <h2 className="text-2xl sm:text-3xl font-serif text-slate-900 mb-6">
          Shop Wallpapers By Room
        </h2>

        {/* 5 Non-Pointy Rounded Room Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {ROOM_CATEGORIES.map((room) => {
            const isSelected = activeRoom === room.id;
            return (
              <Link
                key={room.id}
                to={room.path}
                className="group flex flex-col items-center text-center cursor-pointer focus:outline-none"
              >
                {/* Image Container with Smooth Non-Pointy Rounded Corners */}
                <div className={`w-full aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden bg-slate-100 transition-all duration-300 ${
                  isSelected
                    ? 'ring-3 ring-sky-500 shadow-md scale-[1.02]'
                    : 'shadow-xs group-hover:shadow-md group-hover:scale-[1.02]'
                }`}>
                  <img
                    src={room.img}
                    alt={room.name}
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                </div>
                
                {/* Room Title Below Card */}
                <span className={`mt-3 text-xs sm:text-sm font-medium transition ${
                  isSelected ? 'text-sky-900 font-bold' : 'text-slate-800 group-hover:text-sky-700'
                }`}>
                  {room.name}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
