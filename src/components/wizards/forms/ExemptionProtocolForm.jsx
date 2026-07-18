import React from 'react';
import { UserPlus, Trash2, CheckSquare, Calendar, FileText, ShieldCheck, Mail, Info } from 'lucide-react';

export default function ExemptionProtocolForm({ formData, setFormData }) {

  // ---------------------------------------------------------------------------
  // STATE UPDATER HELPERS
  // ---------------------------------------------------------------------------
  
  // Generic top-level field updater
  const updateField = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  // Nested updater for Section B (Executive Summary sub-fields)
  const updateExecSummary = (subField, value) => {
    setFormData({
      ...formData,
      execSummaryDetails: {
        ...(formData.execSummaryDetails || {}),
        [subField]: value
      }
    });
  };

  // Section A: Co-Investigator Dynamic Array Handlers
  const addCoInvestigator = () => {
    const currentList = formData.coInvestigators || [
      { name: '', phone: '', email: '', department: '', faculty: '' }
    ];
    setFormData({
      ...formData,
      coInvestigators: [
        ...currentList,
        { name: '', phone: '', email: '', department: '', faculty: '' }
      ]
    });
  };

  const removeCoInvestigator = (index) => {
    const currentList = formData.coInvestigators || [];
    setFormData({
      ...formData,
      coInvestigators: currentList.filter((_, i) => i !== index)
    });
  };

  const updateCoInvestigator = (index, field, value) => {
    const currentList = [...(formData.coInvestigators || [])];
    currentList[index] = { ...currentList[index], [field]: value };
    setFormData({ ...formData, coInvestigators: currentList });
  };

  // Section C: Justification Checkbox Handlers
  const handleToggleJustification = (id) => {
    const currentList = formData.exemptionJustifications || [];
    const updatedList = currentList.includes(id)
      ? currentList.filter(item => item !== id)
      : [...currentList, id];
    updateField('exemptionJustifications', updatedList);
  };

  // ---------------------------------------------------------------------------
  // VERBATIM SECTION C: EXEMPTION CRITERIA LIST (B-UTMREC-AEER)
  // ---------------------------------------------------------------------------
  const justificationOptions = [
    { id: 'opt-1', label: 'This research does not involve human participants, human tissues and/or biological samples.' },
    { id: 'opt-2', label: 'This research does not collect sensitive and identifiable secondary data of an individual.' },
    { id: 'opt-3', label: 'This research involves content analysis / textual analysis / meta-analysis. (E.g.: non-identifiable data lawfully collected, public/private records, published/unpublished reports, and documents available in libraries, repositories, archives, websites).' },
    { id: 'opt-4', label: 'Case study / doctrinal study / policy study that does not involve human participants / sensitive/ identifiable data of an individual.' },
    { id: 'opt-5', label: 'Concept paper which synthesizes knowledge from the previous study on a particular topic and presents it in a new context with the aims to fill knowledge gaps. This research does not involve human participants and does not collect sensitive and / identifiable data of an individual.' },
    { id: 'opt-6', label: 'Opinion poll / online vote that do not collect sensitive and / identifiable data of an individual.' },
    { id: 'opt-7', label: 'Observational studies based on video recording obtained from public domains that do not collect sensitive and / identifiable data of an individual.' },
    { id: 'opt-8', label: 'Filming of documentary / documentation of cultural / traditional practices that have obtained prior approval from the relevant parties / authorities and does not collect sensitive and / identifiable data of an individual (random video/photo).' },
    { id: 'opt-9', label: 'Activities for quality assurance purposes (e.g. clinical audit, communication audit, compliance audit) related to the evaluation of public service programs, public health surveillance, educational evaluation.' },
    { id: 'opt-10', label: 'Activities under UTM Spin off company for the purpose of product development which do not collect sensitive and / identifiable data of an individual and will not be publish in any medium.' },
    { id: 'opt-11', label: 'Activities involving samples or biological materials taken from carcasses in abattoirs, market places (e.g commercially available) or dead animals.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* --------------------------------------------------------------------- */}
      {/* HEADER: FORM METADATA & STUDY TYPE */}
      {/* --------------------------------------------------------------------- */}
      <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-app)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
              Form Version: 1/2026 | Doc No: B-UTMREC-AEER
            </span>
            <h3 style={{ margin: '0.25rem 0 0 0', color: 'var(--primary)' }}>Application For Exemption From Ethical Review</h3>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Application No.</span>
            <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>{formData.id || 'Auto-Generated on Submit'}</strong>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Types of Study *
            </label>
            <select 
              value={formData.exemptionStudyType || ''} 
              onChange={(e) => updateField('exemptionStudyType', e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontWeight: 600 }}
            >
              <option value="">Select study category...</option>
              <option value="Clinical">Clinical</option>
              <option value="Non-Clinical">Non-Clinical</option>
              <option value="Animal">Animal</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Research Title *
            </label>
            <input 
              type="text" 
              placeholder="Enter exact research title..." 
              value={formData.projectTitle || ''} 
              onChange={(e) => updateField('projectTitle', e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}
            />
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------------------- */}
      {/* SECTION A: DETAILS OF RESEARCHER */}
      {/* --------------------------------------------------------------------- */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', textTransform: 'uppercase' }}>
            Section A: Details of Researcher
          </h3>
        </div>

        {/* PI Notice Banner */}
        <div style={{ padding: '0.85rem 1rem', backgroundColor: '#eff6ff', borderRadius: '4px', border: '1px solid #bfdbfe', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.85rem', color: '#1e3a8a' }}>
          <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Please note institutional rules for Principal Investigator (PI):</strong>
            <ul style={{ margin: '0.25rem 0 0 0', paddingLeft: '1.25rem' }}>
              <li><strong>UTM staff:</strong> PI must be the applicant.</li>
              <li><strong>For student applications:</strong> PI refers to the supervisor who is a UTM staff member.</li>
            </ul>
          </div>
        </div>

        {/* Principal Investigator Fields */}
        <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-app)', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)', fontSize: '0.95rem' }}>Principal Investigator (PI) Details *</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Name</label>
              <input type="text" value={formData.applicantName || ''} onChange={(e) => updateField('applicantName', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Contact Number</label>
              <input type="text" value={formData.phone || ''} onChange={(e) => updateField('phone', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Email</label>
              <input type="email" value={formData.applicantEmail || ''} onChange={(e) => updateField('applicantEmail', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Department</label>
              <input type="text" placeholder="e.g., Department of Software Engineering" value={formData.piDepartment || ''} onChange={(e) => updateField('piDepartment', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Faculty</label>
              <input type="text" value={formData.faculty || ''} onChange={(e) => updateField('faculty', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
            </div>
          </div>
        </div>

        {/* Dynamic Co-Investigators Repeater */}
        <div>
          <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.95rem' }}>Co-Investigators</h4>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>*Please list all the investigators (if any)</span>
            </div>
            <button type="button" onClick={addCoInvestigator} className="btn" style={{ background: '#fff', border: '1px solid var(--primary)', color: 'var(--primary)', fontSize: '0.8rem', padding: '0.4rem 0.75rem' }}>
              <UserPlus size={14} /> + Add Co-Investigator
            </button>
          </div>

          {(!formData.coInvestigators || formData.coInvestigators.length === 0) ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: 'var(--bg-app)', borderRadius: '4px', border: '1px dashed var(--border-color)', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
              No co-investigators listed. Click "+ Add Co-Investigator" above if this is a team project.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {formData.coInvestigators.map((coInv, idx) => (
                <div key={idx} style={{ padding: '1.25rem', backgroundColor: 'var(--bg-app)', borderRadius: '6px', border: '1px solid var(--border-color)', position: 'relative' }}>
                  
                  <div className="flex-between" style={{ marginBottom: '0.75rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>Co-Investigator {idx + 1}</strong>
                    <button type="button" onClick={() => removeCoInvestigator(idx)} style={{ background: 'transparent', border: 'none', color: 'var(--danger)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Name</label>
                      <input type="text" placeholder="Full Name" value={coInv.name} onChange={(e) => updateCoInvestigator(idx, 'name', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Contact Number</label>
                      <input type="text" placeholder="Phone Number" value={coInv.phone} onChange={(e) => updateCoInvestigator(idx, 'phone', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Email</label>
                      <input type="email" placeholder="Email Address" value={coInv.email} onChange={(e) => updateCoInvestigator(idx, 'email', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Department</label>
                      <input type="text" placeholder="Department" value={coInv.department} onChange={(e) => updateCoInvestigator(idx, 'department', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.25rem' }}>Faculty</label>
                      <input type="text" placeholder="Faculty" value={coInv.faculty} onChange={(e) => updateCoInvestigator(idx, 'faculty', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} />
                    </div>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* SECTION B: RESEARCH INFORMATION */}
      {/* --------------------------------------------------------------------- */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', textTransform: 'uppercase' }}>
            Section B: Research Information
          </h3>
        </div>

        {/* 1.0 Research Overview & 1.1 Executive Summary (Verbatim 5 Sub-fields) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
          <div>
            <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.95rem', color: 'var(--text-main)' }}>
              1.0 Research Overview & 1.1 Executive Summary *
            </h4>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0 0 1rem 0' }}>
              Please include the problem statement, objectives, research methodology, expected output/outcomes/implication, and significance output from the research project (approximately 350 words total across all sections).
            </p>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1.1.1 Problem Statement *
            </label>
            <textarea 
              rows={3} 
              placeholder="State the core research problem or knowledge gap..."
              value={formData.execSummaryDetails?.problemStatement || ''} 
              onChange={(e) => updateExecSummary('problemStatement', e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1.1.2 Objectives *
            </label>
            <textarea 
              rows={3} 
              placeholder="List the general and specific research objectives..."
              value={formData.execSummaryDetails?.objectives || ''} 
              onChange={(e) => updateExecSummary('objectives', e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1.1.3 Research Methodology *
            </label>
            <textarea 
              rows={4} 
              placeholder="Detail your research design, data sources, and analytical frameworks..."
              value={formData.execSummaryDetails?.methodology || ''} 
              onChange={(e) => updateExecSummary('methodology', e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1.1.4 Expected Output / Outcomes / Implication *
            </label>
            <textarea 
              rows={3} 
              placeholder="Describe expected deliverables and theoretical/practical implications..."
              value={formData.execSummaryDetails?.expectedOutcomes || ''} 
              onChange={(e) => updateExecSummary('expectedOutcomes', e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1.1.5 Significance Output from the Research Project *
            </label>
            <textarea 
              rows={3} 
              placeholder="Explain the broader impact and value to the field or society..."
              value={formData.execSummaryDetails?.significance || ''} 
              onChange={(e) => updateExecSummary('significance', e.target.value)}
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* 1.2 through 1.5 Timelines */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', backgroundColor: 'var(--bg-app)', padding: '1.25rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1.2 Start Date of Research *
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Calendar size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px' }} />
              <input 
                type="date" 
                value={formData.researchStartDate || ''} 
                onChange={(e) => updateField('researchStartDate', e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.25rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1.3 End Date of Research *
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Calendar size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '10px' }} />
              <input 
                type="date" 
                value={formData.researchEndDate || ''} 
                onChange={(e) => updateField('researchEndDate', e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.25rem', borderRadius: '4px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1.4 Proposed Start Date of Data Collection *
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Calendar size={16} color="var(--primary)" style={{ position: 'absolute', left: '10px' }} />
              <input 
                type="date" 
                value={formData.dataCollectionStart || ''} 
                onChange={(e) => updateField('dataCollectionStart', e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.25rem', borderRadius: '4px', border: '1px solid var(--primary)', boxSizing: 'border-box' }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              1.5 Proposed Completion Date of Data Collection *
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Calendar size={16} color="var(--primary)" style={{ position: 'absolute', left: '10px' }} />
              <input 
                type="date" 
                value={formData.dataCollectionEnd || ''} 
                onChange={(e) => updateField('dataCollectionEnd', e.target.value)}
                style={{ width: '100%', padding: '0.5rem 0.5rem 0.5rem 2.25rem', borderRadius: '4px', border: '1px solid var(--primary)', boxSizing: 'border-box' }} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* SECTION C: JUSTIFICATION FOR EXEMPTION FROM ETHICAL REVIEW */}
      {/* --------------------------------------------------------------------- */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <div className="flex-between">
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', textTransform: 'uppercase' }}>
              Section C: Justification For Exemption From Ethical Review
            </h3>
            <span className="badge badge-primary">
              Selected: {(formData.exemptionJustifications || []).length}
            </span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Tick where applicable, can be more than one *
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', background: 'var(--bg-app)', padding: '1.25rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
          {justificationOptions.map((opt) => {
            const isChecked = (formData.exemptionJustifications || []).includes(opt.id);
            return (
              <label 
                key={opt.id}
                onClick={() => handleToggleJustification(opt.id)}
                style={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  gap: '0.75rem', 
                  padding: '0.85rem 1rem', 
                  background: isChecked ? '#fff' : 'transparent',
                  borderRadius: '4px', 
                  border: isChecked ? '1px solid var(--primary)' : '1px solid transparent',
                  cursor: 'pointer', 
                  transition: 'all 0.2s',
                  fontSize: '0.875rem',
                  lineHeight: 1.4,
                  color: isChecked ? 'var(--primary)' : 'var(--text-main)',
                  fontWeight: isChecked ? 600 : 400,
                  boxShadow: isChecked ? 'var(--shadow-sm)' : 'none'
                }}
              >
                <input 
                  type="checkbox" 
                  checked={isChecked} 
                  onChange={() => {}} // Handled by parent label click
                  style={{ marginTop: '2px', accentColor: 'var(--primary)', width: '16px', height: '16px', cursor: 'pointer', flexShrink: 0 }}
                />
                <span>{opt.label}</span>
              </label>
            );
          })}

          {/* Verbatim Item 12: Others (provide details) */}
          <div style={{ padding: '0.85rem 1rem', background: (formData.exemptionJustifications || []).includes('opt-others') ? '#fff' : 'transparent', borderRadius: '4px', border: (formData.exemptionJustifications || []).includes('opt-others') ? '1px solid var(--primary)' : '1px solid transparent' }}>
            <label 
              onClick={() => handleToggleJustification('opt-others')}
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', fontSize: '0.875rem', fontWeight: (formData.exemptionJustifications || []).includes('opt-others') ? 600 : 400, color: (formData.exemptionJustifications || []).includes('opt-others') ? 'var(--primary)' : 'var(--text-main)', marginBottom: '0.5rem' }}
            >
              <input 
                type="checkbox" 
                checked={(formData.exemptionJustifications || []).includes('opt-others')} 
                onChange={() => {}} 
                style={{ accentColor: 'var(--primary)', width: '16px', height: '16px', cursor: 'pointer' }}
              />
              <span>Others (provide details):</span>
            </label>

            {(formData.exemptionJustifications || []).includes('opt-others') && (
              <div style={{ paddingLeft: '1.75rem', marginTop: '0.5rem' }}>
                <textarea 
                  rows={2} 
                  placeholder="Provide specific details regarding your exemption justification..."
                  value={formData.exemptionOtherDetails || ''}
                  onChange={(e) => updateField('exemptionOtherDetails', e.target.value)}
                  style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.85rem', fontFamily: 'inherit', boxSizing: 'border-box' }}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* SECTION D: DECLARATION BY PRINCIPAL INVESTIGATOR */}
      {/* --------------------------------------------------------------------- */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', textTransform: 'uppercase' }}>
            Section D: Declaration by Principal Investigator
          </h3>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-app)', borderRadius: '6px', border: '1px solid var(--border-color)', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.piDeclarationA || false} onChange={(e) => updateField('piDeclarationA', e.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--success)', width: '16px', height: '16px' }} />
              <span><strong>a.</strong> I certify that the information provided in this application is complete and accurate.</span>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.piDeclarationB || false} onChange={(e) => updateField('piDeclarationB', e.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--success)', width: '16px', height: '16px' }} />
              <span><strong>b.</strong> I confirm that to the best of my knowledge, and based on the answers I have provided in this form, this project qualifies for exemption from ethics committee review.</span>
            </label>
            
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={formData.piDeclarationC || false} onChange={(e) => updateField('piDeclarationC', e.target.checked)} style={{ marginTop: '3px', accentColor: 'var(--success)', width: '16px', height: '16px' }} />
              <span><strong>c.</strong> I agree to comply with all UTM’s policies and procedures, as well as with all applicable regulatory requirements and laws, regarding the protection of human participants in research.</span>
            </label>
          </div>

          {/* Digital Signature Simulation Box */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px dashed var(--border-color)', paddingTop: '1rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Digital Signature (Auto-bound)</span>
              <strong style={{ color: 'var(--success)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={16} /> Verified PI Session
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Name</span>
              <strong style={{ fontSize: '0.9rem' }}>{formData.applicantName || 'Dr. Sarah Razak'}</strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block' }}>Date</span>
              <strong style={{ fontSize: '0.9rem' }}>{new Date().toISOString().split('T')[0]}</strong>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* SECTION E: VERIFICATION BY DEAN/DEPUTY DEAN / CHAIR / DIRECTOR */}
      {/* --------------------------------------------------------------------- */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-main)', textTransform: 'uppercase' }}>
            Section E: Verification By Dean / Deputy Dean / Chair of School / Director
          </h3>
        </div>

        <div style={{ padding: '1.25rem', backgroundColor: 'var(--primary-light)', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
            <Mail size={18} /> Automated Institutional Endorsement Routing
          </h4>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
            In accordance with Section E requirements, the official listed below will be required to digitally verify the following statements upon submission:
          </p>

          <ul style={{ margin: '0 0 1.25rem 0', paddingLeft: '1.5rem', fontSize: '0.85rem', color: '#1e3a8a', lineHeight: 1.5 }}>
            <li><em>"I have reviewed this application and determined that all applicable departmental requirements are met."</em></li>
            <li><em>"The investigator is qualified by education, training, and experience to assume responsibility for the proper conduct of the study."</em></li>
          </ul>

          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '0.35rem' }}>
              Supervisor (for students) / Dean Official Institutional Email *
            </label>
            <input 
              type="email" 
              placeholder="e.g., dean.computing@utm.my / supervisor@utm.my" 
              value={formData.routingEmail || ''} 
              onChange={(e) => updateField('routingEmail', e.target.value)} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)', fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' }} 
            />
            <span style={{ fontSize: '0.75rem', color: 'var(--primary)', display: 'block', marginTop: '0.35rem' }}>
              ⚡ Upon clicking Submit on Step 5, an automated verification token will be dispatched to this address to fulfill Section E sign-off.
            </span>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------------------- */}
      {/* FOR UTM REC USE (ADMIN ONLY NOTE) */}
      {/* --------------------------------------------------------------------- */}
      <div style={{ padding: '0.75rem 1rem', background: '#f3f4f6', borderRadius: '4px', border: '1px dashed #9ca3af', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#6b7280' }}>
        <span><strong>For UTM REC Use Section:</strong> Stamp, Received Date, and Chairperson Approval Status (Approved/Not Approved) are isolated to the Secretariat Admin Dashboard.</span>
        <span>Mukasurat / 1 | Pindaan: 1 | Tarikh: 01/4/2026</span>
      </div>

    </div>
  );
}