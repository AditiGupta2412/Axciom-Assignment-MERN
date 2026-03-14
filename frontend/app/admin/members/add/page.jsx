'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createMembership } from '@/lib/services';
import { getUserData } from '@/lib/auth';

export default function AddMember() {
  const [formData, setFormData] = useState({
    membershipId: '',
    firstName: '',
    lastName: '',
    contactNumber: '',
    aadhaarCardNo: '',
    joinDate: '',
    duration: '6months',
    status: 'Active',
    amountPending: '0'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const userData = getUserData();
    if (!userData?.isAdmin) {
      router.push('/dashboard');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      
      const data = {
        ...formData,
        amountPending: parseFloat(formData.amountPending)
      };
      
      await createMembership(data);
      alert('Member added successfully!');
      router.push('/admin/members');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h1>➕ Add New Member</h1>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Membership ID *</label>
          <input
            type="text"
            name="membershipId"
            value={formData.membershipId}
            onChange={handleChange}
            required
            placeholder="e.g., M001"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>First Name *</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
              placeholder="First name"
            />
          </div>

          <div className="form-group">
            <label>Last Name *</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
              placeholder="Last name"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Contact Number *</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            placeholder="10-digit contact number"
          />
        </div>

        <div className="form-group">
          <label>Aadhaar Card Number *</label>
          <input
            type="text"
            name="aadhaarCardNo"
            value={formData.aadhaarCardNo}
            onChange={handleChange}
            required
            placeholder="12-digit Aadhaar number"
          />
        </div>

        <div className="form-group">
          <label>Join Date *</label>
          <input
            type="date"
            name="joinDate"
            value={formData.joinDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Duration *</label>
            <select name="duration" value={formData.duration} onChange={handleChange}>
              <option value="6months">6 Months</option>
              <option value="1year">1 Year</option>
              <option value="2years">2 Years</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Amount Pending (₹)</label>
          <input
            type="number"
            name="amountPending"
            value={formData.amountPending}
            onChange={handleChange}
            step="0.01"
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Member'}
          </button>
          <Link href="/admin/members" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
