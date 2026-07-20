import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, FileText, Clock, User, ShieldAlert } from 'lucide-react';

// Import your 4 form components
import ExemptionProtocolForm from '../components/wizards/forms/ExemptionProtocolForm';
import ClinicalProtocolForm from '../components/wizards/forms/ClinicalProtocolForm';
import NonClinicalProtocolForm from '../components/wizards/forms/NonClinicalProtocolForm';
import AnimalProtocolForm from '../components/wizards/forms/AnimalProtocolForm';

const MOCK_SUBMISSION = {
  id: "REC-2026-999",
  formApplied: "Exemption Form",
  formType: "FORM-EXEMPTION",
  projectTitle: "AI-Driven Predictive Maintenance for Smart Campus Infrastructure",
  applicantName: "Dr. Sarah Razak",
  applicantEmail: "sarah.r@utm.my",
  submissionDate: "2026-07-19",
  statusLabel: "Pending Dean Approval",
  protocolData: {
    exemptionStudyType: "Non-Clinical",
    projectTitle: "AI-Driven Predictive Maintenance for Smart Campus Infrastructure",
    applicantName: "Dr. Sarah Razak",
    phone: "012-3456789",
    applicantEmail: "sarah.r@utm.my",
    piDepartment: "Department of Software Engineering",
    faculty: "Faculty of Computing",
    coInvestigators: [
      { name: "Dr. Ahmad Fadzil", phone: "013-1122334", email: "fadzil@utm.my", department: "Software Engineering", faculty: "Faculty of Computing" }
    ],
    execSummaryDetails: {
      problemStatement: "Current campus infrastructure maintenance is reactive, leading to high downtime and operational costs.",
      objectives: "To develop a predictive algorithm that identifies potential hardware failure in smart sensors before they occur.",
      methodology: "We will perform a secondary analysis of existing non-identifiable sensor log data collected over the past 24 months from the campus IoT network.",
      expectedOutcomes: "A functional predictive model with a 15% improvement in maintenance scheduling efficiency.",
      significance: "This research significantly reduces energy waste and optimizes campus resource management."
    },
    researchStartDate: "2026-08-01",
    researchEndDate: "2027-08-01",
    dataCollectionStart: "2026-08-15",
    dataCollectionEnd: "2026-10-15",
    exemptionJustifications: ["opt-2", "opt-3"],
    exemptionOtherDetails: "",
    piDeclarationA: true,
    piDeclarationB: true,
    piDeclarationC: true,
    routingEmail: "dean.computing@utm.my"
  }
};

export default function ProtocolViewer({ submissionId, onBack }) {
  // const { submissionId } = useParams();
  // const navigate = useNavigate();
  const [submission, setSubmission] = useState(MOCK_SUBMISSION);
  const [loading, setLoading] = useState(false); // false for mock data; set to true if fetching from API
  const [activeSubTab, setActiveSubTab] = useState('overview'); // For the 4-tab forms

//   // for real API fetcing
//   useEffect(() => {
//     fetch(`http://localhost:3001/submissions/${submissionId}`)
//       .then(res => res.json())
//       .then(data => {
//         setSubmission(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error('Failed to fetch submission:', err);
//         setLoading(false);
//       });
//   }, [submissionId]);

  if (loading) return <div className="container" style={{ padding: '2rem' }}>Loading Protocol Data...</div>;
  if (!submission) return <div className="container" style={{ padding: '2rem' }}>Protocol not found.</div>;

  // forms expect a parent `formData` object containing their specific key.
  const mockFormData = {
    clinicalData: submission.formType === 'FORM-CLINICAL' ? submission.protocolData : {},
    nonClinicalData: submission.formType === 'FORM-NON-CLINICAL' ? submission.protocolData : {},
    animalData: submission.formType === 'FORM-ANIMAL' ? submission.protocolData : {},
    ... (submission.formType === 'FORM-EXEMPTION' ? submission.protocolData : {}) // Exemption expects flat keys
  };

  // Dummy setter to prevent React errors
  const dummySetFormData = () => {};

  return (
    <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Sticky Header Navigation */}
      <div style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'var(--bg-body, #f3f4f6)', paddingBottom: '1rem' }}>
        <button 
          onClick={onBack}
          className="btn" 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', padding: '0 0 1rem 0', cursor: 'pointer', fontWeight: 600 }}
        >
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="card" style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, padding: '0.25rem 0.75rem', backgroundColor: '#eff6ff', color: '#1e3a8a', borderRadius: '4px' }}>
                {submission.id}
              </span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>
                {submission.formApplied}
              </span>
            </div>
            <h1 style={{ margin: '0 0 0.5rem 0', fontSize: '1.5rem', color: 'var(--text-main)' }}>{submission.projectTitle}</h1>
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><User size={14} /> {submission.applicantName}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Clock size={14} /> Submitted: {submission.submissionDate}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 700 }}>Current Status</span>
            <span style={{ display: 'inline-flex', padding: '0.5rem 1rem', backgroundColor: 'var(--success-light, #d1fae5)', color: 'var(--success, #065f46)', borderRadius: '20px', fontWeight: 600, fontSize: '0.85rem' }}>
              {submission.statusLabel}
            </span>
          </div>
        </div>
      </div>

      {/* Read-Only Form Rendering Switchboard */}
      <div className="card" style={{ padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px', border: '1px solid var(--border-color)', minHeight: '600px' }}>
        
        {/* Visual Indicator that this is a locked view */}
        <div style={{ padding: '0.75rem 1rem', backgroundColor: '#f3f4f6', borderRadius: '4px', border: '1px dashed #9ca3af', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: '#4b5563', fontSize: '0.85rem' }}>
          <ShieldAlert size={18} />
          <strong>Read-Only Mode:</strong> This protocol is currently locked for review. Form inputs and action buttons are disabled.
        </div>

        {submission.formType === 'FORM-EXEMPTION' && (
          <ExemptionProtocolForm formData={mockFormData} setFormData={dummySetFormData} isReadOnly={true} />
        )}
        {submission.formType === 'FORM-CLINICAL' && (
          <ClinicalProtocolForm formData={mockFormData} setFormData={dummySetFormData} activeTab={activeSubTab} setActiveTab={setActiveSubTab} isReadOnly={true} />
        )}
        {submission.formType === 'FORM-NON-CLINICAL' && (
          <NonClinicalProtocolForm formData={mockFormData} setFormData={dummySetFormData} activeTab={activeSubTab} setActiveTab={setActiveSubTab} isReadOnly={true} />
        )}
        {submission.formType === 'FORM-ANIMAL' && (
          <AnimalProtocolForm formData={mockFormData} setFormData={dummySetFormData} activeTab={activeSubTab} setActiveTab={setActiveSubTab} isReadOnly={true} />
        )}
      </div>

    </div>
  );
}