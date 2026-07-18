import React from 'react';

export default function NonClinicalTabProtocol({ data, updateProtocol }) {
  
  const handleInstrumentToggle = (instrumentName) => {
    const current = data.instruments || {};
    const existing = current[instrumentName];
    if (existing) {
      const updated = { ...current };
      delete updated[instrumentName];
      updateProtocol('instruments', updated);
    } else {
      updateProtocol('instruments', { ...current, [instrumentName]: 'Physical' });
    }
  };

  const handleInstrumentModeChange = (instrumentName, mode) => {
    const current = data.instruments || {};
    updateProtocol('instruments', { ...current, [instrumentName]: mode });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* SECTION C: RESEARCH PROPOSAL AND PROTOCOL */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>
            Section C: Research Proposal & Protocol Architecture
          </h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>3.1 Purpose & Objectives of Research *</label>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.35rem 0' }}>State the objectives, research questions, and specific hypothesis to be tested.</p>
            <textarea rows={4} value={data.objectives || ''} onChange={e => updateProtocol('objectives', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>3.2 Research Methodology *</label>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.35rem 0' }}>State the nature of research including design and methods in detail that align with objectives.</p>
            <textarea rows={5} value={data.methodology || ''} onChange={e => updateProtocol('methodology', e.target.value)} style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>

        {/* 3.3 Research Design & 3.4 Instruments Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>3.3 Type of Research Design *</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
              {['Experimental / Treatment / Intervention / Action Research', 'Site Survey / Fieldwork', 'Case Study', 'Ethnography', 'Phenomenology', 'Narrative'].map((design, i) => (
                <label key={i} style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: '0.4rem' }}>
                  <input type="radio" name="resDesign" checked={data.designType === design} onChange={() => updateProtocol('designType', design)} style={{ marginTop: '0.15rem' }} />
                  <span>{design}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>3.4 Type of Instruments & Delivery Mode *</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'Focus Group Interview Protocol', label: 'Focus Group Interview Protocol' },
                { id: 'Individual Interview Protocol', label: 'Individual Interview Protocol' },
                { id: 'Treatment/ Intervention Protocol', label: 'Treatment / Intervention Protocol' },
                { id: 'Questionnaire', label: 'Questionnaire / Survey Instrument' }
              ].map((inst) => {
                const isSelected = !!(data.instruments && data.instruments[inst.id]);
                return (
                  <div key={inst.id} style={{ padding: '0.5rem', background: isSelected ? '#eff6ff' : 'transparent', borderRadius: '4px', border: isSelected ? '1px solid #bfdbfe' : '1px solid transparent' }}>
                    <label style={{ fontSize: '0.85rem', fontWeight: isSelected ? 600 : 400, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <input type="checkbox" checked={isSelected} onChange={() => handleInstrumentToggle(inst.id)} />
                      <span>{inst.label}</span>
                    </label>
                    {isSelected && (
                      <div style={{ display: 'flex', gap: '1rem', marginTop: '0.35rem', paddingLeft: '1.5rem', fontSize: '0.8rem' }}>
                        <label><input type="radio" checked={data.instruments[inst.id] === 'Physical'} onChange={() => handleInstrumentModeChange(inst.id, 'Physical')} style={{ marginRight: '0.2rem' }} /> Physical</label>
                        <label><input type="radio" checked={data.instruments[inst.id] === 'Online'} onChange={() => handleInstrumentModeChange(inst.id, 'Online')} style={{ marginRight: '0.2rem' }} /> Online</label>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 3.4.1 & 3.4.2 Instrument Validation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>3.4.1 Instrument Attached? *</span>
            <label style={{ marginRight: '1rem', fontSize: '0.85rem' }}><input type="radio" checked={data.instAttached === 'Yes'} onChange={() => updateProtocol('instAttached', 'Yes')} style={{ marginRight: '0.3rem' }} /> Yes</label>
            <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.instAttached === 'No'} onChange={() => updateProtocol('instAttached', 'No')} style={{ marginRight: '0.3rem' }} /> No</label>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem' }}>3.4.2 Validated by at least 2 expert reviewers? *</span>
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#6b7280', marginBottom: '0.35rem' }}>Provide justification below if deemed unnecessary</span>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.instValidated === 'Yes'} onChange={() => updateProtocol('instValidated', 'Yes')} style={{ marginRight: '0.3rem' }} /> Yes</label>
              <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.instValidated === 'No'} onChange={() => updateProtocol('instValidated', 'No')} style={{ marginRight: '0.3rem' }} /> No (Requires Justification)</label>
            </div>
            {data.instValidated === 'No' && (
              <input type="text" placeholder="Justification why expert validation is unnecessary..." value={data.validationJustification || ''} onChange={e => updateProtocol('validationJustification', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '0.8rem', boxSizing: 'border-box' }} />
            )}
          </div>
        </div>

        {/* 3.5 & 3.6 Collection logistics and Analysis */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>3.5.1 How will data be collected?</label>
            <input type="text" placeholder="e.g., Google Forms survey, audio recording..." value={data.collectHow || ''} onChange={e => updateProtocol('collectHow', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>3.5.2 Where will data be collected?</label>
            <input type="text" placeholder="e.g., UTM lecture halls, remote via Teams..." value={data.collectWhere || ''} onChange={e => updateProtocol('collectWhere', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>3.5.3 When will data be collected?</label>
            <input type="text" placeholder="e.g., Weekdays 9am-5pm during Q3..." value={data.collectWhen || ''} onChange={e => updateProtocol('collectWhen', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>3.5.4 Who will collect the data?</label>
            <input type="text" placeholder="e.g., Principal Investigator only..." value={data.collectWho || ''} onChange={e => updateProtocol('collectWho', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>3.5.5 Using existing personal records?</span>
            <label style={{ marginRight: '0.75rem', fontSize: '0.85rem' }}><input type="radio" checked={data.useExistingRecords === 'Yes'} onChange={() => updateProtocol('useExistingRecords', 'Yes')} /> Yes</label>
            <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.useExistingRecords === 'No'} onChange={() => updateProtocol('useExistingRecords', 'No')} /> No</label>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>3.6.1 How will results be analysed?</label>
            <input type="text" placeholder="e.g., SPSS descriptive stats, NVivo thematic..." value={data.analyseHow || ''} onChange={e => updateProtocol('analyseHow', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>3.6.2 Who will analyse the results?</label>
            <input type="text" placeholder="e.g., PI and Co-Investigator 1..." value={data.analyseWho || ''} onChange={e => updateProtocol('analyseWho', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
        </div>
      </section>

      {/* SECTION D: SELECTIONS OF PARTICIPANTS */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>
            Section D: Selections of Participants & Enrollment Criteria
          </h3>
        </div>

        {/* 4.1 - 4.5 Demographics & Counts */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>4.1 Gender *</span>
            <label style={{ marginRight: '0.75rem', fontSize: '0.85rem' }}><input type="radio" checked={data.gender === 'Male'} onChange={() => updateProtocol('gender', 'Male')} /> Male</label>
            <label style={{ marginRight: '0.75rem', fontSize: '0.85rem' }}><input type="radio" checked={data.gender === 'Female'} onChange={() => updateProtocol('gender', 'Female')} /> Female</label>
            <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.gender === 'Both'} onChange={() => updateProtocol('gender', 'Both')} /> Both</label>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>4.2 Age Group *</span>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem' }}><input type="radio" checked={data.ageGroup === '18 Years and above'} onChange={() => updateProtocol('ageGroup', '18 Years and above')} /> 18 Years and above</label>
            <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.2rem' }}><input type="radio" checked={data.ageGroup === 'Below 18 Years'} onChange={() => updateProtocol('ageGroup', 'Below 18 Years')} /> Below 18 Years (Assent needed)</label>
            <label style={{ display: 'block', fontSize: '0.85rem' }}><input type="radio" checked={data.ageGroup === 'Others'} onChange={() => updateProtocol('ageGroup', 'Others')} /> Others</label>
            {data.ageGroup === 'Others' && (
              <input type="text" placeholder="Specify age range..." value={data.otherAge || ''} onChange={e => updateProtocol('otherAge', e.target.value)} style={{ width: '100%', padding: '0.3rem', marginTop: '0.25rem', fontSize: '0.75rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
            )}
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>4.3 Medical Concerns? *</span>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.hasMedicalConcerns === 'Yes'} onChange={() => updateProtocol('hasMedicalConcerns', 'Yes')} /> Yes</label>
              <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.hasMedicalConcerns === 'No'} onChange={() => updateProtocol('hasMedicalConcerns', 'No')} /> No</label>
            </div>
            {data.hasMedicalConcerns === 'Yes' && (
              <input type="text" placeholder="Type of disease/illness..." value={data.diseaseType || ''} onChange={e => updateProtocol('diseaseType', e.target.value)} style={{ width: '100%', padding: '0.3rem', fontSize: '0.75rem', borderRadius: '3px', border: '1px solid #ef4444' }} />
            )}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>4.4 Expected Enrollment / Site *</label>
            <input type="number" placeholder="e.g., 50" value={data.siteEnrollment || ''} onChange={e => updateProtocol('siteEnrollment', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>4.5 Total Multi-site Enrollment *</label>
            <input type="number" placeholder="e.g., 150" value={data.totalEnrollment || ''} onChange={e => updateProtocol('totalEnrollment', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
          </div>
        </div>

        {/* 4.6 Rationale & 4.7 Vulnerable Groups */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>4.6 Rationale for Selection of Participants *</label>
          <textarea rows={2} value={data.selectionRationale || ''} onChange={e => updateProtocol('selectionRationale', e.target.value)} placeholder="Why is this specific demographic target group appropriate for answering your research question?" style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box', marginBottom: '1rem' }} />

          <div style={{ backgroundColor: '#fef2f2', padding: '1.25rem', borderRadius: '6px', border: '1px solid #fca5a5' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#991b1b', marginBottom: '0.35rem' }}>
              4.7 Vulnerable Participants Involvement (Children, teenagers &lt;18, pregnant women, economically/educationally disadvantaged, decisionally impaired)? *
            </span>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.75rem' }}>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, color: '#991b1b' }}><input type="radio" checked={data.hasVulnerable === 'Yes'} onChange={() => updateProtocol('hasVulnerable', 'Yes')} style={{ marginRight: '0.3rem' }} /> Yes (Complete details below)</label>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}><input type="radio" checked={data.hasVulnerable === 'No'} onChange={() => updateProtocol('hasVulnerable', 'No')} style={{ marginRight: '0.3rem' }} /> No</label>
            </div>

            {data.hasVulnerable === 'Yes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid #fca5a5', paddingTop: '0.75rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>4.7.2 Number of Vulnerable Subjects</label>
                    <input type="number" value={data.vulnerableCount || ''} onChange={e => updateProtocol('vulnerableCount', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #fca5a5' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>4.7.3 Rationale for Vulnerable Group Involvement</label>
                    <input type="text" placeholder="Why must this vulnerable population be included?" value={data.vulnerableRationale || ''} onChange={e => updateProtocol('vulnerableRationale', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #fca5a5' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>4.7.4 State Additional Safeguards to Protect Rights and Welfare</label>
                  <textarea rows={2} placeholder="e.g., Parental presence required, simplified language consent, right to stop without explanation..." value={data.vulnerableSafeguards || ''} onChange={e => updateProtocol('vulnerableSafeguards', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #fca5a5', fontFamily: 'inherit', boxSizing: 'border-box' }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4.8 - 4.10 Criteria, Recruitment, Endpoints */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>4.8.1 Inclusion Criteria *</label>
              <textarea rows={3} placeholder="List specific attributes required to participate..." value={data.inclusionCriteria || ''} onChange={e => updateProtocol('inclusionCriteria', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>4.8.2 Exclusion Criteria *</label>
              <textarea rows={3} placeholder="List attributes that disqualify potential subjects..." value={data.exclusionCriteria || ''} onChange={e => updateProtocol('exclusionCriteria', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>4.9 How will potential participants be identified & recruited? *</label>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.35rem 0' }}>Specify all channels intended to advertise to participants (e.g., email blasts, WhatsApp groups, campus posters).</p>
            <textarea rows={2} value={data.recruitmentChannels || ''} onChange={e => updateProtocol('recruitmentChannels', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>4.10 Results / Endpoints to be measured or noted *</label>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.35rem 0' }}>Specify what outcomes you intend to assess, how they will be evaluated, and criteria for recording these results.</p>
            <textarea rows={3} value={data.endpoints || ''} onChange={e => updateProtocol('endpoints', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>
      </section>

    </div>
  );
}