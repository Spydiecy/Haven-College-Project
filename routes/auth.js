const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// Helper function to generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d' // Token expires in 30 days
  });
};

// Login page route
router.get('/login', (req, res) => {
  res.render('login', {
    title: 'Login',
    cssFile: 'login'
  });
});

// Login handler
router.post('/login', async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { email, password } = req.body;
    
    // Simple validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    
    // Find user by email
    const user = await User.findOne({ email }).select('+password'); // +password to include password field
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Check if password matches
    const isMatch = await user.comparePassword(password);
    
    if (isMatch) {
      // Generate token
      const token = generateToken(user._id);
      
      // Set cookie options
      const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        httpOnly: true, // Can't be accessed by client-side JS
        secure: process.env.NODE_ENV === 'production' // Only send on HTTPS in production
      };
      
      // Set cookie with token
      res.cookie('token', token, cookieOptions);
      
      // Remove password from response
      user.password = undefined;
      
      res.status(200).json({ 
        success: true, 
        token,
        redirect: '/dashboard' 
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Register handler
router.post('/register', async (req, res) => {
  try {
    console.log('Register attempt:', req.body);
    const { email, password } = req.body;
    
    // Enhanced validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }
    
    // Password validation
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
    }
    
    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'Email already exists' });
    }
    
    // Create new user
    await User.create({
      email,
      password,
      username: email.split('@')[0] // Simple username from email
    });
    
    res.status(201).json({ success: true, message: 'Registration successful', redirect: '/auth/login' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;