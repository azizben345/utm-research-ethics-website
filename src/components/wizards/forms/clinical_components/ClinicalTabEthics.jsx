import React from 'react';

const checklistItems = [
  { id: 1, text: "That the trial involves research." },
  { id: 2, text: "The purpose of the trial." },
  { id: 3, text: "The trial treatment(s) and the probability of random assignment to each treatment." },
  { id: 4, text: "The trial procedures to be followed, including all invasive procedures." },
  { id: 5, text: "The subject’s responsibilities." },
  { id: 6, text: "Those aspects of the trial that are experimental." },
  { id: 7, text: "The reasonable foreseeable risks or inconveniences to the subject, embryo, fetus, or nursing infant." },
  { id: 8, text: "The reasonably expected benefits (or explicit notice if no clinical benefit exists)." },
  { id: 9, text: "Alternative procedures or treatments available, along with potential benefits/risks." },
  { id: 10, text: "Compensation and/or treatment available to the subject in the event of trial-related injury." },
  { id: 11, text: "Anticipated prorated payment, if any, for participation." },
  { id: 12, text: "Anticipated expenses, if any, for the subject’s participation." },
  { id: 13, text: "Voluntary participation, right to refuse or withdraw at any point without penalty." },
  { id: 14, text: "Granted direct access to monitors, auditors, UTMREC, and regulators to source records." },
  { id: 15, text: "Strict confidentiality of records identifying the subject; identities remain hidden in publications." },
  { id: 16, text: "Timely disclosure of new information relevant to willingness to continue participation." },
  { id: 17, text: "Contact points for trial queries, subject rights info, and injury reporting paths." },
  { id: 18, text: "Foreseeable circumstances/reasons under which participation may be terminated." },
  { id: 19, text: "Expected duration of the subject's participation." },
  { id: 20, text: "Approximate total number of subjects involved." },
  { id: 21, text: "Source of investigational product that may be culturally unacceptable." }
];

export default function ClinicalTabEthics({ data, updateEthics }) {
  const checklist = data.consentChecklist || {};

  const handleChecklistChange = (id, value) => {
    updateEthics('consentChecklist', { ...checklist, [id]: value });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* 10.3 Informed Consent Element Checklist */}
      <section>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', marginBottom: '0.75rem' }}>
          10.3 Informed Consent Element Checklist
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
          Evaluate your attached Information Sheet against the 21 mandatory disclosure items required under UTM REC guidelines.
        </p>
        <div style={{ border: '1px solid var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-body)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem', textAlign: 'center', width: '40px' }}>No.</th>
                <th style={{ padding: '0.75rem', textAlign: 'left' }}>Informed Consent Elements</th>
                <th style={{ padding: '0.75rem', textAlign: 'center', width: '220px' }}>Compliance Option</th>
              </tr>
            </thead>
            <tbody>
              {checklistItems.map(item => (
                <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.5rem', textAlign: 'center', fontWeight: '500' }}>{item.id}</td>
                  <td style={{ padding: '0.5rem', color: 'var(--text-main)' }}>{item.text}</td>
                  <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                    <div style={{ display: 'inline-flex', gap: '0.5rem' }}>
                      {['Yes', 'No', 'N/A'].map(opt => (
                        <label key={opt} style={{ 
                          padding: '0.25rem 0.5rem', 
                          background: checklist[item.id] === opt ? 'var(--primary-light, #e0f2fe)' : 'transparent',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}>
                          <input 
                            type="radio" 
                            name={`chk-${item.id}`} 
                            checked={checklist[item.id] === opt} 
                            onChange={() => handleChecklistChange(item.id, opt)}
                            style={{ marginRight: '0.25rem' }}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 11.0 Risk Assessment Matrix */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3 style={{ borderLeft: '4px solid var(--primary-color)', paddingLeft: '0.5rem', margin: 0 }}>
          11.0 Clinical Risk Management
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>11.1 Participant Risks & Mitigations</label>
            <textarea value={data.participantRisks || ''} onChange={e => updateEthics('participantRisks', e.target.value)} rows={3} style={{ width: '100%', padding: '0.4rem' }} placeholder="Detail steps handling Physical, Psychological, Social hazards..." />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500' }}>11.2 Operator/Researcher Risks</label>
            <textarea value={data.researcherRisks || ''} onChange={e => updateEthics('researcherRisks', e.target.value)} rows={3} style={{ width: '100%', padding: '0.4rem' }} placeholder="Specify safe practices handling samples, chemicals, radiation..." />
          </div>
        </div>
      </section>

      {/* 19.0 Insurance Shield Conditional Block */}
      <section style={{ background: 'var(--bg-body)', padding: '1rem', borderRadius: '4px' }}>
        <div style={{ marginBottom: '1rem' }}>
          <span style={{ fontWeight: '600', display: 'block', marginBottom: '0.25rem' }}>
            19.1 Is insurance provided for clinical trial anomalies?
          </span>
          <label style={{ marginRight: '1rem' }}>
            <input type="radio" checked={data.hasInsurance === 'Yes'} onChange={() => updateEthics('hasInsurance', 'Yes')} /> Yes
          </label>
          <label>
            <input type="radio" checked={data.hasInsurance === 'No'} onChange={() => updateEthics('hasInsurance', 'No')} /> No
          </label>
        </div>

        {data.hasInsurance === 'Yes' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '0.5rem', paddingLeft: '0.5rem', borderLeft: '2px solid var(--primary-color)' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem' }}>19.1.1 Policy Number</label>
              <input type="text" value={data.insPolicyNo || ''} onChange={e => updateEthics('insPolicyNo', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem' }}>19.1.2 Period of Coverage</label>
              <input type="text" value={data.insPeriod || ''} onChange={e => updateEthics('insPeriod', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem' }}>19.1.3 Limit of Coverage (RM)</label>
              <input type="text" value={data.insLimit || ''} onChange={e => updateEthics('insLimit', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
            </div>
          </div>
        )}
      </section>

      {/* 21.0 - 22.0 Digital Verification Declarations */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
        <h3 style={{ fontSize: '1rem', margin: '0 0 0.25rem 0' }}>21.0 / 22.0 Ethical Confirmations & Declarations</h3>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
          <input type="checkbox" checked={!!data.piDeclaration} onChange={e => updateEthics('piDeclaration', e.target.checked)} style={{ marginTop: '0.2rem' }} />
          <span>
            <strong>Investigator Declaration:</strong> I certify that the information provided is accurate. As PI, I accept ultimate responsibility for protocol adherence, protection of participant rights, and welfare monitoring.
          </span>
        </label>
        <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer', fontSize: '0.9rem' }}>
          <input type="checkbox" checked={!!data.deanDeclaration} onChange={e => updateEthics('deanDeclaration', e.target.checked)} style={{ marginTop: '0.2rem' }} />
          <span>
            <strong>Management Verification:</strong> I confirm this department holds adequate structural resources, facilities, and certified investigator competencies to ensure execution within ethical parameters.
          </span>
        </label>
      </section>
    </div>
  );
}