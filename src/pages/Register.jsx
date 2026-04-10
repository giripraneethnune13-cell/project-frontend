import React, { useState, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', role: 'STUDENT' });
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(formData);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed. Email might be in use.';
      setError(msg);
    }
  };

  return (
    <div className="container animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 'calc(100vh - 70px)' }}>
      <div className="glass-panel" style={{ width: '100%', maxWidth: '450px' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <UserPlus size={48} color="var(--accent-primary)" className="title-glow" style={{ marginBottom: '1rem' }} />
          <h2>Join PortfolioHub</h2>
          <p style={{ color: 'var(--text-muted)' }}>Create your student portfolio today</p>
        </div>
        
        {error && <div style={{ background: 'rgba(255,0,0,0.1)', padding: '0.75rem', borderRadius: '8px', color: '#ff6b6b', marginBottom: '1.5rem', textAlign: 'center', border: '1px solid rgba(255,0,0,0.2)' }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="input-label">Full Name</label>
            <input type="text" required className="input-field" value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} placeholder="Jane Doe" />
          </div>

          <div className="input-group">
            <label className="input-label">Email Address</label>
            <input type="email" required className="input-field" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="student@university.edu" />
          </div>
          
          <div className="input-group">
            <label className="input-label">Password</label>
            <input type="password" required className="input-field" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Create Account</button>
        </form>

        <p style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-muted)", fontSize: "0.875rem' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--accent-primary)', textDecoration: 'none' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
