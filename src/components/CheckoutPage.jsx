import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, Smartphone, ChevronRight, ArrowLeft, Building2, CheckCircle2, Award, AlertCircle, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { loadRazorpayScript } from '../utils/razorpay';
import { saveOrderToFirestore } from '../services/firestoreService';
import Header from './Header';
import Footer from './Footer';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart, setOrderSuccess } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const deliveryCharge = 200;
  const totalPayable = subtotal + deliveryCharge;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [stateName, setStateName] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  React.useEffect(() => {
    if (user) {
      if (!name && user.name) setName(user.name);
      if (!email && user.email) setEmail(user.email);
      if (!phone && user.phone) setPhone(user.phone);
    }
  }, [user]);

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;

    if (!user) {
      setErrorMessage('Please sign in with Google to place your bespoke wallpaper order.');
      navigate('/login?redirect=/checkout');
      return;
    }

    if (!name || !phone || !address || !city || !pincode) {
      setErrorMessage('Please fill in all mandatory delivery details.');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    try {
      // Step 1: Ensure Razorpay SDK is loaded
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded || !window.Razorpay) {
        setErrorMessage('Unable to load Razorpay payment gateway. Please check your internet connection and try again.');
        setLoading(false);
        return;
      }

      const razorpayKeyId = import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_live_TTbiP0afZW3w2T';
      const amountInPaise = Math.max(100, Math.round(totalPayable * 100));
      const orderId = 'LIV-' + Math.floor(100000 + Math.random() * 900000);
      const trackingNo = 'LIV-EXP-' + Math.floor(10000000 + Math.random() * 90000000);

      // Step 2: Configure Razorpay Checkout
      const options = {
        key: razorpayKeyId,
        amount: amountInPaise,
        currency: 'INR',
        name: 'LIVORA Wallpaper Studio',
        description: `Custom Wall Murals & Wallpapers (${cartItems.length} roll set${cartItems.length > 1 ? 's' : ''})`,
        image: 'https://livorawallcovering.com/favicon.svg',
        prefill: {
          name: name,
          email: email || '',
          contact: phone
        },
        notes: {
          shipping_address: `${address}, ${city}, ${stateName} - ${pincode}`,
          customer_name: name,
          customer_phone: phone
        },
        theme: {
          color: '#0284c7'
        },
        handler: async function (response) {
          try {
            setLoading(true);
            setErrorMessage('');

            // Step 3: ONLY punch and confirm the order AFTER successful Razorpay payment
            const successOrder = {
              id: orderId,
              createdAt: new Date().toISOString(),
              customer: {
                userId: user?.id || 'GUEST',
                name,
                email: email || '',
                phone,
                address: `${address}, ${city}, ${stateName} - ${pincode}`,
                city,
                state: stateName,
                pincode
              },
              items: cartItems,
              subtotal: subtotal,
              deliveryCharge: deliveryCharge,
              totalAmount: totalPayable,
              paymentDetails: {
                method: 'RAZORPAY',
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id || '',
                signature: response.razorpay_signature || '',
                status: 'PAID'
              },
              status: 'PAID',
              trackingNumber: trackingNo
            };

            // Save order to Firestore Database
            try {
              await saveOrderToFirestore(successOrder);
            } catch (fsErr) {
              console.warn('Error saving order to Firestore:', fsErr);
            }

            // Save to localStorage for instant user order tracking
            try {
              const userOrdersKey = `livora_orders_${user?.id || 'guest'}`;
              const existing = JSON.parse(localStorage.getItem(userOrdersKey) || '[]');
              existing.unshift(successOrder);
              localStorage.setItem(userOrdersKey, JSON.stringify(existing));
            } catch (e) {}

            setLoading(false);
            clearCart();
            setOrderSuccess(successOrder);
            navigate('/');
          } catch (punchErr) {
            console.error('Error creating order after payment:', punchErr);
            setErrorMessage('Payment received with ID: ' + response.razorpay_payment_id + '. Please contact support to confirm order details.');
            setLoading(false);
          }
        },
        modal: {
          ondismiss: function () {
            setLoading(false);
            setErrorMessage('Payment window was closed. Complete payment to confirm your custom wallpaper order.');
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response) {
        console.error('Razorpay payment failed:', response.error);
        const reason = response.error?.description || response.error?.reason || 'Transaction could not be completed';
        setErrorMessage(`Payment failed: ${reason}`);
        setLoading(false);
      });

      rzp.open();
    } catch (err) {
      console.error('Payment processing error:', err);
      setErrorMessage(err.message || 'Unable to open payment gateway. Please try again.');
      setLoading(false);
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
              
              {/* Sign-in Required Notification Banner */}
              {!user && (
                <div className="bg-gradient-to-r from-sky-50 to-blue-50/70 border-2 border-sky-200 text-sky-950 p-5 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-slate-900">Sign-in Required to Place Order</h4>
                      <p className="text-xs text-slate-600">Please sign in with Google to confirm and track your custom wallpaper order.</p>
                    </div>
                  </div>
                  <Link
                    to="/login?redirect=/checkout"
                    className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-xs px-5 py-3 rounded-2xl transition shadow-md shadow-sky-500/20 cursor-pointer shrink-0"
                  >
                    Sign In with Google
                  </Link>
                </div>
              )}

              {/* Error Notification Banner */}
              {errorMessage && (
                <div className="bg-rose-50 border border-rose-200 text-rose-800 px-5 py-4 rounded-2xl flex items-start gap-3 shadow-xs">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm font-medium flex-1">
                    <p className="font-bold text-rose-900 mb-0.5">Payment Notification</p>
                    <p>{errorMessage}</p>
                  </div>
                </div>
              )}

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
                        placeholder="e.g. Pune"
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
                        placeholder="411046"
                        className="w-full px-4 py-3 bg-sky-50/30 border border-sky-200/80 rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-sky-500 focus:outline-none transition"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Razorpay Payment Gateway */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <span className="w-7 h-7 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shadow-xs">2</span>
                  <h2 className="font-serif font-bold text-lg text-slate-900">Payment Gateway</h2>
                </div>

                {/* Razorpay Single Dedicated Method */}
                <div className="p-5 rounded-2xl border-2 border-sky-500 bg-sky-50/50 ring-2 ring-sky-500/20 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xs">
                        <ShieldCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm font-bold text-slate-900">Razorpay Secure Checkout</h3>
                          <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            Verified
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Pay securely with UPI, Credit / Debit Cards, NetBanking & Wallets
                        </p>
                      </div>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-sky-600 shrink-0" />
                  </div>

                  {/* Payment Channel Badges */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2 border-t border-sky-200/60">
                    <div className="bg-white/90 border border-sky-200/80 rounded-xl p-2.5 flex items-center gap-2 shadow-2xs">
                      <Smartphone className="w-4 h-4 text-sky-600 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">Instant UPI</p>
                        <p className="text-[9px] text-slate-500">GPay, PhonePe, Paytm</p>
                      </div>
                    </div>

                    <div className="bg-white/90 border border-sky-200/80 rounded-xl p-2.5 flex items-center gap-2 shadow-2xs">
                      <CreditCard className="w-4 h-4 text-sky-600 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">Cards</p>
                        <p className="text-[9px] text-slate-500">Visa, MC, RuPay</p>
                      </div>
                    </div>

                    <div className="bg-white/90 border border-sky-200/80 rounded-xl p-2.5 flex items-center gap-2 shadow-2xs">
                      <Building2 className="w-4 h-4 text-sky-600 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">NetBanking</p>
                        <p className="text-[9px] text-slate-500">50+ Indian Banks</p>
                      </div>
                    </div>

                    <div className="bg-white/90 border border-sky-200/80 rounded-xl p-2.5 flex items-center gap-2 shadow-2xs">
                      <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                      <div>
                        <p className="text-[11px] font-bold text-slate-800">Wallets</p>
                        <p className="text-[9px] text-slate-500">Cred, Paytm, Mobikwik</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Refund & Custom Sizing Notice */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-900 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                    <span>Custom Made-to-Order Policy:</span>
                  </p>
                  <p className="text-[11px] leading-relaxed text-amber-800 pl-5">
                    All wallpapers are printed custom to your exact dimensions. Orders once processed cannot be cancelled or refunded. However, <strong>in case of any printing defect or transit damage, we will reprint and redispatch a brand new wallpaper at zero cost</strong>.{' '}
                    <Link to="/refund-policy" target="_blank" className="underline font-bold hover:text-amber-950">
                      Read Full Refund & Reprint Policy
                    </Link>
                  </p>
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
                          <p>Size: {item.widthFt} × {item.heightFt} ({item.totalSqFt} sq ft{item.isMinBillApplied || (item.totalSqFt && item.totalSqFt < 12) ? ' • min. 12 sq.ft billed' : ''})</p>
                          <p>Texture: {item.paperOption.name}{item.paperOption.selectedFinish ? ` (${item.paperOption.selectedFinish})` : ''}{item.paperOption.width ? ` • ${item.paperOption.width}` : ''}</p>
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
                    <span>Delivery Charge</span>
                    <span className="font-semibold text-slate-900">₹{deliveryCharge}</span>
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
                    <span className="text-[11px] text-slate-500 font-medium">Incl. all taxes & delivery</span>
                  </div>
                  <span className="font-serif font-extrabold text-2xl text-slate-900">
                    ₹{totalPayable.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-md shadow-sky-500/25 transition flex items-center justify-center gap-2 group text-base cursor-pointer active:scale-[0.99]"
                >
                  <Lock className="w-5 h-5" />
                  <span>
                    {loading
                      ? 'Opening Razorpay Gateway...'
                      : !user
                      ? 'Sign In with Google to Order'
                      : `Pay ₹${totalPayable.toLocaleString('en-IN')} with Razorpay`}
                  </span>
                </button>

                {/* Trust Badges */}
                <div className="bg-sky-50/60 border border-sky-200/60 rounded-2xl p-3.5 space-y-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2 text-sky-900 font-bold">
                    <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Razorpay 100% Encrypted & Safe Gateway</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-sky-700 shrink-0" />
                    <span>Free Reprint Guarantee on Any Printing Defect</span>
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
