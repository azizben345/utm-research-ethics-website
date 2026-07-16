import React from 'react';
import { FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

export default function GuidelinesPage() {
  const templates = [
    { id: 1, title: 'UTM REC Application Form Template (v2026)', type: 'DOCX', size: '245 KB' },
    { id: 2, title: 'Patient Informed Consent Form (English & Malay)', type: 'PDF', size: '512 KB' },
    { id: 3, title: 'Research Proposal Structure & Ethical Guidelines', type: 'PDF', size: '1.2 MB' },
    { id: 4, title: 'Low Risk vs. Higher Risk Classification Matrix', type: 'PDF', size: '380 KB' }
  ];

  return (
    <div className="container">
      <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <ShieldCheck color="var(--primary)" size={24} />
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Institutional Submission Guidelines & Templates</h1>
        </div>
        <p style={{ color: 'var(--text-muted)', margin: 0 }}>
          Download official UTM Research Ethics Committee templates and review compliance standards before initiating your application.
        </p>
      </div>

      <div className="grid-cards">
        {templates.map((doc) => (
          <div key={doc.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>{doc.type}</span>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.05rem' }}>{doc.title}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: '0 0 1.5rem 0' }}>
                Estimated File Size: {doc.size}
              </p>
            </div>
            <button className="btn" style={{ backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', width: '100%', justifyContent: 'center' }}>
              <Download size={16} /> Download Template
            </button>
          </div>
        ))}
      </div>

      <div className="card" style={{ textAlign: 'center', padding: '3rem 1.5rem', backgroundColor: 'var(--primary-light)', border: '2px dashed var(--primary)' }}>
        <FileText size={40} color="var(--primary)" style={{ margin: '0 auto 0.5rem auto' }} />
        <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--primary)' }}>PDF Viewer Integration Area</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '500px', margin: '0 auto' }}>
          During future development, an embedded iframe or PDF library will display the Standard Operating Procedures (SOP) directly on this screen.
        </p>
      </div>
    </div>
  );
}