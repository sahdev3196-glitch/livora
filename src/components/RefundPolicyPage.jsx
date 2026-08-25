import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, RefreshCw, AlertCircle, PhoneCall, Mail, CheckCircle2, ChevronRight, ArrowLeft, Sparkles, Truck } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function RefundPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Refund & Reprint Policy — Custom Made Wallpapers | LIVORA';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-sky-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-900 font-bold">Refund & Cancellation Policy</span>
        </nav>

        {/* Hero Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shadow-xs shrink-0">
                <RefreshCw className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-900 uppercase tracking-widest bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                  Transparency & Quality Guarantee
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Refund & Free Reprint Policy
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
            At <strong>LIVORA Wallpaper Studio</strong>, each wallpaper mural is custom made-to-measure, precision-printed specifically to your exact wall dimensions, selected texture, and finish. Please review our policy regarding custom orders, printing errors, and free redispatches below.
          </p>
        </div>

        {/* Policy Cards Grid */}
        <div className="space-y-6">

          {/* Section 1: Custom Orders & No Cash Refund Policy */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-slate-900">
                  1. Bespoke Made-to-Measure Custom Orders (No Refund Policy)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2">
                  All wallpaper rolls and wall murals produced by LIVORA are custom printed on demand based on customer-submitted specifications (custom width, height, paper texture, and optional 3D emboss/gold foil finishes).
                </p>
                <div className="mt-3 p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 font-medium space-y-1">
                  <p className="font-bold">⚠️ Important Notice:</p>
                  <p>
                    Because each item is customized exclusively for your wall and cannot be restocked or resold to another client, <strong>we do not accept cancellations, returns, or monetary refunds</strong> once an order has been verified and sent to our printing queue.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: 100% Free Reprint & Redispatch Guarantee */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-sky-400 bg-sky-50/20 shadow-xs space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-sky-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-serif font-bold text-lg text-slate-900">
                    2. Our 100% Free Reprint & Redispatch Guarantee
                  </h2>
                  <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                    Client Protection
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-2">
                  If there is any <strong>printing error, manufacturing defect, or transit damage</strong> caused from our end, we take 100% responsibility and will immediately reprint and redispatch a fresh replacement wallpaper to your address at <strong>ZERO additional cost</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  <div className="p-3.5 bg-white rounded-2xl border border-sky-200 shadow-2xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">Printing Defects Covered</p>
                      <p className="text-slate-500 mt-0.5">Ink streaks, color banding, missing roll panels, or print blurriness.</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-2xl border border-sky-200 shadow-2xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">Wrong Size or Substrate</p>
                      <p className="text-slate-500 mt-0.5">Dimensions or texture dispatched differently from the approved order specs.</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-2xl border border-sky-200 shadow-2xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">Courier Transit Damage</p>
                      <p className="text-slate-500 mt-0.5">Crushed packaging, torn rolls, or moisture damage during transit.</p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-white rounded-2xl border border-sky-200 shadow-2xs flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-bold text-slate-900">Express Priority Reprint</p>
                      <p className="text-slate-500 mt-0.5">Reprinted rolls are fast-tracked within 24–48 hours for immediate dispatch.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: How to Request a Redispatch */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
            <h2 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-sky-600" />
              <span>3. Easy 3-Step Process for Reprint / Redispatch</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-7 h-7 rounded-full bg-sky-900 text-white text-xs font-bold flex items-center justify-center mb-2">1</span>
                <h4 className="font-bold text-xs text-slate-900">Notify within 48 Hours</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Inspect the rolls upon delivery and notify our team within 48 hours of receipt.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-7 h-7 rounded-full bg-sky-900 text-white text-xs font-bold flex items-center justify-center mb-2">2</span>
                <h4 className="font-bold text-xs text-slate-900">Share Photos / Video</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Send high-resolution photos or a quick unboxing video showing the defect via WhatsApp or Email.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="w-7 h-7 rounded-full bg-sky-900 text-white text-xs font-bold flex items-center justify-center mb-2">3</span>
                <h4 className="font-bold text-xs text-slate-900">Instant Redispatch</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  Our quality team will verify the claim and dispatch a brand new print with tracking details.
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Contact & WhatsApp Support */}
          <div className="bg-gradient-to-r from-sky-900 to-sky-950 text-white rounded-3xl p-6 sm:p-8 shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h3 className="font-serif font-bold text-lg">Need Assistance with Your Order?</h3>
              <p className="text-xs text-sky-100 max-w-lg">
                Our support team and print specialists are available 7 days a week to ensure your wallpaper installation is flawless.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="https://wa.me/918005827701?text=Hello%20LIVORA,%20I%20have%20a%20question%20about%20my%20wallpaper%20order"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp: +91 80058 27701</span>
              </a>

              <a
                href="mailto:info@livorawallcovering.com"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/20 transition"
              >
                <Mail className="w-4 h-4" />
                <span>Email Support</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
