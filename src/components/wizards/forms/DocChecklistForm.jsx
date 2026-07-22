import React, { useState } from 'react';
import { CheckCircle2, XCircle, AlertTriangle, Send } from 'lucide-react';

export default function DocChecklistForm({ formApplied, onMarkDayZero, onReturnToApplicant }) {
  const [checklist, setChecklist] = useState({});

  // Define the universal and specific checklist items based on UTM REC guidelines
  const getChecklistItems = () => {
    const universalItems = [
      { id: 'appForm', label: 'Application Form', compulsory: true },
      { id: 'cv', label: 'CV of researchers (max 2 pages/person)', compulsory: true },
      { id: 'gantt', label: 'Gantt Chart', compulsory: true },
      { id: 'payment', label: 'Proof of Payment', compulsory: true, isSpecific: false } 
    ];

    if (formApplied === 'Animal Research Ethics') {
      return [
        ...universalItems,
        { id: 'vetDec', label: 'Attending Veterinarian’s Declaration', compulsory: false, isSpecific: true } //
      ];
    }

    const humanTrialsItems = [
      { id: 'protocol', label: 'Instrument Protocol (Questionnaire, Interview, etc.)', compulsory: true, isSpecific: true }, //
      { id: 'validation', label: 'Proof of Validation by 2 Experts (or Justification)', compulsory: true, isSpecific: true }, //
      { id: 'consent', label: 'Respondent’s Information Sheet and Consent (Malay/English)', compulsory: true, isSpecific: true }, //
      { id: 'advert', label: 'Advertisement for Subject Recruitment', compulsory: false, isSpecific: true }, //
      { id: 'risk', label: 'Research Risk Assessment Checklist', compulsory: true, isSpecific: true } //
    ];

    if (formApplied === 'Clinical Research Ethics') {
      return [
        ...universalItems,
        ...humanTrialsItems,
        { id: 'gcp', label: 'Good Clinical Practices Certificate (GCP)', compulsory: true, isSpecific: true }, //
        { id: 'insurance', label: 'Insurance statement (Indemnity coverage)', compulsory: false, isSpecific: true } //
      ];
    }

    if (formApplied === 'Non-Clinical Research Ethics') {
      return [
        ...universalItems,
        ...humanTrialsItems
      ];
    }

    // Default to Exemption Form
    return [...universalItems];
  };

  const items = getChecklistItems();

  const handleToggle = (id, value) => {
    setChecklist(prev => ({ ...prev, [id]: value }));
  };

  // Validation Logic
  const allCompulsoryMet = items
    .filter(item => item.compulsory)
    .every(item => checklist[item.id] === 'Yes' || checklist[item.id] === 'N/A');

  const hasRejections = Object.values(checklist).includes('No');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-app, #f9fafb)', borderBottom: '1px solid var(--border-color, #e5e7eb)' }}>
        <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', color: 'var(--text-main, #111827)' }}>Early Screening Checklist</h3>
        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted, #6b7280)' }}>
          Verify the completeness of the attached documents [{formApplied}]
        </p>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
        {items.map((item, index) => (
          <div key={item.id} style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px dashed var(--border-color, #e5e7eb)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
              <span style={{ 
                fontSize: '0.85rem', 
                fontWeight: 600, 
                color: item.isSpecific ? 'var(--primary, #2563eb)' : 'var(--text-main, #111827)',
                paddingRight: '1rem'
               }}>
                {index + 1}. {item.label}
              </span>
              {item.compulsory && <span className="badge badge-warning" style={{ fontSize: '0.65rem', padding: '0.15rem 0.4rem' }}>Required</span>}
            </div>
            
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {['Yes', 'No', 'N/A'].map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleToggle(item.id, opt)}
                  style={{
                    flex: 1,
                    padding: '0.4rem',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    borderRadius: '4px',
                    border: checklist[item.id] === opt 
                      ? `1px solid ${opt === 'No' ? '#ef4444' : opt === 'Yes' ? '#10b981' : '#3b82f6'}`
                      : '1px solid var(--border-color, #d1d5db)',
                    backgroundColor: checklist[item.id] === opt 
                      ? (opt === 'No' ? '#fef2f2' : opt === 'Yes' ? '#ecfdf5' : '#eff6ff') 
                      : '#fff',
                    color: checklist[item.id] === opt 
                      ? (opt === 'No' ? '#b91c1c' : opt === 'Yes' ? '#047857' : '#1d4ed8') 
                      : 'var(--text-muted, #6b7280)'
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ padding: '1.25rem', backgroundColor: '#fff', borderTop: '1px solid var(--border-color, #e5e7eb)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <button 
          className="btn btn-success" 
          disabled={!allCompulsoryMet || hasRejections}
          onClick={onMarkDayZero}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            justifyContent: 'center', 
            opacity: (!allCompulsoryMet || hasRejections) ? 0.5 : 1,
            cursor: (!allCompulsoryMet || hasRejections) ? 'not-allowed' : 'pointer',
            fontWeight: 700
          }}
        >
          <CheckCircle2 size={18} /> Confirm Complete (Mark Day 0)
        </button>
        
        <button 
          className="btn" 
          disabled={!hasRejections}
          onClick={onReturnToApplicant}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            justifyContent: 'center', 
            backgroundColor: hasRejections ? '#fef2f2' : '#fff',
            color: hasRejections ? '#b91c1c' : 'var(--text-muted)',
            border: hasRejections ? '1px solid #ef4444' : '1px solid var(--border-color)',
            fontWeight: 600
          }}
        >
          <AlertTriangle size={18} /> Return to Applicant
        </button>
      </div>
    </div>
  );
}