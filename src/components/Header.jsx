import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Heart, ShoppingBag, User, ChevronDown, ChevronRight, PhoneCall, X, Menu } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { THEME_CATEGORIES, ROOM_CATEGORIES } from '../data/wallpapers';

export default function Header({ onSearchChange, searchQuery, onOpenProfile, onOpenOrders }) {
  const { user, setIsAuthOpen, openAuth, logout } = useAuth();
  const { cartItems, wishlist } = useCart();

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openMobileAccordion, setOpenMobileAccordion] = useState(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const totalCartCount = cartItems.length;
  const wishlistCount = wishlist.length;

  return (
    <header className="bg-white sticky top-0 z-40 border-b border-slate-100 shadow-xs relative">
      
      {/* Top Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 flex items-center justify-between relative">
        
        {/* Left: Mobile Hamburger & Desktop Search */}
        <div className="flex items-center gap-2 z-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-1.5 text-slate-800 hover:text-slate-600 transition md:hidden cursor-pointer rounded-lg hover:bg-slate-100 -ml-1"
            title="Open Mobile Navigation"
          >
            <Menu className="w-6 h-6 stroke-[1.75]" />
          </button>

          {/* Desktop Search */}
          <div className="hidden md:block">
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
        </div>

        {/* Center: Brand Logo (Perfect Center Alignment) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-auto z-10">
          <Link
            to="/"
            className="inline-block group"
          >
            <span className="font-serif text-2xl sm:text-4xl font-normal sm:font-light tracking-[0.22em] sm:tracking-[0.25em] text-slate-900 group-hover:text-sky-700 transition">
              LIVORA
            </span>
          </Link>
        </div>

        {/* Right: Mobile Search with Right Margin vs Desktop Full Icons */}
        <div className="flex items-center justify-end z-10">
          
          {/* Mobile Search Button with right margin */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-1.5 text-slate-800 hover:text-slate-600 transition md:hidden cursor-pointer rounded-lg hover:bg-slate-100 mr-2 sm:mr-3"
            title="Search"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Desktop Right Icons (Account, Wishlist, Cart) */}
          <div className="hidden md:flex items-center gap-6 text-slate-800">
            {/* Desktop User Account */}
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
                      className="w-5 h-5 rounded-full object-cover border border-sky-500"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center uppercase shrink-0">
                      {user.name ? user.name.charAt(0) : 'U'}
                    </div>
                  )}
                  <span className="text-xs font-semibold max-w-[90px] truncate">{user.name.split(' ')[0]}</span>
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
                  <Link
                    to="/orders"
                    onClick={() => setUserDropdown(false)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-sky-50 text-slate-700 hover:text-sky-900 font-medium transition border-b border-slate-100"
                  >
                    My Orders & Tracking
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setUserDropdown(false)}
                    className="block w-full text-left px-4 py-2.5 hover:bg-sky-50 text-slate-700 hover:text-sky-900 font-medium transition border-b border-slate-100"
                  >
                    My Profile & Address
                  </Link>
                  <button
                    onClick={() => { logout(); setUserDropdown(false); }}
                    className="w-full text-left px-4 py-2.5 text-rose-600 font-semibold hover:bg-rose-50 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Desktop Wishlist Icon */}
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

            {/* Desktop Cart Icon */}
            <Link
              to="/cart"
              className="p-1.5 rounded-full hover:bg-slate-50 text-slate-800 transition relative cursor-pointer"
              title="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
              {totalCartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

      </div>

      {/* Mobile Search Bar Dropdown (when opened on mobile) */}
      {searchOpen && (
        <div className="md:hidden px-4 pb-3 pt-1 border-t border-slate-100 bg-white animate-fade-in">
          <div className="relative w-full">
            <input
              type="text"
              autoFocus
              placeholder="Search custom wallpapers..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs bg-slate-50 border border-slate-200 rounded-full focus:outline-none focus:ring-1 focus:ring-slate-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <button
              onClick={() => { setSearchOpen(false); onSearchChange(''); }}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

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
                          e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
                        }}
                        className="w-7 h-7 rounded-full object-cover shrink-0 border border-sky-200"
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
                        e.target.src = `${import.meta.env.BASE_URL}crsl.webp`;
                      }}
                      className="w-7 h-7 rounded-lg object-cover shrink-0 border border-sky-200"
                    />
                    <span className="text-xs font-semibold">{r.name} Wallpapers</span>
                  </Link>
                ))}
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
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-start animate-fade-in md:hidden">
          {/* Backdrop dismiss */}
          <div
            className="absolute inset-0"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="relative bg-white w-[82vw] max-w-[320px] h-[100dvh] max-h-[100dvh] shadow-2xl flex flex-col justify-between overflow-hidden z-10">
            
            {/* Header: [X]  [LIVORA]  [Search] [Bag] */}
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1 -ml-1 text-slate-800 hover:text-slate-600 transition cursor-pointer"
                title="Close menu"
              >
                <X className="w-5 h-5 stroke-[1.75]" />
              </button>

              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-block"
              >
                <span className="font-serif text-xl font-normal tracking-[0.2em] text-slate-900">
                  LIVORA
                </span>
              </Link>

              <div className="flex items-center gap-2 -mr-1 text-slate-800">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setSearchOpen(true);
                  }}
                  className="p-1 text-slate-800 hover:text-slate-600 transition cursor-pointer"
                  title="Search"
                >
                  <Search className="w-5 h-5 stroke-[1.75]" />
                </button>
                <Link
                  to="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1 text-slate-800 hover:text-slate-600 transition cursor-pointer relative"
                  title="Shopping Bag"
                >
                  <ShoppingBag className="w-5 h-5 stroke-[1.75]" />
                  {totalCartCount > 0 && (
                    <span className="absolute top-0 right-0 w-4 h-4 bg-sky-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                      {totalCartCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>

            {/* Navigation List (Compact & Scrollable only if needed) */}
            <div className="flex-1 overflow-y-auto divide-y divide-slate-100 text-slate-800">
              
              {/* 1. Shop By Themes */}
              <div>
                <button
                  onClick={() => setOpenMobileAccordion(openMobileAccordion === 'themes' ? null : 'themes')}
                  className="w-full px-4 py-2.5 sm:py-3 flex items-center justify-between hover:bg-slate-50 transition text-left cursor-pointer"
                >
                  <span className="text-sm font-normal text-slate-800">Shop By Themes</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openMobileAccordion === 'themes' ? 'rotate-90 text-slate-700' : ''}`} />
                </button>
                
                {openMobileAccordion === 'themes' && (
                  <div className="bg-slate-50/80 px-4 py-2 space-y-1 border-t border-slate-100 animate-fade-in max-h-48 overflow-y-auto">
                    {THEME_CATEGORIES.map(t => (
                      <Link
                        key={t.id}
                        to={t.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 py-1.5 text-xs font-normal text-slate-700 hover:text-amber-800 transition"
                      >
                        {t.img ? (
                          <img src={t.img} alt={t.name} className="w-4 h-4 rounded-full object-cover shrink-0 border border-slate-200" />
                        ) : (
                          <span className="text-xs">{t.icon || '🎨'}</span>
                        )}
                        <span>{t.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* 2. Shop By Room Type */}
              <div>
                <button
                  onClick={() => setOpenMobileAccordion(openMobileAccordion === 'rooms' ? null : 'rooms')}
                  className="w-full px-4 py-2.5 sm:py-3 flex items-center justify-between hover:bg-slate-50 transition text-left cursor-pointer"
                >
                  <span className="text-sm font-normal text-slate-800">Shop By Room Type</span>
                  <ChevronRight className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${openMobileAccordion === 'rooms' ? 'rotate-90 text-slate-700' : ''}`} />
                </button>
                
                {openMobileAccordion === 'rooms' && (
                  <div className="bg-slate-50/80 px-4 py-2 space-y-1 border-t border-slate-100 animate-fade-in max-h-48 overflow-y-auto">
                    {ROOM_CATEGORIES.map(r => (
                      <Link
                        key={r.id}
                        to={r.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className="flex items-center gap-2.5 py-1.5 text-xs font-normal text-slate-700 hover:text-amber-800 transition"
                      >
                        <img src={r.img} alt={r.name} className="w-4 h-4 rounded-sm object-cover shrink-0 border border-slate-200" />
                        <span>{r.name} Wallpapers</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>


              {/* 4. Wall Arts */}
              <div>
                <Link
                  to="/category/chinoiserie"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-2.5 sm:py-3 flex items-center justify-between hover:bg-slate-50 transition text-left"
                >
                  <span className="text-sm font-normal text-slate-800">Wall Arts</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* 5. My Wishlist */}
              <div>
                <Link
                  to="/wishlist"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-2.5 sm:py-3 flex items-center justify-between hover:bg-slate-50 transition text-left"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-normal text-slate-800">My Wishlist</span>
                    {wishlistCount > 0 && (
                      <span className="px-1.5 py-0.2 bg-amber-100 text-amber-900 text-[11px] font-bold rounded-full">
                        {wishlistCount}
                      </span>
                    )}
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

              {/* 6. Contact Us */}
              <div>
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full px-4 py-2.5 sm:py-3 flex items-center justify-between hover:bg-slate-50 transition text-left"
                >
                  <span className="text-sm font-normal text-slate-800">Contact Us</span>
                </a>
              </div>

            </div>

            {/* Bottom: My Account + Buttons (Always Visible without scroll) */}
            <div className="p-4 pt-3 pb-5 border-t border-slate-100 bg-white shrink-0 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
              <h3 className="text-sm font-bold text-slate-900 mb-2">
                My Account
              </h3>

              {user ? (
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 p-1.5 bg-slate-50 rounded-lg mb-1 border border-slate-100">
                    {user.avatar && !avatarError ? (
                      <img src={user.avatar} alt={user.name} onError={() => setAvatarError(true)} className="w-6 h-6 rounded-full object-cover border border-amber-700" />
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-amber-800 text-white font-bold text-[10px] flex items-center justify-center">
                        {user.name ? user.name.charAt(0) : 'U'}
                      </div>
                    )}
                    <div className="truncate">
                      <p className="text-xs font-bold text-slate-800">{user.name}</p>
                      <p className="text-[10px] text-slate-500 truncate">{user.email}</p>
                    </div>
                  </div>

                  <Link
                    to="/orders"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2 bg-sky-500 hover:bg-sky-600 text-white text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    My Orders & Tracking
                  </Link>
                  <Link
                    to="/profile"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block w-full text-center py-2 bg-white border border-sky-500 text-sky-600 hover:bg-sky-50 text-xs font-semibold rounded-xl transition cursor-pointer"
                  >
                    My Profile & Address
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-1 text-rose-600 hover:bg-rose-50 text-[11px] font-bold rounded-md transition cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuth ? openAuth('login') : setIsAuthOpen(true);
                    }}
                    className="w-full py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl shadow-xs transition cursor-pointer text-center"
                  >
                    Log in
                  </button>

                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuth ? openAuth('signup') : setIsAuthOpen(true);
                    }}
                    className="w-full py-2.5 bg-white border border-sky-500 text-sky-600 hover:bg-sky-50 text-sm font-semibold rounded-xl transition cursor-pointer text-center"
                  >
                    Register
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
