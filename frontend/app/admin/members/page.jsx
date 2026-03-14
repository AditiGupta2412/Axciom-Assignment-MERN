'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getMemberships, deleteMembership } from '@/lib/services';
import { getUserData } from '@/lib/auth';

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserData();
    if (!userData?.isAdmin) {
      router.push('/dashboard');
      return;
    }
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await getMemberships();
      setMembers(response.data || []);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch members');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (confirm(`Are you sure you want to delete membership for "${name}"?`)) {
      try {
        await deleteMembership(id);
        setMembers(members.filter(m => m._id !== id));
        alert('Member deleted successfully');
      } catch (err) {
        alert(err.response?.data?.message || 'Failed to delete member');
      }
    }
  };

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>👥 Manage Members</h1>
        <Link href="/admin/members/add" className="btn btn-primary">
          + Add New Member
        </Link>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="loading">Loading members...</div>}

      {!loading && members.length === 0 && (
        <div className="alert alert-info">No members found</div>
      )}

      {!loading && members.length > 0 && (
        <div style={{ overflowX: 'auto' }}>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Duration</th>
                <th>Status</th>
                <th>Amount Pending</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member._id}>
                  <td>{member.membershipId}</td>
                  <td>{member.firstName} {member.lastName}</td>
                  <td>{member.contactNumber}</td>
                  <td>{member.duration}</td>
                  <td>
                    <span className={`badge ${member.status === 'Active' ? 'badge-available' : 'badge-lost'}`}>
                      {member.status}
                    </span>
                  </td>
                  <td>₹{member.amountPending}</td>
                  <td>
                    <Link href={`/admin/members/edit/${member._id}`} className="btn btn-small btn-secondary">
                      Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(member._id, `${member.firstName} ${member.lastName}`)}
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
