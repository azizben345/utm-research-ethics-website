import React from 'react';
import { Plus, Trash2, Info } from 'lucide-react';

export default function AnimalTabOverview({ data, team, updateOverview, updateTeam }) {
  const pi = team.pi || { name: '', staffId: '', faculty: '', phoneEmail: '' };
  const competentPersons = team.competentPersons || [];
  const coResearchers = team.coResearchers || [];
  const students = team.students || [];

  const handlePIChange = (field, value) => updateTeam('pi', { ...pi, [field]: value });
  
  const addRow = (listName, emptyObj) => {
    updateTeam(listName, [...(team[listName] || []), emptyObj]);
  };

  const updateRow = (listName, index, field, value) => {
    const updated = [...(team[listName] || [])];
    updated[index] = { ...updated[index], [field]: value };
    updateTeam(listName, updated);
  };

  const removeRow = (listName, index) => {
    updateTeam(listName, (team[listName] || []).filter((_, i) => i !== index));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* APPLICATION METADATA & CATEGORIES */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>Purpose of Application *</span>
            <label style={{ marginRight: '1rem', fontSize: '0.85rem' }}><input type="radio" checked={data.appPurpose === 'Research'} onChange={() => updateOverview('appPurpose', 'Research')} /> Research (Penyelidikan)</label>
            <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.appPurpose === 'Teaching'} onChange={() => updateOverview('appPurpose', 'Teaching')} /> Teaching (Pengajaran)</label>
          </div>
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>Application Classification *</span>
            <label style={{ display: 'block', fontSize: '0.8rem', marginBottom: '0.2rem' }}><input type="radio" checked={data.classification === 'Acute'} onChange={() => updateOverview('classification', 'Acute')} /> Acute (Brief period &lt;24 hrs, followed by euthanasia/return)</label>
            <label style={{ display: 'block', fontSize: '0.8rem' }}><input type="radio" checked={data.classification === 'Chronic'} onChange={() => updateOverview('classification', 'Chronic')} /> Chronic (Maintaining animal for feeding trials, breeding, recovery surgery)</label>
          </div>
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>Purpose of Animal Use (Select primary) *</span>
          <select value={data.animalUsePurpose || ''} onChange={e => updateOverview('animalUsePurpose', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontSize: '0.85rem' }}>
            <option value="">Select animal usage purpose...</option>
            <option value="Fundamental sciences">Studies of a fundamental nature in sciences (biology, psychology, pharmacology, etc.)</option>
            <option value="Human/animal disease">Studies for scientific purposes that relate to human or animal disease or disorders</option>
            <option value="Regulatory testing">Studies for regulatory testing of products for the protection of humans, animals, or environment</option>
            <option value="Product development">Studies for the development of products or appliances for human or veterinary medicine</option>
            <option value="Education/training">Education and training of individuals in institutions or facilities</option>
            <option value="Routine management">General operating protocols (for routine management of herds/colonies)</option>
            <option value="Diagnostic testing">Diagnostic testing / Others</option>
          </select>
        </div>

        <div>
          <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.5rem' }}>Category of Procedure *</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
            <label style={{ padding: '0.5rem', background: data.procCategory === 'A' ? '#eff6ff' : '#fff', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
              <input type="radio" name="cat" checked={data.procCategory === 'A'} onChange={() => updateOverview('procCategory', 'A')} style={{ marginRight: '0.5rem' }} />
              <strong>Category A (Exempt):</strong> Involve no living materials, plants, bacteria, protozoa, autopsy tissues, or unobtrusive natural observation.
            </label>
            <label style={{ padding: '0.5rem', background: data.procCategory === 'B' ? '#eff6ff' : '#fff', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
              <input type="radio" name="cat" checked={data.procCategory === 'B'} onChange={() => updateOverview('procCategory', 'B')} style={{ marginRight: '0.5rem' }} />
              <strong>Category B (Little/No Discomfort):</strong> Short-term gentle restraint, blood sampling, safe injections, procedures under terminal anesthesia, standard euthanasia.
            </label>
            <label style={{ padding: '0.5rem', background: data.procCategory === 'C' ? '#eff6ff' : '#fff', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
              <input type="radio" name="cat" checked={data.procCategory === 'C'} onChange={() => updateOverview('procCategory', 'C')} style={{ marginRight: '0.5rem' }} />
              <strong>Category C (Minor Pain/Short Period):</strong> Blood vessel cannulation under anesthesia, minor surgery (biopsies), short stressful restraint, nonlethal chemical exposure.
            </label>
            <label style={{ padding: '0.5rem', background: data.procCategory === 'D' ? '#eff6ff' : '#fff', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
              <input type="radio" name="cat" checked={data.procCategory === 'D'} onChange={() => updateOverview('procCategory', 'D')} style={{ marginRight: '0.5rem' }} />
              <strong>Category D (Significant Stress/Pain):</strong> Major survival surgery, anatomical/physiological pain induction, prolonged physical restraint, toxicity testing with death endpoint.
            </label>
            <label style={{ padding: '0.5rem', background: data.procCategory === 'E' ? '#eff6ff' : '#fff', border: '1px solid #d1d5db', borderRadius: '4px', cursor: 'pointer' }}>
              <input type="radio" name="cat" checked={data.procCategory === 'E'} onChange={() => updateOverview('procCategory', 'E')} style={{ marginRight: '0.5rem' }} />
              <strong>Category E (Intense Pain/Unanesthetized):</strong> Paralyzing agents without anesthesia, severe terminal stress, high toxicity disruption, burn/trauma induction without anesthesia.
            </label>
          </div>
        </div>
      </section>

      {/* SECTION 1: GENERAL INFORMATION (REGISTRIES) */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>Section 1: General Information & Research Team</h3>
        </div>

        {/* PI Details */}
        <div style={{ padding: '1.25rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary, #2563eb)', fontSize: '0.95rem' }}>1. Principal Investigator (Applicant) *</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>A. Name</label>
              <input type="text" value={pi.name} onChange={e => handlePIChange('name', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>B. Staff ID / External ID</label>
              <input type="text" value={pi.staffId} onChange={e => handlePIChange('staffId', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>C. Faculty / Institute</label>
              <input type="text" value={pi.faculty} onChange={e => handlePIChange('faculty', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>D. Email & Mobile No.</label>
              <input type="text" value={pi.phoneEmail} onChange={e => handlePIChange('phoneEmail', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
          </div>
        </div>

        {/* Competent Persons Table */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.95rem' }}>4. Details of Competent Person(s) Involved *</h4>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Attach proof (e.g., Annual Veterinary Practice Cert, DVS confirmation letter, competency certs)</span>
            </div>
            <button type="button" onClick={() => addRow('competentPersons', { category: '', name: '', qualification: '', role: '', phoneEmail: '' })} style={{ background: '#fff', border: '1px solid var(--primary, #2563eb)', color: 'var(--primary, #2563eb)', borderRadius: '4px', fontSize: '0.8rem', padding: '0.35rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Plus size={14} /> Add Competent Person
            </button>
          </div>
          {competentPersons.map((cp, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr 1fr 1fr 1fr auto', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', background: '#f9fafb', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
              <input type="text" placeholder="Category" value={cp.category} onChange={e => updateRow('competentPersons', idx, 'category', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Name & Address" value={cp.name} onChange={e => updateRow('competentPersons', idx, 'name', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Qualification" value={cp.qualification} onChange={e => updateRow('competentPersons', idx, 'qualification', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Role in study" value={cp.role} onChange={e => updateRow('competentPersons', idx, 'role', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Tel & Email" value={cp.phoneEmail} onChange={e => updateRow('competentPersons', idx, 'phoneEmail', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <button type="button" onClick={() => removeRow('competentPersons', idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        {/* Co-Researchers Table */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem' }}>5. Co-Researchers & Laboratory Staff Involved</h4>
            <button type="button" onClick={() => addRow('coResearchers', { name: '', qualification: '', position: '', role: '', phoneEmail: '' })} style={{ background: '#fff', border: '1px solid var(--primary, #2563eb)', color: 'var(--primary, #2563eb)', borderRadius: '4px', fontSize: '0.8rem', padding: '0.35rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Plus size={14} /> Add Staff/Researcher
            </button>
          </div>
          {coResearchers.map((co, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr auto', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', background: '#f9fafb', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
              <input type="text" placeholder="Name & Address" value={co.name} onChange={e => updateRow('coResearchers', idx, 'name', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Qualification" value={co.qualification} onChange={e => updateRow('coResearchers', idx, 'qualification', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Position" value={co.position} onChange={e => updateRow('coResearchers', idx, 'position', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Role in study" value={co.role} onChange={e => updateRow('coResearchers', idx, 'role', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <input type="text" placeholder="Tel & Email" value={co.phoneEmail} onChange={e => updateRow('coResearchers', idx, 'phoneEmail', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <button type="button" onClick={() => removeRow('coResearchers', idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>

        {/* Students Table */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <h4 style={{ margin: 0, fontSize: '0.95rem' }}>6. Students Involved</h4>
            <button type="button" onClick={() => addRow('students', { name: '', program: 'Postgraduate', phoneEmail: '' })} style={{ background: '#fff', border: '1px solid var(--primary, #2563eb)', color: 'var(--primary, #2563eb)', borderRadius: '4px', fontSize: '0.8rem', padding: '0.35rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Plus size={14} /> Add Student
            </button>
          </div>
          {students.map((st, idx) => (
            <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr auto', gap: '0.5rem', alignItems: 'center', marginBottom: '0.5rem', background: '#f9fafb', padding: '0.5rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
              <input type="text" placeholder="Student Name & Address" value={st.name} onChange={e => updateRow('students', idx, 'name', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <select value={st.program} onChange={e => updateRow('students', idx, 'program', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }}>
                <option value="Undergraduate">Undergraduate</option>
                <option value="Postgraduate">Postgraduate</option>
              </select>
              <input type="text" placeholder="Tel & Email" value={st.phoneEmail} onChange={e => updateRow('students', idx, 'phoneEmail', e.target.value)} style={{ padding: '0.35rem', fontSize: '0.8rem', borderRadius: '3px', border: '1px solid #d1d5db' }} />
              <button type="button" onClick={() => removeRow('students', idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 7: PROJECT INFORMATION & SCIENTIFIC MERIT */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>Section 5 & 7: Project Background, Merit & Summaries</h3>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>7.i Brief Background & Justification of Study *</label>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{(data.background || '').split(/\s+/).filter(Boolean).length} / 300 words max</span>
            </div>
            <textarea rows={3} value={data.background || ''} onChange={e => updateOverview('background', e.target.value)} placeholder="Provide brief scientific context and justification..." style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>7.ii Study Objectives (General & Specific) *</label>
              <textarea rows={3} value={data.objectives || ''} onChange={e => updateOverview('objectives', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>7.iii Study Hypothesis *</label>
              <textarea rows={3} value={data.hypothesis || ''} onChange={e => updateOverview('hypothesis', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
            </div>
          </div>

          <div style={{ backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.25rem' }}>5.2 Justification of Using Animal *</label>
              <input type="text" placeholder="Why is an animal model essential? Why can't in-vitro methods be used?" value={data.animalJustification || ''} onChange={e => updateOverview('animalJustification', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>5.1 Have similar studies been undertaken previously? *</span>
                <label style={{ marginRight: '1rem', fontSize: '0.8rem' }}><input type="radio" checked={data.similarStudies === 'Yes'} onChange={() => updateOverview('similarStudies', 'Yes')} /> Yes (Attach max 3 keywords/pubs)</label>
                <label style={{ fontSize: '0.8rem' }}><input type="radio" checked={data.similarStudies === 'No'} onChange={() => updateOverview('similarStudies', 'No')} /> No</label>
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>5.3 Have alternatives to animal procedures been identified? *</span>
                <label style={{ marginRight: '1rem', fontSize: '0.8rem' }}><input type="radio" checked={data.alternativesIdentified === 'Yes'} onChange={() => updateOverview('alternativesIdentified', 'Yes')} /> Yes (Provide refs)</label>
                <label style={{ fontSize: '0.8rem' }}><input type="radio" checked={data.alternativesIdentified === 'No'} onChange={() => updateOverview('alternativesIdentified', 'No')} /> No</label>
              </div>
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Section 7: Layperson Summary *</label>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>{(data.laySummary || '').split(/\s+/).filter(Boolean).length} / 150–250 words</span>
            </div>
            <textarea rows={4} value={data.laySummary || ''} onChange={e => updateOverview('laySummary', e.target.value)} placeholder="Provide brief description in clear, non-technical language avoiding jargon so individuals without scientific background can understand..." style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }} />
          </div>
        </div>
      </section>

    </div>
  );
}