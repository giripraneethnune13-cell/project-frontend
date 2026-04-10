import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing';
import Portfolio from './pages/Portfolio';
import AdminDashboard from './pages/AdminDashboard';
import ProjectDetails from './pages/ProjectDetails';

const PrivateRoute = ({ children, role }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) return null;
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/dashboard" />;
  return children;
};

const AppContent = () => {
  return (
    <Router>
      {/* Atmospheric Background Layers */}
      <div className="bg-orbs">
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="bg-grid" />

      <div className="page-wrapper">
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={
            <PrivateRoute role="STUDENT">
              <Dashboard />
            </PrivateRoute>
          } />
          <Route path="/admin" element={
            <PrivateRoute role="ADMIN">
              <AdminDashboard />
            </PrivateRoute>
          } />
          <Route path="/project/:id" element={
            <PrivateRoute>
              <ProjectDetails />
            </PrivateRoute>
          } />
          <Route path="/portfolio/:id" element={<Portfolio />} />
        </Routes>
      </div>
    </Router>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
