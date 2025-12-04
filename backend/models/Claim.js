const mongoose = require('mongoose');

const claimSchema = new mongoose.Schema({
  policy: { type: mongoose.Schema.Types.ObjectId, ref: 'Policy', required: true },
  description: { type: String },
  evidence: [{ type: String }], // file URLs
  status: { type: String, enum: ['Submitted','UnderReview','Approved','Rejected','Disbursed'], default: 'Submitted' },
  amountClaimed: { type: Number },
  amountApproved: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Claim', claimSchema);
