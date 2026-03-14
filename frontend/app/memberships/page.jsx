'use client';

import { useEffect, useState } from 'react';
import { getMemberships } from '@/lib/services';
import { isAuthenticated } from '@/lib/auth';
import { useRouter } from 'next/navigation';

export default function MembershipsPage() {
  const router = useRouter();
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/login');
      return;
    }

    fetchMemberships();
  }, [router]);

  const fetchMemberships = async () => {
    try {
      setLoading(true);
      const data = await getMemberships();
      setMemberships(data);
      setError('');
    } catch (err) {
      setError('Failed to load memberships');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading memberships...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 style={{ marginBottom: '2rem', color: '#667eea' }}>👥 Memberships</h1>

      {error && <div className="alert alert-error">{error}</div>}

      {memberships.length === 0 ? (
        <div className="alert alert-info">No memberships found.</div>
      ) : (
        <>
          <p style={{ marginBottom: '1rem', color: '#666' }}>
            <strong>Total Members: {memberships.length}</strong>
          </p>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Member ID</th>
                <th>Contact</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Amount Pending</th>
              </tr>
            </thead>
            <tbody>
              {memberships.map((member) => (
                <tr key={member._id}>
                  <td>{member.firstName} {member.lastName}</td>
                  <td>{member.membershipId}</td>
                  <td>{member.contactNumber}</td>
                  <td>{member.duration}</td>
                  <td>
                    <span style={{
                      background: member.status === 'Active' ? '#4caf50' : '#f44336',
                      color: 'white',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '4px',
                    }}>
                      {member.status}
                    </span>
                  </td>
                  <td>₹{member.amountPending}</td>
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
