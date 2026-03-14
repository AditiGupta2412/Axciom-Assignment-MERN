# Library Management System - Backend

A complete Node.js/Express/MongoDB backend API for managing library resources.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Update `.env` file with your MongoDB URI and JWT secret:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
```

### 3. Run Development Server
```bash
npm run dev
```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login and get JWT token
- `POST /api/auth/register` - Register new user

### Users (Admin Only)
- `GET /api/users` - List all users
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Books
- `GET /api/books` - List all books
- `GET /api/books/search?name=x&author=y` - Search books
- `GET /api/books/:id` - Get single book
- `POST /api/books` - Create book (Admin only)
- `PUT /api/books/:id` - Update book (Admin only)
- `DELETE /api/books/:id` - Delete book (Admin only)

### Memberships
- `GET /api/memberships` - List all memberships
- `GET /api/memberships/:id` - Get single membership
- `POST /api/memberships` - Create membership (Admin only)
- `PUT /api/memberships/:id` - Update membership (Admin only)
- `DELETE /api/memberships/:id` - Delete membership (Admin only)

### Transactions
- `POST /api/transactions/issue` - Issue a book
- `POST /api/transactions/return` - Return a book
- `POST /api/transactions/pay-fine` - Pay fine
- `GET /api/transactions` - List all issues
- `GET /api/transactions/active` - List active issues
- `GET /api/transactions/overdue` - List overdue issues

### Reports
- `GET /api/reports/dashboard` - Dashboard statistics
- `GET /api/reports/:type` - Get report (books, movies, members, active-issues, overdue-issues)

## Authentication

All endpoints except `/api/auth/login` and `/api/auth/register` require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Admin-only endpoints additionally check if the user is an admin.

## Database Models

### User
- username (unique)
- pwdHash
- name
- isAdmin
- isActive

### Book
- serialNo (unique)
- name
- author
- category
- type (book/movie)
- status (Available/Issued/Lost/Under Repair)
- cost
- procurementDate
- quantity

### Membership
- membershipId (unique)
- firstName, lastName
- contactNumber, aadhaarCardNo
- contactAddress
- startDate, endDate
- duration (6months/1year/2years)
- status (Active/Inactive)
- amountPending

### Issue
- issueId (unique)
- serialNo
- membershipId
- bookName, author
- issueDate, returnDate
- actualReturnDate
- fine (₹10/day overdue)
- finePaid
- status (Active/Overdue/Returned)
