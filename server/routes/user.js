
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// Get user profile
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
});

// Update user profile
router.patch('/profile', protect, async (req, res) => {
  try {
    // Fields that are not allowed to be updated
    const restrictedFields = ['password', 'email'];
    
    const updates = Object.keys(req.body);
    
    // Check if any restricted field is being updated
    const isRestrictedUpdate = updates.some(update => restrictedFields.includes(update));
    
    if (isRestrictedUpdate) {
      return res.status(400).json({ message: 'Cannot update restricted fields' });
    }
    
    // Update user
    const user = await User.findByIdAndUpdate(
      req.user._id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile' });
  }
});

// Update CV status
router.patch('/cv-status', protect, async (req, res) => {
  try {
    const { hasCV } = req.body;
    
    if (typeof hasCV !== 'boolean') {
      return res.status(400).json({ message: 'hasCV must be a boolean value' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { hasCV },
      { new: true }
    );
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        user
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating CV status' });
  }
});

module.exports = router;
