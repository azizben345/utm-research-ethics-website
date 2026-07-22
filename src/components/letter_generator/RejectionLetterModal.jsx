import React, { useState } from 'react';
import { X, Printer, AlertTriangle } from 'lucide-react';

export default function RejectionLetterModal({ submission, onClose }) {
  // Editable state for Secretariat adjustments before printing
  const [letterFields, setLetterFields] = useState({
    referenceNo: `UTM.J.09.01/10.14/434/Jld 4 ( 93 )`,
    date: '09 December 2025',
    meetingNo: 'Bil 12/2025',
    meetingDate: '1 December 2025',
    rejectionReason1: 'Insufficient risk mitigation strategy outlined for human participant interactions.',
    rejectionReason2: 'Data collection appears to have commenced prior to obtaining formal ethical clearance.'
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
            <h3 style={{ margin: 0, color: 'var(--danger)' }}>Rejection Letter Generator</h3>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>Review and print the official rejection notice for application {submission.id}.</p>
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
        <div className="card no-print" style={{ background: '#fef2f2', marginBottom: '1.5rem', border: '1px dashed #f87171' }}>
          <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#991b1b' }}>⚙️ Rejection Grounds Adjustments (Secretariat Only)</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Panel Meeting No:</label>
              <input type="text" className="form-control" value={letterFields.meetingNo} onChange={e => handleChange('meetingNo', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Meeting Date:</label>
              <input type="text" className="form-control" value={letterFields.meetingDate} onChange={e => handleChange('meetingDate', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Identified Issue I:</label>
            <input type="text" className="form-control" value={letterFields.rejectionReason1} onChange={e => handleChange('rejectionReason1', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Identified Issue II:</label>
            <input type="text" className="form-control" value={letterFields.rejectionReason2} onChange={e => handleChange('rejectionReason2', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
          </div>
        </div>

        {/* ========================================================= */}
        {/* OFFICIAL PRINTABLE REJECTION LETTER TEMPLATE LAYOUT       */}
        {/* ========================================================= */}
        <div className="letter-document" style={{ fontFamily: 'Times New Roman, serif', color: '#000', lineHeight: '1.6', fontSize: '11pt', padding: '1rem', background: '#fff' }}>
          
          {/* Header Row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontWeight: 'bold' }}>
            <div>UTMREC-{submission.id || '2025-001'}</div>
            <div>Reference No. : {letterFields.referenceNo}</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            Date : {letterFields.date}
          </div>

          {/* Recipient Info */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div><strong>{submission.applicantName || 'Principal Investigator'}</strong></div>
            <div>{submission.department || 'Faculty of Computing'}</div>
            <div>Universiti Teknologi Malaysia</div>
            <div>UTM Kuala Lumpur</div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            Dear Dato'/Datuk/Prof./Dr./Sir/Madam,
          </div>

          {/* Subject Title */}
          <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '1.5rem', textAlign: 'center' }}>
            REJECTION OF ETHICS APPROVAL APPLICATION
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            Title : <strong>{submission.projectTitle || 'Research Protocol Title'}</strong>
          </div>

          {/* Body Paragraphs */}
          <div style={{ marginBottom: '1rem' }}>
            With regard to the above mentioned matter.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            2. Based on the Main Panel Meeting of Research Ethics Approval <strong>{letterFields.meetingNo}</strong> dated <strong>{letterFields.meetingDate}</strong>, we regret to inform you that your application is not recommended by our panel.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            3. Based on the documents submitted, several issues have been identified as follows:
            <div style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
              I. {letterFields.rejectionReason1}<br/>
              II. {letterFields.rejectionReason2}
            </div>
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            4. As per the guidelines established by the UTM Research Ethics Committee (UTM REC), ethical approval must be obtained before the commencement of any data collection involving human participants. Proceeding with data collection prior to formal approval is considered a breach of standard research ethics protocols.
          </div>

          <div style={{ marginBottom: '1rem', textAlign: 'justify' }}>
            5. We understand that you have already completed your research and, therefore, we cannot provide the necessary level of oversight to ensure that ethical standards have been met.
          </div>

          <div style={{ marginBottom: '2rem', textAlign: 'justify' }}>
            6. We recognize the importance of your research and appreciate your understanding in this matter.
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
            🕾 07-5538678 &nbsp;|&nbsp; 🖂 dayang@utm.my
          </div>

        </div>

      </div>
    </div>
  );
}