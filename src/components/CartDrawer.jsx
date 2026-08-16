import React from 'react';
import { X, ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck, Ruler } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, removeFromCart, subtotal, setIsCheckoutOpen } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm flex justify-end animate-fade-in">
      <div className="bg-white max-w-md w-full h-full shadow-2xl flex flex-col justify-between border-l border-slate-200">
        
        {/* Cart Drawer Header */}
        <div className="bg-[#1a1615] text-amber-50 p-5 flex items-center justify-between border-b border-amber-900/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-400" />
            <h2 className="font-serif font-bold text-lg text-white">Your Custom Rolls Cart</h2>
            <span className="bg-amber-800 text-amber-100 text-xs px-2 py-0.5 rounded-full font-bold">
              {cartItems.length}
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-amber-50 p-3 text-center border-b border-amber-200/60 text-xs font-semibold text-amber-900 flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>🎉 Congratulations! Free Express Shipping Unlocked across India</span>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
              <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-700">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-800">Your cart is empty</h3>
              <p className="text-xs text-slate-500 max-w-xs">
                Browse our custom wallpaper catalog and customize your wall dimensions to get started.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.cartId}
                className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex gap-3 relative group hover:border-amber-400 transition"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-200 shrink-0 border border-slate-300">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pr-6">
                  <h4 className="font-serif font-bold text-sm text-slate-950 truncate">
                    {item.title}
                  </h4>
                  
                  {/* Specs */}
                  <div className="text-[11px] text-slate-600 space-y-0.5 mt-1">
                    <div className="flex items-center gap-1">
                      <Ruler className="w-3 h-3 text-amber-700 shrink-0" />
                      <span>Dimensions: <strong>{item.widthFt} × {item.heightFt}</strong> ({item.totalSqFt} sq ft)</span>
                    </div>
                    <p className="text-amber-900 font-medium">
                      Texture: <strong>{item.paperOption.name}</strong> (@ ₹{item.pricePerSqFt}/sqft)
                    </p>
                  </div>

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-extrabold text-slate-900">
                      ₹{item.itemTotal.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => removeFromCart(item.cartId)}
                  className="absolute top-3 right-3 text-slate-400 hover:text-rose-600 transition p-1"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
            <div className="flex justify-between items-center text-sm font-semibold text-slate-600">
              <span>Subtotal ({cartItems.length} Custom Rolls)</span>
              <span className="text-slate-950 font-bold text-base">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center text-xs text-slate-500">
              <span>Estimated Shipping</span>
              <span className="text-emerald-700 font-bold">FREE</span>
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-900">Total Payable</span>
              <span className="text-xl font-extrabold text-amber-900">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              onClick={() => {
                setIsCartOpen(false);
                setIsCheckoutOpen(true);
              }}
              className="w-full bg-slate-950 hover:bg-amber-900 text-amber-50 font-bold py-3.5 rounded-xl shadow-xl transition flex items-center justify-center gap-2 group text-sm"
            >
              <span>Proceed to Pay & Collect Order</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-medium pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Encrypted & Safe Razorpay Payment Gateway</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
