import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  QrCode, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  CreditCard, 
  ShieldCheck, 
  AlertCircle,
  Trash2
} from 'lucide-react';

export default function NewSubmissionWizard({ user, onSuccess }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // 1. WIZARD STATE: Stores data across all 4 steps
  const [formData, setFormData] = useState({
    formType: '',
    formTitle: '',
    feeAmount: 0,
    projectTitle: '',
    applicantName: user ? user.name : 'Dr. Sarah Razak',
    applicantEmail: user ? user.email : 'sarah.r@utm.my',
    faculty: 'Faculty of Computing',
    fundingSource: 'Ministry of Higher Education (MOHE)',
    documents: [],
    paymentStatus: 'Pending Verification',
    paymentReceiptRef: ''
  });

  // Define the 4 standard REC Application Form Types & associated fees
  const formTypes = [
    {
      id: 'FORM-A',
      title: 'Clinical Research Ethics',
      desc: 'For interventional or observational studies involving direct human participant interaction, surveys, or interviews.',
      fee: 300,
      badge: 'Standard Review'
    },
    {
      id: 'FORM-B',
      title: 'Non-Clinical Research Ethics',
      desc: 'For research utilizing secondary data, pre-existing medical records, or anonymized biological tissue banks.',
      fee: 200,
      badge: 'Expedited Review'
    },
    {
      id: 'FORM-C',
      title: 'Animal Research Ethics',
      desc: 'For research involving animals, including studies on animal welfare, behavior, and physiology.',
      fee: 600,
      badge: 'Full Committee'
    },
    {
      id: 'FORM-D',
      title: 'Exemption Form',
      desc: 'For minimal risk projects qualifying for REC notification only without formal endorsement requirements.',
      fee: 100,
      badge: 'Notification Only'
    }
  ];

  // STEP 1 HANDLER: Select Form Type & Calculate Fee
  const handleSelectForm = (form) => {
    setFormData({
      ...formData,
      formType: form.id,
      formTitle: form.title,
      feeAmount: form.fee
    });
  };

  // STEP 2 HANDLER: Simulate Document Upload
  const handleFileUpload = (docTypeLabel) => {
    const fakeFileName = `${formData.projectTitle.replace(/\s+/g, '_').slice(0, 15)}_${docTypeLabel.replace(/\s+/g, '_')}_v1.pdf`;
    
    const newDoc = {
      id: `doc-${Date.now()}-${Math.floor(Math.random()*1000)}`,
      name: fakeFileName,
      type: docTypeLabel,
      uploadDate: new Date().toISOString().split('T')[0],
      status: 'Pending Review' // Default status for Secretariat early screening
    };

    setFormData({
      ...formData,
      documents: [...formData.documents, newDoc]
    });
  };

  const removeDocument = (docId) => {
    setFormData({
      ...formData,
      documents: formData.documents.filter((d) => d.id !== docId)
    });
  };

  // STEP 4 HANDLER: Final Submission to json-server Database
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    // Generate formatted ID (e.g., REC-2026-004)
    const randomNum = Math.floor(100 + Math.random() * 900);
    const newSubmissionId = `REC-2026-${randomNum}`;

    const payload = {
      id: newSubmissionId,
      projectTitle: formData.projectTitle,
      applicantName: formData.applicantName,
      applicantEmail: formData.applicantEmail,
      faculty: formData.faculty,
      fundingSource: formData.fundingSource,
      formApplied: formData.formTitle,
      submissionDate: new Date().toISOString().split('T')[0],
      currentStage: 1, // Lands in Stage 1: Secretariat Early Screening
      statusLabel: 'Submitted (Pending Secretariat Screening)',
      riskClassification: formData.formType === 'FORM-D' ? 'Minimum Risk' : 'Pending',
      requiresRevision: false,
      revisionMessage: '',
      feePaid: `RM ${formData.feeAmount}`,
      paymentStatus: formData.paymentStatus,
      documents: formData.documents
    };

    try {
      const res = await fetch('http://localhost:3001/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsSubmitting(false);
        onSuccess(); // Redirects back to Dashboard Master View
      } else {
        throw new Error('Failed to save submission to database.');
      }
    } catch (err) {
      console.error('Submission Error:', err);
      setError('Could not connect to database. Ensure npm run server is running.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '900px' }}>
      
      {/* WIZARD HEADER & STEP PROGRESS BAR */}
      <div className="card" style={{ marginBottom: '2rem' }}>
        <div className="flex-between" style={{ marginBottom: '1.5rem' }}>
          <div>
            <h1 style={{ margin: '0 0 0.25rem 0' }}>New Ethics Review Application</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Complete the 4-step submission wizard to initiate UTM REC institutional clearance.
            </p>
          </div>
          <span className="badge badge-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            Step {step} of 4
          </span>
        </div>

        {/* 4-Step Indicator Bar */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              style={{ 
                flex: 1, 
                height: '6px', 
                borderRadius: '9999px', 
                backgroundColor: step >= s ? 'var(--primary)' : 'var(--border-color)',
                transition: 'all 0.3s'
              }} 
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="card" style={{ backgroundColor: 'var(--danger-light)', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 1: CHOOSE APPLICATION FORM & PROTOCOL DETAILS         */}
      {/* ========================================================= */}
      {step === 1 && (
        <div className="card">
          <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>1. Select Application Form Type & Details</h2>
          
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            Choose REC Protocol Form Type:
          </label>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            {formTypes.map((f) => {
              const isSelected = formData.formType === f.id;
              return (
                <div 
                  key={f.id}
                  onClick={() => handleSelectForm(f)}
                  style={{ 
                    padding: '1.25rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary">{f.badge}</span>
                      <strong style={{ color: 'var(--primary)' }}>RM {f.fee}</strong>
                    </div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{f.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Research Project Title *
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g., AI-Driven Diagnostic Tools in Clinical Trials"
                value={formData.projectTitle}
                onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              {/* <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Faculty / Responsibility Centre
                </label>
                <input 
                  type="text" 
                  value={formData.faculty}
                  onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Funding Source / Grant Sponsor
                </label>
                <input 
                  type="text" 
                  value={formData.fundingSource}
                  onChange={(e) => setFormData({ ...formData, fundingSource: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                />
              </div> */}
            </div>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              className="btn btn-primary" 
              disabled={!formData.formType || !formData.projectTitle.trim()}
              onClick={() => setStep(2)}
              style={{ padding: '0.75rem 1.5rem', opacity: (!formData.formType || !formData.projectTitle.trim()) ? 0.5 : 1 }}
            >
              Next: Upload Documents <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 2: UPLOAD SUPPORTING DOCUMENTS                        */}
      {/* ========================================================= */}
      {step === 2 && (
        <div className="card">
          <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>2. Attach Required Supporting Documents</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Selected Protocol: <strong>{formData.formTitle}</strong>. Attach standard required files for early screening.
          </p>

          {/* Quick Mock Uploader Buttons */}
          <div style={{ padding: '1.5rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--bg-app)', marginBottom: '1.5rem', textAlign: 'center' }}>
            <Upload size={32} color="var(--primary)" style={{ margin: '0 auto 0.5rem auto' }} />
            <h4 style={{ margin: '0 0 0.5rem 0' }}>Simulate File Attachment</h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>Click below to attach mock PDF files to your submission package.</p>
            
            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)' }} onClick={() => handleFileUpload('Application Form')}>
                + Application Form
              </button>
              <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)' }} onClick={() => handleFileUpload('Informed Consent Form')}>
                + Consent Form
              </button>
              <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)' }} onClick={() => handleFileUpload('Research Proposal')}>
                + Full Proposal
              </button>
              <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)' }} onClick={() => handleFileUpload('CV / Investigator Bio')}>
                + PI Resume / CV
              </button>
            </div>
          </div>

          {/* Attached Files List */}
          <h4 style={{ marginBottom: '0.5rem' }}>Attached Documents ({formData.documents.length})</h4>
          {formData.documents.length === 0 ? (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No documents attached yet. Click the simulation buttons above.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '2rem' }}>
              {formData.documents.map((doc) => (
                <div key={doc.id} className="flex-between" style={{ padding: '0.75rem 1rem', background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <FileText size={16} color="var(--primary)" />
                    <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{doc.name}</span>
                    <span className="badge badge-primary">{doc.type}</span>
                  </div>
                  <button onClick={() => removeDocument(doc.id)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer' }} title="Remove file">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex-between" style={{ marginTop: '2rem' }}>
            <button className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }} onClick={() => setStep(1)}>
              <ArrowLeft size={16} /> Previous: Protocol Details
            </button>
            <button 
              className="btn btn-primary" 
              disabled={formData.documents.length === 0}
              onClick={() => setStep(3)}
              style={{ padding: '0.75rem 1.5rem', opacity: formData.documents.length === 0 ? 0.5 : 1 }}
            >
              Next: Fee Payment <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 3: QR CODE PAYMENT SIMULATION                         */}
      {/* ========================================================= */}
      {step === 3 && (
        <div className="card">
          <h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>3. Institutional Review Fee Processing</h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
            Process your ethics review processing fee via DuitNow QR or Institutional Transfer.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center', background: 'var(--bg-app)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
            
            <div style={{ textAlign: 'center', padding: '1rem', background: '#fff', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ border: '2px solid var(--text-main)', display: 'inline-block', padding: '1rem', borderRadius: '8px', marginBottom: '0.5rem' }}>
                <QrCode size={140} color="var(--text-main)" />
              </div>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-main)' }}>UTM REC DuitNow QR</strong>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scan via standard Malaysian banking apps</span>
            </div>

            <div>
              <span className="badge badge-primary" style={{ marginBottom: '0.5rem' }}>Payment Summary</span>
              <h3 style={{ fontSize: '1.75rem', margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>RM {formData.feeAmount}.00</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>
                Applicable for: <strong>{formData.formTitle}</strong>.
              </p>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Simulate Bank Reference Number
                </label>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <input 
                    type="text" 
                    placeholder="e.g., DUITNOW-998822"
                    value={formData.paymentReceiptRef}
                    onChange={(e) => setFormData({ ...formData, paymentReceiptRef: e.target.value, paymentStatus: 'Paid (Pending Verification)' })}
                    style={{ flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                  />
                  <button 
                    type="button" 
                    className="btn btn-success"
                    style={{ padding: '0.5rem 0.75rem', fontSize: '0.8rem' }}
                    onClick={() => setFormData({ ...formData, paymentReceiptRef: `UTM-REC-PAY-${Math.floor(10000 + Math.random()*90000)}`, paymentStatus: 'Paid (Pending Verification)' })}
                  >
                    Auto-Fill
                  </button>
                </div>
                <span style={{ fontSize: '0.75rem', color: 'var(--success)', display: 'block', marginTop: '0.5rem', fontWeight: 600 }}>
                  Status: {formData.paymentStatus}
                </span>
              </div>
            </div>

          </div>

          <div className="flex-between">
            <button className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }} onClick={() => setStep(2)}>
              <ArrowLeft size={16} /> Previous: Attach Documents
            </button>
            <button 
              className="btn btn-primary" 
              disabled={!formData.paymentReceiptRef}
              onClick={() => setStep(4)}
              style={{ padding: '0.75rem 1.5rem', opacity: !formData.paymentReceiptRef ? 0.5 : 1 }}
            >
              Next: Review & Confirm <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* STEP 4: REVIEW & SUBMIT APPLICATION                        */}
      {/* ========================================================= */}
      {step === 4 && (
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <ShieldCheck size={48} color="var(--primary)" style={{ margin: '0 auto 0.5rem auto' }} />
            <h2 style={{ margin: '0 0 0.25rem 0' }}>4. Final Submission Review</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', margin: 0 }}>
              Verify all application parameters before submitting to the UTM REC Secretariat for Stage 1 Early Screening.
            </p>
          </div>

          {/* Submission Summary Box */}
          <div style={{ background: 'var(--bg-app)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem', marginBottom: '1rem' }}>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Project Title:</span>
                <strong>{formData.projectTitle}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Form Type:</span>
                <strong>{formData.formTitle}</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Primary Investigator:</span>
                <strong>{formData.applicantName} ({formData.faculty})</strong>
              </div>
              <div>
                <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem' }}>Payment Status:</span>
                <strong style={{ color: 'var(--success)' }}>RM {formData.feeAmount} ({formData.paymentReceiptRef})</strong>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
              <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Attached Documents ({formData.documents.length}):</span>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {formData.documents.map((doc) => (
                  <span key={doc.id} className="badge badge-primary" style={{ textTransform: 'none' }}>
                    ✔ {doc.type} ({doc.name})
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex-between">
            <button className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }} onClick={() => setStep(3)} disabled={isSubmitting}>
              <ArrowLeft size={16} /> Previous: Fee Payment
            </button>
            <button 
              className="btn btn-success" 
              onClick={handleFinalSubmit}
              disabled={isSubmitting}
              style={{ padding: '0.85rem 2rem', fontSize: '1rem', fontWeight: 700 }}
            >
              {isSubmitting ? 'Transmitting to Secretariat...' : 'Confirm & Submit Application'} <CheckCircle2 size={18} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}