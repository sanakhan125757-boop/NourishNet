const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a title for the donation'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description'],
    },
    quantity: {
      type: String,
      required: [true, 'Please specify the quantity (e.g., 10 kg, 50 meals)'],
    },
    location: {
      type: String,
      required: [true, 'Please provide the pickup location'],
    },
    expiryTime: {
      type: Date,
      required: [true, 'Please specify the expiry time of the food'],
    },
    donorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    ngoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    status: {
      type: String,
      enum: ['pending', 'accepted', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Donation', donationSchema);
