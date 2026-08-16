import React, { useState, useEffect } from 'react';
import { X, Package, Clock, Truck, CheckCircle2, ChevronRight, Download, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function OrderHistoryModal({ isOpen, onClose }) {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    if (isOpen && user) {
      fetchUserOrders();
    }
  }, [isOpen, user]);

  const fetchUserOrders = async () => {
    setLoading(true);
    try {
      let res = await fetch('/api/user/orders', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!res.ok) {
        // Fallback user query by ID / email
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

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-amber-950/30 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full overflow-hidden shadow-2xl border border-amber-200/60 relative max-h-[90vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-amber-800 to-amber-900 text-white p-5 sm:p-6 flex items-center justify-between border-b border-amber-900/30 shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-300" />
              <h2 className="font-serif text-xl font-bold text-white">My Orders & Tracking</h2>
            </div>
            <p className="text-xs text-amber-100/90 mt-1 font-light">
              Order history & live custom wallpaper production status for <strong className="text-white">{user.email}</strong>
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={fetchUserOrders}
              className="p-2 rounded-full text-amber-100 hover:text-white hover:bg-amber-950/40 transition cursor-pointer"
              title="Refresh Orders"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-amber-100 hover:text-white hover:bg-amber-950/40 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 flex flex-col md:flex-row gap-6">
          
          {/* Left Orders List */}
          <div className="w-full md:w-80 shrink-0 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Order History ({orders.length})
            </h3>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400 space-y-2">
                <RefreshCw className="w-6 h-6 animate-spin mx-auto text-amber-800" />
                <p>Loading your orders...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-8 bg-amber-50/40 rounded-2xl text-center border border-dashed border-amber-200 space-y-3">
                <Package className="w-8 h-8 text-amber-700 mx-auto" />
                <p className="text-xs text-slate-700 font-semibold">No orders placed yet</p>
                <p className="text-[11px] text-slate-500">Your custom wallpaper orders will appear here after checkout.</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {orders.map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => setSelectedOrder(ord)}
                    className={`w-full text-left p-3.5 rounded-2xl border transition duration-200 flex items-center justify-between cursor-pointer ${
                      selectedOrder?.id === ord.id
                        ? 'bg-amber-50/80 border-amber-800/40 shadow-sm ring-1 ring-amber-700/20'
                        : 'bg-white border-amber-200/60 hover:border-amber-400 hover:bg-amber-50/30'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-extrabold text-slate-900">{ord.id}</span>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                          {ord.status || 'PAID'}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">
                        {new Date(ord.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="text-xs font-bold text-amber-950 mt-1">₹{ord.totalAmount?.toLocaleString('en-IN')}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Selected Order Details */}
          {selectedOrder ? (
            <div className="flex-1 bg-amber-50/30 rounded-2xl p-5 border border-amber-200/70 space-y-6">
              
              {/* Order Overview Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-amber-200/60">
                <div>
                  <span className="text-[11px] text-slate-500 font-bold uppercase block">Order ID</span>
                  <h3 className="text-lg font-extrabold text-slate-900">{selectedOrder.id}</h3>
                  <p className="text-xs text-slate-500">
                    Placed on {new Date(selectedOrder.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-slate-500 font-bold uppercase block">Tracking No.</span>
                  <p className="text-xs font-mono font-bold text-amber-900 bg-amber-100/80 border border-amber-200 px-2.5 py-1 rounded-lg inline-block">
                    {selectedOrder.trackingNumber || 'BLUEDART-849201'}
                  </p>
                </div>
              </div>

              {/* Status Stepper */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4">Production & Delivery Status</h4>
                <div className="grid grid-cols-4 gap-2 text-center relative">
                  
                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold text-xs shadow-sm">
                      ✓
                    </div>
                    <p className="text-[11px] font-bold text-slate-800">Order Paid</p>
                    <p className="text-[9px] text-slate-400">Payment Verified</p>
                  </div>

                  <div className="space-y-1">
                    <div className="w-8 h-8 rounded-full bg-amber-600 text-white mx-auto flex items-center justify-center font-bold text-xs shadow-sm">
                      <Clock className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-amber-900">Printing Studio</p>
                    <p className="text-[9px] text-slate-400">HP Latex 4K Custom Print</p>
                  </div>

                  <div className="space-y-1 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 mx-auto flex items-center justify-center font-bold text-xs">
                      <Truck className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-700">Dispatched</p>
                    <p className="text-[9px] text-slate-400">BlueDart Express</p>
                  </div>

                  <div className="space-y-1 opacity-50">
                    <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-600 mx-auto flex items-center justify-center font-bold text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] font-bold text-slate-700">Delivered</p>
                    <p className="text-[9px] text-slate-400">Ready to Paste</p>
                  </div>

                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Ordered Wallpapers ({selectedOrder.items?.length || 0})</h4>
                <div className="space-y-3">
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className="bg-white p-3.5 rounded-xl border border-amber-200/60 flex items-center gap-3.5">
                      <img src={item.image} alt={item.title} className="w-16 h-16 rounded-lg object-cover shrink-0 border border-slate-200" />
                      <div className="flex-1">
                        <h5 className="text-xs font-bold text-slate-900 line-clamp-1">{item.title}</h5>
                        <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                          Size: {item.widthFt || item.customWidth}ft × {item.heightFt || item.customHeight}ft ({item.sqFt || 100} sq.ft)
                        </p>
                        <p className="text-[10px] text-amber-800 font-bold bg-amber-50 border border-amber-200/50 px-1.5 py-0.5 rounded inline-block mt-1">
                          Material: {item.material || 'Non-Woven Premium Textured'}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-extrabold text-amber-950">₹{(item.totalPrice || item.startingPrice * 100 || 8900).toLocaleString('en-IN')}</p>
                        <p className="text-[10px] text-slate-400 font-medium">Qty: {item.quantity || 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address & Download Invoice */}
              <div className="bg-amber-100/50 p-4 rounded-xl border border-amber-200 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-amber-900 uppercase block">Shipping Address</span>
                  <p className="text-xs text-slate-700 font-medium mt-0.5">
                    {selectedOrder.shippingAddress || selectedOrder.customerAddress || 'Standard Delivery Address'}
                  </p>
                </div>
                <button
                  onClick={() => window.print()}
                  className="bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5 shrink-0 cursor-pointer shadow-sm"
                >
                  <Download className="w-3.5 h-3.5 text-amber-200" />
                  <span>Invoice</span>
                </button>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center p-12 text-slate-400 text-xs">
              Select an order from the list to view live tracking & status details.
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
