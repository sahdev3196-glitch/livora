import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import dotenv from 'dotenv';
import Razorpay from 'razorpay';
import { db } from './database.js';
import { seedDB } from './seed.js';
import cloudinary, { uploadImageToCloudinary, getOptimizedImageUrl } from './cloudinary.js';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_TTbiP0afZW3w2T',
  key_secret: process.env.RAZORPAY_KEY_SECRET || 'y1SIZBABsa1nO2xJccOaZHXz'
});

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

// 1. Create Razorpay Order
const createRazorpayOrderHandler = async (req, res) => {
  try {
    const { amount, currency = 'INR', receipt } = req.body;

    if (amount === undefined || amount === null) {
      return res.status(400).json({ error: 'Amount is required' });
    }

    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount < 100) {
      return res.status(400).json({
        error: 'Amount must be at least 100 paise (₹1.00)'
      });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(401).json({
        error: 'Razorpay API credentials are not configured on server'
      });
    }

    const options = {
      amount: parsedAmount,
      currency: currency.toUpperCase(),
      receipt: receipt || `rcpt_${Date.now()}`
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order_id: order.id,
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
      status: order.status
    });
  } catch (err) {
    console.error('Razorpay Create Order Error:', err);
    if (err.statusCode === 401 || (err.error && err.error.code === 'BAD_REQUEST_ERROR' && String(err.error.description).toLowerCase().includes('auth'))) {
      return res.status(401).json({ error: 'Razorpay authentication failed: Invalid API credentials' });
    }
    return res.status(500).json({
      error: err.error?.description || err.message || 'Failed to create Razorpay order'
    });
  }
};

app.post('/api/create-order', createRazorpayOrderHandler);
app.post('/api/payment/create-order', createRazorpayOrderHandler);

// 2. Verify Razorpay Payment Signature
const verifyRazorpayPaymentHandler = (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      order_id,
      payment_id,
      signature,
      customer,
      items,
      totalAmount
    } = req.body;

    const orderId = razorpay_order_id || order_id;
    const paymentId = razorpay_payment_id || payment_id;
    const signatureProvided = razorpay_signature || signature;

    if (!orderId || !paymentId || !signatureProvided) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment verification fields (order_id, payment_id, signature)'
      });
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keySecret) {
      return res.status(500).json({
        success: false,
        error: 'Razorpay Key Secret is missing on server configuration'
      });
    }

    // Generate expected HMAC-SHA256 signature
    const generatedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    const isSignatureValid = generatedSignature === signatureProvided;

    if (!isSignatureValid) {
      console.warn(`Payment signature mismatch: expected=${generatedSignature}, received=${signatureProvided}`);
      return res.status(400).json({
        success: false,
        error: 'Payment verification failed: signature mismatch'
      });
    }

    // Signature verified! Create order in DB if items are provided
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
        totalAmount: totalAmount || 0,
        status: 'PAID',
        paymentMethod: 'RAZORPAY_ONLINE',
        trackingNumber: 'LIV-EXP-' + Math.floor(10000000 + Math.random() * 90000000),
        paymentId: paymentId,
        razorpayOrderId: orderId
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Payment verified and confirmed successfully!',
      order_id: orderId,
      payment_id: paymentId,
      order: savedOrder
    });
  } catch (err) {
    console.error('Razorpay Signature Verification Error:', err);
    return res.status(500).json({
      success: false,
      error: 'Failed to verify payment signature'
    });
  }
};

app.post('/api/verify-payment', verifyRazorpayPaymentHandler);
app.post('/api/payment/verify', verifyRazorpayPaymentHandler);

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
      razorpayOrderId: paymentDetails?.orderId || ''
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
