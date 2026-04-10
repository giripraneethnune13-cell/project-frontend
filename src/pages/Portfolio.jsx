import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { Github, Globe, Calendar, Mail, BookOpen } from 'lucide-react';

const Portfolio = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, projectRes] = await Promise.all([
          api.get(`/portfolio/${id}`),
          api.get(`/portfolio/${id}/projects`),
        ]);
        setUser(userRes.data);
        setProjects(projectRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="spinner" style={{ marginBottom: '1rem' }} />
        <p style={{ color: 'var(--color-text-400)' }}>Loading portfolio...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container" style={{ textAlign: 'center', paddingTop: '6rem' }}>
        <h2>Portfolio not found</h2>
        <p style={{ color: 'var(--color-text-400)', marginTop: '0.5rem' }}>This user doesn't exist or has no public portfolio.</p>
      </div>
    );
  }

  return (
    <div className="container">
      {/* Profile Header */}
      <div className="card-static animate-fade-up delay-1" style={{ marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Avatar */}
          <div
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-brand), var(--color-cyan))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              fontWeight: '800',
              fontFamily: 'Outfit',
              color: '#fff',
              flexShrink: 0,
            }}
          >
            {user.fullName?.charAt(0)?.toUpperCase()}
          </div>

          {/* Info */}
          <div style={{ flex: 1 }}>
            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{user.fullName}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', color: 'var(--color-text-400)', fontSize: '0.85rem' }}>
              {user.email && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Mail size={14} /> {user.email}
                </span>
              )}
              {user.department && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <BookOpen size={14} /> {user.department}
                </span>
              )}
            </div>
            {user.bio && (
              <p style={{ marginTop: '0.75rem', color: 'var(--color-text-300)', lineHeight: '1.6' }}>{user.bio}</p>
            )}
          </div>
        </div>
      </div>

      {/* Projects Section */}
      <div className="animate-fade-up delay-2" style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '1.3rem' }}>
          Projects <span style={{ color: 'var(--color-text-400)', fontWeight: '400', fontSize: '1rem' }}>({projects.length})</span>
        </h2>
      </div>

      {projects.length === 0 ? (
        <div className="card-static animate-fade-up delay-3" style={{ textAlign: 'center', padding: '4rem' }}>
          <p style={{ color: 'var(--color-text-400)' }}>No projects published yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem' }}>
          {projects.map((p, i) => (
            <div key={p.id} className={`card animate-fade-up delay-${Math.min(i + 3, 5)}`}>
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>{p.title}</h3>
              <p style={{ color: 'var(--color-text-300)', fontSize: '0.875rem', lineHeight: '1.6', marginBottom: '1.25rem' }}>
                {p.description}
              </p>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {p.githubUrl && (
                  <a href={p.githubUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                    <Github size={14} /> Source
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                    <Globe size={14} /> Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Portfolio;
