import React, { useState } from 'react';
import { Sparkles, HelpCircle, ChevronDown, Check, Ruler, Truck, ShieldCheck, Palette, Layers, Award } from 'lucide-react';
import { PAPER_OPTIONS } from '../data/wallpapers';

export default function SEOSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'What is the starting price for LIVORA custom wallpapers?',
      a: 'LIVORA custom made-to-order wallpapers start at just ₹40 per square foot for Non Woven Wallpaper, HD PVC Paper, and Self Adhesive Vinyl. Premium options include Non Tearable Feather (₹56/sqft), Texture Canvas & Sandstone (₹96/sqft), Pure Canvas Jointless 122" (₹96/sqft), and Gold Foil (₹88/sqft) with embossed 3D upgrade available.'
    },
    {
      q: 'What is the difference between Regular Print and Embossed 3D Print?',
      a: 'Regular Print delivers a crisp, smooth high-definition matte artwork finish. Embossed 3D Print adds an elevated, tactile relief texture over key artwork motifs for a luxury architectural feel with depth and touchable grandeur.'
    },
    {
      q: 'How do I measure my wall for custom wallpaper printing?',
      a: 'Simply measure the maximum width and maximum height of your wall in inches or centimeters using a measuring tape. We recommend adding 2 inches (5 cm) extra to both width and height for bleed trimming during installation.'
    },
    {
      q: 'Is there a minimum order billing size for custom wallpapers?',
      a: 'Yes, custom wallpapers have a minimum billing size of 12 square feet per mural/panel to cover precision machine setup and eco-latex calibration. If your measured wall area is less than 12 sq ft, billing is calculated at the 12 sq ft minimum.'
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
      a: 'Each wallpaper is printed in sequential numbered vertical drops (or single seamless sheet for Pure Canvas 122") that align seamlessly edge-to-edge. Any local professional wallpaper installer can install it in under 2 hours.'
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
            <h3 className="font-serif font-bold text-base text-slate-900">11 Premium Substrates</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Choose from Non Woven, Feather, Canvas, Jointless 122" Fabric, Vinyl & Gold Foil starting at ₹40/sqft.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900">Pan-India Express</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Insured doorstep express delivery across Pune, Mumbai, Delhi, Bengaluru, and all cities in reinforced tube packaging.
            </p>
          </div>

        </div>

        {/* Paper Texture Comparison Table */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
            <div>
              <span className="text-[11px] font-bold text-sky-900 uppercase tracking-widest">Transparency & Value</span>
              <h3 className="font-serif font-bold text-xl text-slate-900 mt-0.5">Wallpaper Material Quality & Price Chart</h3>
            </div>
            <span className="text-xs font-semibold text-slate-500">All prices per square foot • Starting at ₹40/sqft</span>
          </div>

          {/* Responsive Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] sm:text-[11px] tracking-wider bg-slate-50/80">
                  <th className="py-3 px-3 text-center w-12">No.</th>
                  <th className="py-3 px-4">Paper Quality / Substrate</th>
                  <th className="py-3 px-4 text-center">Max Print Area (Width)</th>
                  <th className="py-3 px-4 text-right">Regular Price / Sq.Ft.</th>
                  <th className="py-3 px-4 text-right">Embossed 3D Price / Sq.Ft.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PAPER_OPTIONS.map((paper, index) => (
                  <tr key={paper.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-3.5 px-3 text-center font-mono font-bold text-slate-400">
                      {String(index + 1).padStart(2, '0')}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span>{paper.name}</span>
                        {paper.tag && (
                          <span className="text-[9px] font-bold text-sky-800 bg-sky-50 border border-sky-200 px-2 py-0.2 rounded-full">
                            {paper.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-slate-500 font-normal mt-0.5">{paper.description}</p>
                    </td>
                    <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-700">
                      {paper.width}
                    </td>
                    <td className="py-3.5 px-4 text-right font-serif font-extrabold text-slate-900">
                      ₹{paper.regularPrice}
                    </td>
                    <td className="py-3.5 px-4 text-right font-serif font-extrabold text-sky-900">
                      {paper.hasEmbossed ? `₹${paper.embossedPrice}` : <span className="text-slate-300 font-sans font-normal">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
