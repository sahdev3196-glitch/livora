import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, Compass, Sparkles, ArrowRight, PhoneCall, ShoppingBag, ArrowLeft, RefreshCw } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';
import { THEME_CATEGORIES, INITIAL_WALLPAPERS } from '../data/wallpapers';
import ProductCard from './ProductCard';

export default function NotFoundPage({ isProductNotFound = false, missingId = '' }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchInput, setSearchInput] = useState('');

  // Dynamic SEO title
  useEffect(() => {
    document.title = isProductNotFound 
      ? 'Wallpaper Design Not Found | LIVORA Studio' 
      : '404 — Page Not Found | LIVORA Custom Wallpapers';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [isProductNotFound]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/?search=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const popularThemes = THEME_CATEGORIES.filter(c => c.slug !== 'all').slice(0, 6);
  const bestsellers = INITIAL_WALLPAPERS.filter(p => p.badge === 'Bestseller' || p.rating >= 4.8).slice(0, 4);

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800 selection:bg-sky-500 selection:text-white">
      <Header />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
        
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-6">
          
          {/* Badge & Big 404 Art */}
          <div className="relative inline-flex flex-col items-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-900 text-xs font-bold uppercase tracking-widest shadow-2xs mb-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
              <span>{isProductNotFound ? 'Wallpaper Unavailable' : 'Error 404'}</span>
            </div>

            <h1 className="font-serif font-black text-7xl sm:text-9xl text-slate-900/10 select-none tracking-tighter absolute -top-8 left-1/2 -translate-x-1/2 pointer-events-none">
              404
            </h1>

            <h2 className="relative font-serif font-bold text-2xl sm:text-4xl text-slate-900 mt-2">
              {isProductNotFound 
                ? 'Wallpaper Design Not Found' 
                : 'Lost in the Wall Decor Gallery?'}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto font-normal">
            {isProductNotFound ? (
              <>
                The custom wallpaper design {missingId ? <code className="bg-slate-100 text-sky-900 px-1.5 py-0.5 rounded font-mono font-bold text-xs">{missingId}</code> : ''} could not be located. It might have been updated, renamed, or moved into another collection.
              </>
            ) : (
              <>
                The page at <code className="bg-slate-100 text-sky-900 px-1.5 py-0.5 rounded font-mono font-bold text-xs">{location.pathname}</code> doesn't exist or may have been rearranged in our latest collection refresh.
              </>
            )}
          </p>

          {/* Quick Interactive Search Bar */}
          <form onSubmit={handleSearchSubmit} className="max-w-md mx-auto pt-2">
            <div className="relative flex items-center shadow-md rounded-2xl overflow-hidden border-2 border-slate-200 focus-within:border-sky-500 transition bg-white">
              <Search className="w-4 h-4 text-slate-400 absolute left-4 pointer-events-none" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search Pichwai, Boho, Kids, Botanical..."
                className="w-full pl-11 pr-24 py-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none bg-transparent"
              />
              <button
                type="submit"
                className="absolute right-1.5 bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
              >
                Search
              </button>
            </div>
          </form>

          {/* Navigation Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold px-5 py-3 rounded-2xl shadow-md transition cursor-pointer active:scale-95"
            >
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>

            <Link
              to="/category/all"
              className="inline-flex items-center gap-2 bg-sky-50 hover:bg-sky-100 text-sky-900 border border-sky-200 text-xs font-bold px-5 py-3 rounded-2xl shadow-xs transition cursor-pointer active:scale-95"
            >
              <Compass className="w-4 h-4 text-sky-600" />
              <span>Explore All Wallpapers</span>
            </Link>

            <a
              href="https://wa.me/918005827701?text=Hi%20LIVORA,%20I%20need%20help%20finding%20a%20wallpaper%20design"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200 text-xs font-bold px-4 py-3 rounded-2xl shadow-xs transition cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Design Help</span>
            </a>
          </div>

        </div>

        {/* Featured Themes Grid */}
        <section className="mt-14 pt-10 border-t border-slate-200/80">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
            <div>
              <span className="text-[10px] font-extrabold text-sky-900 uppercase tracking-widest bg-sky-50 border border-sky-200/80 px-2.5 py-0.5 rounded-full">
                Curated Themes
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
                Browse Popular Wallpaper Categories
              </h3>
            </div>
            <Link to="/" className="text-xs font-bold text-sky-600 hover:text-sky-800 inline-flex items-center gap-1 group">
              <span>View Full Catalog</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {popularThemes.map((category) => (
              <Link
                key={category.id}
                to={category.path}
                className="group relative bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-sky-300 hover:shadow-lg transition-all duration-300 flex flex-col cursor-pointer"
              >
                <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 relative">
                  <img
                    src={category.img}
                    alt={category.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
                    }}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                  <span className="absolute bottom-2 left-2 right-2 text-white font-serif font-bold text-xs drop-shadow-sm truncate">
                    {category.name}
                  </span>
                </div>
                <div className="p-2 text-center bg-white">
                  <span className="text-[10px] font-bold text-sky-700 group-hover:text-sky-900 transition flex items-center justify-center gap-1">
                    <span>Explore</span>
                    <ArrowRight className="w-2.5 h-2.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular Bestseller Wallpapers */}
        {bestsellers.length > 0 && (
          <section className="mt-12 pt-10 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-2">
              <div>
                <span className="text-[10px] font-extrabold text-amber-900 uppercase tracking-widest bg-amber-50 border border-amber-200/80 px-2.5 py-0.5 rounded-full">
                  Loved by Homeowners
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
                  Top Trending Wallpapers
                </h3>
              </div>
              <span className="text-xs text-slate-500 font-medium">Starting at ₹120/sqft • Free Delivery</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {bestsellers.map((item) => (
                <div key={item.id} className="h-full">
                  <ProductCard product={item} compact={true} />
                </div>
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
    </div>
  );
}
