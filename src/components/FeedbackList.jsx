import React, { useState, useEffect } from 'react';
import api from '../api';
import { MessageSquare, Calendar, User, Trash2 } from 'lucide-react';

const FeedbackList = ({ projectId, isAdmin, currentUser }) => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState({ content: '', rating: 5 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedback();
  }, [projectId]);

  const fetchFeedback = async () => {
    try {
      const res = await api.get(`/feedback/project/${projectId}`);
      setFeedbacks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const submitFeedback = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/feedback', { ...newFeedback, projectId });
      setFeedbacks([...feedbacks, res.data]);
      setNewFeedback({ content: '', rating: 5 });
    } catch (err) {
      alert('Failed to submit feedback');
    }
  };

  const deleteFeedback = async (id) => {
    try {
      await api.delete(`/feedback/${id}`);
      setFeedbacks(feedbacks.filter(f => f.id !== id));
    } catch (err) {
      alert('Failed to delete feedback');
    }
  };

  if (loading) return null;

  return (
    <div className="card-static" style={{ padding: '2rem' }}>
      <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', marginBottom: '1.5rem' }}>
        <MessageSquare size={20} color="var(--color-rose)" />
        Faculty Feedback
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
        {feedbacks.length === 0 ? (
          <p style={{ color: 'var(--color-text-400)', textAlign: 'center', padding: '1rem' }}>No feedback provided yet.</p>
        ) : (
          feedbacks.map((f) => (
            <div key={f.id} className="animate-fade-up" style={{ paddingBottom: '1.25rem', borderBottom: '1px solid var(--glass-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: 'var(--color-rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', fontWeight: 'bold' }}>
                    {f.adminName?.charAt(0)}
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{f.adminName}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="badge badge-rose" style={{ fontSize: '0.65rem' }}>Rating: {f.rating}/5</span>
                  {isAdmin && (
                    <button onClick={() => deleteFeedback(f.id)} className="btn-danger-icon" style={{ padding: '0.2rem' }}>
                      <Trash2 size={12} />
                    </button>
                  )}
                </div>
              </div>
              <p style={{ color: 'var(--color-text-300)', fontSize: '0.9rem', lineHeight: '1.6' }}>{f.content}</p>
              <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.7rem', color: 'var(--color-text-400)' }}>
                <Calendar size={10} /> {new Date(f.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))
        )}
      </div>

      {isAdmin && (
        <form onSubmit={submitFeedback} className="card" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.02)' }}>
          <h4 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Review Submission</h4>
          
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label">Review Content</label>
            <textarea 
              className="form-input" 
              rows="3" 
              required 
              placeholder="Provide constructive feedback..."
              value={newFeedback.content}
              onChange={(e) => setNewFeedback({...newFeedback, content: e.target.value})}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className="form-group" style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem' }}>
              <label className="form-label" style={{ marginBottom: 0 }}>Rating</label>
              <select 
                className="form-input" 
                style={{ width: '80px', padding: '0.35rem' }}
                value={newFeedback.rating}
                onChange={(e) => setNewFeedback({...newFeedback, rating: parseInt(e.target.value)})}
              >
                {[5,4,3,2,1].map(num => <option key={num} value={num}>{num}</option>)}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FeedbackList;
