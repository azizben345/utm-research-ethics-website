import React, { useState, useEffect } from 'react';
import { 
  FolderClock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  UserCheck, 
  RefreshCw 
} from 'lucide-react';

export default function SecretariatDashboard() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch all submissions from database
  const fetchSubmissions = () => {
    setLoading(true);
    fetch('http://localhost:3001/submissions')
      .then((res) => res.json())
      .then((data) => {
        setSubmissions(data);
        // If we are currently inspecting a project, keep its data synced
        if (selectedSubmission) {
          const updatedSelected = data.find((s) => s.id === selectedSubmission.id);
          setSelectedSubmission(updatedSelected || null);
        }
        setLoading(false);
      })
      .catch((err) => console.error('Error fetching data:', err));
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // ACTION 1: Toggle individual document status (Verified <-> Incomplete)
  const toggleDocumentStatus = async (docId) => {
    if (!selectedSubmission) return;

    // Map through documents and flip the status of the target file
    const updatedDocs = selectedSubmission.documents.map((doc) => {
      if (doc.id === docId) {
        return {
          ...doc,
          status: doc.status === 'Verified' ? 'Incomplete / Missing Info' : 'Verified'
        };
      }
      return doc;
    });

    // Check if any document is now marked as Incomplete
    const hasIncomplete = updatedDocs.some((d) => d.status !== 'Verified');

    const updatedPayload = {
      ...selectedSubmission,
      documents: updatedDocs,
      requiresRevision: hasIncomplete,
      revisionMessage: hasIncomplete ? 'Secretariat early screening flagged incomplete or missing document details.' : ''
    };

    // Send PATCH request to json-server to persist data
    await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayload)
    });

    fetchSubmissions();
  };

  // ACTION 2: Mark Complete submission as "Day 0" & Advance to Stage 2 Evaluation[cite: 1, 2]
  const markDayZero = async () => {
    if (!selectedSubmission) return;

    const updatedPayload = {
      ...selectedSubmission,
      currentStage: 2,
      statusLabel: 'Under Evaluation (Day 0 Marked)',
      requiresRevision: false,
      revisionMessage: ''
    };

    await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayload)
    });

    fetchSubmissions();
    alert(`Submission ${selectedSubmission.id} successfully marked as Day 0. Ready for Evaluator Appointment.`);
  };

  if (loading && submissions.length === 0) {
    return <div className="container">Loading Secretariat Portal...</div>;
  }

  return (
    <div className="container">
      
      {/* ========================================================= */}
      {/* VIEW 1: MASTER LIST OF ALL INSTITUTIONAL SUBMISSIONS      */}
      {/* ========================================================= */}
      {!selectedSubmission ? (
        <>
          <div className="flex-between card" style={{ borderLeft: '4px solid var(--warning)' }}>
            <div>
              <h1 style={{ margin: '0 0 0.25rem 0' }}>Secretariat Screening Portal</h1>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Conduct early screenings (within 1 week), verify document completeness, and mark Day 0.
              </p>
            </div>
            <button className="btn" style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)' }} onClick={fetchSubmissions}>
              <RefreshCw size={16} /> Refresh List
            </button>
          </div>

          <div className="grid-cards">
            {submissions.map((sub) => (
              <div key={sub.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{sub.id}</span>
                    <span className="badge badge-warning">Stage {sub.currentStage}: {sub.currentStage === 1 ? 'Screening' : 'Evaluation'}</span>
                  </div>
                  <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{sub.projectTitle}</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.25rem 0' }}>
                    <strong>PI:</strong> {sub.applicantName} ({sub.applicantEmail})
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1.5rem 0' }}>
                    Submitted: {sub.submissionDate}
                  </p>
                </div>
                
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', color: sub.requiresRevision ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
                    {sub.requiresRevision ? '⚠️ Issues Flagged' : '✔ Files Intact'}
                  </span>
                  <button 
                    className="btn btn-warning" 
                    onClick={() => setSelectedSubmission(sub)}
                  >
                    View Files <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        /* ========================================================= */
        /* VIEW 2: DETAIL SCREENING & DOCUMENT AUDIT WORKSPACE       */
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
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--warning)' }}>EARLY SCREENING AUDIT: {selectedSubmission.id}</span>
                <h1 style={{ margin: '0.25rem 0' }}>{selectedSubmission.projectTitle}</h1>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Applicant: {selectedSubmission.applicantName} | Current Status: <strong>{selectedSubmission.statusLabel}</strong>
                </p>
              </div>

              {/* Day 0 Stamping Action Button */}
              {selectedSubmission.currentStage === 1 && !selectedSubmission.requiresRevision && (
                <button className="btn btn-success" onClick={markDayZero} style={{ padding: '0.75rem 1.25rem' }}>
                  <UserCheck size={18} /> Confirm Complete (Mark Day 0)
                </button>
              )}
            </div>
          </header>

          {/* DOCUMENT AUDIT & STATUS TOGGLE TABLE */}
          <section className="card">
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <h3 style={{ margin: 0 }}>Submitted Document Audit</h3>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Click "Toggle Status" to simulate flagging incomplete documents during early screening.
              </span>
            </div>

            <div className="table-container">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Document Type</th>
                    <th>File Name</th>
                    <th>Upload Date</th>
                    <th>Current Verification Status</th>
                    <th>Secretariat Action (Role-Protected)</th>
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
                        {/* THIS BUTTON IS THE CORE OF YOUR PROTOYPE INTERACTION */}
                        <button 
                          className={`btn ${doc.status === 'Verified' ? 'btn-warning' : 'btn-success'}`}
                          style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}
                          onClick={() => toggleDocumentStatus(doc.id)}
                        >
                          {doc.status === 'Verified' ? 'Flag as Incomplete' : 'Mark as Verified'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECRETARIAT SCREENING INSTRUCTIONS */}
          <div className="card" style={{ backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)' }}>
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Secretariat Workflow Protocol</h4>
            <ul style={{ margin: 0, paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              <li>If any file is flagged as incomplete, the system automatically marks the application as requiring revision and alerts the PI.</li>
              <li>Once all documents are verified, click <strong>Confirm Complete (Mark Day 0)</strong> to advance the application to Stage 2 and unlock Evaluator Appointment.</li>
            </ul>
          </div>
        </>
      )}

    </div>
  );
}