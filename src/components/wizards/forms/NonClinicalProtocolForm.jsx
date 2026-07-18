import React from 'react';
import { FileText, ClipboardList, Lock, ShieldCheck } from 'lucide-react';
import NonClinicalTabOverview from './nonclinical_components/NonClinicalTabOverview';
import NonClinicalTabProtocol from './nonclinical_components/NonClinicalTabProtocol';
import NonClinicalTabGovernance from './nonclinical_components/NonClinicalTabGovernance';
import NonClinicalTabEthics from './nonclinical_components/NonClinicalTabEthics';

export default function NonClinicalProtocolForm({ formData, setFormData, activeTab, setActiveTab }) {
  
  const tabs = [
    { id: 'overview', label: '1. Overview & General Info', icon: FileText },
    { id: 'protocol', label: '2. Research Protocol & Sample', icon: ClipboardList },
    { id: 'governance', label: '3. Privacy & Data Governance', icon: Lock },
    { id: 'ethics', label: '4. Consent, Risks & Declarations', icon: ShieldCheck },
  ];

  const updateNestedState = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      nonClinicalData: {
        ...prev.nonClinicalData,
        [category]: {
          ...prev.nonClinicalData?.[category],
          [field]: value
        }
      }
    }));
  };

  const nonClinicalData = formData.nonClinicalData || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Sub-Tabs Navigation Bar */}
      <div style={{ display: 'flex', borderBottom: '2px solid var(--border-color)', gap: '0.5rem', overflowX: 'auto' }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.25rem',
                border: 'none',
                background: isActive ? 'var(--bg-card, #fff)' : 'transparent',
                color: isActive ? 'var(--primary, #2563eb)' : 'var(--text-muted, #6b7280)',
                borderBottom: isActive ? '3px solid var(--primary, #2563eb)' : '3px solid transparent',
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
          <NonClinicalTabOverview 
            data={nonClinicalData.overview || {}} 
            investigators={nonClinicalData.investigators || {}}
            updateOverview={(f, v) => updateNestedState('overview', f, v)}
            updateInvestigators={(f, v) => updateNestedState('investigators', f, v)}
          />
        )}
        {activeTab === 'protocol' && (
          <NonClinicalTabProtocol 
            data={nonClinicalData.protocol || {}} 
            updateProtocol={(f, v) => updateNestedState('protocol', f, v)}
          />
        )}
        {activeTab === 'governance' && (
          <NonClinicalTabGovernance 
            data={nonClinicalData.governance || {}} 
            updateGovernance={(f, v) => updateNestedState('governance', f, v)}
          />
        )}
        {activeTab === 'ethics' && (
          <NonClinicalTabEthics 
            data={nonClinicalData.ethics || {}} 
            updateEthics={(f, v) => updateNestedState('ethics', f, v)}
          />
        )}
      </div>
    </div>
  );
}