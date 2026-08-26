import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Truck, ShieldCheck, Clock, MapPin, ChevronRight, ArrowLeft, PackageCheck } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function ShippingPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Shipping & Delivery Policy | LIVORA Wallpaper Studio';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-sky-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-900 font-bold">Shipping & Delivery Policy</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shadow-xs shrink-0">
                <Truck className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-900 uppercase tracking-widest bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                  Pan-India Express Logistics
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Shipping & Delivery Policy
                </h1>
              </div>
            </div>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-50 hover:bg-slate-100 border border-slate-200 px-4 py-2 rounded-xl transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Store</span>
            </Link>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-4">
            We deliver premium made-to-measure custom wallpapers across every pin code in India. All orders are packed in heavy-duty moisture-resistant hard tubes to guarantee zero damage during transit.
          </p>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-slate-900">Printing & Dispatch</h3>
              <p className="text-xs text-slate-600">
                Custom precision printing is completed within <strong>24 to 48 hours</strong> of measurement confirmation.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-slate-900">Transit Duration</h3>
              <p className="text-xs text-slate-600">
                Express courier transit takes <strong>3 to 5 business days</strong> depending on your delivery state/city.
              </p>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
              <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-800 flex items-center justify-center font-bold">
                <PackageCheck className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-sm text-slate-900">Express Delivery</h3>
              <p className="text-xs text-slate-600">
                A flat ₹200 express shipping fee is added at checkout for insured, protective roll packaging and doorstep courier delivery across India.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-slate-900">Courier Partners & Real-Time Tracking</h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We partner with India's premier air express logistics providers including <strong>BlueDart, Delhivery, DTDC, and XpressBees</strong>. Once dispatched from our Pune studio, a live consignment tracking number and direct tracking link are shared via WhatsApp and SMS.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
