'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { getMemberships, updateMembership } from '@/lib/services';
import { getUserData } from '@/lib/auth';

export default function EditMember() {
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    const userData = getUserData();
    if (!userData?.isAdmin) {
      router.push('/dashboard');
      return;
    }
    fetchMember();
  }, []);

  const fetchMember = async () => {
    try {
      setLoading(true);
      const response = await getMemberships();
      const member = response.data.find(m => m._id === id);
      if (member) {
        setFormData({
          membershipId: member.membershipId,
          firstName: member.firstName,
          lastName: member.lastName,
          contactNumber: member.contactNumber,
          aadhaarCardNo: member.aadhaarCardNo,
          joinDate: member.joinDate?.split('T')[0],
          duration: member.duration,
          status: member.status,
          amountPending: member.amountPending
        });
      } else {
        setError('Member not found');
      }
    } catch (err) {
      setError('Failed to fetch member');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      
      const data = {
        ...formData,
        amountPending: parseFloat(formData.amountPending)
      };
      
      await updateMembership(id, data);
      alert('Member updated successfully!');
      router.push('/admin/members');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update member');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loading">Loading member...</div>;
  if (!formData) return <div className="alert alert-error">{error || 'Member not found'}</div>;

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h1>✏️ Edit Member</h1>
      
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
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Updating...' : 'Update Member'}
          </button>
          <Link href="/admin/members" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
