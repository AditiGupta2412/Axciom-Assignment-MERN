const express = require('express');
const { getMemberships, getMembershipById, createMembership, updateMembership, deleteMembership } = require('../controllers/membershipController');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/', verifyToken, getMemberships);
router.get('/:id', verifyToken, getMembershipById);
router.post('/', verifyToken, isAdmin, createMembership);
router.put('/:id', verifyToken, isAdmin, updateMembership);
router.delete('/:id', verifyToken, isAdmin, deleteMembership);

module.exports = router;
