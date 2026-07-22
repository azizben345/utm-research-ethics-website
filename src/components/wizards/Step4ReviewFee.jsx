import React, { useState } from 'react';
import { QrCode, CreditCard, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Step4ReviewFee({ applicationData, onCancel, onProceedToReview }) {
  // Local state to track the receipt attachment during this payment session
  const [receiptRef, setReceiptRef] = useState('');
  const [receiptDoc, setReceiptDoc] = useState(null);

  const handleSimulatePayment = () => {
    const randomRef = `UTM-PAYHUB-${Math.floor(100000 + Math.random() * 900000)}`;
    const fakeReceiptDoc = {
      id: `doc-receipt-${Date.now()}`,
      name: `Official_Payment_Receipt_${randomRef}.pdf`,
      type: 'Official Payment Receipt',
      uploadDate: new Date().toISOString().split('T')[0],
      size: '420 KB',
      status: 'Verified Paid'
    };

    setReceiptRef(randomRef);
    setReceiptDoc(fakeReceiptDoc);
  };

  return (
    <div style={{ padding: '0.5rem' }}>
      <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem' }}>4. Institutional Review Fee Processing</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Effective 1 April 2025 Revised Fee Structure | Non-refundable processing fee
          </span>
        </div>
        <span className="badge badge-primary" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
          Total Due: RM {applicationData.feeAmount || 100}.00
        </span>
      </div>

      {/* FEE BREAKDOWN MATRIX CARD */}
      <div style={{ background: 'var(--primary-light)', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>
            Fee Calculation Breakdown
          </span>
          <h3 style={{ margin: '0.25rem 0', color: 'var(--text-main)', fontSize: '1.1rem' }}>
            {applicationData.formApplied} ({applicationData.applicantCategory || 'INTERNAL'})
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Applicant: {applicationData.applicantName} | Faculty: {applicationData.faculty}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>
            RM {applicationData.feeAmount || 100}.00
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
            ✔ Institutional Rate Applied
          </span>
        </div>
      </div>

      {/* DUITNOW QR & RECEIPT ATTACHMENT GATEWAY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', background: 'var(--bg-app)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        
        <div style={{ textAlign: 'center', padding: '1rem', background: '#fff', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ border: '3px solid #000', display: 'inline-block', padding: '0.75rem', borderRadius: '8px', marginBottom: '0.5rem', background: '#fff' }}>
            <QrCode size={100} color="#000" />
          </div>
          <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-main)' }}>UTM PayHub DuitNow QR</strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scan via banking or e-Wallet apps</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={16} color="var(--primary)" /> Payment Verification
          </h4>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
            Scan the QR code and attach the receipt as a reference for Secretariat audit.
          </p>

          <div style={{ background: '#fff', padding: '1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Simulate Bank Receipt Reference:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                readOnly
                placeholder="Click Auto-Generate..."
                value={receiptRef}
                style={{ flex: 1, padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.8rem', backgroundColor: '#f9fafb', color: 'var(--primary)', fontWeight: 600 }}
              />
              <button 
                type="button" 
                className="btn btn-success"
                style={{ padding: '0.5rem', fontSize: '0.75rem', fontWeight: 700 }}
                onClick={handleSimulatePayment}
              >
                ⚡ Auto-Pay
              </button>
            </div>
          </div>

          {receiptRef ? (
            <div style={{ padding: '0.6rem 0.75rem', backgroundColor: 'var(--success-light)', borderLeft: '3px solid var(--success)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#065f46' }}>
              <CheckCircle2 size={16} color="#065f46" /> <strong>Receipt Attached</strong>
            </div>
          ) : (
            <div style={{ padding: '0.6rem 0.75rem', backgroundColor: '#fef3c7', borderLeft: '3px solid #f59e0b', borderRadius: '4px', fontSize: '0.75rem', color: '#92400e' }}>
              ⚠️ Click "Auto-Pay" to attach mock receipt.
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
        <button className="btn" style={{ background: 'transparent', border: '1px solid var(--border-color)' }} onClick={onCancel}>
          Cancel
        </button>
        <button 
          className="btn btn-primary" 
          disabled={!receiptRef}
          onClick={() => onProceedToReview(receiptRef, receiptDoc)} 
          style={{ padding: '0.6rem 1.25rem', opacity: !receiptRef ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          Next: Final Review <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}