import React from 'react';
import { Plus, Trash2, Info, Calendar } from 'lucide-react';

export default function NonClinicalTabOverview({ data, investigators, updateOverview, updateInvestigators }) {
  const pi = investigators.pi || { name: '', school: '', faculty: '', phone: '', email: '' };
  const coInvestigators = investigators.coInvestigators || [];

  const handlePIChange = (field, value) => {
    updateInvestigators('pi', { ...pi, [field]: value });
  };

  const handleAddCoInvestigator = () => {
    const updated = [...coInvestigators, { name: '', school: '', faculty: '', phone: '', email: '' }];
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
      
      {/* SECTION A: GENERAL INFORMATION */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>
            Section A: General Information & Researcher Details
          </h3>
        </div>

        <div style={{ padding: '0.85rem 1rem', backgroundColor: '#eff6ff', borderRadius: '4px', border: '1px solid #bfdbfe', marginBottom: '1.5rem', display: 'flex', gap: '0.75rem', alignItems: 'flex-start', fontSize: '0.85rem', color: '#1e3a8a' }}>
          <Info size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
          <div>
            <strong>Please note institutional rules for Principal Investigator (PI):</strong>
            <ul style={{ margin: '0.25rem 0 0 0', paddingLeft: '1.25rem' }}>
              <li><strong>UTM staff:</strong> PI must be the applicant.</li>
              <li><strong>For student applications:</strong> PI refers to the supervisor who is a UTM staff member.</li>
              <li><strong>External applications:</strong> A UTM staff member must be included as a Co-Principal Investigator.</li>
            </ul>
          </div>
        </div>

        {/* 1.1 Research Title */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.35rem' }}>1.1 Research Title *</label>
          <input 
            type="text" 
            placeholder="Enter full non-clinical research title..." 
            value={data.researchTitle || ''} 
            onChange={e => updateOverview('researchTitle', e.target.value)} 
            style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--border-color, #d1d5db)', boxSizing: 'border-box' }} 
          />
        </div>

        {/* 1.2 Principal Investigator */}
        <div style={{ padding: '1.25rem', backgroundColor: 'var(--bg-app, #f9fafb)', borderRadius: '6px', border: '1px solid var(--border-color, #e5e7eb)', marginBottom: '1.5rem' }}>
          <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary, #2563eb)', fontSize: '0.95rem' }}>1.2 Principal Investigator (PI) Details *</h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>a. Name of Investigator</label>
              <input type="text" value={pi.name} onChange={e => handlePIChange('name', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>b. School</label>
              <input type="text" value={pi.school} onChange={e => handlePIChange('school', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>c. Faculty</label>
              <input type="text" value={pi.faculty} onChange={e => handlePIChange('faculty', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>d. Telephone No.</label>
              <input type="text" value={pi.phone} onChange={e => handlePIChange('phone', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.25rem' }}>e. Email Address</label>
              <input type="email" value={pi.email} onChange={e => handlePIChange('email', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
            </div>
          </div>
        </div>

        {/* 1.3 Co-Investigators */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '0.95rem' }}>1.3 Details of Co-Investigator(s)</h4>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>Please attach Curriculum Vitae (CV) for all listed team members</span>
            </div>
            <button type="button" onClick={handleAddCoInvestigator} style={{ background: '#fff', border: '1px solid var(--primary, #2563eb)', color: 'var(--primary, #2563eb)', borderRadius: '4px', fontSize: '0.8rem', padding: '0.4rem 0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
              <Plus size={14} /> Add Co-Investigator
            </button>
          </div>

          {coInvestigators.length === 0 ? (
            <div style={{ padding: '1.5rem', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '4px', border: '1px dashed #d1d5db', color: '#6b7280', fontSize: '0.85rem' }}>
              No co-investigators added. Click "+ Add Co-Investigator" if this research involves multiple researchers.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {coInvestigators.map((co, idx) => (
                <div key={idx} style={{ padding: '1.25rem', backgroundColor: '#f9fafb', borderRadius: '6px', border: '1px solid #e5e7eb', position: 'relative' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.5rem' }}>
                    <strong style={{ fontSize: '0.85rem' }}>Co-Investigator {idx + 1}</strong>
                    <button type="button" onClick={() => handleRemoveCoInvestigator(idx)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', fontWeight: 600 }}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>a. Name</label>
                      <input type="text" value={co.name} onChange={e => handleCoInvestigatorChange(idx, 'name', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>b. School</label>
                      <input type="text" value={co.school} onChange={e => handleCoInvestigatorChange(idx, 'school', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>c. Faculty</label>
                      <input type="text" value={co.faculty} onChange={e => handleCoInvestigatorChange(idx, 'faculty', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>d. Telephone No.</label>
                      <input type="text" value={co.phone} onChange={e => handleCoInvestigatorChange(idx, 'phone', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.25rem' }}>e. Email Address</label>
                      <input type="email" value={co.email} onChange={e => handleCoInvestigatorChange(idx, 'email', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 1.4 CV Attachment Check */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: '#f9fafb', padding: '0.75rem 1rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>1.4 CV of PI and Co-Investigator(s) are attached: *</span>
          <label style={{ cursor: 'pointer', fontSize: '0.85rem' }}><input type="radio" checked={data.cvAttached === 'Yes'} onChange={() => updateOverview('cvAttached', 'Yes')} style={{ marginRight: '0.3rem' }} /> Yes</label>
          <label style={{ cursor: 'pointer', fontSize: '0.85rem' }}><input type="radio" checked={data.cvAttached === 'No'} onChange={() => updateOverview('cvAttached', 'No')} style={{ marginRight: '0.3rem' }} /> No</label>
        </div>
      </section>

      {/* SECTION B: RESEARCH INFORMATION */}
      <section>
        <div style={{ borderBottom: '2px solid var(--primary, #2563eb)', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem', textTransform: 'uppercase' }}>
            Section B: Research Information & Timelines
          </h3>
        </div>

        {/* 2.1 Executive Summary & Section H Lay Summary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>2.1 Executive Summary *</label>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                {(data.execSummary || '').split(/\s+/).filter(Boolean).length} / 350 words approx.
              </span>
            </div>
            <textarea 
              rows={5}
              value={data.execSummary || ''}
              onChange={e => updateOverview('execSummary', e.target.value)}
              placeholder="Include problem statement, objectives, research methodology, expected output/outcomes/implication, and significance output..."
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 700 }}>Section H: Lay Person Summary *</label>
              <span style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                {(data.laySummary || '').split(/\s+/).filter(Boolean).length} / 150-250 words
              </span>
            </div>
            <textarea 
              rows={4}
              value={data.laySummary || ''}
              onChange={e => updateOverview('laySummary', e.target.value)}
              placeholder="Provide a brief explanation written in clear, non-technical language avoiding jargon so individuals without a background in your field can understand..."
              style={{ width: '100%', padding: '0.6rem', borderRadius: '4px', border: '1px solid #d1d5db', fontFamily: 'inherit', boxSizing: 'border-box' }}
            />
          </div>
        </div>

        {/* 2.2 - 2.5 Timelines Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>2.2 Start Date of Research *</label>
            <input type="date" value={data.startDate || ''} onChange={e => updateOverview('startDate', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem' }}>2.3 End Date of Research *</label>
            <input type="date" value={data.endDate || ''} onChange={e => updateOverview('endDate', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.2rem' }}>2.4 Proposed Start Date of Data Collection *</label>
            <span style={{ display: 'block', fontSize: '0.7rem', color: '#ef4444', marginBottom: '0.35rem' }}>Please allow at least 60 days after submission deadline</span>
            <input type="date" value={data.dataStart || ''} onChange={e => updateOverview('dataStart', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary, #2563eb)', boxSizing: 'border-box' }} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, marginBottom: '0.35rem', marginTop: '1.15rem' }}>2.5 Proposed Completion Date of Data Collection *</label>
            <input type="date" value={data.dataEnd || ''} onChange={e => updateOverview('dataEnd', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid var(--primary, #2563eb)', boxSizing: 'border-box' }} />
          </div>
        </div>

        {/* 2.6 - 2.10 Operational Parameters */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', backgroundColor: '#f9fafb', padding: '1.25rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          
          {/* 2.6 Sponsorship */}
          <div>
            <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>2.6 Is this research sponsored by any grant? *</span>
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '0.5rem' }}>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem' }}><input type="radio" checked={data.isSponsored === 'Yes'} onChange={() => updateOverview('isSponsored', 'Yes')} style={{ marginRight: '0.3rem' }} /> Yes (Please attach grant proposal / Letter of Award)</label>
              <label style={{ cursor: 'pointer', fontSize: '0.85rem' }}><input type="radio" checked={data.isSponsored === 'No'} onChange={() => updateOverview('isSponsored', 'No')} style={{ marginRight: '0.3rem' }} /> No</label>
            </div>
            {data.isSponsored === 'Yes' && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem', marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '3px solid var(--primary, #2563eb)' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>Name of the Grant</label>
                  <input type="text" value={data.grantName || ''} onChange={e => updateOverview('grantName', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>Grant Provider</label>
                  <input type="text" value={data.grantProvider || ''} onChange={e => updateOverview('grantProvider', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, marginBottom: '0.2rem' }}>Grant Amount (RM)</label>
                  <input type="number" value={data.grantAmount || ''} onChange={e => updateOverview('grantAmount', e.target.value)} style={{ width: '100%', padding: '0.4rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
                </div>
              </div>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
            <div>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>2.7 Initiation of Research *</span>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}><input type="radio" checked={data.initiation === 'Investigator-initiated'} onChange={() => updateOverview('initiation', 'Investigator-initiated')} style={{ marginRight: '0.3rem' }} /> Investigator-initiated</label>
              <label style={{ display: 'block', fontSize: '0.85rem' }}><input type="radio" checked={data.initiation === 'Industry-initiated'} onChange={() => updateOverview('initiation', 'Industry-initiated')} style={{ marginRight: '0.3rem' }} /> Industry-initiated</label>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>2.8 Proof of Collaboration Attached *</span>
              <label style={{ marginRight: '1rem', fontSize: '0.85rem' }}><input type="radio" checked={data.collabProof === 'Yes'} onChange={() => updateOverview('collabProof', 'Yes')} style={{ marginRight: '0.3rem' }} /> Yes</label>
              <label style={{ fontSize: '0.85rem' }}><input type="radio" checked={data.collabProof === 'No'} onChange={() => updateOverview('collabProof', 'No')} style={{ marginRight: '0.3rem' }} /> No / N/A</label>
            </div>
            <div>
              <span style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>2.9 Data Collection Site *</span>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}><input type="radio" checked={data.siteType === 'Single Center'} onChange={() => updateOverview('siteType', 'Single Center')} style={{ marginRight: '0.3rem' }} /> Single Center</label>
              <label style={{ display: 'block', fontSize: '0.85rem', marginBottom: '0.25rem' }}><input type="radio" checked={data.siteType === 'Multicenter'} onChange={() => updateOverview('siteType', 'Multicenter')} style={{ marginRight: '0.3rem' }} /> Multicenter</label>
              <label style={{ display: 'block', fontSize: '0.85rem' }}><input type="radio" checked={data.siteType === 'Online'} onChange={() => updateOverview('siteType', 'Online')} style={{ marginRight: '0.3rem' }} /> Online</label>
            </div>
          </div>

          {/* 2.10 Facilities */}
          <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>2.10 State what facilities will be needed and who will provide them *</label>
            <input type="text" placeholder="e.g., Computer lab provided by Faculty of Computing; Audio recording equipment provided by PI..." value={data.facilities || ''} onChange={e => updateOverview('facilities', e.target.value)} style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #d1d5db', boxSizing: 'border-box' }} />
          </div>

        </div>
      </section>

    </div>
  );
}