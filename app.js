const express = require('express');
const path = require('path');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorMiddleware = require('./middlewares/errorMiddleware');

// Import routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const destinationsRoutes = require('./routes/destinations');
const aboutRoutes = require('./routes/about');
const contactRoutes = require('./routes/contact');
const wellnessRoutes = require('./routes/wellness');

// Initialize Express app
const app = express();

// Set view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views', 'pages'));

// Third-party middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "cdnjs.cloudflare.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "fonts.googleapis.com"],
      fontSrc: ["'self'", "fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "i.imgur.com"],
      connectSrc: ["'self'"]
    },
  },
}));
app.use(cors());
app.use(morgan('dev'));

// Rate limiter middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Built-in middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Use routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/destinations', destinationsRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/wellness', wellnessRoutes);
app.get('/login', (req, res) => {
    res.redirect('/auth/login');
});

// 404 handler - should be after all routes
app.use((req, res) => {
  res.status(404).render('not-found');
});

// Error handling middleware
app.use(errorMiddleware);

module.exports = app;