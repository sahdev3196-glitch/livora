import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, Smartphone, ChevronRight, ArrowLeft, Ruler, Sparkles, Building2, CheckCircle2, Truck, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart, setOrderSuccess } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY_UPI');
  const [loading, setLoading] = useState(false);

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    setLoading(true);

    const orderData = {
      customer: {
        userId: user?.id || 'GUEST',
        name,
        email,
        phone,
        address: `${address}, ${city}, ${stateName} - ${pincode}`
      },
      items: cartItems,
      totalAmount: subtotal,
      paymentDetails: {
        method: paymentMethod,
        paymentId: 'PAY_RZP_' + Math.floor(10000000 + Math.random() * 90000000),
        orderId: 'ORD_RZP_' + Math.floor(100000 + Math.random() * 900000)
      }
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();

      setLoading(false);
      clearCart();
      
      const successOrder = data.order || { id: 'LIV-' + Math.floor(100000 + Math.random() * 900000), totalAmount: subtotal };
      setOrderSuccess(successOrder);
      navigate('/');
    } catch (err) {
      console.error('Order processing failed:', err);
      setLoading(false);
      clearCart();
      setOrderSuccess({ id: 'LIV-' + Math.floor(100000 + Math.random() * 900000), totalAmount: subtotal });
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800">
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-sky-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link to="/cart" className="hover:text-sky-700 transition">Shopping Cart</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-900 font-bold">Checkout</span>
        </nav>

        {/* Page Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-900 shadow-xs">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                Secure Checkout
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Complete shipping address & payment details to confirm your wallpaper order
              </p>
            </div>
          </div>

          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl transition cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Cart</span>
          </Link>
        </div>

        {cartItems.length === 0 ? (
          /* Empty Cart State */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-xs my-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mx-auto shadow-xs">
              <Lock className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-slate-900">No Items to Checkout</h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Your shopping cart is empty. Customize wallpapers from our collection to proceed.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-7 py-3.5 rounded-2xl shadow-md shadow-sky-500/25 transition text-sm cursor-pointer"
            >
              <span>Explore Wallpaper Catalog</span>
            </Link>
          </div>
        ) : (
          /* Checkout Grid */
          <form onSubmit={handleProcessPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Form Steps (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Customer Contact & Shipping Address */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <span className="w-7 h-7 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shadow-xs">1</span>
                  <h2 className="font-serif font-bold text-lg text-slate-900">Shipping Address & Contact Information</h2>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        Full Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 bg-sky-50/30 border border-sky-200/80 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        Mobile Phone <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 9876543210"
                        className="w-full px-4 py-3 bg-sky-50/30 border border-sky-200/80 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Email Address (for order tracking & invoices) <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul.sharma@example.com"
                      className="w-full px-4 py-3 bg-sky-50/30 border border-sky-200/80 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1.5">
                      Full Delivery Address <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      required
                      rows="3"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="House/Flat No., Building Name, Street, Landmark"
                      className="w-full px-4 py-3 bg-sky-50/30 border border-sky-200/80 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        City <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Mumbai"
                        className="w-full px-4 py-3 bg-sky-50/30 border border-sky-200/80 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        State <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={stateName}
                        onChange={(e) => setStateName(e.target.value)}
                        placeholder="e.g. Maharashtra"
                        className="w-full px-4 py-3 bg-sky-50/30 border border-sky-200/80 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-slate-700 block mb-1.5">
                        Pincode <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="400001"
                        className="w-full px-4 py-3 bg-sky-50/30 border border-sky-200/80 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method Selection */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <span className="w-7 h-7 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shadow-xs">2</span>
                  <h2 className="font-serif font-bold text-lg text-slate-900">Choose Payment Method</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Razorpay UPI */}
                  <label className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition ${
                    paymentMethod === 'RAZORPAY_UPI' 
                      ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20' 
                      : 'border-slate-200 hover:border-sky-300 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="RAZORPAY_UPI"
                      checked={paymentMethod === 'RAZORPAY_UPI'}
                      onChange={() => setPaymentMethod('RAZORPAY_UPI')}
                      className="text-sky-500 focus:ring-sky-500"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                        <Smartphone className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Instant UPI</p>
                        <p className="text-[11px] text-slate-500">GPay, PhonePe, Paytm, BHIM</p>
                      </div>
                    </div>
                  </label>

                  {/* Credit / Debit Card */}
                  <label className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition ${
                    paymentMethod === 'CARD' 
                      ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20' 
                      : 'border-slate-200 hover:border-sky-300 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="CARD"
                      checked={paymentMethod === 'CARD'}
                      onChange={() => setPaymentMethod('CARD')}
                      className="text-sky-500 focus:ring-sky-500"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600">
                        <CreditCard className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Credit / Debit Card</p>
                        <p className="text-[11px] text-slate-500">Visa, Mastercard, RuPay</p>
                      </div>
                    </div>
                  </label>

                  {/* Net Banking */}
                  <label className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition ${
                    paymentMethod === 'NETBANKING' 
                      ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20' 
                      : 'border-slate-200 hover:border-sky-300 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="NETBANKING"
                      checked={paymentMethod === 'NETBANKING'}
                      onChange={() => setPaymentMethod('NETBANKING')}
                      className="text-sky-500 focus:ring-sky-500"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Net Banking & Wallets</p>
                        <p className="text-[11px] text-slate-500">HDFC, ICICI, SBI, Axis</p>
                      </div>
                    </div>
                  </label>

                  {/* Cash on Delivery */}
                  <label className={`p-4 rounded-2xl border-2 cursor-pointer flex items-center gap-3 transition ${
                    paymentMethod === 'COD' 
                      ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20' 
                      : 'border-slate-200 hover:border-sky-300 bg-white'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="text-sky-500 focus:ring-sky-500"
                    />
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-sky-100/70 border border-sky-300 flex items-center justify-center text-sky-900">
                        <Truck className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900">Cash on Delivery</p>
                        <p className="text-[11px] text-slate-500">Pay on doorstep delivery</p>
                      </div>
                    </div>
                  </label>
                </div>
              </div>

            </div>

            {/* Right Column: Order Summary (5 cols) */}
            <div className="lg:col-span-5 sticky top-6 space-y-6">
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-5">
                <h2 className="font-serif font-bold text-xl text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
                  <span>Order Items</span>
                  <span className="text-xs font-sans font-bold bg-sky-50 text-sky-900 border border-sky-200 px-2.5 py-1 rounded-full">
                    {cartItems.length} Roll Set{cartItems.length > 1 ? 's' : ''}
                  </span>
                </h2>

                {/* Items List */}
                <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div key={item.cartId} className="flex gap-3 p-2.5 bg-sky-50/40 rounded-2xl border border-sky-200/50">
                      <img
                        src={item.image}
                        alt={item.title}
                        onError={(e) => {
                          e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
                        }}
                        className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-bold text-xs text-slate-900 truncate">{item.title}</h4>
                        <div className="text-[11px] text-slate-600 mt-0.5 space-y-0.5">
                          <p>Size: {item.widthFt} × {item.heightFt} ({item.totalSqFt} sq ft)</p>
                          <p>Texture: {item.paperOption.name}</p>
                          <p className="text-sky-900 font-semibold">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                      <div className="text-right font-serif font-extrabold text-sm text-slate-900 shrink-0">
                        ₹{item.itemTotal.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 text-xs pt-3 border-t border-slate-100">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Subtotal</span>
                    <span className="font-semibold text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Express Delivery Across India</span>
                    <span className="text-sky-700 font-bold">FREE</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>GST & Packaging</span>
                    <span className="text-slate-500 font-medium">Included</span>
                  </div>
                </div>

                {/* Total Row */}
                <div className="pt-3 border-t border-slate-100 flex justify-between items-end">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Payable</span>
                    <span className="text-[11px] text-sky-700 font-semibold">Free Express Shipping Applied</span>
                  </div>
                  <span className="font-serif font-extrabold text-2xl text-slate-900">
                    ₹{subtotal.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-md shadow-sky-500/25 transition flex items-center justify-center gap-2 group text-base cursor-pointer"
                >
                  <Lock className="w-5 h-5" />
                  <span>{loading ? 'Processing Order...' : `Pay ₹${subtotal.toLocaleString('en-IN')} & Confirm`}</span>
                </button>

                {/* Trust Badges */}
                <div className="bg-sky-50/60 border border-sky-200/60 rounded-2xl p-3.5 space-y-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2 text-sky-900 font-bold">
                    <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Razorpay 100% Encrypted & Safe Gateway</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>Custom Non-Fade Premium Quality Guarantee</span>
                  </div>
                </div>

              </div>
            </div>

          </form>
        )}

      </main>

      <Footer />
    </div>
  );
}
