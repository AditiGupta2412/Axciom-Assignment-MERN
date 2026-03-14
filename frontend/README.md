# Library Management Frontend

A modern Next.js web application for managing library resources, memberships, and transactions.

## Features

✅ **Authentication**
- JWT-based login
- Session management with localStorage
- Protected routes

✅ **Pages**
- **Login Page** - User authentication
- **Dashboard** - Statistics and quick access
- **Books** - Search, view all books/movies
- **Memberships** - View all members
- **Transactions** - Track active and overdue issues
- **Reports** - Generate reports by category

✅ **UI/UX**
- Modern, responsive design
- Real-time search
- Data filtering and sorting
- Status indicators with color coding

## Installation

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Configure Environment
Make sure `.env.local` exists with:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

## Folder Structure

```
frontend/
├── app/
│   ├── page.jsx              - Home (redirects to dashboard)
│   ├── login/
│   │   └── page.jsx          - Login page
│   ├── dashboard/
│   │   └── page.jsx          - Dashboard with statistics
│   ├── books/
│   │   └── page.jsx          - Books listing & search
│   ├── memberships/
│   │   └── page.jsx          - Members listing
│   ├── transactions/
│   │   └── page.jsx          - Active & overdue issues
│   ├── reports/
│   │   └── page.jsx          - Reports dashboard
│   ├── layout.jsx            - Main layout with navbar
│   └── globals.css           - Global styles
├── lib/
│   ├── api.js                - Axios setup with interceptors
│   ├── services.js           - API service functions
│   └── auth.js               - Authentication utilities
├── components/               - React components (optional)
├── public/                   - Static assets
├── package.json
├── next.config.js
└── tsconfig.json
```

## API Endpoints Used

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - User registration

### Data Endpoints
- `GET /books` - Get all books
- `GET /books/search` - Search books
- `GET /memberships` - Get all members
- `GET /transactions/active` - Get active issues
- `GET /transactions/overdue` - Get overdue issues
- `GET /reports/dashboard` - Get dashboard stats
- `GET /reports/:type` - Get specific reports

## Demo Credentials

**Admin:**
- Username: `admin`
- Password: `admin123`

**Regular User:**
- Username: `user`
- Password: `user123`

## Building for Production

```bash
npm run build
npm start
```

## Troubleshooting

### API Connection Issues
- Ensure backend is running on `http://localhost:5000`
- Check `.env.local` configuration
- Browser console will show API errors

### 404 Errors
- Make sure all routes match your Next.js app structure
- Check that pages are in the correct directories

### Styling Issues
- Clear browser cache (Ctrl+Shift+Delete)
- Ensure `globals.css` is properly loaded

## Technologies Used

- **Next.js 14** - React framework
- **React 18** - UI library
- **Axios** - HTTP client
- **CSS** - Styling

## Future Enhancements

- [ ] Add book issue/return forms
- [ ] Add membership creation forms
- [ ] Add fine payment interface
- [ ] Dark mode support
- [ ] Mobile optimization
- [ ] Email notifications
- [ ] Export reports to PDF
