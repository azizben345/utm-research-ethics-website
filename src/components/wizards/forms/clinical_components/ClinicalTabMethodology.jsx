import React from 'react';

export default function ClinicalTabMethodology({ data, updateMethodology }) {
  
  const handleCheckboxChange = (field, checkedValue) => {
    const current = data[field] || [];
    const updated = current.includes(checkedValue) 
      ? current.filter(v => v !== checkedValue) 
      : [...current, checkedValue];
    updateMethodology(field, updated);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 5.0 Methodology Core */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', margin: 0 }}>
          5.0 Strategic Study Outline
        </h3>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>5.1 Statement of Aims / Purpose</label>
          <textarea value={data.objectives || ''} onChange={e => updateMethodology('objectives', e.target.value)} rows={4} style={{ width: '100%', padding: '0.5rem' }} placeholder="Clearly state the study's aims..." />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontWeight: '500' }}>5.2 Comprehensive Research Methodology</label>
          <textarea value={data.methodologyDesc || ''} onChange={e => updateMethodology('methodologyDesc', e.target.value)} rows={5} style={{ width: '100%', padding: '0.5rem' }} placeholder="Detail out steps, protocols, configurations..." />
        </div>
      </section>

      {/* 6.0 Participant Allocations */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', margin: 0 }}>
          6.0 Participant Selection Parameters
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>6.1 Gender</span>
            <label style={{ marginRight: '0.75rem' }}><input type="radio" checked={data.gender === 'Male'} onChange={() => updateMethodology('gender', 'Male')} /> Male</label>
            <label style={{ marginRight: '0.75rem' }}><input type="radio" checked={data.gender === 'Female'} onChange={() => updateMethodology('gender', 'Female')} /> Female</label>
            <label><input type="radio" checked={data.gender === 'Both'} onChange={() => updateMethodology('gender', 'Both')} /> Both</label>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>6.2 Age Cohort</span>
            <label style={{ display: 'block' }}><input type="radio" checked={data.ageGroup === '18 Years and above'} onChange={() => updateMethodology('ageGroup', '18 Years and above')} /> 18 Years and above</label>
            <label style={{ display: 'block' }}><input type="radio" checked={data.ageGroup === 'Below 18 Years'} onChange={() => updateMethodology('ageGroup', 'Below 18 Years')} /> Below 18 Years (Assent required)</label>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>6.3 Target Disease Type</label>
            <input type="text" value={data.diseaseType || ''} onChange={e => updateMethodology('diseaseType', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} placeholder="Specify targeted clinical path..." />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem' }}>6.4 Local Site Enrollment Count</label>
            <input type="number" value={data.localEnrollment || ''} onChange={e => updateMethodology('localEnrollment', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem' }}>6.5 Total Multi-site Enrollment Target</label>
            <input type="number" value={data.totalEnrollment || ''} onChange={e => updateMethodology('totalEnrollment', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem', marginBottom: '0.25rem' }}>6.6 Rationale for Participant Choice</label>
          <textarea value={data.participantRationale || ''} onChange={e => updateMethodology('participantRationale', e.target.value)} rows={2} style={{ width: '100%', padding: '0.4rem' }} />
        </div>
      </section>

      {/* 7.0 Vulnerable Groups Conditional Branch */}
      <section style={{ background: 'var(--bg-body)', padding: '1rem', borderRadius: '4px', border: '1px dashed var(--border-color)' }}>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
            7.1 Will vulnerable or disadvantaged groups be involved?
          </span>
          <label style={{ marginRight: '1rem' }}>
            <input type="radio" checked={data.involvesVulnerable === 'Yes'} onChange={() => updateMethodology('involvesVulnerable', 'Yes')} /> Yes
          </label>
          <label>
            <input type="radio" checked={data.involvesVulnerable === 'No'} onChange={() => updateMethodology('involvesVulnerable', 'No')} /> No
          </label>
        </div>

        {data.involvesVulnerable === 'Yes' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '0.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--primary-color)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem' }}>7.1.2 Expected Count of Vulnerable Members</label>
                <input type="number" value={data.vulnerableCount || ''} onChange={e => updateMethodology('vulnerableCount', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem' }}>7.1.3 Inclusion Rationale</label>
                <input type="text" value={data.vulnerableRationale || ''} onChange={e => updateMethodology('vulnerableRationale', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
              </div>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem' }}>7.1.5 Additional Safeguards to Protect Welfare & Rights</label>
              <textarea value={data.vulnerableSafeguards || ''} onChange={e => updateMethodology('vulnerableSafeguards', e.target.value)} rows={2} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
          </div>
        )}
      </section>

      {/* 7.2 - 14.0 Inclusion/Exclusion & Clinical Track */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', margin: 0 }}>
          Clinical Criteria & Procedural Lifecycles
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>7.2.1 Inclusion Criteria</label>
            <textarea value={data.inclusionCriteria || ''} onChange={e => updateMethodology('inclusionCriteria', e.target.value)} rows={3} style={{ width: '100%', padding: '0.4rem' }} placeholder="List one per line..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>7.2.3 Exclusion Criteria</label>
            <textarea value={data.exclusionCriteria || ''} onChange={e => updateMethodology('exclusionCriteria', e.target.value)} rows={3} style={{ width: '100%', padding: '0.4rem' }} placeholder="List one per line..." />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.9rem' }}>14.1 Complete Screening-through-Closeout Procedure Sequence</label>
          <textarea value={data.procedureLifecycle || ''} onChange={e => updateMethodology('procedureLifecycle', e.target.value)} rows={4} style={{ width: '100%', padding: '0.4rem' }} placeholder="Describe the chronological process participants experience..."/>
        </div>
      </section>
    </div>
  );
}