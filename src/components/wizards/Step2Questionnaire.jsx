import React, { useState } from 'react';
import { ClipboardList, ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert } from 'lucide-react';

import ExemptionProtocolForm from './forms/ExemptionProtocolForm';
import NonClinicalProtocolForm from './forms/NonClinicalProtocolForm';
import AnimalProtocolForm from './forms/AnimalProtocolForm';
import ClinicalProtocolForm from './forms/ClinicalProtocolForm';

export default function Step2Questionnaire({ formData, setFormData, onPrev, onNext }) {
  const [activeSubTab, setActiveSubTab] = useState('overview');

  // Helper to check if the exemption form has at least 1 checkbox ticked
  const isExemptionValid = formData.exemptionCriteria && formData.exemptionCriteria.length > 0;

  return (
    <div className="card">
      <div className="flex-between" style={{ marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
        <div>
          <h2 style={{ margin: '0 0 0.25rem 0' }}>2. Protocol Questionnaire & Ethical Declarations</h2>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Project: <strong>{formData.projectTitle}</strong> | Auto-Draft Saving Enabled
          </span>
        </div>
        <span className="badge badge-primary" style={{ fontSize: '0.85rem' }}>{formData.formTitle}</span>
      </div>

      {/* DYNAMIC PROTOCOL SWITCHBOARD */}
      <div style={{ margin: '1.5rem 0' }}>
        
        {/* 1. EXEMPTION FORM ROUTE (Streamlined Checklist Layout) */}
        {formData.formType === 'FORM-EXEMPTION' && (
          <ExemptionProtocolForm formData={formData} setFormData={setFormData} />
        )}

        {/* 2. NON-CLINICAL FORM ROUTE (4-Sub-Tab Layout) */}
        {formData.formType === 'FORM-NON-CLINICAL' && (
          <NonClinicalProtocolForm formData={formData} setFormData={setFormData} activeTab={activeSubTab} setActiveTab={setActiveSubTab} />
        )}

        {/* 3. ANIMAL FORM ROUTE (4-Sub-Tab Operational Layout) */}
        {formData.formType === 'FORM-ANIMAL' && (
          <AnimalProtocolForm formData={formData} setFormData={setFormData} activeTab={activeSubTab} setActiveTab={setActiveSubTab} />
        )}

        {/* 4. CLINICAL FORM ROUTE (4-Sub-Tab Medical Layout) */}
        {formData.formType === 'FORM-CLINICAL' && (
          <ClinicalProtocolForm formData={formData} setFormData={setFormData} activeTab={activeSubTab} setActiveTab={setActiveSubTab} />
        )}

      </div>

      {/* Navigation Footer */}
      <div className="flex-between" style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
        <button className="btn" style={{ background: 'transparent', color: 'var(--text-muted)' }} onClick={onPrev}>
          <ArrowLeft size={16} /> Previous: Protocol Details
        </button>
        <button 
          className="btn btn-primary" 
          onClick={onNext} 
          disabled={formData.formType === 'FORM-EXEMPTION' && !isExemptionValid}
          style={{ padding: '0.75rem 1.5rem', opacity: (formData.formType === 'FORM-EXEMPTION' && !isExemptionValid) ? 0.5 : 1 }}
        >
          Next: Upload Supporting Documents <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}