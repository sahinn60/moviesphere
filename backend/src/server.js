require('./config/env');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const { PORT, FRONTEND_URL, NODE_ENV } = require('./config/env');
const { connectDB } = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Security
app.use(helmet());
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000', 'http://localhost:3001'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ success: true, message: 'Cinevora API is running', timestamp: new Date().toISOString(), env: NODE_ENV });
});

// API Routes
app.use('/api/movies', require('./routes/movieRoutes'));
app.use('/api/series', require('./routes/seriesRoutes'));
app.use('/api', require('./routes/episodeRoutes'));
app.use('/api/genres', require('./routes/genreRoutes'));
app.use('/api/cast', require('./routes/castRoutes'));
app.use('/api/banners', require('./routes/bannerRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/watch', require('./routes/watchRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.path} not found`, error: 'NOT_FOUND' });
});

// Error handler
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n🎬 Cinevora API running on http://localhost:${PORT}`);
    console.log(`📖 Health: http://localhost:${PORT}/health`);
    console.log(`🌍 Environment: ${NODE_ENV}\n`);
  });
};

start();

module.exports = app;
