import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { LocationProvider } from './context/LocationContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import ShopByThemes from './components/ShopByThemes';
import ShopByRoom from './components/ShopByRoom';
import ProductCard from './components/ProductCard';
import ReelsShowcase from './components/ReelsShowcase';
import LocationPermissionModal from './components/LocationPermissionModal';
import OrderSuccessModal from './components/OrderSuccessModal';
import SEOSection from './components/SEOSection';
import Footer from './components/Footer';
import { INITIAL_WALLPAPERS, getThemeFromSlug, getRoomFromSlug } from './data/wallpapers';
import { Sparkles, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

// Dynamic Route-Based Code Splitting for Ultra-Fast Initial Page Loads
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'));
const CartPage = lazy(() => import('./components/CartPage'));
const CheckoutPage = lazy(() => import('./components/CheckoutPage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const OrdersPage = lazy(() => import('./components/OrdersPage'));
const ProfilePage = lazy(() => import('./components/ProfilePage'));
const RefundPolicyPage = lazy(() => import('./components/RefundPolicyPage'));
const ShippingPolicyPage = lazy(() => import('./components/ShippingPolicyPage'));
const TermsPolicyPage = lazy(() => import('./components/TermsPolicyPage'));
const PrivacyPolicyPage = lazy(() => import('./components/PrivacyPolicyPage'));

// Luxury Loading Suspense Fallback
function PageLoadingSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/50 flex flex-col items-center justify-center p-6 animate-fade-in">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-3 border-sky-500 border-t-transparent rounded-full animate-spin" />
        <span className="font-serif text-lg font-bold tracking-widest text-sky-950">LIVORA</span>
      </div>
    </div>
  );
}

function CatalogContent() {
  const [products, setProducts] = useState(INITIAL_WALLPAPERS);
  const [searchQuery, setSearchQuery] = useState('');
  const { wishlist } = useCart();
  const { user } = useAuth();
  
  const location = useLocation();
  const navigate = useNavigate();
  const { themeSlug, roomSlug } = useParams();

  // Determine current active filter from URL path
  let selectedTheme = 'all';
  let selectedRoom = 'all';

  if (location.pathname === '/wishlist') {
    selectedTheme = 'wishlist';
  } else if (themeSlug) {
    selectedTheme = getThemeFromSlug(themeSlug);
  } else if (roomSlug) {
    selectedRoom = getRoomFromSlug(roomSlug);
  } else if (location.pathname === '/kids-wallpapers') {
    selectedTheme = 'Kids Wallpapers';
  }

  // 5 items for "All Custom Wallpapers" (1 from each folder), 15 items per page for specific category pages
  const isAllView = selectedTheme === 'all' && selectedRoom === 'all' && !searchQuery;
  const ITEMS_PER_PAGE = isAllView ? 5 : 15;
  const [currentPage, setCurrentPage] = useState(1);

  // Reset pagination when filter or location changes
  useEffect(() => {
    setCurrentPage(1);
  }, [location.pathname, themeSlug, roomSlug, searchQuery]);

  // Scroll logic when URL changes
  useEffect(() => {
    if (selectedTheme !== 'all' || selectedRoom !== 'all' || location.pathname === '/wishlist') {
      setTimeout(() => {
        document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
      }, 50);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname, selectedTheme, selectedRoom]);

  // Dynamic SEO Title and Description Manager
  useEffect(() => {
    let title = 'LIVORA — Premium Custom Wallpapers starting at ₹40/sqft | Buy Online India';
    let desc = 'Transform your walls with LIVORA made-to-measure custom wallpapers & murals starting at ₹40/sqft. Premium textures, Pichwai, Tropical, Boho, Kids designs with PAN India delivery.';

    if (selectedTheme !== 'all' && selectedTheme !== 'wishlist') {
      title = `${selectedTheme} Custom Wallpapers starting at ₹40/sqft | LIVORA`;
      desc = `Explore handcrafted ${selectedTheme} custom made-to-measure wallpapers and murals. Premium organic prints for your walls with pan-India express shipping.`;
    } else if (selectedRoom !== 'all') {
      title = `${selectedRoom} Wallpaper Designs | Made-to-Measure Murals | LIVORA`;
      desc = `Bespoke wallpaper collection for ${selectedRoom}. Customize wall dimensions, choose from 11 luxury textures with eco-certified inks.`;
    } else if (location.pathname === '/wishlist') {
      title = 'My Saved Wallpapers | LIVORA Wishlist';
    }

    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', desc);
  }, [selectedTheme, selectedRoom, location.pathname]);

  // Products catalog fetch with local data fallback
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    if (apiUrl) {
      fetch(`${apiUrl}/api/products`)
        .then(res => res.json())
        .then(data => {
          if (data.products && data.products.length >= INITIAL_WALLPAPERS.length) {
            setProducts(data.products);
          }
        })
        .catch(() => {});
    }
  }, []);

  // Filtering Logic
  const filteredProducts = (products || INITIAL_WALLPAPERS).filter(p => {
    if (!p) return false;
    if (selectedTheme === 'wishlist') {
      return wishlist.some(w => w.id === p.id);
    }
    const cleanFilter = (selectedTheme || 'all').toLowerCase().replace(/[\s\-_&]+/g, '');
    const cleanProductTheme = (p.theme || '').toLowerCase().replace(/[\s\-_&]+/g, '');
    const matchesTheme = cleanFilter === 'all' || cleanProductTheme === cleanFilter;

    const cleanRoomFilter = (selectedRoom || 'all').toLowerCase().replace(/[\s\-_&]+/g, '');
    const cleanProductRoom = (p.room || '').toLowerCase().replace(/[\s\-_&]+/g, '');
    const matchesRoom = cleanRoomFilter === 'all' || cleanProductRoom === cleanRoomFilter;

    const q = (searchQuery || '').toLowerCase().trim();
    const matchesSearch = !q || 
      (p.title && p.title.toLowerCase().includes(q)) || 
      (p.theme && p.theme.toLowerCase().includes(q)) || 
      (p.room && p.room.toLowerCase().includes(q)) || 
      (p.code && p.code.toLowerCase().includes(q));

    return matchesTheme && matchesRoom && matchesSearch;
  });

  // Pagination calculations
  const totalItems = filteredProducts.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + ITEMS_PER_PAGE, totalItems);
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      
      {/* Header Navigation */}
      <Header
        onSearchChange={setSearchQuery}
        searchQuery={searchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 bg-white">
        
        {/* Hero Banner & Features on Main Homepage */}
        {selectedTheme === 'all' && selectedRoom === 'all' && !searchQuery && location.pathname === '/' && (
          <HeroBanner onExplore={() => document.getElementById('catalog-section')?.scrollIntoView({ behavior: 'smooth' })} />
        )}

        {/* Shop By Themes Bar */}
        <ShopByThemes activeTheme={selectedTheme} />

        {selectedTheme === 'all' && selectedRoom === 'all' && !searchQuery && location.pathname === '/' && (
          <>
            <ReelsShowcase />
            <ShopByRoom activeRoom={selectedRoom} />
          </>
        )}

        {/* Catalog Section */}
        <section id="catalog-section" className="py-12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 bg-white">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 pb-4 border-b border-slate-100 gap-4">
            <div>
              <span className="text-[11px] font-bold text-sky-900 uppercase tracking-widest bg-sky-50 border border-sky-200/80 px-2.5 py-0.5 rounded-full">
                {selectedTheme === 'wishlist' ? 'Saved Wallpapers' : 'LIVORA Collection'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 mt-1.5 flex items-center gap-2">
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
                <Link to="/" className="text-xs font-semibold text-sky-700 hover:underline">
                  ← Back to Home
                </Link>
              )}
              <div className="text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-3.5 py-1.5 rounded-full shadow-xs">
                Showing <strong>{totalItems > 0 ? `${startIndex + 1}-${endIndex}` : 0}</strong> of <strong>{totalItems}</strong> Made-to-Order Wallpapers (@ ₹40/sqft)
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {paginatedProducts.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 p-8 space-y-4 max-w-lg mx-auto shadow-xs my-6">
              {selectedTheme === 'wishlist' ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500 mx-auto shadow-xs">
                    <Heart className="w-8 h-8 fill-rose-500/20" />
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="font-serif font-bold text-xl text-slate-900">
                      {!user ? 'Sign in to view your wishlist' : 'Your Wishlist is empty'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {!user
                        ? 'Your saved wishlist designs are linked to your account in our database. Sign in with Google to view and manage them.'
                        : 'Explore our catalog and click the heart icon on any bespoke wallpaper design to save it here.'}
                    </p>
                  </div>
                  <div className="pt-2">
                    {!user ? (
                      <Link
                        to="/login?redirect=/wishlist"
                        className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-7 py-3 rounded-2xl shadow-md shadow-sky-500/25 transition text-sm cursor-pointer"
                      >
                        <span>Sign In with Google</span>
                      </Link>
                    ) : (
                      <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 bg-sky-500 hover:bg-sky-600 text-white font-bold px-7 py-3 rounded-2xl shadow-md shadow-sky-500/25 transition text-sm cursor-pointer"
                      >
                        <span>Explore Wallpaper Catalog</span>
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <Sparkles className="w-10 h-10 text-emerald-500 mx-auto" />
                  <h3 className="font-serif font-bold text-lg text-slate-800">No wallpapers match your filter</h3>
                  <p className="text-xs text-slate-500">Try searching for alternative themes like Pichwai, Tropical, or Room type.</p>
                  <Link
                    to="/"
                    onClick={() => setSearchQuery('')}
                    className="inline-block mt-2 text-xs font-bold text-emerald-800 underline hover:text-emerald-900"
                  >
                    Reset All Filters & View All
                  </Link>
                </>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 lg:gap-6">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Smart Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-100">
                  <div className="text-xs text-slate-500 font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-sky-500" />
                    <span>
                      Showing <strong>{startIndex + 1}–{endIndex}</strong> of <strong>{totalItems}</strong> wallpapers • Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
                    </span>
                  </div>

                  <nav className="inline-flex items-center gap-1 sm:gap-1.5 bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm" aria-label="Pagination Navigation">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                        currentPage === 1
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-sky-50 hover:text-sky-900 cursor-pointer active:scale-95'
                      }`}
                      title="Previous Page"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span className="hidden sm:inline">Prev</span>
                    </button>

                    {(() => {
                      let pages = [];
                      if (totalPages <= 7) {
                        pages = Array.from({ length: totalPages }, (_, i) => i + 1);
                      } else if (currentPage <= 4) {
                        pages = [1, 2, 3, 4, 5, '...', totalPages];
                      } else if (currentPage >= totalPages - 3) {
                        pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                      } else {
                        pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
                      }

                      return pages.map((page, idx) => {
                        if (page === '...') {
                          return (
                            <span
                              key={`ellipsis-${idx}`}
                              className="w-7 sm:w-8 h-9 flex items-center justify-center text-xs font-bold text-slate-400 select-none tracking-widest"
                            >
                              •••
                            </span>
                          );
                        }

                        const isActive = page === currentPage;
                        return (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`w-8 sm:w-9 h-8 sm:h-9 rounded-xl text-xs transition flex items-center justify-center cursor-pointer ${
                              isActive
                                ? 'bg-sky-500 text-white font-extrabold shadow-md shadow-sky-500/25 ring-2 ring-sky-400/30'
                                : 'text-slate-700 font-bold hover:bg-sky-50 hover:text-sky-900'
                            }`}
                            aria-current={isActive ? 'page' : undefined}
                          >
                            {page}
                          </button>
                        );
                      });
                    })()}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-3 sm:px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                        currentPage === totalPages
                          ? 'text-slate-300 cursor-not-allowed'
                          : 'text-slate-700 hover:bg-sky-50 hover:text-sky-900 cursor-pointer active:scale-95'
                      }`}
                      title="Next Page"
                    >
                      <span className="hidden sm:inline">Next</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </nav>
                </div>
              )}
            </>
          )}

        </section>

        {/* Rich SEO & FAQ Section on Homepage */}
        {selectedTheme === 'all' && selectedRoom === 'all' && !searchQuery && location.pathname === '/' && (
          <SEOSection />
        )}

      </main>

      {/* Footer */}
      <Footer />

      {/* Order Confirmation Invoice Modal */}
      <OrderSuccessModal />

    </div>
  );
}

function MainCatalogRoutes() {
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <Routes>
        <Route path="/" element={<CatalogContent />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/refund-policy" element={<RefundPolicyPage />} />
        <Route path="/shipping-policy" element={<ShippingPolicyPage />} />
        <Route path="/terms" element={<TermsPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsPolicyPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/category/:themeSlug" element={<CatalogContent />} />
        <Route path="/room/:roomSlug" element={<CatalogContent />} />
        <Route path="/wishlist" element={<CatalogContent />} />
        <Route path="/kids-wallpapers" element={<CatalogContent />} />
        <Route path="/wall-arts" element={<CatalogContent />} />
        <Route path="*" element={<CatalogContent />} />
      </Routes>
    </Suspense>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LocationProvider>
          <MainCatalogRoutes />
          <LocationPermissionModal />
        </LocationProvider>
      </CartProvider>
    </AuthProvider>
  );
}
