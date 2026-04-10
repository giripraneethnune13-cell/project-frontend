import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import api from '../api';
import { Search, ExternalLink, MessageSquare, User, Filter, RefreshCcw } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      {/* Header */}
      <div className="animate-fade-up delay-1" style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Portfolio Console</h1>
        <p style={{ color: 'var(--color-text-400)' }}>Monitoring all active student submissions and progress.</p>
      </div>

      {/* Control Bar */}
      <div className="animate-fade-up delay-2" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', flexGrow: 1, maxWidth: '500px' }}>
          <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-text-400)' }} />
          <input 
            className="form-input" 
            style={{ paddingLeft: '2.5rem' }} 
            placeholder="Search projects or students..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="btn btn-ghost" onClick={fetchProjects}>
          <RefreshCcw size={16} /> Refresh
        </button>
      </div>

      {/* Projects List */}
      <div className="animate-fade-up delay-3">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '10rem 0' }}>
            <div className="spinner" style={{ margin: '0 auto' }} />
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="card-static" style={{ textAlign: 'center', padding: '6rem' }}>
             <p style={{ color: 'var(--color-text-400)' }}>No projects found matching your criteria.</p>
          </div>
        ) : (
          <div className="card-static" style={{ padding: '0', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Project & Student</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Created</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Links</th>
                  <th style={{ padding: '1.25rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-text-400)' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((p) => (
                  <tr key={p.id} style={{ borderBottom: '1px solid var(--glass-border)', transition: 'background 0.2s ease' }} className="table-row-hover">
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ fontWeight: '600', color: 'var(--color-text-100)', marginBottom: '0.25rem' }}>{p.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: 'var(--color-text-400)' }}>
                        <User size={12} /> {p.studentName}
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', color: 'var(--color-text-300)' }}>
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" title="GitHub" style={{ color: 'var(--color-text-400)' }}><ExternalLink size={16} /></a>}
                        {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" title="Live Site" style={{ color: 'var(--color-cyan)' }}><ExternalLink size={16} /></a>}
                      </div>
                    </td>
                    <td style={{ padding: '1.25rem 1.5rem' }}>
                      <Link to={`/project/${p.id}`} className="btn btn-primary btn-sm">
                        Review Submission
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
      `}} />
    </div>
  );
};

export default AdminDashboard;
