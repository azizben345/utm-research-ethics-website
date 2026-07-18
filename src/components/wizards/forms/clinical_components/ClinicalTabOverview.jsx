import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

export default function ClinicalTabOverview({ data, investigators, updateOverview, updateInvestigators }) {
  const pi = investigators.pi || { name: '', school: '', faculty: '', phone: '', email: '', mmc: '', gcp: '' };
  const coInvestigators = investigators.coInvestigators || [];

  const handlePIChange = (field, value) => {
    updateInvestigators('pi', { ...pi, [field]: value });
  };

  const handleAddCoInvestigator = () => {
    const updated = [...coInvestigators, { name: '', school: '', faculty: '', phone: '', email: '', mmc: '', gcp: 'No' }];
    updateInvestigators('coInvestigators', updated);
  };

  const handleCoInvestigatorChange = (index, field, value) => {
    const updated = [...coInvestigators];
    updated[index][field] = value;
    updateInvestigators('coInvestigators', updated);
  };

  const handleRemoveCoInvestigator = (index) => {
    const updated = coInvestigators.filter((_, i) => i !== index);
    updateInvestigators('coInvestigators', updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 2.0 Principal Investigator Details */}
      <section>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', marginBottom: '1rem' }}>
          2.0 Project Investigator (PI) Details
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Name of Investigator</label>
            <input type="text" value={pi.name} onChange={e => handlePIChange('name', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>School</label>
            <input type="text" value={pi.school} onChange={e => handlePIChange('school', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Faculty</label>
            <input type="text" value={pi.faculty} onChange={e => handlePIChange('faculty', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Telephone No.</label>
            <input type="text" value={pi.phone} onChange={e => handlePIChange('phone', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>Email Address</label>
            <input type="email" value={pi.email} onChange={e => handlePIChange('email', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem' }}>MMC Registration No.</label>
            <input type="text" value={pi.mmc} onChange={e => handlePIChange('mmc', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <span style={{ fontSize: '0.9rem', marginBottom: '0.25rem' }}>Trained in GCP</span>
            <div>
              <label style={{ marginRight: '1rem' }}><input type="radio" name="piGcp" checked={pi.gcp === 'Yes'} onChange={() => handlePIChange('gcp', 'Yes')} /> Yes</label>
              <label><input type="radio" name="piGcp" checked={pi.gcp === 'No'} onChange={() => handlePIChange('gcp', 'No')} /> No</label>
            </div>
          </div>
        </div>
      </section>

      {/* 3.0 Co-Investigators Registry */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'between', alignItems: 'center', marginBottom: '1rem' }}>
          <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', margin: 0 }}>
            3.0 Co-Investigator / Sub-Investigator Details
          </h3>
          <button type="button" onClick={handleAddCoInvestigator} className="btn" style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Plus size={14} /> Add Co-Investigator
          </button>
        </div>
        {coInvestigators.map((co, index) => (
          <div key={index} style={{ border: '1px solid var(--border-color)', padding: '1rem', borderRadius: '4px', marginBottom: '1rem', position: 'relative' }}>
            <button type="button" onClick={() => handleRemoveCoInvestigator(index)} style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', background: 'transparent', border: 'none', color: 'red', cursor: 'pointer' }}>
              <Trash2 size={16} />
            </button>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem' }}>Co-Investigator #{index + 1}</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>Name</label>
                <input type="text" value={co.name} onChange={e => handleCoInvestigatorChange(index, 'name', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>School</label>
                <input type="text" value={co.school} onChange={e => handleCoInvestigatorChange(index, 'school', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>Faculty</label>
                <input type="text" value={co.faculty} onChange={e => handleCoInvestigatorChange(index, 'faculty', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>Telephone No.</label>
                <input type="text" value={co.phone} onChange={e => handleCoInvestigatorChange(index, 'phone', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>Email</label>
                <input type="email" value={co.email} onChange={e => handleCoInvestigatorChange(index, 'email', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.85rem' }}>MMC Registration No.</label>
                <input type="text" value={co.mmc} onChange={e => handleCoInvestigatorChange(index, 'mmc', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.85rem', marginBottom: '0.25rem' }}>Trained in GCP</span>
                <div>
                  <label style={{ marginRight: '1rem' }}>
                    <input type="radio" checked={co.gcp === 'Yes'} onChange={() => handleCoInvestigatorChange(index, 'gcp', 'Yes')} /> Yes
                  </label>
                  <label>
                    <input type="radio" checked={co.gcp === 'No'} onChange={() => handleCoInvestigatorChange(index, 'gcp', 'No')} /> No
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* 4.0 Study Summaries & Parameters */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', marginBottom: '0.5rem' }}>
          4.0 Study Overview & Scope
        </h3>
        
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <label style={{ fontWeight: '500' }}>4.1 Executive Summary</label>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {(data.execSummary || '').split(/\s+/).filter(Boolean).length} / 350 words max
            </span>
          </div>
          <textarea 
            value={data.execSummary || ''} 
            onChange={e => updateOverview('execSummary', e.target.value)} 
            placeholder="Include the problem statement, objectives, research methodology, expected outputs/outcomes/implication..."
            rows={6} 
            style={{ width: '100%', padding: '0.5rem', fontFamily: 'inherit' }} 
          />
        </div>

        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
            <label style={{ fontWeight: '500' }}>20.0 Lay Person Summary</label>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {(data.laySummary || '').split(/\s+/).filter(Boolean).length} / 150-250 words
            </span>
          </div>
          <textarea 
            value={data.laySummary || ''} 
            onChange={e => updateOverview('laySummary', e.target.value)} 
            placeholder="Provide a brief explanation written in clear, non-technical language..."
            rows={5} 
            style={{ width: '100%', padding: '0.5rem', fontFamily: 'inherit' }} 
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem' }}>Proposed Start Date</label>
            <input type="date" value={data.startDate || ''} onChange={e => updateOverview('startDate', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem' }}>Proposed Completion Date</label>
            <input type="date" value={data.endDate || ''} onChange={e => updateOverview('endDate', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem' }}>Duration of Study</label>
            <input type="text" placeholder="e.g., 24 Months" value={data.duration || ''} onChange={e => updateOverview('duration', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem' }}>Duration of Data Collection</label>
            <input type="text" placeholder="e.g., 6 Months" value={data.dataDuration || ''} onChange={e => updateOverview('dataDuration', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
          </div>
        </div>

        {/* Technical Toggles Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', background: 'var(--bg-body)', padding: '1rem', borderRadius: '4px' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>4.8 Type of Research</span>
            <label style={{ marginRight: '1rem' }}><input type="radio" checked={data.researchType === 'Clinical Trial'} onChange={() => updateOverview('researchType', 'Clinical Trial')} /> Clinical Trial</label>
            <label><input type="radio" checked={data.researchType === 'Fundamental Research'} onChange={() => updateOverview('researchType', 'Fundamental Research')} /> Fundamental Research</label>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>4.9 Phase of Study</span>
            <select value={data.studyPhase || ''} onChange={e => updateOverview('studyPhase', e.target.value)} style={{ width: '100%', padding: '0.4rem' }}>
              <option value="">Select Phase...</option>
              <option value="Phase 1">Phase 1</option>
              <option value="Phase 2">Phase 2</option>
              <option value="Phase 3">Phase 3</option>
              <option value="Phase 4">Phase 4</option>
            </select>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>4.10 Initiative</span>
            <label style={{ marginRight: '1rem' }}><input type="radio" checked={data.initiative === 'Investigator Initiated'} onChange={() => updateOverview('initiative', 'Investigator Initiated')} /> Investigator Initiated</label>
            <label><input type="radio" checked={data.initiative === 'Industry Sponsored'} onChange={() => updateOverview('initiative', 'Industry Sponsored')} /> Industry Sponsored</label>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>4.11 Site Environment</span>
            <label style={{ marginRight: '1rem' }}><input type="radio" checked={data.siteType === 'Single Center'} onChange={() => updateOverview('siteType', 'Single Center')} /> Single Center</label>
            <label><input type="radio" checked={data.siteType === 'Multicenter'} onChange={() => updateOverview('siteType', 'Multicenter')} /> Multicenter</label>
          </div>
        </div>
      </section>
    </div>
  );
}