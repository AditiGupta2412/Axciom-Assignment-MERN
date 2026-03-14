const express = require('express');
const { searchBooks, getBooks, getBookById, createBook, updateBook, deleteBook } = require('../controllers/bookController');
const { verifyToken, isAdmin } = require('../middleware/auth');

const router = express.Router();

router.get('/search', searchBooks);
router.get('/', getBooks);
router.get('/:id', getBookById);
router.post('/', verifyToken, isAdmin, createBook);
router.put('/:id', verifyToken, isAdmin, updateBook);
router.delete('/:id', verifyToken, isAdmin, deleteBook);

module.exports = router;
