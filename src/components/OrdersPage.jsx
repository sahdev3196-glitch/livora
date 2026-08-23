import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Clock, Truck, CheckCircle2, ChevronRight, Download, RefreshCw, AlertCircle, ArrowLeft, ShieldCheck, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

export default function OrdersPage() {
  const { user, token, setIsAuthOpen } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUserOrders();
    } else {
      setLoading(false);
    }
  }, [user]);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      let res = await fetch('/api/user/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok && user) {
        // Fallback query by user ID / email
        res = await fetch(`/api/orders/user/${user.id}?email=${encodeURIComponent(user.email)}`);
      }

      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
        if (data.orders.length > 0) setSelectedOrder(data.orders[0]);
      }
    } catch (err) {
      console.error('Failed to fetch user orders:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/40 flex flex-col font-sans text-slate-800">
      <Header />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-6">
          <Link to="/" className="hover:text-sky-700 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-sky-900 font-bold">My Orders & Tracking</span>
        </nav>

        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/80 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-900 shadow-xs">
              <Package className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-slate-900">
                My Orders & Tracking
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                {user ? `Live wallpaper production status & order history for ${user.email}` : 'Sign in to view your wallpaper orders'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {user && (
              <button
                onClick={fetchUserOrders}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-900 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-3.5 py-2.5 rounded-xl transition cursor-pointer"
                title="Refresh Orders"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
                <span>Refresh</span>
              </button>
            )}

            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 px-4 py-2.5 rounded-xl transition cursor-pointer shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Shop</span>
            </Link>
          </div>
        </div>

        {/* Content Body */}
        {!user ? (
          /* Guest State - Login Prompt */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-xs my-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mx-auto shadow-xs">
              <User className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-slate-900">Sign in to View Your Orders</h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                Log in with your LIVORA account to track custom wallpaper printing status, shipping details, and download tax invoices.
              </p>
            </div>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-3.5 rounded-2xl shadow-md shadow-sky-500/25 transition text-sm cursor-pointer"
            >
              <span>Sign In / Create Account</span>
            </button>
          </div>
        ) : loading ? (
          /* Loading State */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-16 text-center shadow-xs my-8 space-y-3">
            <RefreshCw className="w-8 h-8 animate-spin text-sky-500 mx-auto" />
            <p className="text-sm font-bold text-slate-700">Loading your wallpaper orders...</p>
          </div>
        ) : orders.length === 0 ? (
          /* Empty Orders List */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-14 text-center max-w-lg mx-auto shadow-xs my-8 space-y-5">
            <div className="w-20 h-20 rounded-full bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 mx-auto shadow-xs">
              <Package className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="font-serif font-bold text-xl text-slate-900">No Orders Placed Yet</h2>
              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                You haven't placed any wallpaper orders yet. Explore our designer collection and customize wall dimensions to get started.
              </p>
            </div>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-7 py-3.5 rounded-2xl shadow-md shadow-sky-500/25 transition text-sm cursor-pointer"
            >
              <span>Browse Wallpaper Collection</span>
            </Link>
          </div>
        ) : (
          /* Orders Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Orders List (4 cols) */}
            <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-slate-200/80 shadow-sm space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 pb-3">
                Order History ({orders.length})
              </h3>

              <div className="space-y-2.5 max-h-[65vh] overflow-y-auto pr-1">
                {orders.map((ord) => (
                  <div
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`p-4 rounded-2xl border transition duration-200 flex items-center justify-between cursor-pointer ${
                      selectedOrder?.id === ord.id
                        ? 'border-sky-500 bg-sky-50/60 ring-2 ring-sky-500/20 shadow-xs'
                        : 'border-slate-200/80 hover:border-sky-300 bg-white hover:bg-sky-50/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-900">{ord.id}</span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full">
                          {ord.status || 'PAID'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="text-xs font-serif font-extrabold text-slate-900 mt-1">
                        ₹{ord.totalAmount?.toLocaleString('en-IN')}
                      </p>
                    </div>
                    <ChevronRight className={`w-4 h-4 transition ${selectedOrder?.id === ord.id ? 'text-sky-600 translate-x-1' : 'text-slate-400'}`} />
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Selected Order Details (8 cols) */}
            {selectedOrder && (
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/80 shadow-sm space-y-6">
                
                {/* Order Overview Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
                  <div>
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Order Identifier</span>
                    <h3 className="text-xl font-serif font-extrabold text-slate-900 mt-0.5">{selectedOrder.id}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] text-slate-400 font-bold uppercase tracking-wider block">Express Tracking</span>
                    <p className="text-xs font-mono font-bold text-sky-900 bg-sky-50 border border-sky-200 px-3 py-1 rounded-xl inline-block mt-0.5">
                      {selectedOrder.trackingNumber || 'LIV-TRK-849201'}
                    </p>
                  </div>
                </div>

                {/* Status Stepper */}
                <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-200/60">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Production & Delivery Status</h4>
                  <div className="grid grid-cols-4 gap-2 text-center relative">
                    
                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-full bg-sky-500 text-white mx-auto flex items-center justify-center font-bold text-xs shadow-xs">
                        ✓
                      </div>
                      <p className="text-[11px] font-bold text-slate-900">Order Paid</p>
                      <p className="text-[10px] text-slate-400">Verified</p>
                    </div>

                    <div className="space-y-1">
                      <div className="w-8 h-8 rounded-full bg-sky-500 text-white mx-auto flex items-center justify-center font-bold text-xs shadow-xs">
                        <Clock className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] font-bold text-sky-900">Printing Studio</p>
                      <p className="text-[10px] text-slate-400">Latex 4K Print</p>
                    </div>

                    <div className="space-y-1 opacity-60">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 mx-auto flex items-center justify-center font-bold text-xs">
                        <Truck className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] font-bold text-slate-700">Dispatched</p>
                      <p className="text-[10px] text-slate-400">Express Courier</p>
                    </div>

                    <div className="space-y-1 opacity-60">
                      <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 mx-auto flex items-center justify-center font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" />
                      </div>
                      <p className="text-[11px] font-bold text-slate-700">Delivered</p>
                      <p className="text-[10px] text-slate-400">Ready to Paste</p>
                    </div>

                  </div>
                </div>

                {/* Items List */}
                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Ordered Wallpapers ({selectedOrder.items?.length || 0})</h4>
                  <div className="space-y-3">
                    {selectedOrder.items?.map((item, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200/80 flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.title}
                          onError={(e) => {
                            e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
                          }}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div className="flex-1">
                          <h5 className="text-xs sm:text-sm font-serif font-bold text-slate-900">{item.title}</h5>
                          <div className="flex flex-wrap items-center gap-2 mt-1 text-[11px] text-slate-600">
                            <span className="bg-sky-50 text-sky-900 border border-sky-200 px-2 py-0.5 rounded-md font-medium">
                              Dimensions: {item.widthFt || item.customWidth} × {item.heightFt || item.customHeight}
                            </span>
                            <span className="bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded-md font-medium">
                              Texture: {item.paperOption?.name || item.material || 'Non-Woven Premium'}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-serif font-extrabold text-slate-900">
                            ₹{(item.itemTotal || item.totalPrice || 8900).toLocaleString('en-IN')}
                          </p>
                          <p className="text-[10px] text-slate-400 font-medium">Qty: {item.quantity || 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Shipping Address & Download Invoice */}
                <div className="bg-sky-50/60 p-4 rounded-2xl border border-sky-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold text-sky-900 uppercase tracking-wider block">Shipping Address</span>
                    <p className="text-xs text-slate-700 font-medium mt-0.5">
                      {selectedOrder.customer?.address || selectedOrder.shippingAddress || 'Standard Delivery Address'}
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="bg-sky-500 hover:bg-sky-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-1.5 shrink-0 cursor-pointer shadow-xs shadow-sky-500/20"
                  >
                    <Download className="w-3.5 h-3.5 text-white" />
                    <span>Print Tax Invoice</span>
                  </button>
                </div>

              </div>
            )}

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
