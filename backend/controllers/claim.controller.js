const Claim = require('../models/Claim');
const Policy = require('../models/Policy');

// @desc    Get all claims
// @route   GET /api/claims
// @access  Private
const getClaims = async (req, res, next) => {
  try {
    // Different roles see different claims
    let filter = {};
    
    if (req.user.role === 'client') {
      filter.clientId = req.user.id;
    } else if (req.user.role === 'approver') {
      // Approvers might see claims needing approval
      filter.status = { $in: ['submitted', 'in_review'] };
    }
    // Admins can see all claims
    
    const claims = await Claim.find(filter)
      .populate('policyId', 'policyNumber type')
      .populate('clientId', 'name email');
    
    res.status(200).json({
      success: true,
      count: claims.length,
      claims,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get claim by ID
// @route   GET /api/claims/:id
// @access  Private
const getClaimById = async (req, res, next) => {
  try {
    const claim = await Claim.findById(req.params.id)
      .populate('policyId', 'policyNumber type')
      .populate('clientId', 'name email');
    
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found',
      });
    }
    
    // Check authorization
    if (req.user.role === 'client' && claim.clientId._id.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this claim',
      });
    }
    
    res.status(200).json({
      success: true,
      claim,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new claim
// @route   POST /api/claims
// @access  Private/Client
const createClaim = async (req, res, next) => {
  try {
    // Clients can only create claims for themselves
    req.body.clientId = req.user.id;
    
    // Verify policy belongs to client
    const policy = await Policy.findById(req.body.policyId);
    
    if (!policy) {
      return res.status(404).json({
        success: false,
        message: 'Policy not found',
      });
    }
    
    if (policy.clientId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create claim for this policy',
      });
    }
    
    const claim = await Claim.create(req.body);
    
    res.status(201).json({
      success: true,
      claim,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update claim
// @route   PUT /api/claims/:id
// @access  Private
const updateClaim = async (req, res, next) => {
  try {
    const claim = await Claim.findById(req.params.id);
    
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found',
      });
    }
    
    // Authorization check
    if (req.user.role === 'client') {
      // Clients can only update their own claims if in submitted status
      if (claim.clientId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to update this claim',
        });
      }
      
      if (claim.status !== 'submitted') {
        return res.status(400).json({
          success: false,
          message: 'Cannot update claim that is not in submitted status',
        });
      }
    } else if (req.user.role === 'approver') {
      // Approvers can only update status and approved amount
      if (!['submitted', 'in_review'].includes(claim.status)) {
        return res.status(400).json({
          success: false,
          message: 'Cannot update claim that is not in review',
        });
      }
      
      // Only allow updating specific fields
      const allowedUpdates = ['status', 'amountApproved', 'documents'];
      Object.keys(req.body).forEach(key => {
        if (!allowedUpdates.includes(key)) {
          delete req.body[key];
        }
      });
    }
    // Admins can update anything
    
    const updatedClaim = await Claim.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    res.status(200).json({
      success: true,
      claim: updatedClaim,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete claim
// @route   DELETE /api/claims/:id
// @access  Private
const deleteClaim = async (req, res, next) => {
  try {
    const claim = await Claim.findById(req.params.id);
    
    if (!claim) {
      return res.status(404).json({
        success: false,
        message: 'Claim not found',
      });
    }
    
    // Authorization check
    if (req.user.role === 'client') {
      // Clients can only delete their own claims if in submitted status
      if (claim.clientId.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to delete this claim',
        });
      }
      
      if (claim.status !== 'submitted') {
        return res.status(400).json({
          success: false,
          message: 'Cannot delete claim that is not in submitted status',
        });
      }
    } else if (req.user.role === 'approver') {
      return res.status(403).json({
        success: false,
        message: 'Approvers cannot delete claims',
      });
    }
    // Admins can delete anything
    
    await claim.remove();
    
    res.status(200).json({
      success: true,
      message: 'Claim removed',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getClaims,
  getClaimById,
  createClaim,
  updateClaim,
  deleteClaim,
};