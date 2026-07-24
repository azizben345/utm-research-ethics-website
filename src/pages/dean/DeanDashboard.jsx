import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, FileText, User, Calendar, ShieldCheck, AlertCircle } from 'lucide-react';

export default function DeanDashboard({ user, onViewProtocol }) {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState('');
  
  // 1. New State for Search functionality
  const [searchQuery, setSearchQuery] = useState('');

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

  // 2. Filter logic for the Search Bar
  const filteredSubmissions = submissions.filter(item => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      (item.id && item.id.toLowerCase().includes(query)) ||
      (item.projectTitle && item.projectTitle.toLowerCase().includes(query)) ||
      (item.applicantName && item.applicantName.toLowerCase().includes(query))
    );
  });

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Dashboard Header */}
      <div style={{ background: '#1e3a8a', color: '#fff', padding: '2rem', borderRadius: '8px', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
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

      {/* Submissions Queue Header & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.25rem', color: '#111827', margin: 0 }}>Applications Requiring Your Endorsement</h2>
        <input 
          type="text" 
          placeholder="Search by ID, Title, or Applicant..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ minWidth: '300px', padding: '0.5rem 1rem', borderRadius: '6px', border: '1px solid #d1d5db' }}
        />
      </div>
      
      {loading ? (
        <p style={{ color: '#6b7280' }}>Loading departmental queue...</p>
      ) : submissions.length === 0 ? (
        <div style={{ padding: '3rem', textAlign: 'center', background: '#f9fafb', borderRadius: '8px', border: '1px dashed #d1d5db', color: '#6b7280' }}>
          <ShieldCheck size={48} color="#9ca3af" style={{ margin: '0 auto 1rem auto' }} />
          <h3 style={{ margin: '0 0 0.25rem 0', color: '#374151' }}>All Caught Up!</h3>
          <p style={{ margin: 0, fontSize: '0.9rem' }}>There are currently no research applications waiting for departmental endorsement.</p>
        </div>
      ) : (
        /* 3. Replaced Card Map with Table Layout */
        <div style={{ background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 1px 3px 0 rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <tr>
                  <th style={{ padding: '1rem', color: '#374151', fontSize: '0.85rem', fontWeight: 600 }}>Ref ID</th>
                  <th style={{ padding: '1rem', color: '#374151', fontSize: '0.85rem', fontWeight: 600 }}>Project Title</th>
                  <th style={{ padding: '1rem', color: '#374151', fontSize: '0.85rem', fontWeight: 600 }}>Details</th>
                  <th style={{ padding: '1rem', color: '#374151', fontSize: '0.85rem', fontWeight: 600 }}>Application Type</th>
                  <th style={{ padding: '1rem', color: '#374151', fontSize: '0.85rem', fontWeight: 600 }}>Applicant</th>
                  <th style={{ padding: '1rem', color: '#374151', fontSize: '0.85rem', fontWeight: 600, textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSubmissions.length > 0 ? (
                  filteredSubmissions.map((item) => (
                    <tr key={item.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                      
                      {/* Ref ID */}
                      <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                        <div style={{ display: 'inline-block', padding: '0.25rem 0.5rem', background: '#eff6ff', color: '#1e3a8a', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                          {item.id}
                        </div>
                      </td>

                      {/* Project Title */}
                      <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                        <h4 style={{ margin: '0 0 0.5rem 0', color: '#111827', fontSize: '1rem', lineHeight: '1.4' }}>{item.projectTitle}</h4>
                      </td>

                      {/* Project Details */}
                      <td style={{ padding: '1rem', verticalAlign: 'top', maxWidth: '400px' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#6b7280', fontSize: '0.8rem', marginBottom: '0.75rem' }}>
                          <Calendar size={14} /> Submitted: {item.submissionDate}
                        </span>
                        
                        {/* Compact Docs List */}
                        {(item.documents || []).length > 0 && (
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
                            {item.documents.map((doc, idx) => (
                              <span key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', padding: '0.15rem 0.4rem', background: '#f3f4f6', border: '1px solid #d1d5db', borderRadius: '3px', fontSize: '0.7rem', color: '#4b5563' }}>
                                <FileText size={10} color="#2563eb" /> {doc.type}
                              </span>
                            ))}
                          </div>
                        )}
                      </td>

                      {/* Application Type */}
                      <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                        <div style={{ display: 'inline-block', padding: '0.25rem 0.5rem', background: '#fef3c7', color: '#b45309', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600 }}>
                          {item.formApplied}
                        </div>
                      </td>

                      {/* Applicant Info */}
                      <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#374151', fontSize: '0.9rem', fontWeight: 500, marginBottom: '0.25rem' }}>
                          <User size={14} /> {item.applicantName}
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '0.8rem', marginLeft: '1.25rem' }}>
                          {item.applicantEmail}
                        </div>
                      </td>

                      {/* Action Buttons Stack */}
                      <td style={{ padding: '1rem', verticalAlign: 'top' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <button 
                            type="button"
                            onClick={() => handleApprove(item.id, item.projectTitle)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.5rem', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            <CheckCircle2 size={16} /> Approve
                          </button>
                          
                          <button 
                            type="button"
                            onClick={() => handleReject(item.id, item.projectTitle)}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.5rem', background: '#fff', color: '#ef4444', border: '1px solid #ef4444', borderRadius: '4px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
                          >
                            <XCircle size={16} /> Return
                          </button>
                          
                          <button 
                            className="btn" 
                            style={{ backgroundColor: '#f3f4f6', border: '1px solid #d1d5db', color: '#1f2937', fontSize: '0.85rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', padding: '0.5rem', cursor: 'pointer' }}
                            onClick={() => onViewProtocol(item.id)}
                          >
                            <FileText size={16} color="#4b5563" /> View Appl. Form
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                      No applications match your search query "{searchQuery}".
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}