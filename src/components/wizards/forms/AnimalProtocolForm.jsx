import React from 'react';
import { FileText, Activity, Home, ShieldCheck } from 'lucide-react';
import AnimalTabOverview from './animal_components/AnimalTabOverview';
import AnimalTabProtocol from './animal_components/AnimalTabProtocol';
import AnimalTabCare from './animal_components/AnimalTabCare';
import AnimalTabProcedures from './animal_components/AnimalTabProcedures';

export default function AnimalProtocolForm({ formData, setFormData, activeTab, setActiveTab }) {
  
  const tabs = [
    { id: 'overview', label: '1. Overview & Research Team', icon: FileText },
    { id: 'protocol', label: '2. Animal Allocation & Housing', icon: Activity },
    { id: 'care', label: '3. Care, Feed & Environment', icon: Home },
    { id: 'procedures', label: '4. Procedures & Declarations', icon: ShieldCheck },
  ];


  const updateNestedState = (category, field, value) => {
    setFormData(prev => ({
      ...prev,
      animalData: {
        ...prev.animalData,
        [category]: {
          ...prev.animalData?.[category],
          [field]: value
        }
      }
    }));
  };

  const animalData = formData.animalData || {};

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
          <AnimalTabOverview 
            data={animalData.overview || {}} 
            team={animalData.team || {}}
            updateOverview={(f, v) => updateNestedState('overview', f, v)}
            updateTeam={(f, v) => updateNestedState('team', f, v)}
          />
        )}
        {activeTab === 'protocol' && (
          <AnimalTabProtocol 
            data={animalData.protocol || {}} 
            updateProtocol={(f, v) => updateNestedState('protocol', f, v)}
          />
        )}
        {activeTab === 'care' && (
          <AnimalTabCare 
            data={animalData.care || {}} 
            updateCare={(f, v) => updateNestedState('care', f, v)}
          />
        )}
        {activeTab === 'procedures' && (
          <AnimalTabProcedures 
            data={animalData.procedures || {}} 
            updateProcedures={(f, v) => updateNestedState('procedures', f, v)}
          />
        )}
      </div>
    </div>
  );
}