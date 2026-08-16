import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, ChevronDown, PhoneCall, X, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { THEME_CATEGORIES, ROOM_CATEGORIES } from '../data/wallpapers';

export default function Header({ onSearchChange, searchQuery, onOpenProfile, onOpenOrders }) {
  const { user, setIsAuthOpen, logout } = useAuth();
  const { cartItems, wishlist, setIsCartOpen } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdown, setUserDropdown] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const totalCartCount = cartItems.length;
  const wishlistCount = wishlist.length;

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-slate-100 shadow-xs relative">
      
      {/* Top Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        
        {/* Left: Mobile Hamburger & Search */}
        <div className="flex items-center gap-1 sm:gap-2 flex-1">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 text-slate-800 hover:text-slate-600 transition md:hidden cursor-pointer rounded-lg hover:bg-slate-100"
            title="Open Mobile Navigation"
          >
            <Menu className="w-6 h-6 stroke-[1.5]" />
          </button>

          {searchOpen ? (
            <div className="relative w-full max-w-xs animate-fade-in">
              <input
                type="text"
                autoFocus
                placeholder="Search custom wallpapers..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-slate-400"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <button
                onClick={() => { setSearchOpen(false); onSearchChange(''); }}
                className="absolute right-2.5 top-2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-1.5 text-slate-800 hover:text-slate-600 transition cursor-pointer rounded-lg hover:bg-slate-100"
              title="Search"
            >
              <Search className="w-5 h-5 stroke-[1.5]" />
            </button>
          )}
        </div>

        {/* Center: Brand Logo */}
        <div className="flex-1 text-center">
          <Link
            to="/"
            className="inline-block group"
          >
            <span className="font-serif text-3xl sm:text-4xl font-light tracking-[0.25em] text-slate-900 group-hover:text-amber-800 transition">
              LIVORA
            </span>
          </Link>
        </div>

        {/* Right Icons (Account, Wishlist, Cart) */}
        <div className="flex items-center justify-end gap-4 sm:gap-6 flex-1 text-slate-800">
          
          {/* User Account */}
          <div className="relative">
            {user ? (
              <button
                onClick={() => setUserDropdown(!userDropdown)}
                className="p-1 px-2.5 rounded-full hover:bg-slate-50 text-slate-800 transition flex items-center gap-2 border border-slate-200 cursor-pointer"
                title="Account"
              >
                {user.avatar && !avatarError ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    onError={() => setAvatarError(true)}
                    className="w-5 h-5 rounded-full object-cover border border-amber-700"
                  />
                ) : (
                  <div className="w-5 h-5 rounded-full bg-amber-800 text-amber-50 text-[10px] font-bold flex items-center justify-center uppercase shrink-0">
                    {user.name ? user.name.charAt(0) : 'U'}
                  </div>
                )}
                <span className="text-xs font-semibold max-w-[90px] truncate hidden sm:inline">{user.name.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="p-1.5 rounded-full hover:bg-slate-50 text-slate-800 transition cursor-pointer"
                title="Login / Signup"
              >
                <User className="w-5 h-5 stroke-[1.5]" />
              </button>
            )}

            {userDropdown && user && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50 animate-fade-in text-xs">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="font-bold text-slate-800">{user.name}</p>
                  <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setUserDropdown(false);
                    if (onOpenOrders) onOpenOrders();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-amber-50 text-slate-700 hover:text-amber-900 font-medium transition border-b border-slate-100"
                >
                  My Orders & Tracking
                </button>
                <button
                  onClick={() => {
                    setUserDropdown(false);
                    if (onOpenProfile) onOpenProfile();
                  }}
                  className="w-full text-left px-4 py-2.5 hover:bg-amber-50 text-slate-700 hover:text-amber-900 font-medium transition border-b border-slate-100"
                >
                  My Profile & Address
                </button>
                <button
                  onClick={() => { logout(); setUserDropdown(false); }}
                  className="w-full text-left px-4 py-2.5 text-rose-600 font-semibold hover:bg-rose-50 transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="p-1.5 rounded-full hover:bg-slate-50 text-slate-800 transition relative"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[1.5]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="p-1.5 rounded-full hover:bg-slate-50 text-slate-800 transition relative"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-700 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>

      </div>

      {/* Navigation Links Bar (Desktop Only) */}
      <nav className="border-t border-slate-100 py-1 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-8 text-xs font-semibold text-slate-800 tracking-wide">
          
          {/* Shop By Themes Dropdown */}
          <div className="relative group py-2.5">
            <Link
              to="/"
              className="flex items-center gap-1.5 hover:text-amber-800 text-slate-800 font-semibold transition py-1 cursor-pointer"
            >
              <span>Shop By Themes</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </Link>

            {/* Seamless Hover Dropdown Bridge */}
            <div className="absolute left-0 top-full pt-1 w-64 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-2 font-normal space-y-1">
                {THEME_CATEGORIES.map(t => (
                  <Link
                    key={t.id}
                    to={t.path}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50/80 hover:text-amber-900 transition text-slate-700 font-medium"
                  >
                    {t.img ? (
                      <img
                        src={t.img}
                        alt={t.name}
                        onError={(e) => {
                          e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80';
                        }}
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-amber-700/20"
                      />
                    ) : (
                      <span className="text-base">{t.icon}</span>
                    )}
                    <span className="text-xs font-semibold">{t.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Shop By Room Type Dropdown */}
          <div className="relative group py-2.5">
            <Link
              to="/room/living-room"
              className="flex items-center gap-1.5 hover:text-amber-800 text-slate-800 font-semibold transition py-1 cursor-pointer"
            >
              <span>Shop By Room Type</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </Link>

            <div className="absolute left-0 top-full pt-1 w-60 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-2 font-normal space-y-1">
                {ROOM_CATEGORIES.map(r => (
                  <Link
                    key={r.id}
                    to={r.path}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-amber-50/80 hover:text-amber-900 transition text-slate-700 font-medium"
                  >
                    <img
                      src={r.img}
                      alt={r.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80';
                      }}
                      className="w-7 h-7 rounded-lg object-cover shrink-0 border border-amber-700/20"
                    />
                    <span className="text-xs font-semibold">{r.name} Wallpapers</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Kids Wallpapers Dropdown */}
          <div className="relative group py-2.5">
            <Link
              to="/room/kids-room"
              className="flex items-center gap-1.5 hover:text-amber-800 text-slate-800 font-semibold transition py-1 cursor-pointer"
            >
              <span>Kids Wallpapers</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </Link>

            <div className="absolute left-0 top-full pt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-2 font-normal">
                <Link
                  to="/room/kids-room"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 hover:text-amber-900 transition text-slate-700 font-medium"
                >
                  <span className="text-lg">🎈</span>
                  <div>
                    <p className="font-bold text-xs">Kids Safari & Maps</p>
                    <p className="text-[10px] text-slate-500 font-normal">Playful world maps & animals</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Wall Arts Dropdown */}
          <div className="relative group py-2.5">
            <Link
              to="/category/chinoiserie"
              className="flex items-center gap-1.5 hover:text-amber-800 text-slate-800 font-semibold transition py-1 cursor-pointer"
            >
              <span>Wall Arts</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:rotate-180 transition-transform duration-200" />
            </Link>

            <div className="absolute left-0 top-full pt-1 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <div className="bg-white border border-slate-200/90 rounded-2xl shadow-2xl p-2 font-normal">
                <Link
                  to="/category/chinoiserie"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 hover:text-amber-900 transition text-slate-700 font-medium"
                >
                  <span className="text-lg">🖼️</span>
                  <div>
                    <p className="font-bold text-xs">Chinoiserie Canvas Art</p>
                    <p className="text-[10px] text-slate-500 font-normal">Fine art Mughal & bird murals</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Us */}
          <a
            href="https://wa.me/919876543210"
            target="_blank"
            rel="noreferrer"
            className="hover:text-amber-800 transition py-1 font-semibold"
          >
            Contact Us
          </a>

        </div>
      </nav>

      {/* Slide-Over Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-amber-950/30 backdrop-blur-md flex justify-start animate-fade-in md:hidden">
          <div className="bg-white max-w-xs w-full h-full shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-amber-200/60">
            
            {/* Drawer Header */}
            <div className="p-5 border-b border-amber-200/60 flex items-center justify-between bg-amber-50/40">
              <span className="font-serif text-2xl font-light tracking-[0.2em] text-slate-900">
                LIVORA
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-amber-900 hover:bg-amber-100/60 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Category Links */}
            <div className="p-5 space-y-6 flex-1 overflow-y-auto">
              
              {/* Themes Section */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2.5 bg-amber-100/70 px-2.5 py-1 rounded">
                  Shop By Themes
                </h3>
                <div className="space-y-1.5 text-sm font-medium text-slate-700 pl-2">
                  {THEME_CATEGORIES.map(t => (
                    <Link
                      key={t.id}
                      to={t.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-amber-800 transition py-1 border-b border-slate-50"
                    >
                      {t.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Room Types Section */}
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 mb-2.5 bg-amber-100/70 px-2.5 py-1 rounded">
                  Shop By Room
                </h3>
                <div className="space-y-1.5 text-sm font-medium text-slate-700 pl-2">
                  {ROOM_CATEGORIES.map(r => (
                    <Link
                      key={r.id}
                      to={r.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block hover:text-amber-800 transition py-1 border-b border-slate-50"
                    >
                      {r.name} Wallpapers
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Links */}
              <div className="pt-2 border-t border-slate-100 space-y-2 text-sm font-semibold text-slate-800">
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between hover:text-amber-800 py-1.5"
                >
                  <span>My Wishlist</span>
                  <Heart className="w-4 h-4 text-rose-500 fill-current" />
                </Link>
                
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 py-1.5"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>Contact Studio on WhatsApp</span>
                </a>
              </div>

            </div>

            {/* Drawer Account Footer */}
            <div className="p-5 border-t border-amber-200/60 bg-amber-50/40">
              {user ? (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    {user.avatar && !avatarError ? (
                      <img src={user.avatar} alt={user.name} onError={() => setAvatarError(true)} className="w-7 h-7 rounded-full object-cover border border-amber-700" />
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-amber-800 text-white font-bold text-xs flex items-center justify-center">
                        {user.name ? user.name.charAt(0) : 'U'}
                      </div>
                    )}
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-800">{user.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenOrders) onOpenOrders();
                    }}
                    className="w-full text-center py-2 bg-gradient-to-r from-amber-800 to-amber-900 text-white text-xs font-bold rounded-xl transition mt-2 cursor-pointer shadow-sm"
                  >
                    My Orders & Tracking
                  </button>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      if (onOpenProfile) onOpenProfile();
                    }}
                    className="w-full text-center py-2 bg-white border border-amber-200 hover:bg-amber-50 text-amber-900 text-xs font-bold rounded-xl transition mt-1 cursor-pointer"
                  >
                    My Profile & Address
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsAuthOpen(true);
                  }}
                  className="w-full text-center py-2.5 bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 hover:from-amber-800 hover:to-amber-950 text-white text-xs font-bold rounded-xl shadow-sm transition cursor-pointer"
                >
                  Sign In / Register
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
