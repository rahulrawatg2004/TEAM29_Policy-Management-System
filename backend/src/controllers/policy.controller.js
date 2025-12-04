const Policy = require('../models/Policy.model');
const Product = require('../models/Product.model');
const User = require('../models/User.model');
const Document = require('../models/Policy.model'); // placeholder if you want documents model
const { calculatePremium } = require('../services/premium.service');
const { processPayment } = require('../services/payment.service');
const { generatePolicyPDF } = require('../services/pdf.service');
const fs = require('fs');

exports.calculatePremium = async (req, res) => {
  try {
    const { productId, age, vehicleYear, coverageAmount } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const premium = calculatePremium({ product, age, vehicleYear, coverageAmount });
    res.json({ premium });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.purchasePolicy = async (req, res) => {
  try {
    const { productId, coverageAmount, age, vehicleYear } = req.body;
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    const premium = calculatePremium({ product, age, vehicleYear, coverageAmount });

    // process payment (stub)
    const payment = await processPayment({ amount: premium, user: req.user });
    if (!payment.success) return res.status(400).json({ message: 'Payment failed' });

    // create policy
    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setFullYear(endDate.getFullYear() + 1);
    const policyNumber = POL-${Date.now()};

    const policy = await Policy.create({
      user: req.user.id,
      product: product._id,
      premium,
      coverageAmount,
      startDate,
      endDate,
      policyNumber,
    });

    // Save uploaded files metadata (req.files) to policy.documents (demo only)
    if (req.files && req.files.length) {
      const saved = [];
      for (const f of req.files) {
        // in production upload to S3 and save URL; for now store originalname placeholder
        saved.push(f.originalname);
      }
      policy.documents = saved;
      await policy.save();
    }

    // generate PDF and attach (file path)
    const user = await User.findById(req.user.id);
    const { filePath, fileName } = await generatePolicyPDF(policy, user, product);

    // store PDF filename in documents
    policy.documents.push(/tmp/${fileName});
    await policy.save();

    res.json({ policy, pdf: /tmp/${fileName}, payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.myPolicies = async (req, res) => {
  try {
    const list = await Policy.find({ user: req.user.id }).populate('product');
    res.json(list);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.downloadPolicyPDF = async (req, res) => {
  try {
    const id = req.params.id;
    const policy = await Policy.findById(id);
    if (!policy) return res.status(404).json({ message: 'Policy not found' });
    if (policy.user.toString() !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Forbidden' });

    // find PDF path in policy.documents (simple)
    const pdfPath = policy.documents.find(d => d.endsWith('.pdf') || d.startsWith('/tmp/'));
    if (!pdfPath) return res.status(404).json({ message: 'PDF not found' });

    const realPath = pdfPath.startsWith('/tmp/') ? pdfPath.slice(1) : pdfPath; // '/tmp/x.pdf' -> 'tmp/x.pdf'
    res.download(realPath);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};