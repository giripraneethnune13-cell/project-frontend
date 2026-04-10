import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import api from '../api';
import MilestoneList from '../components/MilestoneList';
import MediaGallery from '../components/MediaGallery';
import FeedbackList from '../components/FeedbackList';
import { Github, Globe, ArrowLeft, Calendar, User as UserIcon } from 'lucide-react';

const ProjectDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProject();
  }, [id]);

  const fetchProject = async () => {
    try {
      const res = await api.get(`/projects/${id}`);
      setProject(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="container" style={{ display: 'flex', justifyContent: 'center', padding: '10rem 0' }}>
      <div className="spinner" />
    </div>
  );

  if (!project) return (
    <div className="container" style={{ textAlign: 'center', padding: '10rem 0' }}>
      <h2>Project not found</h2>
      <Link to="/dashboard" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Dashboard</Link>
    </div>
  );

  const isOwner = user && user.userId === project.studentId;
  const isAdmin = user && user.role === 'ADMIN';

  return (
    <div className="container">
      {/* Header */}
      <div className="animate-fade-up delay-1" style={{ marginBottom: '3rem' }}>
        <Link to={isAdmin ? "/admin" : "/dashboard"} className="btn btn-ghost btn-sm" style={{ marginBottom: '1.5rem' }}>
          <ArrowLeft size={14} /> Back to Dashboard
        </Link>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{project.title}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--color-text-400)', fontSize: '0.9rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <UserIcon size={16} /> {project.studentName}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <Calendar size={16} /> Created {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
             {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <Github size={18} /> Repository
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noreferrer" className="btn btn-primary">
                <Globe size={18} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Overview Section */}
          <div className="card-static animate-fade-up delay-2">
            <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>Technical Overview</h3>
            <p style={{ color: 'var(--color-text-300)', lineHeight: '1.8', whiteSpace: 'pre-wrap' }}>
              {project.description}
            </p>
          </div>

          {/* Media Gallery */}
          <div className="animate-fade-up delay-4">
            <MediaGallery projectId={id} isOwner={isOwner} />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {/* Milestone Tracking */}
          <div className="animate-fade-up delay-3">
            <MilestoneList projectId={id} isOwner={isOwner} />
          </div>

          {/* Faculty Feedback */}
          <div className="animate-fade-up delay-5">
            <FeedbackList projectId={id} isAdmin={isAdmin} currentUser={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
