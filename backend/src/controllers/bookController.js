const Book = require('../models/Book');

exports.searchBooks = async (req, res) => {
  try {
    const { name, author } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: 'i' };
    if (author) filter.author = { $regex: author, $options: 'i' };

    const books = await Book.find(filter);
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { serialNo, name, author, category, type, cost, procurementDate, quantity } = req.body;

    const existingBook = await Book.findOne({ serialNo });
    if (existingBook) {
      return res.status(400).json({ message: 'Serial number already exists' });
    }

    const book = new Book({
      serialNo,
      name,
      author,
      category,
      type,
      cost,
      procurementDate,
      quantity,
    });

    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, author, category, status, cost, quantity } = req.body;

    const book = await Book.findByIdAndUpdate(
      id,
      { name, author, category, status, cost, quantity },
      { new: true, runValidators: true }
    );

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
