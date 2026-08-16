import React, { useState } from 'react';
import { Heart, Star, Sparkles, Ruler, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted, setActiveCustomizerProduct } = useCart();
  const wishlisted = isWishlisted(product.id);
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-amber-900/10 hover:border-amber-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-900/10 flex flex-col justify-between">
      
      {/* Top Image Box */}
      <div 
        className="relative aspect-[4/3] bg-gradient-to-b from-amber-50/60 via-stone-50 to-amber-100/20 overflow-hidden cursor-pointer" 
        onClick={() => setActiveCustomizerProduct(product)}
      >
        <img
          src={product.image}
          alt={product.title}
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80';
          }}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
        />

        {/* Top Badges Bar */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
          {product.badge ? (
            <span className="bg-amber-700/90 backdrop-blur-md text-amber-50 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm flex items-center gap-1.5 border border-amber-500/30">
              <Sparkles className="w-3 h-3 text-amber-300 fill-amber-300" />
              {product.badge}
            </span>
          ) : (
            <div />
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`pointer-events-auto p-2.5 rounded-full backdrop-blur-md transition-all duration-300 shadow-md cursor-pointer ${
              wishlisted
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-500 hover:scale-110'
            }`}
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Hover Quick Customize Floating Bar */}
        <div className="absolute bottom-3 left-3 right-3 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-y-0 translate-y-1 flex justify-between items-center bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl text-xs font-bold text-amber-900 border border-amber-200/80 shadow-lg">
          <span className="flex items-center gap-1.5">
            <Ruler className="w-3.5 h-3.5 text-amber-700" />
            Custom Size Calculator
          </span>
          <ArrowUpRight className="w-4 h-4 text-amber-700 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Theme & Product Code */}
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 uppercase tracking-widest mb-1.5">
            <span className="bg-amber-50 border border-amber-200/60 px-2.5 py-0.5 rounded-md text-amber-900">
              {product.theme}
            </span>
            <span className="text-slate-400 font-mono text-[10px]">{product.code}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif font-bold text-lg text-slate-900 line-clamp-1 group-hover:text-amber-800 transition-colors duration-200">
            {product.title}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-normal leading-relaxed">
            {product.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/50 px-2 py-0.5 rounded-full text-xs font-bold text-amber-900">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Footer: Price Tag & Customize Action */}
        <div className="pt-4 border-t border-amber-900/10 flex items-center justify-between gap-3">
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Price per sq.ft</span>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-extrabold text-amber-950 font-serif">₹{product.startingPrice}</span>
              <span className="text-xs text-slate-500 font-medium">/ sqft</span>
            </div>
          </div>

          <button
            onClick={() => setActiveCustomizerProduct(product)}
            className="bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white text-xs font-bold px-4 py-2.5 rounded-2xl transition-all duration-300 flex items-center gap-1.5 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer"
          >
            <Ruler className="w-3.5 h-3.5 text-amber-200" />
            <span>Customize</span>
          </button>
        </div>

      </div>

    </div>
  );
}
