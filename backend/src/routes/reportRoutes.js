const express = require('express');
const { getReports, getDashboard } = require('../controllers/reportController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.get('/dashboard', verifyToken, getDashboard);
router.get('/:type', verifyToken, getReports);

module.exports = router;
