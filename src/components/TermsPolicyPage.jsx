import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, ChevronRight, ArrowLeft } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function TermsPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Terms & Conditions | LIVORA Wallpaper Studio';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-sky-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-900 font-bold">Terms & Conditions</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shadow-xs shrink-0">
                <FileText className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-900 uppercase tracking-widest bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                  Terms of Service
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Terms & Conditions
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

          <div className="space-y-6 mt-6 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <div>
              <h2 className="font-serif font-bold text-base text-slate-900 mb-1">1. Custom Made-to-Measure Nature</h2>
              <p>
                All wallpaper products displayed on LIVORA are custom made on demand according to the width, height, and texture selected by the client. Clients are advised to add 2 to 3 inches buffer on width and height to accommodate uneven walls.
              </p>
            </div>

            <div>
              <h2 className="font-serif font-bold text-base text-slate-900 mb-1">2. Color Representation</h2>
              <p>
                Screen displays (RGB) and digital wallpaper print outputs (CMYK with organic UV/Latex inks) may vary slightly depending on monitor calibration and lighting conditions. Minor visual tone variance is normal in high-end printing.
              </p>
            </div>

            <div>
              <h2 className="font-serif font-bold text-base text-slate-900 mb-1">3. Replacements & Errors</h2>
              <p>
                In the event of printing defects or transit damages caused by LIVORA or its courier partners, we will reprint and redispatch a replacement at no extra charge upon receiving photo verification within 48 hours.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
