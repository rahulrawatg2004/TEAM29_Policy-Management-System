const Policy = require('../models/Policy');
const User = require('../models/User');

// @desc    Get all policies
// @route   GET /api/policies
// @access  Private
const getPolicies = async (req, res, next) => {
  try {
    // Admins can see all policies, clients only theirs
    const filter = req.user.role === 'admin' ? {} : { clientId: req.user.id };
    
    const policies = await Policy.find(filter).populate('clientId', 'name email');
    
    res.status(200).json({
      success: true,
      count: policies.length,
      policies,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get policy by ID
// @route   GET /api/policies/:id
// @access  Private
const getPolicyById = async (req, res, next) => {
  try {
    const policy = await Policy.findById(req.params.id).populate('clientId', 'name email');
    
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found',
      });
    }
    
    // Check if user is authorized to view this policy
    if (req.user.role !== 'admin' && policy.clientId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this policy',
      });
    }
    
    res.status(200).json({
      success: true,
      policy,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new policy
// @route   POST /api/policies
// @access  Private/Admin
const createPolicy = async (req, res, next) => {
  try {
    // Only admins can create policies
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create policies',
      });
    }
    
    const policy = await Policy.create(req.body);
    
    res.status(201).json({
      success: true,
      policy,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update policy
// @route   PUT /api/policies/:id
// @access  Private/Admin
const updatePolicy = async (req, res, next) => {
  try {
    // Only admins can update policies
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update policies',
      });
    }
    
    const policy = await Policy.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found',
      });
    }
    
    res.status(200).json({
      success: true,
      policy,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete policy
// @route   DELETE /api/policies/:id
// @access  Private/Admin
const deletePolicy = async (req, res, next) => {
  try {
    // Only admins can delete policies
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete policies',
      });
    }
    
    const policy = await Policy.findById(req.params.id);
    
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found',
      });
    }
    
    await policy.remove();
    
    res.status(200).json({
      success: true,
      message: 'Policy removed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPolicies,
  getPolicyById,
  createPolicy,
  updatePolicy,
  deletePolicy,
};