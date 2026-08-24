import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, Truck, PhoneCall, ArrowRight, PackageCheck, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderSuccessModal() {
  const { orderSuccess, setOrderSuccess } = useCart();

  if (!orderSuccess) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-sky-100 text-center p-6 sm:p-8 space-y-6 relative">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600" />

        {/* Animated Check Icon in Sky Blue */}
        <div className="w-20 h-20 bg-sky-50 text-sky-500 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-sky-500/15 border-2 border-sky-200/80 ring-8 ring-sky-50/60">
          <CheckCircle2 className="w-11 h-11" />
        </div>

        {/* Heading & Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-sky-50 text-sky-800 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5 border border-sky-200/80 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" /> Payment Successful
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
            Thank You For Ordering!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Your custom made-to-measure wallpaper order has been placed & sent to production.
          </p>
        </div>

        {/* Order Details Card in Clean Sky/White */}
        <div className="bg-sky-50/50 rounded-2xl p-4 sm:p-5 border border-sky-200/80 text-left space-y-2.5 text-xs sm:text-sm shadow-xs">
          <div className="flex justify-between items-center pb-2 border-b border-sky-100/80">
            <span className="text-slate-500 font-medium">Order ID:</span>
            <span className="font-bold text-sky-950 font-mono bg-white px-2.5 py-0.5 rounded-lg border border-sky-200/60">
              {orderSuccess.id}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-sky-100/80">
            <span className="text-slate-500 font-medium">Total Paid:</span>
            <span className="font-extrabold text-sky-950 font-serif text-base">
              ₹{orderSuccess.totalAmount?.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-sky-600" /> Estimated Delivery:
            </span>
            <span className="font-bold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-md text-xs">
              7 – 8 Days
            </span>
          </div>
        </div>

        {/* Trust Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Tracking updates & invoice sent to your email</span>
        </div>

        {/* Action Buttons in Sky/White Theme */}
        <div className="space-y-2.5 pt-1">
          <button
            onClick={() => setOrderSuccess(null)}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-2xl shadow-md shadow-sky-500/25 transition cursor-pointer text-sm flex items-center justify-center gap-2 group"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition" />
          </button>

          <a
            href="https://wa.me/918005827701"
            target="_blank"
            rel="noreferrer"
            className="w-full bg-white hover:bg-sky-50/80 text-sky-900 font-bold py-3 rounded-2xl border border-sky-200 transition flex items-center justify-center gap-2 text-xs sm:text-sm shadow-xs"
          >
            <PhoneCall className="w-3.5 h-3.5 text-sky-600" />
            <span>Need Installation Help? Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
}
