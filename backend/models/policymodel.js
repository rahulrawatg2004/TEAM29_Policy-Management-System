const mongoose = require('mongoose');

const policySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  premium: { type: Number, required: true },
  coverageAmount: { type: Number, required: true },
  documents: [{ type: String }], // file URLs
  startDate: { type: Date, default: Date.now },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['Active','Expired','Cancelled'], default: 'Active' },
  policyNumber: { type: String, unique: true },
}, { timestamps: true });

module.exports = mongoose.model('Policy', policySchema);
