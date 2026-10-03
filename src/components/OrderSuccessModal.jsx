import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, Truck, PhoneCall, ArrowRight, PackageCheck, ShieldCheck, ExternalLink, Banknote, Calendar } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderSuccessModal() {
  const { orderSuccess, setOrderSuccess } = useCart();

  if (!orderSuccess) return null;

  const isCod = orderSuccess.payment?.method === 'COD' || orderSuccess.paymentMethod === 'COD';
  const trackingNo = orderSuccess.trackingNumber || orderSuccess.logistics?.waybill || orderSuccess.logistics?.trackingNumber;
  const trackingUrl = orderSuccess.logistics?.trackingUrl || (trackingNo ? `https://www.delhivery.com/track/package/${trackingNo}` : null);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-sky-100 text-center p-6 sm:p-8 space-y-6 relative">
        
        {/* Decorative Top Accent */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-sky-400 via-sky-500 to-blue-600" />

        {/* Animated Check Icon */}
        <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto shadow-lg border-2 ring-8 bg-sky-50 text-sky-500 border-sky-200/80 ring-sky-50/60 shadow-sky-500/15">
          <CheckCircle2 className="w-11 h-11" />
        </div>

        {/* Heading & Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2.5 border shadow-2xs bg-sky-50 text-sky-800 border-sky-200/80">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" /> Payment Successful
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-extrabold text-slate-900">
            Thank You For Ordering!
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Your custom made-to-measure wallpaper order has been confirmed & sent to production.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-sky-50/50 rounded-2xl p-4 sm:p-5 border border-sky-200/80 text-left space-y-2.5 text-xs sm:text-sm shadow-xs">
          <div className="flex justify-between items-center pb-2 border-b border-sky-100/80">
            <span className="text-slate-500 font-medium">Order ID:</span>
            <span className="font-bold text-sky-950 font-mono bg-white px-2.5 py-0.5 rounded-lg border border-sky-200/60">
              {orderSuccess.id}
            </span>
          </div>

          <div className="flex justify-between items-center pb-2 border-b border-sky-100/80">
            <span className="text-slate-500 font-medium">{isCod ? 'Payable on Delivery:' : 'Total Paid:'}</span>
            <span className="font-extrabold text-sky-950 font-serif text-base">
              ₹{orderSuccess.totalAmount?.toLocaleString('en-IN')}
            </span>
          </div>

          {/* Delhivery Tracking Consignment Details */}
          {trackingNo && (
            <div className="flex flex-col gap-1 pb-2 border-b border-sky-100/80">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5 text-sky-600" /> Delhivery Express:
                </span>
                <span className="font-mono font-bold text-slate-800 text-[11px] bg-white px-2 py-0.5 rounded border border-slate-200">
                  {trackingNo}
                </span>
              </div>
              {trackingUrl && (
                <div className="text-right">
                  <a
                    href={trackingUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-bold text-sky-600 hover:text-sky-700 underline"
                  >
                    <span>Track on Delhivery</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-slate-500 font-medium flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-sky-600" /> Estimated Delivery:
            </span>
            <span className="font-bold text-sky-700 bg-sky-100/80 px-2.5 py-0.5 rounded-md text-xs font-sans">
              {orderSuccess.logistics?.estimatedDeliveryDate
                ? `${orderSuccess.logistics.estimatedDeliveryDate} (${orderSuccess.logistics?.estimatedDays || '3 – 5 Days'})`
                : (orderSuccess.logistics?.estimatedDays || '3 – 5 Days')}
            </span>
          </div>
        </div>

        {/* Trust Note */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500">
          <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
          <span>Tracking updates & invoice dispatched to your phone & email</span>
        </div>

        {/* Action Buttons */}
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
