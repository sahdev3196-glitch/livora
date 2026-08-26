import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, Mail, Phone, MapPin, ShieldCheck, Save, CheckCircle, CheckCircle2, AlertCircle, ArrowLeft, ChevronRight, Navigation } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useUserLocation } from '../context/LocationContext';
import { verifyAndLookupPincode } from '../utils/pincodeUtils';
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
  const [pincodeLoading, setPincodeLoading] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [saving, setSaving] = useState(false);

  const handlePincodeChange = async (val) => {
    const rawVal = val.replace(/\D/g, '').slice(0, 6);
    setPincode(rawVal);

    if (rawVal.length === 6) {
      setPincodeLoading(true);
      setPincodeStatus(null);
      const res = await verifyAndLookupPincode(rawVal);
      setPincodeLoading(false);
      if (res.valid) {
        if (res.city && !city) setCity(res.city);
        if (res.state) setState(res.state);
        setPincodeStatus({
          valid: true,
          message: res.district ? `✓ Serviced Area: ${res.district}, ${res.state}` : '✓ Valid PIN Code'
        });
      } else {
        setPincodeStatus({
          valid: false,
          message: res.error || 'Invalid Indian postal PIN code'
        });
      }
    } else {
      setPincodeStatus(null);
    }
  };

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
      setAddress(user.address || '');
      setCity(user.city || userLocation?.city || '');
      setState(user.state || userLocation?.state || '');
      if (user.pincode) {
        setPincode(user.pincode);
        if (user.pincode.length === 6) {
          handlePincodeChange(user.pincode);
        }
      } else if (userLocation?.pincode) {
        setPincode(userLocation.pincode);
      }
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
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-700 block">Pincode</label>
                      {pincodeLoading && (
                        <span className="text-[10px] text-sky-600 font-medium flex items-center gap-1">
                          <span className="w-2.5 h-2.5 border-2 border-sky-500 border-t-transparent rounded-full animate-spin" />
                          Verifying...
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 411038"
                      value={pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      className={`w-full px-4 py-2.5 bg-sky-50/30 border rounded-xl text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none transition ${
                        pincodeStatus
                          ? pincodeStatus.valid
                            ? 'border-emerald-400 focus:ring-2 focus:ring-emerald-400 bg-emerald-50/20'
                            : 'border-rose-300 focus:ring-2 focus:ring-rose-400 bg-rose-50/20'
                          : 'border-sky-200/80 focus:ring-2 focus:ring-sky-500'
                      }`}
                    />
                    {pincodeStatus && (
                      <p className={`text-[11px] mt-1.5 font-medium flex items-center gap-1 ${
                        pincodeStatus.valid ? 'text-emerald-700' : 'text-rose-600'
                      }`}>
                        {pincodeStatus.valid ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        )}
                        <span>{pincodeStatus.message}</span>
                      </p>
                    )}
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
