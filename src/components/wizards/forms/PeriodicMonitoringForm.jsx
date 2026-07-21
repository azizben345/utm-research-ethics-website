import React, { useState } from 'react';
import { FileText, X, CheckCircle2 } from 'lucide-react';

export default function PeriodicMonitoringForm({ submission, onClose, onSubmitReport }) {
  const [formData, setFormData] = useState({
    // 1. Details of Research and PI
    reportNo: '1',
    applicationNo: submission.id || '',
    approvalNo: submission.approvalNo || '',
    dateOfApproval: submission.dateOfApproval || '',
    researchType: submission.formApplied?.includes('Clinical') ? 'Clinical' : 'Non-Clinical',
    researchTitle: submission.projectTitle || '',
    piName: submission.applicantName || '',
    contactNumber: submission.contactNumber || '',
    email: submission.applicantEmail || '',
    department: submission.department || '',
    faculty: submission.faculty || '',

    // 2.0 Commencement and termination dates
    hasStarted: 'Yes',
    actualStartDate: '',
    expectedStartDate: '',
    hasCompleted: 'No',
    targetedCompletionDate: '',

    // 3.0 Research Sites
    researchSite: '',
    additionalSites: 'No',
    changesToSites: 'No',

    // 4.0 Recruitment of participants
    proposedParticipants: '',
    actualRecruited: '',
    actualCompleted: '',
    // Withdrawals
    withdrawalConsent: '',
    withdrawalFollowUp: '',
    withdrawalDeath: '',
    withdrawalOther: '',
    // Treatment / Intervention failures
    failureAdverse: '',
    failureEfficacy: '',
    increaseRecruitment: 'No',

    // 5.0 Safety Reports (Clinical trial only)
    hasSusars: 'No',
    susarsDetails: '',
    susarsNotified: 'No',
    susarsReason: '',

    // 6.0 Risk/benefit
    riskBenefitMaintained: 'Yes',
    riskBenefitElaboration: '',

    // 7.0 Amendments
    hasAmendments: 'No',
    amendmentsApproved: 'No',
    amendmentApprovalDate: '',
    amendmentsReason: '',

    // 8.0 Declaration by Principal Investigator
    piSignature: '',
    piDeclarationName: submission.applicantName || '',
    declarationDate: new Date().toISOString().split('T')[0]
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitReport(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
      <div className="modal-content" style={{ background: '#fff', borderRadius: '8px', maxWidth: '850px', width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }} onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className="flex-between" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em' }}>B-UTMREC-MRP (Pindaan: 1, Tarikh: 01/1/2023)</span>
            <h2 style={{ margin: '0.25rem 0 0 0' }}>MONITORING OF RESEARCH PROJECT</h2>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              All clinical and non-clinical reports must be submitted every six (6) months to UTM REC.
            </p>
          </div>
          <button className="btn" style={{ background: 'transparent', padding: '0.25rem' }} onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          
          {/* 1.0 DETAILS OF RESEARCH AND PI */}
          <div className="card" style={{ marginBottom: '1.5rem', background: '#f9fafb' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>1. Details of Research and Principal Investigator (PI)</h4>
            
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>Report No. (Every 6 Months):</label>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {['1', '2', '3', '4', '5', '6', '7', '8'].map(num => (
                  <label key={num} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="reportNo" 
                      value={num} 
                      checked={formData.reportNo === num} 
                      onChange={(e) => handleChange('reportNo', e.target.value)} 
                    />
                    {num}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Application No.:</label>
                <input type="text" className="form-control" value={formData.applicationNo} disabled style={{ width: '100%', padding: '0.5rem', background: '#e5e7eb' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Approval No.:</label>
                <input type="text" className="form-control" value={formData.approvalNo} disabled style={{ width: '100%', padding: '0.5rem', background: '#e5e7eb' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Date of Approval:</label>
                <input type="text" className="form-control" value={formData.dateOfApproval} disabled style={{ width: '100%', padding: '0.5rem', background: '#e5e7eb' }} />
              </div>
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Research Title:</label>
              <input type="text" className="form-control" value={formData.researchTitle} disabled style={{ width: '100%', padding: '0.5rem', background: '#e5e7eb' }} />
            </div>
          </div>

          {/* 2.0 COMMENCEMENT AND TERMINATION DATES */}
          <div className="card" style={{ marginBottom: '1.5rem', background: '#f9fafb' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>2.0 Commencement and Termination Dates</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Has the research started?</label>
                <select value={formData.hasStarted} onChange={e => handleChange('hasStarted', e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>If yes, actual start date:</label>
                <input type="date" value={formData.actualStartDate} onChange={e => handleChange('actualStartDate', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Has the research completed?</label>
                <select value={formData.hasCompleted} onChange={e => handleChange('hasCompleted', e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>If No, targeted completion date:</label>
                <input type="date" value={formData.targetedCompletionDate} onChange={e => handleChange('targetedCompletionDate', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
            </div>
          </div>

          {/* 3.0 RESEARCH SITES */}
          <div className="card" style={{ marginBottom: '1.5rem', background: '#f9fafb' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>3.0 Research Sites</h4>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Name of the research site:</label>
              <input type="text" className="form-control" placeholder="e.g. Hospital UTM / Faculty Lab" value={formData.researchSite} onChange={e => handleChange('researchSite', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Any additional research sites?</label>
                <select value={formData.additionalSites} onChange={e => handleChange('additionalSites', e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Any changes to the research site?</label>
                <select value={formData.changesToSites} onChange={e => handleChange('changesToSites', e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4.0 RECRUITMENT OF PARTICIPANTS */}
          <div className="card" style={{ marginBottom: '1.5rem', background: '#f9fafb' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>4.0 Recruitment of Participants</h4>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Proposed (Original):</label>
                <input type="number" value={formData.proposedParticipants} onChange={e => handleChange('proposedParticipants', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Actual Recruited to Date:</label>
                <input type="number" value={formData.actualRecruited} onChange={e => handleChange('actualRecruited', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Actual Completed to Date:</label>
                <input type="number" value={formData.actualCompleted} onChange={e => handleChange('actualCompleted', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Number of participants’ withdrawal from the research to date:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem' }}>a) withdrawal of consent:</span>
                  <input type="number" value={formData.withdrawalConsent} onChange={e => handleChange('withdrawalConsent', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem' }}>b) loss of follow-up:</span>
                  <input type="number" value={formData.withdrawalFollowUp} onChange={e => handleChange('withdrawalFollowUp', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem' }}>c) death (not primary outcome):</span>
                  <input type="number" value={formData.withdrawalDeath} onChange={e => handleChange('withdrawalDeath', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem' }}>d) Other reasons:</span>
                  <input type="text" placeholder="State reason & count" value={formData.withdrawalOther} onChange={e => handleChange('withdrawalOther', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
                </div>
              </div>
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1rem', marginBottom: '1rem' }}>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>
                Number of treatment/intervention failures to date:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <span style={{ fontSize: '0.8rem' }}>a) adverse events:</span>
                  <input type="number" value={formData.failureAdverse} onChange={e => handleChange('failureAdverse', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
                </div>
                <div>
                  <span style={{ fontSize: '0.8rem' }}>b) lack of efficacy:</span>
                  <input type="number" value={formData.failureEfficacy} onChange={e => handleChange('failureEfficacy', e.target.value)} style={{ width: '100%', padding: '0.4rem' }} />
                </div>
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Do you plan to increase the planned recruitment of participants?</label>
              <select value={formData.increaseRecruitment} onChange={e => handleChange('increaseRecruitment', e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
          </div>

          {/* 5.0 SAFETY REPORTS (CLINICAL TRIAL ONLY) */}
          <div className="card" style={{ marginBottom: '1.5rem', background: '#f9fafb' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>5.0 Safety Reports (Clinical trial only)</h4>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Any Suspected Unexpected Serious Adverse Reactions (SUSARs)/safety issues?</label>
              <select value={formData.hasSusars} onChange={e => handleChange('hasSusars', e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {formData.hasSusars === 'Yes' && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>If yes, please specify:</label>
                  <textarea className="form-control" rows={2} value={formData.susarsDetails} onChange={e => handleChange('susarsDetails', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Have these SUSARs been notified to UTM REC?</label>
                    <select value={formData.susarsNotified} onChange={e => handleChange('susarsNotified', e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>If no, state reason:</label>
                    <input type="text" className="form-control" value={formData.susarsReason} onChange={e => handleChange('susarsReason', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 6.0 RISK/BENEFIT */}
          <div className="card" style={{ marginBottom: '1.5rem', background: '#f9fafb' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>6.0 Risk/benefit</h4>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Is the risk/benefit maintained?</label>
              <select value={formData.riskBenefitMaintained} onChange={e => handleChange('riskBenefitMaintained', e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            {formData.riskBenefitMaintained === 'No' && (
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>If no, please elaborate:</label>
                <textarea className="form-control" rows={2} value={formData.riskBenefitElaboration} onChange={e => handleChange('riskBenefitElaboration', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
            )}
          </div>

          {/* 7.0 AMENDMENTS */}
          <div className="card" style={{ marginBottom: '1.5rem', background: '#f9fafb' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>7.0 Amendments</h4>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Have any substantial amendments been made to the research?</label>
              <select value={formData.hasAmendments} onChange={e => handleChange('hasAmendments', e.target.value)} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem' }}>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {formData.hasAmendments === 'Yes' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Were amendments approved by UTM REC?</label>
                  <select value={formData.amendmentsApproved} onChange={e => handleChange('amendmentsApproved', e.target.value)} style={{ width: '100%', padding: '0.5rem' }}>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div>
                  <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>If yes, approval date:</label>
                  <input type="date" value={formData.amendmentApprovalDate} onChange={e => handleChange('amendmentApprovalDate', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
                </div>
              </div>
            )}
          </div>

          {/* 8.0 DECLARATION BY PRINCIPAL INVESTIGATOR */}
          <div className="card" style={{ marginBottom: '1.5rem', background: '#f9fafb' }}>
            <h4 style={{ margin: '0 0 1rem 0', color: 'var(--primary)' }}>8.0 Declaration by Principal Investigator</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              I certify that the information provided in this application is complete and accurate.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Principal Investigator Signature (Type Name):</label>
                <input type="text" placeholder="Type full name as signature" value={formData.piSignature} onChange={e => handleChange('piSignature', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
              <div>
                <label style={{ fontSize: '0.85rem', fontWeight: 600 }}>Date:</label>
                <input type="date" value={formData.declarationDate} onChange={e => handleChange('declarationDate', e.target.value)} style={{ width: '100%', padding: '0.5rem' }} />
              </div>
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
            <button type="button" className="btn" style={{ background: 'var(--border-color)' }} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} /> Submit 6-Month Progress Report
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}