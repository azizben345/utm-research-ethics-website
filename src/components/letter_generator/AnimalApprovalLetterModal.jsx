import React, { useState } from 'react';
import { X, Printer, Shield } from 'lucide-react';

export default function AnimalApprovalLetterModal({ submission, onClose }) {
  // State to let the secretariat choose which animal letter variant to generate
  const [letterVariant, setLetterVariant] = useState('A'); // 'A' or 'B'

  // Editable fields for Secretariat adjustments
  const [letterFields, setLetterFields] = useState({
    referenceNo: `UTM.J.09.01/10.14/434 ( )`,
    date: 'Januari 2023',
    approvalNo: submission.approvalNo || `UTMREC-2023-03`,
    approvalDuration: '26 January 2023 - 26 January 2025',
    meetingNo: 'Bil 2/2023',
    meetingDate: '26 January 2023',
    revisionDate: '25 January 2023'
  });

  const handleChange = (field, value) => {
    setLetterFields(prev => ({ ...prev, [field]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div className="modal-content" style={{ background: '#fff', borderRadius: '8px', maxWidth: '850px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        {/* MODAL CONTROLS (Hidden when printing) */}
        <div className="flex-between no-print" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ margin: 0 }}>Animal Research Approval Letter Generator</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Select letter variant and print approval for application {submission.id}.</p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <button className="btn btn-primary" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Printer size={16} /> Print / Save as PDF
            </button>
            <button className="btn" style={{ background: 'transparent', padding: '0.25rem' }} onClick={onClose}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* SECRETARIAT VARIANT SELECTOR (Hidden when printing) */}
        <div className="card no-print" style={{ background: '#f0fdf4', marginBottom: '1.5rem', border: '1px dashed #4ade80' }}>
          <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#166534' }}>⚙️ Animal Letter Template Variant Selection</h4>
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
            <button 
              className={`btn ${letterVariant === 'A' ? 'btn-success' : 'btn-outline'}`}
              onClick={() => setLetterVariant('A')}
              style={{ fontSize: '0.85rem' }}
            >
              Variant A (Mandatory Visitor Invoicing Clause)
            </button>
            <button 
              className={`btn ${letterVariant === 'B' ? 'btn-success' : 'btn-outline'}`}
              onClick={() => setLetterVariant('B')}
              style={{ fontSize: '0.85rem' }}
            >
              Variant B (Standard Discretionary Visit Clause)
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Approval Duration:</label>
              <input type="text" className="form-control" value={letterFields.approvalDuration} onChange={e => handleChange('approvalDuration', e.target.value)} style={{ width: '100%', padding: '0.4ktem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Revision Date:</label>
              <input type="text" className="form-control" value={letterFields.revisionDate} onChange={e => handleChange('revisionDate', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* OFFICIAL PRINTABLE ANIMAL LETTER TEMPLATE LAYOUT          */}
        {/* ========================================================= */}
        <div className="letter-document" style={{ fontFamily: 'Times New Roman, serif', color: '#000', lineHeight: '1.6', fontSize: '11pt', padding: '1rem', background: '#fff' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold' }}>
            <div>UTMREC-{submission.id || '2023-03'}</div>
            <div>No. Ruj. : {letterFields.referenceNo}</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            Tarikh : {letterFields.date}
          </div>

          {/* Recipient Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div><strong>{submission.applicantName || 'Dr. xxx'}</strong></div>
            <div>{submission.department || 'Department of Biosciences'}</div>
            <div>Universiti Teknologi Malaysia</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            Dear Dato'/Datuk/Prof./Dr./Sir/Madam,
          </div>

          {/* Subject Title */}
          <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '1.5rem', textAlign: 'center' }}>
            ETHICAL APPROVAL FOR ANIMAL USAGE IN SCIENTIFIC RESEARCH
          </div>

          <div style={{ marginBottom: '0.25rem' }}>Approval No.: <strong>{letterFields.approvalNo}</strong></div>
          <div style={{ marginBottom: '0.25rem' }}>Title: <strong>{submission.projectTitle || 'xxxx'}</strong></div>
          <div style={{ marginBottom: '0.25rem' }}>Application No: <strong>{submission.id || 'xxxx'}</strong></div>
          <div style={{ marginBottom: '1.5rem' }}>Approval duration: <strong>{letterFields.approvalDuration}</strong></div>

          {/* Body Paragraphs */}
          <div style={{ marginBottom: '1rem' }}>
            The above mentioned matter is referred.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            2. The UTM Research Ethics Committee (UTM REC) received your application for ethical approval for animal usage in scientific research. This committee has approved the application in the Main Panel Meeting of Research Ethics Approval <strong>{letterFields.meetingNo}</strong> dated <strong>{letterFields.meetingDate}</strong>.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            3. This approval is valid to the protocol listed by the attending researcher and compliant person stated in the application submitted by you as revised and updated on <strong>{letterFields.revisionDate}</strong>.
          </div>

          {/* VARIANT A vs VARIANT B CLAUSE 4 */}
          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            4. {letterVariant === 'A' ? (
              <>The committee will visit your laboratory at a given schedule to ensure that only approved protocol is applied to the studied animals. Should there be any breach of protocol defiant from animal welfare acts, this committee has the right to revoke this approval and animal usage in this study will have to stop. The Principle Investigator is responsible for the cost of the visitation. All expenses for the visitation will be borne by the principal investigator as per invoice by UTM REC thereafter.</>
            ) : (
              <>The committee may visit your laboratory at a given schedule to ensure that only approved protocol is applied to the studied animals. Should there be any breach of protocol defiant from animal welfare acts, this committee has the right to revoke this approval and animal usage in this study will have to stop. The Principle Investigator is responsible for the cost of the visitation.</>
            )}
          </div>

          <div style={{ marginBottom: '2rem', textAlign: 'justify' }}>
            5. Please be informed that under no circumstances shall this committee be held responsible for any legal action that may be taken against you by the authority for any defiance of any rules, acts, or laws on the usage of animals in this study. In furtherance, you shall keep this committee and the University fully indemnified against all actions, claims, proceedings, costs and damages instituted by any party arising from this approval.
          </div>

          {/* Sign-off */}
          <div style={{ fontStyle: 'italic', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            “Berkhidmat untuk Negara kerana Allah”
          </div>
          <div style={{ marginBottom: '2rem' }}>
            I, who uphold trust,
            <br/><br/><br/>
            <strong>(PROF. TS. DR. DAYANG NORHAYATI BTE ABANG JAWAWI)</strong><br/>
            Chairperson, UTM Research Ethics Committee<br/>
            Office of Deputy Vice-Chancellor (Research & Innovation)<br/>
            Universiti Teknologi Malaysia<br/>
            Telephone: 🕾 07-5538678 &nbsp;|&nbsp; Email: 🖂 dayang@utm.my
          </div>

          <hr style={{ border: '1px solid #000', margin: '2rem 0' }} />

          {/* ATTACHMENT FOOTER BLOCK */}
          <div style={{ fontSize: '10pt' }}>
            <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
              UTM RESEARCH ETHICS COMMITTEE FOR ANIMAL RESEARCH
            </div>
            
            <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ width: '25%', padding: '0.2rem 0' }}>Application No.</td>
                  <td style={{ width: '2%', padding: '0.2rem 0' }}>:</td>
                  <td style={{ padding: '0.2rem 0' }}>{submission.id || 'A-12-22-16'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.2rem 0' }}>Title</td>
                  <td>:</td>
                  <td>{submission.projectTitle || 'xxxx'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.2rem 0' }}>Approval No.</td>
                  <td>:</td>
                  <td>{letterFields.approvalNo}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.2rem 0' }}>Principle Investigator</td>
                  <td>:</td>
                  <td>{submission.applicantName || 'xxxx'}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginBottom: '0.5rem' }}>
              <strong>The investigators involved in this study are:</strong>
              <div style={{ paddingLeft: '1rem' }}>
                {submission.applicantName || 'Dr. Mohd Aizuddin bin Mohd Lazaldin'} <br/>
                Department of Biosciences, Faculty of Science, UTM Johor Bahru
              </div>
            </div>

            <div>
              <strong>Documents received and reviewed with reference to the above study:</strong>
              <ul style={{ margin: '0.2rem 0', paddingLeft: '1.5rem' }}>
                {(submission.documents || []).map((doc, idx) => (
                  <li key={idx}>{doc.type}: {doc.name}</li>
                ))}
                {(!submission.documents || submission.documents.length === 0) && (
                  <>
                    <li>UTM REC Application Form for Animal Usage Version 3</li>
                    <li>Certificate & CV of Competent Person</li>
                    <li>Proof of Payment</li>
                  </>
                )}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}