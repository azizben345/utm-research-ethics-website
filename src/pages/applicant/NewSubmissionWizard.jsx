import React, { useState } from 'react';
import { Mail, Send, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

import Step1ProtocolSelection from '../../components/wizards/Step1ProtocolSelection';
import Step2Questionnaire from '../../components/wizards/Step2Questionnaire';
import Step3DocumentRepository from '../../components/wizards/Step3DocumentRepository';

export default function NewSubmissionWizard({ user, onSuccess }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    hasStartedCollection: 'no',
    applicantCategory: 'INTERNAL',
    formType: '',
    formTitle: '',
    feeAmount: 0,
    projectTitle: '',
    applicantName: user ? user.name : 'Dr. Sarah Razak',
    applicantEmail: user ? user.email : 'sarah.r@utm.my',
    phone: '012-3456789',
    faculty: 'Faculty of Computing',
    fundingSource: 'MOHE Grant',
    routingEmail: 'dean.computing@utm.my', // Target email for Dean approval
    documents: [],
    paymentStatus: 'Unpaid'
  });

  // Fires when applicant clicks "Send for Dean Approval" on Step 4
  const handleRouteToDean = async () => {
    setIsSubmitting(true);
    setError('');

    const randomNum = Math.floor(100 + Math.random() * 900);
    const newSubmissionId = `REC-2026-${randomNum}`;

    // 1. Isolate the correct data object based on what the user filled out
    let capturedProtocolData = {};
    if (formData.formType === 'FORM-CLINICAL') capturedProtocolData = formData.clinicalData || {};
    if (formData.formType === 'FORM-NON-CLINICAL') capturedProtocolData = formData.nonClinicalData || {};
    if (formData.formType === 'FORM-ANIMAL') capturedProtocolData = formData.animalData || {};
    if (formData.formType === 'FORM-EXEMPTION') {
      // For Exemption, we bundle the top-level keys into an object
      capturedProtocolData = {
        exemptionStudyType: formData.exemptionStudyType,
        coInvestigators: formData.coInvestigators,
        execSummaryDetails: formData.execSummaryDetails,
        researchStartDate: formData.researchStartDate,
        researchEndDate: formData.researchEndDate,
        dataCollectionStart: formData.dataCollectionStart,
        dataCollectionEnd: formData.dataCollectionEnd,
        exemptionJustifications: formData.exemptionJustifications,
        exemptionOtherDetails: formData.exemptionOtherDetails
      };
    }

    const payload = {
      id: newSubmissionId,
      projectTitle: formData.projectTitle || 'Untitled Research Protocol',
      applicantName: formData.applicantName,
      applicantEmail: formData.applicantEmail,
      faculty: formData.faculty,
      fundingSource: formData.fundingSource,
      formApplied: formData.formTitle,
      applicantCategory: formData.applicantCategory,
      routingEmail: formData.routingEmail,
      submissionDate: new Date().toISOString().split('T')[0],
      currentStage: 0, // Stage 0: Pre-submission institutional routing
      statusLabel: 'Drafted (Pending Dean Approval)',
      riskClassification: formData.formType === 'FORM-EXEMPTION' ? 'Minimum Risk' : 'Pending',
      requiresRevision: false,
      revisionMessage: '',
      feeAmount: formData.feeAmount,
      feePaid: `RM ${formData.feeAmount}`,
      paymentStatus: 'Unpaid',
      documents: formData.documents || [],
      formType: formData.formType, // e.g., 'FORM-ANIMAL'
      protocolData: capturedProtocolData,
    };

    try {
      const res = await fetch('http://localhost:3001/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsSubmitting(false);
        onSuccess(); // Redirect back to Applicant Dashboard
      } else {
        throw new Error('Failed to save submission to database.');
      }
    } catch (err) {
      console.error('Submission Error:', err);
      setError('Could not connect to database. Ensure npm run server is running.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '950px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Header & 4-Step Progress Bar */}
      <div className="card" style={{ marginBottom: '1.5rem', padding: '1.5rem', background: '#fff', borderRadius: '8px', border: '1px solid var(--border-color, #e5e7eb)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ margin: '0 0 0.25rem 0', fontSize: '1.5rem' }}>New Ethics Review Application</h1>
            <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>Phase 1: Protocol Drafting & Institutional Endorsement</p>
          </div>
          <span className="badge" style={{ padding: '0.5rem 1rem', background: '#eff6ff', color: '#1e3a8a', borderRadius: '20px', fontWeight: 600 }}>
            Step {step} of 4
          </span>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[1, 2, 3, 4].map((s) => (
            <div 
              key={s} 
              style={{ flex: 1, height: '6px', borderRadius: '9999px', backgroundColor: step >= s ? '#2563eb' : '#e5e7eb', transition: 'all 0.3s' }} 
            />
          ))}
        </div>
      </div>

      {error && (
        <div style={{ padding: '1rem', marginBottom: '1.5rem', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '6px', border: '1px solid #f87171', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} /><span>{error}</span>
        </div>
      )}

      {/* Step Views */}
      {step === 1 && <Step1ProtocolSelection formData={formData} setFormData={setFormData} onNext={() => setStep(2)} />}
      {step === 2 && <Step2Questionnaire formData={formData} setFormData={setFormData} onPrev={() => setStep(1)} onNext={() => setStep(3)} />}
      {step === 3 && <Step3DocumentRepository formData={formData} setFormData={setFormData} onPrev={() => setStep(2)} onNext={() => setStep(4)} />}

      {/* Step 4: Dean Endorsement Routing Confirmation */}
      {step === 4 && (
        <div className="card" style={{ padding: '2rem', background: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
          <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            <div style={{ width: '64px', height: '64px', background: '#eff6ff', color: '#2563eb', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
              <Mail size={32} />
            </div>
            <h2 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem' }}>Route for Institutional Endorsement</h2>
            <p style={{ color: '#6b7280', fontSize: '0.95rem', lineHeight: 1.5 }}>
              Before your application can be processed by the Secretariat or fee payment can be unlocked, it must be digitally endorsed by your Head of Department or Faculty Dean.
            </p>
          </div>

          <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '6px', border: '1px solid #e5e7eb', marginBottom: '2rem' }}>
            <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem', color: '#111827' }}>Endorsement Routing Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', fontSize: '0.9rem' }}>
              <div>
                <span style={{ color: '#6b7280', display: 'block', fontSize: '0.8rem' }}>Project Title</span>
                <strong>{formData.projectTitle || 'Untitled Protocol'}</strong>
              </div>
              <div>
                <span style={{ color: '#6b7280', display: 'block', fontSize: '0.8rem' }}>Form Type</span>
                <strong>{formData.formTitle}</strong>
              </div>
              <div>
                <span style={{ color: '#6b7280', display: 'block', fontSize: '0.8rem' }}>Principal Investigator</span>
                <strong>{formData.applicantName}</strong>
              </div>
              <div>
                <span style={{ color: '#6b7280', display: 'block', fontSize: '0.8rem' }}>Target Authority Email</span>
                <strong style={{ color: '#2563eb' }}>{formData.routingEmail || 'dean.computing@utm.my'}</strong>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #e5e7eb', paddingTop: '1.25rem' }}>
            <button type="button" onClick={() => setStep(3)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: '#6b7280', cursor: 'pointer', fontWeight: 600 }}>
              <ArrowLeft size={16} /> Back to Document Repository
            </button>
            <button 
              type="button" 
              onClick={handleRouteToDean} 
              disabled={isSubmitting}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', background: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
            >
              <Send size={16} /> {isSubmitting ? 'Dispatching to Dean...' : 'Send for Dean Approval'}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}