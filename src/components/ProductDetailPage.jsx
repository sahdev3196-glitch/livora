import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Heart, Star, Sparkles, Ruler, ChevronRight, ChevronLeft, ChevronDown, ArrowLeft, Check, ShieldCheck, Truck, Award, ShoppingBag, Info } from 'lucide-react';
import { PAPER_OPTIONS, INITIAL_WALLPAPERS } from '../data/wallpapers';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import ProductCard from './ProductCard';
import Header from './Header';
import Footer from './Footer';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const { user } = useAuth();
  const scrollRef = useRef(null);

  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [unit, setUnit] = useState('Inches');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [selectedPaper, setSelectedPaper] = useState(PAPER_OPTIONS[0]);
  const [isEmbossed, setIsEmbossed] = useState(false);
  const [isGoldFoil, setIsGoldFoil] = useState(false);

  // Sync checkboxes if paper option changes
  useEffect(() => {
    if (!selectedPaper?.hasEmbossed) {
      setIsEmbossed(false);
    }
    if (selectedPaper?.id === 'gold-foil-on-non-woven') {
      setIsGoldFoil(true);
    }
  }, [selectedPaper]);

  useEffect(() => {
    // Find product from initial catalog or fetch API
    const found = INITIAL_WALLPAPERS.find(p => p.id === productId || p.code === productId);
    if (found) {
      setProduct(found);
      setActiveImage(found.roomMockup || found.image);
    } else {
      const apiUrl = import.meta.env.VITE_API_URL;
      if (apiUrl) {
        fetch(`${apiUrl}/api/products`)
          .then(res => res.json())
          .then(data => {
            if (data.products) {
              const apiFound = data.products.find(p => p.id === productId || p.code === productId);
              if (apiFound) {
                setProduct(apiFound);
                setActiveImage(apiFound.roomMockup || apiFound.image);
              }
            }
          })
          .catch(() => {});
      }
    }
  }, [productId]);

  // Scroll to top & set dynamic product SEO title
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (product) {
      document.title = `${product.title} — Custom Wallpaper starting at ₹40/sqft | LIVORA`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', `Customize ${product.title} made-to-measure wallpaper mural for your walls. ${product.theme} collection, starting at ₹40/sqft. Pan-India delivery.`);
      }
    }
  }, [productId, product]);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mb-4">
            <Info className="w-8 h-8" />
          </div>
          <h2 className="font-serif font-bold text-xl text-slate-900">Product Not Found</h2>
          <p className="text-xs text-slate-500 mt-1 max-w-sm">The requested custom wallpaper design could not be found or has been moved.</p>
          <Link to="/" className="mt-4 inline-flex items-center gap-2 bg-sky-500 text-white text-xs font-bold px-6 py-3 rounded-xl hover:bg-sky-600 transition shadow-md shadow-sky-500/20">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Wallpaper Collection</span>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const wishlisted = wishlist.some(item => item.id === product.id);

  // Dimension numeric parsing
  const wNum = parseFloat(width) || 0;
  const hNum = parseFloat(height) || 0;

  // Calculate Total Square Feet
  let totalSqFt = 0;
  if (wNum > 0 && hNum > 0) {
    if (unit === 'Inches') {
      totalSqFt = (wNum * hNum) / 144;
    } else {
      totalSqFt = (wNum * hNum) / 929.0304;
    }
  }

  // Rounded Sq Ft (2 decimal places)
  const roundedSqFt = Math.round(totalSqFt * 100) / 100;
  const hasDimensions = wNum > 0 && hNum > 0;
  
  // Minimum billing of 12 sq. ft.
  const billableSqFt = hasDimensions ? Math.max(12, roundedSqFt) : 0;
  const isMinBillApplied = hasDimensions && roundedSqFt < 12;

  // Current effective rate per sq ft based on paper selection + enhancements
  const baseRate = selectedPaper ? selectedPaper.regularPrice : 40;
  const embossRate = (isEmbossed && selectedPaper?.hasEmbossed) ? 32 : 0;
  const foilRate = (isGoldFoil && selectedPaper?.id !== 'gold-foil-on-non-woven') ? 48 : 0;
  const currentPricePerSqFt = baseRate + embossRate + foilRate;

  // Selected Finish Display Label
  const finishLabels = [];
  if (isEmbossed && selectedPaper?.hasEmbossed) finishLabels.push('Embossed 3D');
  if (isGoldFoil) finishLabels.push('Golden Foil');
  const selectedFinishText = finishLabels.length > 0 ? finishLabels.join(' + ') : 'Regular Print';

  // Calculate Total Price based on billable sq ft (Min 12 sq.ft.)
  const totalCost = Math.round(billableSqFt * currentPricePerSqFt);

  const handleAddToCart = () => {
    if (!hasDimensions) return;
    if (!user) {
      navigate(`/login?redirect=${encodeURIComponent(`/product/${product.id}`)}`);
      return;
    }
    addToCart(product, {
      widthFt: `${wNum} ${unit}`,
      heightFt: `${hNum} ${unit}`,
      totalSqFt: roundedSqFt,
      billableSqFt: billableSqFt,
      isMinBillApplied: isMinBillApplied,
      paperOption: {
        ...selectedPaper,
        isEmbossed: Boolean(isEmbossed && selectedPaper?.hasEmbossed),
        isGoldFoil: Boolean(isGoldFoil),
        selectedFinish: selectedFinishText,
        pricePerSqFt: currentPricePerSqFt,
        name: selectedPaper.name
      },
      itemTotal: totalCost
    });
    navigate('/cart');
  };

  const thumbnails = Array.from(new Set([
    product.roomMockup,
    product.image
  ].filter(Boolean)));

  // Related Products Filtering (Same theme or room, excluding current item)
  const sameCategoryProducts = INITIAL_WALLPAPERS.filter(p => p.id !== product.id && (p.theme === product.theme || p.room === product.room));
  const otherProducts = INITIAL_WALLPAPERS.filter(p => p.id !== product.id && !sameCategoryProducts.some(sp => sp.id === p.id));
  const relatedProducts = [...sameCategoryProducts, ...otherProducts].slice(0, 10);

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800">
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-sky-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to={`/category/${product.theme.toLowerCase()}`} className="hover:text-sky-700 transition">{product.theme}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-900 font-bold truncate max-w-xs">{product.title}</span>
        </nav>

        {/* Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Mockup & Gallery (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Main Preview Box - Fully visible without cropping */}
            <div className="relative rounded-3xl overflow-hidden bg-slate-50/50 border border-slate-200/80 shadow-xs flex items-center justify-center p-2 sm:p-4 min-h-[360px] sm:min-h-[480px] max-h-[580px] group">
              <img
                src={activeImage}
                alt={product.title}
                onError={(e) => {
                  e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
                }}
                className="w-full h-auto max-h-[540px] object-contain rounded-2xl transition-all duration-300 drop-shadow-sm"
              />

              {/* Wishlist Button Overlay */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`absolute top-5 right-5 p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-md cursor-pointer ${
                  wishlisted
                    ? 'bg-rose-500 text-white scale-110'
                    : 'bg-white/90 text-slate-700 hover:bg-white hover:text-rose-600 hover:scale-110'
                }`}
                title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart className={`w-5 h-5 ${wishlisted ? 'fill-current' : ''}`} />
              </button>

              {/* Badge */}
              {product.badge && (
                <span className="absolute top-5 left-5 bg-white/95 backdrop-blur-md text-sky-900 text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs flex items-center gap-1.5 border border-sky-200/80">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500 fill-sky-500" />
                  {product.badge}
                </span>
              )}
            </div>

            {/* Gallery Thumbnails (Only rendered when multiple distinct images exist) */}
            {thumbnails.length > 1 && (
              <div className="flex items-center gap-3">
                {thumbnails.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(imgUrl)}
                    className={`w-24 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImage === imgUrl ? 'border-sky-500 ring-2 ring-sky-500/20 shadow-sm' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      onError={(e) => {
                        e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
                      }}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Feature Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                  <Award className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Eco Latex Inks</h4>
                  <p className="text-[10px] text-slate-500">Non-toxic, odor-free print</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                  <Truck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">PAN India Delivery</h4>
                  <p className="text-[10px] text-slate-500">Express doorstep delivery</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-3.5 border border-slate-200/80 shadow-xs flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                  <ShieldCheck className="w-4.5 h-4.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Non-Fade Guarantee</h4>
                  <p className="text-[10px] text-slate-500">10+ Year Vibrant Color</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Customizer & Details (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
            
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                <span className="bg-sky-50 text-sky-900 border border-sky-200/80 px-2.5 py-0.5 rounded-full font-sans font-semibold">
                  {product.theme}
                </span>
                <span>{product.code}</span>
              </div>

              <h1 className="font-serif font-bold text-2xl sm:text-3xl text-slate-900 mt-2">
                {product.title}
              </h1>

              <div className="flex items-center gap-3 mt-3">
                <div className="flex items-center gap-1 bg-amber-50 border border-amber-200/60 px-2.5 py-1 rounded-full text-xs font-bold text-amber-900">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-slate-500 font-medium">({product.reviewsCount} Customer Reviews)</span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-3 border-t border-slate-100 pt-3">
                {product.description || 'Luxury made-to-measure wallpaper mural. Printed with eco-friendly inks on non-woven texture paper.'}
              </p>
            </div>

            {/* Step 1: Paper Quality Select Dropdown */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label htmlFor="paper-select" className="text-xs font-bold text-slate-900 block">
                  1. Select Paper Quality
                </label>
                <span className="text-[10px] font-semibold text-sky-800 bg-sky-50 border border-sky-200/80 px-2 py-0.5 rounded-full">
                  Roll Width: {selectedPaper.width}
                </span>
              </div>

              {/* Styled Select Dropdown */}
              <div className="relative">
                <select
                  id="paper-select"
                  value={selectedPaper.id}
                  onChange={(e) => {
                    const found = PAPER_OPTIONS.find(p => p.id === e.target.value);
                    if (found) {
                      setSelectedPaper(found);
                      if (!found.hasEmbossed) setIsEmbossed(false);
                      if (found.id === 'gold-foil-on-non-woven') setIsGoldFoil(true);
                    }
                  }}
                  className="w-full bg-white border-2 border-slate-200 hover:border-sky-300 focus:border-sky-500 rounded-2xl px-4 py-3.5 text-xs sm:text-sm font-bold text-slate-900 shadow-xs appearance-none focus:outline-none focus:ring-2 focus:ring-sky-500/20 cursor-pointer pr-10 transition-colors"
                >
                  {PAPER_OPTIONS.map((paper, idx) => (
                    <option key={paper.id} value={paper.id}>
                      {String(idx + 1).padStart(2, '0')}. {paper.name} ({paper.width}) — ₹{paper.regularPrice}/sqft
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Selected Paper Details Mini-Card */}
              <div className="bg-slate-50/80 border border-slate-200/80 rounded-2xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="font-bold text-slate-900">{selectedPaper.name}</span>
                    {selectedPaper.tag && (
                      <span className="text-[9px] font-extrabold text-sky-900 bg-sky-100/80 px-2 py-0.2 rounded-full border border-sky-200">
                        {selectedPaper.tag}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] text-slate-500">{selectedPaper.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-400 font-medium block">Base Regular Price</span>
                  <span className="text-xs sm:text-sm font-extrabold font-mono text-slate-900">
                    ₹{selectedPaper.regularPrice}<span className="text-[10px] font-normal text-slate-500">/sqft</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Step 2: Enhancements Checkboxes (Emboss & Golden Foil) */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900 block">
                  2. Select Enhancements & Finishes (Optional)
                </label>
                <span className="text-[10px] text-slate-400 font-medium">Customize your print effect</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Emboss Checkbox */}
                <label
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 select-none ${
                    !selectedPaper.hasEmbossed
                      ? 'border-slate-200 bg-slate-50/50 opacity-60 cursor-not-allowed'
                      : isEmbossed
                        ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20 shadow-xs cursor-pointer'
                        : 'border-slate-200 hover:border-sky-300 bg-white cursor-pointer'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={Boolean(isEmbossed && selectedPaper.hasEmbossed)}
                    disabled={!selectedPaper.hasEmbossed}
                    onChange={(e) => setIsEmbossed(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isEmbossed && selectedPaper.hasEmbossed
                      ? 'border-sky-500 bg-sky-500 text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isEmbossed && selectedPaper.hasEmbossed && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900">Embossed 3D</span>
                      <span className="text-[10px] font-extrabold font-mono text-sky-900 bg-sky-100/70 border border-sky-200/80 px-1.5 py-0.2 rounded">
                        +₹32/sqft
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                      {selectedPaper.hasEmbossed 
                        ? 'Tactile raised 3D texture on key artwork motifs' 
                        : 'Not available for this substrate'}
                    </p>
                  </div>
                </label>

                {/* Golden Foil Checkbox */}
                <label
                  className={`p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 select-none cursor-pointer ${
                    isGoldFoil
                      ? 'border-amber-500 bg-amber-50/60 ring-2 ring-amber-500/20 shadow-xs'
                      : 'border-slate-200 hover:border-amber-300 bg-white'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isGoldFoil}
                    onChange={(e) => setIsGoldFoil(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-lg border-2 flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                    isGoldFoil
                      ? 'border-amber-500 bg-amber-500 text-white'
                      : 'border-slate-300 bg-white'
                  }`}>
                    {isGoldFoil && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1">
                      <span className="text-xs font-bold text-slate-900">Golden Foil</span>
                      <span className="text-[10px] font-extrabold font-mono text-amber-900 bg-amber-100/80 border border-amber-300/80 px-1.5 py-0.2 rounded">
                        {selectedPaper.id === 'gold-foil-on-non-woven' ? 'Included' : '+₹48/sqft'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">
                      Opulent metallic gold leaf accent highlights
                    </p>
                  </div>
                </label>

              </div>
            </div>

            {/* Step 3: Wall Dimensions Input */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-900">
                  3. Enter Wall Dimensions
                </label>

                {/* Unit selector buttons */}
                <div className="inline-flex bg-slate-100 rounded-xl p-1 border border-slate-200">
                  <button
                    type="button"
                    onClick={() => setUnit('Inches')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                      unit === 'Inches'
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    Inches
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('CM')}
                    className={`px-3 py-1 text-xs font-bold rounded-lg transition cursor-pointer ${
                      unit === 'CM'
                        ? 'bg-sky-500 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    CM
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Width ({unit})
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 120"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-semibold text-slate-600 block mb-1">
                    Height ({unit})
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="e.g. 96"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              {/* Calculated Totals */}
              <div className="bg-sky-50/70 rounded-2xl p-4 border border-sky-200/80 space-y-2 text-slate-900 shadow-2xs">
                <div className="text-xs font-semibold text-slate-600 flex justify-between">
                  <span>Actual Wall Area:</span>
                  <span className="font-bold text-slate-900">{roundedSqFt} Sq. Ft.</span>
                </div>

                {isMinBillApplied && (
                  <div className="bg-amber-50/90 border border-amber-200/80 rounded-xl px-2.5 py-1.5 flex items-center justify-between text-[11px] text-amber-900">
                    <span className="font-medium">Billable Area (Min. 12 Sq. Ft.):</span>
                    <span className="font-extrabold font-mono text-amber-950">12.00 Sq. Ft.</span>
                  </div>
                )}
                
                <div className="text-xs font-semibold text-slate-600 flex justify-between items-center">
                  <span>Selected Rate:</span>
                  <div className="text-right">
                    <span className="font-bold text-sky-950 font-mono text-sm">
                      ₹{currentPricePerSqFt}/sqft
                    </span>
                    <span className="text-[10px] text-slate-500 block font-normal">
                      (Base ₹{baseRate}{embossRate ? ` + Emboss ₹${embossRate}` : ''}{foilRate ? ` + Foil ₹${foilRate}` : ''})
                    </span>
                  </div>
                </div>

                <div className="text-xs font-semibold text-slate-600 flex justify-between items-center pt-1 border-t border-sky-200/40">
                  <span>Finish Specifications:</span>
                  <span className="font-bold text-slate-900 text-right text-[11px]">
                    {selectedFinishText}
                  </span>
                </div>

                <div className="text-sm font-bold text-slate-900 flex justify-between items-baseline pt-1.5 border-t border-sky-200/60">
                  <div>
                    <span className="block">Calculated Total Price:</span>
                    {isMinBillApplied && (
                      <span className="text-[10px] text-amber-800 font-semibold block leading-none">
                        (Billed for min. 12 sq.ft @ ₹{currentPricePerSqFt}/sqft)
                      </span>
                    )}
                  </div>
                  <span className="text-2xl font-serif font-extrabold text-slate-900">₹{totalCost.toLocaleString('en-IN')}</span>
                </div>
                <p className="text-[10px] text-slate-500 pt-0.5">
                  ✓ Custom made-to-measure on <strong>{selectedPaper.name}</strong> ({selectedPaper.width} Roll Width) • Min. bill 12 sq.ft
                </p>
              </div>
            </div>

            {/* Step 4: Add to Cart Action */}
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!hasDimensions}
              className={`w-full py-4 rounded-2xl text-xs font-bold tracking-wider uppercase transition flex items-center justify-center gap-2 ${
                hasDimensions
                  ? 'bg-sky-500 hover:bg-sky-600 text-white shadow-md shadow-sky-500/25 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{hasDimensions ? (user ? 'ADD TO CART & VIEW CART' : 'LOGIN TO ADD TO CART') : 'ENTER DIMENSIONS TO CONTINUE'}</span>
            </button>

            {/* Custom Made-to-Measure & Free Reprint Guarantee Banner */}
            <div className="bg-sky-50/70 border border-sky-200/80 rounded-2xl p-3.5 space-y-2 text-[11px] text-slate-700">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900">100% Free Reprint Guarantee: </span>
                  <span>Any printing error, dimension mismatch, or transit damage is reprinted and redispatched at zero cost.</span>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1 border-t border-sky-200/50 text-[10px] text-slate-500">
                <span>Custom Made-to-Measure Wallpapers</span>
                <Link to="/refund-policy" target="_blank" className="font-bold text-sky-800 hover:underline">
                  View Policy →
                </Link>
              </div>
            </div>

          </div>

        </div>

        {/* Horizontal Scroll Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-10 border-t border-slate-200/80">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-[11px] font-bold text-sky-900 uppercase tracking-widest bg-sky-50 border border-sky-200/80 px-2.5 py-0.5 rounded-full">
                  You May Also Like
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 mt-1">
                  Related Custom Wallpapers
                </h2>
              </div>

              {/* Scroll Arrow Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleScroll('left')}
                  className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-sky-700 shadow-xs transition cursor-pointer"
                  title="Scroll Left"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleScroll('right')}
                  className="p-2 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 hover:text-sky-700 shadow-xs transition cursor-pointer"
                  title="Scroll Right"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Horizontal Scroll Container */}
            <div
              ref={scrollRef}
              className="flex items-stretch gap-3.5 sm:gap-4 overflow-x-auto scrollbar-none snap-x snap-mandatory py-2"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {relatedProducts.map((relProduct) => (
                <div key={relProduct.id} className="w-44 sm:w-48 shrink-0 snap-start">
                  <ProductCard product={relProduct} compact={true} />
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
