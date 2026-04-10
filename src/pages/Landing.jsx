import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Code, GraduationCap } from 'lucide-react';

const Landing = () => {
  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - 120px)', textAlign: 'center' }}>
      
      <div className="animate-fade-in stagger-1" style={{ marginBottom: '4rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '0', color: 'var(--accent-primary)', opacity: '0.6' }}>
          <Sparkles size={60} />
        </div>
        <h1 className="title-glow" style={{ fontSize: '5rem', marginBottom: '1.5rem', letterSpacing: '-0.04em', lineHeight: '1' }}>
          Your Work, <br />
          <span className="gradient-text">Illuminated.</span>
        </h1>
        <p style={{ fontSize: '1.4rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6', opacity: '0.8' }}>
          The elite portfolio platform for students to showcase high-impact projects, track deep milestones, and secure direct feedback.
        </p>
      </div>

      <div className="animate-fade-in stagger-2" style={{ display: 'flex', gap: '1.5rem', marginBottom: '6rem' }}>
        <Link to="/register" className="btn btn-primary" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
          Join the Elite
        </Link>
        <Link to="/login" className="btn btn-outline" style={{ padding: '1.2rem 3rem', fontSize: '1.1rem' }}>
          Console Access
        </Link>
      </div>

      <div className="animate-fade-in stagger-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', width: '100%', maxWidth: '1100px' }}>
        
        <div className="glass-panel" style={{ textAlign: 'left' }}>
          <div style={{ background: 'rgba(69, 243, 255, 0.1)', width: 'fit-content', padding: '12px', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <Code size={32} color="var(--accent-primary)" />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Global Showcase</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Deploy beautiful, shareable public links that render your documentation and media with cinematic quality.</p>
        </div>

        <div className="glass-panel" style={{ textAlign: 'left' }}>
          <div style={{ background: 'rgba(157, 78, 221, 0.1)', width: 'fit-content', padding: '12px', borderRadius: '12px', marginBottom: '1.5rem' }}>
            <GraduationCap size={32} color="#b388ff" />
          </div>
          <h3 style={{ marginBottom: '1rem', fontSize: '1.5rem' }}>Milestone Pulse</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.6' }}>Break down complex engineering workloads into manageable milestones to track your growth across the semester.</p>
        </div>

      </div>
    </div>
  );
};

export default Landing;
