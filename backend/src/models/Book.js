const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  serialNo: {
    type: String,
    required: [true, 'Please provide a serial number'],
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  author: {
    type: String,
    required: [true, 'Please provide an author'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
  },
  type: {
    type: String,
    enum: ['book', 'movie'],
    required: true,
  },
  status: {
    type: String,
    enum: ['Available', 'Issued', 'Lost', 'Under Repair'],
    default: 'Available',
  },
  cost: {
    type: Number,
    required: [true, 'Please provide a cost'],
  },
  procurementDate: {
    type: Date,
    required: [true, 'Please provide a procurement date'],
  },
  quantity: {
    type: Number,
    default: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Book', bookSchema);
