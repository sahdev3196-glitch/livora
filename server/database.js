import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'livora_data.json');

// Lightweight high-performance JSON database manager (Zero native compilation dependency)
class SimpleDB {
  constructor() {
    this.data = {
      users: [],
      orders: [],
      products: [],
      paperTypes: []
    };
    this.init();
  }

  init() {
    try {
      if (fs.existsSync(DB_FILE)) {
        const fileData = fs.readFileSync(DB_FILE, 'utf8');
        this.data = JSON.parse(fileData);
      } else {
        this.save();
      }
    } catch (err) {
      console.error('Error initializing DB:', err);
    }
  }

  save() {
    try {
      fs.writeFileSync(DB_FILE, JSON.stringify(this.data, null, 2), 'utf8');
    } catch (err) {
      console.error('Error saving DB:', err);
    }
  }

  // Users
  findUserByEmail(email) {
    return this.data.users.find(u => u.email.toLowerCase() === email.toLowerCase());
  }

  createUser(user) {
    const newUser = { id: Date.now().toString(), createdAt: new Date().toISOString(), ...user };
    this.data.users.push(newUser);
    this.save();
    return newUser;
  }

  updateUser(email, fields) {
    let user = this.findUserByEmail(email);
    if (user) {
      Object.assign(user, fields, { updatedAt: new Date().toISOString() });
    } else {
      user = this.createUser({ email, ...fields });
    }
    this.save();
    return user;
  }

  // Orders
  createOrder(orderData) {
    const order = {
      id: 'LIV-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      status: 'PAID',
      paymentMethod: 'ONLINE_PAYMENT',
      ...orderData
    };
    this.data.orders.push(order);
    this.save();
    return order;
  }

  getOrdersByUser(userId, userEmail) {
    return this.data.orders.filter(o => 
      (userId && o.userId === userId) || 
      (userEmail && o.userEmail && o.userEmail.toLowerCase() === userEmail.toLowerCase())
    ).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }

  getOrderById(id) {
    return this.data.orders.find(o => o.id === id);
  }

  // Products
  getProducts() {
    return this.data.products;
  }

  setProducts(products) {
    this.data.products = products;
    this.save();
  }

  // Paper Types
  getPaperTypes() {
    return this.data.paperTypes;
  }

  setPaperTypes(paperTypes) {
    this.data.paperTypes = paperTypes;
    this.save();
  }
}

export const db = new SimpleDB();
