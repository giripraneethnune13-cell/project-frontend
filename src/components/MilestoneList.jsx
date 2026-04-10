import React, { useState, useEffect } from 'react';
import api from '../api';
import { CheckCircle2, Circle, Plus, Trash2, Target } from 'lucide-react';

const MilestoneList = ({ projectId, isOwner }) => {
  const [milestones, setMilestones] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMilestones();
  }, [projectId]);

  const fetchMilestones = async () => {
    try {
      const res = await api.get(`/milestones/project/${projectId}`);
      setMilestones(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addMilestone = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    try {
      const res = await api.post('/milestones', { title: newTitle, projectId, completed: false });
      setMilestones([...milestones, res.data]);
      setNewTitle('');
    } catch (err) {
      alert('Failed to add milestone');
    }
  };

  const toggleMilestone = async (id) => {
    if (!isOwner) return;
    try {
      const res = await api.patch(`/milestones/${id}/toggle`);
      setMilestones(milestones.map(m => m.id === id ? res.data : m));
    } catch (err) {
      alert('Failed to update milestone');
    }
  };

  const deleteMilestone = async (id) => {
    try {
      await api.delete(`/milestones/${id}`);
      setMilestones(milestones.filter(m => m.id !== id));
    } catch (err) {
      alert('Failed to delete milestone');
    }
  };

  const completedCount = milestones.filter(m => m.completed).length;
  const progressPercent = milestones.length > 0 ? Math.round((completedCount / milestones.length) * 100) : 0;

  if (loading) return null;

  return (
    <div className="card-static" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
          <Target size={20} color="var(--color-cyan)" />
          Progress Tracking
        </h3>
        <span className="badge badge-cyan">{progressPercent}% Complete</span>
      </div>

      {/* Progress Bar */}
      <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginBottom: '2rem', overflow: 'hidden' }}>
        <div 
          style={{ 
            height: '100%', 
            width: `${progressPercent}%`, 
            background: 'linear-gradient(90deg, var(--color-brand), var(--color-cyan))',
            transition: 'width 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
            boxShadow: '0 0 10px var(--color-cyan-glow)'
          }} 
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {milestones.map((m) => (
          <div 
            key={m.id} 
            className="animate-fade-up"
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1rem', 
              padding: '0.75rem 1rem', 
              background: 'rgba(255,255,255,0.03)', 
              borderRadius: 'var(--radius-sm)',
              border: m.completed ? '1px solid rgba(16, 185, 129, 0.2)' : '1px solid transparent'
            }}
          >
            <button 
              onClick={() => toggleMilestone(m.id)}
              style={{ background: 'none', border: 'none', cursor: isOwner ? 'pointer' : 'default', padding: 0 }}
            >
              {m.completed ? (
                <CheckCircle2 size={20} color="var(--color-emerald)" />
              ) : (
                <Circle size={20} color="var(--color-text-400)" />
              )}
            </button>
            <span style={{ 
              flex: 1, 
              fontSize: '0.9rem', 
              textDecoration: m.completed ? 'line-through' : 'none',
              color: m.completed ? 'var(--color-text-400)' : 'var(--color-text-200)' 
            }}>
              {m.title}
            </span>
            {isOwner && (
              <button 
                className="btn-danger-icon" 
                onClick={() => deleteMilestone(m.id)}
                style={{ padding: '0.2rem' }}
              >
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>

      {isOwner && (
        <form onSubmit={addMilestone} style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="New milestone step..." 
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            style={{ fontSize: '0.85rem' }}
          />
          <button type="submit" className="btn btn-primary" style={{ padding: '0.65rem' }}>
            <Plus size={18} />
          </button>
        </form>
      )}
    </div>
  );
};

export default MilestoneList;
