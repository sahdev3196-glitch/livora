import React from 'react';
import { MapPin, X, Navigation, ShieldCheck, Truck, Sparkles } from 'lucide-react';
import { useUserLocation } from '../context/LocationContext';

export default function LocationPermissionModal() {
  const { isPromptOpen, requestLocation, dismissPrompt, loading, error } = useUserLocation();

  if (!isPromptOpen) return null;

  return (
    <aside aria-label="Location Permission" className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-md w-auto animate-fade-in">
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-sky-100/90 ring-1 ring-black/5 relative overflow-hidden">
        
        {/* Decorative Ambient Glow */}
        <div className="absolute -top-10 -right-10 w-28 h-28 bg-sky-400/15 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={dismissPrompt}
          className="absolute top-3.5 right-3.5 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
          title="Dismiss for now"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header with Icon */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-sky-600 text-white flex items-center justify-center shadow-md shadow-sky-500/25 shrink-0 mt-0.5 animate-pulse">
            <MapPin className="w-5 h-5" />
          </div>

          <div className="pr-5">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold text-sky-800 uppercase tracking-widest bg-sky-50 border border-sky-200/60 px-2 py-0.5 rounded-full">
                Service & Availability
              </span>
            </div>
            <h3 className="font-serif font-bold text-base text-slate-900 mt-1">
              Enable Location to Check Availability
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-600 mt-3 leading-relaxed">
          Allow location access to help us serve your area better with accurate delivery estimates and local room design consultation.
        </p>

        {/* Feature Badges */}
        <div className="mt-3.5 pt-3 border-t border-slate-100/80 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <div className="flex items-center gap-1.5 text-sky-700">
            <Truck className="w-3.5 h-3.5" />
            <span>Fast Express Dispatch</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Saved Securely</span>
          </div>
        </div>

        {/* Error message if browser denied */}
        {error && (
          <div className="mt-3 p-2 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-[11px] font-medium">
            {error}
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-4 flex items-center gap-2.5">
          <button
            type="button"
            onClick={requestLocation}
            disabled={loading}
            className="flex-1 bg-sky-500 hover:bg-sky-600 active:scale-[0.98] text-white font-bold py-2.5 px-4 rounded-xl text-xs shadow-md shadow-sky-500/25 transition duration-150 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {loading ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Detecting Location...</span>
              </>
            ) : (
              <>
                <Navigation className="w-3.5 h-3.5" />
                <span>Allow Location</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={dismissPrompt}
            className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition cursor-pointer"
          >
            Maybe Later
          </button>
        </div>

      </div>
    </aside>
  );
}
