import React, { useState } from 'react';
import { X, Heart, Check } from 'lucide-react';
import { PAPER_OPTIONS } from '../data/wallpapers';
import { useCart } from '../context/CartContext';

export default function WallpaperCustomizer({ product, onClose }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();

  // Unit State: 'Inches' (default as requested) or 'CM'
  const [unit, setUnit] = useState('Inches');

  // Dimension values in selected unit
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  // Selected Material option
  const [selectedPaper, setSelectedPaper] = useState(PAPER_OPTIONS[0]);

  // Gallery active thumbnail
  const [activeImage, setActiveImage] = useState(product?.roomMockup || product?.image);

  if (!product) return null;

  const isWishlisted = wishlist.some(item => item.id === product.id);

  // Dimension numeric parsing
  const wNum = parseFloat(width) || 0;
  const hNum = parseFloat(height) || 0;

  // Calculate Total Square Feet
  let totalSqFt = 0;
  if (wNum > 0 && hNum > 0) {
    if (unit === 'Inches') {
      totalSqFt = (wNum * hNum) / 144;
    } else {
      // CM to Sq Ft conversion
      totalSqFt = (wNum * hNum) / 929.0304;
    }
  }

  // Rounded Sq Ft (2 decimal places)
  const roundedSqFt = Math.round(totalSqFt * 100) / 100;

  // Calculate Total Price
  const totalCost = Math.round(roundedSqFt * selectedPaper.pricePerSqFt);

  const hasDimensions = wNum > 0 && hNum > 0;

  const handleAddToCart = () => {
    if (!hasDimensions) return;
    addToCart(product, {
      width: `${wNum} ${unit}`,
      height: `${hNum} ${unit}`,
      totalSqFt: roundedSqFt,
      paperOption: selectedPaper,
      itemTotal: totalCost
    });
    if (onClose) onClose();
  };

  const thumbnails = [
    product.roomMockup || product.image,
    product.image
  ].filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-6xl w-full overflow-hidden shadow-2xl border border-slate-200 relative max-h-[94vh] flex flex-col">

        {/* Top Header bar with close button */}
        <div className="px-6 py-3 border-b border-slate-100 flex items-center justify-between bg-white z-10 shrink-0">
          <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
            LIVORA Wallpaper Customizer
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition"
            title="Close Customizer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Column: Product Mockup & Thumbnails (7 cols) */}
          <div className="lg:col-span-7 space-y-4">

            {/* Main Big Image Box */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-100/80 aspect-[4/3] border border-slate-200/80 shadow-xs flex items-center justify-center p-2">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-contain rounded-xl transition-all duration-300"
              />
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="flex items-center gap-3">
              {thumbnails.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`w-20 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${activeImage === imgUrl ? 'border-black ring-2 ring-black/10 shadow-sm' : 'border-slate-200 opacity-70 hover:opacity-100'
                    }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

          </div>

          {/* Right Column: Customization Form (5 cols) matching screenshot exact UI */}
          <div className="lg:col-span-5 space-y-5">

            {/* Product Title & Wishlist Heart Button */}
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-serif text-slate-900 font-normal leading-tight">
                {product.title}
              </h1>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-2.5 rounded-full border transition-all shrink-0 ${isWishlisted
                    ? 'border-rose-200 bg-rose-50 text-rose-500'
                    : 'border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 bg-white'
                  }`}
                title={isWishlisted ? "Remove from Wishlist" : "Save to Wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>

            {/* Form Card Box */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-sm space-y-5">

              <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                Choose Material & Enter Wall Size.
              </h2>

              {/* Select Material Dropdown */}
              <div>
                <label className="text-xs font-semibold text-slate-700 mb-1.5 block">
                  Select Material
                </label>
                <select
                  value={selectedPaper.id}
                  onChange={(e) => {
                    const found = PAPER_OPTIONS.find(p => p.id === e.target.value);
                    if (found) setSelectedPaper(found);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                  {PAPER_OPTIONS.map((paper) => (
                    <option key={paper.id} value={paper.id}>
                      {paper.name} - ₹{paper.pricePerSqFt}/sq ft
                    </option>
                  ))}
                </select>
              </div>

              {/* Unit Selector Buttons: Inches / CM */}
              <div>
                <div className="inline-flex bg-white rounded-lg border border-slate-200 p-0.5">
                  <button
                    type="button"
                    onClick={() => setUnit('Inches')}
                    className={`px-5 py-1.5 text-xs font-bold rounded-md transition ${unit === 'Inches'
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:text-slate-900'
                      }`}
                  >
                    Inches
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnit('CM')}
                    className={`px-5 py-1.5 text-xs font-bold rounded-md transition ${unit === 'CM'
                        ? 'bg-black text-white shadow-xs'
                        : 'bg-white text-slate-700 hover:text-slate-900'
                      }`}
                  >
                    CM
                  </button>
                </div>
              </div>

              {/* Width & Height Input Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-800 mb-1.5 block">
                    Width ({unit})
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-800 mb-1.5 block">
                    Height ({unit})
                  </label>
                  <input
                    type="number"
                    min="1"
                    placeholder="Height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
                  />
                </div>
              </div>

              {/* Calculated Totals */}
              <div className="pt-2 space-y-1 text-slate-900">
                <div className="text-sm font-medium">
                  Total Area: <span className="font-bold">{roundedSqFt} Sq. Ft.</span>
                </div>
                <div className="text-lg font-bold text-slate-900">
                  Total Price: <span className="text-xl">₹{totalCost.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleAddToCart}
                disabled={!hasDimensions}
                className={`w-full py-3.5 rounded-lg text-xs font-bold tracking-widest uppercase transition ${hasDimensions
                    ? 'bg-black hover:bg-slate-800 text-white shadow-md cursor-pointer'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
              >
                {hasDimensions ? 'ADD TO CART' : 'ENTER DIMENSIONS'}
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
