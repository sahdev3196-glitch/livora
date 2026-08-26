import { 
  collection, 
  doc, 
  setDoc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp,
  writeBatch
} from "firebase/firestore";
import { db } from "../firebase";
import { getDeviceAndBrowserMetadata } from "../utils/deviceMetadata";

/**
 * =========================================================================
 * 1. COMPREHENSIVE USER PROFILE & TELEMETRY
 * =========================================================================
 */

/**
 * Save or update user profile in Firestore 'users' collection with full device and location metadata
 */
export const syncUserToFirestore = async (user, customLocation = null) => {
  if (!user || !user.id) return null;
  try {
    const deviceMeta = getDeviceAndBrowserMetadata();
    
    // Retrieve stored location from local storage / cookies if not passed
    let locationData = customLocation;
    if (!locationData) {
      try {
        const storedLoc = localStorage.getItem('livora_user_location');
        if (storedLoc) locationData = JSON.parse(storedLoc);
      } catch (e) {}
    }

    const userRef = doc(db, "users", String(user.id));
    const userData = {
      id: String(user.id),
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      avatar: user.avatar || '',
      provider: user.provider || 'email',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      pincode: user.pincode || '',
      preferredPaymentMethod: user.preferredPaymentMethod || 'RAZORPAY',
      updatedAt: serverTimestamp(),
      lastSeen: new Date().toISOString(),

      // Geolocation and Address Details
      location: locationData ? {
        latitude: locationData.latitude || null,
        longitude: locationData.longitude || null,
        accuracy: locationData.accuracy || null,
        city: locationData.city || '',
        state: locationData.state || '',
        country: locationData.country || 'India',
        pincode: locationData.pincode || '',
        formattedAddress: locationData.formattedAddress || '',
        detectedAt: locationData.timestamp || new Date().toISOString()
      } : null,

      // Complete Device, Browser & Hardware Info
      device: {
        deviceType: deviceMeta.deviceType,
        platform: deviceMeta.platform,
        screenResolution: deviceMeta.screenResolution,
        viewportSize: deviceMeta.viewportSize,
        devicePixelRatio: deviceMeta.devicePixelRatio,
        browserLanguage: deviceMeta.language,
        timezone: deviceMeta.timezone,
        userAgent: deviceMeta.userAgent,
        networkType: deviceMeta.networkType
      },

      // Analytics & Acquisition
      analytics: {
        visitorId: deviceMeta.visitorId,
        visitCount: deviceMeta.visitCount,
        firstSeen: deviceMeta.firstSeen,
        referrer: deviceMeta.referrer,
        lastActivePath: deviceMeta.currentPath
      }
    };

    await setDoc(userRef, userData, { merge: true });
    return userData;
  } catch (error) {
    console.warn("Firestore syncUser error:", error);
    return null;
  }
};

/**
 * Save anonymous visitor session with location & device info to 'visitors' collection
 */
export const recordVisitorSession = async (customLocation = null) => {
  try {
    const meta = getDeviceAndBrowserMetadata();
    if (!meta.visitorId) return;

    let locationData = customLocation;
    if (!locationData) {
      try {
        const storedLoc = localStorage.getItem('livora_user_location');
        if (storedLoc) locationData = JSON.parse(storedLoc);
      } catch (e) {}
    }

    const visitorRef = doc(db, "visitors", meta.visitorId);
    const visitorPayload = {
      visitorId: meta.visitorId,
      visitCount: meta.visitCount,
      firstSeen: meta.firstSeen,
      lastSeen: new Date().toISOString(),
      updatedAt: serverTimestamp(),
      referrer: meta.referrer,
      currentPath: meta.currentPath,
      pageUrl: meta.pageUrl,
      
      // Location
      location: locationData ? {
        latitude: locationData.latitude || null,
        longitude: locationData.longitude || null,
        accuracy: locationData.accuracy || null,
        city: locationData.city || '',
        state: locationData.state || '',
        country: locationData.country || 'India',
        pincode: locationData.pincode || '',
        formattedAddress: locationData.formattedAddress || ''
      } : null,

      // Device & Screen details
      device: {
        deviceType: meta.deviceType,
        platform: meta.platform,
        screenResolution: meta.screenResolution,
        viewportSize: meta.viewportSize,
        timezone: meta.timezone,
        language: meta.language,
        userAgent: meta.userAgent,
        networkType: meta.networkType
      }
    };

    await setDoc(visitorRef, visitorPayload, { merge: true });
  } catch (err) {
    // Non-blocking telemetry
    console.warn("Visitor telemetry error:", err);
  }
};

/**
 * Get user profile by userId
 */
export const getUserProfileFromFirestore = async (userId) => {
  if (!userId) return null;
  try {
    const userRef = doc(db, "users", String(userId));
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return snap.data();
    }
    return null;
  } catch (error) {
    console.warn("Firestore getUserProfile error:", error);
    return null;
  }
};

/**
 * =========================================================================
 * 2. CLOUD CART & WISHLIST SYNCHRONIZATION (CROSS-DEVICE)
 * =========================================================================
 */

/**
 * Save user's active cart to Firestore
 */
export const saveUserCartToFirestore = async (userId, cartItems) => {
  if (!userId) return false;
  try {
    const userRef = doc(db, "users", String(userId));
    await setDoc(userRef, { 
      cart: cartItems || [],
      cartUpdatedAt: serverTimestamp() 
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore saveUserCart error:", error);
    return false;
  }
};

/**
 * Fetch user's cart from Firestore
 */
export const getUserCartFromFirestore = async (userId) => {
  if (!userId) return [];
  try {
    const userRef = doc(db, "users", String(userId));
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      return Array.isArray(data.cart) ? data.cart : [];
    }
    return [];
  } catch (error) {
    console.warn("Firestore getUserCart error:", error);
    return [];
  }
};

/**
 * Save user's wishlist to Firestore
 */
export const saveUserWishlistToFirestore = async (userId, wishlist) => {
  if (!userId) return false;
  try {
    const userRef = doc(db, "users", String(userId));
    await setDoc(userRef, { 
      wishlist: wishlist || [],
      wishlistUpdatedAt: serverTimestamp() 
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore saveUserWishlist error:", error);
    return false;
  }
};

/**
 * Fetch user's wishlist from Firestore
 */
export const getUserWishlistFromFirestore = async (userId) => {
  if (!userId) return [];
  try {
    const userRef = doc(db, "users", String(userId));
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      const data = snap.data();
      return Array.isArray(data.wishlist) ? data.wishlist : [];
    }
    return [];
  } catch (error) {
    console.warn("Firestore getUserWishlist error:", error);
    return [];
  }
};

/**
 * Clear user's active cart in Firestore after order completion
 */
export const clearUserCartInFirestore = async (userId) => {
  if (!userId) return false;
  try {
    const userRef = doc(db, "users", String(userId));
    await setDoc(userRef, { 
      cart: [],
      cartClearedAt: serverTimestamp() 
    }, { merge: true });
    return true;
  } catch (error) {
    console.warn("Firestore clearUserCart error:", error);
    return false;
  }
};

/**
 * =========================================================================
 * 2. ORDERS MANAGEMENT
 * =========================================================================
 */

/**
 * Save new Order directly into Firestore 'orders' collection
 */
export const saveOrderToFirestore = async (orderData) => {
  try {
    const meta = getDeviceAndBrowserMetadata();
    const orderId = orderData.id || ('LIV-' + Math.floor(100000 + Math.random() * 900000));
    const orderRef = doc(db, "orders", orderId);

    // Grab current location if available
    let locationData = null;
    try {
      const storedLoc = localStorage.getItem('livora_user_location');
      if (storedLoc) locationData = JSON.parse(storedLoc);
    } catch (e) {}

    const formattedOrder = {
      ...orderData,
      id: orderId,
      createdAt: orderData.createdAt || new Date().toISOString(),
      updatedAt: serverTimestamp(),
      serverCreatedAt: serverTimestamp(),
      status: orderData.status || 'PAID',

      // Embed Device & Geolocation inside Order
      deviceTelemetry: {
        deviceType: meta.deviceType,
        platform: meta.platform,
        screenResolution: meta.screenResolution,
        timezone: meta.timezone,
        language: meta.language,
        userAgent: meta.userAgent
      },
      geoCoordinates: locationData ? {
        latitude: locationData.latitude || null,
        longitude: locationData.longitude || null,
        city: locationData.city || '',
        state: locationData.state || '',
        pincode: locationData.pincode || '',
        formattedAddress: locationData.formattedAddress || ''
      } : null
    };

    await setDoc(orderRef, formattedOrder, { merge: true });
    return { success: true, order: formattedOrder };
  } catch (error) {
    console.error("Firestore saveOrder error:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Fetch orders for a specific user (by userId or user email)
 */
export const getUserOrdersFromFirestore = async (userId, userEmail) => {
  const ordersMap = new Map();

  try {
    // Query by customer.userId
    if (userId) {
      const qUser = query(
        collection(db, "orders"),
        where("customer.userId", "==", String(userId))
      );
      const snap = await getDocs(qUser);
      snap.forEach((doc) => {
        ordersMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
    }

    // Query by customer.email (in case user created orders before login or under email)
    if (userEmail) {
      const qEmail = query(
        collection(db, "orders"),
        where("customer.email", "==", String(userEmail).toLowerCase())
      );
      const snapEmail = await getDocs(qEmail);
      snapEmail.forEach((doc) => {
        ordersMap.set(doc.id, { id: doc.id, ...doc.data() });
      });
    }

    // Sort descending by date
    const ordersList = Array.from(ordersMap.values());
    ordersList.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

    return ordersList;
  } catch (error) {
    console.warn("Firestore getUserOrders error:", error);
    return [];
  }
};

/**
 * =========================================================================
 * 3. PRODUCTS & WALLPAPER CATALOG
 * =========================================================================
 */

/**
 * Fetch all products from Firestore 'products' collection
 */
export const getProductsFromFirestore = async () => {
  try {
    const snap = await getDocs(collection(db, "products"));
    if (snap.empty) return [];
    return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.warn("Firestore getProducts error:", error);
    return [];
  }
};

/**
 * Batch upload products catalog to Firestore (Optional Admin / Seed helper)
 */
export const seedProductsToFirestore = async (products) => {
  if (!products || !products.length) return false;
  try {
    const batch = writeBatch(db);
    products.forEach((product) => {
      const docRef = doc(db, "products", String(product.id || product.code));
      batch.set(docRef, { ...product, updatedAt: serverTimestamp() }, { merge: true });
    });
    await batch.commit();
    return true;
  } catch (error) {
    console.error("Firestore seedProducts error:", error);
    return false;
  }
};
