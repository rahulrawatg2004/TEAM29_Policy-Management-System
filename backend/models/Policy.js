const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  policyNumber: {
    type: String,
    required: [true, 'Policy number is required'],
    unique: true,
    trim: true,
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client ID is required'],
  },
  type: {
    type: String,
    required: [true, 'Policy type is required'],
    enum: ['life', 'health', 'auto', 'home', 'travel'],
  },
  premium: {
    type: Number,
    required: [true, 'Premium amount is required'],
    min: [0, 'Premium must be positive'],
  },
  coverageAmount: {
    type: Number,
    required: [true, 'Coverage amount is required'],
    min: [0, 'Coverage amount must be positive'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required'],
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required'],
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'expired', 'cancelled'],
    default: 'active',
  },
  beneficiaries: [{
    name: {
      type: String,
      required: true,
    },
    relationship: {
      type: String,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Policy', policySchema);