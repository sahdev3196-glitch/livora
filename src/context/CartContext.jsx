import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('livora_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('livora_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCustomizerProduct, setActiveCustomizerProduct] = useState(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(null);

  useEffect(() => {
    localStorage.setItem('livora_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('livora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToCart = (product, customSpecs) => {
    // customSpecs: { widthFt, heightFt, totalSqFt, paperOption, itemTotal }
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
      itemTotal: customSpecs.itemTotal,
      quantity: 1
    };

    setCartItems(prev => [newItem, ...prev]);
    setActiveCustomizerProduct(null);
    setIsCartOpen(true);
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
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.itemTotal, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        activeCustomizerProduct,
        setActiveCustomizerProduct,
        isCheckoutOpen,
        setIsCheckoutOpen,
        orderSuccess,
        setOrderSuccess,
        addToCart,
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
