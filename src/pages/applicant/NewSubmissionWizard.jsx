import React, { useState } from 'react';
import { ShieldCheck, AlertCircle } from 'lucide-react';

// Import Child Step Components
import Step1ProtocolSelection from '../../components/wizards/Step1ProtocolSelection';
import Step2Questionnaire from '../../components/wizards/Step2Questionnaire';
import Step3DocumentRepository from '../../components/wizards/Step3DocumentRepository';
import Step4ReviewFee from '../../components/wizards/Step4ReviewFee';
import Step5FinalReview from '../../components/wizards/Step5FinalReview';

export default function NewSubmissionWizard({ user, onSuccess }) {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Master State: Single source of truth across all 5 steps
  const [formData, setFormData] = useState({
    // Gatekeeper & Classification
    hasStartedCollection: 'no',
    applicantCategory: 'INTERNAL', // 'INTERNAL' or 'EXTERNAL'
    
    // Protocol Details
    formType: '',
    formTitle: '',
    feeAmount: 0,
    
    // Project Metadata
    projectTitle: '',
    applicantName: user ? user.name : 'Dr. Sarah Razak',
    applicantEmail: user ? user.email : 'sarah.r@utm.my',
    phone: '012-3456789',
    faculty: 'Faculty of Computing',
    fundingSource: 'MOHE Grant',
    
    // Repository & Payment
    documents: [],
    paymentStatus: 'Pending Verification',
    paymentReceiptRef: ''
  });

  // Final Submission to local json-server database
  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setError('');

    const randomNum = Math.floor(100 + Math.random() * 900);
    const newSubmissionId = `REC-2026-${randomNum}`;

    const payload = {
      id: newSubmissionId,
      projectTitle: formData.projectTitle,
      applicantName: formData.applicantName,
      applicantEmail: formData.applicantEmail,
      faculty: formData.faculty,
      fundingSource: formData.fundingSource,
      formApplied: formData.formTitle,
      applicantCategory: formData.applicantCategory,
      submissionDate: new Date().toISOString().split('T')[0],
      currentStage: 1, // Lands in Stage 1: Secretariat Early Screening
      statusLabel: 'Submitted (Pending Secretariat Screening)',
      riskClassification: formData.formType === 'FORM-EXEMPTION' ? 'Minimum Risk' : 'Pending',
      requiresRevision: false,
      revisionMessage: '',
      feePaid: `RM ${formData.feeAmount}`,
      paymentStatus: formData.paymentStatus,
      documents: formData.documents
    };

    try {
      const res = await fetch('http://localhost:3001/submissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsSubmitting(false);
        onSuccess(); // Redirects back to Dashboard Master View
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
    <div className="container" style={{ maxWidth: '950px' }}>
      
      {/* Top Progress Header */}
      <div className="card" style={{ marginBottom: '1.5rem' }}>
        <div className="flex-between" style={{ marginBottom: '1rem' }}>
          <div>
            <h1 style={{ margin: '0 0 0.25rem 0' }}>New Ethics Review Application</h1>
            <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              Universiti Teknologi Malaysia Research Ethics Committee (UTM REC)
            </p>
          </div>
          <span className="badge badge-primary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
            Step {step} of 5
          </span>
        </div>

        {/* 5-Step Progress Bar */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {[1, 2, 3, 4, 5].map((s) => (
            <div 
              key={s} 
              style={{ 
                flex: 1, 
                height: '6px', 
                borderRadius: '9999px', 
                backgroundColor: step >= s ? 'var(--primary)' : 'var(--border-color)',
                transition: 'all 0.3s'
              }} 
            />
          ))}
        </div>
      </div>

      {error && (
        <div className="card" style={{ backgroundColor: 'var(--danger-light)', color: '#991b1b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Dynamic Step Router */}
      {step === 1 && (
        <Step1ProtocolSelection 
          formData={formData} 
          setFormData={setFormData} 
          onNext={() => setStep(2)} 
        />
      )}

      {step === 2 && (
        <Step2Questionnaire 
          formData={formData} 
          setFormData={setFormData}
          onPrev={() => setStep(1)} 
          onNext={() => setStep(3)} 
        />
      )}

      {step === 3 && (
        <Step3DocumentRepository 
          formData={formData} 
          setFormData={setFormData} 
          onPrev={() => setStep(2)} 
          onNext={() => setStep(4)} 
        />
      )}

      {step === 4 && (
        <Step4ReviewFee 
          formData={formData} 
          setFormData={setFormData} 
          onPrev={() => setStep(3)} 
          onNext={() => setStep(5)} 
        />
      )}

      {step === 5 && (
        <Step5FinalReview 
          formData={formData} 
          onPrev={() => setStep(4)} 
          onSubmit={handleFinalSubmit} 
          isSubmitting={isSubmitting} 
        />
      )}

    </div>
  );
}