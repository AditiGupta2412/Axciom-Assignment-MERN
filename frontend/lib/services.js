import api from './api';

// Auth
export const authLogin = (username, password) =>
  api.post('/auth/login', { username, password });

export const authRegister = (username, password, name, isAdmin) =>
  api.post('/auth/register', { username, password, name, isAdmin });

// Books
export const getBooks = () => api.get('/books');

export const searchBooks = (params) =>
  api.get('/books/search', { params });

export const createBook = (data) =>
  api.post('/books', data);

export const updateBook = (id, data) =>
  api.put(`/books/${id}`, data);

export const deleteBook = (id) =>
  api.delete(`/books/${id}`);

// Memberships
export const getMemberships = () =>
  api.get('/memberships');

export const createMembership = (data) =>
  api.post('/memberships', data);

export const updateMembership = (id, data) =>
  api.put(`/memberships/${id}`, data);

export const deleteMembership = (id) =>
  api.delete(`/memberships/${id}`);

// Transactions
export const issueBook = (data) =>
  api.post('/transactions/issue', data);

export const returnBook = (data) =>
  api.post('/transactions/return', data);

export const payFine = (data) =>
  api.post('/transactions/pay-fine', data);

export const getActiveIssues = () =>
  api.get('/transactions/active');

export const getOverdueIssues = () =>
  api.get('/transactions/overdue');

// Users
export const getUsers = () =>
  api.get('/users');

export const createUser = (data) =>
  api.post('/users', data);

export const updateUser = (id, data) =>
  api.put(`/users/${id}`, data);

export const deleteUser = (id) =>
  api.delete(`/users/${id}`);

// Reports
export const getDashboard = () =>
  api.get('/reports/dashboard');

export const getReport = (type) =>
  api.get(`/reports/${type}`);
