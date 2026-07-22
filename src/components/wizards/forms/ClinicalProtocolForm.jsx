import React from 'react';
import { FileText, Users, Lock, ShieldCheck } from 'lucide-react';
import ClinicalTabOverview from './clinical_components/ClinicalTabOverview';
import ClinicalTabMethodology from './clinical_components/ClinicalTabMethodology';
import ClinicalTabGovernance from './clinical_components/ClinicalTabGovernance';
import ClinicalTabEthics from './clinical_components/ClinicalTabEthics';

export default function ClinicalProtocolForm({ formData, setFormData, activeTab, setActiveTab }) {
  
  const tabs = [
    { id: 'overview', label: '1. Protocol Overview', icon: FileText },
    { id: 'methodology', label: '2. Clinical Methodology', icon: Users },
    { id: 'governance', label: '3. Data Governance', icon: Lock },
    { id: 'ethics', label: '4. Ethics & Risk Control', icon: ShieldCheck },
  ];

  const updateNestedState = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      clinicalData: {
        ...prev.clinicalData,
        [category]: {
          ...prev.clinicalData?.[category],
          [field]: value
        }
      }
    }));
  };

  const clinicalData = formData.clinicalData || {};

  return (
    <div className="clinical-form-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Sub-Tabs Navigation Bar */}
      <div style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', gap: '0.5rem', overflowX: 'auto' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                border: 'none',
                background: isActive ? 'var(--bg-card)' : 'transparent',
                color: isActive ? 'var(--primary-color)' : 'var(--text-muted)',
                borderBottom: isActive ? '3px solid var(--primary-color)' : '3px solid transparent',
                fontWeight: isActive ? '600' : '400',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
                marginBottom: '-2px'
              }}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Render Active Sub-Tab Window */}
      <div style={{ padding: '0.5rem 0' }}>
        {activeTab === 'overview' && (
          <ClinicalTabOverview 
            data={clinicalData.overview || {}} 
            investigators={clinicalData.investigators || {}}
            updateOverview={(f, v) => updateNestedState('overview', f, v)}
            updateInvestigators={(f, v) => updateNestedState('investigators', f, v)}
          />
        )}
        {activeTab === 'methodology' && (
          <ClinicalTabMethodology 
            data={clinicalData.methodology || {}} 
            updateMethodology={(f, v) => updateNestedState('methodology', f, v)}
          />
        )}
        {activeTab === 'governance' && (
          <ClinicalTabGovernance 
            data={clinicalData.governance || {}} 
            updateGovernance={(f, v) => updateNestedState('governance', f, v)}
          />
        )}
        {activeTab === 'ethics' && (
          <ClinicalTabEthics 
            data={clinicalData.ethics || {}} 
            updateEthics={(f, v) => updateNestedState('ethics', f, v)}
          />
        )}
      </div>
    </div>
  );
}