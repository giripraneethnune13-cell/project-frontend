import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code, GraduationCap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="container animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 70px)', textAlign: 'center' }}>
      
      <div style={{ marginBottom: '3rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', color: 'var(--accent-primary)', animation: 'pulse 2s infinite' }}>
          <Sparkles size={40} />
        </div>
        <h1 className="title-glow" style={{ fontSize: '4rem', marginBottom: '1rem', letterSpacing: '-1px' }}>
          Your Work, <span className="gradient-text">Illuminated.</span>
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          The premium portfolio platform for students to showcase projects, track milestones, and get elite feedback from instructors.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '4rem' }}>
        <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Start Building Now
        </Link>
        <Link to="/login" className="btn btn-outline" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>
          Student Login
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', width: '100%', maxWidth: '1000px' }}>
        
        <div className="glass-panel" style={{ textAlign: 'left' }}>
          <Code size={32} color="var(--accent-secondary)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>Showcase Projects</h3>
          <p style={{ color: 'var(--text-muted)' }}>Upload images, PDFs, and code references to beautifully rendered public portfolio links.</p>
        </div>

        <div className="glass-panel" style={{ textAlign: 'left' }}>
          <GraduationCap size={32} color="var(--accent-purple)" style={{ marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem' }}>Track Milestones</h3>
          <p style={{ color: 'var(--text-muted)' }}>Break down massive assignments into achievable milestones and prove your workflow.</p>
        </div>

      </div>
    </div>
  );
};

export default Landing;
