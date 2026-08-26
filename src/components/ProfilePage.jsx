import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, ShieldCheck, Save, CheckCircle, ArrowLeft, ChevronRight, Navigation } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUserLocation } from '../context/LocationContext';
import Header from './Header';
import Footer from './Footer';

export default function ProfilePage() {
  const { user, updateUserProfile } = useAuth();
  const { userLocation, requestLocation, loading: geoLoading } = useUserLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || userLocation?.city || '');
      setState(user.state || userLocation?.state || '');
      setPincode(user.pincode || userLocation?.pincode || '');
    } else if (userLocation) {
      setCity(userLocation.city || '');
      setState(userLocation.state || '');
      setPincode(userLocation.pincode || '');
    }
  }, [user, userLocation]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSavedSuccess(false);

    const updated = await updateUserProfile({
      name,
      phone,
      address,
      city,
      state,
      pincode
    });

    setSaving(false);
    if (updated) {
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800">
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-sky-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-900 font-bold">My Profile & Saved Address</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-900 shadow-xs">
              <User className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                My Profile & Saved Address
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Manage your account details and default delivery address stored in LIVORA database
              </p>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl transition cursor-pointer self-start sm:self-auto shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Shop</span>
          </Link>
        </div>

        {/* Form Container */}
        {!user ? (
          /* Guest State - Login Prompt */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-xs my-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mx-auto shadow-xs">
              <User className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-slate-900">Sign in to Access Your Profile</h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Log in with your account to view and update your saved shipping address for faster checkout.
              </p>
            </div>
            <Link
              to="/login?redirect=/profile"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md shadow-sky-500/25 transition text-sm cursor-pointer"
            >
              <span>Sign In / Register</span>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
            
            {savedSuccess && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-fade-in shadow-xs">
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Profile details & shipping address saved successfully to LIVORA database!</span>
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-5">
              
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Personal Information
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Full Name</label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full pl-10 pr-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                      <User className="w-4 h-4 text-sky-600 absolute left-3 top-3" />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Email Address</label>
                    <div className="relative">
                      <input
                        type="email"
                        disabled
                        value={email}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-500 cursor-not-allowed"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Mobile Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <Phone className="w-4 h-4 text-sky-600 absolute left-3 top-3" />
                  </div>
                </div>
              </div>

              {/* Saved Shipping Address */}
              <div className="space-y-4 pt-4 border-t border-slate-100">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 pb-2">
                  Default Shipping Address
                </h3>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Flat, House No., Building, Street Address</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="e.g. Flat 402, Royal Palms, MG Road"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                    <MapPin className="w-4 h-4 text-sky-600 absolute left-3 top-3" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">City</label>
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">State</label>
                    <input
                      type="text"
                      placeholder="State"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-slate-700 block mb-1">Pincode</label>
                    <input
                      type="text"
                      placeholder="Pincode"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      className="w-full px-4 py-2.5 bg-sky-50/30 border border-sky-200/80 rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Action */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md shadow-sky-500/25 transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>{saving ? 'Saving to Database...' : 'Save Profile & Address'}</span>
                </button>
              </div>

            </form>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
