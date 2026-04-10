import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Hexagon, LayoutDashboard, User, LogOut } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="nav-brand">
          <div className="nav-brand-icon">
            <Hexagon size={16} color="#fff" strokeWidth={2.5} />
          </div>
          PortfolioHub
        </Link>

        <div className="nav-links">
          {user ? (
            <>
              <Link
                to="/dashboard"
                className="nav-link"
                style={isActive('/dashboard') ? { color: 'var(--color-text-100)', background: 'rgba(255,255,255,0.06)' } : {}}
              >
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              <Link
                to={`/portfolio/${user.userId}`}
                className="nav-link"
                style={isActive(`/portfolio/${user.userId}`) ? { color: 'var(--color-text-100)', background: 'rgba(255,255,255,0.06)' } : {}}
              >
                <User size={15} />
                Portfolio
              </Link>
              <button onClick={handleLogout} className="btn btn-ghost btn-sm" style={{ marginLeft: '0.5rem' }}>
                <LogOut size={14} />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Sign In</Link>
              <Link to="/register" className="btn btn-primary btn-sm" style={{ marginLeft: '0.25rem' }}>
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
