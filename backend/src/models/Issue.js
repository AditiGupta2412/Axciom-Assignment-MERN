const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  issueId: {
    type: String,
    required: [true, 'Please provide an issue ID'],
    unique: true,
    trim: true,
  },
  serialNo: {
    type: String,
    required: [true, 'Please provide serial number'],
    ref: 'Book',
  },
  membershipId: {
    type: String,
    required: [true, 'Please provide membership ID'],
    ref: 'Membership',
  },
  bookName: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  issueDate: {
    type: Date,
    default: Date.now,
    required: true,
  },
  returnDate: {
    type: Date,
    required: [true, 'Please provide return date'],
  },
  actualReturnDate: {
    type: Date,
    default: null,
  },
  fine: {
    type: Number,
    default: 0,
  },
  finePaid: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ['Active', 'Overdue', 'Returned'],
    default: 'Active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Issue', issueSchema);
