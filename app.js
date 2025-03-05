const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

// Initialize Express app
const app = express();

// Third-party middlewares
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(morgan('dev')); // HTTP request logging

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter); // Apply rate limiting to all requests

// Built-in middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Custom error middleware
app.use(require('./middlewares/errorMiddleware'));

// Routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/destinations', require('./routes/destinations'));
app.use('/about', require('./routes/about'));

// 404 handler - should be after all routes
app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'not-found.html'));
});

module.exports = app;