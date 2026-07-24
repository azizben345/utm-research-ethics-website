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
  Inbox,
  Search // Added Search icon for the search bar
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
  
  // NEW: State for the search bar
  const [searchTerm, setSearchTerm] = useState('');

  // Digital Evaluation Rubric State (Form 1.8)
  const [evaluation, setEvaluation] = useState({
    scientificMerit: 'Satisfactory',
    participantConsent: 'Satisfactory',
    riskBenefitRatio: 'Satisfactory',
    dataPrivacy: 'Satisfactory',
    comments: '',
    recommendation: 'Recommend Approval'
  });

  // Safe Fetch from live backend (fallback to mock data if json-server is offline)
  const fetchAssignedSubmissions = () => {
    setLoading(true);
    fetch('http://localhost:3001/submissions')
      .then((res) => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [];
        
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

  // SUBMIT EVALUATION ACTION
  const handleSumbitEvaluation = async () => {
    if (!selectedSubmission) return;

    const isApproved = evaluation.recommendation === 'Recommend Approval';
    
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

      if (res.ok || res.status === 404) {
        alert(`Evaluation successfully submitted!\nVerdict: ${evaluation.recommendation}\n\nThis application has been routed to Stage ${isApproved ? '3 (Decision Making)' : '1 (Revision)'}.`);
        setSelectedSubmission(null);
        fetchAssignedSubmissions();
      }
    } catch (err) {
      alert(`Evaluation logged locally for prototype demo!\nVerdict: ${evaluation.recommendation}`);
      setSelectedSubmission(null);
    }
  };

  // NEW: Filter logic for the search bar
  const filteredSubmissions = submissions.filter((sub) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      (sub.id && sub.id.toLowerCase().includes(searchLower)) ||
      (sub.projectTitle && sub.projectTitle.toLowerCase().includes(searchLower)) ||
      (sub.applicantName && sub.applicantName.toLowerCase().includes(searchLower))
    );
  });

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
          <div className="flex-between card" style={{ borderLeft: '4px solid var(--purple, #8b5cf6)', marginBottom: '1.5rem' }}>
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
            <div className="card">
              {/* SEARCH BAR WIDGET */}
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.75rem', background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <Search size={20} color="var(--text-muted)" />
                <input 
                  type="text" 
                  placeholder="Search by ID, Project Title, or Applicant Name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
                />
                {searchTerm && (
                  <button className="btn" style={{ background: 'transparent', padding: '0.25rem' }} onClick={() => setSearchTerm('')}>
                    <X size={16} color="var(--text-muted)" />
                  </button>
                )}
              </div>

              {/* TABLE LAYOUT */}
              <div className="table-container">
                <table className="custom-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Protocol ID</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Project Details</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Stage</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)' }}>Assigned Date</th>
                      <th style={{ padding: '1rem', color: 'var(--text-muted)', textAlign: 'right' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubmissions.length > 0 ? (
                      filteredSubmissions.map((sub) => (
                        <tr key={sub.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                          <td style={{ padding: '1rem', fontWeight: 600 }}>{sub.id || 'NO-ID'}</td>
                          <td style={{ padding: '1rem' }}>
                            <div style={{ fontWeight: 600, fontSize: '1rem', marginBottom: '0.25rem' }}>{sub.projectTitle || 'Untitled Research Protocol'}</div>
                            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                              <strong>PI:</strong> {sub.applicantName || 'N/A'} | <strong>Type:</strong> {sub.formApplied || 'Research'}
                            </div>
                          </td>
                          <td style={{ padding: '1rem' }}>
                            <span className="badge" style={{ backgroundColor: '#f3e8ff', color: '#6b21a8', fontWeight: 600, padding: '0.25rem 0.5rem', borderRadius: '4px' }}>
                              Stage 2
                            </span>
                          </td>
                          <td style={{ padding: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            {sub.assignedDate || 'Recently'}
                          </td>
                          <td style={{ padding: '1rem', textAlign: 'right' }}>
                            <button 
                              className="btn" 
                              style={{ backgroundColor: '#8b5cf6', color: '#fff', padding: '0.5rem 1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                              onClick={() => setSelectedSubmission(sub)}
                            >
                              Evaluate <ChevronRight size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                          No protocols match your search query.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
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
                <table className="custom-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <th style={{ padding: '0.5rem' }}>Document Type</th>
                      <th style={{ padding: '0.5rem' }}>File Name</th>
                      <th style={{ padding: '0.5rem' }}>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(selectedSubmission.documents || []).map((doc, idx) => (
                      <tr key={doc.id || idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ fontWeight: 600, fontSize: '0.85rem', padding: '0.5rem' }}>{doc.type || 'Attachment'}</td>
                        <td style={{ color: '#8b5cf6', fontWeight: 500, fontSize: '0.85rem', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', padding: '0.5rem' }}>
                          {doc.name || `File_${idx + 1}.pdf`}
                        </td>
                        <td style={{ padding: '0.5rem' }}>
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
                    const updatedPayload = {
                        ...selectedSubmission,
                        currentStage: 4, 
                        statusLabel: 'Evaluated',
                        panelEvaluationResult: evaluationData 
                    };
                    
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
        <div className="modal-overlay" onClick={() => setPreviewDoc(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', maxWidth: '500px', width: '100%' }}>
            <div className="modal-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FileText color="#8b5cf6" size={20} />
                <h4 style={{ margin: 0 }}>Reference Document: {previewDoc.name || 'Preview'}</h4>
              </div>
              <button className="btn" style={{ padding: '0.25rem', background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setPreviewDoc(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="modal-body">
              <div style={{ padding: '3rem', border: '2px dashed var(--border-color)', borderRadius: '8px', background: '#f9fafb', textAlign: 'center' }}>
                <FileText size={48} color="#9ca3af" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ margin: '0 0 0.5rem 0', color: '#111827' }}>PDF Content Simulator</h3>
                <p style={{ color: '#6b7280', fontSize: '0.9rem' }}>Displaying evaluator reference copy for <strong>{previewDoc.type || 'Attachment'}</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}