import React from 'react';

export default function NonClinicalTabGovernance({ data, updateGovernance }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* SECTION E: PRIVACY AND CONFIDENTIALITY PROTECTIONS */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>
            Section E: Privacy, Confidentiality & Data Management
          </h3>
        </div>

        {/* 5.1 Privacy Safeguards */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
            5.1 What precautions will be taken to ensure confidentiality, privacy, and data protection? *
          </label>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.35rem 0' }}>
            Data should be secured against unauthorized access and comply with data protection legislation. Where possible, anonymize data; otherwise maintain strict confidentiality.
          </p>
          <textarea 
            rows={4} 
            value={data.privacyPrecautions || ''} 
            onChange={e => updateGovernance('privacyPrecautions', e.target.value)} 
            placeholder="e.g., Using pseudonymized ID codes instead of real names; storing encrypted files on password-protected institutional cloud drives..." 
            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} 
          />
        </div>

        {/* 5.2 Existing Records Secondary Data */}
        <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>5.2 Using Existing Records Containing Personal Data? *</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}><input type="radio" checked={data.usingExistingData === 'Yes'} onChange={() => updateGovernance('usingExistingData', 'Yes')} style={{ marginRight: '0.3rem' }} /> Yes (Fill details below)</label>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem' }}><input type="radio" checked={data.usingExistingData === 'No'} onChange={() => updateGovernance('usingExistingData', 'No')} style={{ marginRight: '0.3rem' }} /> No / N/A</label>
            </div>
          </div>

          {data.usingExistingData === 'Yes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>5.2.1 Source of the Data</label>
                  <input type="text" placeholder="e.g., Registrar academic transcripts, public records..." value={data.dataSource || ''} onChange={e => updateGovernance('dataSource', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>5.2.2 Full Details of Personal Data Types Used</label>
                  <input type="text" placeholder="e.g., Student GPA, age, course enrollment..." value={data.dataTypes || ''} onChange={e => updateGovernance('dataTypes', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                </div>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>5.2.3 Are data sensitive (e.g., sexual preference, health status, criminal activity)?</span>
                <label style={{ marginRight: '1rem', fontSize: '0.8rem' }}><input type="radio" checked={data.isSensitive === 'Yes'} onChange={() => updateGovernance('isSensitive', 'Yes')} /> Yes (Requires enhanced encryption)</label>
                <label style={{ fontSize: '0.8rem' }}><input type="radio" checked={data.isSensitive === 'No'} onChange={() => updateGovernance('isSensitive', 'No')} /> No</label>
              </div>
            </div>
          )}
        </div>

        {/* 5.3 Data Access & Sharing */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>5.3.1 Who will have access to data?</label>
            <input type="text" placeholder="e.g., PI, Co-PI, and assigned supervisor only..." value={data.dataAccessWho || ''} onChange={e => updateGovernance('dataAccessWho', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>5.3.2 How will data be transferred/transmitted?</label>
            <input type="text" placeholder="e.g., Secure institutional cloud sync, encrypted USB..." value={data.dataTransferMode || ''} onChange={e => updateGovernance('dataTransferMode', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.25rem' }}>5.3.3 How will data be secured while in transit?</label>
            <input type="text" placeholder="e.g., WPA3 TLS 1.3 encryption, password protection..." value={data.transitSecurity || ''} onChange={e => updateGovernance('transitSecurity', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
        </div>

        {/* 5.4 Dissemination & 5.5 Participant Access */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>5.4.2 Intention for Publication *</span>
              <label style={{ marginRight: '1rem', fontSize: '0.85rem' }}><input type="radio" checked={data.publication === 'Yes'} onChange={() => updateGovernance('publication', 'Yes')} /> Yes</label>
              <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.publication === 'No'} onChange={() => updateGovernance('publication', 'No')} /> No</label>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>5.4.3 Presentation Track *</span>
              <label style={{ marginRight: '0.75rem', fontSize: '0.85rem' }}><input type="radio" checked={data.presentation === 'Oral'} onChange={() => updateGovernance('presentation', 'Oral')} /> Oral</label>
              <label style={{ marginRight: '0.75rem', fontSize: '0.85rem' }}><input type="radio" checked={data.presentation === 'Poster'} onChange={() => updateGovernance('presentation', 'Poster')} /> Poster</label>
              <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.presentation === 'No Presentation'} onChange={() => updateGovernance('presentation', 'No Presentation')} /> No Presentation</label>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>5.4.1 State how data/results will be disseminated *</label>
            <input type="text" placeholder="e.g., Journal articles, conference proceedings, PhD thesis submission..." value={data.disseminateHow || ''} onChange={e => updateGovernance('disseminateHow', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>5.5 Arrangements for participants' access to results *</label>
            <input type="text" placeholder="e.g., Summary report emailed to participants upon request; website dashboard..." value={data.participantAccess || ''} onChange={e => updateGovernance('participantAccess', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>
        </div>

      </section>

    </div>
  );
}