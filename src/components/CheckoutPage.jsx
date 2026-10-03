import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, Lock, Smartphone, ChevronRight, ArrowLeft, Building2, CheckCircle2, Award, AlertCircle, Sparkles, Truck, Banknote, Package, Calendar, Clock, Plane } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { loadCashfreeScript } from '../utils/cashfree';
import { saveOrderToFirestore } from '../services/firestoreService';
import { verifyAndLookupPincode, getEstimatedDelivery } from '../utils/pincodeUtils';
import Header from './Header';
import Footer from './Footer';

export default function CheckoutPage() {
  const { cartItems, subtotal, clearCart, setOrderSuccess } = useCart();
  const { user, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const deliveryCharge = 0; // 100% Free Pan-India Delivery
  const [shippingZone, setShippingZone] = useState('');
  const [shippingMode] = useState('SURFACE');
  const [delhiveryLoading, setDelhiveryLoading] = useState(false);
  const [estimatedDelivery, setEstimatedDelivery] = useState(() => getEstimatedDelivery('C1', 'SURFACE'));
  const [paymentMethod] = useState('ONLINE'); // 'ONLINE' (Cashfree Gateway)

  const totalPayable = subtotal;

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState(user?.address || '');
  const [city, setCity] = useState(user?.city || '');
  const [stateName, setStateName] = useState(user?.state || 'Maharashtra');
  const [pincode, setPincode] = useState(user?.pincode || '');
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const calculateDelhiveryShipping = async (targetPincode) => {
    if (!/^[1-9][0-9]{5}$/.test(targetPincode)) return;
    setDelhiveryLoading(true);
    try {
      const apiBase = getApiBaseUrl();
      const pt = 'Pre-paid';
      const weight = Math.max(1000, cartItems.length * 1000);

      const [pincodeRes, rateRes] = await Promise.all([
        fetch(`${apiBase}/api/delhivery/check-pincode?pincode=${targetPincode}`).then(r => r.json()).catch(() => null),
        fetch(`${apiBase}/api/delhivery/calculate-rate?destinationPincode=${targetPincode}&paymentMode=${pt}&weight=${weight}`).then(r => r.json()).catch(() => null)
      ]);

      if (rateRes && rateRes.success) {
        const chosen = rateRes.options?.SURFACE || rateRes.options?.EXPRESS;
        if (chosen) {
          setShippingZone(chosen.zone || '');
          setEstimatedDelivery({
            days: chosen.estimatedDays,
            dateRange: chosen.estimatedDeliveryDate,
            transit: chosen.transitDays
          });
        } else if (rateRes.zone) {
          setShippingZone(rateRes.zone || '');
          setEstimatedDelivery({
            days: rateRes.estimatedDays || '3 – 5 Days',
            dateRange: rateRes.estimatedDeliveryDate || '',
            transit: rateRes.transitDays || '3 – 4 Days'
          });
        }
      }
    } catch (e) {
      console.warn('Delhivery calculation error:', e);
    } finally {
      setDelhiveryLoading(false);
    }
  };



  const handlePincodeChange = async (val) => {
    const rawVal = val.replace(/\D/g, '').slice(0, 6);
    setPincode(rawVal);

    if (rawVal.length === 6) {
      setPincodeLoading(true);
      setPincodeStatus(null);
      const res = await verifyAndLookupPincode(rawVal);
      setPincodeLoading(false);
      if (res.valid) {
        if (res.city && !city) setCity(res.city);
        if (res.state) setStateName(res.state);
        setPincodeStatus({
          valid: true,
          message: res.district ? `✓ Serviced Area: ${res.district}, ${res.state}` : '✓ Valid Indian PIN Code'
        });
        const initialZone = rawVal.startsWith('380') ? 'A' : (rawVal.startsWith('3') ? 'B' : 'C');
        setEstimatedDelivery(getEstimatedDelivery(initialZone, shippingMode));
        calculateDelhiveryShipping(rawVal, paymentMethod);
      } else {
        setPincodeStatus({
          valid: false,
          message: res.error || 'Invalid Indian postal PIN code'
        });
      }
    } else {
      setPincodeStatus(null);
    }
  };

  const handlePaymentMethodSelect = (newMethod) => {
    setPaymentMethod(newMethod);
  };

  React.useEffect(() => {
    if (user) {
      if (!name && user.name) setName(user.name);
      if (!email && user.email) setEmail(user.email);
      if (!phone && user.phone) setPhone(user.phone);
      if (!address && user.address) setAddress(user.address);
      if (!city && user.city) setCity(user.city);
      if (user.state) setStateName(user.state);
      if (!pincode && user.pincode) {
        const pinStr = String(user.pincode).replace(/\D/g, '').slice(0, 6);
        setPincode(pinStr);
        if (pinStr.length === 6) {
          handlePincodeChange(pinStr);
        }
      }
    }
  }, [user]);

  // Handle Cashfree redirect return if page redirected
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const returnOrderId = params.get('order_id');
    if (returnOrderId) {
      verifyCashfreePayment(returnOrderId, 'LIV-EXP-' + Math.floor(10000000 + Math.random() * 90000000));
    }
  }, []);

  const bookDelhiveryShipment = async (orderId, orderTotal, method, trackingNo) => {
    try {
      const apiBase = getApiBaseUrl();
      const weight = Math.max(1000, cartItems.length * 1000);
      const res = await fetch(`${apiBase}/api/delhivery/create-shipment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order: { id: orderId, totalAmount: orderTotal },
          customer: {
            name,
            phone,
            address: `${address}, ${city}, ${stateName} - ${pincode}`,
            pincode,
            city,
            state: stateName
          },
          items: cartItems,
          paymentMode: 'Pre-paid',
          shippingMode: shippingMode,
          codAmount: 0,
          weight
        })
      });
      const data = await res.json();
      return data;
    } catch (e) {
      console.warn('Delhivery booking warning:', e);
      return null;
    }
  };

  const finalizeSuccessfulOrder = async (orderId, paymentId, trackingNo, method = 'CASHFREE', logistics = null) => {
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
      shippingMode: shippingMode,
      totalAmount: totalPayable,
      paymentDetails: {
        method: method,
        paymentId: paymentId || `CF_${orderId}`,
        orderId: orderId,
        status: 'PAID'
      },
      status: 'PAID',
      trackingNumber: trackingNo,
      logistics: logistics || {
        carrier: 'DELHIVERY',
        waybill: trackingNo,
        trackingUrl: `https://www.delhivery.com/track/package/${trackingNo}`,
        zone: shippingZone || 'C1',
        shippingMode: shippingMode,
        originCity: 'Ahmedabad',
        originPincode: '380015',
        estimatedDays: estimatedDelivery?.days || (shippingMode === 'EXPRESS' ? '2 – 4 Days' : '4 – 6 Days'),
        estimatedDeliveryDate: estimatedDelivery?.dateRange || ''
      }
    };

    // Save order to Firestore Database
    try {
      await saveOrderToFirestore(successOrder);
      if (user && updateUserProfile) {
        await updateUserProfile({
          name,
          phone,
          address,
          city,
          state: stateName,
          pincode
        });
      }
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
  };

  const getApiBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) return import.meta.env.VITE_API_URL;
    if (typeof window !== 'undefined' && window.location.hostname.includes('livorawallcovering.com')) {
      return 'https://livora-seven.vercel.app';
    }
    return '';
  };

  const verifyCashfreePayment = async (orderId, trackingNo) => {
    try {
      setLoading(true);
      setErrorMessage('');

      const apiBase = getApiBaseUrl();
      const res = await fetch(`${apiBase}/api/cashfree/verify-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          order_id: orderId,
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
          totalAmount: totalPayable
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        await finalizeSuccessfulOrder(orderId, data.cf_payment_id, trackingNo);
      } else {
        console.warn('Cashfree payment verification pending or failed:', data);
        setErrorMessage(data.message || 'Payment verification could not be completed. If money was deducted, please contact support with Order ID: ' + orderId);
        setLoading(false);
      }
    } catch (err) {
      console.error('Error verifying Cashfree order:', err);
      setErrorMessage('Verification failed. If payment was made, please contact LIVORA support with Order ID: ' + orderId);
      setLoading(false);
    }
  };

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

    if (!/^[1-9][0-9]{5}$/.test(pincode)) {
      setErrorMessage('Please enter a valid 6-digit Indian postal PIN code (e.g. 411038).');
      return;
    }

    setErrorMessage('');
    setLoading(true);

    // --- PREPAID CASHFREE PAYMENT ---
    try {
      // Step 1: Ensure Cashfree SDK is loaded
      const isLoaded = await loadCashfreeScript();
      if (!isLoaded || !window.Cashfree) {
        setErrorMessage('Unable to load Cashfree payment gateway. Please check your internet connection and try again.');
        setLoading(false);
        return;
      }

      const orderId = 'LIV_' + Date.now() + '_' + Math.floor(1000 + Math.random() * 9000);
      let trackingNo = 'LIV-DEL-' + Math.floor(10000000 + Math.random() * 90000000);

      // Step 2: Create authentic Cashfree Order via Backend API
      const apiBase = getApiBaseUrl();
      const createRes = await fetch(`${apiBase}/api/cashfree/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalPayable,
          currency: 'INR',
          orderId: orderId,
          customer: {
            userId: user?.id || 'GUEST',
            name: name,
            email: email || '',
            phone: phone
          },
          returnUrl: window.location.protocol === 'https:'
            ? `${window.location.origin}/checkout?order_id=${orderId}`
            : `https://livorawallcovering.com/checkout?order_id=${orderId}`
        })
      });

      let orderData;
      try {
        orderData = await createRes.json();
      } catch (jsonErr) {
        throw new Error(`Payment service returned invalid response (Status ${createRes.status}). Please try again in a moment.`);
      }

      if (!createRes.ok || !orderData.payment_session_id) {
        throw new Error(orderData.error || 'Failed to initialize Cashfree payment order.');
      }

      // Step 3: Initialize Cashfree Dropin Modal matching the order session environment
      const cashfreeMode = (orderData.mode || import.meta.env.VITE_CASHFREE_MODE || 'production').toLowerCase();
      const cashfree = window.Cashfree({
        mode: cashfreeMode
      });

      const checkoutOptions = {
        paymentSessionId: orderData.payment_session_id,
        redirectTarget: '_modal' // Opens native dropin modal inside the page
      };

      cashfree.checkout(checkoutOptions).then(async (result) => {
        if (result.error) {
          console.warn('Cashfree modal closed or error:', result.error);
          setErrorMessage(result.error.message || 'Payment window was closed. Complete payment anytime to confirm your custom wallpaper order.');
          setLoading(false);
          return;
        }

        if (result.redirect) {
          console.log('Redirecting to bank authentication...');
          return;
        }

        // Auto-book Delhivery Prepaid shipment
        const deliveryRes = await bookDelhiveryShipment(orderId, totalPayable, 'Pre-paid', trackingNo);
        if (deliveryRes?.waybill) {
          trackingNo = deliveryRes.waybill;
        }

        // Verify order on backend directly from Cashfree API
        await verifyCashfreePayment(orderId, trackingNo);
      });
    } catch (err) {
      console.error('Payment processing error:', err);
      setErrorMessage(err.message || 'Unable to open Cashfree payment gateway. Please try again.');
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
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-bold text-slate-700 block">
                          Pincode <span className="text-rose-600">*</span>
                        </label>
                        {pincodeLoading && (
                          <span className="text-[10px] text-sky-600 font-medium flex items-center gap-1">
                            <span className="w-2.5 h-2.5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                            Verifying...
                          </span>
                        )}
                      </div>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => handlePincodeChange(e.target.value)}
                        placeholder="e.g. 411038"
                        className={`w-full px-4 py-3 bg-sky-50/30 border rounded-2xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none transition ${
                          pincodeStatus
                            ? pincodeStatus.valid
                              ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-400 bg-emerald-50/20'
                              : 'border-rose-300 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                            : 'border-sky-200/80 focus:ring-2 focus:ring-sky-500'
                        }`}
                      />
                      {pincodeStatus && (
                        <p className={`text-[11px] mt-1.5 font-medium flex items-center gap-1 ${
                          pincodeStatus.valid ? 'text-emerald-700' : 'text-rose-600'
                        }`}>
                          {pincodeStatus.valid ? (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          ) : (
                            <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                          )}
                          <span>{pincodeStatus.message}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method (Cashfree 100% Encrypted Gateway) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-5">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <span className="w-7 h-7 rounded-full bg-sky-500 text-white text-xs font-bold flex items-center justify-center shadow-xs">2</span>
                  <h2 className="font-serif font-bold text-lg text-slate-900">Payment Method</h2>
                </div>

                <div>
                  {/* Cashfree Online Payment Card */}
                  <div
                    className="p-5 rounded-2xl border-2 border-sky-500 bg-sky-50/50 ring-2 ring-sky-500/20 relative"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-sky-500 text-white flex items-center justify-center shadow-xs shrink-0">
                          <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-sm sm:text-base font-bold text-slate-900">100% Secure Online Payment</h3>
                            <span className="text-[10px] font-bold bg-sky-100 text-sky-800 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                              Cashfree
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-1">
                            Pay securely via Instant UPI (Google Pay, PhonePe, Paytm), Credit & Debit Cards, NetBanking, and Wallets.
                          </p>
                        </div>
                      </div>
                      <div className="w-5 h-5 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 mt-3 pt-3 border-t border-sky-200/60 text-[11px] text-slate-600">
                      <span className="flex items-center gap-1.5 font-medium text-sky-900">
                        <Smartphone className="w-3.5 h-3.5 text-sky-600" />
                        <span>Zero Extra Surcharge</span>
                      </span>
                      <span className="flex items-center gap-1.5 font-medium text-emerald-800">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>256-bit Bank Grade Encryption</span>
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-slate-500">Instant Order Confirmation & Dispatch</span>
                    </div>
                  </div>
                </div>

                {/* Delhivery Express Shipping Card */}
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-sky-600" />
                      <span>Doorstep Delivery Method</span>
                    </label>
                    <span className="text-[11px] text-slate-500 font-medium">
                      Dispatched from: Ambawadi, Ahmedabad (380015)
                    </span>
                  </div>

                  {/* Free Delivery Banner Card */}
                  <div className="p-4 sm:p-5 rounded-2xl border-2 border-emerald-500 bg-emerald-50/40 shadow-xs relative">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                          <Truck className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-slate-900 text-sm">Pan-India Insured Courier Delivery</h4>
                            <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-300/80 px-2 py-0.5 rounded-full uppercase tracking-wider">
                              FREE DELIVERY
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">
                            Shipped via Delhivery / BlueDart in heavy-duty moisture-resistant protective roll tubes.
                          </p>
                        </div>
                      </div>
                      <span className="font-extrabold text-sm sm:text-base text-emerald-700 font-mono shrink-0">
                        FREE
                      </span>
                    </div>

                    <div className="mt-3 pt-3 border-t border-emerald-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px]">
                      <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>
                          Estimated Delivery: <strong>{estimatedDelivery?.dateRange ? `${estimatedDelivery.dateRange} (${estimatedDelivery.days || '3 – 5 Days'})` : (estimatedDelivery?.days || '3 – 5 Days')}</strong>
                        </span>
                      </span>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white text-emerald-800 border border-emerald-200 self-start sm:self-auto">
                        {pincode && pincode.length === 6 ? '✓ Serviceable Location' : '✓ 100% Free Doorstep Delivery'}
                      </span>
                    </div>
                  </div>

                  {delhiveryLoading && (
                    <p className="text-[11px] text-sky-700 flex items-center gap-1.5 animate-pulse">
                      <span className="w-3 h-3 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                      <span>Checking PIN code serviceability from Ahmedabad facility...</span>
                    </p>
                  )}
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
                  <div className="flex justify-between items-center text-slate-600">
                    <span className="flex items-center gap-1">
                      <span>Pan-India Delivery</span>
                      {shippingZone && (
                        <span className="text-[10px] bg-sky-100 text-sky-800 font-bold px-1.5 py-0.5 rounded">
                          Zone {shippingZone}
                        </span>
                      )}
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full text-[10px]">
                      FREE
                    </span>
                  </div>

                  {/* Estimated Delivery Time Summary Row */}
                  {estimatedDelivery && pincode && pincode.length === 6 && (
                    <div className="flex justify-between items-center bg-sky-50/70 px-2.5 py-1.5 rounded-xl border border-sky-200/60 text-[11px]">
                      <span className="flex items-center gap-1.5 font-medium text-slate-700">
                        <Calendar className="w-3.5 h-3.5 text-sky-600" />
                        <span>Est. Delivery:</span>
                      </span>
                      <span className="font-bold text-sky-950 font-sans">
                        {estimatedDelivery.dateRange || estimatedDelivery.days}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-slate-600">
                    <span>GST & Packaging</span>
                    <span className="text-slate-500 font-medium">Included</span>
                  </div>
                </div>

                {/* Total Row */}
                <div className="pt-3 border-t border-slate-100 flex justify-between items-end">
                  <div>
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Total Payable</span>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      Free Doorstep Delivery • Incl. all taxes
                    </span>
                  </div>
                  <span className="font-serif font-extrabold text-2xl text-slate-900">
                    ₹{totalPayable.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  disabled={loading || delhiveryLoading}
                  className="w-full bg-sky-500 hover:bg-sky-600 shadow-md shadow-sky-500/25 text-white font-bold py-4 rounded-2xl transition flex items-center justify-center gap-2 group text-base cursor-pointer active:scale-[0.99]"
                >
                  <Lock className="w-5 h-5" />
                  <span>
                    {loading
                      ? 'Opening Cashfree Gateway...'
                      : !user
                      ? 'Sign In with Google to Order'
                      : `Pay ₹${totalPayable.toLocaleString('en-IN')} with Cashfree`}
                  </span>
                </button>

                {/* Trust Badges */}
                <div className="bg-sky-50/60 border border-sky-200/60 rounded-2xl p-3.5 space-y-2 text-[11px] text-slate-600">
                  <div className="flex items-center gap-2 text-sky-900 font-bold">
                    <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Insured Express Courier Packaging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                    <span>Cashfree 100% Encrypted & Safe Gateway (UPI / Cards / NetBanking)</span>
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
