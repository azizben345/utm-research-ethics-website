import React from 'react';
import { 
  QrCode, 
  CreditCard, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Upload, 
  FileText,
  ShieldCheck
} from 'lucide-react';

export default function Step4ReviewFee({ formData, setFormData, onPrev, onNext }) {

  // Auto-generate a simulated DuitNow PayHub receipt reference
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

    // Filter out old receipt if user clicks simulation twice
    const otherDocs = formData.documents.filter(d => d.type !== 'Official Payment Receipt');

    setFormData({
      ...formData,
      paymentReceiptRef: randomRef,
      paymentStatus: 'Paid (Pending Verification)',
      documents: [...otherDocs, fakeReceiptDoc]
    });
  };

  return (
    <div className="card">
      <div className="flex-between" style={{ marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.25rem 0' }}>4. Institutional Review Fee Processing</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Effective 1 April 2025 Revised Fee Structure | Non-refundable processing fee
          </span>
        </div>
        <span className="badge badge-primary" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
          Total Due: RM {formData.feeAmount}.00
        </span>
      </div>

      {/* FEE BREAKDOWN MATRIX CARD */}
      <div style={{ background: 'var(--primary-light)', border: '1px solid #bfdbfe', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.5px' }}>
            Fee Calculation Breakdown
          </span>
          <h3 style={{ margin: '0.25rem 0', color: 'var(--text-main)', fontSize: '1.2rem' }}>
            {formData.formTitle} ({formData.applicantCategory})
          </h3>
          <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Applicant: Dr. Sarah Razak | Faculty: {formData.faculty}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', display: 'block' }}>
            RM {formData.feeAmount}.00
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--success)', fontWeight: 600 }}>
            ✔ Institutional Rate Applied
          </span>
        </div>
      </div>

      {/* DUITNOW QR & RECEIPT ATTACHMENT GATEWAY */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', background: 'var(--bg-app)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', marginBottom: '2rem' }}>
        
        {/* Left Column: QR Display */}
        <div style={{ textAlign: 'center', padding: '1.5rem', background: '#fff', borderRadius: 'var(--radius-sm)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ border: '3px solid #000', display: 'inline-block', padding: '1rem', borderRadius: '12px', marginBottom: '0.75rem', background: '#fff' }}>
            <QrCode size={150} color="#000" />
          </div>
          <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--text-main)' }}>UTM PayHub DuitNow QR</strong>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginTop: '0.25rem' }}>
            Scan via standard Malaysian banking or e-Wallet apps
          </span>
          <div style={{ marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px dashed var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Inquiries: ethics@utm.my | research.utm.my/office/ethics
          </div>
        </div>

        {/* Right Column: Receipt Upload & Reference Simulation */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CreditCard size={18} color="var(--primary)" /> Payment Verification
          </h4>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1.25rem 0', lineHeight: 1.4 }}>
            Please scan the QR code and upload the official payment receipt as a reference for Secretariat audit.
          </p>

          <div style={{ background: '#fff', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.5rem' }}>
              Simulate Bank Receipt & Reference Number:
            </label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                readOnly
                placeholder="Click Auto-Generate to simulate payment..."
                value={formData.paymentReceiptRef}
                style={{ flex: 1, padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem', backgroundColor: '#f9fafb', color: 'var(--primary)', fontWeight: 600 }}
              />
              <button 
                type="button" 
                className="btn btn-success"
                style={{ padding: '0.6rem 1rem', fontSize: '0.8rem', fontWeight: 700, whiteSpace: 'nowrap' }}
                onClick={handleSimulatePayment}
              >
                ⚡ Auto-Pay Simulation
              </button>
            </div>
          </div>

          {/* Payment Status Feedback Banner */}
          {formData.paymentReceiptRef ? (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--success-light)', borderLeft: '4px solid var(--success)', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={18} color="#065f46" />
              <div style={{ fontSize: '0.85rem', color: '#065f46' }}>
                <strong>Receipt Verified:</strong> File attached to package. Status set to <em>{formData.paymentStatus}</em>.
              </div>
            </div>
          ) : (
            <div style={{ padding: '0.75rem 1rem', backgroundColor: '#fef3c7', borderLeft: '4px solid #f59e0b', borderRadius: '4px', fontSize: '0.8rem', color: '#92400e' }}>
              ⚠️ Action Required: Please click "Auto-Pay Simulation" to attach your mock receipt before proceeding.
            </div>
          )}
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="flex-between" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
        <button className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }} onClick={onPrev}>
          <ArrowLeft size={16} /> Previous: Supporting Documents
        </button>
        <button 
          className="btn btn-primary" 
          disabled={!formData.paymentReceiptRef}
          onClick={onNext} 
          style={{ padding: '0.75rem 1.5rem', opacity: !formData.paymentReceiptRef ? 0.5 : 1 }}
        >
          Next: Final Review & Submit <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}