'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBook } from '@/lib/services';
import { getUserData } from '@/lib/auth';

export default function AddBook() {
  const [formData, setFormData] = useState({
    serialNo: '',
    name: '',
    author: '',
    category: '',
    type: 'book',
    status: 'Available',
    cost: '',
    procurementDate: '',
    quantity: '1'
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
        cost: parseFloat(formData.cost),
        quantity: parseInt(formData.quantity)
      };
      
      await createBook(data);
      alert('Book added successfully!');
      router.push('/admin/books');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add book');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h1>➕ Add New Book</h1>
      
      {error && <div className="alert alert-error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Serial Number *</label>
          <input
            type="text"
            name="serialNo"
            value={formData.serialNo}
            onChange={handleChange}
            required
            placeholder="e.g., B001"
          />
        </div>

        <div className="form-group">
          <label>Book Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter book name"
          />
        </div>

        <div className="form-group">
          <label>Author *</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            placeholder="Enter author name"
          />
        </div>

        <div className="form-group">
          <label>Category *</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="e.g., Fiction, Science, etc."
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Type *</label>
            <select name="type" value={formData.type} onChange={handleChange}>
              <option value="book">Book</option>
              <option value="movie">Movie</option>
            </select>
          </div>

          <div className="form-group">
            <label>Status *</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option value="Available">Available</option>
              <option value="Issued">Issued</option>
              <option value="Lost">Lost</option>
              <option value="Under Repair">Under Repair</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Cost (₹) *</label>
            <input
              type="number"
              name="cost"
              value={formData.cost}
              onChange={handleChange}
              required
              step="0.01"
              placeholder="Enter cost"
            />
          </div>

          <div className="form-group">
            <label>Quantity *</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              min="1"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Procurement Date *</label>
          <input
            type="date"
            name="procurementDate"
            value={formData.procurementDate}
            onChange={handleChange}
            required
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Adding...' : 'Add Book'}
          </button>
          <Link href="/admin/books" className="btn btn-secondary">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
