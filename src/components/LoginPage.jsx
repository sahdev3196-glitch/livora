import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation, Link } from 'react-router-dom';
import { Sparkles, ShieldCheck, Package, Ruler, Heart, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

export default function LoginPage() {
  const { user, googleLogin, loading } = useAuth();
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const redirectUrl = searchParams.get('redirect') || location.state?.from || '/';

  // If already logged in, redirect away from login page
  useEffect(() => {
    if (user) {
      navigate(redirectUrl, { replace: true });
    }
  }, [user, navigate, redirectUrl]);

  const handleGoogleSignIn = async () => {
    setError('');
    const res = await googleLogin();
    if (!res.success) {
      if (
        res.code !== 'auth/popup-closed-by-user' &&
        res.code !== 'auth/cancelled-popup-request' &&
        res.error !== 'Sign-in cancelled'
      ) {
        setError(res.error || 'Google Sign-In failed. Please try again.');
      }
    } else {
      navigate(redirectUrl, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800">
      <Header />

      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-16">
        <div className="w-full max-w-md">

          {/* Back to Store link */}
          <div className="mb-4">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Store</span>
            </Link>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 relative">
            
            {/* Top Decorative Brand Header */}
            <div className="bg-gradient-to-b from-sky-50 via-sky-50/40 to-white border-b border-sky-100/70 px-6 pt-8 pb-6 text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-sky-500/10 text-sky-600 mb-3 shadow-inner">
                <Sparkles className="w-7 h-7" />
              </div>
              <span className="font-serif text-3xl font-extrabold tracking-[0.2em] block text-sky-950">
                LIVORA
              </span>
              <p className="text-xs text-slate-500 mt-1 font-medium tracking-wide">
                Luxury Custom Wallpapers & Bespoke Murals
              </p>
            </div>

            {/* Content Area */}
            <div className="p-6 sm:p-8 space-y-6">

              <div className="text-center space-y-1">
                <h1 className="font-serif font-extrabold text-xl sm:text-2xl text-slate-900">
                  Welcome to LIVORA
                </h1>
                <p className="text-xs sm:text-sm text-slate-500">
                  Sign in to customize walls, place orders, and track your shipments.
                </p>
              </div>

              {/* Value Highlights */}
              <div className="space-y-3 bg-slate-50/80 p-4 rounded-2xl border border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                    <Package className="w-3.5 h-3.5" />
                  </div>
                  <span>Track custom wallpaper orders & production status</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <Ruler className="w-3.5 h-3.5" />
                  </div>
                  <span>Save custom wall dimensions & room calculations</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center shrink-0">
                    <Heart className="w-3.5 h-3.5" />
                  </div>
                  <span>Sync wishlist & saved designs across all devices</span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-rose-700 text-xs font-medium flex items-center gap-2.5 animate-shake">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Google 1-Click Login Button */}
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                  className="w-full bg-white hover:bg-slate-50 active:scale-[0.99] text-slate-800 font-bold py-4 px-5 rounded-2xl border-2 border-slate-200 shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-3.5 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
                      <div className="w-4 h-4 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                      <span>Connecting to Google...</span>
                    </div>
                  ) : (
                    <>
                      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                      </svg>
                      <span className="text-sm font-bold text-slate-800">
                        Continue with Google
                      </span>
                    </>
                  )}
                </button>

                {/* Privacy & Security Note */}
                <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium pt-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>100% Free, instant & secure 1-click login</span>
                </div>
              </div>

              {/* Policy agreement */}
              <div className="text-[11px] text-slate-400 text-center leading-relaxed pt-2 border-t border-slate-100">
                By continuing, you agree to LIVORA's{' '}
                <Link to="/terms" className="text-sky-600 hover:underline font-medium">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy-policy" className="text-sky-600 hover:underline font-medium">
                  Privacy Policy
                </Link>
                .
              </div>

            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
