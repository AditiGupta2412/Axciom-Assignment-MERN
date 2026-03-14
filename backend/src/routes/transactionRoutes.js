const express = require('express');
const { issueBook, returnBook, payFine, getIssues, getActiveIssues, getOverdueIssues } = require('../controllers/transactionController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

router.post('/issue', verifyToken, issueBook);
router.post('/return', verifyToken, returnBook);
router.post('/pay-fine', verifyToken, payFine);
router.get('/', verifyToken, getIssues);
router.get('/active', verifyToken, getActiveIssues);
router.get('/overdue', verifyToken, getOverdueIssues);

module.exports = router;
