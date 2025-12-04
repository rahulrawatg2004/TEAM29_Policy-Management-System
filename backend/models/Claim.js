const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  policyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Policy',
    required: [true, 'Policy ID is required'],
  },
  clientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Client ID is required'],
  },
  claimNumber: {
    type: String,
    required: [true, 'Claim number is required'],
    unique: true,
    trim: true,
  },
  incidentDate: {
    type: Date,
    required: [true, 'Incident date is required'],
  },
  incidentType: {
    type: String,
    required: [true, 'Incident type is required'],
    enum: ['accident', 'theft', 'natural_disaster', 'illness', 'death', 'other'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    maxlength: [1000, 'Description cannot exceed 1000 characters'],
  },
  amountRequested: {
    type: Number,
    required: [true, 'Amount requested is required'],
    min: [0, 'Amount requested must be positive'],
  },
  amountApproved: {
    type: Number,
    min: [0, 'Amount approved must be positive'],
  },
  status: {
    type: String,
    enum: ['submitted', 'in_review', 'approved', 'rejected', 'paid'],
    default: 'submitted',
  },
  documents: [{
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Claim', claimSchema);