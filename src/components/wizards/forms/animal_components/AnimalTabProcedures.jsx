import React from 'react';
import { Mail, ShieldCheck } from 'lucide-react';

export default function AnimalTabProcedures({ data, updateProcedures }) {
  
  const procedureTrack = data.procedureTrack || 'Non-invasive';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* SECTION 4: PROCEDURES & ENDPOINTS */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>Section 4: Experimental Procedures & Endpoints</h3>
        </div>

        {/* Track Switcher & Endings */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--primary, #2563eb)' }}>Select Procedure Track *</span>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
              <label style={{ cursor: 'pointer', fontWeight: procedureTrack === 'Non-invasive' ? 700 : 400 }}>
                <input type="radio" checked={procedureTrack === 'Non-invasive'} onChange={() => updateProcedures('procedureTrack', 'Non-invasive')} style={{ marginRight: '0.3rem' }} />
                4.1(a) Non-Invasive Procedures
              </label>
              <label style={{ cursor: 'pointer', fontWeight: procedureTrack === 'Surgical' ? 700 : 400 }}>
                <input type="radio" checked={procedureTrack === 'Surgical'} onChange={() => updateProcedures('procedureTrack', 'Surgical')} style={{ marginRight: '0.3rem' }} />
                4.1(b) Surgical Procedures
              </label>
            </div>
          </div>

          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Indicate Endings of Animal Used *</span>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
              <label><input type="radio" name="end" checked={data.animalEnding === 'Healthy'} onChange={() => updateProcedures('animalEnding', 'Healthy')} /> Healthy</label>
              <label><input type="radio" name="end" checked={data.animalEnding === 'Permanent disability'} onChange={() => updateProcedures('animalEnding', 'Permanent disability')} /> Permanent disability</label>
              <label><input type="radio" name="end" checked={data.animalEnding === 'Death'} onChange={() => updateProcedures('animalEnding', 'Death')} /> Death (Euthanasia)</label>
            </div>
            {data.animalEnding && (
              <input type="text" placeholder="Detail post-research management or death procedure justification..." value={data.endingDetails || ''} onChange={e => updateProcedures('endingDetails', e.target.value)} style={{ width: '100%', padding: '0.35rem', marginTop: '0.5rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            )}
          </div>
        </div>

        {/* 4.1(a) NON-INVASIVE TRACK */}
        {procedureTrack === 'Non-invasive' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#fff', padding: '1.25rem', borderRadius: '6px', border: '1px solid #d1d5db', marginBottom: '1.5rem' }}>
            <h4 style={{ margin: 0, color: 'var(--primary, #2563eb)', fontSize: '0.95rem' }}>4.1(a) Non-Invasive Procedure Parameters</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>i. Detailed Procedures (Injections, Blood sampling, Biopsies, Oral gavage, Tumour induction)</label>
                <textarea rows={4} placeholder="Specify volumes, frequencies, needle sizes, dosages, and administration routes..." value={data.nonInvProcedures || ''} onChange={e => updateProcedures('nonInvProcedures', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>ii. Animal Restraint & iii. Handling Frequency</label>
                <select value={data.restraintMethod || ''} onChange={e => updateProcedures('restraintMethod', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.5rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                  <option value="">Select restraint method...</option>
                  <option value="Manual">Manual Restraint</option>
                  <option value="Mechanical">Mechanical Restraint</option>
                  <option value="Chemical/Drug">Chemical / Drug Sedation</option>
                </select>
                <input type="text" placeholder="Handling frequency (e.g., Daily, Weekly)..." value={data.handlingFreq || ''} onChange={e => updateProcedures('handlingFreq', e.target.value)} style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>iv/v. Monitoring Method & Frequency</span>
                <input type="text" placeholder="e.g., Daily visual/clinical observation & weighing..." value={data.monitoringMethod || ''} onChange={e => updateProcedures('monitoringMethod', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginTop: '0.2rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>vii. Sick Animal Management</span>
                <select value={data.sickManagement || 'Treat'} onChange={e => updateProcedures('sickManagement', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginTop: '0.2rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                  <option value="Treat">Treat (Rawat)</option>
                  <option value="Sacrifice">Sacrifice (Menamatkan hayat)</option>
                </select>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>viii. Humane Killing Method</span>
                <select value={data.humaneKilling || 'CO2 chamber'} onChange={e => updateProcedures('humaneKilling', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginTop: '0.2rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                  <option value="Cervical dislocation">Cervical dislocation</option>
                  <option value="Decapitation">Decapitation</option>
                  <option value="CO2 chamber">CO2 chamber</option>
                  <option value="Drug overdose">Drug overdose</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 4.1(b) SURGICAL TRACK */}
        {procedureTrack === 'Surgical' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#fff', padding: '1.25rem', borderRadius: '6px', border: '1px solid #d1d5db', marginBottom: '1.5rem' }}>
            <h4 style={{ margin: 0, color: 'var(--primary, #2563eb)', fontSize: '0.95rem' }}>4.1(b) Surgical Procedure Parameters</h4>
            
            <div>
              <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>i. Surgical Category *</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', fontSize: '0.8rem' }}>
                <label><input type="radio" name="sCat" checked={data.surgCategory === 'Non-survival'} onChange={() => updateProcedures('surgCategory', 'Non-survival')} /> Non-survival surgery; animal euthanized</label>
                <label><input type="radio" name="sCat" checked={data.surgCategory === 'Minor'} onChange={() => updateProcedures('surgCategory', 'Minor')} /> Minor surgery (No major body cavity penetration)</label>
                <label><input type="radio" name="sCat" checked={data.surgCategory === 'Major'} onChange={() => updateProcedures('surgCategory', 'Major')} /> Major surgery (Penetration to major body cavity)</label>
                <label><input type="radio" name="sCat" checked={data.surgCategory === 'Major impairment'} onChange={() => updateProcedures('surgCategory', 'Major impairment')} /> Major surgery resulting in permanent functional impairment</label>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>ii. Describe Surgical Procedure in Detail</label>
                <textarea rows={3} placeholder="Step-by-step surgical protocol..." value={data.surgDescription || ''} onChange={e => updateProcedures('surgDescription', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>iii. Location of Surgery Facilities</label>
                <input type="text" placeholder="e.g., Surgical Suite A, UTM Animal House" value={data.surgLocation || ''} onChange={e => updateProcedures('surgLocation', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginBottom: '0.5rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.2rem' }}>iv. Anesthesia/Analgesia (Agent, Dose, Route)</label>
                <input type="text" placeholder="e.g., Ketamine/Xylazine 90/10 mg/kg IP" value={data.anesthesiaRegimen || ''} onChange={e => updateProcedures('anesthesiaRegimen', e.target.value)} style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>v. Anesthesia Assessment & vi. Post-Surgical Pain Signs</span>
                <input type="text" placeholder="e.g., Toe pinch reflex / Monitoring for loss of appetite & restlessness..." value={data.painAssessment || ''} onChange={e => updateProcedures('painAssessment', e.target.value)} style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>vii. Post-Surgical Care & viii. Humane Killing</span>
                <input type="text" placeholder="e.g., Heating pad recovery, subcutaneous fluids / Euthanasia via CO2..." value={data.postSurgCare || ''} onChange={e => updateProcedures('postSurgCare', e.target.value)} style={{ width: '100%', padding: '0.4rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              </div>
            </div>
          </div>
        )}

        {/* 4.2 Hazardous Agents & 4.4 Other Experiments */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>4.2 Use of Hazardous Agents *</span>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <label><input type="radio" checked={data.hasHazardous === 'No'} onChange={() => updateProcedures('hasHazardous', 'No')} /> No</label>
              <label><input type="radio" checked={data.hasHazardous === 'Yes'} onChange={() => updateProcedures('hasHazardous', 'Yes')} /> Yes (IBC Approval required)</label>
            </div>
            {data.hasHazardous === 'Yes' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem', marginTop: '0.5rem', borderTop: '1px solid #e5e7eb', paddingTop: '0.5rem' }}>
                <label><input type="checkbox" checked={(data.hazardTypes || []).includes('Pathogen')} onChange={() => {}} /> Pathogenic organism</label>
                <label><input type="checkbox" checked={(data.hazardTypes || []).includes('Carcinogen')} onChange={() => {}} /> Carcinogen chemical</label>
                <label><input type="checkbox" checked={(data.hazardTypes || []).includes('Recombinant')} onChange={() => {}} /> Recombinant RNA/DNA</label>
                <label><input type="checkbox" checked={(data.hazardTypes || []).includes('Radioactive')} onChange={() => {}} /> Radioactive material</label>
                <input type="text" placeholder="Detail containment & disposal protocols..." value={data.hazardDetails || ''} onChange={e => updateProcedures('hazardDetails', e.target.value)} style={{ padding: '0.35rem', marginTop: '0.2rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              </div>
            )}
          </div>

          <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>4.4 Other Specialized Experiments</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.8rem' }}>
              <label><input type="checkbox" checked={(data.otherExp || []).includes('Implant')} onChange={() => {}} /> Implanted devices / materials</label>
              <label><input type="checkbox" checked={(data.otherExp || []).includes('Paralysis')} onChange={() => {}} /> Neuromuscular paralysis</label>
              <label><input type="checkbox" checked={(data.otherExp || []).includes('Electro')} onChange={() => {}} /> Electro-immobilization</label>
              <label><input type="checkbox" checked={(data.otherExp || []).includes('Toxicology')} onChange={() => {}} /> Toxicology testing</label>
              <label><input type="checkbox" checked={(data.otherExp || []).includes('Foetal')} onChange={() => {}} /> Foetal experimentation</label>
            </div>
            <input type="text" placeholder="Provide specialized protocol parameters if ticked..." value={data.otherExpDetails || ''} onChange={e => updateProcedures('otherExpDetails', e.target.value)} style={{ width: '100%', padding: '0.35rem', marginTop: '0.5rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>
        </div>
      </section>

      {/* SECTION 8: ENDORSEMENTS & INSTITUTIONAL ROUTING */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>Section 8: Endorsement & Approval Workflows</h3>
        </div>

        {/* PI Declarations */}
        <div style={{ padding: '1.25rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 0.75rem 0', color: 'var(--primary, #2563eb)', fontSize: '0.95rem' }}>8.1 Applicant / Principal Investigator Endorsement *</h4>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', lineHeight: 1.5, marginBottom: '1.25rem' }}>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!data.piDecA} onChange={e => updateProcedures('piDecA', e.target.checked)} style={{ marginTop: '0.2rem', accentColor: '#10b981' }} />
              <span>I certify that the information provided in this application is complete and accurate.</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!data.piDecB} onChange={e => updateProcedures('piDecB', e.target.checked)} style={{ marginTop: '0.2rem', accentColor: '#10b981' }} />
              <span>I understand that as an Investigator, I have ultimate responsibility for the conduct of UTM REC approved studies, ethical protocol performance, animal rights/welfare protection, and strict adherence to stipulations.</span>
            </label>
            <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}>
              <input type="checkbox" checked={!!data.piDecC} onChange={e => updateProcedures('piDecC', e.target.checked)} style={{ marginTop: '0.2rem', accentColor: '#10b981' }} />
              <span>I agree to comply with all UTM policies and procedures, as well as applicable regulatory requirements and laws regarding animal welfare protection in research.</span>
            </label>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px dashed #d1d5db', paddingTop: '1rem', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block' }}>Digital Signature Binding</span>
              <strong style={{ color: '#10b981', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <ShieldCheck size={16} /> PI Session Verified
              </strong>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', color: '#6b7280', display: 'block' }}>Date</span>
              <strong style={{ fontSize: '0.85rem' }}>{new Date().toISOString().split('T')[0]}</strong>
            </div>
          </div>
        </div>

        {/* HOD Endorsement Routing */}
        <div style={{ padding: '1.25rem', backgroundColor: '#eff6ff', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--primary, #2563eb)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem' }}>
            <Mail size={18} /> 8.2 Head of Department (HOD) Endorsement Routing
          </h4>
          <p style={{ fontSize: '0.85rem', color: '#4b5563', margin: '0 0 1rem 0', lineHeight: 1.4 }}>
            The institutional authority listed below will verify departmental compliance, investigator competency, and resource/facility adequacy upon application submission.
          </p>
          <div>
            <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: '#1e3a8a', marginBottom: '0.35rem' }}>
              Head of Department / Faculty Dean Official UTM Email *
            </label>
            <input 
              type="email" 
              placeholder="e.g., hod.bioscience@utm.my / dean.science@utm.my" 
              value={data.routingEmail || ''} 
              onChange={e => updateProcedures('routingEmail', e.target.value)} 
              style={{ width: '100%', padding: '0.75rem', borderRadius: '4px', border: '1px solid #93c5fd', fontSize: '0.9rem', background: '#fff', boxSizing: 'border-box' }} 
            />
            <span style={{ fontSize: '0.75rem', color: '#2563eb', display: 'block', marginTop: '0.35rem' }}>
              ⚡ Upon clicking Submit on Step 5, an automated verification token will be dispatched to this email address to fulfill Section 8.2 sign-off.
            </span>
          </div>
        </div>
      </section>

      {/* ADMIN DASHBOARD NOTE */}
      <div style={{ padding: '0.75rem 1rem', background: '#f3f4f6', borderRadius: '4px', border: '1px dashed #9ca3af', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#6b7280' }}>
        <span><strong>For UTM AREC Secretariat Use (8.3 & 8.4):</strong> Stamp, Approval Code, and Committee Sign-offs are isolated to the Admin Review Dashboard.</span>
        <span>Semakan: 04 | Tarikh Kuatkuasa: 09/03/2026</span>
      </div>

    </div>
  );
}