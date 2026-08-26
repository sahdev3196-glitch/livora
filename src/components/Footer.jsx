import React from 'react';
import { Link } from 'react-router-dom';
import { PhoneCall, Mail, MapPin, Sparkles, Shield, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white text-slate-700 border-t border-slate-100 pt-16 pb-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <span className="font-serif text-3xl font-extrabold tracking-widest text-slate-900 block">
              LIVORA
            </span>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              India's premier luxury custom wallpaper studio. We print custom made-to-measure wall murals starting at ₹40/sq.ft with organic inks & multiple paper textures.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-800 font-semibold pt-2">
              <Shield className="w-4 h-4 text-amber-700" /> 100% Quality Assurance
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-slate-900 uppercase tracking-wider">Themes Collection</h4>
            <ul className="space-y-2">
              <li><Link to="/category/pichwai" className="hover:text-amber-900 transition">Pichwai & Temple Art</Link></li>
              <li><Link to="/category/indian-ethnic" className="hover:text-amber-900 transition">Indian Ethnic Heritage</Link></li>
              <li><Link to="/category/tropical" className="hover:text-amber-900 transition">Tropical & Botanicals</Link></li>
              <li><Link to="/category/indian-royal" className="hover:text-amber-900 transition">Indian Royal Palaces</Link></li>
              <li><Link to="/category/chinoiserie" className="hover:text-amber-900 transition">Chinoiserie & Wings</Link></li>
              <li><Link to="/room/kids-room" className="hover:text-amber-900 transition">Kids Educational Maps</Link></li>
            </ul>
          </div>

          {/* Col 3: Customer Policies & Trust */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-slate-900 uppercase tracking-wider">Client Protection</h4>
            <ul className="space-y-2 text-slate-600">
              <li>
                <Link to="/refund-policy" className="text-sky-800 font-bold hover:underline flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>Refund & Reprint Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/shipping-policy" className="hover:text-sky-900 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span>Shipping & Delivery Policy</span>
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-sky-900 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span>Terms & Conditions</span>
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-sky-900 transition flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span>Privacy Policy</span>
                </Link>
              </li>
              <li className="pt-2 text-[11px] text-slate-500 leading-snug">
                Made-to-Measure Guarantee: 100% Free Reprint on Any Printing Defects.
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Help */}
          <div className="space-y-3 text-xs">
            <h4 className="font-serif font-bold text-sm text-slate-900 uppercase tracking-wider">Help & Consultation</h4>
            <div className="space-y-2 text-slate-600">
              <p className="flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-sky-700" />
                <a href="tel:+918005827701" className="hover:text-sky-900 transition">+91 80058 27701</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-700" />
                <a href="mailto:info@livorawallcovering.com" className="hover:text-sky-900 transition">info@livorawallcovering.com</a>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
                <span>Katraj, Pune, Maharashtra - 411046, India</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-slate-100 text-center text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-4 text-slate-500">
            <p>© {new Date().getFullYear()} LIVORA Wallpaper Studio. All Rights Reserved.</p>
            <span className="hidden sm:inline">•</span>
            <Link to="/refund-policy" className="hover:text-sky-800">Refund & Reprint Policy</Link>
            <span>•</span>
            <Link to="/shipping-policy" className="hover:text-sky-800">Shipping Policy</Link>
          </div>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
            <span>for Beautiful Homes</span>
          </div>
        </div>

      </div>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/918005827701"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-40 bg-emerald-600 hover:bg-emerald-700 text-white p-3.5 rounded-full shadow-2xl transition hover:scale-110 flex items-center justify-center border-2 border-white group"
        title="Chat on WhatsApp for custom size assistance"
      >
        <PhoneCall className="w-6 h-6 animate-pulse" />
        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 text-xs font-bold">
          WhatsApp Assistance
        </span>
      </a>
    </footer>
  );
}
