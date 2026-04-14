require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:4173'], credentials: true }));
app.use(express.json());

// ── In-memory user store (replace with DB in production) ─────────────────────
const USERS = [
  {
    id: 1,
    name: 'Admin User',
    email: 'admin@vex.com',
    // password: "password123"
    passwordHash: bcrypt.hashSync('password123', 10),
    role: 'admin',
    avatar: 'AU',
  },
  {
    id: 2,
    name: 'Test User',
    email: 'test@vex.com',
    // password: "test1234"
    passwordHash: bcrypt.hashSync('test1234', 10),
    role: 'user',
    avatar: 'TU',
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const signToken = (user) =>
  jwt.sign({ id: user.id, email: user.email, role: user.role }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  });

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer '))
    return res.status(401).json({ error: 'No token provided' });

  try {
    const decoded = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// ── Routes ────────────────────────────────────────────────────────────────────

// Health
app.get('/health', (_req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ error: 'name, email and password are required' });

    if (USERS.find((u) => u.email === email))
      return res.status(409).json({ error: 'Email already registered' });

    if (password.length < 6)
      return res.status(400).json({ error: 'Password must be at least 6 characters' });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = {
      id: USERS.length + 1,
      name,
      email,
      passwordHash,
      role: 'user',
      avatar: name.slice(0, 2).toUpperCase(),
    };
    USERS.push(newUser);

    const token = signToken(newUser);
    return res.status(201).json({
      token,
      user: { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, avatar: newUser.avatar },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ error: 'email and password are required' });

    const user = USERS.find((u) => u.email === email);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = signToken(user);
    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user (protected)
app.get('/api/auth/me', verifyToken, (req, res) => {
  const user = USERS.find((u) => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  return res.json({ id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar });
});

// Dashboard stats (protected)
app.get('/api/dashboard/stats', verifyToken, (_req, res) => {
  res.json({
    portfolio: { value: '$4.2B', change: '+18.4%', label: 'Portfolio Value' },
    companies: { value: '34', change: '+3', label: 'Portfolio Companies' },
    exits: { value: '12', change: '+2', label: 'Successful Exits' },
    irr: { value: '31%', change: '+4.1%', label: 'Net IRR' },
    recentActivity: [
      { id: 1, type: 'Investment', company: 'NovaBio Labs', amount: '$12M', date: '2024-03-15', stage: 'Series A' },
      { id: 2, type: 'Exit', company: 'DataStream Inc.', amount: '$380M', date: '2024-02-28', stage: 'Acquisition' },
      { id: 3, type: 'Investment', company: 'Quantum Edge', amount: '$8M', date: '2024-02-10', stage: 'Seed' },
      { id: 4, type: 'Investment', company: 'SolarGrid AI', amount: '$25M', date: '2024-01-22', stage: 'Series B' },
      { id: 5, type: 'Advisory', company: 'CloudVault', amount: 'Equity', date: '2024-01-09', stage: 'Growth' },
    ],
  });
});

// Portfolio companies (protected)
app.get('/api/dashboard/portfolio', verifyToken, (_req, res) => {
  res.json([
    { id: 1, name: 'NovaBio Labs', sector: 'BioTech', stage: 'Series A', invested: '$12M', valuation: '$90M', status: 'Active' },
    { id: 2, name: 'Quantum Edge', sector: 'Deep Tech', stage: 'Seed', invested: '$8M', valuation: '$42M', status: 'Active' },
    { id: 3, name: 'SolarGrid AI', sector: 'CleanTech', stage: 'Series B', invested: '$25M', valuation: '$210M', status: 'Active' },
    { id: 4, name: 'CloudVault', sector: 'SaaS', stage: 'Growth', invested: 'Advisory', valuation: '$520M', status: 'Active' },
    { id: 5, name: 'DataStream Inc.', sector: 'Data', stage: 'Acquired', invested: '$18M', valuation: '$380M', status: 'Exited' },
    { id: 6, name: 'PulseHealth', sector: 'HealthTech', stage: 'Series A', invested: '$15M', valuation: '$98M', status: 'Active' },
  ]);
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 VEX Backend running on http://localhost:${PORT}`);
  console.log(`\n🔑 Test Credentials:`);
  console.log(`   Admin → admin@vex.com / password123`);
  console.log(`   User  → test@vex.com  / test1234\n`);
});
