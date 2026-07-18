import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  ArrowLeft, 
  FileText, 
  User, 
  FolderClock, 
  CreditCard,
  AlertCircle
} from 'lucide-react';

export default function Step5FinalReview({ formData, onPrev, onSubmit, isSubmitting }) {

  return (
    <div className="card">
      <div style={{ textAlign: 'center', marginBottom: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem' }}>
        <ShieldCheck size={56} color="var(--primary)" style={{ margin: '0 auto 0.5rem auto' }} />
        <h2 style={{ margin: '0 0 0.25rem 0' }}>5. Final Application Audit & Confirmation</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', margin: '0 auto' }}>
          Please verify all protocol parameters, attached files, and payment references before transmitting your application to the UTM REC Secretariat for Stage 1 Early Screening.
        </p>
      </div>

      {/* AUDIT SECTION 1: INVESTIGATOR & PROTOCOL METADATA */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', borderBottom: '2px solid var(--primary-light)', paddingBottom: '0.35rem' }}>
          <User size={18} color="var(--primary)" /> Investigator & Protocol Overview
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-app)', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.9rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Research Project Title:</span>
            <strong style={{ color: 'var(--primary)' }}>{formData.projectTitle}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Protocol Classification:</span>
            <strong>{formData.formTitle}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Principal Investigator (PI):</span>
            <strong>{formData.applicantName} ({formData.applicantEmail})</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Faculty / Responsibility Centre:</span>
            <strong>{formData.faculty}</strong>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Institution Category:</span>
            <span className="badge badge-primary">{formData.applicantCategory} Applicant</span>
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Telephone Contact:</span>
            <strong>{formData.phone}</strong>
          </div>
        </div>
      </div>

      {/* AUDIT SECTION 2: REVIEW FEE & PAYMENT BINDING */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', borderBottom: '2px solid var(--primary-light)', paddingBottom: '0.35rem' }}>
          <CreditCard size={18} color="var(--primary)" /> Review Fee & PayHub Audit
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--success-light)', padding: '1rem 1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid #a7f3d0' }}>
          <div>
            <span style={{ fontSize: '0.85rem', color: '#065f46', fontWeight: 700, display: 'block' }}>
              April 2025 Revised Fee Structure Rate
            </span>
            <span style={{ fontSize: '0.8rem', color: '#047857' }}>
              Receipt Reference: <strong>{formData.paymentReceiptRef}</strong> | Status: {formData.paymentStatus}
            </span>
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#065f46' }}>
            RM {formData.feeAmount}.00 Paid
          </span>
        </div>
      </div>

      {/* AUDIT SECTION 3: ATTACHED DOCUMENT REPOSITORY */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', borderBottom: '2px solid var(--primary-light)', paddingBottom: '0.35rem' }}>
          <FileText size={18} color="var(--primary)" /> Attached Documents Package ({formData.documents.length} Files)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: '200px', overflowY: 'auto' }}>
          {formData.documents.map((doc) => (
            <div key={doc.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 0.75rem', background: 'var(--bg-app)', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
              <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0 }} />
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.name}</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{doc.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FINAL DECLARATION & SUBMIT ACTIONS */}
      <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5, textAlign: 'center' }}>
          <strong>Applicant Responsibility Declaration:</strong> By clicking confirm below, I declare that all provided information and attached files are correct. I acknowledge that false information will result in immediate rejection, and that data collection has strictly not commenced prior to ethical clearance.
        </p>
      </div>

      <div className="flex-between">
        <button className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }} onClick={onPrev} disabled={isSubmitting}>
          <ArrowLeft size={16} /> Previous: Fee Processing
        </button>
        <button 
          className="btn btn-success" 
          onClick={onSubmit}
          disabled={isSubmitting}
          style={{ padding: '0.85rem 2.25rem', fontSize: '1rem', fontWeight: 700, boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.2)' }}
        >
          {isSubmitting ? 'Transmitting to Secretariat...' : 'Confirm & Submit Application'} <CheckCircle2 size={18} />
        </button>
      </div>
    </div>
  );
}