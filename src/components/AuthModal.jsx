import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, Phone, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, authTab, login, signup, googleLogin, loading } = useAuth();
  const [tab, setTab] = useState(authTab || 'login'); // 'login' or 'signup'
  
  React.useEffect(() => {
    if (authTab) setTab(authTab);
  }, [authTab, isAuthOpen]);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  if (!isAuthOpen) return null;

  const handleGoogleSignIn = async () => {
    setError('');
    const res = await googleLogin();
    if (!res.success) setError(res.error || 'Google Sign-In failed');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (tab === 'login') {
      const res = await login(email, password);
      if (!res.success) setError(res.error || 'Failed to login');
    } else {
      if (!name) return setError('Please enter your full name');
      const res = await signup(name, email, password, phone);
      if (!res.success) setError(res.error || 'Failed to create account');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/30 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl border border-slate-200/80 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-sky-100/60 transition z-10 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="bg-sky-50/80 border-b border-sky-100 p-6 text-center">
          <span className="font-serif text-2xl font-extrabold tracking-widest block text-sky-900">
            LIVORA
          </span>
          <p className="text-xs text-sky-800/80 mt-1 font-medium">
            {tab === 'login' ? 'Welcome back! Log in to access your orders' : 'Create an account to save custom wall dimensions'}
          </p>

          {/* Tabs */}
          <div className="flex bg-sky-100/70 p-1 rounded-full border border-sky-200/80 mt-4 text-xs font-semibold">
            <button
              onClick={() => { setTab('login'); setError(''); }}
              className={`flex-1 py-2 rounded-full transition cursor-pointer ${tab === 'login' ? 'bg-sky-500 text-white shadow-xs' : 'text-sky-900 hover:text-sky-950'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab('signup'); setError(''); }}
              className={`flex-1 py-2 rounded-full transition cursor-pointer ${tab === 'signup' ? 'bg-sky-500 text-white shadow-xs' : 'text-sky-900 hover:text-sky-950'}`}
            >
              Create Account
            </button>
          </div>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">

          {/* Official Google Sign-In Button */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white hover:bg-sky-50/60 text-slate-800 font-semibold py-3 px-4 rounded-xl border border-slate-200 shadow-xs transition flex items-center justify-center gap-3 cursor-pointer group"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
            <span className="text-xs sm:text-sm">{tab === 'login' ? 'Continue with Google' : 'Sign up with Google'}</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest relative shrink-0">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{error}</span>
            </div>
          )}

          {tab === 'signup' && (
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  placeholder="e.g. Vikram Sharma"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none text-slate-900"
                />
                <UserIcon className="w-4 h-4 text-sky-600 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none text-slate-900"
              />
              <Mail className="w-4 h-4 text-sky-600 absolute left-3 top-3" />
            </div>
          </div>

          {tab === 'signup' && (
            <div>
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Phone Number (Optional)</label>
              <div className="relative">
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none text-slate-900"
                />
                <Phone className="w-4 h-4 text-sky-600 absolute left-3 top-3" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-1">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-sm focus:ring-2 focus:ring-sky-500 focus:border-sky-500 focus:outline-none text-slate-900"
              />
              <Lock className="w-4 h-4 text-sky-600 absolute left-3 top-3" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3.5 rounded-xl shadow-md shadow-sky-500/25 transition duration-200 flex items-center justify-center gap-2 mt-2 cursor-pointer"
          >
            {loading ? (
              <span>Processing...</span>
            ) : (
              <span>{tab === 'login' ? 'Sign In to LIVORA' : 'Create My Account'}</span>
            )}
          </button>
        </form>
        </div>

      </div>
    </div>
  );
}
