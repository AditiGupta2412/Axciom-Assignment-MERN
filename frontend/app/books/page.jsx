'use client';

import { useEffect, useState } from 'react';
import { getBooks, searchBooks } from '@/lib/services';
import { isAuthenticated } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function BooksPage() {
  const router = useRouter();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchName, setSearchName] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchBooks();
  }, [router]);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await getBooks();
      setBooks(data);
      setError('');
    } catch (err) {
      setError('Failed to load books');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await searchBooks({
        name: searchName,
        author: searchAuthor,
      });
      setBooks(data);
    } catch (err) {
      setError('Search failed');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const colors = {
      Available: 'style="background: #4caf50; color: white; padding: 0.25rem 0.75rem; border-radius: 4px;"',
      Issued: 'style="background: #ff9800; color: white; padding: 0.25rem 0.75rem; border-radius: 4px;"',
      Lost: 'style="background: #f44336; color: white; padding: 0.25rem 0.75rem; border-radius: 4px;"',
      'Under Repair': 'style="background: #2196f3; color: white; padding: 0.25rem 0.75rem; border-radius: 4px;"',
    };
    return `<span ${colors[status]}>${status}</span>`;
  };

  if (loading && books.length === 0) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading books...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', color: '#667eea' }}>📚 Books & Movies</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <form onSubmit={handleSearch} style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div className="input-group">
            <label>Book/Movie Name</label>
            <input
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              placeholder="Search by name"
            />
          </div>

          <div className="input-group">
            <label>Author</label>
            <input
              type="text"
              value={searchAuthor}
              onChange={(e) => setSearchAuthor(e.target.value)}
              placeholder="Search by author"
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button type="submit" className="btn btn-primary">
            🔍 Search
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setSearchName('');
              setSearchAuthor('');
              fetchBooks();
            }}
          >
            Reset
          </button>
        </div>
      </form>

      {books.length === 0 ? (
        <div className="alert alert-info">No books found. Try adjusting your search.</div>
      ) : (
        <>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            <strong>Total Results: {books.length}</strong>
          </p>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Author</th>
                <th>Category</th>
                <th>Type</th>
                <th>Status</th>
                <th>Cost</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book._id}>
                  <td>{book.name}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.type}</td>
                  <td dangerouslySetInnerHTML={{ __html: getStatusBadge(book.status) }}></td>
                  <td>₹{book.cost}</td>
                  <td>{book.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <div style={{ marginTop: '2rem' }}>
        <a href="/dashboard" className="btn btn-secondary">
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}
