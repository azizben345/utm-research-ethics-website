import React from 'react';
import { AlertTriangle, Info, ArrowRight, ShieldAlert } from 'lucide-react';

export default function Step1ProtocolSelection({ formData, setFormData, onNext }) {
  
  // April 2025 Fee Structure Lookup Matrix
  const feeMatrix = {
    'FORM-CLINICAL': { INTERNAL: 100, EXTERNAL: 800 },
    'FORM-NON-CLINICAL': { INTERNAL: 50, EXTERNAL: 700 },
    'FORM-ANIMAL': { INTERNAL: 100, EXTERNAL: 1000 },
    'FORM-EXEMPTION': { INTERNAL: 30, EXTERNAL: 30 }
  };

  const formTypes = [
    {
      id: 'FORM-CLINICAL',
      title: 'Clinical Research Ethics',
      desc: 'Involves human participants as targets of research in clinical, medical, or engineering applications (e.g., clinical trials).',
      badge: 'Full Committee Review'
    },
    {
      id: 'FORM-NON-CLINICAL',
      title: 'Non-Clinical Research Ethics',
      desc: 'Involves human research studies which do not feature clinical trials (e.g., surveys, interviews, retrospective archival data).',
      badge: 'Standard Review'
    },
    {
      id: 'FORM-ANIMAL',
      title: 'Animal Research Ethics',
      desc: 'Involves studies where live animals or animal parts are used as experimental samples or test materials.',
      badge: 'Special Committee'
    },
    {
      id: 'FORM-EXEMPTION',
      title: 'Exemption Notification',
      desc: 'For minimal-risk research qualifying for committee notification without requiring formal full-panel endorsement.',
      badge: 'Notification Only'
    }
  ];

  // Update applicant category and recalculate active form fee
  const handleCategoryChange = (category) => {
    const updatedFee = formData.formType ? feeMatrix[formData.formType][category] : 0;
    setFormData({
      ...formData,
      applicantCategory: category,
      feeAmount: updatedFee
    });
  };

  // Update selected form protocol and calculate fee
  const handleSelectForm = (formId, formTitle) => {
    const calculatedFee = feeMatrix[formId][formData.applicantCategory];
    setFormData({
      ...formData,
      formType: formId,
      formTitle: formTitle,
      feeAmount: calculatedFee
    });
  };

  const isGatekeeperFailed = formData.hasStartedCollection === 'yes';
  const isFormValid = formData.formType && formData.projectTitle.trim() !== '' && formData.phone.trim() !== '';

  return (
    <div className="card">
      <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>1. Protocol Classification & Project Metadata</h2>
      
      {/* 1. MANDATORY GATEKEEPER CHECK */}
      <div style={{ padding: '1.25rem', backgroundColor: isGatekeeperFailed ? 'var(--danger-light)' : 'var(--bg-app)', border: `1px solid ${isGatekeeperFailed ? '#f87171' : 'var(--border-color)'}`, borderRadius: 'var(--radius-md)', marginBottom: '2rem', transition: 'all 0.2s' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
          <ShieldAlert size={20} color={isGatekeeperFailed ? '#dc2626' : 'var(--primary)'} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.95rem', color: isGatekeeperFailed ? '#991b1b' : 'var(--text-main)', marginBottom: '0.25rem' }}>
              Has data collection for your research begun? *
            </label>
            <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: isGatekeeperFailed ? '#7f1d1d' : 'var(--text-muted)' }}>
              Please note that retrospective ethics approval cannot be granted for studies in which data collection has already commenced prior to obtaining ethics approval.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem' }}>
                <input 
                  type="radio" 
                  name="dataCollection" 
                  checked={formData.hasStartedCollection === 'no'} 
                  onChange={() => setFormData({ ...formData, hasStartedCollection: 'no' })} 
                />
                No (Not started - Eligible for Review)
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', color: '#dc2626' }}>
                <input 
                  type="radio" 
                  name="dataCollection" 
                  checked={formData.hasStartedCollection === 'yes'} 
                  onChange={() => setFormData({ ...formData, hasStartedCollection: 'yes' })} 
                />
                Yes (Data collection has commenced)
              </label>
            </div>
          </div>
        </div>

        {/* Rejection Halt Alert */}
        {isGatekeeperFailed && (
          <div style={{ marginTop: '1rem', padding: '0.75rem', backgroundColor: '#fee2e2', borderLeft: '4px solid #dc2626', color: '#991b1b', fontSize: '0.85rem', fontWeight: 600 }}>
            ⚠️ INELIGIBLE APPLICATION: The UTM REC will strictly not process ongoing data collection or completed research. Ethics clearance applies to new research proposals only.
          </div>
        )}
      </div>

      {/* Only render remainder of form if Gatekeeper passes */}
      {!isGatekeeperFailed && (
        <>
          {/* 2. APPLICANT CATEGORY (DRIVES FEE MATRIX) */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
              Applicant Institution Category (Drives Review Processing Fee): *
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                className={`btn ${formData.applicantCategory === 'INTERNAL' ? 'btn-primary' : ''}`}
                style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--border-color)', background: formData.applicantCategory === 'INTERNAL' ? '' : 'var(--bg-surface)', color: formData.applicantCategory === 'INTERNAL' ? '' : 'var(--text-main)' }}
                onClick={() => handleCategoryChange('INTERNAL')}
              >
                Internal UTM (Staff / Student)
              </button>
              <button
                type="button"
                className={`btn ${formData.applicantCategory === 'EXTERNAL' ? 'btn-primary' : ''}`}
                style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--border-color)', background: formData.applicantCategory === 'EXTERNAL' ? '' : 'var(--bg-surface)', color: formData.applicantCategory === 'EXTERNAL' ? '' : 'var(--text-main)' }}
                onClick={() => handleCategoryChange('EXTERNAL')}
              >
                External Non-UTM Institution
              </button>
            </div>
          </div>

          {/* 3. PROTOCOL FORM TYPE SELECTION */}
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-main)' }}>
            Select Research Ethics Protocol Category: *
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
            {formTypes.map((f) => {
              const isSelected = formData.formType === f.id;
              const currentFee = feeMatrix[f.id][formData.applicantCategory];
              return (
                <div 
                  key={f.id}
                  onClick={() => handleSelectForm(f.id, f.title)}
                  style={{ 
                    padding: '1.25rem', 
                    borderRadius: 'var(--radius-md)', 
                    border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-color)',
                    backgroundColor: isSelected ? 'var(--primary-light)' : 'var(--bg-surface)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                      <span className="badge badge-primary">{f.badge}</span>
                      <strong style={{ color: 'var(--primary)' }}>RM {currentFee}</strong>
                    </div>
                    <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{f.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{f.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 4. INVESTIGATOR & PROPOSAL METADATA */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* PI Eligibility Rules Helper Card */}
            <div style={{ padding: '0.75rem 1rem', backgroundColor: '#eff6ff', borderRadius: 'var(--radius-sm)', border: '1px solid #bfdbfe', display: 'flex', gap: '0.5rem', alignItems: 'flex-start', fontSize: '0.8rem', color: '#1e3a8a' }}>
              <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <strong>Principal Investigator (PI) Institutional Rules:</strong>
                <ul style={{ margin: '0.25rem 0 0 0', paddingLeft: '1.25rem' }}>
                  <li><strong>UTM Staff:</strong> The PI must be the applicant.</li>
                  <li><strong>Student Applications:</strong> The PI listed must be your supervisor (UTM staff member).</li>
                  <li><strong>External Applications:</strong> A UTM staff member must be included in the research team as a Co-Investigator.</li>
                </ul>
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                Research Proposal Title *
              </label>
              <input 
                type="text" 
                required
                placeholder="e.g., AI-Driven Diagnostic Tools in Clinical Trials"
                value={formData.projectTitle}
                onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Name of Principal Investigator (PI) * (stc: should be email)
                </label>
                <input 
                  type="text" 
                  required
                  value={formData.applicantName}
                  onChange={(e) => setFormData({ ...formData, applicantName: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Telephone No. (Mobile / Office) *
                </label>
                <input 
                  type="text" 
                  required
                  placeholder="012-3456789"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Faculty *
                </label>
                <input 
                  type="text" 
                  value={formData.faculty}
                  onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                  Funding Source / Grant Sponsor (stc: not needed)
                </label>
                <input 
                  type="text" 
                  value={formData.fundingSource}
                  onChange={(e) => setFormData({ ...formData, fundingSource: e.target.value })}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.95rem', boxSizing: 'border-box' }}
                />
              </div>
            </div>

          </div>

          {/* Step 1 Submit Button */}
          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button 
              className="btn btn-primary" 
              disabled={!isFormValid}
              onClick={onNext}
              style={{ padding: '0.75rem 1.5rem', opacity: !isFormValid ? 0.5 : 1 }}
            >
              Next: Protocol Questionnaire <ArrowRight size={16} />
            </button>
          </div>
        </>
      )}

    </div>
  );
}