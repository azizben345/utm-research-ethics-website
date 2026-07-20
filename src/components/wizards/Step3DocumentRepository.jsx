import React from 'react';
import { 
  Download, 
  Upload, 
  ArrowLeft, 
  ArrowRight, 
  Info, 
  FileText, 
  Trash2 
} from 'lucide-react';
import DocumentSlot from '../DocumentSlot';

export default function Step3DocumentRepository({ formData, setFormData, onPrev, onNext }) {

  // Helper to simulate attaching a document to state
  const handleSimulatedUpload = (docTypeLabel, fileNamePrefix) => {
    const randomNum = Math.floor(100 + Math.random() * 900);
    const safeTitle = (formData.projectTitle || 'Research_Project').replace(/\s+/g, '_').slice(0, 12);
    const fakeFileName = `${fileNamePrefix}_${safeTitle}_${randomNum}.pdf`;
    
    const newDoc = {
      id: `doc-${Date.now()}-${randomNum}`,
      name: fakeFileName,
      type: docTypeLabel,
      uploadDate: new Date().toISOString().split('T')[0],
      size: '2.4 MB',
      status: 'Pending Screening'
    };

    setFormData(prev => ({
      ...prev,
      documents: [...(prev.documents || []), newDoc]
    }));
  };

  const removeDocument = (docId) => {
    setFormData(prev => ({
      ...prev,
      documents: (prev.documents || []).filter(d => d.id !== docId)
    }));
  };

  // Retrieves the first attached document matching a specific type label
  const getAttachedDoc = (typeLabel) => {
    return (formData.documents || []).find(d => d.type === typeLabel) || null;
  };

  // Handler to remove a document by its type label directly from the slot
  const handleRemoveByType = (typeLabel) => {
    const doc = getAttachedDoc(typeLabel);
    if (doc) removeDocument(doc.id);
  };

  // Validation checks for mandatory progress
  const hasChecklist = !!getAttachedDoc('Checklist Form (1.4)');
  const hasConsent = !!getAttachedDoc('Respondent Consent Form');
  const hasCV = !!getAttachedDoc('Curriculum Vitae (CV)');

  return (
    <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color, #e5e7eb)', paddingBottom: '1rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', color: 'var(--text-main, #111827)' }}>3. Supporting Document Repository</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted, #6b7280)' }}>
            Protocol: <strong>{formData.formTitle || 'Research Application'}</strong> | Max file size: 10 MB per PDF.
          </span>
        </div>
        <span className="badge" style={{ padding: '0.4rem 0.75rem', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem' }}>
          Files Attached: {(formData.documents || []).length}
        </span>
      </div>

      {/* ZONE A: OFFICIAL INSTITUTIONAL TEMPLATES */}
      <section>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--primary, #2563eb)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.35rem 0' }}>
          <Download size={18} /> Zone A: Official Institutional Templates
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #6b7280)', margin: '0 0 1.25rem 0' }}>
          Download the required UTM REC templates below, complete them offline, and re-upload the signed PDF versions.
        </p>

        <DocumentSlot 
          title="Checklist Form (1.4)"
          description="Checked by the Secretariat during early screening. Must be duly completed and signed (Max 1 MB)."
          required={true}
          templateUrl="#download-checklist-1.4"
          templateName="Download Checklist Template"
          attachedFile={getAttachedDoc('Checklist Form (1.4)')}
          onUpload={() => handleSimulatedUpload('Checklist Form (1.4)', 'UTM_Checklist')}
          onRemove={() => handleRemoveByType('Checklist Form (1.4)')}
        />

        <DocumentSlot 
          title="Respondent Information & Consent Form"
          description="Standard institutional consent templates in English & Malay. Required for studies involving human respondents (Max 10 MB)."
          required={true}
          templateUrl="#download-consent-templates"
          templateName="Download English & Malay Templates"
          attachedFile={getAttachedDoc('Respondent Consent Form')}
          onUpload={() => handleSimulatedUpload('Respondent Consent Form', 'Informed_Consent')}
          onRemove={() => handleRemoveByType('Respondent Consent Form')}
        />
      </section>

      {/* ZONE B: PROJECT-SPECIFIC SUPPORTING FILES */}
      <section>
        <h3 style={{ fontSize: '1.05rem', color: 'var(--text-main, #111827)', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.35rem 0' }}>
          <Upload size={18} /> Zone B: Project-Specific Supporting Files
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted, #6b7280)', margin: '0 0 1rem 0' }}>
          Attach your independent research documentation, academic resumes, and technical protocols.
        </p>

        {/* Validation Rule Info Banner */}
        <div style={{ padding: '0.85rem 1rem', backgroundColor: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe', display: 'flex', gap: '0.75rem', alignItems: 'center', fontSize: '0.85rem', color: '#1e3a8a', marginBottom: '1.25rem' }}>
          <Info size={18} style={{ flexShrink: 0 }} />
          <span>
            <strong>Instrument Validation Rule:</strong> Instruments used to collect data must be validated by at least <strong>2 expert reviewers</strong> (or attach a written justification if deemed unnecessary).
          </span>
        </div>

        <DocumentSlot 
          title="Curriculum Vitae (CV)"
          description="Academic CV for Principal Investigator and all listed Co-Investigators. Combine into a single PDF or attach primary."
          required={true}
          attachedFile={getAttachedDoc('Curriculum Vitae (CV)')}
          onUpload={() => handleSimulatedUpload('Curriculum Vitae (CV)', 'PI_Team_CV')}
          onRemove={() => handleRemoveByType('Curriculum Vitae (CV)')}
        />

        <DocumentSlot 
          title="Research Procedure Gantt Chart"
          description="Project timeline and milestones detailing research phases, intervention schedules, and data collection periods."
          required={false}
          attachedFile={getAttachedDoc('Research Procedure Gantt Chart')}
          onUpload={() => handleSimulatedUpload('Research Procedure Gantt Chart', 'Gantt_Chart')}
          onRemove={() => handleRemoveByType('Research Procedure Gantt Chart')}
        />

        <DocumentSlot 
          title="Research Instrument / Study Protocol"
          description="Questionnaires, interview topic guides, focus group protocols, or detailed experimental intervention designs."
          required={false}
          attachedFile={getAttachedDoc('Research Instrument / Protocol')}
          onUpload={() => handleSimulatedUpload('Research Instrument / Protocol', 'Study_Protocol')}
          onRemove={() => handleRemoveByType('Research Instrument / Protocol')}
        />

        <DocumentSlot 
          title="Proof of Instrument Validation"
          description="Validation scorecards or feedback forms signed by at least 2 expert reviewers, or formal justification if unneeded."
          required={false}
          attachedFile={getAttachedDoc('Proof of Instrument Validation')}
          onUpload={() => handleSimulatedUpload('Proof of Instrument Validation', 'Expert_Validation')}
          onRemove={() => handleRemoveByType('Proof of Instrument Validation')}
        />

        {/* Conditional Slot: Clinical Trials */}
        {formData.formType === 'FORM-CLINICAL' && (
          <DocumentSlot 
            title="Good Clinical Practices (GCP) Certificate"
            description="Valid GCP training certification for Principal Investigator and clinical sub-investigators handling trials."
            required={true}
            attachedFile={getAttachedDoc('Good Clinical Practices (GCP)')}
            onUpload={() => handleSimulatedUpload('Good Clinical Practices (GCP)', 'GCP_Certificate')}
            onRemove={() => handleRemoveByType('Good Clinical Practices (GCP)')}
          />
        )}

        {/* Conditional Slot: Animal Research */}
        {formData.formType === 'FORM-ANIMAL' && (
          <DocumentSlot 
            title="Veterinarian Declaration / Competency Proof"
            description="Annual Veterinary Practice Certificate (Act 1974), DVS confirmation letter, or animal handling competency certificates."
            required={true}
            attachedFile={getAttachedDoc('Veterinarian Declaration')}
            onUpload={() => handleSimulatedUpload('Veterinarian Declaration', 'Vet_Declaration')}
            onRemove={() => handleRemoveByType('Veterinarian Declaration')}
          />
        )}

        {/* Extra Slot: Other Related Documents */}
        <DocumentSlot 
          title="Other Related Documents"
          description="Any additional supporting files such as external authority permits (PERHILITAN, DVS, Fishery), IBC biosafety approvals, grant award letters, or collaborative proof."
          required={false}
          attachedFile={getAttachedDoc('Other Related Documents')}
          onUpload={() => handleSimulatedUpload('Other Related Documents', 'Other_Attachment')}
          onRemove={() => handleRemoveByType('Other Related Documents')}
        />
      </section>

      {/* ATTACHED DOCUMENTS AUDIT TRAIL */}
      <section style={{ borderTop: '1px solid var(--border-color, #e5e7eb)', paddingTop: '1.5rem' }}>
        <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: 'var(--text-main, #111827)' }}>
          Complete Package Summary ({(formData.documents || []).length} files ready for submission)
        </h4>
        {(formData.documents || []).length === 0 ? (
          <div style={{ padding: '1.5rem', textAlign: 'center', background: 'var(--bg-app, #f9fafb)', borderRadius: '6px', border: '1px dashed var(--border-color, #d1d5db)', color: 'var(--text-muted, #6b7280)', fontSize: '0.85rem' }}>
            No documents attached yet. Use the slots above to attach your Checklist Form 1.4, Consent Form, and CVs.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '220px', overflowY: 'auto' }}>
            {(formData.documents || []).map((doc) => (
              <div key={doc.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem 1rem', background: '#fff', borderRadius: '4px', border: '1px solid var(--border-color, #e5e7eb)', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', overflow: 'hidden' }}>
                  <FileText size={18} color="var(--primary, #2563eb)" style={{ flexShrink: 0 }} />
                  <div style={{ overflow: 'hidden' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main, #111827)', display: 'block', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {doc.name}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted, #6b7280)' }}>
                      Category: <strong>{doc.type}</strong> | Size: {doc.size}
                    </span>
                  </div>
                </div>
                <button 
                  type="button"
                  onClick={() => removeDocument(doc.id)} 
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.25rem', display: 'flex', alignItems: 'center' }} 
                  title="Remove file from package"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* NAVIGATION FOOTER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color, #e5e7eb)', paddingTop: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
        <button 
          type="button"
          className="btn" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', color: 'var(--text-muted, #6b7280)', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600 }} 
          onClick={onPrev}
        >
          <ArrowLeft size={16} /> Previous: Protocol Questionnaire
        </button>
        <button 
          type="button"
          className="btn btn-primary" 
          disabled={!hasChecklist || !hasConsent || !hasCV}
          onClick={onNext} 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            padding: '0.75rem 1.5rem', 
            backgroundColor: 'var(--primary, #2563eb)', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: (!hasChecklist || !hasConsent || !hasCV) ? 'not-allowed' : 'pointer',
            fontWeight: 600,
            opacity: (!hasChecklist || !hasConsent || !hasCV) ? 0.5 : 1 
          }}
          title={(!hasChecklist || !hasConsent || !hasCV) ? "Please attach your Checklist Form 1.4, Consent Form, and CV to proceed" : ""}
        >
          Next: Preview Draft Submission <ArrowRight size={16} />
        </button>
      </div>

    </div>
  );
}