import React, { useState } from 'react';
import { Sparkles, HelpCircle, ChevronDown, Check, Ruler, Truck, ShieldCheck, Palette, Layers, Award } from 'lucide-react';
import { PAPER_OPTIONS } from '../data/wallpapers';

export default function SEOSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'What is the starting price for LIVORA custom wallpapers?',
      a: 'LIVORA custom made-to-order wallpapers start at just ₹60 per square foot for our premium Non-Woven Eco Matte texture. Canvas textured is ₹80/sqft, Royal Silk Satin is ₹95/sqft, Seamless Heavy Vinyl is ₹110/sqft, and Peel & Stick DIY is ₹125/sqft with zero hidden charges.'
    },
    {
      q: 'How do I measure my wall for custom wallpaper printing?',
      a: 'Simply measure the maximum width and maximum height of your wall in inches or centimeters using a measuring tape. We recommend adding 2 inches (5 cm) extra to both width and height for bleed trimming during installation.'
    },
    {
      q: 'Are LIVORA wallpapers safe for kids and bedrooms?',
      a: 'Absolutely. We print using 100% organic, non-toxic, odorless eco-latex inks that are Greenguard Gold certified. They emit zero harmful VOCs and are completely safe for babies, children’s rooms, bedrooms, and hospitals.'
    },
    {
      q: 'Do you deliver custom wallpapers to my city in India?',
      a: 'Yes, LIVORA provides insured, express doorstep shipping in sturdy protective packaging across Pune, Mumbai, Delhi NCR, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, and 19,000+ pin codes across India.'
    },
    {
      q: 'How does custom wallpaper installation work?',
      a: 'Each wallpaper is printed in sequential numbered vertical drops that align seamlessly edge-to-edge. Any local professional wallpaper installer can install it in under 2 hours. We also provide full installation support and WhatsApp assistance at +91 80058 27701.'
    }
  ];

  return (
    <section className="bg-slate-50/70 border-t border-slate-200/80 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-extrabold text-sky-900 bg-sky-100/70 border border-sky-300/80 px-3.5 py-1 rounded-full uppercase tracking-widest inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-sky-600 fill-sky-600" />
            LIVORA Quality & Studio Promise
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
            India's Premier Made-to-Measure Custom Wallpaper Studio
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Crafted in Pune with state-of-the-art 4K precision printing, LIVORA transforms ordinary walls into bespoke architectural masterpieces tailored to your exact room dimensions.
          </p>
        </div>

        {/* 4 Feature Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <Ruler className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Custom Dimensions</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              No standard fixed rolls. Every mural is printed to your precise wall height and width with zero pattern distortion.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Eco Organic Inks</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              100% Odorless and non-toxic water-based inks certified safe for kids' playrooms, living rooms, and bedrooms.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">5 Luxury Textures</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose from Non-Woven Matte, Canvas Art, Royal Silk Satin, Seamless Vinyl, and Peel & Stick starting at ₹60/sqft.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Pan-India Express</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Free doorstep express delivery across Pune, Mumbai, Delhi, Bengaluru, and all cities in reinforced tube packaging.
            </p>
          </div>

        </div>

        {/* Paper Texture Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-sky-900 uppercase tracking-widest">Transparency & Value</span>
              <h3 className="font-serif font-bold text-xl text-slate-900 mt-0.5">Wallpaper Material & Price Guide</h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">All prices per square foot (@ ₹60 starting rate)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {PAPER_OPTIONS.map((p) => (
              <div key={p.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700 bg-sky-100/80 px-2 py-0.5 rounded-full inline-block mb-1.5">
                    {p.tag}
                  </span>
                  <h4 className="text-xs font-bold text-slate-900">{p.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-normal">{p.description}</p>
                </div>
                <div className="pt-2 border-t border-slate-200/60 flex items-baseline justify-between">
                  <span className="text-xs text-slate-400 font-medium">Rate:</span>
                  <span className="text-sm font-serif font-extrabold text-slate-900">₹{p.pricePerSqFt}<span className="text-[10px] font-normal text-slate-500">/sqft</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Frequently Asked Questions (Accordion) */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="w-10 h-10 rounded-2xl bg-sky-50 border border-sky-200 text-sky-700 flex items-center justify-center mx-auto">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="font-serif font-extrabold text-xl sm:text-2xl text-slate-900">
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-xs text-slate-500">
              Everything you need to know about customizing and ordering LIVORA wallpapers
            </p>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-slate-100">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between text-left gap-4 font-serif font-bold text-sm sm:text-base text-slate-900 hover:text-sky-700 transition cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${openFaq === idx ? 'rotate-180 text-sky-600' : ''}`} />
                </button>
                {openFaq === idx && (
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2.5 pr-6 animate-fade-in">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
