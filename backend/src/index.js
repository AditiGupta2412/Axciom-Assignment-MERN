require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const bookRoutes = require('./routes/bookRoutes');
const membershipRoutes = require('./routes/membershipRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const reportRoutes = require('./routes/reportRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/reports', reportRoutes);

// Root endpoint
app.get('/', (_req, res) => {
  res.json({
    message: '📚 Library Management System API',
    version: '1.0.0',
    status: '✅ Running',
    documentation: 'See /api/docs or README.md',
    endpoints: {
      auth: 'POST /api/auth/login, POST /api/auth/register',
      books: 'GET /api/books, POST /api/books, PUT /api/books/:id',
      members: 'GET /api/memberships, POST /api/memberships',
      transactions: 'POST /api/transactions/issue, POST /api/transactions/return',
      reports: 'GET /api/reports/dashboard, GET /api/reports/:type',
    },
  });
});

// Health check
app.get('/health', (_req, res) => {
  res.json({ message: '✅ Server is running' });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message);
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
