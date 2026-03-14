const Membership = require('../models/Membership');

exports.getMemberships = async (req, res) => {
  try {
    const memberships = await Membership.find();
    res.json(memberships);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getMembershipById = async (req, res) => {
  try {
    const { id } = req.params;
    const membership = await Membership.findById(id);

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.json(membership);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createMembership = async (req, res) => {
  try {
    const { membershipId, firstName, lastName, contactNumber, aadhaarCardNo, contactAddress, startDate, endDate, duration, status } = req.body;

    const existingMembership = await Membership.findOne({ membershipId });
    if (existingMembership) {
      return res.status(400).json({ message: 'Membership ID already exists' });
    }

    const membership = new Membership({
      membershipId,
      firstName,
      lastName,
      contactNumber,
      aadhaarCardNo,
      contactAddress,
      startDate,
      endDate,
      duration,
      status,
    });

    await membership.save();
    res.status(201).json(membership);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, contactNumber, contactAddress, endDate, status, amountPending } = req.body;

    const membership = await Membership.findByIdAndUpdate(
      id,
      { firstName, lastName, contactNumber, contactAddress, endDate, status, amountPending },
      { new: true, runValidators: true }
    );

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.json(membership);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteMembership = async (req, res) => {
  try {
    const { id } = req.params;
    const membership = await Membership.findByIdAndDelete(id);

    if (!membership) {
      return res.status(404).json({ message: 'Membership not found' });
    }

    res.json({ message: 'Membership deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
