import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../AuthContext';
import api from '../api';
import { Plus, Trash2, ExternalLink, Github, Globe, FolderOpen, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({ title: '', description: '', githubUrl: '', liveUrl: '' });
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      if (!user) return;
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
    setCreating(true);
    try {
      const res = await api.post('/projects', { ...newProject, user: { id: user.userId } });
      setProjects([...projects, res.data]);
      setShowForm(false);
      setNewProject({ title: '', description: '', githubUrl: '', liveUrl: '' });
    } catch (err) {
      alert('Failed to create project');
    } finally {
      setCreating(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await api.delete(`/projects/${id}`);
      setProjects(projects.filter((p) => p.id !== id));
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="animate-fade-up delay-1" style={{ marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ color: 'var(--color-text-400)', fontSize: '0.85rem', marginBottom: '0.25rem', fontWeight: '500' }}>
              Welcome back
            </p>
            <h1 style={{ fontSize: '2rem' }}>{user?.fullName}</h1>
          </div>
          <button
            className="btn btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> New Project</>}
          </button>
        </div>
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="card-static animate-scale-in" style={{ marginBottom: '2.5rem', border: '1px solid rgba(108, 99, 255, 0.2)' }}>
          <h3 style={{ fontSize: '1.15rem', marginBottom: '1.5rem' }}>New Project</h3>
          <form onSubmit={createProject}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Title</label>
                <input type="text" required className="form-input" placeholder="My Awesome Project" value={newProject.title} onChange={(e) => setNewProject({ ...newProject, title: e.target.value })} />
              </div>
              <div className="form-group" style={{ gridColumn: 'span 2' }}>
                <label className="form-label">Description</label>
                <textarea rows="3" required className="form-input" placeholder="What does your project do? What technologies did you use?" value={newProject.description} onChange={(e) => setNewProject({ ...newProject, description: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">GitHub URL</label>
                <input type="url" className="form-input" placeholder="https://github.com/..." value={newProject.githubUrl} onChange={(e) => setNewProject({ ...newProject, githubUrl: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Live URL</label>
                <input type="url" className="form-input" placeholder="https://..." value={newProject.liveUrl} onChange={(e) => setNewProject({ ...newProject, liveUrl: e.target.value })} />
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <button type="submit" className="btn btn-primary" disabled={creating}>
                {creating ? <div className="spinner" style={{ width: '16px', height: '16px', borderWidth: '2px' }} /> : 'Create Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Content */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6rem 0' }}>
          <div className="spinner" style={{ marginBottom: '1rem' }} />
          <p style={{ color: 'var(--color-text-400)' }}>Loading your projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="card-static animate-fade-up delay-2" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
          <div className="icon-wrap icon-wrap-brand" style={{ margin: '0 auto 1.5rem' }}>
            <FolderOpen size={24} />
          </div>
          <h3 style={{ marginBottom: '0.5rem' }}>No projects yet</h3>
          <p style={{ color: 'var(--color-text-400)', maxWidth: '360px', margin: '0 auto' }}>
            Create your first project to start building your portfolio.
          </p>
        </div>
      ) : (
        <>
          {/* Stats bar */}
          <div className="animate-fade-up delay-2" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
            <span className="badge badge-brand">{projects.length} Project{projects.length !== 1 ? 's' : ''}</span>
            <span className="badge badge-emerald">Active</span>
          </div>

          {/* Project Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
            {projects.map((p, i) => (
              <div key={p.id} className={`card animate-fade-up delay-${Math.min(i + 2, 5)}`} style={{ display: 'flex', flexDirection: 'column' }}>
                {/* Card Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>{p.title}</h3>
                    <span className="badge badge-brand" style={{ marginTop: '0.25rem' }}>Project</span>
                  </div>
                  <button className="btn-danger-icon" onClick={() => deleteProject(p.id)} title="Delete project">
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Description */}
                <p style={{ color: 'var(--color-text-300)', fontSize: '0.875rem', lineHeight: '1.6', flexGrow: 1, marginBottom: '1.5rem' }}>
                  {p.description}
                </p>

                {/* Footer Actions */}
                <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {p.githubUrl && (
                      <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                        <Github size={14} /> Code
                      </a>
                    )}
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                        <Globe size={14} /> Live
                      </a>
                    )}
                  </div>
                  <Link to={`/portfolio/${user.userId}`} className="btn btn-primary btn-sm">
                    <ExternalLink size={13} /> View
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
