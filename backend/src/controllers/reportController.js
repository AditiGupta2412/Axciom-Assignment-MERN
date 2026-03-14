const Book = require('../models/Book');
const Membership = require('../models/Membership');
const Issue = require('../models/Issue');
const User = require('../models/User');

exports.getReports = async (req, res) => {
  try {
    const { type } = req.params;

    switch (type) {
      case 'books':
        return res.json(await Book.find());

      case 'movies':
        return res.json(await Book.find({ type: 'movie' }));

      case 'members':
        return res.json(await Membership.find());

      case 'active-issues':
        return res.json(await Issue.find({ status: 'Active' }));

      case 'overdue-issues':
        return res.json(await Issue.find({ status: 'Overdue' }));

      case 'issue-requests':
        // For now, return empty as requests not in schema
        return res.json([]);

      default:
        return res.status(400).json({ message: 'Invalid report type' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments({ type: 'book' });
    const totalMovies = await Book.countDocuments({ type: 'movie' });
    const totalMembers = await Membership.countDocuments();
    const activeIssues = await Issue.countDocuments({ status: 'Active' });
    const overdueIssues = await Issue.countDocuments({ status: 'Overdue' });
    const totalUsers = await User.countDocuments();

    res.json({
      totalBooks,
      totalMovies,
      totalMembers,
      activeIssues,
      overdueIssues,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
