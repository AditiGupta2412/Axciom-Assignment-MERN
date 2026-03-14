<<<<<<< HEAD
# Library Management System

A comprehensive single-page application (SPA) for managing library resources, memberships, transactions, and administrative operations.

## Project Structure

```
├── index.html          - Main HTML entry point
├── app.js              - Core router and page rendering
├── data.js             - Data layer with localStorage CRUD
├── transactions.js     - Transaction management (Issue, Return, Fine)
├── maintenance.js      - Admin maintenance (Add/Update Books, Members, Users)
├── reports.js          - Report generation and viewing
├── styles.css          - Complete styling system
└── README.md           - Project documentation
```

## Features Overview

### 1. **Authentication System**
- Secure login with session management
- Two user roles: Admin and Regular User
- Password input is securely hidden during login
- Demo credentials available on login page

### 2. **Admin Dashboard** (Admin Only)
- View library statistics (Books, Movies, Members, Active Issues)
- Access to all maintenance functions
- Full report generation capabilities
- Manage all system users and data

### 3. **Maintenance Module** (Admin Only)

#### Books/Movies Management
- **Add Book/Movie**: Create new inventory with auto-generated serial numbers
  - Select type (Book or Movie)
  - All fields mandatory: Name, Author/Director, Category, Cost, Procurement Date, Quantity
  - Comprehensive validation with error messages
  
- **Update Book/Movie**: Modify existing inventory
  - Search by name and serial number
  - Update status (Available, Issued, Lost, Under Repair)
  - Validation ensures data integrity

#### Membership Management
- **Add Membership**: Register new members
  - All fields mandatory: Name, Contact, Address, Aadhar Card Number
  - Three membership duration options: 6 months, 1 year, 2 years (default: 6 months)
  - Auto-calculated end date based on duration
  - Dynamic date updates when start date or duration changes

- **Update Membership**: Extend or cancel memberships
  - Membership number lookup with verification
  - Extend membership: 6 months, 1 year, or 2 years options
  - Cancel membership by setting end date to today
  - Automatic status update (Active/Inactive)

#### User Management
- **Add New User**: Create system accounts
  - Username, Full Name, Password (min 3 characters)
  - Permissions: Active/Inactive, Admin privileges
  - Validation prevents duplicate usernames

- **Update Existing User**: Modify user details
  - Search and update user credentials
  - Toggle admin permissions and active status
  - Password change capability

### 4. **Transactions Module** (All Users)

#### Book Availability Search
- Search available books by name or author (at least one required)
- Displays only available items
- Radio button selection for issue workflow
- Clear error messages if no results found

#### Book Issue
- **Field Validations:**
  - Book name: Required, selected from available inventory
  - Author: Auto-populated, non-editable
  - Issue Date: Cannot be before today
  - Return Date: Auto-populated 15 days ahead
    - Editable but must be between issue date and 15 days after
  - Remarks: Optional free text field
- Comprehensive validation with inline error messages

#### Book Return
- **Field Validations:**
  - Book name: Required dropdown selection
  - Serial number: Auto-populated from selected book
  - Issue date: Auto-filled, non-editable
  - Return date: Editable, can be before or after originally scheduled date
- Automatic fine calculation (₹10/day overdue)
- Transitions to payment workflow

#### Fine Payment
- **Display Fields (Read-only):**
  - Book and member information
  - Issue and return dates
  - Serial number and membership ID
- **Fine Handling:**
  - If fine > 0: Checkbox must be marked "Fine Paid" to proceed
  - If fine = 0: Direct confirmation without payment required
  - User receives clear feedback on payment status
- Transaction completion marks book as available

### 5. **Reports Module** (All Users)

Six comprehensive reports available:

1. **Master List of Books** - All books with details and status
2. **Master List of Movies** - All movies with details and status
3. **Master List of Memberships** - Member information, status, and pending fines
4. **Active Issues** - Currently issued books with due dates
5. **Overdue Returns** - Past due items with calculated fines
6. **Pending Issue Requests** - Books requested but not yet fulfilled

All reports include:
- Search-friendly table layouts
- Status badges with color coding
- Fine amounts displayed in currency format
- Quick navigation back to reports list

### 6. **User Experience Features**

#### Form Validations
- **Real-time feedback:** Error messages appear on same page
- **Field-level validation:** Errors show below specific fields
- **Clear messages:** Descriptive error text explains what's needed
- **Phone numbers:** 10-digit pattern validation
- **Dates:** Min/max constraints with auto-calculated values
- **Required fields:** Marked with red asterisk (*)

#### UI Elements
- **Radio Buttons:** Only one option selectable per group
  - Default selections: Book (not Movie), 6 months (for membership), New User
- **Checkboxes:** Checked = Yes, Unchecked = No
  - Used for: Fine paid confirmation, Active status, Admin privileges
- **Password Input:** Always hidden during typing
- **Dropdown Menus:** Auto-populate related fields
- **Date Pickers:** Min/max constraints prevent invalid dates
- **Status Badges:** Color-coded for quick visual scanning

#### Navigation
- **Chart Link:** Available on all pages for flow visualization
- **Consistent Sidebar:** Quick access to main sections
- **Breadcrumb Actions:** Back buttons maintain navigation history
- **Role-based Menu:** Admin sees maintenance options, users don't

---

## Usage Instructions

### Getting Started

1. **Open the Application**
   - Open `index.html` in a modern web browser
   - No server required - everything runs client-side

2. **Login**
   - **Admin Account:** Username: `adm` | Password: `adm`
   - **User Account:** Username: `user` | Password: `user`
   - Credentials visible on login page for demo purposes

### Admin Workflow Example

1. **First-Time Setup**
   - Go to Maintenance → Add Book/Movie to add inventory
   - Go to Maintenance → Add Membership to register members
   - Go to Maintenance → User Management to add staff

2. **Daily Operations**
   - Use Transactions → Issue Book to lend items
   - Use Transactions → Return Book when members return items
   - Pay any fines if overdue
   - View Reports for system overview

### Member Workflow Example

1. **Search & Issue**
   - Go to Transactions → Is book available?
   - Search for desired book by name or author
   - Select book to issue
   - Confirm dates (return date auto-calculated 15 days out)

2. **Return & Pay Fines**
   - Go to Transactions → Return Book
   - Select book to return
   - System calculates fine if overdue
   - Confirm fine payment (if applicable)

3. **Check Reports**
   - View inventory availability
   - Check membership details
   - Track past transactions

---

## Data Persistence

- All data stored in **Browser's LocalStorage**
- Persists across browser sessions
- Clear browser data to reset application to seed state
- No external database or API required

### Seed Data Included

- **2 Demo Users:** Admin (adm) and Member (user)
- **10 Sample Books/Movies:** Science, Economics, Fiction, Children categories
- **4 Sample Members:** Various membership statuses and pending fines
- **2 Sample Issues:** One active, one overdue
- **2 Sample Requests:** For issue request tracking

---

## Technical Stack

- **Frontend:** Vanilla JavaScript (ES6+)
- **Storage:** Browser LocalStorage API
- **Styling:** CSS3 with CSS Variables
- **Architecture:** Single Page Application (SPA) with client-side routing
- **Framework:** Custom lightweight framework (no dependencies)

---

## Validation Rules

### Book Management
- Name & Author: Not empty
- Category: Must select from predefined list
- Cost: Positive number
- Quantity: At least 1

### Member Management
- First Name & Last Name: Not empty
- Contact Number: Exactly 10 digits
- Aadhar: Alphanumeric (XXXX-XXXX-XXXX format)
- Address: Not empty

### Transactions
- **Issue Date:** Cannot be in the past
- **Return Date:** Must be between issue date and 15 days after
- **Book Selection:** At least one search criterion required
- **Fine Payment:** Checkbox required for overdue items before return completion

### User Management
- Username: Unique (not duplicate for new users)
- Password: Minimum 3 characters
- Name: Not empty

---

## Fine Calculation

- **Rate:** ₹10 per day overdue
- **Calculation:** `Days Overdue × 10`
- **Example:** 5 days overdue = ₹50 fine
- **Payment:** Required before book return is completed (if fine > 0)

---

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## Features Checklist

✅ Login & Authentication
✅ Role-based Access Control (Admin/User)
✅ Password hidden input
✅ Radio buttons (single select)
✅ Checkboxes (yes/no)
✅ Form validations on same page
✅ Automatic field population
✅ Dynamic date calculations
✅ Serial number auto-generation
✅ Fine calculation engine
✅ Book search functionality
✅ Membership management
✅ Comprehensive reports
✅ User management system
✅ Responsive design
✅ Application flow chart
✅ Transaction success/cancel pages

---

## Future Enhancements

- Search functionality in reports
- Export reports to PDF/Excel
- Email notifications for overdue items
- Reservation system for unavailable books
- Member balance/payment history
- Issue search by member name
- Bulk book import
- Advanced analytics dashboard

---

## Support & Troubleshooting

**Q: Browser shows blank page**
- Ensure JavaScript is enabled
- Clear browser cache and reload
- Try a different browser

**Q: Data disappeared after refresh**
- Check browser's storage settings
- Ensure cookies/storage not disabled
- Try incognito/private mode

**Q: Can't login**
- Use exact credentials: `adm/adm` or `user/user`
- Check if caps lock is on (password is case-sensitive)

**Q: Fine calculation seems wrong**
- Verify return date is after original due date
- Calculation: ₹10 per complete day overdue
- Fractional days round up

---

## Project Completion Status

**Mandatory Modules:**
- ✅ Maintenance Module (100%)
- ✅ Transactions Module (100%)
- ✅ Reports Module (100%)

**Feature Completeness:**
- ✅ All validations implemented
- ✅ All error messages in-place
- ✅ All calculations working
- ✅ Full role-based access control
- ✅ Complete transaction flows

---

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Production Ready
=======
# Library Management System - MERN + TypeScript

A production-grade Library Management System built with **MERN Stack** (MongoDB, Express.js, React, Next.js) and **TypeScript**.

## 🎯 Features

### Core Features
- **Book Management**: Add, update, and manage books and movies in inventory
- **Membership Management**: Create and manage library memberships
- **Issue/Return Transactions**: Issue books to members and track returns
- **Fine Management**: Automatic fine calculation for overdue books
- **Role-Based Access**: Admin and user roles with appropriate permissions
- **Dashboard**: Real-time statistics and reports

### Technical Highlights
- ✅ Full TypeScript implementation (Frontend & Backend)
- ✅ RESTful API with comprehensive error handling
- ✅ JWT Authentication with refresh tokens
- ✅ MongoDB with Mongoose ODM
- ✅ Next.js with React for UI
- ✅ Tailwind CSS for styling
- ✅ Monorepo structure for better organization
- ✅ Environment-based configuration

## 📁 Project Structure

```
Axcion Assignment - MERN/
├── backend/
│   ├── src/
│   │   ├── config/          # Database configuration
│   │   ├── controllers/     # Business logic
│   │   ├── middleware/      # Auth, error handling
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── types/           # TypeScript interfaces
│   │   ├── utils/           # JWT utilities
│   │   └── index.ts         # Server entry point
│   ├── package.json
│   ├── tsconfig.json
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── context/         # Auth store (Zustand)
│   │   ├── pages/           # Next.js pages
│   │   ├── services/        # API client
│   │   ├── styles/          # Global styles
│   │   ├── types/           # TypeScript interfaces
│   │   └── utils/           # Helper functions
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── .env.local
└── shared/ (Optional)
    └── types/               # Shared type definitions
```

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)

### Installation

1. **Clone/Extract the project**
   ```bash
   cd "Axcion Assignment - MERN"
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your MongoDB connection string and JWT secrets.

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   ```

### Running The Application

#### Backend (Terminal 1)
```bash
cd backend
npm run dev
```
Server runs on `http://localhost:5000`

#### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```
Application runs on `http://localhost:3000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api/v1
```

### Authentication Endpoints

#### Register
```http
POST /auth/register
Content-Type: application/json

{
  "username": "admin",
  "password": "password123",
  "name": "Admin User",
  "isAdmin": true
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <access_token>
```

### Book Management

#### Create Book (Admin)
```http
POST /books
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "serialNo": "B001",
  "name": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "category": "Fiction",
  "type": "book",
  "cost": 250,
  "procurementDate": "2023-01-15",
  "quantity": 5
}
```

#### Get All Books
```http
GET /books
Authorization: Bearer <access_token>

Query Parameters:
- category: string (Science, Economics, Fiction, Children, Personal Development)
- status: string (Available, Issued, Lost, Under Repair)
- type: string (book, movie)
```

#### Get Book by Serial No
```http
GET /books/:serialNo
Authorization: Bearer <access_token>
```

#### Update Book (Admin)
```http
PUT /books/:id
Authorization: Bearer <access_token>
Content-Type: application/json
```

#### Delete Book (Admin)
```http
DELETE /books/:id
Authorization: Bearer <access_token>
```

### Membership Management

#### Create Membership (Admin)
```http
POST /memberships
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "membershipId": "M001",
  "firstName": "John",
  "lastName": "Doe",
  "contactNumber": "9876543210",
  "contactAddress": "123 Main St, City",
  "aadhaarCardNo": "1234 5678 9012",
  "startDate": "2023-01-01",
  "duration": "1year"
}
```

#### Get All Memberships
```http
GET /memberships
Authorization: Bearer <access_token>

Query Parameters:
- status: string (Active, Inactive)
```

#### Get Membership by ID
```http
GET /memberships/:membershipId
Authorization: Bearer <access_token>
```

### Issue Management

#### Issue Book (Admin)
```http
POST /issues/issue
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "issueId": "I001",
  "serialNo": "B001",
  "membershipId": "M001",
  "remarks": "Optional remarks"
}
```

#### Return Book (Admin)
```http
POST /issues/return
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "issueId": "I001",
  "remarks": "Book returned in good condition"
}
```

#### Pay Fine
```http
POST /issues/pay-fine
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "issueId": "I001",
  "amountPaid": 50
}
```

#### Get All Issues
```http
GET /issues
Authorization: Bearer <access_token>

Query Parameters:
- status: string (Active, Overdue, Returned)
- membershipId: string
```

### Reports

#### Get Library Statistics
```http
GET /reports/stats
Authorization: Bearer <access_token>
```

#### Get Books by Category
```http
GET /reports/books-by-category
Authorization: Bearer <access_token>
```

#### Get Overdue Issues
```http
GET /reports/overdue-issues
Authorization: Bearer <access_token>
```

#### Generate Custom Report
```http
GET /reports/generate
Authorization: Bearer <access_token>

Query Parameters:
- type: string (issues, members, books)
- startDate: ISO date string
- endDate: ISO date string
```

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication.

### Token Structure
- **Access Token**: Valid for 7 days
- **Refresh Token**: Valid for 30 days

### Using Tokens
1. Login to get `accessToken` and `refreshToken`
2. Include token in Authorization header: `Authorization: Bearer <token>`
3. Store `refreshToken` for token refresh (implement refresh logic in frontend)

## 📊 Database Models

### User
```typescript
- _id: ObjectId
- username: string (unique)
- password: string (hashed)
- name: string
- isAdmin: boolean
- isActive: boolean
- email: string (optional)
- timestamps
```

### Book
```typescript
- _id: ObjectId
- serialNo: string (unique)
- name: string
- author: string
- category: enum
- type: enum (book/movie)
- status: enum
- cost: number
- procurementDate: date
- quantity: number
- timestamps
```

### Membership
```typescript
- _id: ObjectId
- membershipId: string (unique)
- firstName: string
- lastName: string
- contactNumber: string
- contactAddress: string
- aadhaarCardNo: string (unique)
- startDate: date
- endDate: date
- duration: enum
- status: enum
- amountPending: number
- timestamps
```

### Issue
```typescript
- _id: ObjectId
- issueId: string (unique)
- serialNo: string
- bookName: string
- author: string
- membershipId: string
- issueDate: date
- returnDate: date (14 days from issue)
- actualReturnDate: date (optional)
- fine: number
- finePaid: boolean
- status: enum
- remarks: string
- timestamps
```

## 🏗️ Building for Production

### Backend Build
```bash
cd backend
npm run build
npm start
```

### Frontend Build
```bash
cd frontend
npm run build
npm start
```

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/library-management
PORT=5000
NODE_ENV=production
JWT_SECRET=your_super_secret_key
JWT_EXPIRE=7d
REFRESH_TOKEN_SECRET=your_refresh_secret
REFRESH_TOKEN_EXPIRE=30d
CORS_ORIGIN=https://yourdomain.com
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api/v1
```

## 🧪 Testing

### Manual Testing
1. Start both backend and frontend
2. Register a new admin user
3. Login with admin account
4. Test CRUD operations for books, memberships
5. Test issue/return workflow
6. Verify fine calculations for overdue returns

### API Testing with Postman
- Import the API endpoints from documentation
- Set up environment variable for `{{BASE_URL}}`
- Create a collection with all CRUD operations
- Test role-based access restrictions

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Verify connection string in `.env`
- Check MongoDB service is running (if local)
- Ensure network access is granted (if using Atlas)

### CORS Errors
- Update `CORS_ORIGIN` in backend `.env`
- Ensure frontend URL matches origin setting

### JWT Token Errors
- Clear browser localStorage and cookies
- Regenerate JWT secrets in `.env`
- Verify token expiration times

### Port Already in Use
- Backend: `lsof -i :5000` (Mac/Linux) or change PORT in `.env`
- Frontend: `npm run dev -- -p 3001` (run on different port)

## 📦 Technologies Used

### Backend
- Express.js 4.18
- MongoDB & Mongoose 7.5
- TypeScript 5.2
- JWT for authentication
- Bcryptjs for password hashing
- Helmet for security
- CORS for cross-origin requests

### Frontend
- Next.js 14
- React 18
- TypeScript 5.2
- Tailwind CSS 3.3
- Axios for HTTP requests
- Zustand for state management

## 📄 License

MIT License - Feel free to use this project for educational and commercial purposes.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check console logs for detailed error messages

---

**Happy coding! 🚀**
>>>>>>> 1e82b3950193d469478aed4a42b47c80d69c2649
