import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowLeft, FileText, User, CreditCard } from 'lucide-react';

export default function Step5FinalReview({ applicationData, paymentReceiptRef, newReceiptDoc, onPrev, onSubmit, isSubmitting }) {

  // Combine previously uploaded docs with the newly generated receipt doc
  const combinedDocs = [...(applicationData.documents || []), newReceiptDoc].filter(Boolean);

  return (
    <div style={{ padding: '0.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <ShieldCheck size={48} color="var(--primary)" style={{ margin: '0 auto 0.5rem auto' }} />
        <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>5. Final Application Confirmation</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', maxWidth: '500px', margin: '0 auto' }}>
          Please verify the payment reference before transmitting your application to the Secretariat for Stage 1 Screening.
        </p>
      </div>

      {/* SECTION 1: PROTOCOL METADATA */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <User size={16} color="var(--primary)" /> Protocol Overview
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', background: 'var(--bg-app)', padding: '1rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}>
          <div><span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Project Title:</span><strong>{applicationData.projectTitle}</strong></div>
          <div><span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Classification:</span><strong>{applicationData.formApplied}</strong></div>
          <div><span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Investigator:</span><strong>{applicationData.applicantName}</strong></div>
          <div><span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.75rem' }}>Faculty:</span><strong>{applicationData.faculty}</strong></div>
        </div>
      </div>

      {/* SECTION 2: REVIEW FEE */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <CreditCard size={16} color="var(--primary)" /> PayHub Verification
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--success-light)', padding: '1rem', borderRadius: '4px', border: '1px solid #a7f3d0' }}>
          <div>
            <span style={{ fontSize: '0.8rem', color: '#065f46', fontWeight: 700, display: 'block' }}>Payment Reference Added</span>
            <span style={{ fontSize: '0.75rem', color: '#047857' }}>Ref: <strong>{paymentReceiptRef}</strong></span>
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#065f46' }}>
            RM {applicationData.feeAmount || 100}.00
          </span>
        </div>
      </div>

      {/* SECTION 3: ATTACHED DOCUMENTS */}
      <div style={{ marginBottom: '1.5rem' }}>
        <h3 style={{ fontSize: '0.95rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <FileText size={16} color="var(--primary)" /> Document Package ({combinedDocs.length} Files)
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', maxHeight: '150px', overflowY: 'auto' }}>
          {combinedDocs.map((doc, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'var(--bg-app)', borderRadius: '3px', border: '1px solid var(--border-color)', fontSize: '0.8rem' }}>
              <CheckCircle2 size={14} color="var(--success)" style={{ flexShrink: 0 }} />
              <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                <strong style={{ display: 'block', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.name}</strong>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{doc.type}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
        <button className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }} onClick={onPrev} disabled={isSubmitting}>
          <ArrowLeft size={16} /> Back to Fee
        </button>
        <button 
          className="btn btn-success" 
          onClick={onSubmit}
          disabled={isSubmitting}
          style={{ padding: '0.75rem 1.5rem', fontWeight: 700 }}
        >
          {isSubmitting ? 'Transmitting...' : 'Confirm & Submit to Secretariat'} <CheckCircle2 size={16} />
        </button>
      </div>
    </div>
  );
}