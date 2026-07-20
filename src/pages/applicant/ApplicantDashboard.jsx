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

export default function ApplicantDashboard({ user, onStartNew, onViewProtocol }) {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [previewDoc, setPreviewDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // States for Fee Payment Integration
  const [activePaymentApp, setActivePaymentApp] = useState(null);
  const [isProcessingPay, setIsProcessingPay] = useState(false);
  const [paymentModalStep, setPaymentModalStep] = useState(1);
  const [generatedReceiptRef, setGeneratedReceiptRef] = useState('');
  const [generatedReceiptDoc, setGeneratedReceiptDoc] = useState(null);

  // Define the 5 core UTM REC stages
  const stages = [
    { number: 1, label: 'Application' },
    { number: 2, label: 'Evaluation' },
    { number: 3, label: 'Decision' },
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
            {/* <button className="btn btn-primary" onClick={() => navigate('/target-page')}>
              <PlusCircle size={18} /> New Submission
            </button> */}
          </div>

          <div className="grid-cards">
            {submissions.map((sub) => {
              const isPendingPay = sub.statusLabel === 'Drafted (Pending Payment)' || sub.statusLabel === 'Pending Payment';

              return (
                <div key={sub.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: isPendingPay ? '2px solid var(--primary)' : '1px solid var(--border-color)' }}>
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
                  
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.8rem', color: sub.requiresRevision ? 'var(--warning)' : isPendingPay ? 'var(--primary)' : 'var(--text-muted)', fontWeight: 600 }}>
                      {sub.requiresRevision ? '⚠️ Revision Required' : isPendingPay ? '💳 Fee Payment Required' : sub.statusLabel}
                    </span>
                    
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      {isPendingPay && (
                        <button 
                          className="btn btn-primary" 
                          style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
                          onClick={() => setActivePaymentApp(sub)}
                        >
                          <CreditCard size={14} /> Pay Fee
                        </button>
                      )}
                      <button 
                        className="btn" 
                        style={{ backgroundColor: 'var(--primary-light)', color: 'var(--primary)' }}
                        onClick={() => setSelectedSubmission(sub)}
                      >
                        Manage <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
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
                  {selectedSubmission.documents?.map((doc) => (
                    <tr key={doc.id}>
                      <td style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <FileText size={16} color="var(--text-muted)" />
                        {doc.type}
                      </td>
                      <td style={{ color: 'var(--primary)', fontWeight: 500 }}>{doc.name}</td>
                      <td style={{ color: 'var(--text-muted)' }}>{doc.uploadDate}</td>
                      <td>
                        <span className={`badge ${doc.status === 'Verified' || doc.status === 'Verified Paid' ? 'badge-success' : 'badge-warning'}`}>
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

    </div>
  );
}