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
    <div className="container animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h1 className="title-glow" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Student Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user?.fullName}! Manage your active projects.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          <PlusCircle size={20} /> {showForm ? 'Cancel' : 'New Project'}
        </button>
      </div>

      {showForm && (
        <div className="glass-panel animate-fade-in" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1.5rem' }}>Create New Project</h3>
          <form onSubmit={createProject} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label className="input-label">Project Title</label>
              <input type="text" required className="input-field" value={newProject.title} onChange={e => setNewProject({...newProject, title: e.target.value})} />
            </div>
            <div className="input-group" style={{ gridColumn: 'span 2' }}>
              <label className="input-label">Description</label>
              <textarea rows="3" required className="input-field" value={newProject.description} onChange={e => setNewProject({...newProject, description: e.target.value})}></textarea>
            </div>
            <div className="input-group">
              <label className="input-label">GitHub URL (Optional)</label>
              <input type="url" className="input-field" value={newProject.githubUrl} onChange={e => setNewProject({...newProject, githubUrl: e.target.value})} />
            </div>
            <div className="input-group">
              <label className="input-label">Live URL (Optional)</label>
              <input type="url" className="input-field" value={newProject.liveUrl} onChange={e => setNewProject({...newProject, liveUrl: e.target.value})} />
            </div>
            <div style={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn btn-primary">Save Project</button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <p>Loading your masterpiece...</p>
      ) : projects.length === 0 ? (
        <div className="glass-panel" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h3 style={{ color: 'var(--text-muted)' }}>No projects found.</h3>
          <p>Click the "New Project" button to start your portfolio.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
          {projects.map((p) => (
            <div key={p.id} className="glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
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
