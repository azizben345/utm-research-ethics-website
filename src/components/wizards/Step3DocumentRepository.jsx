import React from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  Info, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function Step3DocumentRepository({ formData, setFormData, onPrev, onNext }) {

  // Helper to simulate attaching a document to state
  const handleSimulatedUpload = (docTypeLabel, fileNamePrefix) => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const fakeFileName = `${fileNamePrefix}_${formData.projectTitle.replace(/\s+/g, '_').slice(0, 12)}_${randomNum}.pdf`;
    
    const newDoc = {
      id: `doc-${Date.now()}-${randomNum}`,
      name: fakeFileName,
      type: docTypeLabel,
      uploadDate: new Date().toISOString().split('T')[0],
      size: '2.4 MB',
      status: 'Pending Screening' // Default status for Secretariat Stage 1
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

  // Check if mandatory templates have been uploaded
  const hasChecklist = formData.documents.some((d) => d.type.includes('Checklist'));
  const hasCV = formData.documents.some((d) => d.type.includes('Curriculum Vitae'));

  return (
    <div className="card">
      <div className="flex-between" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.25rem 0' }}>3. Supporting Document Repository</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Protocol: <strong>{formData.formTitle}</strong> | All files must be max 10 MB per file.
          </span>
        </div>
        <span className="badge badge-primary">Files Attached: {formData.documents.length}</span>
      </div>

      {/* ZONE A: OFFICIAL INSTITUTIONAL TEMPLATES (DOWNLOAD & UPLOAD) */}
      <div style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Download size={18} /> Zone A: Official Institutional Templates
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Download the required UTM REC templates below, complete them offline, and re-upload the signed PDF versions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          
          {/* Template 1: Checklist Form 1.4 */}
          <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span className="badge badge-warning" style={{ textTransform: 'none' }}>Mandatory Check</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Max 1 MB</span>
              </div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>Checklist Form (1.4)</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>Checked by Secretariat during early screening.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" className="btn" style={{ flex: 1, background: '#fff', border: '1px solid var(--border-color)', fontSize: '0.75rem', justifyContent: 'center' }}>
                <Download size={14} /> Template
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ flex: 1, fontSize: '0.75rem', justifyContent: 'center' }}
                onClick={() => handleSimulatedUpload('Checklist Form (1.4)', 'UTM_Checklist')}
              >
                <Upload size={14} /> Upload
              </button>
            </div>
          </div>

          {/* Template 2: Consent Form */}
          <div style={{ padding: '1rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', background: 'var(--bg-app)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                <span className="badge badge-primary" style={{ textTransform: 'none' }}>English & Malay</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Max 10 MB</span>
              </div>
              <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.9rem' }}>Respondent Information & Consent</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>Standard institutional consent templates.</p>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button type="button" className="btn" style={{ flex: 1, background: '#fff', border: '1px solid var(--border-color)', fontSize: '0.75rem', justifyContent: 'center' }}>
                <Download size={14} /> Template
              </button>
              <button 
                type="button" 
                className="btn btn-primary" 
                style={{ flex: 1, fontSize: '0.75rem', justifyContent: 'center' }}
                onClick={() => handleSimulatedUpload('Respondent Consent Form', 'Informed_Consent')}
              >
                <Upload size={14} /> Upload
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* ZONE B: PROJECT-SPECIFIC ATTACHMENTS */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Upload size={18} /> Zone B: Project-Specific Supporting Files
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Click below to simulate attaching required independent research documentation to your application package.
        </p>

        {/* Validation Rule Info Box */}
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#eff6ff', borderRadius: 'var(--radius-sm)', border: '1px solid #bfdbfe', display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.8rem', color: '#1e3a8a', marginBottom: '1.25rem' }}>
          <Info size={16} style={{ flexShrink: 0 }} />
          <span>
            <strong>Instrument Validation Rule:</strong> Instruments used to collect data must be validated by at least <strong>2 expert reviewers</strong> (or attach a written justification if deemed unnecessary).
          </span>
        </div>

        {/* Simulation Action Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem', padding: '1.25rem', border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', background: 'var(--bg-app)' }}>
          
          <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)', fontSize: '0.8rem', justifyContent: 'flex-start' }} onClick={() => handleSimulatedUpload('Curriculum Vitae (CV)', 'PI_Resume')}>
            + Attach CV (Up to 10 files)
          </button>
          
          <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)', fontSize: '0.8rem', justifyContent: 'flex-start' }} onClick={() => handleSimulatedUpload('Research Procedure Gantt Chart', 'Gantt_Chart')}>
            + Attach Gantt Chart
          </button>
          
          <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)', fontSize: '0.8rem', justifyContent: 'flex-start' }} onClick={() => handleSimulatedUpload('Research Instrument / Protocol', 'Study_Protocol')}>
            + Attach Instrument/Protocol
          </button>
          
          <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)', fontSize: '0.8rem', justifyContent: 'flex-start' }} onClick={() => handleSimulatedUpload('Proof of Instrument Validation', 'Expert_Validation')}>
            + Attach 2-Expert Validation
          </button>
          
          {formData.formType === 'FORM-CLINICAL' && (
            <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)', fontSize: '0.8rem', justifyContent: 'flex-start', color: 'var(--primary)' }} onClick={() => handleSimulatedUpload('Good Clinical Practices (GCP)', 'GCP_Certificate')}>
              + Attach GCP Certificate
            </button>
          )}

          {formData.formType === 'FORM-ANIMAL' && (
            <button type="button" className="btn" style={{ background: '#fff', border: '1px solid var(--border-color)', fontSize: '0.8rem', justifyContent: 'flex-start', color: 'var(--primary)' }} onClick={() => handleSimulatedUpload('Veterinarian Declaration', 'Vet_Declaration')}>
              + Attach Vet Declaration
            </button>
          )}

        </div>
      </div>

      {/* ATTACHED DOCUMENTS AUDIT LIST */}
      <div>
        <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>Attached Documents Package ({formData.documents.length})</h4>
        {formData.documents.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-app)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            No documents attached yet. Use the buttons above to attach your Checklist Form 1.4 and CVs.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '250px', overflowY: 'auto', paddingRight: '0.25rem' }}>
            {formData.documents.map((doc) => (
              <div key={doc.id} className="flex-between" style={{ padding: '0.75rem 1rem', background: '#fff', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <FileText size={18} color="var(--primary)" />
                  <div>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, display: 'block' }}>{doc.name}</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Type: {doc.type} | Size: {doc.size}</span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => removeDocument(doc.id)} 
                  style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', padding: '0.25rem' }} 
                  title="Remove file"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Navigation Footer */}
      <div className="flex-between" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
        <button className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }} onClick={onPrev}>
          <ArrowLeft size={16} /> Previous: Protocol Questionnaire
        </button>
        <button 
          className="btn btn-primary" 
          disabled={!hasChecklist || !hasCV}
          onClick={onNext} 
          style={{ padding: '0.75rem 1.5rem', opacity: (!hasChecklist || !hasCV) ? 0.5 : 1 }}
          title={(!hasChecklist || !hasCV) ? "Please attach at least your Checklist Form and CV to proceed" : ""}
        >
          Next: Review Fee Processing <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}