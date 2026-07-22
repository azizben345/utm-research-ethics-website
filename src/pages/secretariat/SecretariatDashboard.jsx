import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  RefreshCw,
  Eye,
  X,
  Inbox,
  Users,
  UserPlus,
  Trash2
} from 'lucide-react';
import DocChecklistForm from '../../components/wizards/forms/DocChecklistForm'; // Ensure this path matches your project structure

export default function SecretariatDashboard({ user, onViewProtocol }) {
  // 1. Initialize with an empty array for live backend data
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState([]);
  const [selectedEvaluatorEmail, setSelectedEvaluatorEmail] = useState('');
  const [evaluators, setEvaluators] = useState([]);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. Safe Fetch Function with Error Handling
  const fetchSubmissions = () => {
    setLoading(true);
    fetch('http://localhost:3001/submissions')
      .then((res) => res.json())
      .then((data) => {
        // Ensure data is always an array even if db.json returns something weird
        const safeData = Array.isArray(data) ? data : [];
        setSubmissions(safeData);
        
        // Keep selected project synced after a background refresh
        if (selectedSubmission) {
          const updatedSelected = safeData.find((s) => s.id === selectedSubmission.id);
          setSelectedSubmission(updatedSelected || null);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching secretariat data:', err);
        setSubmissions([]);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Fetch Evaluators List
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch both endpoints
      const [subsRes, usersRes] = await Promise.all([
        fetch('http://localhost:3001/submissions'),
        fetch('http://localhost:3001/users')
      ]);

      const subsData = await subsRes.json();
      const usersData = await usersRes.json();

      // Set submissions
      setSubmissions(Array.isArray(subsData) ? subsData : []);

      // Filter for 'committee' role to be used as evaluators
      const committeeMembers = usersData.filter(u => u.role === 'committee');
      setEvaluators(committeeMembers);
      
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- EVALUATOR LOGIC (PATCH API) ---
  const handleAssignEvaluator = async () => {
    if (!selectedSubmission || !selectedEvaluatorEmail) return;

    const targetEvaluator = evaluators.find(e => e.email === selectedEvaluatorEmail);
    const currentList = selectedSubmission.assignedEvaluators || [];
    
    if (currentList.some(e => e.email === targetEvaluator.email)) return;

    const updatedPayload = {
      ...selectedSubmission,
      assignedEvaluators: [...currentList, targetEvaluator]
    };

    await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayload)
    });
    fetchSubmissions();
    setSelectedEvaluatorEmail('');
  };

  const handleRemoveEvaluator = async (email) => {
    const updatedPayload = {
      ...selectedSubmission,
      assignedEvaluators: (selectedSubmission.assignedEvaluators || []).filter(e => e.email !== email)
    };

    await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedPayload)
    });
    fetchSubmissions();
  };

  // 3. LIVE ACTION: Save "Day 0" to database
  const handleMarkDayZero = async () => {
    if (!selectedSubmission) return;

    const updatedPayload = {
      ...selectedSubmission,
      currentStage: 2,
      statusLabel: 'Under Evaluation (Day 0 Marked)',
      requiresRevision: false,
      revisionMessage: ''
    };

    try {
      const res = await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });

      if (res.ok) {
        alert(`Application ${selectedSubmission.id} successfully marked as Day 0.\nIt is now ready for Evaluator Appointment (Stage 2).`);
        setSelectedSubmission(null);
        setIsChecklistOpen(false);
        fetchSubmissions(); // Refresh live queue
      }
    } catch (err) {
      console.error('Failed to mark Day 0:', err);
      alert('Error updating database. Please check if json-server is running.');
    }
  };

  // 4. LIVE ACTION: Save "Return to Applicant" revision request to database
  const handleReturnToApplicant = async () => {
    if (!selectedSubmission) return;

    const reason = prompt("Enter reason for returning application (e.g., 'Missing CVs or Proof of Payment'):");
    if (!reason) return;

    const updatedPayload = {
      ...selectedSubmission,
      requiresRevision: true,
      statusLabel: 'Returned for Revision',
      revisionMessage: reason
    };

    try {
      const res = await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });

      if (res.ok) {
        alert(`Application returned to ${selectedSubmission.applicantName || 'the applicant'} for revision.`);
        setSelectedSubmission(null);
        setIsChecklistOpen(false);
        fetchSubmissions(); // Refresh live queue
      }
    } catch (err) {
      console.error('Failed to return application:', err);
      alert('Error updating database. Please check if json-server is running.');
    }
  };

  // 5. LIVE ACTION: Finalize Approval & Move to Stage 5 (Closure)
  const handleFinalizeApproval = async (e) => {
    if (!selectedSubmission) return;

    // Simulate file "upload" logic (just ensuring a file is selected)
    const fileInput = document.getElementById('letter-upload');
    if (!fileInput || !fileInput.files[0]) {
      alert("Please upload the signed Approval Letter PDF first.");
      return;
    }

    const updatedPayload = {
      ...selectedSubmission,
      currentStage: 5,
      statusLabel: 'Approved & Closed',
      approvalLetterName: fileInput.files[0].name
    };

    try {
      const res = await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });

      if (res.ok) {
        alert("Approval Letter issued and Application Closed!");
        setSelectedSubmission(null);
        fetchSubmissions(); 
      }
    } catch (err) {
      console.error('Failed to finalize:', err);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <h3>Loading Secretariat Portal...</h3>
        <p>Connecting to institutional database...</p>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1200px' }}>
      
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
              <RefreshCw size={16} /> Refresh Queue
            </button>
          </div>

          {/* Fallback if database is completely empty */}
          {submissions.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <Inbox size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>No Submissions Found</h3>
              <p style={{ margin: 0 }}>There are currently no research applications waiting in the database queue.</p>
            </div>
          ) : (
            <div className="grid-cards">
              {submissions.map((sub) => (
                <div key={sub.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{sub.id || 'NO-ID'}</span>
                      <span className="badge badge-warning">
                        Stage {sub.currentStage || 1}: {(sub.currentStage || 1) === 1 ? 'Screening' : 'Evaluation'}
                      </span>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{sub.projectTitle || 'Untitled Research Protocol'}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.25rem 0' }}>
                      <strong>PI:</strong> {sub.applicantName || 'Unknown Applicant'}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1.5rem 0' }}>
                      Submitted: {sub.submissionDate || 'Recently'}
                    </p>
                  </div>
                  
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: sub.requiresRevision ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
                      {sub.requiresRevision ? '⚠️ Revisions Requested' : (sub.currentStage > 1 ? '✔ Cleared (Day 0)' : 'Pending Screening')}
                    </span>
                    <button 
                      className="btn btn-warning" 
                      onClick={() => {
                        setSelectedSubmission(sub);
                        // Auto-open checklist if it's not an exemption
                        if (sub.formType !== 'FORM-EXEMPTION') setIsChecklistOpen(true);
                      }}
                    >
                      Manage <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* ========================================================= */
        /* VIEW 2: DETAIL SCREENING & DOCUMENT AUDIT WORKSPACE       */
        /* ========================================================= */
        <>
          <button 
            className="btn" 
            style={{ marginBottom: '1rem', backgroundColor: 'transparent', paddingLeft: 0, color: 'var(--text-muted)' }}
            onClick={() => {
              setSelectedSubmission(null);
              setIsChecklistOpen(false);
            }}
          >
            <ArrowLeft size={18} /> Back to Screening Queue
          </button>

          <header className="card" style={{ marginBottom: '1.5rem' }}>
            <div className="flex-between" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--warning)' }}>SUBMISSION ID: {selectedSubmission.id}</span>
                <h1 style={{ margin: '0.25rem 0' }}>{selectedSubmission.projectTitle || 'Untitled Research Protocol'}</h1>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Applicant: {selectedSubmission.applicantName || 'N/A'} | Current Status: <strong>{selectedSubmission.statusLabel || 'Pending'}</strong>
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                  Stage {selectedSubmission.currentStage || 1} of 5
                </span>
                
                <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                    Form Type: <strong>{selectedSubmission.formApplied}</strong>
                  </span>
                </div>

                <button 
                  className="btn" 
                  style={{ backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  onClick={() => onViewProtocol && onViewProtocol(selectedSubmission.id)}
                >
                  <FileText size={16} color="var(--primary)" /> View Form
                </button>
              </div>
            </div>
          </header>

          {/* EVALUATOR SECTION */}
          <header className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #8b5cf6', backgroundColor: '#faf5ff' }}>
            <div className="flex-between">
              <h3><Users size={20} /> Appoint Evaluators</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <select value={selectedEvaluatorEmail} onChange={(e) => setSelectedEvaluatorEmail(e.target.value)}>
                  <option value="">-- Select --</option>
                  {evaluators.map(ev => <option key={ev.email} value={ev.email}>{ev.name}</option>)}
                </select>
                <button className="btn" style={{ background: '#8b5cf6', color: '#fff' }} onClick={handleAssignEvaluator}>
                  <UserPlus size={16} /> Assign
                </button>
              </div>
            </div>
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
              {(selectedSubmission.assignedEvaluators || []).map(ev => (
                <div key={ev.email} className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {ev.name} <button onClick={() => handleRemoveEvaluator(ev.email)}><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
          </header>

          {/* DECISION & ISSUANCE SECTION (Stage 3) */}
          {selectedSubmission.currentStage === 4 && (
            <section className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #059669', backgroundColor: '#ecfdf5' }}>
              <h3><CheckCircle2 size={20} /> Stage 3: Decision & Issuance</h3>
              <p style={{ fontSize: '0.85rem', color: '#065f46' }}>
                Upload the final signed approval letter to close this application file.
              </p>
              
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <input 
                  type="file" 
                  id="letter-upload" 
                  accept=".pdf" 
                  style={{ padding: '0.5rem', background: '#fff', border: '1px solid #d1fae5', borderRadius: '4px' }}
                />
                <button 
                  className="btn btn-success" 
                  onClick={handleFinalizeApproval}
                >
                  <FileText size={16} /> Issue Letter & Close Application
                </button>
              </div>
            </section>
          )}

          {/* SPLIT LAYOUT: Document Table (Left) & Checklist Panel (Right) */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            
            {/* Left Side: Document Repository Table */}
            <div className="card" style={{ flex: isChecklistOpen ? '2' : '1', minWidth: '300px', transition: 'all 0.3s', margin: 0 }}>
              <div className="flex-between" style={{ marginBottom: '1rem' }}>
                <h3 style={{ margin: 0 }}>Submitted Document Audit</h3>
                {selectedSubmission.formType !== 'FORM-EXEMPTION' && !isChecklistOpen && (
                  <button className="btn btn-warning" onClick={() => setIsChecklistOpen(true)}>
                    <CheckCircle2 size={16} /> Open Screening Checklist
                  </button>
                )}
              </div>

              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Document Type</th>
                      <th>File Name</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* DEFensive fallback: || [] prevents white screen crash if documents is missing */}
                    {(selectedSubmission.documents || []).length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                          No documents found attached to this submission.
                        </td>
                      </tr>
                    ) : (
                      (selectedSubmission.documents || []).map((doc, idx) => (
                        <tr key={doc.id || idx}>
                          <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={16} color="var(--text-muted)" /> {doc.type || 'Attachment'}
                          </td>
                          <td style={{ color: 'var(--primary)', fontWeight: 500, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {doc.name || `File_${idx + 1}.pdf`}
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
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Side: Digital Screening Checklist Panel */}
            {isChecklistOpen && selectedSubmission.formType !== 'FORM-EXEMPTION' && (
              <div style={{ flex: '1', minWidth: '350px', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid var(--border-color)', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', height: '650px', position: 'sticky', top: '20px' }}>
                <DocChecklistForm 
                  formApplied={selectedSubmission.formApplied || 'Exemption Form'}
                  onMarkDayZero={handleMarkDayZero}
                  onReturnToApplicant={handleReturnToApplicant}
                />
              </div>
            )}
          </div>
        </>
      )}

      {/* MOCK PDF PREVIEW MODAL */}
      {previewDoc && (
        <div className="modal-overlay" onClick={() => setPreviewDoc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText color="var(--primary)" size={20} />
                <h4 style={{ margin: 0 }}>Document Viewer: {previewDoc.name || 'Document Preview'}</h4>
              </div>
              <button className="btn" style={{ padding: '0.25rem', background: 'transparent' }} onClick={() => setPreviewDoc(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ padding: '3rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', background: '#fff', textAlign: 'center' }}>
                <FileText size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>PDF Content Simulator</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Displaying contents for <strong>{previewDoc.type || 'Attachment'}</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}