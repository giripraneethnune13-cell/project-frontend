import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Target, MessageSquare, Shield, Zap, BarChart3 } from 'lucide-react';

const Landing = () => {
  const features = [
    {
      icon: <Layers size={24} />,
      title: 'Project Showcase',
      desc: 'Upload screenshots, documents, and code to beautifully rendered project pages with shareable public links.',
      color: 'brand',
    },
    {
      icon: <Target size={24} />,
      title: 'Milestone Tracking',
      desc: 'Break complex projects into trackable milestones. Show your progress timeline to reviewers with precision.',
      color: 'cyan',
    },
    {
      icon: <MessageSquare size={24} />,
      title: 'Faculty Feedback',
      desc: 'Receive structured ratings and comments from instructors directly attached to each project submission.',
      color: 'rose',
    },
  ];

  const stats = [
    { value: '500+', label: 'Active Students' },
    { value: '1.2K', label: 'Projects Hosted' },
    { value: '98%', label: 'Satisfaction Rate' },
  ];

  return (
    <div className="container">
      {/* Hero Section */}
      <section style={{ textAlign: 'center', paddingTop: '4rem', paddingBottom: '6rem' }}>
        <div className="animate-fade-up delay-1" style={{ marginBottom: '1.5rem' }}>
          <span className="badge badge-brand">
            <Zap size={12} />
            Student Portfolio Platform
          </span>
        </div>

        <h1
          className="animate-fade-up delay-2"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', maxWidth: '800px', margin: '0 auto 1.5rem' }}
        >
          Build. Showcase.{' '}
          <span className="gradient-text">Get Noticed.</span>
        </h1>

        <p
          className="animate-fade-up delay-3"
          style={{
            fontSize: '1.15rem',
            color: 'var(--color-text-300)',
            maxWidth: '560px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.7',
          }}
        >
          The modern platform for students to document projects, track milestones, and receive expert feedback — all in one place.
        </p>

        <div className="animate-fade-up delay-4" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/register" className="btn btn-primary btn-lg">
            Start Free <ArrowRight size={18} />
          </Link>
          <Link to="/login" className="btn btn-ghost btn-lg">
            Sign In
          </Link>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="animate-fade-up delay-5" style={{ marginBottom: '6rem' }}>
        <div
          className="card-static"
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '4rem',
            flexWrap: 'wrap',
            padding: '2rem 3rem',
          }}
        >
          {stats.map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: '800', fontFamily: 'Outfit', color: 'var(--color-text-100)' }}>
                {s.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-400)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: '600' }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ marginBottom: '6rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 className="animate-fade-up" style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>
            Everything you need to <span className="gradient-text">stand out</span>
          </h2>
          <p className="animate-fade-up delay-1" style={{ color: 'var(--color-text-300)', maxWidth: '500px', margin: '0 auto' }}>
            Designed by students, for students. Every feature is built to make your work shine.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
          {features.map((f, i) => (
            <div key={i} className={`card animate-fade-up delay-${i + 2}`}>
              <div className={`icon-wrap icon-wrap-${f.color}`} style={{ marginBottom: '1.5rem' }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.75rem' }}>{f.title}</h3>
              <p style={{ color: 'var(--color-text-300)', fontSize: '0.9rem', lineHeight: '1.6' }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="animate-fade-up" style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div
          className="card-static"
          style={{
            padding: '4rem 2rem',
            background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.08), rgba(34, 211, 238, 0.04))',
            border: '1px solid rgba(108, 99, 255, 0.15)',
          }}
        >
          <div className="icon-wrap icon-wrap-brand" style={{ margin: '0 auto 1.5rem' }}>
            <BarChart3 size={24} />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Ready to showcase your best work?</h2>
          <p style={{ color: 'var(--color-text-300)', maxWidth: '400px', margin: '0 auto 2rem' }}>
            Join hundreds of students already building stunning portfolios.
          </p>
          <Link to="/register" className="btn btn-primary btn-lg">
            Create Your Portfolio <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem 0', borderTop: '1px solid var(--glass-border)' }}>
        <p style={{ color: 'var(--color-text-400)', fontSize: '0.8rem' }}>
          © 2026 PortfolioHub · Built with Spring Boot & React · FSAD Project
        </p>
      </footer>
    </div>
  );
};

export default Landing;
