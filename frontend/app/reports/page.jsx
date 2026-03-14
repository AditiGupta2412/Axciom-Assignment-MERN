'use client';

import { useEffect, useState } from 'react';
import { getReport } from '@/lib/services';
import { isAuthenticated } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedReport, setSelectedReport] = useState('books');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    loadReport('books');
  }, [router]);

  const loadReport = async (reportType) => {
    try {
      setLoading(true);
      setSelectedReport(reportType);
      const data = await getReport(reportType);
      setReports(data);
      setError('');
    } catch (err) {
      setError(`Failed to load ${reportType} report`);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const reportTitles = {
    books: '📚 Books Report',
    movies: '🎬 Movies Report',
    members: '👥 Members Report',
    'active-issues': '⚡ Active Issues Report',
    'overdue-issues': '⚠️ Overdue Issues Report',
  };

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', color: '#667eea' }}>📊 Reports</h1>

      {error && <div className="alert alert-error">{error}</div>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2rem' }}>
        {Object.entries(reportTitles).map(([key, title]) => (
          <button
            key={key}
            onClick={() => loadReport(key)}
            className={`btn ${selectedReport === key ? 'btn-primary' : 'btn-secondary'}`}
            style={{ cursor: 'pointer' }}
          >
            {title}
          </button>
        ))}
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading report...</p>
        </div>
      )}

      {!loading && reports && reports.length === 0 && (
        <div className="alert alert-info">No data available for this report.</div>
      )}

      {!loading && reports && reports.length > 0 && (
        <>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            <strong>Total Records: {reports.length}</strong>
          </p>

          {/* Display as table if it's books, movies, or members */}
          {['books', 'movies', 'members'].includes(selectedReport) && (
            <table>
              <thead>
                <tr>
                  {selectedReport.includes('books') || selectedReport === 'movies' ? (
                    <>
                      <th>Name</th>
                      <th>Author/Director</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Status</th>
                      <th>Cost</th>
                      <th>Quantity</th>
                    </>
                  ) : (
                    <>
                      <th>Name</th>
                      <th>Member ID</th>
                      <th>Contact</th>
                      <th>Status</th>
                      <th>Amount Pending</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {reports.map((item) => (
                  <tr key={item._id}>
                    {selectedReport === 'members' ? (
                      <>
                        <td>{item.firstName} {item.lastName}</td>
                        <td>{item.membershipId}</td>
                        <td>{item.contactNumber}</td>
                        <td>{item.status}</td>
                        <td>₹{item.amountPending}</td>
                      </>
                    ) : (
                      <>
                        <td>{item.name}</td>
                        <td>{item.author}</td>
                        <td>{item.category}</td>
                        <td>{item.type}</td>
                        <td>{item.status}</td>
                        <td>₹{item.cost}</td>
                        <td>{item.quantity}</td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Display issues as table */}
          {selectedReport.includes('issues') && (
            <table>
              <thead>
                <tr>
                  <th>Issue ID</th>
                  <th>Book Name</th>
                  <th>Member ID</th>
                  <th>Status</th>
                  <th>Fine</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((issue) => (
                  <tr key={issue._id}>
                    <td>{issue.issueId}</td>
                    <td>{issue.bookName}</td>
                    <td>{issue.membershipId}</td>
                    <td>{issue.status}</td>
                    <td>₹{issue.fine}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
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
