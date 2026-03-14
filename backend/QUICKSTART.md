# Quick Start Guide for Backend

## Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

## Step 1: Install Dependencies
```bash
cd backend
npm install
```

## Step 2: Setup MongoDB
You have two options:

### Option A: Local MongoDB
1. Install MongoDB Community Edition
2. Start MongoDB service
3. Create database: `library_management`

### Option B: MongoDB Atlas (Cloud)
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create free cluster
3. Get connection string
4. Replace in .env: `MONGODB_URI=your_atlas_connection_string`

## Step 3: Update .env
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/library_management
JWT_SECRET=change_this_to_strong_secret_key
JWT_EXPIRE=7d
```

## Step 4: Run Server
```bash
npm run dev
```

Expected output:
```
✅ MongoDB connected successfully
🚀 Server running on http://localhost:5000
```

## Step 5: Test API
Use Postman, Insomnia, or curl to test:

### Login
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "username": "admin",
  "password": "admin123"
}
```

You'll get a JWT token. Use it in Authorization header for other requests.

## Common Issues

### MongoDB Connection Failed
- Check MongoDB is running: `mongod --version`
- Verify connection string in .env
- For Atlas, ensure IP is whitelisted

### Port Already in Use
- Change PORT in .env
- Or kill process: `lsof -ti:5000 | xargs kill -9`

## API Documentation
See README.md for detailed API endpoints
