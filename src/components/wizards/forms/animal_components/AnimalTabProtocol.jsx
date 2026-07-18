import React from 'react';

export default function AnimalTabProtocol({ data, updateProtocol }) {
  
  const handleAnimalToggle = (animalName) => {
    const current = data.animalTypes || [];
    const updated = current.includes(animalName) ? current.filter(a => a !== animalName) : [...current, animalName];
    updateProtocol('animalTypes', updated);
  };

  const handlePermitToggle = (permitName) => {
    const current = data.permits || [];
    const updated = current.includes(permitName) ? current.filter(p => p !== permitName) : [...current, permitName];
    updateProtocol('permits', updated);
  };

  const updateCounts = (group, gender, val) => {
    const counts = data.counts || { controlMale: 0, controlFemale: 0, testMale: 0, testFemale: 0 };
    updateProtocol('counts', { ...counts, [`${group}${gender}`]: parseInt(val) || 0 });
  };

  const counts = data.counts || { controlMale: 0, controlFemale: 0, testMale: 0, testFemale: 0 };
  const controlTotal = (counts.controlMale || 0) + (counts.controlFemale || 0);
  const testTotal = (counts.testMale || 0) + (counts.testFemale || 0);
  const grandTotal = controlTotal + testTotal;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* SECTION 2: ANIMAL USE & METADATA */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>Section 2: Animal Selection & Demographics</h3>
        </div>

        {/* 2.1 Study Design Summary */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>2.1 Summary of Study Design (Flowchart & Explanation) *</label>
          <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0 0 0.35rem 0' }}>Include groupings, species, number/age used, methodology emphasizing stress/distress, and duration of experiments.</p>
          <textarea rows={4} value={data.studyDesignSummary || ''} onChange={e => updateProtocol('studyDesignSummary', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
        </div>

        {/* 2.2 Types of Animals */}
        <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem' }}>2.2 Types of Animals *</span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.5rem' }}>
            {['Rats', 'Mice', 'Hamster', 'Zebrafish', 'Guinea pigs', 'Rabbits', 'Sheeps', 'Goats', 'Non-human primates'].map(animal => (
              <label key={animal} style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <input type="checkbox" checked={(data.animalTypes || []).includes(animal)} onChange={() => handleAnimalToggle(animal)} />
                <span>{animal}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <input type="checkbox" checked={(data.animalTypes || []).includes('Others')} onChange={() => handleAnimalToggle('Others')} />
              <span>Others (Specify):</span>
            </label>
            {(data.animalTypes || []).includes('Others') && (
              <input type="text" value={data.otherAnimalType || ''} onChange={e => updateProtocol('otherAnimalType', e.target.value)} style={{ padding: '0.3rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
            )}
          </div>
        </div>

        {/* 2.3 Permits & 2.4-2.6 Metadata */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>2.3 Permits Required? (Capture, Use, Transgenic) *</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <label><input type="checkbox" checked={(data.permits || []).includes('PERHILITAN')} onChange={() => handlePermitToggle('PERHILITAN')} style={{ marginRight: '0.4rem' }} /> PERHILITAN / Wildlife</label>
              <label><input type="checkbox" checked={(data.permits || []).includes('FISHERY')} onChange={() => handlePermitToggle('FISHERY')} style={{ marginRight: '0.4rem' }} /> PERIKANAN / Fishery</label>
              <label><input type="checkbox" checked={(data.permits || []).includes('DVS')} onChange={() => handlePermitToggle('DVS')} style={{ marginRight: '0.4rem' }} /> JPV / DVS (Veterinary)</label>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>2.4 Species / Strain *</label>
              <input type="text" placeholder="e.g., Sprague Dawley" value={data.speciesStrain || ''} onChange={e => updateProtocol('speciesStrain', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>2.5 Breed *</label>
              <input type="text" placeholder="e.g., Outbred" value={data.breed || ''} onChange={e => updateProtocol('breed', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>2.6 Age / Weight *</label>
              <input type="text" placeholder="e.g., 8–10 weeks / 200g" value={data.ageWeight || ''} onChange={e => updateProtocol('ageWeight', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
            </div>
          </div>
        </div>

        {/* 2.7 Number of Animals Table */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>2.7 Demographic Allocation Matrix (Number of Animals) *</h4>
          <div style={{ border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
              <thead style={{ backgroundColor: '#f3f4f6', borderBottom: '1px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Experimental Group</th>
                  <th style={{ padding: '0.75rem' }}>Male (Jantan)</th>
                  <th style={{ padding: '0.75rem' }}>Female (Betina)</th>
                  <th style={{ padding: '0.75rem' }}>Group Total</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Control Group (Kumpulan Kawalan)</td>
                  <td style={{ padding: '0.5rem' }}><input type="number" value={counts.controlMale || ''} onChange={e => updateCounts('control', 'Male', e.target.value)} style={{ width: '80px', padding: '0.35rem', textAlign: 'center' }} /></td>
                  <td style={{ padding: '0.5rem' }}><input type="number" value={counts.controlFemale || ''} onChange={e => updateCounts('control', 'Female', e.target.value)} style={{ width: '80px', padding: '0.35rem', textAlign: 'center' }} /></td>
                  <td style={{ padding: '0.5rem', fontWeight: 700, backgroundColor: '#f9fafb' }}>{controlTotal}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem', textAlign: 'left', fontWeight: 600 }}>Test Group (Kumpulan Kajian)</td>
                  <td style={{ padding: '0.5rem' }}><input type="number" value={counts.testMale || ''} onChange={e => updateCounts('test', 'Male', e.target.value)} style={{ width: '80px', padding: '0.35rem', textAlign: 'center' }} /></td>
                  <td style={{ padding: '0.5rem' }}><input type="number" value={counts.testFemale || ''} onChange={e => updateCounts('test', 'Female', e.target.value)} style={{ width: '80px', padding: '0.35rem', textAlign: 'center' }} /></td>
                  <td style={{ padding: '0.5rem', fontWeight: 700, backgroundColor: '#f9fafb' }}>{testTotal}</td>
                </tr>
                <tr style={{ backgroundColor: '#eff6ff', fontWeight: 700 }}>
                  <td style={{ padding: '0.75rem', textAlign: 'left', color: '#1e3a8a' }}>Total Animals Enrolled</td>
                  <td style={{ padding: '0.75rem', color: '#1e3a8a' }}>{(counts.controlMale || 0) + (counts.testMale || 0)}</td>
                  <td style={{ padding: '0.75rem', color: '#1e3a8a' }}>{(counts.controlFemale || 0) + (counts.testFemale || 0)}</td>
                  <td style={{ padding: '0.75rem', fontSize: '1rem', color: '#1e3a8a' }}>{grandTotal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 2.8 Source & 2.9 Housing */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>2.8 Source of Animals *</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.85rem' }}>
              <label><input type="radio" name="src" checked={data.animalSource === 'Registered Lab Supplier'} onChange={() => updateProtocol('animalSource', 'Registered Lab Supplier')} style={{ marginRight: '0.4rem' }} /> Registered Lab Supplier</label>
              <label><input type="radio" name="src" checked={data.animalSource === 'Self import'} onChange={() => updateProtocol('animalSource', 'Self import')} style={{ marginRight: '0.4rem' }} /> Self import / importing company</label>
              <label><input type="radio" name="src" checked={data.animalSource === 'Breeding facility'} onChange={() => updateProtocol('animalSource', 'Breeding facility')} style={{ marginRight: '0.4rem' }} /> Breeding facility</label>
              <label><input type="radio" name="src" checked={data.animalSource === 'Other local institution'} onChange={() => updateProtocol('animalSource', 'Other local institution')} style={{ marginRight: '0.4rem' }} /> Other local institution</label>
            </div>
            {data.animalSource && (
              <input type="text" placeholder="Provide Supplier Name / Country of Origin details..." value={data.sourceDetails || ''} onChange={e => updateProtocol('sourceDetails', e.target.value)} style={{ width: '100%', padding: '0.4rem', marginTop: '0.5rem', borderRadius: '3px', border: '1px solid #d1d5db', fontSize: '0.8rem', boxSizing: 'border-box' }} />
            )}
          </div>

          <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>2.9 Animal Housing & Caging *</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div>
                <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>2.9.1 Type of Cage / Pen</span>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '0.2rem', fontSize: '0.85rem' }}>
                  <label><input type="radio" name="cage" checked={data.cageType === 'Plastic'} onChange={() => updateProtocol('cageType', 'Plastic')} /> Plastic</label>
                  <label><input type="radio" name="cage" checked={data.cageType === 'Metal'} onChange={() => updateProtocol('cageType', 'Metal')} /> Metal</label>
                  <label><input type="radio" name="cage" checked={data.cageType === 'Others'} onChange={() => updateProtocol('cageType', 'Others')} /> Others</label>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>Cage Dimensions</label>
                  <input type="text" placeholder="e.g., 40x25x20 cm" value={data.cageDimension || ''} onChange={e => updateProtocol('cageDimension', e.target.value)} style={{ width: '100%', padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>2.9.2 Animals per Cage</label>
                  <input type="number" placeholder="e.g., 5" value={data.animalsPerCage || ''} onChange={e => updateProtocol('animalsPerCage', e.target.value)} style={{ width: '100%', padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600 }}>2.9.3 Location Animals Kept</label>
                <input type="text" placeholder="e.g., UTM Animal House, Room 102" value={data.housingLocation || ''} onChange={e => updateProtocol('housingLocation', e.target.value)} style={{ width: '100%', padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: PROJECT CLASSIFICATION */}
      <section style={{ backgroundColor: '#eff6ff', padding: '1.25rem', borderRadius: '6px', border: '1px solid #bfdbfe' }}>
        <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '1rem', color: '#1e3a8a', textTransform: 'uppercase' }}>Section 6: Project Classification *</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.85rem', color: '#1e3a8a' }}>
          <label style={{ cursor: 'pointer' }}><input type="radio" name="pClass" checked={data.projectClass === 'A'} onChange={() => updateProtocol('projectClass', 'A')} style={{ marginRight: '0.5rem' }} /> <strong>Class A:</strong> Procedures carried out under anesthesia; animal killed without regaining consciousness.</label>
          <label style={{ cursor: 'pointer' }}><input type="radio" name="pClass" checked={data.projectClass === 'B'} onChange={() => updateProtocol('projectClass', 'B')} style={{ marginRight: '0.5rem' }} /> <strong>Class B:</strong> Purely breeding projects.</label>
          <label style={{ cursor: 'pointer' }}><input type="radio" name="pClass" checked={data.projectClass === 'C'} onChange={() => updateProtocol('projectClass', 'C')} style={{ marginRight: '0.5rem' }} /> <strong>Class C:</strong> Projects requiring animals to be killed for tissue specimens with prior experimentation.</label>
          <label style={{ cursor: 'pointer' }}><input type="radio" name="pClass" checked={data.projectClass === 'D'} onChange={() => updateProtocol('projectClass', 'D')} style={{ marginRight: '0.5rem' }} /> <strong>Class D:</strong> No impact on animals; only involves observation and data collection.</label>
          <label style={{ cursor: 'pointer' }}><input type="radio" name="pClass" checked={data.projectClass === 'E'} onChange={() => updateProtocol('projectClass', 'E')} style={{ marginRight: '0.5rem' }} /> <strong>Class E:</strong> Feeding trials over a period of time with observation of behavior, weight gain, and production.</label>
        </div>
      </section>

    </div>
  );
}