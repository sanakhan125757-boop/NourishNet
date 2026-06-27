const express = require('express');
const router = express.Router();
const {
  getDonations,
  getMyDonations,
  getMyAcceptedDonations,
  createDonation,
  updateDonationStatus,
  deleteDonation,
} = require('../controllers/donationController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/roleMiddleware');

// Public or general authenticated access
router.route('/').get(getDonations);

// Donor specific routes
router.route('/')
  .post(protect, authorize('donor'), createDonation);

router.get('/mydonations', protect, authorize('donor'), getMyDonations);

// NGO specific routes
router.get('/myaccepted', protect, authorize('ngo'), getMyAcceptedDonations);
router.put('/:id/status', protect, authorize('donor', 'ngo', 'admin'), updateDonationStatus);

// Delete donation (Donor or Admin)
router.delete('/:id', protect, authorize('donor', 'admin'), deleteDonation);

module.exports = router;
