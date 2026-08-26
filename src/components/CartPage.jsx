import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Trash2, ArrowRight, Sparkles, ShieldCheck, Ruler, ChevronRight, Plus, Minus, ArrowLeft, Truck, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800">
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-sky-700 transition flex items-center gap-1">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-900 font-bold">Shopping Cart</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-900 shadow-xs">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                Your Custom Rolls Cart
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Review your customized wallpaper dimensions and specifications before checkout
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl transition cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {/* Cart Contents */}
        {cartItems.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-xs my-8 space-y-5 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mx-auto shadow-xs">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-slate-900">
                Your cart is currently empty
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Explore our catalog of designer wallpapers, customize wall dimensions in sq ft, and craft your dream wall ambience.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-7 py-3.5 rounded-2xl shadow-md shadow-sky-500/25 transition text-sm cursor-pointer"
            >
              <span>Explore Wallpaper Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          /* Active Cart items Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Cart Items List (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              
              {/* Items Card List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.cartId}
                    className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 hover:border-sky-300 shadow-xs hover:shadow-md transition flex flex-col sm:flex-row gap-4 relative group"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-full sm:w-32 h-36 sm:h-32 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200 relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
                        }}
                        className="w-full h-full object-cover"
                      />
                      {item.code && (
                        <span className="absolute bottom-2 left-2 bg-white/95 text-slate-800 text-[10px] font-mono font-extrabold px-2 py-0.5 rounded-md border border-slate-200 shadow-xs">
                          {item.code}
                        </span>
                      )}
                    </div>

                    {/* Specifications & Details */}
                    <div className="flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-serif font-bold text-base sm:text-lg text-slate-900">
                            {item.title}
                          </h3>
                          
                          {/* Remove button */}
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="p-1.5 rounded-full text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer shrink-0"
                            title="Remove item from cart"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </div>

                        {/* Specs Badges */}
                        <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-slate-600">
                          <div className="inline-flex items-center gap-1.5 bg-sky-50 text-sky-900 border border-sky-200/80 px-2.5 py-1 rounded-xl font-medium">
                            <Ruler className="w-3.5 h-3.5 text-sky-600" />
                            <span>Dimensions: <strong>{item.widthFt} × {item.heightFt}</strong></span>
                            <span className="text-sky-600/60">•</span>
                            <span><strong>{item.totalSqFt}</strong> Sq. Ft.{item.isMinBillApplied || (item.totalSqFt && item.totalSqFt < 12) ? ' (Min. 12 sq.ft billed)' : ''}</span>
                          </div>

                          <div className="inline-flex items-center gap-1.5 bg-slate-50 text-slate-700 border border-slate-200 px-2.5 py-1 rounded-xl font-medium">
                            <span>Texture: <strong className="text-slate-900">{item.paperOption.name}{item.paperOption.selectedFinish ? ` (${item.paperOption.selectedFinish})` : ''}</strong></span>
                            {item.paperOption.width && (
                              <>
                                <span className="text-slate-400">•</span>
                                <span className="text-slate-500 font-mono text-[11px]">{item.paperOption.width} Roll</span>
                              </>
                            )}
                            <span className="text-slate-400">•</span>
                            <span>₹{item.pricePerSqFt}/sqft</span>
                          </div>
                        </div>
                      </div>

                      {/* Controls & Price Row */}
                      <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        
                        {/* Quantity Counter */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-slate-500">Roll Sets:</span>
                          <div className="inline-flex items-center bg-sky-50/70 border border-sky-200/80 rounded-xl p-0.5">
                            <button
                              onClick={() => updateQuantity(item.cartId, -1)}
                              disabled={item.quantity <= 1}
                              className={`p-1.5 rounded-lg transition ${
                                item.quantity <= 1 
                                  ? 'text-slate-300 cursor-not-allowed' 
                                  : 'text-sky-900 hover:bg-sky-100 cursor-pointer'
                              }`}
                              title="Decrease quantity"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-8 text-center text-xs font-bold text-slate-900">
                              {item.quantity || 1}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, 1)}
                              className="p-1.5 rounded-lg text-sky-900 hover:bg-sky-100 transition cursor-pointer"
                              title="Increase quantity"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Item Total Price */}
                        <div className="text-right">
                          <span className="text-xs text-slate-400 block font-medium">Item Total</span>
                          <span className="text-lg sm:text-xl font-serif font-extrabold text-slate-900">
                            ₹{item.itemTotal.toLocaleString('en-IN')}
                          </span>
                        </div>

                      </div>

                    </div>
                  </div>
                ))}
              </div>

              {/* Information Cards Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                    <Truck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Insured Express Delivery</h4>
                    <p className="text-[11px] text-slate-500">Shipped in heavy-duty protective rolls</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">Precision Custom Print</h4>
                    <p className="text-[11px] text-slate-500">Eco-friendly non-fade latex inks</p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-900">100% Free Reprint Guarantee</h4>
                    <p className="text-[11px] text-slate-500">Zero-cost redispatch on printing errors</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary Sidebar (4 cols) */}
            <div className="lg:col-span-4 sticky top-6 space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                
                <h2 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center text-slate-600">
                    <span>Custom Rolls ({cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)} items)</span>
                    <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>Estimated Shipping</span>
                    <span className="text-xs text-slate-500 font-medium">
                      Calculated at checkout
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-slate-600">
                    <span>GST & Packaging</span>
                    <span className="text-xs text-slate-500 font-medium">Included</span>
                  </div>
                </div>

                {/* Total Row */}
                <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Items Subtotal</span>
                    <span className="text-xs text-slate-400 font-medium">+ ₹200 delivery at checkout</span>
                  </div>
                  <span className="font-serif font-extrabold text-2xl sm:text-3xl text-slate-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Checkout Action Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (!user) {
                      navigate('/login?redirect=/checkout');
                    } else {
                      navigate('/checkout');
                    }
                  }}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-md shadow-sky-500/25 hover:shadow-lg transition flex items-center justify-center gap-2 group text-base cursor-pointer"
                >
                  <span>{user ? 'Proceed to Custom Order Checkout' : 'Login to Proceed to Checkout'}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Secure Badge */}
                <div className="bg-sky-50/60 border border-sky-200/60 rounded-2xl p-3.5 text-center space-y-1">
                  <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-sky-900">
                    <ShieldCheck className="w-4 h-4 text-sky-600" />
                    <span>Bespoke Quality Assurance</span>
                  </div>
                  <p className="text-[11px] text-slate-500">
                    Direct custom roll verification & free reprint warranty
                  </p>
                </div>

              </div>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
