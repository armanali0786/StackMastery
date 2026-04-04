require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');
const Tracker = require('./models/Tracker');
const jwt = require('jsonwebtoken');

const app = express();

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_for_development';

// Middleware
app.use(cors());
app.use(express.json());

// Auth Middleware
const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = await User.findById(decoded.id).select('-password');
      if (!req.user) return res.status(401).json({ error: 'Not authorized, user not found' });
      next();
    } catch (error) {
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
};

// Generate Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });
};

// Auth Routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create({ name, email, password });

    if (user) {
      res.status(201).json({
        user: { id: user._id, name: user.name, email: user.email },
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        user: { id: user._id, name: user.name, email: user.email },
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Tracker Routes
app.get('/api/tracker/all', protect, async (req, res) => {
  try {
    const trackers = await Tracker.find({ userId: req.user._id });
    res.json({ trackers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/tracker/:subject', protect, async (req, res) => {
  try {
    const { subject } = req.params;
    let tracker = await Tracker.findOne({ userId: req.user._id, subject });

    if (!tracker) {
      tracker = await Tracker.create({ userId: req.user._id, subject });
    }
    res.json({ tracker });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/tracker/:subject', protect, async (req, res) => {
  try {
    const { subject } = req.params;
    const { states, favs, notes, globalNote } = req.body;

    const updated = await Tracker.findOneAndUpdate(
      { userId: req.user._id, subject },
      { $set: req.body },
      { new: true, upsert: true }
    );
    res.json({ tracker: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Start Server
const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();
