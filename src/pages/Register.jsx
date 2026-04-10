import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Mail, Lock, UserIcon } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    role: 'STUDENT',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. This email may already be in use.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const update = (key, value) => setFormData({ ...formData, [key]: value });

  return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 120px)' }}>
      <div className="card-static animate-scale-in" style={{ width: '100%', maxWidth: '460px' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Create your account</h2>
          <p style={{ color: 'var(--color-text-400)', fontSize: '0.9rem' }}>
            Start building your professional portfolio today
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <UserIcon size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-400)' }} />
              <input
                type="text"
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.fullName}
                onChange={(e) => update('fullName', e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label">Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-400)' }} />
              <input
                type="email"
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.email}
                onChange={(e) => update('email', e.target.value)}
                placeholder="you@university.edu"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-400)' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.password}
                onChange={(e) => update('password', e.target.value)}
                placeholder="Min 6 characters"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.85rem', fontSize: '0.95rem' }}
            disabled={loading}
          >
            {loading ? (
              <div className="spinner" style={{ width: '18px', height: '18px', borderWidth: '2px' }} />
            ) : (
              <>Create Account <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        <hr className="divider" style={{ margin: '2rem 0' }} />

        <p style={{ textAlign: 'center', color: 'var(--color-text-400)', fontSize: '0.85rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-brand-light)', fontWeight: '600' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
