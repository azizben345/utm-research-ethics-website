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
  Download,
  CreditCard
} from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
import Step4ReviewFee from '../../components/wizards/Step4ReviewFee';
import Step5FinalReview from '../../components/wizards/Step5FinalReview';
import PeriodicMonitoringForm from '../../components/wizards/forms/PeriodicMonitoringForm';

export default function ApplicantDashboard({ user, onStartNew, onViewProtocol }) {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // States for Fee Payment Integration
  const [activePaymentApp, setActivePaymentApp] = useState(null);
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [paymentModalStep, setPaymentModalStep] = useState(1);
  const [generatedReceiptRef, setGeneratedReceiptRef] = useState('');
  const [generatedReceiptDoc, setGeneratedReceiptDoc] = useState(null);

  // State for the 6-Month Periodic Monitoring Modal
  const [showMonitoringModal, setShowMonitoringModal] = useState(false);

  // Define the 5 core UTM REC stages
  const stages = [
    { number: 1, label: 'Application' },
    { number: 2, label: 'Evaluation' },
    { number: 3, label: 'Decision: Waiting for Sub-committee Meeting' },
    { number: 4, label: 'Approval Period' },
    { number: 5, label: 'Closure' }
  ];

  // Reusable fetch function to refresh dashboard after payment or on mount
  const fetchSubmissions = () => {
    setLoading(true);
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
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // Executes PATCH request when applicant completes the payment modal
  // When a user clicks "Pay Review Fee" on a card, reset the modal states:
  const openPaymentModal = (app) => {
    setActivePaymentApp(app);
    setPaymentModalStep(1);
    setGeneratedReceiptRef('');
    setGeneratedReceiptDoc(null);
  };

  // The execution function passed to Step 5
  const handleFinalModalSubmit = async () => {
    setIsProcessingPay(true);

    try {
      const res = await fetch(`http://localhost:3001/submissions/${activePaymentApp.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          statusLabel: 'Submitted (Pending Secretariat Screening)',
          currentStage: 1, 
          paymentStatus: 'Paid (Pending Verification)',
          feePaid: `RM ${activePaymentApp.feeAmount || 100}.00`,
          documents: [...(activePaymentApp.documents || []), generatedReceiptDoc].filter(Boolean)
        })
      });

      if (res.ok) {
        setIsProcessingPay(false);
        setActivePaymentApp(null);
        fetchSubmissions(); // Refresh the dashboard cards
      }
    } catch (err) {
      console.error('Payment Error:', err);
      setIsProcessingPay(false);
    }
  };

  const handlePeriodicReportSubmit = async (reportData) => {
    try {
      const existingReports = selectedSubmission.periodicReports || [];
      const updatedReports = [
        ...existingReports, 
        { ...reportData, id: Date.now(), submittedAt: new Date().toISOString() }
      ];

      const res = await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          periodicReports: updatedReports
        })
      });

      if (res.ok) {
        alert("6-month progress report successfully submitted to UTM REC!");
        setShowMonitoringModal(false);
        fetchSubmissions(); // Refresh global list
        
        // Keep currently viewed submission synced
        setSelectedSubmission(prev => ({
          ...prev,
          periodicReports: updatedReports
        }));
      }
    } catch (err) {
      console.error("Error saving periodic report:", err);
      alert("Failed to save report to backend database.");
    }
  };

  const filteredSubmissions = submissions.filter(sub => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (sub.id && sub.id.toLowerCase().includes(query)) ||
      (sub.projectTitle && sub.projectTitle.toLowerCase().includes(query)) ||
      (sub.statusLabel && sub.statusLabel.toLowerCase().includes(query)) ||
      (sub.applicantName && sub.applicantName.toLowerCase().includes(query))
    );
  });

  if (loading) {
    return <div className="container">Loading Dashboard...</div>;
  }

  return (
    <div className="container">
      
      {/* ========================================================= */}
      {/* VIEW 1: MASTER LIST (Table Format with Search)            */}
      {/* ========================================================= */}
      {!selectedSubmission ? (
        <>
          <div className="flex-between card" style={{ flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 style={{ margin: '0 0 0.25rem 0' }}>Research Ethics Submissions</h1>
              <p style={{ margin: 0, color: 'var(--text-muted)' }}>
                Manage and track all ongoing research projects under UTM REC review.
              </p>
            </div>
            
            {/* SEARCH INPUT */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input 
                type="text" 
                placeholder="Search ID, Title, Status..." 
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ minWidth: '250px', padding: '0.6rem', borderRadius: '6px' }}
              />
            </div>
          </div>

          <div className="card">
            <div className="table-container">
              <table className="custom-table" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th>Ref ID</th>
                    <th>Project Title</th>
                    <th>Stage</th>
                    <th>Status</th>
                    <th>Submission Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((sub) => {
                      const isPendingPay = sub.statusLabel === 'Drafted (Pending Payment)' || sub.statusLabel === 'Pending Payment';
                      return (
                        <tr key={sub.id} style={{ borderLeft: isPendingPay ? '4px solid var(--primary)' : '4px solid transparent' }}>
                          <td style={{ fontWeight: 600 }}>{sub.id}</td>
                          <td style={{ maxWidth: '250px' }}>
                            <div style={{ fontWeight: 600, color: 'var(--text-main)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {sub.projectTitle}
                            </div>
                          </td>
                          <td><span className="badge badge-primary">Stage {sub.currentStage}</span></td>
                          <td>
                            <span style={{ fontSize: '0.8rem', color: sub.requiresRevision ? 'var(--warning)' : isPendingPay ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600 }}>
                              {sub.requiresRevision ? '⚠️ Revision Required' : isPendingPay ? '💳 Fee Payment Required' : sub.statusLabel}
                            </span>
                          </td>
                          <td style={{ color: 'var(--text-muted)' }}>{sub.submissionDate}</td>
                          <td>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                              {isPendingPay && (
                                <button 
                                  className="btn btn-primary btn-sm" 
                                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                  onClick={() => setActivePaymentApp(sub)}
                                >
                                  <CreditCard size={14} /> Pay
                                </button>
                              )}
                              <button 
                                className="btn btn-sm" 
                                style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)', padding: '0.3rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                                onClick={() => setSelectedSubmission(sub)}
                              >
                                Manage <ChevronRight size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                        No submissions match your search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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

              {/* Updated Right Column: Badge + View Protocol Button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                <span className="badge badge-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                  Stage {selectedSubmission.currentStage} of 5
                </span>
                
                <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                    Form Type: <strong>{selectedSubmission.formApplied}</strong>
                  </span>
                </div>

                <button 
                  className="btn" 
                  style={{ 
                    backgroundColor: 'var(--bg-app)', 
                    border: '1px solid var(--border-color)', 
                    fontSize: '0.85rem', 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '0.4rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => onViewProtocol(selectedSubmission.id)}
                >
                  <FileText size={16} color="var(--primary)" /> View Form
                </button>
              </div>

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

          {/* CONDITIONAL 6-MONTH MONITORING REPORT BANNER (Stage 5 Closed) */}
          {selectedSubmission?.currentStage === 5 && selectedSubmission?.statusLabel === 'Approved & Closed' && (
            <div className="card" style={{ backgroundColor: '#ecfdf5', borderLeft: '4px solid #059669', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginTop: '1rem' }}>
              <div>
                <h4 style={{ margin: '0 0 0.25rem 0', color: '#065f46' }}>Periodic Monitoring Report Required</h4>
                <p style={{ margin: 0, color: '#065f46', fontSize: '0.9rem' }}>
                  Clinical and non-clinical reports must be submitted every six (6) months to UTM REC (Up to 8 reports).
                </p>
                {selectedSubmission.periodicReports?.length > 0 && (
                  <span style={{ fontSize: '0.8rem', color: '#047857', fontWeight: 600, display: 'inline-block', marginTop: '0.25rem' }}>
                    ✓ {selectedSubmission.periodicReports.length} report(s) submitted so far.
                  </span>
                )}
              </div>
              <button 
                className="btn btn-success"
                onClick={() => setShowMonitoringModal(true)}
              >
                Fill 6-Month Progress Report Form <PlusCircle size={16} />
              </button>
            </div>
          )}

          {/* LIST OF SUBMITTED PERIODIC REPORTS */}
          {selectedSubmission?.periodicReports?.length > 0 && (
            <div className="card" style={{ marginTop: '1rem' }}>
              <h4 style={{ margin: '0 0 0.75rem 0', color: '#065f46' }}>Submitted Periodic Monitoring Reports</h4>
              <div className="table-container">
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Report No.</th>
                      <th>PI Signature</th>
                      <th>Submission Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedSubmission.periodicReports.map((rep, idx) => (
                      <tr key={rep.id || idx}>
                        <td style={{ fontWeight: 600 }}>Report #{rep.reportNo}</td>
                        <td>{rep.piSignature}</td>
                        <td style={{ color: 'var(--text-muted)' }}>{new Date(rep.submittedAt).toLocaleDateString()}</td>
                        <td><span className="badge badge-success">Submitted</span></td>
                        <td>
                          <button 
                            className="btn" 
                            style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)' }}
                          >
                            <Eye size={14} /> Preview
                          </button>
                          <button className="btn btn-sm btn-danger" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'red', color: 'white', borderColor: 'red' }}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DIRECT DOCUMENT UPLOADER & CORRECTION SECTION */}
          { (
              selectedSubmission?.statusLabel?.toLowerCase().includes('amend') 
              || selectedSubmission?.statusLabel === 'Approved & Closed'
              || selectedSubmission?.statusLabel === 'Returned for Revision' // stc
            ) && (
            <div className="card" style={{ marginTop: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
              <h3 style={{ marginTop: 0, marginBottom: '0.5rem' }}>Upload / Revise Documents</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                Use this section to upload amended documents or requested files for approved projects.
              </p>

              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                <input 
                  type="text" 
                  id="new-doc-type" 
                  placeholder="Document Type (e.g. Revised CV)" 
                  className="form-control" 
                  style={{ flex: 1, minWidth: '200px', padding: '0.5rem' }}
                />
                <input 
                  type="file" 
                  id="new-doc-file" 
                  accept=".pdf" 
                  style={{ padding: '0.4rem', background: '#fff', border: '1px solid var(--border-color)', borderRadius: '4px' }}
                />
                <button 
                  className="btn btn-primary"
                  onClick={async () => {
                    const typeInput = document.getElementById('new-doc-type');
                    const fileInput = document.getElementById('new-doc-file');

                    if (!typeInput.value || !fileInput.files[0]) {
                      alert("Please enter a document type and select a PDF file.");
                      return;
                    }

                    const newDoc = {
                      id: `doc-${Date.now()}`,
                      type: typeInput.value,
                      name: fileInput.files[0].name,
                      uploadDate: new Date().toISOString().split('T')[0],
                      status: 'Uploaded (Pending Review)'
                    };

                    const updatedDocs = [...(selectedSubmission.documents || []), newDoc];

                    try {
                      const res = await fetch(`http://localhost:3001/submissions/${selectedSubmission.id}`, {
                        method: 'PATCH',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ documents: updatedDocs, requiresRevision: false })
                      });

                      if (res.ok) {
                        alert("Document uploaded successfully!");
                        typeInput.value = '';
                        fileInput.value = '';
                        fetchSubmissions();
                        setSelectedSubmission(prev => ({ ...prev, documents: updatedDocs, requiresRevision: false }));
                      }
                    } catch (err) {
                      console.error("Upload failed:", err);
                      alert("Failed to update database.");
                    }
                  }}
                >
                  Upload Document
                </button>
              </div>
            </div>
          )}

          {/* CONDITIONAL FEE PAYMENT ALERT BANNER */}
          {selectedSubmission.statusLabel === 'Drafted (Pending Payment)' && (
            <div className="card" style={{ backgroundColor: '#eff6ff', borderLeft: '4px solid var(--primary)', display: 'flex', gap: '1rem', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <CreditCard color="var(--primary)" size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', color: '#1e3a8a' }}>Action Required: Ethics Review Fee Payment</h4>
                  <p style={{ margin: 0, color: '#1e3a8a', fontSize: '0.9rem' }}>
                    Your application has been endorsed by your Dean. Please settle the processing fee to transmit the package to the Secretariat for screening.
                  </p>
                </div>
              </div>
              <button 
                className="btn btn-primary"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' }}
                onClick={() => setActivePaymentApp(selectedSubmission)}
              >
                <CreditCard size={16} /> Pay Review Fee ({selectedSubmission.feePaid || 'RM 100'})
              </button>
            </div>
          )}

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
                  {/* 1. Create a dynamic list combining existing docs + the Approval Letter */}
                  {(() => {
                    const docs = [...(selectedSubmission.documents || [])];
                    
                    // If an approval letter exists, inject it into the list
                    if (selectedSubmission.approvalLetterName) {
                      docs.push({
                        id: 'approval-letter-001',
                        type: 'Approval Letter',
                        name: selectedSubmission.approvalLetterName,
                        uploadDate: 'Finalized',
                        status: 'Approved'
                      });
                    }
                    return docs;
                  })().map((doc) => (
                    <tr key={doc.id}>
                      <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} color={doc.type === 'Approval Letter' ? 'var(--primary)' : 'var(--text-muted)'} />
                        {doc.type}
                      </td>
                      <td style={{ color: 'var(--primary)', fontWeight: 500 }}>{doc.name}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{doc.uploadDate}</td>
                      <td>
                        <span className={`badge ${doc.status === 'Approved' ? 'badge-success' : 'badge-warning'}`}>
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

      {/* MODALS SECTION: */}

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

      {/* ========================================================= */}
      {/* VIEW 4: RESUMING FEE PAYMENT MODAL (Step 4 -> Step 5)     */}
      {/* ========================================================= */}
      {activePaymentApp && (
        <div className="modal-overlay" onClick={() => !isProcessingPay && setActivePaymentApp(null)} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <div className="modal-content" style={{ background: '#fff', borderRadius: '8px', maxWidth: '750px', width: '100%', padding: '1.5rem', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Internal Router */}
            {paymentModalStep === 1 ? (
              <Step4ReviewFee 
                applicationData={activePaymentApp}
                onCancel={() => setActivePaymentApp(null)}
                onProceedToReview={(ref, newDoc) => {
                  setGeneratedReceiptRef(ref);
                  setGeneratedReceiptDoc(newDoc);
                  setPaymentModalStep(2);
                }}
              />
            ) : (
              <Step5FinalReview 
                applicationData={activePaymentApp}
                paymentReceiptRef={generatedReceiptRef}
                newReceiptDoc={generatedReceiptDoc}
                onPrev={() => setPaymentModalStep(1)}
                onSubmit={handleFinalModalSubmit}
                isSubmitting={isProcessingPay}
              />
            )}

          </div>
        </div>
      )}

      {/* PERIODIC MONITORING FORM MODAL */}
      {showMonitoringModal && (
        <PeriodicMonitoringForm 
          submission={selectedSubmission}
          onClose={() => setShowMonitoringModal(false)}
          onSubmitReport={handlePeriodicReportSubmit}
        />
      )}

    </div>
  );
}