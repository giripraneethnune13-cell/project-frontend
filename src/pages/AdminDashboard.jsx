import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import api from '../api';
import { 
  Search, ExternalLink, MessageSquare, User, Filter, 
  RefreshCcw, Users, FolderKanban, Star, ChevronRight,
  ShieldCheck, LayoutGrid, List as ListIcon
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [students, setStudents] = useState([]);
  const [activeTab, setActiveTab] = useState('submissions');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [projRes, studRes] = await Promise.all([
        api.get('/projects'),
        api.get('/users')
      ]);
      setProjects(projRes.data);
      setStudents(studRes.data);
    } catch (err) {
      console.error('Failed to fetch admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredStudents = students.filter(s => 
    s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.department?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const StatCard = ({ icon, label, value, color }) => (
    <div className="card-static animate-scale-in" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ 
        width: '48px', 
        height: '48px', 
        borderRadius: '12px', 
        background: `rgba(var(--color-${color}-rgb), 0.1)`, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        border: `1px solid rgba(var(--color-${color}-rgb), 0.2)`
      }}>
        {React.cloneElement(icon, { color: `var(--color-${color})` })}
      </div>
      <div>
        <div style={{ fontSize: '0.75rem', color: 'var(--color-text-400)', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--color-text-100)' }}>{value}</div>
      </div>
    </div>
  );

  return (
    <div className="container">
      {/* Header */}
      <div className="animate-fade-up delay-1" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <ShieldCheck size={18} color="var(--color-brand-light)" />
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: 'var(--color-brand-light)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Administrator Access</span>
          </div>
          <h1 style={{ fontSize: '2.5rem' }}>System Overview</h1>
        </div>
        <button className="btn btn-ghost" onClick={fetchData} disabled={loading}>
          <RefreshCcw size={16} className={loading ? 'spin' : ''} /> Refresh Data
        </button>
      </div>

      {/* Stats Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <StatCard icon={<Users size={24} />} label="Total Students" value={students.length} color="cyan" />
        <StatCard icon={<FolderKanban size={24} />} label="Submissions" value={projects.length} color="brand" />
        <StatCard icon={<Star size={24} />} label="Faculty Reviews" value={projects.reduce((acc, p) => acc + (p.feedbackCount || 0), 0)} color="rose" />
      </div>

      {/* Navigation Tabs */}
      <div className="animate-fade-up delay-2" style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--glass-border)', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('submissions')}
          style={{ 
            padding: '1rem 0', 
            background: 'none', 
            border: 'none', 
            color: activeTab === 'submissions' ? 'var(--color-text-100)' : 'var(--color-text-400)',
            borderBottom: activeTab === 'submissions' ? '2px solid var(--color-brand)' : '2px solid transparent',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <LayoutGrid size={16} /> Submissions
        </button>
        <button 
          onClick={() => setActiveTab('students')}
          style={{ 
            padding: '1rem 0', 
            background: 'none', 
            border: 'none', 
            color: activeTab === 'students' ? 'var(--color-text-100)' : 'var(--color-text-400)',
            borderBottom: activeTab === 'students' ? '2px solid var(--color-brand)' : '2px solid transparent',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <Users size={16} /> Student Directory
        </button>
      </div>

      {/* Search Bar */}
      <div className="animate-fade-up delay-2" style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', maxWidth: '500px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-400)' }} />
          <input 
            className="form-input" 
            style={{ paddingLeft: '2.5rem' }} 
            placeholder={activeTab === 'submissions' ? "Search projects..." : "Search students by name, email or dept..."} 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="animate-fade-up delay-3">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '6rem 0' }}>
            <div className="spinner" style={{ margin: '0 auto' }} />
          </div>
        ) : activeTab === 'submissions' ? (
          <div className="card-static" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Project</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Student</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Status</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)' }} className="table-row-hover">
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-100)' }}>{p.title}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-400)' }}>{new Date(p.createdAt).toLocaleDateString()}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-text-200)', fontSize: '0.9rem' }}>
                          <User size={14} color="var(--color-cyan)" /> {p.studentName}
                       </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span className={`badge ${p.feedbackCount > 0 ? 'badge-emerald' : 'badge-amber'}`}>
                        {p.feedbackCount > 0 ? 'Reviewed' : 'Pending Review'}
                      </span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <Link to={`/project/${p.id}`} className="btn btn-ghost btn-sm">
                        Details <ChevronRight size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="card-static" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Full Name</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Department</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Projects</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((s) => (
                  <tr key={s.id} style={{ borderBottom: '1px solid var(--glass-border)' }} className="table-row-hover">
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-100)' }}>{s.fullName}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-text-400)' }}>{s.email}</div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.9rem', color: 'var(--color-text-300)' }}>
                      {s.department || 'N/A'}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <span className="badge badge-brand">{s.projectCount || 0} Assets</span>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <Link to={`/portfolio/${s.id}`} className="btn btn-ghost btn-sm">
                        View Portfolio <ExternalLink size={14} />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .table-row-hover:hover { background: rgba(255,255,255,0.02); }
        .spin { animation: spin 1s linear infinite; }
        :root {
          --color-brand-rgb: 108, 99, 255;
          --color-cyan-rgb: 34, 211, 238;
          --color-rose-rgb: 244, 63, 94;
        }
      `}} />
    </div>
  );
};

export default AdminDashboard;
