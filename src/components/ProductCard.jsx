import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Sparkles, Ruler, ArrowUpRight } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product, compact = false }) {
  const { toggleWishlist, isWishlisted } = useCart();
  const wishlisted = isWishlisted(product.id);
  const navigate = useNavigate();
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  return (
    <div 
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-sky-300 transition-all duration-300 hover:shadow-xl flex flex-col justify-between cursor-pointer relative h-full"
      onClick={() => navigate(`/product/${product.id}`)}
    >
      
      {/* Top Image Container (Sleek 4:5 Portrait Ratio) */}
      <div className="relative aspect-[4/5] bg-slate-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
          }}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Soft Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5 opacity-50 group-hover:opacity-70 transition-opacity" />

        {/* Top Badges Row */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-10">
          {product.badge ? (
            <span className={`bg-white/95 backdrop-blur-md text-sky-900 font-extrabold rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1 border border-sky-200/80 ${
              compact ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-0.5'
            }`}>
              <Sparkles className={`${compact ? 'w-2.5 h-2.5' : 'w-3 h-3'} text-sky-500 fill-sky-500`} />
              {product.badge}
            </span>
          ) : (
            <span className={`bg-white/90 backdrop-blur-md text-slate-700 font-bold rounded-full uppercase tracking-wider shadow-xs border border-slate-200/60 ${
              compact ? 'text-[9px] px-2 py-0.5' : 'text-[10px] px-2.5 py-0.5'
            }`}>
              {product.theme}
            </span>
          )}

          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`rounded-full backdrop-blur-md transition-all duration-300 shadow-xs cursor-pointer ${
              compact ? 'p-1.5' : 'p-2'
            } ${
              wishlisted
                ? 'bg-rose-500 text-white scale-110'
                : 'bg-white/90 text-slate-600 hover:bg-white hover:text-rose-600 hover:scale-110'
            }`}
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} ${wishlisted ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Quick Size Calculator Bar on Hover */}
        <div className={`absolute bottom-2 left-2 right-2 bg-white/95 backdrop-blur-md border border-slate-200/80 rounded-xl text-slate-800 shadow-sm flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 ${
          compact ? 'px-2 py-1 text-[10px] font-bold' : 'px-3 py-1.5 text-[11px] font-bold'
        }`}>
          <span className="flex items-center gap-1 text-sky-800">
            <Ruler className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-sky-600`} />
            <span>Customize</span>
          </span>
          <ArrowUpRight className={`${compact ? 'w-3 h-3' : 'w-4 h-4'} text-slate-600`} />
        </div>
      </div>

      {/* Content Section */}
      <div className={`flex-1 flex flex-col justify-between ${compact ? 'p-2.5 space-y-2' : 'p-3.5 space-y-2.5'}`}>
        <div>
          {/* Category & Product Code */}
          <div className="flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">
            <span className="truncate max-w-[60%]">{product.theme}</span>
            <span>{product.code}</span>
          </div>

          {/* Title (Strictly 1 line) */}
          <h3 className={`font-serif font-bold text-slate-900 truncate group-hover:text-sky-700 transition-colors mt-0.5 ${
            compact ? 'text-xs' : 'text-sm'
          }`} title={product.title}>
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1 text-[10px] sm:text-[11px]">
            <div className="flex items-center gap-0.5 text-amber-600 font-bold bg-amber-50/80 border border-amber-200/60 px-1.5 py-0.5 rounded-full">
              <Star className="w-2.5 h-2.5 text-amber-500 fill-amber-500" />
              <span>{product.rating}</span>
            </div>
            <span className="text-slate-400 font-medium">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-1.5">
          <div>
            <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block leading-none">Starting at</span>
            <div className="flex items-baseline gap-0.5 mt-0.5">
              <span className={`font-serif font-extrabold text-slate-900 ${compact ? 'text-sm' : 'text-base'}`}>₹{product.startingPrice === 60 ? 40 : (product.startingPrice || 40)}</span>
              <span className="text-[9px] text-slate-500 font-medium">/sqft</span>
            </div>
          </div>

          <Link
            to={`/product/${product.id}`}
            onClick={(e) => e.stopPropagation()}
            className={`bg-sky-500 hover:bg-sky-600 text-white font-bold transition shadow-xs shadow-sky-500/20 flex items-center gap-1 cursor-pointer shrink-0 ${
              compact ? 'px-2.5 py-1 rounded-lg text-[10px]' : 'px-3.5 py-2 rounded-xl text-xs'
            }`}
          >
            <Ruler className={`${compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} text-sky-100`} />
            <span>Customize</span>
          </Link>
        </div>

      </div>

    </div>
  );
}
