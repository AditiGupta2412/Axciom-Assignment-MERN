'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getBooks, deleteBook } from '@/lib/services';
import { getUserData } from '@/lib/auth';

export default function AdminBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserData();
    setUser(userData);
    if (!userData?.isAdmin) {
      router.push('/dashboard');
      return;
    }
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await getBooks();
      setBooks(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteBook(id);
        setBooks(books.filter(b => b._id !== id));
        alert('Book deleted successfully');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete book');
      }
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>📚 Manage Books</h1>
        <Link href="/admin/books/add" className="btn btn-primary">
          + Add New Book
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="loading">Loading books...</div>}

      {!loading && books.length === 0 && (
        <div className="alert alert-info">No books found</div>
      )}

      {!loading && books.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>Serial No</th>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {books.map(book => (
                <tr key={book._id}>
                  <td>{book.serialNo}</td>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.type}</td>
                  <td>{book.quantity}</td>
                  <td>
                    <span className={`badge badge-${book.status.toLowerCase().replace(/\s+/g, '-')}`}>
                      {book.status}
                    </span>
                  </td>
                  <td>₹{book.cost}</td>
                  <td>
                    <Link href={`/admin/books/edit/${book._id}`} className="btn btn-small btn-secondary">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(book._id, book.name)}
                      className="btn btn-small btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
