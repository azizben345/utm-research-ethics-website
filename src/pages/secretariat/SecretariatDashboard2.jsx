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
  Trash2,
  Printer,
  Settings
} from 'lucide-react';
import DocChecklistForm from '../../components/wizards/forms/DocChecklistForm';

// Import the Letter Generator Modals we created
import ClinicalApprovalLetterModal from '../../components/letter_generator/ClinicalApprovalLetterModal'; // Or adjust path to match your folder
import AnimalApprovalLetterModal from '../../components/letter_generator/AnimalApprovalLetterModal';
import ExemptionApprovalLetterModal from '../../components/letter_generator/ExemptionApprovalLetterModal';
import RejectionLetterModal from '../../components/letter_generator/RejectionLetterModal';

export default function SecretariatDashboard({ user, onViewProtocol }) {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedEvaluatorEmail, setSelectedEvaluatorEmail] = useState('');
  const [evaluators, setEvaluators] = useState([]);
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [loading, setLoading] = useState(true);

  // States for active letter generator modals
  const [activeLetterModal, setActiveLetterModal] = useState(null); // 'clinical', 'animal', 'exemption', 'rejection'

  const fetchSubmissions = () => {
    setLoading(true);
    fetch('http://localhost:3001/submissions')
      .then((res) => res.json())
      .then((data) => {
        const safeData = Array.isArray(data) ? data : [];
        setSubmissions(safeData);
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const [subsRes, usersRes] = await Promise.all([
        fetch('http://localhost:3001/submissions'),
        fetch('http://localhost:3001/users')
      ]);

      const subsData = await subsRes.json();
      const usersData = await usersRes.json();

      setSubmissions(Array.isArray(subsData) ? subsData : []);
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
        alert(`Application ${selectedSubmission.id} successfully marked as Day 0.`);
        setSelectedSubmission(null);
        setIsChecklistOpen(false);
        fetchSubmissions();
      }
    } catch (err) {
      console.error('Failed to mark Day 0:', err);
    }
  };

  const handleReturnToApplicant = async () => {
    if (!selectedSubmission) return;

    const reason = prompt("Enter reason for returning application:");
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
        alert("Application returned to applicant for revision.");
        setSelectedSubmission(null);
        setIsChecklistOpen(false);
        fetchSubmissions();
      }
    } catch (err) {
      console.error('Failed to return application:', err);
    }
  };

  // --- MANUAL STAGE OVERRIDE HANDLER ---
  const handleManualStageChange = async (newStage) => {
    if (!selectedSubmission) return;
    const stageNum = parseInt(newStage, 10);
    
    let status = selectedSubmission.statusLabel;
    if (stageNum === 1) status = 'Screening Stage';
    if (stageNum === 2) status = 'Under Evaluation';
    if (stageNum === 3) status = 'Decision Making';
    if (stageNum === 4) status = 'Approval / Issuance Stage';
    if (stageNum === 5) status = 'Approved & Closed';

    const updatedPayload = {
      ...selectedSubmission,
      currentStage: stageNum,
      statusLabel: status
    };

    try {
      const res = await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });

      if (res.ok) {
        setSelectedSubmission(updatedPayload);
        fetchSubmissions();
      }
    } catch (err) {
      console.error('Failed to change stage manually:', err);
    }
  };

  if (loading) {
    return (
      <div className="container" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
        <h3>Loading Secretariat Portal...</h3>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '1200px' }}>
      
      {!selectedSubmission ? (
        <>
          <div className="flex-between card" style={{ borderLeft: '4px solid var(--warning)' }}>
            <div>
              <h1 style={{ margin: '0 0 0.25rem 0' }}>Secretariat Screening Portal</h1>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Conduct early screenings, verify document completeness, and manage application workflows.
              </p>
            </div>
            <button className="btn" style={{ background: 'var(--bg-app)', border: '1px solid var(--border-color)' }} onClick={fetchSubmissions}>
              <RefreshCw size={16} /> Refresh Queue
            </button>
          </div>

          {submissions.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <Inbox size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.5 }} />
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>No Submissions Found</h3>
            </div>
          ) : (
            <div className="grid-cards">
              {submissions.map((sub) => (
                <div key={sub.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>{sub.id || 'NO-ID'}</span>
                      <span className="badge badge-warning">Stage {sub.currentStage || 1}</span>
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>{sub.projectTitle || 'Untitled Research Protocol'}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 0.25rem 0' }}>
                      <strong>PI:</strong> {sub.applicantName || 'Unknown Applicant'}
                    </p>
                  </div>
                  
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.8rem', color: sub.requiresRevision ? 'var(--danger)' : 'var(--success)', fontWeight: 600 }}>
                      {sub.requiresRevision ? '⚠️ Revisions Requested' : sub.statusLabel}
                    </span>
                    <button 
                      className="btn btn-warning" 
                      onClick={() => {
                        setSelectedSubmission(sub);
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
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--warning)' }}>AUDIT: {selectedSubmission.id}</span>
                <h1 style={{ margin: '0.25rem 0' }}>{selectedSubmission.projectTitle || 'Untitled Research Protocol'}</h1>
                <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                  Applicant: {selectedSubmission.applicantName || 'N/A'} | Current Status: <strong>{selectedSubmission.statusLabel}</strong>
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                
                {/* MANUAL STAGE OVERRIDE CONTROLS (Secretariat Governance) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: '#f1f5f9', padding: '0.4rem 0.75rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                  <Settings size={14} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>Stage Control:</span>
                  <select 
                    value={selectedSubmission.currentStage || 1} 
                    onChange={(e) => handleManualStageChange(e.target.value)}
                    style={{ padding: '0.2rem 0.4rem', fontSize: '0.8rem', borderRadius: '4px' }}
                  >
                    <option value="1">Stage 1: Screening</option>
                    <option value="2">Stage 2: Evaluation</option>
                    <option value="3">Stage 3: Decision</option>
                    <option value="4">Stage 4: Approval / Issuance</option>
                    <option value="5">Stage 5: Closure</option>
                  </select>
                </div>

                <div style={{ padding: '0.5rem 1rem', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-sm)' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '0.85rem', fontWeight: 500 }}>
                    Form Type: <strong>{selectedSubmission.formApplied || 'Standard'}</strong>
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
            <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {(selectedSubmission.assignedEvaluators || []).map(ev => (
                <div key={ev.email} className="badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  {ev.name} <button onClick={() => handleRemoveEvaluator(ev.email)}><Trash2 size={12} /></button>
                </div>
              ))}
            </div>
          </header>

          {/* STAGE 4: DYNAMIC PDF LETTER GENERATORS & ISSUANCE SECTION */}
          {selectedSubmission.currentStage >= 4 && (
            <section className="card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid #059669', backgroundColor: '#ecfdf5' }}>
              <h3><CheckCircle2 size={20} /> Stage 4: Decision & Letter Issuance</h3>
              <p style={{ fontSize: '0.85rem', color: '#065f46', marginBottom: '1rem' }}>
                Select the appropriate official institutional document to generate, preview, and print as a PDF.
              </p>
              
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-success" onClick={() => setActiveLetterModal('clinical')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Printer size={16} /> Generate Clinical / Non-Clinical Letter
                </button>
                <button className="btn btn-success" onClick={() => setActiveLetterModal('animal')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Printer size={16} /> Generate Animal Research Letter
                </button>
                <button className="btn btn-success" onClick={() => setActiveLetterModal('exemption')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Printer size={16} /> Generate Exemption Letter
                </button>
                <button className="btn btn-danger" onClick={() => setActiveLetterModal('rejection')} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', background: '#dc2626', color: '#fff' }}>
                  <AlertTriangle size={16} /> Generate Rejection Notice
                </button>
              </div>
            </section>
          )}

          {/* SPLIT LAYOUT: Document Table (Left) & Checklist Panel (Right) */}
          <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
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
                    {(selectedSubmission.documents || []).length === 0 ? (
                      <tr>
                        <td colSpan="3" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                          No documents found attached.
                        </td>
                      </tr>
                    ) : (
                      (selectedSubmission.documents || []).map((doc, idx) => (
                        <tr key={doc.id || idx}>
                          <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={16} color="var(--text-muted)" /> {doc.type || 'Attachment'}
                          </td>
                          <td style={{ color: 'var(--primary)', fontWeight: 500 }}>{doc.name}</td>
                          <td>
                            <button className="btn" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)' }} onClick={() => setPreviewDoc(doc)}>
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

      {/* RENDER ACTIVE PDF LETTER GENERATOR MODAL */}
      {activeLetterModal === 'clinical' && (
        <ClinicalApprovalLetterModal submission={selectedSubmission} onClose={() => setActiveLetterModal(null)} />
      )}
      {activeLetterModal === 'animal' && (
        <AnimalApprovalLetterModal submission={selectedSubmission} onClose={() => setActiveLetterModal(null)} />
      )}
      {activeLetterModal === 'exemption' && (
        <ExemptionApprovalLetterModal submission={selectedSubmission} onClose={() => setActiveLetterModal(null)} />
      )}
      {activeLetterModal === 'rejection' && (
        <RejectionLetterModal submission={selectedSubmission} onClose={() => setActiveLetterModal(null)} />
      )}

    </div>
  );
}