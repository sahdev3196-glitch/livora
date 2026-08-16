import React from 'react';
import { CheckCircle2, Sparkles, PackageCheck, PhoneCall, Download } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderSuccessModal() {
  const { orderSuccess, setOrderSuccess } = useCart();

  if (!orderSuccess) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-white/50 text-center p-6 space-y-6">
        
        {/* Animated Check */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Payment Successful
          </span>
          <h2 className="text-2xl font-serif font-bold text-slate-950">
            Thank You For Ordering!
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Your custom wallpaper order has been placed & sent to production.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Order ID:</span>
            <span className="font-bold text-amber-900">{orderSuccess.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Total Paid:</span>
            <span className="font-extrabold text-slate-900">₹{orderSuccess.totalAmount?.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Estimated Delivery:</span>
            <span className="font-semibold text-emerald-700">3 - 5 Business Days</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={() => setOrderSuccess(null)}
            className="w-full bg-slate-950 hover:bg-amber-900 text-amber-50 font-bold py-3 rounded-xl shadow-lg transition"
          >
            Continue Shopping
          </button>

          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="w-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold py-2.5 rounded-xl border border-emerald-200 transition flex items-center justify-center gap-2 text-xs"
          >
            <PhoneCall className="w-3.5 h-3.5" /> Need Installation Help? Chat on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
