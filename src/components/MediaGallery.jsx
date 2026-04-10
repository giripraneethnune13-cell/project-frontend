import React, { useState, useEffect } from 'react';
import api from '../api';
import { Upload, File, Image as ImageIcon, Download, Trash2, X } from 'lucide-react';

const MediaGallery = ({ projectId, isOwner }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFiles();
  }, [projectId]);

  const fetchFiles = async () => {
    try {
      const res = await api.get(`/files/project/${projectId}`);
      setFiles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('projectId', projectId);

    try {
      const res = await api.post('/files/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFiles([...files, res.data]);
    } catch (err) {
      alert('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const deleteFile = async (id) => {
    if (!window.confirm('Remove this file?')) return;
    try {
      await api.delete(`/files/${id}`);
      setFiles(files.filter(f => f.id !== id));
    } catch (err) {
      alert('Failed to delete file');
    }
  };

  const isImage = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(ext);
  };

  const isZip = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    return ['zip', 'rar', '7z', 'tar', 'gz'].includes(ext);
  };

  const isPdf = (fileName) => {
    const ext = fileName.split('.').pop().toLowerCase();
    return ext === 'pdf';
  };

  const getFileIcon = (fileName) => {
    if (isImage(fileName)) return null;
    if (isPdf(fileName)) return <File size={40} color="var(--color-rose)" />;
    if (isZip(fileName)) return <FolderKanban size={40} color="var(--color-amber)" />;
    return <File size={40} color="var(--color-text-400)" />;
  };

  const getDownloadUrl = (fileName) => `${api.defaults.baseURL}/files/download/${fileName}`;

  if (loading) return null;

  return (
    <div className="card-static" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem' }}>
          <ImageIcon size={20} color="var(--color-brand-light)" />
          Project Media
        </h3>
        
        {isOwner && (
          <label className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
            <Upload size={14} /> 
            {uploading ? 'Uploading...' : 'Upload'}
            <input type="file" hidden onChange={handleUpload} disabled={uploading} />
          </label>
        )}
      </div>

      {files.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-400)', border: '1px dashed var(--glass-border)', borderRadius: 'var(--radius-md)' }}>
          No media uploaded for this project yet.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
          {files.map((file) => (
            <div key={file.id} className="animate-scale-in" style={{ position: 'relative', borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--glass-border)' }}>
              
              <div style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
                {isImage(file.fileName) ? (
                  <img src={getDownloadUrl(file.fileName)} alt={file.fileName} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  getFileIcon(file.fileName)
                )}
              </div>

              <div style={{ padding: '0.5rem', fontSize: '0.7rem', color: 'var(--color-text-300)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {file.fileName}
              </div>

              {/* Hover Overlay */}
              <div style={{ 
                position: 'absolute', 
                inset: 0, 
                background: 'rgba(0,0,0,0.6)', 
                opacity: 0, 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem',
                transition: 'opacity 0.2s ease',
                cursor: 'default'
              }} className="hover-overlay-trigger">
                <a href={getDownloadUrl(file.fileName)} target="_blank" rel="noreferrer" className="btn btn-white btn-sm" style={{ padding: '0.3rem' }}>
                  <Download size={14} />
                </a>
                {isOwner && (
                  <button onClick={() => deleteFile(file.id)} className="btn btn-danger-icon" style={{ padding: '0.3rem', background: 'rgba(244,63,94,0.2)' }}>
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        .hover-overlay-trigger:hover { opacity: 1 !important; }
      `}} />
    </div>
  );
};

export default MediaGallery;
