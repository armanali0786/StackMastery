require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
const User = require('./models/User');
const Tracker = require('./models/Tracker');
const jwt = require('jsonwebtoken');
const PrepGuide = require('./models/PrepGuide');

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
// Prep Guide Routes
app.get('/api/prep-guides', async (req, res) => {
  try {
    // Returning empty array as requested for now
    res.json({ guides: [] });
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

// Seed endpoint for demo data
app.post('/api/prep-guides/seed', async (req, res) => {
  try {
    const existing = await PrepGuide.countDocuments();
    if (existing > 0) {
      return res.status(400).json({ message: 'Guides already seeded' });
    }

    const dummyData = [
      {
        type: 'company',
        title: 'Google',
        difficulty: 'Advanced',
        tags: ['FAANG', 'Algorithms', 'System Design'],
        bookmarksCount: 156,
        content: {
          processOverview: '1 Phone Screen, 4-5 Onsite Interviews (Coding, System Design, Googleyness)',
          commonQuestions: [
            { question: 'Reverse a Linked List', answer: 'Use three pointers: prev, curr, next...' },
            { question: 'Design YouTube', answer: 'Focus on CDN, Video Storage, and Metadata DB...' }
          ],
          codingTopics: ['Dynamic Programming', 'Graph Theory', 'Trees', 'Hash Maps'],
          behavioralQuestions: ['Tell me about a time you failed.', 'How do you handle conflict?'],
          tips: 'Always communicate your thought process clearly before writing code.'
        }
      },
      {
        type: 'company',
        title: 'Amazon',
        difficulty: 'Intermediate',
        tags: ['FAANG', 'Leadership Principles'],
        bookmarksCount: 204,
        content: {
          processOverview: '1 Online Assessment (OA), 1 Phone Screen, 4 Onsite (Heavy on LPs)',
          commonQuestions: [
            { question: 'Two Sum', answer: 'Use a Hash Map to store complements.' },
            { question: 'Design Amazon E-commerce', answer: 'Microservices architecture, caching inventory.' }
          ],
          codingTopics: ['Arrays', 'Strings', 'Trees'],
          behavioralQuestions: ['Describe a time you showed Customer Obsession.', 'When did you disagree and commit?'],
          tips: 'Know the 16 Leadership Principles inside out and map them to your past experiences using the STAR method.'
        }
      },
      {
        type: 'role',
        title: 'Backend Developer',
        difficulty: 'Intermediate',
        tags: ['Node.js', 'Databases', 'APIs'],
        bookmarksCount: 120,
        content: {
          requiredSkills: ['Node.js / Python / Java', 'RESTful API Design', 'SQL & NoSQL', 'Caching (Redis)'],
          faqs: [
            { question: 'What is the main difference between SQL and NoSQL?', answer: 'Relational vs Non-relational, strict schema vs flexible schema, ACID vs BASE.' },
            { question: 'How do you structure a scalable backend?', answer: 'Microservices, message queues, load balancers, caching.' }
          ],
          roadmap: '1. Learn a Language -> 2. Master DBs -> 3. Build REST/GraphQL APIs -> 4. Understand Caching -> 5. Learn Docker/K8s'
        }
      },
      {
        type: 'role',
        title: 'Frontend Developer',
        difficulty: 'Beginner',
        tags: ['React', 'CSS', 'JavaScript'],
        bookmarksCount: 98,
        content: {
          requiredSkills: ['HTML/CSS/JS', 'React/Vue', 'State Management', 'Web Performance'],
          faqs: [
            { question: 'Explain the Virtual DOM', answer: 'An in-memory representation of the real DOM. React uses it to batch updates efficiently.' },
            { question: 'What is CSS Grid vs Flexbox?', answer: 'Grid is 2D, Flexbox is 1D layout.' }
          ],
          roadmap: '1. Basics (HTML/CSS/JS) -> 2. Framework (React) -> 3. State Management (Redux/Zustand) -> 4. Next.js'
        }
      }
    ];

    await PrepGuide.insertMany(dummyData);
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
