import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Eye, 
  X, 
  ChevronRight, 
  ArrowLeft,
  PlusCircle,
  Download
} from 'lucide-react'; 

export default function ApplicantDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  // Define the 5 core UTM REC stages
  const stages = [
    { number: 1, label: 'Application' },
    { number: 2, label: 'Evaluation' },
    { number: 3, label: 'Decision' },
    { number: 4, label: 'Approval Period' },
    { number: 5, label: 'Closure' }
  ];

  // Fetch all applications from local json-server
  useEffect(() => {
    fetch('http://localhost:3001/submissions')
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="container">Loading Dashboard...</div>;
  }

  return (
    <div className="container">
      
      {/* ========================================================= */}
      {/* VIEW 1: MASTER LIST (Shows if no specific project is clicked) */}
      {/* ========================================================= */}
      {!selectedSubmission ? (
        <>
          <div className="flex-between card">
            <div>
              <h1 style={{ margin: '0 0 0.25rem 0' }}>Research Ethics Submissions</h1>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Manage and track all ongoing research projects under UTM REC review.
              </p>
            </div>
            <button className="btn btn-primary">
              <PlusCircle size={18} /> New Submission
            </button>
          </div>

          <div className="grid-cards">
            {submissions.map((sub) => (
              <div key={sub.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{sub.id}</span>
                    <span className="badge badge-primary">Stage {sub.currentStage}</span>
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{sub.projectTitle}</h3>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: '0 0 1.5rem 0' }}>
                    Submitted on: {sub.submissionDate}
                  </p>
                </div>
                
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: sub.requiresRevision ? 'var(--warning)' : 'var(--text-muted)', fontWeight: 600 }}>
                    {sub.requiresRevision ? '⚠️ Revision Required' : sub.statusLabel}
                  </span>
                  <button 
                    className="btn" 
                    style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}
                    onClick={() => setSelectedSubmission(sub)}
                  >
                    Manage <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* ========================================================= */
        /* VIEW 2: PROJECT DETAIL (Shows when a card is clicked)     */
        /* ========================================================= */
        <>
          <button 
            className="btn" 
            style={{ marginBottom: '1rem', backgroundColor: 'transparent', paddingLeft: 0, color: 'var(--text-muted)' }}
            onClick={() => setSelectedSubmission(null)}
          >
            <ArrowLeft size={18} /> Back to All Submissions
          </button>

          <header className="card">
            <div className="flex-between">
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--primary)' }}>{selectedSubmission.id}</span>
                <h1 style={{ margin: '0.25rem 0' }}>{selectedSubmission.projectTitle}</h1>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Primary Investigator: {selectedSubmission.applicantName} | Submitted: {selectedSubmission.submissionDate}
                </p>
              </div>
              <span className="badge badge-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                Stage {selectedSubmission.currentStage} of 5
              </span>
            </div>
          </header>

          {/* ISOLATED PROJECT STEPPER */}
          <section className="card">
            <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Review Lifecycle Progress</h3>
            
            <div className="stepper-wrapper">
              <div className="stepper-line" />
              {stages.map((stage) => {
                const isCompleted = selectedSubmission.currentStage > stage.number;
                const isActive = selectedSubmission.currentStage === stage.number;

                return (
                  <div key={stage.number} className="step-item">
                    <div className={`step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}>
                      {isCompleted ? <CheckCircle2 size={20} /> : stage.number}
                    </div>
                    <span style={{ 
                      marginTop: '0.5rem', 
                      fontSize: '0.85rem', 
                      fontWeight: isActive ? 'bold' : 'normal',
                      color: isActive ? 'var(--primary)' : 'var(--text-muted)' 
                    }}>
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>

            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Clock size={18} color="var(--primary)" />
              <span style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                Current Status: <strong>{selectedSubmission.statusLabel}</strong>
              </span>
            </div>
          </section>

          {/* CONDITIONAL REVISION ALERT BANNER */}
          {selectedSubmission.requiresRevision && (
            <div className="card" style={{ backgroundColor: 'var(--warning-light)', borderLeft: '4px solid var(--warning)', display: 'flex', gap: '1rem' }}>
              <AlertTriangle color="var(--warning)" style={{ flexShrink: 0 }} />
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#92400e' }}>Action Required: Revisions Requested</h4>
                <p style={{ margin: '0 0 1rem 0', color: '#78350f', fontSize: '0.9rem' }}>{selectedSubmission.revisionMessage}</p>
                <button className="btn btn-warning">
                  Upload Amended Documents
                </button>
              </div>
            </div>
          )}

          {/* DOCUMENT REPOSITORY TABLE */}
          <section className="card">
            <h3 style={{ marginTop: 0, marginBottom: '1rem' }}>Submitted Files Repository</h3>
            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Document Type</th>
                    <th>File Name</th>
                    <th>Upload Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSubmission.documents.map((doc) => (
                    <tr key={doc.id}>
                      <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} color="var(--text-muted)" />
                        {doc.type}
                      </td>
                      <td style={{ color: 'var(--primary)', fontWeight: 500 }}>{doc.name}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{doc.uploadDate}</td>
                      <td>
                        <span className={`badge ${doc.status === 'Verified' ? 'badge-success' : 'badge-warning'}`}>
                          {doc.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn" 
                          style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)' }}
                          onClick={() => setPreviewDoc(doc)}
                        >
                          <Eye size={14} /> Preview
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </>
      )}

      {/* ========================================================= */}
      {/* VIEW 3: MOCK PDF PREVIEW MODAL                            */}
      {/* ========================================================= */}
      {previewDoc && (
        <div className="modal-overlay" onClick={() => setPreviewDoc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText color="var(--primary)" size={20} />
                <h4 style={{ margin: 0 }}>Document Viewer: {previewDoc.name}</h4>
              </div>
              <button className="btn" style={{ padding: '0.25rem', background: 'transparent' }} onClick={() => setPreviewDoc(null)}>
                <X size={20} />
              </button>
            </div>

            <div className="modal-body">
              <div style={{ padding: '2rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', background: '#fff', width: '80%' }}>
                <FileText size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>PDF Preview Placeholder</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
                  In a production environment, an iframe or PDF.js canvas would render the contents of <strong>{previewDoc.name}</strong> here.
                </p>
              </div>
              <p style={{ marginTop: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Document Type: {previewDoc.type} | Status: {previewDoc.status}
              </p>
            </div>

            <div className="modal-header" style={{ justifyContent: 'flex-end', gap: '0.75rem', backgroundColor: 'var(--bg-app)' }}>
              <button className="btn" style={{ background: 'var(--border-color)' }} onClick={() => setPreviewDoc(null)}>
                Close Viewer
              </button>
              <button className="btn btn-primary">
                <Download size={16} /> Download Mock File
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}