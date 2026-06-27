const User = require('../models/User');
const Donation = require('../models/Donation');

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
const getStats = async (req, res, next) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalDonors = await User.countDocuments({ role: 'donor' });
    const totalNgos = await User.countDocuments({ role: 'ngo' });
    
    const totalDonations = await Donation.countDocuments();
    const pendingDonations = await Donation.countDocuments({ status: 'pending' });
    const completedDonations = await Donation.countDocuments({ status: 'completed' });

    res.status(200).json({
      users: {
        total: totalUsers,
        donors: totalDonors,
        ngos: totalNgos,
      },
      donations: {
        total: totalDonations,
        pending: pendingDonations,
        completed: completedDonations,
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select('-password').sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// @desc    Update user status (block/unblock)
// @route   PUT /api/admin/users/:id/status
// @access  Private (Admin)
const updateUserStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    
    if (!['active', 'blocked'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status');
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }
    
    // Prevent admin from blocking themselves
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('Cannot change own status');
    }

    user.status = status;
    const updatedUser = await user.save();

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      status: updatedUser.status
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user
// @route   DELETE /api/admin/users/:id
// @access  Private (Admin)
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      res.status(404);
      throw new Error('User not found');
    }

    // Prevent admin from deleting themselves
    if (user._id.toString() === req.user._id.toString()) {
      res.status(400);
      throw new Error('Cannot delete yourself');
    }

    await user.deleteOne();

    res.status(200).json({ id: req.params.id, message: 'User deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getStats,
  getAllUsers,
  updateUserStatus,
  deleteUser
};
