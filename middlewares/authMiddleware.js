const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes - middleware to ensure user is authenticated
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    // Check if token exists in headers
    if (
      req.headers.authorization && 
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies.token) {
      // Or check if token exists in cookies (for browser sessions)
      token = req.cookies.token;
    }
    
    // If no token
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Please log in to access this resource' 
      });
    }
    
    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Add user to request
      req.user = await User.findById(decoded.id);
      
      next();
    } catch (err) {
      return res.status(401).json({ 
        success: false, 
        message: 'Not authorized to access this resource' 
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Role-based access control
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Please log in to access this resource' 
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        success: false,
        message: 'Not authorized to access this resource' 
      });
    }
    
    next();
  };
};
