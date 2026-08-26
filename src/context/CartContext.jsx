import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useAuth } from './AuthContext';
import { 
  saveUserCartToFirestore, 
  getUserCartFromFirestore, 
  saveUserWishlistToFirestore, 
  getUserWishlistFromFirestore, 
  clearUserCartInFirestore 
} from '../services/firestoreService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const userId = user?.id ? String(user.id) : null;
  const isInitialSyncDone = useRef(false);

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('livora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('livora_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orderSuccess, setOrderSuccess] = useState(null);

  // 1. Fetch & Merge Cart and Wishlist from Firestore whenever user logs in
  useEffect(() => {
    if (!userId) {
      isInitialSyncDone.current = false;
      return;
    }

    let isMounted = true;

    const syncCloudData = async () => {
      try {
        const [cloudCart, cloudWishlist] = await Promise.all([
          getUserCartFromFirestore(userId),
          getUserWishlistFromFirestore(userId)
        ]);

        if (!isMounted) return;

        // Merge Cart: Cloud Cart takes precedence; if local has new items, preserve them
        if (Array.isArray(cloudCart) && cloudCart.length > 0) {
          setCartItems(prev => {
            const localOnly = prev.filter(local => !cloudCart.some(c => c.cartId === local.cartId));
            const merged = [...cloudCart, ...localOnly];
            localStorage.setItem('livora_cart', JSON.stringify(merged));
            return merged;
          });
        } else if (cartItems.length > 0) {
          // If cloud cart was empty but local has items from current session, save to Firestore
          saveUserCartToFirestore(userId, cartItems);
        }

        // Merge Wishlist
        if (Array.isArray(cloudWishlist) && cloudWishlist.length > 0) {
          setWishlist(prev => {
            const localOnly = prev.filter(local => !cloudWishlist.some(c => c.id === local.id));
            const merged = [...cloudWishlist, ...localOnly];
            localStorage.setItem('livora_wishlist', JSON.stringify(merged));
            return merged;
          });
        } else if (wishlist.length > 0) {
          saveUserWishlistToFirestore(userId, wishlist);
        }

        isInitialSyncDone.current = true;
      } catch (err) {
        console.warn("Error syncing cloud cart/wishlist:", err);
      }
    };

    syncCloudData();

    return () => {
      isMounted = false;
    };
  }, [userId]);

  // 2. Persist Cart changes to localStorage and Firestore
  useEffect(() => {
    localStorage.setItem('livora_cart', JSON.stringify(cartItems));
    if (userId) {
      saveUserCartToFirestore(userId, cartItems);
    }
  }, [cartItems, userId]);

  // 3. Persist Wishlist changes to localStorage and Firestore
  useEffect(() => {
    localStorage.setItem('livora_wishlist', JSON.stringify(wishlist));
    if (userId) {
      saveUserWishlistToFirestore(userId, wishlist);
    }
  }, [wishlist, userId]);

  const addToCart = (product, customSpecs) => {
    const baseTotal = customSpecs.itemTotal;
    const newItem = {
      cartId: Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      productId: product.id,
      title: product.title,
      code: product.code,
      image: product.image,
      widthFt: customSpecs.widthFt,
      heightFt: customSpecs.heightFt,
      totalSqFt: customSpecs.totalSqFt,
      paperOption: customSpecs.paperOption,
      pricePerSqFt: customSpecs.paperOption.pricePerSqFt,
      baseItemTotal: baseTotal,
      itemTotal: baseTotal,
      quantity: 1
    };

    setCartItems(prev => [newItem, ...prev]);
  };

  const updateQuantity = (cartId, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = Math.max(1, (item.quantity || 1) + delta);
        const base = item.baseItemTotal || item.itemTotal;
        return {
          ...item,
          baseItemTotal: base,
          quantity: newQty,
          itemTotal: base * newQty
        };
      }
      return item;
    }));
  };

  const removeFromCart = (cartId) => {
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some(item => item.id === productId);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('livora_cart');
    if (userId) {
      clearUserCartInFirestore(userId);
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        orderSuccess,
        setOrderSuccess,
        addToCart,
        updateQuantity,
        removeFromCart,
        toggleWishlist,
        isWishlisted,
        clearCart,
        subtotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);


