import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { db } from './database.js';
import { seedDB } from './seed.js';
import cloudinary, { uploadImageToCloudinary, getOptimizedImageUrl } from './cloudinary.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'livora_wallpaper_secret_key_2026';

// Seed initial database
seedDB();


app.use(cors());
app.use(express.json());

// Serve static images directly from server
app.use('/public', express.static(path.resolve('public')));
app.use('/pichwai', express.static(path.resolve('public/pichwai')));
app.use('/Indian Ethnic', express.static(path.resolve('public/Indian Ethnic')));
app.use('/Indian%20Ethnic', express.static(path.resolve('public/Indian Ethnic')));
if (fs.existsSync(path.resolve('pichwai'))) {
  app.use('/pichwai', express.static(path.resolve('pichwai')));
}
if (fs.existsSync(path.resolve('Indian Ethnic'))) {
  app.use('/Indian Ethnic', express.static(path.resolve('Indian Ethnic')));
  app.use('/Indian%20Ethnic', express.static(path.resolve('Indian Ethnic')));
}

// Dedicated server image route
app.get('/api/images/:folder/:filename', (req, res) => {
  const { folder, filename } = req.params;
  const decodedFilename = decodeURIComponent(filename);
  const primaryPath = path.resolve('public', folder, decodedFilename);
  const secondaryPath = path.resolve(folder, decodedFilename);
  
  if (fs.existsSync(primaryPath)) {
    return res.sendFile(primaryPath);
  } else if (fs.existsSync(secondaryPath)) {
    return res.sendFile(secondaryPath);
  }
  
  res.status(404).json({ error: 'Image not found on server' });
});


// Auth Middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// --- AUTH ROUTES ---
app.post('/api/auth/signup', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const existingUser = db.findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'An account with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = db.createUser({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      phone: phone || ''
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      message: 'Account created successfully!',
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Server error creating account' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = db.findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Logged in successfully!',
      token,
      user: { id: user.id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error authenticating' });
  }
});

app.get('/api/user/profile', authenticateToken, (req, res) => {
  const user = db.findUserByEmail(req.user.email);
  if (!user) return res.status(404).json({ error: 'User not found' });
  const { password, ...userProfile } = user;
  res.json({ user: userProfile });
});

app.put('/api/user/profile', authenticateToken, (req, res) => {
  const { name, phone, address, city, state, pincode, location } = req.body;
  const updated = db.updateUser(req.user.email, { name, phone, address, city, state, pincode, location });
  if (updated) {
    const { password, ...userProfile } = updated;
    return res.json({ message: 'Profile updated successfully', user: userProfile });
  }
  res.status(400).json({ error: 'Failed to update profile' });
});

app.put('/api/user/location', (req, res) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    let userEmail = req.body.email;

    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userEmail = decoded.email || userEmail;
      } catch (e) {
        // Continue if decoded or email in body
      }
    }

    if (!userEmail) {
      return res.status(400).json({ error: 'User email or authorization token is required to save location' });
    }

    const { latitude, longitude, city, state, country, pincode, formattedAddress, consent } = req.body;
    
    const locationData = {
      latitude,
      longitude,
      city: city || '',
      state: state || '',
      country: country || '',
      pincode: pincode || '',
      formattedAddress: formattedAddress || '',
      consent: consent !== undefined ? consent : true,
      updatedAt: new Date().toISOString()
    };

    const updatedUser = db.updateUser(userEmail, {
      location: locationData,
      ...(city ? { city } : {}),
      ...(state ? { state } : {}),
      ...(pincode ? { pincode } : {})
    });

    res.json({
      success: true,
      message: 'Location saved to database successfully',
      location: locationData,
      user: { id: updatedUser.id, email: updatedUser.email, name: updatedUser.name }
    });
  } catch (err) {
    console.error('Error saving user location:', err);
    res.status(500).json({ error: 'Failed to save location' });
  }
});

app.post('/api/auth/google', (req, res) => {
  const googleUser = {
    id: 'usr_g_' + Date.now(),
    name: 'Google User',
    email: 'user.google@gmail.com',
    provider: 'google'
  };
  const token = jwt.sign({ id: googleUser.id, email: googleUser.email, name: googleUser.name }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ message: 'Google Sign-In successful', token, user: googleUser });
});

// Auto-discover images inside public subfolders like public/pichwai
function getLocalFolderProducts() {
  const customProducts = [];
  const publicDir = path.resolve('public');
  
  const foldersToScan = [
    { folder: 'pichwai', theme: 'Pichwai', room: 'Temple Room' },
    { folder: 'Pichwai', theme: 'Pichwai', room: 'Temple Room' },
    { folder: 'Indian Ethnic', theme: 'Indian Ethnic', room: 'Living Room' },
    { folder: 'Indian%20Ethnic', theme: 'Indian Ethnic', room: 'Living Room' },
    { folder: 'tropical', theme: 'Tropical', room: 'Living Room' },
    { folder: 'Tropical', theme: 'Tropical', room: 'Living Room' },
    { folder: 'chinoiserie', theme: 'Chinoiserie', room: 'Dining Area' },
    { folder: 'Chinoiserie', theme: 'Chinoiserie', room: 'Dining Area' },
    { folder: 'kids', theme: 'Kids Wallpapers', room: 'Kids Room' },
    { folder: 'Kids', theme: 'Kids Wallpapers', room: 'Kids Room' }
  ];

  foldersToScan.forEach(({ folder, theme, room }) => {
    const dirPath = path.join(publicDir, folder);
    if (fs.existsSync(dirPath)) {
      try {
        const files = fs.readdirSync(dirPath);
        files.forEach((file, idx) => {
          if (/\.(png|jpe?g|webp|svg|gif)$/i.test(file)) {
            const cleanName = file.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
            let formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
            if (/page[-_\s]*\d+/i.test(cleanName)) {
              const match = cleanName.match(/\d+/);
              const pageNum = match ? match[0] : String(idx + 1).padStart(2, '0');
              formattedTitle = `Royal ${theme} Heritage Art - Design ${pageNum}`;
            }

            const encodedFile = encodeURIComponent(file);

            customProducts.push({
              id: `local-${folder}-${idx}`,
              title: formattedTitle,
              code: `LIV-${theme.substring(0, 3).toUpperCase()}-${String(idx + 1).padStart(2, '0')}`,
              startingPrice: 60,
              theme,
              room,
              rating: 4.9,
              reviewsCount: 88 + idx * 4,
              image: `${folder}/${encodedFile}`,
              roomMockup: `${folder}/${encodedFile}`,
              description: `Luxury made-to-measure ${theme} wallpaper mural.`,
              badge: `${theme} Heritage`
            });
          }
        });
      } catch (err) {
        console.error(`Error reading ${folder} folder:`, err);
      }
    }
  });

  return customProducts;
}

// --- CLOUDINARY IMAGE ROUTES ---
app.get('/api/cloudinary/config', (req, res) => {
  res.json({
    cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'nslcfmss',
    apiKey: process.env.CLOUDINARY_API_KEY || '813653695963947',
    uploadPreset: 'livora_wallpapers',
    active: true
  });
});

app.post('/api/cloudinary/upload', async (req, res) => {
  try {
    const { image, folder = 'livora_wallpapers', tags } = req.body;
    if (!image) {
      return res.status(400).json({ error: 'Image file or URL is required' });
    }

    const uploadRes = await uploadImageToCloudinary(image, {
      folder,
      tags: tags ? tags.split(',') : ['livora', 'wallpaper']
    });

    if (!uploadRes.success) {
      return res.status(500).json({ error: uploadRes.error });
    }

    res.json({
      message: 'Image uploaded successfully to Cloudinary!',
      ...uploadRes
    });
  } catch (err) {
    console.error('Cloudinary upload endpoint error:', err);
    res.status(500).json({ error: 'Failed to process image upload' });
  }
});

app.post('/api/cloudinary/signature', (req, res) => {
  try {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = req.body.folder || 'livora_wallpapers';
    
    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET || 'Od8QMCbiqZvd32Wg3mJtX9sI25k'
    );

    res.json({
      timestamp,
      signature,
      apiKey: process.env.CLOUDINARY_API_KEY || '813653695963947',
      cloudName: process.env.CLOUDINARY_CLOUD_NAME || 'nslcfmss',
      folder
    });
  } catch (err) {
    console.error('Error generating signature:', err);
    res.status(500).json({ error: 'Failed to generate signature' });
  }
});

// --- CATALOG ROUTES ---
app.get('/api/products', (req, res) => {
  const dbProducts = db.getProducts();
  const folderProducts = getLocalFolderProducts();
  
  // Combine folder products with base products
  const products = [...folderProducts, ...dbProducts];
  const paperTypes = db.getPaperTypes();
  res.json({ products, paperTypes });
});

// --- PAYMENT & ORDERS ROUTES ---

// --- CASHFREE PAYMENT GATEWAY CONFIGURATION ---
const getCashfreeConfig = () => {
  const appId = process.env.CASHFREE_APP_ID || '';
  const secretKey = process.env.CASHFREE_SECRET_KEY || '';
  const env = (process.env.CASHFREE_ENV || 'PRODUCTION').toUpperCase();
  const baseUrl = env === 'PRODUCTION'
    ? 'https://api.cashfree.com/pg'
    : 'https://sandbox.cashfree.com/pg';
  const apiVersion = process.env.CASHFREE_API_VERSION || '2023-08-01';
  return { appId, secretKey, env, baseUrl, apiVersion };
};

// 1. Create Cashfree Order & Generate payment_session_id
const createCashfreeOrderHandler = async (req, res) => {
  try {
    const { appId, secretKey, env, baseUrl, apiVersion } = getCashfreeConfig();
    const { amount, currency = 'INR', customer, orderId, returnUrl } = req.body;

    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: 'Order amount is required' });
    }

    const orderAmount = Number(amount);
    if (isNaN(orderAmount) || orderAmount <= 0) {
      return res.status(400).json({ error: 'Invalid order amount' });
    }

    if (!appId || !secretKey) {
      return res.status(500).json({ error: 'Cashfree API credentials are not configured on server' });
    }

    // Cashfree order_id must be alphanumeric, max 50 chars
    const cfOrderId = (orderId || ('LIV_' + Date.now() + '_' + Math.floor(1000 + Math.random() * 9000))).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 48);
    const customerId = (customer?.userId || customer?.id || ('GUEST_' + Date.now())).replace(/[^a-zA-Z0-9_-]/g, '_').slice(0, 48);
    const customerPhone = customer?.phone ? String(customer.phone).replace(/\D/g, '').slice(-10) : '9999999999';
    const customerEmail = customer?.email || 'orders@livorawallcovering.com';
    const customerName = (customer?.name || customer?.fullName || 'Valued Customer').slice(0, 50);

    // Cashfree Production requires https:// in return_url
    let safeReturnUrl = `https://livorawallcovering.com/checkout?order_id=${cfOrderId}`;
    if (returnUrl && returnUrl.startsWith('https://')) {
      safeReturnUrl = returnUrl;
    }

    const orderPayload = {
      order_id: cfOrderId,
      order_amount: Math.round(orderAmount),
      order_currency: currency.toUpperCase(),
      customer_details: {
        customer_id: customerId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone.length === 10 ? customerPhone : '9999999999'
      },
      order_meta: {
        return_url: safeReturnUrl
      },
      order_note: `LIVORA Custom Wallpaper Order - ${cfOrderId}`
    };

    console.log(`[Cashfree] Creating order ${cfOrderId} for ₹${orderPayload.order_amount} (${env})`);

    const cfResponse = await fetch(`${baseUrl}/orders`, {
      method: 'POST',
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': apiVersion,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(orderPayload)
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok) {
      console.error('[Cashfree] Order creation failed:', cfData);
      return res.status(cfResponse.status).json({
        error: cfData.message || 'Failed to create Cashfree order',
        details: cfData
      });
    }

    console.log(`[Cashfree] Order ${cfOrderId} created successfully. Session: ${cfData.payment_session_id?.slice(0, 20)}...`);

    return res.status(200).json({
      success: true,
      order_id: cfData.order_id,
      payment_session_id: cfData.payment_session_id,
      cf_order_id: cfData.cf_order_id,
      order_status: cfData.order_status,
      order_amount: cfData.order_amount,
      mode: env.toLowerCase()
    });
  } catch (err) {
    console.error('[Cashfree] Create Order Server Error:', err);
    return res.status(500).json({
      error: err.message || 'Internal server error while creating Cashfree order'
    });
  }
};

// 2. Verify Cashfree Payment via Official PG API
const verifyCashfreeOrderHandler = async (req, res) => {
  try {
    const { order_id, orderId, customer, items, totalAmount } = req.body;
    const targetOrderId = order_id || orderId;

    if (!targetOrderId) {
      return res.status(400).json({ success: false, error: 'order_id is required' });
    }

    const { appId, secretKey, baseUrl, apiVersion } = getCashfreeConfig();

    console.log(`[Cashfree] Verifying order ${targetOrderId} from Cashfree API...`);

    // 1. Fetch Order Status directly from Cashfree
    const cfOrderRes = await fetch(`${baseUrl}/orders/${targetOrderId}`, {
      headers: {
        'x-client-id': appId,
        'x-client-secret': secretKey,
        'x-api-version': apiVersion
      }
    });

    const orderData = await cfOrderRes.json();

    if (!cfOrderRes.ok) {
      console.error('[Cashfree] Order fetch error:', orderData);
      return res.status(cfOrderRes.status).json({
        success: false,
        error: orderData.message || 'Unable to retrieve order from Cashfree'
      });
    }

    // 2. Fetch Payment Transactions for Order
    let paymentDetails = null;
    try {
      const cfPaymentsRes = await fetch(`${baseUrl}/orders/${targetOrderId}/payments`, {
        headers: {
          'x-client-id': appId,
          'x-client-secret': secretKey,
          'x-api-version': apiVersion
        }
      });
      if (cfPaymentsRes.ok) {
        const payments = await cfPaymentsRes.json();
        if (Array.isArray(payments) && payments.length > 0) {
          paymentDetails = payments.find(p => p.payment_status === 'SUCCESS') || payments[0];
        }
      }
    } catch (payErr) {
      console.warn('[Cashfree] Payments fetch warning:', payErr.message);
    }

    const isPaid = orderData.order_status === 'PAID' || (paymentDetails && paymentDetails.payment_status === 'SUCCESS');

    if (!isPaid) {
      return res.status(400).json({
        success: false,
        status: orderData.order_status,
        message: `Order status is ${orderData.order_status}. Payment has not been completed.`,
        order: orderData
      });
    }

    // 3. Save order into Database
    let savedOrder = null;
    if (items && items.length > 0) {
      savedOrder = db.createOrder({
        userId: customer?.userId || 'GUEST',
        customerName: customer?.name || customer?.fullName || 'Valued Customer',
        customerEmail: customer?.email || 'customer@livora.in',
        userEmail: customer?.email || 'customer@livora.in',
        customerPhone: customer?.phone || customer?.mobile || '',
        shippingAddress: customer?.address ? `${customer.address}, ${customer.city || ''}, ${customer.state || ''} - ${customer.pincode || ''}` : 'Standard Delivery',
        items,
        totalAmount: totalAmount || orderData.order_amount || 0,
        status: 'PAID',
        paymentMethod: 'CASHFREE',
        trackingNumber: 'LIV-EXP-' + Math.floor(10000000 + Math.random() * 90000000),
        paymentId: paymentDetails?.cf_payment_id || ('CF_' + targetOrderId),
        cashfreeOrderId: targetOrderId,
        orderData
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Cashfree payment verified and confirmed successfully!',
      order_id: targetOrderId,
      cf_payment_id: paymentDetails?.cf_payment_id || null,
      payment_method: paymentDetails?.payment_method || null,
      order: savedOrder
    });
  } catch (err) {
    console.error('[Cashfree] Verification Error:', err);
    return res.status(500).json({
      success: false,
      error: err.message || 'Failed to verify Cashfree payment'
    });
  }
};

// Route definitions for Cashfree
app.post('/api/cashfree/create-order', createCashfreeOrderHandler);
app.post('/api/cashfree/verify-order', verifyCashfreeOrderHandler);
app.post('/api/create-order', createCashfreeOrderHandler);
app.post('/api/payment/create-order', createCashfreeOrderHandler);
app.post('/api/verify-payment', verifyCashfreeOrderHandler);
app.post('/api/payment/verify', verifyCashfreeOrderHandler);

// --- DELHIVERY LOGISTICS INTEGRATION ---
const getDelhiveryConfig = () => {
  const token = process.env.DELHIVERY_API_TOKEN || '3ff08037e22a022368262724e11f54781f0b2109';
  const originPin = (process.env.DELHIVERY_ORIGIN_PINCODE && process.env.DELHIVERY_ORIGIN_PINCODE !== '411046') ? process.env.DELHIVERY_ORIGIN_PINCODE : '380015';
  const warehouseName = (process.env.DELHIVERY_WAREHOUSE_NAME && !process.env.DELHIVERY_WAREHOUSE_NAME.includes('Pune')) ? process.env.DELHIVERY_WAREHOUSE_NAME : 'LIVORA Print Studio Ahmedabad';
  const pickupAddress = process.env.DELHIVERY_PICKUP_ADDRESS || '1st Floor, BRTS Stand, above TVS Vtech Showroom, opposite L Colony, H Colony, Ambawadi, Ahmedabad, Gujarat 380015';
  const baseUrl = 'https://track.delhivery.com';
  return { token, originPin, warehouseName, pickupAddress, baseUrl };
};

// 1. Check Delhivery Pincode Serviceability & COD/Prepaid support
app.get('/api/delhivery/check-pincode', async (req, res) => {
  try {
    const { pincode } = req.query;
    if (!pincode || !/^[1-9][0-9]{5}$/.test(pincode)) {
      return res.status(400).json({ error: 'Valid 6-digit Indian PIN code required' });
    }

    const { token, baseUrl } = getDelhiveryConfig();
    const response = await fetch(`${baseUrl}/c/api/pin-codes/json/?filter_codes=${pincode}`, {
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    const postal = data?.delivery_codes?.[0]?.postal_code;

    if (postal) {
      return res.json({
        success: true,
        pincode,
        serviceable: postal.pre_paid === 'Y' || postal.cod === 'Y',
        prepaid: postal.pre_paid === 'Y',
        cod: postal.cod === 'Y',
        city: postal.district || '',
        state: postal.state_code || '',
        sortCode: postal.sort_code || ''
      });
    }

    return res.json({
      success: false,
      pincode,
      serviceable: false,
      error: 'Location currently not serviceable by Delhivery express network'
    });
  } catch (err) {
    console.error('[Delhivery] Pincode Check Error:', err);
    res.status(500).json({ error: 'Failed to verify Delhivery serviceability' });
  }
});

// Helper: Calculate delivery turnaround time (TAT) based on Delhivery Zone and Mode
const calculateDeliveryEstimate = (zone = 'C', mode = 'SURFACE') => {
  const z = String(zone || 'C').toUpperCase();
  const isExpress = String(mode).toUpperCase() === 'EXPRESS';
  let minDays = isExpress ? 2 : 4;
  let maxDays = isExpress ? 4 : 6;
  let transitDays = isExpress ? '1 – 2 Days (Air Transit)' : '3 – 4 Days (Ground Transit)';

  if (z.startsWith('A')) {
    // Local / Intra-city (Ahmedabad to Ahmedabad)
    minDays = isExpress ? 1 : 2;
    maxDays = isExpress ? 2 : 3;
    transitDays = isExpress ? '1 Day (Air Express)' : '1 – 2 Days (Local Ground)';
  } else if (z.startsWith('B')) {
    // Regional / Intra-state (Gujarat - Surat, Vadodara, Rajkot, etc.)
    minDays = isExpress ? 2 : 3;
    maxDays = isExpress ? 3 : 4;
    transitDays = isExpress ? '1 – 2 Days (Air Express)' : '2 Days (Regional Ground)';
  } else if (z.startsWith('C')) {
    // Metros (Mumbai, Delhi-NCR, Bengaluru, Hyderabad, Kolkata, Chennai)
    minDays = isExpress ? 2 : 4;
    maxDays = isExpress ? 3 : 5;
    transitDays = isExpress ? '2 Days (Air Priority)' : '3 – 5 Days (Surface Express)';
  } else if (z.startsWith('D')) {
    // Rest of India
    minDays = isExpress ? 3 : 5;
    maxDays = isExpress ? 5 : 7;
    transitDays = isExpress ? '2 – 3 Days (Air Priority)' : '4 – 6 Days (Surface Ground)';
  } else if (z.startsWith('E')) {
    // Special zones (North East, J&K, Islands)
    minDays = isExpress ? 5 : 7;
    maxDays = isExpress ? 7 : 10;
    transitDays = isExpress ? '3 – 5 Days (Air Priority)' : '6 – 8 Days (Surface Ground)';
  }

  const now = new Date();
  const minDate = new Date(now.getTime() + minDays * 24 * 60 * 60 * 1000);
  const maxDate = new Date(now.getTime() + maxDays * 24 * 60 * 60 * 1000);
  const formatShort = (d) => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });

  return {
    daysRange: `${minDays} – ${maxDays} Days`,
    dateRange: `${formatShort(minDate)} – ${formatShort(maxDate)}`,
    expectedDate: formatShort(maxDate),
    transitDays
  };
};

// 2. Dynamic Delhivery Rate Calculator based on Pincode, Mode, and Weight
// Calculates BOTH Surface and Air Express options concurrently
app.get('/api/delhivery/calculate-rate', async (req, res) => {
  try {
    const { destinationPincode, paymentMode = 'Pre-paid', weight = 1000 } = req.query;

    if (!destinationPincode || !/^[1-9][0-9]{5}$/.test(destinationPincode)) {
      return res.status(400).json({ error: 'Valid destination PIN code required' });
    }

    const { token, originPin, baseUrl } = getDelhiveryConfig();
    const pt = paymentMode.toLowerCase() === 'cod' ? 'COD' : 'Pre-paid';
    const cgm = Math.max(500, parseInt(weight, 10) || 1000);

    console.log(`[Delhivery] Calculating rates from Ahmedabad (${originPin}) to ${destinationPincode} (${pt}, ${cgm}g)...`);

    const [surfaceRes, expressRes] = await Promise.all([
      fetch(`${baseUrl}/api/kinko/v1/invoice/charges/.json?md=S&ss=Delivered&d_pin=${destinationPincode}&o_pin=${originPin}&cgm=${cgm}&pt=${pt}`, {
        headers: { 'Authorization': `Token ${token}` }
      }).then(r => r.json()).catch(() => null),
      fetch(`${baseUrl}/api/kinko/v1/invoice/charges/.json?md=E&ss=Delivered&d_pin=${destinationPincode}&o_pin=${originPin}&cgm=${cgm}&pt=${pt}`, {
        headers: { 'Authorization': `Token ${token}` }
      }).then(r => r.json()).catch(() => null)
    ]);

    const surfaceItem = Array.isArray(surfaceRes) ? surfaceRes[0] : null;
    const expressItem = Array.isArray(expressRes) ? expressRes[0] : null;

    if (!surfaceItem && !expressItem) {
      return res.status(400).json({
        success: false,
        error: 'Unable to calculate live Delhivery rates for this route'
      });
    }

    const surfaceRate = surfaceItem?.total_amount !== undefined ? Math.round(Number(surfaceItem.total_amount)) : 95;
    const expressRate = expressItem?.total_amount !== undefined ? Math.round(Number(expressItem.total_amount)) : Math.round(surfaceRate * 1.35);

    const surfaceEstimate = calculateDeliveryEstimate(surfaceItem?.zone || 'C1', 'SURFACE');
    const expressEstimate = calculateDeliveryEstimate(expressItem?.zone || 'C', 'EXPRESS');

    const options = {
      SURFACE: {
        mode: 'SURFACE',
        name: 'Delhivery Standard Surface',
        badge: 'Cost-Effective Economy',
        rate: surfaceRate,
        exactAmount: surfaceItem?.total_amount || surfaceRate,
        zone: surfaceItem?.zone || 'C1',
        codCharge: surfaceItem?.charge_COD || 0,
        estimatedDays: surfaceEstimate.daysRange,
        estimatedDeliveryDate: surfaceEstimate.dateRange,
        transitDays: surfaceEstimate.transitDays
      },
      EXPRESS: {
        mode: 'EXPRESS',
        name: 'Delhivery Air Express',
        badge: 'Fastest Priority Air',
        rate: expressRate,
        exactAmount: expressItem?.total_amount || expressRate,
        zone: expressItem?.zone || 'C',
        codCharge: expressItem?.charge_COD || 0,
        estimatedDays: expressEstimate.daysRange,
        estimatedDeliveryDate: expressEstimate.dateRange,
        transitDays: expressEstimate.transitDays
      }
    };

    return res.json({
      success: true,
      origin: originPin,
      originCity: 'Ahmedabad',
      options,
      defaultMode: 'SURFACE',
      // Default to SURFACE values
      shippingRate: surfaceRate,
      zone: surfaceItem?.zone || 'C1',
      codCharge: surfaceItem?.charge_COD || 0,
      weight: surfaceItem?.charged_weight || cgm,
      estimatedDays: surfaceEstimate.daysRange,
      estimatedDeliveryDate: surfaceEstimate.dateRange,
      transitDays: surfaceEstimate.transitDays
    });
  } catch (err) {
    console.error('[Delhivery] Rate Calc Error:', err);
    res.status(500).json({ error: 'Failed to calculate live shipping charges' });
  }
});

// 3. Create Delhivery Shipment / Booking (Prepaid or COD)
app.post('/api/delhivery/create-shipment', async (req, res) => {
  try {
    const { order, customer, items, paymentMode = 'Pre-paid', shippingMode = 'SURFACE', codAmount = 0, weight = 1000 } = req.body;
    const { token, warehouseName, pickupAddress, baseUrl } = getDelhiveryConfig();

    const orderId = order?.id || ('LIV_' + Date.now());
    const customerPhone = customer?.phone ? String(customer.phone).replace(/\D/g, '').slice(-10) : '917821085631';
    const isCod = String(paymentMode).toUpperCase() === 'COD';
    const isExpress = String(shippingMode).toUpperCase() === 'EXPRESS';

    const shipmentPayload = {
      shipments: [
        {
          name: customer?.name || 'Customer',
          add: customer?.address || 'Standard Delivery',
          pin: customer?.pincode,
          city: customer?.city || '',
          state: customer?.state || '',
          country: 'India',
          phone: customerPhone,
          order: orderId,
          payment_mode: isCod ? 'COD' : 'Pre-paid',
          shipping_mode: isExpress ? 'Express' : 'Surface',
          products_desc: `Custom Wallpaper Mural (${items?.length || 1} roll set)`,
          total_amount: order?.totalAmount || 0,
          cod_amount: isCod ? (codAmount || order?.totalAmount || 0) : 0,
          weight: weight || 1000,
          seller_name: 'LIVORA Wallpaper Studio',
          seller_add: pickupAddress,
          quantity: String(items?.length || 1)
        }
      ],
      pickup_location: {
        name: warehouseName
      }
    };

    console.log(`[Delhivery] Booking shipment for ${orderId} (${shipmentPayload.shipments[0].payment_mode}, ${shipmentPayload.shipments[0].shipping_mode}) from ${warehouseName}...`);

    const body = 'format=json&data=' + encodeURIComponent(JSON.stringify(shipmentPayload));
    const delRes = await fetch(`${baseUrl}/api/cmu/create.json`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body
    });

    const resData = await delRes.json();
    const pkg = resData?.packages?.[0];

    const waybill = pkg?.waybill || '';
    const trackingNumber = waybill || ('LIV-DEL-' + Math.floor(10000000 + Math.random() * 90000000));
    const trackingUrl = waybill ? `https://www.delhivery.com/track/package/${waybill}` : `https://track.delhivery.com`;

    return res.json({
      success: resData.success || Boolean(waybill),
      waybill,
      trackingNumber,
      trackingUrl,
      sortCode: pkg?.sort_code || 'PUN/SDW',
      uploadWbn: resData.upload_wbn,
      delhiveryResponse: resData
    });
  } catch (err) {
    console.error('[Delhivery] Create Shipment Error:', err);
    res.status(500).json({ error: 'Failed to create Delhivery shipment' });
  }
});

// Manual or COD Orders fallback
app.post('/api/orders', (req, res) => {
  try {
    const { items, customer, paymentDetails, totalAmount } = req.body;
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart items cannot be empty' });
    }

    const order = db.createOrder({
      userId: customer?.userId || 'GUEST',
      customerName: customer?.name || customer?.fullName || 'Valued Customer',
      customerEmail: customer?.email || 'customer@livora.in',
      userEmail: customer?.email || 'customer@livora.in',
      customerPhone: customer?.phone || customer?.mobile || '',
      shippingAddress: customer?.address ? `${customer.address}, ${customer.city || ''}, ${customer.state || ''} - ${customer.pincode || ''}` : 'Standard Delivery',
      items,
      totalAmount,
      status: paymentDetails?.method === 'COD' ? 'CONFIRMED' : 'PAID',
      paymentMethod: paymentDetails?.method || 'ONLINE',
      trackingNumber: 'LIV-EXP-' + Math.floor(10000000 + Math.random() * 90000000),
      paymentId: paymentDetails?.paymentId || 'PAY_' + Math.random().toString(36).substr(2, 9),
      cashfreeOrderId: paymentDetails?.orderId || ''
    });

    res.status(201).json({
      success: true,
      message: 'Order created successfully!',
      order
    });
  } catch (err) {
    console.error('Order creation error:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

app.get('/api/user/orders', authenticateToken, (req, res) => {
  const orders = db.getOrdersByUser(req.user.id, req.user.email);
  res.json({ orders });
});

app.get('/api/orders/user/:userId', (req, res) => {
  const orders = db.getOrdersByUser(req.params.userId, req.query.email);
  res.json({ orders });
});

export { app };

// Auto-start listening if executed directly (e.g. node server/index.js)
if (process.argv[1] && (process.argv[1].endsWith('index.js') || process.argv[1].endsWith('server/index.js') || process.argv[1].endsWith('server\\index.js'))) {
  app.listen(PORT, () => {
    console.log(`🚀 LIVORA Wallpaper Backend API running on http://localhost:${PORT}`);
  });
}
