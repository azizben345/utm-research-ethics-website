import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, FileText, User, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

export default function DeanDashboard({ user, onViewProtocol }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');

  const fetchPendingEndorsements = async () => {
    try {
      const res = await fetch('http://localhost:3001/submissions?statusLabel=Drafted+(Pending+Dean+Approval)');
      const data = await res.json();
      setSubmissions(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching submissions:', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingEndorsements();
  }, []);

  // PATCH request to approve application and move to payment stage
  const handleApprove = async (id, title) => {
    try {
      const res = await fetch(`http://localhost:3001/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          statusLabel: 'Drafted (Pending Payment)',
          currentStage: 0.5 // Stage 0.5: Approved by Dean, awaiting applicant payment
        })
      });

      if (res.ok) {
        setActionMessage(`Successfully endorsed "${title}". Payment unlocked for applicant.`);
        setSubmissions(prev => prev.filter(item => item.id !== id));
        setTimeout(() => setActionMessage(''), 5000);
      }
    } catch (err) {
      console.error('Error approving submission:', err);
    }
  };

  // PATCH request to reject application back to applicant
  const handleReject = async (id, title) => {
    const reason = prompt('Please enter the reason for returning this application to the investigator:');
    if (reason === null) return; // User cancelled prompt

    try {
      await fetch(`http://localhost:3001/submissions/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          statusLabel: 'Returned by Dean (Revision Required)',
          requiresRevision: true,
          revisionMessage: `Dean Feedback: ${reason || 'Incomplete departmental requirements.'}`
        })
      });

      setActionMessage(`Returned "${title}" to applicant for revision.`);
      setSubmissions(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Error rejecting submission:', err);
    }
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Dashboard Header */}
      <div style={{ background: '#1e3a8a', color: '#fff', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <span style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', opacity: 0.8 }}>Institutional Endorsement Portal</span>
          <h1 style={{ margin: '0.25rem 0 0 0', fontSize: '1.75rem' }}>Welcome, {user ? user.name : 'Prof. Dr. Kasim'}</h1>
          <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>Faculty of Computing | Departmental Ethics Oversight</p>
        </div>
        <div style={{ background: 'rgba(255,255,255,0.1)', padding: '1rem 1.5rem', borderRadius: '6px', textAlign: 'center' }}>
          <span style={{ fontSize: '1.75rem', fontWeight: 700, display: 'block' }}>{submissions.length}</span>
          <span style={{ fontSize: '0.8rem', opacity: 0.8 }}>Pending Endorsements</span>
        </div>
      </div>

      {actionMessage && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#ecfdf5', color: '#065f46', borderRadius: '6px', border: '1px solid #10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <CheckCircle2 size={18} /><span>{actionMessage}</span>
        </div>
      )}

      {/* Submissions Queue */}
      <h2 style={{ fontSize: '1.25rem', color: '#111827', marginBottom: '1rem' }}>Applications Requiring Your Endorsement</h2>
      
      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading departmental queue...</p>
      ) : submissions.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db', color: '#6b7280' }}>
          <ShieldCheck size={48} color="#9ca3af" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ margin: '0 0 0.25rem 0', color: '#374151' }}>All Caught Up!</h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>There are currently no research applications waiting for departmental endorsement.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {submissions.map((item) => (
            <div key={item.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem' }}>
              
              {/* Left Info Column */}
              <div style={{ flex: '1 1 500px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                  <span style={{ padding: '0.25rem 0.6rem', background: '#eff6ff', color: '#1e3a8a', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>{item.id}</span>
                  <span style={{ padding: '0.25rem 0.6rem', background: '#fef3c7', color: '#b45309', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>{item.formApplied}</span>
                </div>

                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.15rem', color: '#111827' }}>{item.projectTitle}</h3>
                
                <div style={{ display: 'flex', gap: '1.5rem', color: '#6b7280', fontSize: '0.85rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><User size={14} /> {item.applicantName} ({item.applicantEmail})</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Calendar size={14} /> Submitted: {item.submissionDate}</span>
                </div>

                {/* Attached Files List */}
                <div style={{ background: '#f9fafb', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#374151', display: 'block', marginBottom: '0.35rem' }}>Attached Documentation ({item.documents?.length || 0} files):</span>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {(item.documents || []).map((doc, idx) => (
                      <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.2rem 0.5rem', background: '#fff', border: '1px solid #d1d5db', borderRadius: '3px', fontSize: '0.75rem', color: '#4b5563' }}>
                        <FileText size={12} color="#2563eb" /> {doc.type}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Action Buttons */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', minWidth: '200px' }}>
                <button 
                  type="button"
                  onClick={() => handleApprove(item.id, item.projectTitle)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.75rem 1rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                  <CheckCircle2 size={16} /> Approve & Unlock Pay
                </button>
                <button 
                  type="button"
                  onClick={() => handleReject(item.id, item.projectTitle)}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '0.6rem 1rem', background: '#fff', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
                  <XCircle size={16} /> Return for Revision
                </button>

                {/* Updated Right Column: Badge + View Protocol Button */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                    <span className="badge badge-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                        Stage {item.currentStage} of 5
                    </span>
                    
                    <div style={{ padding: '0.75rem 1rem', backgroundColor: 'var(--primary-light)', borderRadius: 'var(--radius-sm)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ color: 'var(--primary)', fontSize: '0.875rem', fontWeight: 500 }}>
                        Form Type: <strong>{item.formApplied}</strong>
                        </span>
                    </div>

                    <button 
                        className="btn" 
                        style={{ 
                        backgroundColor: 'var(--bg-app)', 
                        border: '1px solid var(--border-color)', 
                        fontSize: '0.85rem', 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.4rem',
                        cursor: 'pointer'
                        }}
                        onClick={() => onViewProtocol(item.id)}
                    >
                        <FileText size={16} color="var(--primary)" /> View Form
                    </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}