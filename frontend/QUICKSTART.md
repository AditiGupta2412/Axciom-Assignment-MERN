# Quick Start - Frontend

## Prerequisites

- Node.js 16+ installed
- Backend running on `http://localhost:5000`
- npm or yarn

## Installation & Setup

### Step 1: Install Dependencies

```bash
cd "c:/Users/HP/OneDrive/Desktop/Projects/Axcion Assignment/frontend"
npm install
```

### Step 2: Verify Environment Configuration

Check that `.env.local` has:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Step 3: Start Frontend

```bash
npm run dev
```

Expected output:
```
▲ Next.js 14.0.0
- Local:        http://localhost:3000
- Environments: .env.local
```

### Step 4: Open in Browser

Visit: **http://localhost:3000**

You'll be redirected to the login page.

---

## Login

Use these demo credentials:

**Admin Account:**
- Username: `admin`
- Password: `admin123`

**Regular User:**
- Username: `user`
- Password: `user123`

---

## Available Pages

After login, you can access:

1. **Dashboard** (`/dashboard`)
   - View statistics
   - Quick links to main sections

2. **Books** (`/books`)
   - View all books and movies
   - Search by name or author
   - Filter by status

3. **Memberships** (`/memberships`)
   - View all members
   - Check membership status
   - View pending amounts

4. **Transactions** (`/transactions`)
   - View active issues
   - Track overdue issues
   - See fine amounts

5. **Reports** (`/reports`)
   - Generate various reports
   - View statistics by category
   - Export data

---

## Building for Production

```bash
npm run build
npm start
```

---

## Troubleshooting

### Port 3000 Already in Use
```bash
# Change port
npm run dev -- -p 3001
```

### Backend Not Connecting
- Check backend is running: `http://localhost:5000`
- Verify `.env.local` API URL
- Check browser console for errors (F12)

### Blank Page After Login
- Check browser console for errors (F12)
- Ensure backend API is accessible
- Clear browser cache (Ctrl+Shift+Delete)

---

## Development Tips

- Hot reload is enabled - changes save automatically
- Check browser DevTools (F12) for errors
- API responses shown in Network tab

---

**Ready? Visit http://localhost:3000** 🚀
