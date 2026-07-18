import React from 'react';
import { Upload, FileText, Download, Trash2, CheckCircle2 } from 'lucide-react';

export default function DocumentSlot({ 
  title, 
  description, 
  required = false, 
  templateUrl = null, 
  templateName = "Download Template", 
  attachedFile = null, 
  onUpload, 
  onRemove 
}) {
  return (
    <div className="card" style={{ marginBottom: '1rem', borderLeft: attachedFile ? '4px solid var(--success, #10b981)' : '4px solid var(--primary, #2563eb)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1.5rem', flexWrap: 'wrap' }}>
        
        {/* Left Info Column */}
        <div style={{ flex: '1 1 300px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-main, #111827)' }}>{title}</h4>
            {required && (
              <span className="badge badge-warning" style={{ textTransform: 'none', fontSize: '0.7rem', padding: '0.15rem 0.5rem', backgroundColor: '#fef3c7', color: '#d97706', borderRadius: '4px', fontWeight: 600 }}>
                Required
              </span>
            )}
          </div>
          
          <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: 'var(--text-muted, #6b7280)', lineHeight: 1.4 }}>
            {description}
          </p>

          {/* Optional Template Download Link */}
          {templateUrl && (
            <a 
              href={templateUrl} 
              target="_blank" 
              rel="noreferrer"
              className="btn" 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.35rem', 
                padding: '0.35rem 0.75rem', 
                fontSize: '0.75rem', 
                backgroundColor: 'var(--bg-app, #f9fafb)', 
                border: '1px solid var(--border-color, #d1d5db)', 
                borderRadius: '4px',
                textDecoration: 'none', 
                color: 'var(--primary, #2563eb)',
                fontWeight: 600
              }}
            >
              <Download size={14} /> {templateName}
            </a>
          )}
        </div>

        {/* Right Action Column (Upload Button OR Attached File View) */}
        <div style={{ flex: '0 0 240px', minWidth: '220px', textAlign: 'right' }}>
          {!attachedFile ? (
            <button 
              type="button"
              onClick={onUpload}
              className="btn btn-primary"
              style={{ 
                width: '100%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '0.5rem', 
                padding: '0.65rem', 
                backgroundColor: 'var(--primary, #2563eb)', 
                color: '#fff', 
                border: 'none', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem'
              }}
            >
              <Upload size={16} /> Attach PDF
            </button>
          ) : (
            <div style={{ padding: '0.75rem', backgroundColor: 'var(--bg-app, #f9fafb)', borderRadius: '4px', border: '1px solid var(--border-color, #e5e7eb)', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <CheckCircle2 size={16} color="var(--success, #10b981)" style={{ flexShrink: 0 }} />
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main, #111827)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'inline-block', maxWidth: '180px' }} title={attachedFile.name}>
                  {attachedFile.name}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--text-muted, #6b7280)' }}>
                <span>{attachedFile.size || 'Complete'}</span>
                <button 
                  type="button" 
                  onClick={onRemove}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontWeight: 600, padding: 0 }}
                >
                  <Trash2 size={14} /> Remove
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}