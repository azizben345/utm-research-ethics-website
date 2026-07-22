import React, { useState, useEffect } from 'react';
import { 
  ClipboardCheck, 
  FileText, 
  ChevronRight, 
  ArrowLeft, 
  RefreshCw, 
  Eye, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle,
  Inbox
} from 'lucide-react';
import EvaluatorChecklistForm from '../../components/wizards/forms/EvaluatorChecklistForm';

// 1. HARD-CODED MOCK DATA FOR EVALUATOR DEMO
const MOCK_COMMITTEE_SUBMISSIONS = [
  {
    id: "REC-2026-888",
    projectTitle: "Psychological Impacts of E-Learning on Postgraduate Students",
    applicantName: "Dr. Liew Wei",
    applicantEmail: "liew.w@utm.my",
    submissionDate: "2026-07-20",
    currentStage: 2,
    statusLabel: "Under Evaluation (Day 0 Marked)",
    formApplied: "Non-Clinical Research Ethics",
    formType: "FORM-NON-CLINICAL",
    assignedDate: "2026-07-20",
    documents: [
      { id: "d1", name: "NonClinical_Application_v1.pdf", type: "Application Form", uploadDate: "2026-07-20" },
      { id: "d2", name: "PI_Team_CVs.pdf", type: "Curriculum Vitae (CV)", uploadDate: "2026-07-20" },
      { id: "d5", name: "Interview_Questionnaire.pdf", type: "Instrument Protocol", uploadDate: "2026-07-20" },
      { id: "d7", name: "Consent_Form_Malay_English.pdf", type: "Respondent’s Information Sheet and Consent", uploadDate: "2026-07-20" },
      { id: "d8", name: "Risk_Assessment_Checklist.pdf", type: "Research Risk Assessment Checklist", uploadDate: "2026-07-20" }
    ]
  }
];

export default function CommitteeDashboard({ user, onViewProtocol }) {
  const [submissions, setSubmissions] = useState(MOCK_COMMITTEE_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [loading, setLoading] = useState(false);

  // Digital Evaluation Rubric State (Form 1.8)
  const [evaluation, setEvaluation] = useState({
    scientificMerit: 'Satisfactory',
    participantConsent: 'Satisfactory',
    riskBenefitRatio: 'Satisfactory',
    dataPrivacy: 'Satisfactory',
    comments: '',
    recommendation: 'Recommend Approval' // Options: 'Recommend Approval' | 'Revision Required'
  });

  // Safe Fetch from live backend (fallback to mock data if json-server is offline)
  const fetchAssignedSubmissions = () => {
    setLoading(true);
    fetch('http://localhost:3001/submissions')
      .then((res) => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [];
        
        // FILTER LOGIC:
        // 1. Must be in Stage 2 (Evaluation)
        // 2. Must contain the logged-in user's email in the assignedEvaluators list
        const myAssignedSubmissions = safeData.filter(s => 
          (s.currentStage === 2) && 
          (s.assignedEvaluators && s.assignedEvaluators.some(e => e.email === user.email))
        );
        
        setSubmissions(myAssignedSubmissions);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Database unreachable:', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchAssignedSubmissions();
  }, []);

  // Handle scoring rubric changes
  const updateRubric = (field, value) => {
    setEvaluation(prev => ({ ...prev, [field]: value }));
  };

  // SUBMIT EVALUATION ACTION (Routes to Stage 3 Decision Making or Back for Revisions)
  const handleSumbitEvaluation = async () => {
    if (!selectedSubmission) return;

    const isApproved = evaluation.recommendation === 'Recommend Approval';
    
    // If approved, advance to Stage 3 (Decision Making / Risk Classification)
    // If revision required, push back to Stage 1 with feedback
    const updatedPayload = {
      ...selectedSubmission,
      currentStage: isApproved ? 3 : 1,
      statusLabel: isApproved ? 'Recommended for Approval (Pending Risk Classification)' : 'Returned for Panel Revision',
      requiresRevision: !isApproved,
      revisionMessage: !isApproved ? `Panel Evaluation Feedback: ${evaluation.comments || 'Revisions required on protocol methodology or consent forms.'}` : '',
      panelEvaluationResult: evaluation
    };

    try {
      const res = await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });

      if (res.ok || res.status === 404) { // Status 404 handler allows demo mock data to simulate success!
        alert(`Evaluation successfully submitted!\nVerdict: ${evaluation.recommendation}\n\nThis application has been routed to Stage ${isApproved ? '3 (Decision Making)' : '1 (Revision)'}.`);
        setSelectedSubmission(null);
        fetchAssignedSubmissions();
      }
    } catch (err) {
      alert(`Evaluation logged locally for prototype demo!\nVerdict: ${evaluation.recommendation}`);
      setSelectedSubmission(null);
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '3rem', textAlign: 'center' }}>Loading Evaluator Workspace...</div>;
  }

  return (
    <div className="container" style={{ maxWidth: '1200px' }}>
      
      {/* ========================================================= */}
      {/* VIEW 1: ASSIGNED EVALUATOR INBOX                          */}
      {/* ========================================================= */}
      {!selectedSubmission ? (
        <>
          <div className="flex-between card" style={{ borderLeft: '4px solid var(--purple, #8b5cf6)' }}>
            <div>
              <h1 style={{ margin: '0 0 0.25rem 0' }}>Committee Panel Evaluation Portal</h1>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Review assigned research protocols, audit ethical risk factors, and submit Form 1.8 evaluations.
              </p>
            </div>
            <button className="btn" style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)' }} onClick={fetchAssignedSubmissions}>
              <RefreshCw size={16} /> Refresh Inbox
            </button>
          </div>

          {submissions.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <Inbox size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>No Assigned Protocols</h3>
              <p style={{ margin: 0 }}>You currently have no active ethics submissions pending review.</p>
            </div>
          ) : (
            <div className="grid-cards">
              {submissions.map((sub) => (
                <div key={sub.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{sub.id || 'NO-ID'}</span>
                      <span className="badge" style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', fontWeight: 600 }}>
                        Stage 2: Evaluation
                      </span>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{sub.projectTitle || 'Untitled Research Protocol'}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.25rem 0' }}>
                      <strong>PI:</strong> {sub.applicantName || 'N/A'} | <strong>Type:</strong> {sub.formApplied || 'Research'}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1.5rem 0' }}>
                      Assigned: {sub.assignedDate || 'Recently'}
                    </p>
                  </div>
                  
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--purple, #8b5cf6)', fontWeight: 600 }}>
                      ⏳ Action Required
                    </span>
                    <button 
                      className="btn" 
                      style={{ backgroundColor: '#8b5cf6', color: '#fff' }}
                      onClick={() => setSelectedSubmission(sub)}
                    >
                      Evaluate <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        /* ========================================================= */
        /* VIEW 2: SPLIT-SCREEN PROTOCOL REVIEW & RUBRIC WORKSPACE   */
        /* ========================================================= */
        <>
          <button 
            className="btn" 
            style={{ marginBottom: '1rem', backgroundColor: 'transparent', paddingLeft: 0, color: 'var(--text-muted)' }}
            onClick={() => setSelectedSubmission(null)}
          >
            <ArrowLeft size={18} /> Back to Assigned Inbox
          </button>

          <header className="card" style={{ marginBottom: '1.5rem', borderTop: '4px solid #8b5cf6' }}>
            <div className="flex-between" style={{ alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#8b5cf6' }}>ETHICS REVIEWER WORKSPACE: {selectedSubmission.id}</span>
                <h1 style={{ margin: '0.25rem 0' }}>{selectedSubmission.projectTitle || 'Untitled Research Protocol'}</h1>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Applicant: {selectedSubmission.applicantName || 'N/A'} | Stage: <strong>Stage 2 (Subcommittee Review)</strong>
                </p>
              </div>

              {/* HERO ACTION: View Full Protocol Questionnaire */}
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                <button 
                  className="btn" 
                  style={{ backgroundColor: '#8b5cf6', color: '#fff', padding: '0.75rem 1.25rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.3)' }}
                  onClick={() => onViewProtocol && onViewProtocol(selectedSubmission.id)}
                >
                  <FileText size={18} /> View Application Forms
                </button>
              </div>
            </div>
          </header>

          {/* SPLIT LAYOUT: Document Audit (Left) & Form 1.8 Rubric (Right) */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            
            {/* Left Column: Reference Documents Table */}
            <div className="card" style={{ flex: '1', minWidth: '320px', margin: 0 }}>
              <h3 style={{ margin: '0 0 1rem 0' }}>Supporting Reference Files</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Audit attached consent forms, expert validations, and survey instruments while evaluating.
              </p>

              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Document Type</th>
                      <th>File Name</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedSubmission.documents || []).map((doc, idx) => (
                      <tr key={doc.id || idx}>
                        <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{doc.type || 'Attachment'}</td>
                        <td style={{ color: '#8b5cf6', fontWeight: 500, fontSize: '0.85rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {doc.name || `File_${idx + 1}.pdf`}
                        </td>
                        <td>
                          <button 
                            className="btn" 
                            style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)' }}
                            onClick={() => setPreviewDoc(doc)}
                          >
                            <Eye size={14} /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right Column: Digital Form 1.8 Evaluation Rubric */}
            <div className="card" style={{ flex: '1.2', minWidth: '350px' }}>
            <EvaluatorChecklistForm 
                formApplied={selectedSubmission.formApplied} 
                onSubmit={(evaluationData) => {
                    // 1. Prepare Payload
                    const updatedPayload = {
                        ...selectedSubmission,
                        currentStage: 4, // Moving to Stage 4 Decision
                        statusLabel: 'Evaluated',
                        panelEvaluationResult: evaluationData // Stores the form answers in the DB
                    };
                    
                    // 2. Perform live update
                    fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(updatedPayload)
                    }).then(() => {
                        alert("Evaluation submitted to Secretariat!");
                        setSelectedSubmission(null);
                    });
                }} 
            />
            </div>

          </div>
        </>
      )}

      {/* MOCK PDF PREVIEW MODAL */}
      {previewDoc && (
        <div className="modal-overlay" onClick={() => setPreviewDoc(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText color="#8b5cf6" size={20} />
                <h4 style={{ margin: 0 }}>Reference Document: {previewDoc.name || 'Preview'}</h4>
              </div>
              <button className="btn" style={{ padding: '0.25rem', background: 'transparent' }} onClick={() => setPreviewDoc(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ padding: '3rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', background: '#fff', textAlign: 'center' }}>
                <FileText size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>PDF Content Simulator</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Displaying evaluator reference copy for <strong>{previewDoc.type || 'Attachment'}</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}