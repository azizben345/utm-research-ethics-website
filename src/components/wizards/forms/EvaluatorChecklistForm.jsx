import React, { useState } from 'react';

// This configuration allows you to easily add/remove questions to match your Excel sheets exactly.
const EVALUATION_CONFIG = {
  'Clinical Research Ethics': {
    type: 'checklist',
    sections: [
      {
        title: 'General Information',
        questions: [
          { id: 'c1', label: 'Study title is appropriate' },
          { id: 'c2', label: 'Investigator details listed' },
          { id: 'c3', label: 'Summary of facilities/expertise included' }
        ]
      },
      {
        title: 'Study Proposal & Protocol',
        questions: [
          { id: 'c4', label: 'Objectives are clear' },
          { id: 'c5', label: 'Methodology clearly explained' }
        ]
      }
    ]
  },
  'Non-Clinical Research Ethics': {
    type: 'checklist',
    sections: [
      {
        title: 'General Information',
        questions: [
          { id: 'nc1', label: 'Research title is appropriate' },
          { id: 'nc2', label: 'Investigator details listed' },
          { id: 'nc3', label: 'CVs attached' }
        ]
      },
      {
        title: 'Research Methodology',
        questions: [
          { id: 'nc4', label: 'Executive summary clear' },
          { id: 'nc5', label: 'Research instruments validated' }
        ]
      }
    ]
  },
  'Animal Research Ethics': {
    type: 'rating',
    questions: [
      { id: 'a1', label: 'Purpose of using animals benefits mankind' },
      { id: 'a2', label: 'Protocols for stress/distress prevention' },
      { id: 'a3', label: 'Anasthesia and analgesia sufficient' },
      { id: 'a4', label: 'Humane endpoint (PTS) justified' }
    ],
    options: ['A', 'B', 'C', 'E', 'NA'] // A=Good, B=Requires Info, C=Minimally explained, E=Not stated
  }
};

export default function EvaluatorChecklistForm({ formApplied, onSubmit }) {
  const [data, setData] = useState({});
  const config = EVALUATION_CONFIG[formApplied] || EVALUATION_CONFIG['Non-Clinical Research Ethics'];

  const handleChange = (id, value) => {
    setData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="card" style={{ padding: '1.5rem' }}>
      <h3>Evaluation Form: {formApplied}</h3>

      <p style={{ 
        color: 'var(--text-muted)', 
        fontStyle: 'italic'
      }}>* This is just for prototype and not finished.</p>
      
      {config.type === 'checklist' ? (
        config.sections.map(section => (
          <div key={section.title} style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ color: '#8b5cf6' }}>{section.title}</h4>
            {section.questions.map(q => (
              <div key={q.id} style={{ display: 'flex', gap: '1rem', marginBottom: '0.5rem', alignItems: 'center' }}>
                <span style={{ flex: 1 }}>{q.label}</span>
                {['Yes', 'No', 'N/A'].map(opt => (
                  <button key={opt} onClick={() => handleChange(q.id, opt)} className={`btn ${data[q.id] === opt ? 'btn-primary' : 'btn-outline'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            ))}
          </div>
        ))
      ) : (
        config.questions.map(q => (
          <div key={q.id} style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontWeight: 600 }}>{q.label}</label>
            <div style={{ display: 'flex', gap: '0.3rem' }}>
              {config.options.map(opt => (
                <button key={opt} onClick={() => handleChange(q.id, opt)} className={`btn ${data[q.id] === opt ? 'btn-primary' : 'btn-outline'}`}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))
      )}

      {/* FIXED: Comment field logic */}
      <div style={{ marginTop: '1.5rem' }}>
        <label style={{ display: 'block', fontWeight: 600, marginBottom: '0.5rem' }}>Overall Comments / Revision Requests</label>
        <textarea 
          className="form-control" 
          style={{ width: '100%', height: '100px', padding: '0.5rem' }} 
          value={data.overallComments || ''} 
          onChange={e => handleChange('overallComments', e.target.value)} 
          placeholder="Enter additional feedback for the applicant here..."
        />
      </div>

      <button className="btn btn-success" style={{ width: '100%', marginTop: '1rem' }} onClick={() => onSubmit(data)}>
        Submit Final Evaluation
      </button>
    </div>
  );
}