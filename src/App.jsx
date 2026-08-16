import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ShopByThemes from './components/ShopByThemes';
import ShopByRoom from './components/ShopByRoom';
import ProductCard from './components/ProductCard';
import WallpaperCustomizer from './components/WallpaperCustomizer';
import ReelsShowcase from './components/ReelsShowcase';
import AuthModal from './components/AuthModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import UserProfileModal from './components/UserProfileModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import Footer from './components/Footer';
import { INITIAL_WALLPAPERS, getThemeFromSlug, getRoomFromSlug } from './data/wallpapers';
import { Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

function CatalogContent() {
  const [products, setProducts] = useState(INITIAL_WALLPAPERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const { activeCustomizerProduct, setActiveCustomizerProduct, wishlist } = useCart();
  
  const location = useLocation();
  const navigate = useNavigate();
  const { themeSlug, roomSlug, productId } = useParams();

  // Pagination State (10 items per page)
  const ITEMS_PER_PAGE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Auto-open product customizer if accessing /product/:productId directly via URL
  useEffect(() => {
    if (productId && products.length > 0) {
      const found = products.find(p => p.id === productId);
      if (found) setActiveCustomizerProduct(found);
    }
  }, [productId, products]);

  // Determine current active filter from URL path
  let selectedTheme = 'all';
  let selectedRoom = 'all';

  if (location.pathname === '/wishlist') {
    selectedTheme = 'wishlist';
  } else if (location.pathname.startsWith('/category/')) {
    selectedTheme = getThemeFromSlug(themeSlug);
  } else if (location.pathname.startsWith('/room/')) {
    selectedRoom = getRoomFromSlug(roomSlug);
  } else if (location.pathname === '/kids-wallpapers') {
    selectedRoom = 'Kids Room';
  } else if (location.pathname === '/wall-arts') {
    selectedTheme = 'Chinoiserie';
  }

  // Reset pagination when filter or location changes
  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname, selectedTheme, selectedRoom, searchQuery]);

  // Scroll logic when URL changes
  useEffect(() => {
    if (selectedTheme !== 'all' || selectedRoom !== 'all' || location.pathname === '/wishlist') {
      document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, selectedTheme, selectedRoom]);

  // Fetch products directly from backend server API
  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (data.products && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(err => console.log('Using initial products catalog fallback', err));
  }, []);

  // Filtering Logic
  const filteredProducts = products.filter(p => {
    if (selectedTheme === 'wishlist') {
      return wishlist.some(w => w.id === p.id);
    }
    const matchesTheme = selectedTheme === 'all' || p.theme.toLowerCase() === selectedTheme.toLowerCase();
    const matchesRoom = selectedRoom === 'all' || p.room.toLowerCase() === selectedRoom.toLowerCase();
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.theme.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.room.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.code.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTheme && matchesRoom && matchesSearch;
  });

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf8f5]">
      
      {/* Header Navigation */}
      <Header
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* Hero & Category Carousels - standard home features */}
        {selectedTheme === 'all' && selectedRoom === 'all' && !searchQuery && location.pathname === '/' && (
          <>
            <HeroBanner onExplore={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })} />
            <ShopByThemes activeTheme={selectedTheme} />
            <ShopByRoom activeRoom={selectedRoom} />
          </>
        )}

        {/* Catalog Section */}
        <section id="catalog-section" className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-amber-900/10 gap-4">
            <div>
              <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest bg-amber-100/60 px-2.5 py-0.5 rounded">
                {selectedTheme === 'wishlist' ? 'Saved Wallpapers' : 'LIVORA Collection'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1 flex items-center gap-2">
                {selectedTheme === 'wishlist' ? (
                  <>
                    <Heart className="w-6 h-6 text-rose-500 fill-current" />
                    <span>My Saved Wishlist</span>
                  </>
                ) : (
                  <span>
                    {selectedTheme !== 'all' ? `${selectedTheme} Wallpapers` : selectedRoom !== 'all' ? `${selectedRoom} Wallpapers` : 'All Custom Wallpapers'}
                  </span>
                )}
              </h2>
            </div>

            <div className="flex items-center gap-3">
              {location.pathname !== '/' && (
                <Link to="/" className="text-xs font-semibold text-amber-800 hover:underline">
                  ← Back to Home
                </Link>
              )}
              <div className="text-xs font-semibold text-slate-500 bg-white border border-amber-900/10 px-3.5 py-1.5 rounded-full shadow-xs">
                Showing <strong>{totalItems > 0 ? `${startIndex + 1}-${endIndex}` : 0}</strong> of <strong>{totalItems}</strong> Made-to-Order Wallpapers (@ ₹60/sqft)
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-amber-900/10 p-8 space-y-3">
              <Sparkles className="w-10 h-10 text-amber-500 mx-auto" />
              <h3 className="font-serif font-bold text-lg text-slate-800">No wallpapers match your filter</h3>
              <p className="text-xs text-slate-500">Try searching for alternative themes like Pichwai, Tropical, or Room type.</p>
              <Link
                to="/"
                onClick={() => setSearchQuery('')}
                className="inline-block mt-2 text-xs font-bold text-amber-800 underline hover:text-amber-900"
              >
                Reset All Filters & View All
              </Link>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* 10 Items per page Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-amber-900/10">
                  <span className="text-xs text-slate-500 font-medium">
                    Showing <strong>{startIndex + 1}-{endIndex}</strong> of <strong>{totalItems}</strong> wallpapers (Page {currentPage} of {totalPages})
                  </span>

                  <div className="flex items-center flex-wrap justify-center gap-1 sm:gap-1.5 bg-white p-1 rounded-2xl border border-slate-200 shadow-xs max-w-full">
                    {/* Previous Button */}
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                        currentPage === 1
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" /> Previous
                    </button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-xl text-xs font-bold transition flex items-center justify-center cursor-pointer ${
                          pageNum === currentPage
                            ? 'bg-amber-100 text-amber-900 border border-amber-300 font-extrabold shadow-xs'
                            : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    {/* Next Button */}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                        currentPage === totalPages
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer'
                      }`}
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

        </section>

        {/* Customer Reels Video Showcase */}
        {selectedTheme === 'all' && selectedRoom === 'all' && !searchQuery && location.pathname === '/' && (
          <ReelsShowcase />
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Wallpaper Customizer Sq Ft Calculator Modal */}
      {activeCustomizerProduct && (
        <WallpaperCustomizer
          product={activeCustomizerProduct}
          onClose={() => {
            setActiveCustomizerProduct(null);
            if (location.pathname.startsWith('/product/')) navigate('/');
          }}
        />
      )}

      {/* Auth Modal */}
      <AuthModal />

      {/* User Saved Profile & Shipping Address Modal */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* User Unique Orders & Live Tracking Modal */}
      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer />

      {/* Payment Gateway Checkout Modal */}
      <CheckoutModal />

      {/* Order Confirmation Invoice Modal */}
      <OrderSuccessModal />

    </div>
  );
}

function MainCatalogRoutes() {
  return (
    <Routes>
      <Route path="/" element={<CatalogContent />} />
      <Route path="/product/:productId" element={<CatalogContent />} />
      <Route path="/category/:themeSlug" element={<CatalogContent />} />
      <Route path="/room/:roomSlug" element={<CatalogContent />} />
      <Route path="/wishlist" element={<CatalogContent />} />
      <Route path="/kids-wallpapers" element={<CatalogContent />} />
      <Route path="/wall-arts" element={<CatalogContent />} />
      <Route path="*" element={<CatalogContent />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainCatalogRoutes />
      </CartProvider>
    </AuthProvider>
  );
}
