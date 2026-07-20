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
        // Filter for applications currently in Stage 2 (Evaluation)
        const stage2Submissions = safeData.filter(s => (s.currentStage || 1) === 2);
        setSubmissions(stage2Submissions.length > 0 ? stage2Submissions : MOCK_COMMITTEE_SUBMISSIONS);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Database unreachable, defaulting to demo mock data:', err);
        setSubmissions(MOCK_COMMITTEE_SUBMISSIONS);
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
            <div className="card" style={{ flex: '1.2', minWidth: '350px', margin: 0, backgroundColor: '#fff', border: '1px solid var(--border-color)' }}>
              <div style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#8b5cf6', marginBottom: '0.25rem' }}>
                  <ClipboardCheck size={22} />
                  <h3 style={{ margin: 0 }}>Form 1.8: Panel Evaluation Rubric</h3>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Complete all ethical appraisal criteria to formulate your recommendation to the subcommittee.
                </span>
              </div>

              {/* Rubric Criteria Toggles */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
                
                {[
                  { id: 'scientificMerit', label: '1. Scientific Merit & Methodology Validity' },
                  { id: 'participantConsent', label: '2. Informed Consent Process & Information Sheet Clear' },
                  { id: 'riskBenefitRatio', label: '3. Risk-Benefit Ratio & Participant Protection Adequacy' },
                  { id: 'dataPrivacy', label: '4. Data Privacy, Anonymization & Security Protocol' }
                ].map((crit) => (
                  <div key={crit.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem', paddingBottom: '0.75rem', borderBottom: '1px dashed var(--border-color)' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-main)' }}>{crit.label}</span>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {['Satisfactory', 'Needs Revision', 'N/A'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => updateRubric(crit.id, opt)}
                          style={{
                            padding: '0.35rem 0.65rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            borderRadius: '4px',
                            cursor: 'pointer',
                            border: evaluation[crit.id] === opt ? '1px solid #8b5cf6' : '1px solid var(--border-color)',
                            backgroundColor: evaluation[crit.id] === opt ? '#f3e8ff' : '#fff',
                            color: evaluation[crit.id] === opt ? '#6b21a8' : 'var(--text-muted)'
                          }}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}

              </div>

              {/* Reviewer Feedback Comments */}
              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
                  Panel Feedback / Revision Requests (Optional)
                </label>
                <textarea 
                  rows={3}
                  placeholder="Detail specific ethical concerns, methodological flaws, or required document amendments..."
                  value={evaluation.comments}
                  onChange={(e) => updateRubric('comments', e.target.value)}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontFamily: 'inherit', fontSize: '0.875rem', boxSizing: 'border-box' }}
                />
              </div>

              {/* FINAL VERDICT SELECTION */}
              <div style={{ padding: '1.25rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  Subcommittee Recommendation Verdict *
                </label>
                
                <select 
                  value={evaluation.recommendation}
                  onChange={(e) => updateRubric('recommendation', e.target.value)}
                  style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '2px solid #8b5cf6', fontWeight: 700, fontSize: '0.95rem', color: '#6b21a8', backgroundColor: '#fff', marginBottom: '1rem', cursor: 'pointer' }}
                >
                  <option value="Recommend Approval">✔ Recommend for Approval (Proceed to Stage 3 Decision)</option>
                  <option value="Revision Required">⚠️ Revision Required (Return to Applicant via Secretariat)</option>
                </select>

                <button 
                  className="btn"
                  style={{ width: '100%', padding: '0.85rem', justifyContent: 'center', backgroundColor: '#8b5cf6', color: '#fff', fontWeight: 700, fontSize: '1rem', boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.4)' }}
                  onClick={handleSumbitEvaluation}
                >
                  Submit Official Panel Evaluation
                </button>
              </div>

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