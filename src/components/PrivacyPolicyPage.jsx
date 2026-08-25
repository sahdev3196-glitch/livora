import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Lock, ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';
import Header from './Header';
import Footer from './Footer';

export default function PrivacyPolicyPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = 'Privacy Policy | LIVORA Wallpaper Studio';
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800">
      <Header />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-sky-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-900 font-bold">Privacy Policy</span>
        </nav>

        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xs mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700 shadow-xs shrink-0">
                <Lock className="w-7 h-7" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-sky-900 uppercase tracking-widest bg-sky-50 border border-sky-200 px-2.5 py-0.5 rounded-full">
                  User Privacy & Data Security
                </span>
                <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
                  Privacy Policy
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
              <h2 className="font-serif font-bold text-base text-slate-900 mb-1">1. Information We Collect</h2>
              <p>
                We only collect basic contact and delivery information (Name, Phone Number, Email, and Delivery Address/Pincode) necessary to process your custom wallpaper orders and coordinate courier logistics.
              </p>
            </div>

            <div>
              <h2 className="font-serif font-bold text-base text-slate-900 mb-1">2. Data Security & Storage</h2>
              <p>
                Your personal details are encrypted and securely stored using enterprise-grade Firebase cloud database protocols. We never sell, rent, or trade customer information to third parties.
              </p>
            </div>

            <div>
              <h2 className="font-serif font-bold text-base text-slate-900 mb-1">3. Contact Us Regarding Your Data</h2>
              <p>
                If you have questions about your account or stored data, contact our data protection team at <strong>info@livorawallcovering.com</strong>.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
