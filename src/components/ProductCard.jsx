import React, { useState } from 'react';
import { Heart, Star, Sparkles, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { toggleWishlist, isWishlisted, setActiveCustomizerProduct } = useCart();
  const wishlisted = isWishlisted(product.id);
  const [hasError, setHasError] = useState(false);

  if (hasError) return null;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-amber-900/10 hover:border-amber-700/30 transition-all duration-300 hover:shadow-xl flex flex-col">

      {/* Image Banner Container */}
      <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden cursor-pointer" onClick={() => setActiveCustomizerProduct(product)}>
        <img
          src={product.image}
          alt={product.title}
          onError={() => setHasError(true)}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
        />

        {/* Badge */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md text-amber-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {product.badge}
          </span>
        )}

        {/* Wishlist Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition shadow-md ${wishlisted
              ? 'bg-rose-500 text-white'
              : 'bg-white/80 text-slate-700 hover:bg-white hover:text-rose-500'
            }`}
          title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${wishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Room Mockup Quick Tag */}
        <div className="absolute bottom-3 left-3 right-3 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-center bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-800">
          <span>Tap to Customize</span>
          <Ruler className="w-3.5 h-3.5 text-amber-700" />
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
            <span>{product.theme}</span>
            <span className="text-amber-800 bg-amber-50 px-2 py-0.5 rounded">{product.code}</span>
          </div>

          <h3 className="font-serif font-bold text-base text-slate-900 line-clamp-1 group-hover:text-amber-800 transition">
            {product.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mt-1 font-light">
            {product.description}
          </p>

          <div className="flex items-center gap-1 mt-2 text-xs">
            <div className="flex items-center text-amber-500">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold text-slate-800 ml-1">{product.rating}</span>
            </div>
            <span className="text-slate-400">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Footer Price & Customize Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold block uppercase">Starts at</span>
            <span className="text-lg font-extrabold text-slate-950">
              ₹{product.startingPrice} <span className="text-xs font-semibold text-slate-500">/ sq.ft</span>
            </span>
          </div>

          <button
            onClick={() => setActiveCustomizerProduct(product)}
            className="bg-amber-700 hover:bg-amber-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 shadow-sm group-hover:shadow"
          >
            <Ruler className="w-3.5 h-3.5" />
            <span>Customize</span>
          </button>
        </div>

      </div>

    </div>
  );
}
