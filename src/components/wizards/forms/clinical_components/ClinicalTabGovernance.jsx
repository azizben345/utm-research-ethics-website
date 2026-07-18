import React from 'react';

export default function ClinicalTabGovernance({ data, updateGovernance }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 8.0 Privacy Foundations */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', margin: 0 }}>
          8.0 Privacy & Confidentiality Strategies
        </h3>
        <div>
          <label style={{ display: 'block', marginBottom: '0.25rem', fontSize: '0.9rem', fontWeight: '500' }}>
            8.1 What safeguards prevent unauthorized access and secure data storage?
          </label>
          <textarea value={data.privacyPrecautions || ''} onChange={e => updateGovernance('privacyPrecautions', e.target.value)} rows={3} style={{ width: '100%', padding: '0.5rem' }} placeholder="Describe anonymization tricks, database protections..." />
        </div>
      </section>

      {/* 8.2 Structured Collection */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', margin: 0 }}>
          8.2 Data Gathering Vectors
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem' }}>8.2.1 Collection Instruments / Methodology</label>
            <input type="text" value={data.collectHow || ''} onChange={e => updateGovernance('collectHow', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} placeholder="e.g., Interviews, clinical monitors" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem' }}>8.2.2 Physical / Virtual Site Location</label>
            <input type="text" value={data.collectWhere || ''} onChange={e => updateGovernance('collectWhere', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} placeholder="e.g., Hospital clinic ward 4" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem' }}>8.2.3 Date Windows / Target Intervals</label>
            <input type="text" value={data.collectWhen || ''} onChange={e => updateGovernance('collectWhen', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} placeholder="e.g., Q3 2026 - Q1 2027" />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem' }}>8.2.4 Assigned Data Operators / Personnel</label>
            <input type="text" value={data.collectWho || ''} onChange={e => updateGovernance('collectWho', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} placeholder="e.g., Registered nurse sub-investigators" />
          </div>
        </div>
      </section>

      {/* 8.3 De-identification Protocols */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', margin: 0 }}>
          8.3 Anonymization & Re-labeling Controls
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem' }}>8.3.1 De-identification Mechanism (e.g., X-Rays, Digital Images)</label>
            <textarea value={data.anonymizationMethod || ''} onChange={e => updateGovernance('anonymizationMethod', e.target.value)} rows={2} style={{ width: '100%', padding: '0.4rem' }} placeholder="Hashing names, stripping metadata..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem' }}>8.3.2 Custodian Responsible for Anonymization</label>
            <textarea value={data.anonymizationCustodian || ''} onChange={e => updateGovernance('anonymizationCustodian', e.target.value)} rows={2} style={{ width: '100%', padding: '0.4rem' }} placeholder="Name/Role of data manager..." />
          </div>
        </div>
      </section>

      {/* 9.4 - 9.7 Access & Dissemination Controls */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', margin: 0 }}>
          9.0 Transit Encryption & Asset Dissemination
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem' }}>9.4.2 Levels of Access Control</label>
            <input type="text" value={data.accessControlLevel || ''} onChange={e => updateGovernance('accessControlLevel', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} placeholder="Role-based permissions, password gates..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem' }}>9.5.2 Data Transmission Transit Security</label>
            <input type="text" value={data.transitSecurity || ''} onChange={e => updateGovernance('transitSecurity', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} placeholder="End-to-end encryption, VPN tunnels..." />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', background: 'var(--bg-body)', padding: '1rem', borderRadius: '4px' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>9.7.3 Formal Intention to Publish</span>
            <label style={{ marginRight: '1rem' }}><input type="radio" checked={data.willPublish === 'Yes'} onChange={() => updateGovernance('willPublish', 'Yes')} /> Yes</label>
            <label><input type="radio" checked={data.willPublish === 'No'} onChange={() => updateGovernance('willPublish', 'No')} /> No</label>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: '500', marginBottom: '0.25rem' }}>9.7.4 Dissemination Presentation Track</span>
            <label style={{ marginRight: '0.75rem' }}><input type="radio" checked={data.presentationTrack === 'Oral'} onChange={() => updateGovernance('presentationTrack', 'Oral')} /> Oral</label>
            <label style={{ marginRight: '0.75rem' }}><input type="radio" checked={data.presentationTrack === 'Poster'} onChange={() => updateGovernance('presentationTrack', 'Poster')} /> Poster</label>
            <label><input type="radio" checked={data.presentationTrack === 'No Presentation'} onChange={() => updateGovernance('presentationTrack', 'No Presentation')} /> None</label>
          </div>
        </div>
      </section>
    </div>
  );
}