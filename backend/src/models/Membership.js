const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  membershipId: {
    type: String,
    required: [true, 'Please provide a membership ID'],
    unique: true,
    trim: true,
  },
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
  },
  contactNumber: {
    type: String,
    required: [true, 'Please provide contact number'],
  },
  aadhaarCardNo: {
    type: String,
    required: [true, 'Please provide Aadhaar card number'],
  },
  contactAddress: {
    type: String,
    required: [true, 'Please provide address'],
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date'],
  },
  duration: {
    type: String,
    enum: ['6months', '1year', '2years'],
    default: '6months',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  amountPending: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Membership', membershipSchema);
