const Donation = require('../models/Donation');

// @desc    Get all donations
// @route   GET /api/donations
// @access  Public or NGO
const getDonations = async (req, res, next) => {
  try {
    const status = req.query.status;
    let query = {};
    if (status) {
      query.status = status;
    }
    const donations = await Donation.find(query).populate('donorId', 'name email').sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in donor's donations
// @route   GET /api/donations/mydonations
// @access  Private (Donor)
const getMyDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donorId: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    next(error);
  }
};

// @desc    Get donations accepted by logged in NGO
// @route   GET /api/donations/myaccepted
// @access  Private (NGO)
const getMyAcceptedDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ ngoId: req.user._id }).populate('donorId', 'name email location').sort({ createdAt: -1 });
    res.status(200).json(donations);
  } catch (error) {
    next(error);
  }
};

// @desc    Create a new donation
// @route   POST /api/donations
// @access  Private (Donor)
const createDonation = async (req, res, next) => {
  try {
    const { title, description, quantity, location, expiryTime } = req.body;

    if (!title || !description || !quantity || !location || !expiryTime) {
      res.status(400);
      throw new Error('Please provide all required fields');
    }

    const donation = await Donation.create({
      title,
      description,
      quantity,
      location,
      expiryTime,
      donorId: req.user._id,
    });

    res.status(201).json(donation);
  } catch (error) {
    next(error);
  }
};

// @desc    Update donation status (e.g. NGO accepts)
// @route   PUT /api/donations/:id/status
// @access  Private (NGO)
const updateDonationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const donationId = req.params.id;

    if (!['pending', 'accepted', 'completed'].includes(status)) {
      res.status(400);
      throw new Error('Invalid status');
    }

    const donation = await Donation.findById(donationId);

    if (!donation) {
      res.status(404);
      throw new Error('Donation not found');
    }

    // Role-based authorization logic
    if (req.user.role === 'donor') {
      // Donors can only update their own donations
      if (donation.donorId.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('You can only update the status of your own donations');
      }
      
      // Donors cannot set status to 'accepted' (only NGOs can)
      if (status === 'accepted') {
        res.status(400);
        throw new Error('Only NGOs can accept donations');
      }
    } else if (req.user.role === 'ngo') {
      // NGOs can only update donations they have accepted or are accepting
      if (status === 'completed' && (!donation.ngoId || donation.ngoId.toString() !== req.user._id.toString())) {
        res.status(401);
        throw new Error('You can only complete donations you have accepted');
      }
    }

    // Business logic for transitions
    if (status === 'accepted') {
      if (donation.status !== 'pending') {
        res.status(400);
        throw new Error('Donation is already accepted or completed');
      }
      donation.ngoId = req.user._id;
    }

    donation.status = status;
    const updatedDonation = await donation.save();

    res.status(200).json(updatedDonation);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a donation
// @route   DELETE /api/donations/:id
// @access  Private (Donor, Admin)
const deleteDonation = async (req, res, next) => {
  try {
    const donation = await Donation.findById(req.params.id);

    if (!donation) {
      res.status(404);
      throw new Error('Donation not found');
    }

    // Make sure logged in user matches the donation user or is admin
    if (donation.donorId.toString() !== req.user.id && req.user.role !== 'admin') {
      res.status(401);
      throw new Error('User not authorized to delete this donation');
    }

    await donation.deleteOne();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDonations,
  getMyDonations,
  getMyAcceptedDonations,
  createDonation,
  updateDonationStatus,
  deleteDonation,
};
