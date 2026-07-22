import React, { useState } from 'react';
import { X, Printer, FileText, CheckCircle2 } from 'lucide-react';

export default function ExemptionApprovalLetterModal({ submission, onClose }) {
  // Editable state for fields specific to the exemption letter template
  const [letterFields, setLetterFields] = useState({
    referenceNo: `UTM.J.09.01/10.14/434/Jld 6 (${submission.id || '296'})`,
    date: 'July 2026',
    meetingNo: '7/2026',
    meetingDate: '3 July 2026',
    exemptionCategory: 'Research involves secondary data analysis of fully anonymized educational records posing minimal risk to participants.',
    approvalNo: submission.approvalNo || `UTMREC/${submission.id || 'E5'}`
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
        
        {/* MODAL CONTROL HEADER (Hidden when printing) */}
        <div className="flex-between no-print" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h3 style={{ margin: 0 }}>Exemption Approval Letter Generator</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Review and print the official exemption certificate for application {submission.id}.</p>
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

        {/* SECRETARIAT CONFIGURATION CONTROLS (Hidden when printing) */}
        <div className="card no-print" style={{ background: '#f8fafc', marginBottom: '1.5rem', border: '1px dashed var(--border-color)' }}>
          <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: 'var(--primary)' }}>⚙️ Letter Variable Adjustments (Secretariat Only)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Meeting Number:</label>
              <input type="text" className="form-control" value={letterFields.meetingNo} onChange={e => handleChange('meetingNo', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Meeting Date:</label>
              <input type="text" className="form-control" value={letterFields.meetingDate} onChange={e => handleChange('meetingDate', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Exemption Reason / Category Description:</label>
            <textarea className="form-control" rows={2} value={letterFields.exemptionCategory} onChange={e => handleChange('exemptionCategory', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
          </div>
        </div>

        {/* ========================================================= */}
        {/* OFFICIAL PRINTABLE LETTER TEMPLATE LAYOUT                 */}
        {/* ========================================================= */}
        <div className="letter-document" style={{ fontFamily: 'Times New Roman, serif', color: '#000', lineHeight: '1.6', fontSize: '11pt', padding: '1rem', background: '#fff' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold' }}>
            <div>UTMREC-{submission.id || '2026-E5'}</div>
            <div>Reference No. : {letterFields.referenceNo}</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <div>Date : {letterFields.date}</div>
          </div>

          {/* Recipient Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div><strong>{submission.applicantName || 'Assoc. Prof. xxxx'}</strong></div>
            <div>{submission.department || 'Azman Hashim International Business School'}</div>
            <div>Universiti Teknologi Malaysia</div>
            <div>UTM Kuala Lumpur</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            Dear Dato'/Datuk/Prof./Dr./Sir/Madam,
          </div>

          {/* Subject Title */}
          <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '1.5rem', textAlign: 'center' }}>
            APPROVAL OF EXEMPTION FROM ETHICAL REVIEW FOR NON-CLINICAL RESEARCH
          </div>

          <div style={{ marginBottom: '1rem' }}>
            Approval No. : <strong>{letterFields.approvalNo}</strong>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            Title : <strong>{submission.projectTitle || 'xxxxxx'}</strong>
          </div>

          {/* Body Paragraphs */}
          <div style={{ marginBottom: '1rem' }}>
            With regard to the above mentioned matter.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            2. The Universiti Teknologi Malaysia Research Ethics Committee (UTM REC) has approved for the exemption from ethical review for this study in the Main Panel Meeting of Research Ethics Approval No. <strong>{letterFields.meetingNo}</strong> dated <strong>{letterFields.meetingDate}</strong>.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            3. Your study was determined under minimal risk and to be exempted under the following categories:
            <div style={{ paddingLeft: '2rem', marginTop: '0.5rem' }}>
              i. {letterFields.exemptionCategory}
            </div>
          </div>

          <div style={{ marginBottom: '2rem', textAlign: 'justify' }}>
            4. Please be informed that under no circumstances shall this committee be held responsible for any legal action that may be taken against you by the authority for any defiance of any rules, acts, or laws in this study. In furtherance, you shall keep this committee and the University fully indemnified against all actions, claims, proceedings, costs and damages instituted by any party arising from this approval.
          </div>

          {/* Sign-off */}
          <div style={{ marginBottom: '2rem' }}>
            Thank you.
          </div>

          <div style={{ fontStyle: 'italic', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            “MALAYSIA MADANI”
          </div>
          <div style={{ fontStyle: 'italic', fontWeight: 'bold', marginBottom: '2rem' }}>
            “BERKHIDMAT UNTUK NEGARA”
          </div>

          <div style={{ marginBottom: '2rem' }}>
            I, who uphold trust,
            <br/><br/><br/>
            <strong>(PROF. TS. DR. DAYANG NORHAYATI BTE ABANG JAWAWI)</strong><br/>
            Chairperson<br/>
            UTM Research Ethics Committee<br/>
            Department of Deputy Vice-Chancellor (Research & Innovation)<br/>
            Universiti Teknologi Malaysia<br/>
            Email: dayang@utm.my
          </div>

          <hr style={{ border: '1px solid #000', margin: '2rem 0' }} />

          {/* ATTACHMENT FOOTER BLOCK */}
          <div style={{ fontSize: '10pt' }}>
            <div style={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
              EXEMPTION FROM ETHICAL REVIEW FOR NON-CLINICAL RESEARCH
            </div>
            
            <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ width: '25%', padding: '0.2rem 0' }}>Application No.</td>
                  <td style={{ width: '2%', padding: '0.2rem 0' }}>:</td>
                  <td style={{ padding: '0.2rem 0' }}>{submission.id || 'xxxxxx'}</td>
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
                  <td style={{ padding: '0.2rem 0' }}>Principal Investigator</td>
                  <td>:</td>
                  <td>{submission.applicantName || 'xxxxxxx'}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginBottom: '0.5rem' }}>
              <strong>The investigators involved in this study are:</strong>
              <div style={{ paddingLeft: '1rem' }}>
                {submission.applicantName || 'Assoc. xxxxxxt'} <br/>
                {submission.department || 'Azman Hashim International Business School'} <br/>
                UTM Kuala Lumpur
              </div>
            </div>

            <div>
              <strong>Documents received and reviewed with reference to the above study:</strong>
              <ul style={{ margin: '0.2rem 0', paddingLeft: '1.5rem' }}>
                {(submission.documents || []).map((doc, idx) => (
                  <li key={idx}>{doc.type}: {doc.name}</li>
                ))}
                {(!submission.documents || submission.documents.length === 0) && (
                  <li>Exemption Application Form & Supporting Documents</li>
                )}
              </ul>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}