import React, { useState } from 'react';
import { X, Printer, FileText } from 'lucide-react';

export default function ClinicalApprovalLetterModal({ submission, onClose }) {
  // Determine if it's clinical or non-clinical for the footer header text
  const isClinical = submission.formApplied?.toLowerCase().includes('clinical') && !submission.formApplied?.toLowerCase().includes('non');

  // Editable fields for Secretariat adjustments before printing
  const [letterFields, setLetterFields] = useState({
    referenceNo: `UTM.J.09.01/10.14/434/Jld 6 (${submission.id || '296'})`,
    date: 'July 2026',
    approvalNo: submission.approvalNo || `UTMREC/${submission.id || 'XX'}`,
    effectiveDate: '3 July 2026',
    expiryDate: '3 July 2028',
    meetingNo: '6/2026',
    meetingDate: '5 Jun 2026',
    subjectCount: submission.subjectCount || '175',
    studySite: submission.studySite || 'Universiti Teknologi Malaysia'
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
            <h3 style={{ margin: 0 }}>{isClinical ? 'Clinical' : 'Non-Clinical'} Approval Letter Generator</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Review and print the official ethical approval certificate for application {submission.id}.</p>
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Effective Date:</label>
              <input type="text" className="form-control" value={letterFields.effectiveDate} onChange={e => handleChange('effectiveDate', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Expiry Date:</label>
              <input type="text" className="form-control" value={letterFields.expiryDate} onChange={e => handleChange('expiryDate', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Main Meeting No:</label>
              <input type="text" className="form-control" value={letterFields.meetingNo} onChange={e => handleChange('meetingNo', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* OFFICIAL PRINTABLE LETTER TEMPLATE LAYOUT                 */}
        {/* ========================================================= */}
        <div className="letter-document" style={{ fontFamily: 'Times New Roman, serif', color: '#000', lineHeight: '1.6', fontSize: '11pt', padding: '1rem', background: '#fff' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold' }}>
            <div>UTMREC-{submission.id || '2026-296'}</div>
            <div>Reference No. : {letterFields.referenceNo}</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            Date : {letterFields.date}
          </div>

          {/* Recipient Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div><strong>{submission.applicantName || 'Prof. XXXX'}</strong></div>
            <div>{submission.department || 'Azman Hashim International Business School'}</div>
            <div>Universiti Teknologi Malaysia</div>
            <div>UTM Kuala Lumpur</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            Dear Dato'/Datuk/Prof./Dr./Sir/Madam,
          </div>

          {/* Subject Title */}
          <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '1.5rem', textAlign: 'center' }}>
            LETTER OF ETHICAL APPROVAL
          </div>

          <div style={{ marginBottom: '0.5rem' }}>
            Approval No. : <strong>{letterFields.approvalNo}</strong>
          </div>
          <div style={{ marginBottom: '1.5rem' }}>
            Title : <strong>{submission.projectTitle || 'XXXXXy'}</strong>
          </div>

          {/* Body Paragraphs */}
          <div style={{ marginBottom: '1rem' }}>
            With regard to the above mentioned matter.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            2. Following the submission of the revised documents and responses to the panel’s comments, the Committee has reviewed the amendments and is satisfied that all requirements have been duly fulfilled as of <strong>{letterFields.effectiveDate}</strong>. Accordingly, the Universiti Teknologi Malaysia Research Ethics Committee (UTM REC) hereby grants ethical approval for this study, effective <strong>{letterFields.effectiveDate}</strong>.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            3. This study was presented and considered by the Main Panel Meeting of Research Ethics Approval No. <strong>{letterFields.meetingNo}</strong>, held on <strong>{letterFields.meetingDate}</strong>.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            4. Please find the list of documents received and reviewed with reference to the study (as attached). Please note that all records and data are to be kept strictly CONFIDENTIAL and can only be used for the purpose of this study. All precautions are taken to maintain data confidentiality.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            5. Please note that the approval is valid until <strong>{letterFields.expiryDate}</strong>. The following are to be reported upon receiving ethical approval. Required forms can be obtained from the UTM REC website:
            <div style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              i. The Continuing Review Form must be submitted to UTM REC every six (6) months, commencing from the approval date.<br/>
              ii. The Final Study Report shall be submitted to the UTM Research Ethics Committee (UTM REC) upon completion of the study.<br/>
              iii. Ethical approval is required for any amendments or changes to the study documents, study sites, or study team. UTM REC reserves the right to withdraw ethical approval if such changes are not fully declared.<br/>
              iv. An application for extension of research ethics approval must be submitted at least sixty (60) days prior to the expiry of the current approval.<br/>
              v. Researchers shall ensure that the collection, storage, use, sharing and transfer of research data, including cross-border data transfers comply with all applicable laws, regulations, institutional policies, and relevant authority requirements.
            </div>
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            6. Please take note that the approval number of this study must be stated in all future correspondence related to this study to facilitate the administrative processes.
          </div>

          <div style={{ marginBottom: '2rem', textAlign: 'justify' }}>
            7. Please be informed that under no circumstances shall this committee be held responsible for any legal action that may be taken against you by the authority for any defiance of any rules, acts, or laws in this study. In furtherance, you shall keep this committee and the University fully indemnified against all actions, claims, proceedings, costs and damages instituted by any party arising from this approval.
          </div>

          {/* Sign-off */}
          <div style={{ marginBottom: '2rem' }}>
            Thank you.
          </div>

          <div style={{ fontStyle: 'italic', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            “MALAYSIA MADANI”
          </div>
          <div style={{ fontStyle: 'italic', fontWeight: 'bold', marginBottom: '2rem' }}>
            “BERKHIDMAT UNTUK NEGARA KERANA ALLAH”
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
              UTM RESEARCH ETHICS COMMITTEE FOR {isClinical ? 'CLINICAL' : 'NON CLINICAL'} RESEARCH
            </div>
            
            <table style={{ width: '100%', marginBottom: '1rem', borderCollapse: 'collapse' }}>
              <tbody>
                <tr>
                  <td style={{ width: '25%', padding: '0.2rem 0' }}>Application No.</td>
                  <td style={{ width: '2%', padding: '0.2rem 0' }}>:</td>
                  <td style={{ padding: '0.2rem 0' }}>{submission.id || 'XXXXX'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.2rem 0' }}>Title</td>
                  <td>:</td>
                  <td>{submission.projectTitle || 'XXXX'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.2rem 0' }}>Approval No.</td>
                  <td>:</td>
                  <td>{letterFields.approvalNo}</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.2rem 0' }}>Principal Investigator</td>
                  <td>:</td>
                  <td>{submission.applicantName || 'XXXX'}</td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginBottom: '0.5rem' }}>
              <strong>The investigators involved in this study are:</strong>
              <div style={{ paddingLeft: '1rem' }}>
                {submission.applicantName || 'XXXXXX'} <br/>
                {submission.department || 'Azman Hashim International Business School'} <br/>
                UTM Kuala Lumpur
              </div>
            </div>

            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Documents received and reviewed with reference to the above study:</strong>
              <ul style={{ margin: '0.2rem 0', paddingLeft: '1.5rem' }}>
                {(submission.documents || []).map((doc, idx) => (
                  <li key={idx}>{doc.type}: {doc.name}</li>
                ))}
                {(!submission.documents || submission.documents.length === 0) && (
                  <li>Approved Protocol & Study Documents</li>
                )}
              </ul>
            </div>

            <div>
              <strong>Study site:</strong>
              <div style={{ paddingLeft: '1rem' }}>
                i. {letterFields.studySite}
              </div>
              <div style={{ marginTop: '0.5rem' }}>
                There will be {letterFields.subjectCount} subjects/patients/respondents involved in this study.
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}