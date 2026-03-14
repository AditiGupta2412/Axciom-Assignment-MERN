'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getUserData, clearToken } from '@/lib/auth';
import './globals.css';

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userData = getUserData();
    setUser(userData);
  }, []);

  const logout = () => {
    clearToken();
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <html lang="en">
      <body>
        <div className="app-container">
          {isClient && user && (
            <>
              <nav className="navbar">
                <div className="nav-left">
                  <h1>📚 LibraryMS</h1>
                </div>
                <div className="nav-center">
                  <Link href="/dashboard" className="nav-link">Dashboard</Link>
                  <Link href="/books" className="nav-link">Books</Link>
                  <Link href="/memberships" className="nav-link">Members</Link>
                  <Link href="/transactions" className="nav-link">Transactions</Link>
                  <Link href="/reports" className="nav-link">Reports</Link>
                  {user.isAdmin && (
                    <>
                      <div className="nav-divider"></div>
                      <Link href="/admin/books" className="nav-link admin-link">📝 Manage Books</Link>
                      <Link href="/admin/members" className="nav-link admin-link">👥 Manage Members</Link>
                      <Link href="/admin/users" className="nav-link admin-link">👨‍💼 Manage Users</Link>
                    </>
                  )}
                </div>
                <div className="nav-right">
                  <span>Welcome, {user.name}</span>
                  {user.isAdmin && <span className="badge-admin">Admin</span>}
                  <button onClick={logout} className="btn-logout">
                    Logout
                  </button>
                </div>
              </nav>
            </>
          )}
          <div className="page-content">{children}</div>
        </div>
      </body>
    </html>
  );
}
