import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import api from '../api';
import { PlusCircle, ExternalLink, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', githubUrl: '', liveUrl: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      if (!user) return;
      // Depending on API structure, we might fetch all projects or just for the current user
      const res = await api.get(`/portfolio/${user.userId}/projects`);
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/projects', { ...newProject, user: { id: user.userId } });
      setProjects([...projects, res.data]);
      setShowForm(false);
      setNewProject({ title: '', description: '', githubUrl: '', liveUrl: '' });
    } catch (err) {
      alert("Failed to create project");
    }
  };

  const deleteProject = async (id) => {
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err) {
      alert("Failed to delete project");
    }
  };

  return (
    <div className="container">
      <div className="animate-fade-in stagger-1" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
        <div>
          <h1 className="title-glow" style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Welcome back, <span style={{color: 'var(--text-primary)'}}>{user?.fullName}</span>. Ready for your next breakthrough?</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)} style={{ padding: '1rem 2rem' }}>
          <PlusCircle size={20} /> {showForm ? 'Cancel' : 'Initialize Project'}
        </button>
      </div>

      {showForm && (
        <div className="glass-panel animate-fade-in" style={{ marginBottom: '3rem', border: '1px solid var(--accent-primary)' }}>
          <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Initialize New Build</h3>
          <form onSubmit={createProject} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label className="input-label">Project Identity</label>
              <input type="text" required className="input-field" placeholder="e.g. Neural Nexus Platform" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
            </div>
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label className="input-label">Technical Overview</label>
              <textarea rows="4" required className="input-field" placeholder="Describe the stack, the mission, and the impact..." value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})}></textarea>
            </div>
            <div className="input-group">
              <label className="input-label">Repository Access</label>
              <input type="url" className="input-field" placeholder="https://github.com/..." value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Live Deployment</label>
              <input type="url" className="input-field" placeholder="https://..." value={newProject.liveUrl} onChange={e => setNewProject({...newProject, liveUrl: e.target.value})} />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Deploy Project Entry</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="animate-fade-in" style={{ textAlign: 'center', padding: '10rem 0' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid var(--glass-border)', borderTopColor: 'var(--accent-primary)', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto 1.5rem' }}></div>
          <p style={{ color: 'var(--text-muted)' }}>Synchronizing with Aura database...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-panel animate-fade-in stagger-2" style={{ textAlign: 'center', padding: '6rem 2rem' }}>
          <h3 style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>The stage is empty.</h3>
          <p>Your brilliant work deserves a spotlight. Start by creating your first entry.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '2.5rem' }}>
          {projects.map((p, index) => (
            <div key={p.id} className={`glass-panel animate-fade-in stagger-${(index % 4) + 1}`} style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ fontSize: '1.25rem', paddingRight: '1rem' }}>{p.title}</h3>
                <button onClick={() => deleteProject(p.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ff6b6b' }}>
                  <Trash2 size={18} />
                </button>
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', flexGrow: 1, fontSize: '0.9rem', lineHeight: '1.5' }}>
                {p.description}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--glass-border)' }}>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                   {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>GitHub</a>}
                   {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-outline" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>Live</a>}
                </div>
                <Link to={`/portfolio/${user.userId}`} className="btn btn-primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}><ExternalLink size={14} /> View</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
