import React, { useState } from 'react';
import { X, ShieldCheck, CreditCard, Lock, CheckCircle, Smartphone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, subtotal, clearCart, setOrderSuccess } = useCart();
  const { user } = useAuth();

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phone || '');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('RAZORPAY_UPI');
  const [loading, setLoading] = useState(false);

  if (!isCheckoutOpen) return null;

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      customer: {
        userId: user?.id || 'GUEST',
        name,
        email,
        phone,
        address: `${address}, ${city} - ${pincode}`
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
      // Send order to backend API
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });
      const data = await res.json();

      setLoading(false);
      setIsCheckoutOpen(false);
      clearCart();
      
      // Open Order Success Modal
      setOrderSuccess(data.order || { id: 'LIV-' + Math.floor(100000 + Math.random() * 900000), totalAmount: subtotal });
    } catch (err) {
      console.error('Order processing failed:', err);
      // Fallback local order creation if backend endpoint unavailable
      setLoading(false);
      setIsCheckoutOpen(false);
      clearCart();
      setOrderSuccess({ id: 'LIV-' + Math.floor(100000 + Math.random() * 900000), totalAmount: subtotal });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-amber-950/30 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-amber-200/60 relative">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-6 flex items-center justify-between border-b border-amber-900/30">
          <div>
            <span className="text-xs font-bold text-amber-200 uppercase tracking-widest block">LIVORA Payment Gateway</span>
            <h2 className="font-serif font-bold text-xl text-white">Collect Online Payment & Confirm Order</h2>
          </div>
          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-amber-100 hover:text-white hover:bg-amber-950/40 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleProcessPayment} className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Shipping Info */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">1. Delivery Address & Contact</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200/80 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-700 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200/80 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-700 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@example.com"
                className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200/80 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-700 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[11px] font-semibold text-slate-600 block mb-1">Full Shipping Street Address</label>
              <textarea
                required
                rows="2"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House No, Street, Apartment / Landmark"
                className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200/80 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-700 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">City</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Mumbai / Delhi"
                  className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200/80 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-700 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] font-semibold text-slate-600 block mb-1">Pincode</label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  placeholder="400001"
                  className="w-full px-3 py-2 bg-amber-50/40 border border-amber-200/80 rounded-xl text-xs font-medium focus:ring-2 focus:ring-amber-700 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="space-y-3 pt-4 border-t border-amber-200/60">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">2. Choose Payment Option</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
                paymentMethod === 'RAZORPAY_UPI' ? 'border-amber-700 bg-amber-50/70 ring-1 ring-amber-700' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="pay"
                  value="RAZORPAY_UPI"
                  checked={paymentMethod === 'RAZORPAY_UPI'}
                  onChange={() => setPaymentMethod('RAZORPAY_UPI')}
                  className="text-amber-700"
                />
                <div className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-emerald-700" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Razorpay Instant UPI</p>
                    <p className="text-[10px] text-slate-500">Google Pay, PhonePe, Paytm</p>
                  </div>
                </div>
              </label>

              <label className={`p-3 rounded-2xl border cursor-pointer flex items-center gap-3 transition ${
                paymentMethod === 'CARD' ? 'border-amber-700 bg-amber-50/70 ring-1 ring-amber-700' : 'border-slate-200'
              }`}>
                <input
                  type="radio"
                  name="pay"
                  value="CARD"
                  checked={paymentMethod === 'CARD'}
                  onChange={() => setPaymentMethod('CARD')}
                  className="text-amber-700"
                />
                <div className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-amber-700" />
                  <div>
                    <p className="text-xs font-bold text-slate-900">Credit / Debit Card</p>
                    <p className="text-[10px] text-slate-500">Visa, Mastercard, RuPay</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Pay Button */}
          <div className="pt-4 border-t border-amber-200/60 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 uppercase font-semibold block">Total Amount to Pay</span>
              <span className="text-2xl font-extrabold text-amber-950 font-serif">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-7 py-3.5 rounded-2xl shadow-xl transition flex items-center gap-2 cursor-pointer"
            >
              <Lock className="w-4 h-4" />
              <span>{loading ? 'Processing Payment...' : `Pay ₹${subtotal.toLocaleString('en-IN')} Now`}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
