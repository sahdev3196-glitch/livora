import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
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
if (fs.existsSync(path.resolve('pichwai'))) {
  app.use('/pichwai', express.static(path.resolve('pichwai')));
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
  const { name, phone, address, city, state, pincode } = req.body;
  const updated = db.updateUser(req.user.email, { name, phone, address, city, state, pincode });
  if (updated) {
    const { password, ...userProfile } = updated;
    return res.json({ message: 'Profile updated successfully', user: userProfile });
  }
  res.status(400).json({ error: 'Failed to update profile' });
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
app.post('/api/payment/create-order', (req, res) => {
  const { amount, currency = 'INR', receipt } = req.body;
  // Simulate Razorpay Order payload or integration
  const razorpayOrderId = 'order_rzp_' + Math.random().toString(36).substr(2, 9);
  res.json({
    id: razorpayOrderId,
    entity: 'order',
    amount: amount * 100, // in paise
    currency,
    receipt: receipt || 'rcpt_' + Date.now(),
    status: 'created'
  });
});

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
      status: 'PAID',
      trackingNumber: 'BLUEDART-' + Math.floor(10000000 + Math.random() * 90000000),
      paymentId: paymentDetails?.paymentId || 'PAY_' + Math.random().toString(36).substr(2, 9),
      razorpayOrderId: paymentDetails?.orderId || ''
    });

    res.status(201).json({
      success: true,
      message: 'Order created & payment confirmed successfully!',
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

app.listen(PORT, () => {
  console.log(`🚀 LIVORA Wallpaper Backend API running on http://localhost:${PORT}`);
});
