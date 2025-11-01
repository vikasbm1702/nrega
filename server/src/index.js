require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const cron = require('node-cron');
const { setupDataSync } = require('./services/dataSyncService');
const { initializeCache, cacheMiddleware } = require('./services/cacheService');

const app = express();

// Middleware
app.use(cors());
app.use(compression()); // Compress responses for smaller payloads
app.use(express.json());
app.use(express.urlencoded({ limit: '10kb' })); // Request size limit to prevent payload attacks

// Rate limiting: 100 requests per 15 minutes per IP
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per window
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Initialize Redis cache (non-blocking, will fallback to direct queries if Redis unavailable)
initializeCache().catch(err => {
  console.warn('Redis cache initialization failed, proceeding without cache:', err.message);
});

// Apply cache middleware to specific routes (1 hour TTL)
app.use('/api/districts/states', cacheMiddleware(3600));
app.use('/api/districts/states/:state/districts', cacheMiddleware(3600));

// Routes
const districtRoutes = require('./routes/districtRoutes');
app.use('/api/districts', districtRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mgnrega-dashboard')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Setup periodic data sync with data.gov.in API
setupDataSync();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});