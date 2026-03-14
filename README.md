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
