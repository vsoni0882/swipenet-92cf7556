
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect, createSendToken } = require('../middleware/auth');

// Signup route
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, userType } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      userType
    });
    
    // Create and send JWT token
    createSendToken(user, 201, res);
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Check if password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Create and send JWT token
    createSendToken(user, 200, res);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Get current user route
router.get('/me', protect, (req, res) => {
  // Add isAuthenticated flag
  const userData = req.user.toObject ? req.user.toObject() : req.user;
  
  res.status(200).json({
    status: 'success',
    user: {
      ...userData,
      isAuthenticated: true
    }
  });
});

// Logout route
router.post('/logout', (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // 10 seconds
    httpOnly: true
  });
  
  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
});

module.exports = router;
