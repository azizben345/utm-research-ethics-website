import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function NonClinicalTabEthics({ data, updateEthics }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      
      {/* SECTION F: INFORMED CONSENT */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>
            Section F: Informed Consent & Assent Workflows
          </h3>
        </div>

        {/* 6.1 Consent Workflows */}
        <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700 }}>6.1 Type of Informed Consent *</span>
              <span style={{ display: 'block', fontSize: '0.75rem', color: '#6b7280' }}>Enclose the Informed Consent Form using UTM Ethics Committee template</span>
            </div>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}><input type="radio" checked={data.consentType === 'General Participants'} onChange={() => updateEthics('consentType', 'General Participants')} style={{ marginRight: '0.3rem' }} /> General Participants</label>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}><input type="radio" checked={data.consentType === 'Vulnerable Participants'} onChange={() => updateEthics('consentType', 'Vulnerable Participants')} style={{ marginRight: '0.3rem' }} /> Vulnerable Participants</label>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.1.1 Who obtains consent?</label>
              <input type="text" placeholder="e.g., Principal Investigator..." value={data.consentWho || ''} onChange={e => updateEthics('consentWho', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.1.2 When is consent taken?</label>
              <input type="text" placeholder="e.g., Prior to survey distribution..." value={data.consentWhen || ''} onChange={e => updateEthics('consentWhen', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.1.3 Where is consent taken?</label>
              <input type="text" placeholder="e.g., Online consent form header..." value={data.consentWhere || ''} onChange={e => updateEthics('consentWhere', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.1.4 Decision time given?</label>
              <input type="text" placeholder="e.g., 24 hours to review..." value={data.consetTime || ''} onChange={e => updateEthics('consetTime', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.1.5 Procedure for obtaining informed consent</label>
              <textarea rows={2} placeholder="Explain steps taken to explain study and record consent..." value={data.consentProcess || ''} onChange={e => updateEthics('consentProcess', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.1.6 Reason if impossible to obtain consent (if N/A, write N/A)</label>
              <textarea rows={2} placeholder="Full justification required if waiving consent..." value={data.noConsentReason || 'N/A'} onChange={e => updateEthics('noConsentReason', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>6.1.7 Informed Consent Form attached (using UTM template)? *</span>
            <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.icfAttached === 'Yes'} onChange={() => updateEthics('icfAttached', 'Yes')} /> Yes</label>
            <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.icfAttached === 'No'} onChange={() => updateEthics('icfAttached', 'No')} /> No</label>
          </div>
        </div>

        {/* 6.2 Assent Consent (<=18 years) */}
        <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>6.2 Assent Consent (Participants 18 years old and below)? *</span>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}><input type="radio" checked={data.requiresAssent === 'Yes'} onChange={() => updateEthics('requiresAssent', 'Yes')} style={{ marginRight: '0.3rem' }} /> Yes (Complete below)</label>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem' }}><input type="radio" checked={data.requiresAssent === 'No'} onChange={() => updateEthics('requiresAssent', 'No')} style={{ marginRight: '0.3rem' }} /> No / N/A</label>
            </div>
          </div>

          {data.requiresAssent === 'Yes' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.2.1 Who obtains child assent?</label>
                  <input type="text" value={data.assentWho || ''} onChange={e => updateEthics('assentWho', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.2.2 When obtained?</label>
                  <input type="text" value={data.assentWhen || ''} onChange={e => updateEthics('assentWhen', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.2.3 Where obtained?</label>
                  <input type="text" value={data.assentWhere || ''} onChange={e => updateEthics('assentWhere', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.2.4 Both parents/guardians present?</span>
                  <label style={{ marginRight: '1rem', fontSize: '0.8rem' }}><input type="radio" checked={data.parentsPresent === 'Yes'} onChange={() => updateEthics('parentsPresent', 'Yes')} /> Yes</label>
                  <label style={{ fontSize: '0.8rem' }}><input type="radio" checked={data.parentsPresent === 'No'} onChange={() => updateEthics('parentsPresent', 'No')} /> No</label>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>6.2.5 Rationale if only one parent will consent</label>
                  <input type="text" placeholder="Explain why single parental consent is sufficient..." value={data.singleParentRationale || ''} onChange={e => updateEthics('singleParentRationale', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* SECTION G: BENEFIT AND RISK OF THE RESEARCH */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>
            Section G: Benefit & Risk Assessment Matrix
          </h3>
        </div>

        {/* 7.1 & 7.2 Benefits */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>7.1 Expected benefits to participants *</label>
            <textarea rows={3} placeholder="Direct benefits, knowledge gained, or state 'No direct benefit'..." value={data.participantBenefits || ''} onChange={e => updateEthics('participantBenefits', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>7.2 Expected benefits to researchers / society *</label>
            <textarea rows={3} placeholder="Academic publication, contribution to software engineering literature..." value={data.researcherBenefits || ''} onChange={e => updateEthics('researcherBenefits', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>

        {/* 7.3 Stress / Discomfort / Privacy Hazards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>7.3 Will the study cause psychological stress / pain / discomfort? *</span>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.5rem' }}>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem' }}><input type="radio" checked={data.causesStress === 'Yes'} onChange={() => updateEthics('causesStress', 'Yes')} style={{ marginRight: '0.3rem' }} /> Yes (Specify precautions taken to minimize below)</label>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem' }}><input type="radio" checked={data.causesStress === 'No'} onChange={() => updateEthics('causesStress', 'No')} style={{ marginRight: '0.3rem' }} /> No</label>
            </div>
            {data.causesStress === 'Yes' && (
              <textarea rows={2} placeholder="Specify precautions taken to minimize stress/pain/discomfort/risk..." value={data.stressPrecautions || ''} onChange={e => updateEthics('stressPrecautions', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #ef4444', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>7.3.1 Will procedure duration cause minimal stress (esp. for children)? *</span>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem' }}><input type="radio" checked={data.minimalStressDuration === 'Yes'} onChange={() => updateEthics('minimalStressDuration', 'Yes')} /> Yes</label>
                <label style={{ fontSize: '0.8rem' }}><input type="radio" checked={data.minimalStressDuration === 'No'} onChange={() => updateEthics('minimalStressDuration', 'No')} /> No</label>
              </div>
              {data.minimalStressDuration === 'Yes' && (
                <input type="text" placeholder="Specify duration accommodations..." value={data.durationDetails || ''} onChange={e => updateEthics('durationDetails', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '3px', border: '1px solid #d1d5db', fontSize: '0.75rem' }} />
              )}
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>7.3.2 Will study involve &gt;minimal privacy risks (e.g. illegal/sexual/substance topics)? *</span>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem' }}><input type="radio" checked={data.highPrivacyRisk === 'Yes'} onChange={() => updateEthics('highPrivacyRisk', 'Yes')} /> Yes</label>
                <label style={{ fontSize: '0.8rem' }}><input type="radio" checked={data.highPrivacyRisk === 'No'} onChange={() => updateEthics('highPrivacyRisk', 'No')} /> No</label>
              </div>
              {data.highPrivacyRisk === 'Yes' && (
                <input type="text" placeholder="Specify topic and safeguards..." value={data.privacyRiskDetails || ''} onChange={e => updateEthics('privacyRiskDetails', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '3px', border: '1px solid #ef4444', fontSize: '0.75rem' }} />
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>7.3.3 State overall risks to participants and how managed *</label>
            <textarea rows={2} placeholder="Summary of potential participant risks and concrete management strategies..." value={data.manageParticipantRisks || ''} onChange={e => updateEthics('manageParticipantRisks', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>

        {/* 7.4 Minority Groups & 7.5 Researcher Risks */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>7.4 Participants from minority / culturally identifiable / disadvantaged group (e.g. Orang Asli)? *</span>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.minorityGroup === 'Yes'} onChange={() => updateEthics('minorityGroup', 'Yes')} /> Yes</label>
              <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.minorityGroup === 'No'} onChange={() => updateEthics('minorityGroup', 'No')} /> No</label>
            </div>
            {data.minorityGroup === 'Yes' && (
              <input type="text" placeholder="Specify group and cultural approval obtained..." value={data.minorityDetails || ''} onChange={e => updateEthics('minorityDetails', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '0.8rem', boxSizing: 'border-box' }} />
            )}
          </div>

          <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>7.5 State risks to researchers and how managed *</label>
            <textarea rows={3} placeholder="e.g., Ergonomic strain, field safety; managed via breaks and pairing..." value={data.researcherRisks || ''} onChange={e => updateEthics('researcherRisks', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>

        {/* 7.6 - 7.8 Financials & Auditing */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>7.6 Reimbursement to participant? *</span>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.reimbursement === 'Yes'} onChange={() => updateEthics('reimbursement', 'Yes')} /> Yes</label>
                <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.reimbursement === 'No'} onChange={() => updateEthics('reimbursement', 'No')} /> No</label>
              </div>
              {data.reimbursement === 'Yes' && (
                <input type="text" placeholder="Specify amount e.g. RM15 e-voucher..." value={data.reimburseDetails || ''} onChange={e => updateEthics('reimburseDetails', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '3px', border: '1px solid #d1d5db', fontSize: '0.8rem' }} />
              )}
            </div>

            <div>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>7.7 Researchers financial interest / affiliation? *</span>
              <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.financialInterest === 'Yes'} onChange={() => updateEthics('financialInterest', 'Yes')} /> Yes (Include note on info sheet)</label>
                <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.financialInterest === 'No'} onChange={() => updateEthics('financialInterest', 'No')} /> No</label>
              </div>
              {data.financialInterest === 'Yes' && (
                <input type="text" placeholder="Specify financial conflicts..." value={data.conflictDetails || ''} onChange={e => updateEthics('conflictDetails', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '3px', border: '1px solid #ef4444', fontSize: '0.8rem' }} />
              )}
            </div>
          </div>

          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>
              7.8 Monitoring, Auditing or Inspection Measures *
            </label>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.35rem 0' }}>
              Describe measures to ensure participant safety, protocol compliance, and proper handling of adverse events.
            </p>
            <textarea rows={2} placeholder="e.g., Monthly supervisory audits, compliance reviews by UTM REC..." value={data.monitoringMeasures || ''} onChange={e => updateEthics('monitoringMeasures', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>
      </section>

      {/* DECLARATIONS & INSTITUTIONAL ROUTING */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>
            Declarations & Institutional Endorsement
          </h3>
        </div>

        {/* PI Declarations (a-d) */}
        <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-app, #f9fafb)', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--primary, #2563eb)', fontSize: '0.95rem' }}>Declaration by Principal Investigator *</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!data.piDecA} onChange={e => updateEthics('piDecA', e.target.checked)} style={{ marginTop: '0.2rem', accentColor: '#10b981' }} />
              <span><strong>a.</strong> I certify that the information provided in this application is complete and accurate.</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!data.piDecB} onChange={e => updateEthics('piDecB', e.target.checked)} style={{ marginTop: '0.2rem', accentColor: '#10b981' }} />
              <span><strong>b.</strong> I understand that as an Investigator, I have ultimate responsibility for the conduct of UTM REC approved studies, the ethical performance of protocols, the protection of the rights and welfare of human subjects, and strict adherence to the study’s protocol and any stipulation imposed by UTM REC.</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!data.piDecC} onChange={e => updateEthics('piDecC', e.target.checked)} style={{ marginTop: '0.2rem', accentColor: '#10b981' }} />
              <span><strong>c.</strong> I agree to comply with all UTM’s policies and procedures, as well as with all applicable regulatory requirements and laws, regarding the protection of human participants in research.</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!data.piDecD} onChange={e => updateEthics('piDecD', e.target.checked)} style={{ marginTop: '0.2rem', accentColor: '#10b981' }} />
              <span><strong>d.</strong> I acknowledge and understand that no data collection, recruitment, or research-related activities involving human participants are permitted prior to obtaining formal ethics approval from UTM REC. I further understand that failure to comply with this requirement may result in the withdrawal of ethics approval.</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px dashed #d1d5db', paddingTop: '1rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block' }}>Digital Signature Status</span>
              <strong style={{ color: '#10b981', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={16} /> Bound to Active Session
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block' }}>Date</span>
              <strong style={{ fontSize: '0.85rem' }}>{new Date().toISOString().split('T')[0]}</strong>
            </div>
          </div>
        </div>

        {/* Dean Verification Routing */}
        <div style={{ padding: '1.25rem', backgroundColor: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary, #2563eb)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
            <Mail size={18} /> Verification By Dean / Deputy Dean / Chair of School / Director
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#4b5563', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
            In accordance with official guidelines, the institutional authority below will verify departmental compliance, researcher qualification, and resource adequacy upon application submission.
          </p>
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#1e3a8a', marginBottom: '0.35rem' }}>
              Supervisor (for students) / Dean Official UTM Email *
            </label>
            <input 
              type="email" 
              placeholder="e.g., dean.computing@utm.my / supervisor@utm.my" 
              value={data.routingEmail || ''} 
              onChange={e => updateEthics('routingEmail', e.target.value)} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #93c5fd', fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' }} 
            />
            <span style={{ fontSize: '0.75rem', color: '#2563eb', display: 'block', marginTop: '0.35rem' }}>
              ⚡ Upon clicking Submit on Step 5, an automated verification link will be dispatched to this email address to complete the institutional verification sign-off.
            </span>
          </div>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <div style={{ padding: '0.75rem 1rem', background: '#f3f4f6', borderRadius: '4px', border: '1px dashed #9ca3af', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#6b7280' }}>
        <span><strong>For UTM REC Use:</strong> Stamp and Received Date are isolated to the Secretariat Admin Dashboard.</span>
        <span>Mukasurat / 1 | Pindaan: 4 | Tarikh: 01/07/2026</span>
      </div>

    </div>
  );
}