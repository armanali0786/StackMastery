require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');
const Tracker = require('./models/Tracker');
const jwt = require('jsonwebtoken');
const PrepGuide = require('./models/PrepGuide');
const TopicContent = require('./models/TopicContent');

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

const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ error: 'Not authorized as an admin' });
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
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
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
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
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
// Topic Content Routes
app.get('/api/topics/:subject', async (req, res) => {
  try {
    const { subject } = req.params;
    const topic = await TopicContent.findOne({ subject });

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }
    res.json({ topic });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/topics/:subject', protect, admin, async (req, res) => {
  try {
    const { subject } = req.params;
    const { content } = req.body;

    const updated = await TopicContent.findOneAndUpdate(
      { subject },
      { $set: { content } },
      { new: true, upsert: true }
    );
    res.json({ topic: updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Prep Guide Routes
app.get('/api/prep-guides', async (req, res) => {
  try {
    const guides = await PrepGuide.find({});
    res.json({ guides });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/prep-guides/trending', async (req, res) => {
  try {
    // Returning empty array as requested for now
    res.json({ guides: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/prep-guides/:id', async (req, res) => {
  try {
    const guide = await PrepGuide.findById(req.params.id);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.json({ guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/admin/prep-guides', protect, admin, async (req, res) => {
  try {
    const guide = await PrepGuide.create(req.body);
    res.status(201).json({ guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/admin/prep-guides/:id', protect, admin, async (req, res) => {
  try {
    const guide = await PrepGuide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.json({ guide });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/admin/prep-guides/:id', protect, admin, async (req, res) => {
  try {
    const guide = await PrepGuide.findByIdAndDelete(req.params.id);
    if (!guide) return res.status(404).json({ error: 'Guide not found' });
    res.json({ message: 'Guide removed' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Seed endpoint for demo data
app.post('/api/prep-guides/seed', async (req, res) => {
  try {
    const existing = await PrepGuide.countDocuments();
    if (existing > 0) {
      return res.status(400).json({ message: 'Guides already seeded' });
    }
    await PrepGuide.insertMany([]);
    res.status(201).json({ message: 'Dummy prep guides seeded successfully' });
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
