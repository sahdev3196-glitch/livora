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
    const savedUser = localStorage.getItem('livora_user');
    if (!savedUser) return [];
    const saved = localStorage.getItem('livora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const savedUser = localStorage.getItem('livora_user');
    if (!savedUser) return [];
    const saved = localStorage.getItem('livora_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orderSuccess, setOrderSuccess] = useState(null);

  // 1. Reset on logout (if !userId) or Fetch from Firestore when logged in
  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      setWishlist([]);
      localStorage.removeItem('livora_cart');
      localStorage.removeItem('livora_wishlist');
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

        const cartToSet = Array.isArray(cloudCart) ? cloudCart : [];
        const wishlistToSet = Array.isArray(cloudWishlist) ? cloudWishlist : [];

        setCartItems(cartToSet);
        setWishlist(wishlistToSet);
        localStorage.setItem('livora_cart', JSON.stringify(cartToSet));
        localStorage.setItem('livora_wishlist', JSON.stringify(wishlistToSet));
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

  // 2. Persist Cart changes to localStorage and Firestore ONLY for logged in users
  useEffect(() => {
    if (!userId) return;
    localStorage.setItem('livora_cart', JSON.stringify(cartItems));
    saveUserCartToFirestore(userId, cartItems);
  }, [cartItems, userId]);

  // 3. Persist Wishlist changes to localStorage and Firestore ONLY for logged in users
  useEffect(() => {
    if (!userId) return;
    localStorage.setItem('livora_wishlist', JSON.stringify(wishlist));
    saveUserWishlistToFirestore(userId, wishlist);
  }, [wishlist, userId]);

  const addToCart = (product, customSpecs) => {
    if (!userId) return;
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
    if (!userId) return;
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
    if (!userId) return;
    setCartItems(prev => prev.filter(item => item.cartId !== cartId));
  };

  const toggleWishlist = (product) => {
    if (!userId) return;
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
    if (!userId) return false;
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


