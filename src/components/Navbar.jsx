import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Rocket, LogOut, User, Layers } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', color: 'var(--text-primary)', fontWeight: '700' }}>
        <Rocket className="title-glow" size={24} color="var(--accent-primary)" />
        <span className="gradient-text">PortfolioHub</span>
      </Link>
      
      <div className="nav-links">
        {user ? (
          <>
            <Link to="/dashboard" className="nav-link"><Layers size={18} style={{marginRight: '6px', verticalAlign: 'middle'}}/>Dashboard</Link>
            <Link to={`/portfolio/${user.userId}`} className="nav-link"><User size={18} style={{marginRight: '6px', verticalAlign: 'middle'}}/>My Portfolio</Link>
            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>
              <LogOut size={16} /> Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="btn btn-primary">Sign Up Free</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
