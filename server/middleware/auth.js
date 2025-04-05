
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// JWT secret from environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to protect routes
exports.protect = async (req, res, next) => {
  let token;
  
  // Get token from cookies
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }
  
  // If no token found, return unauthorized
  if (!token) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
  
  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Set user on request object
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Not authorized to access this route' });
  }
};

// Create and send JWT token
exports.createSendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    { id: user._id, userType: user.userType },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
  
  // Set cookie options
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true, // Cannot be accessed by browser
    secure: process.env.NODE_ENV === 'production' // Only HTTPS
  };
  
  // Set cookie
  res.cookie('token', token, cookieOptions);
  
  // Remove password from output
  user.password = undefined;
  
  // Add isAuthenticated flag for frontend
  const userData = user.toObject ? user.toObject() : user;
  
  res.status(statusCode).json({
    status: 'success',
    token,
    user: {
      ...userData,
      isAuthenticated: true
    }
  });
};
