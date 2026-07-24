import React, { useState } from 'react';
import RoleNavbar from './components/RoleNavbar';
import LoginPage from './pages/Login';
import ProtocolViewer from './pages/ProtocolViewer';
// Applicant Pages:
import ApplicantDashboard from './pages/applicant/ApplicantDashboard';
import NewSubmissionWizard from './pages/applicant/NewSubmissionWizard';
import GuidelinesPage from './pages/GuidelinesPage';
// Secretariat Pages:
import SecretariatDashboard from './pages/secretariat/SecretariatDashboard';
import ConfigureEvaluators from './pages/secretariat/ConfigureEvaluators';
// Dean Pages:
import DeanDashboard from './pages/dean/DeanDashboard';
// Committee Pages:
import CommitteeDashboard from './pages/committee/CommitteeDashboard';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // NEW STATE: Tracks the specific protocol ID to view
  const [viewingProtocolId, setViewingProtocolId] = useState(null);

  const handleLogin = (userObject) => {
    setCurrentUser(userObject);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // Triggers the viewer and sets the ID
  const handleViewProtocol = (submissionId) => {
    setViewingProtocolId(submissionId);
    setActiveTab('view-protocol');
  };

  // Returns the user to their standard dashboard
  const handleBackToDashboard = () => {
    setViewingProtocolId(null);
    setActiveTab('dashboard');
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      <RoleNavbar 
        user={currentUser} 
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        
        {/* UNIVERSAL ROUTE: Protocol Viewer */}
        {activeTab === 'view-protocol' && viewingProtocolId && (
          <ProtocolViewer 
            submissionId={viewingProtocolId} 
            onBack={handleBackToDashboard} 
          />
        )}

        {/* ROLE: APPLICANT ROUTING */}
        {currentUser.role === 'applicant' && activeTab === 'dashboard' && (
          <ApplicantDashboard 
            user={currentUser} 
            onStartNew={() => setActiveTab('new-submission')}
            onViewProtocol={handleViewProtocol} 
          />
        )}

        {currentUser.role === 'applicant' && activeTab === 'new-submission' && (
          <NewSubmissionWizard 
            user={currentUser} 
            onSuccess={() => setActiveTab('dashboard')} 
          />
        )}

        {currentUser.role === 'applicant' && activeTab === 'guidelines' && (
          <GuidelinesPage />
        )}

        {/* ROLE: SECRETARIAT ROUTING */}
        {currentUser.role === 'secretariat' && activeTab === 'dashboard' && (
          <SecretariatDashboard 
            user={currentUser} 
            onViewProtocol={handleViewProtocol} 
          />
        )}

        {currentUser.role === 'secretariat' && activeTab === 'configure-evaluators' && (
          <ConfigureEvaluators />
        )}

        {/* ROLE: DEAN ROUTING */}
        {currentUser.role === 'dean' && activeTab === 'dashboard' && (
          <DeanDashboard 
            user={currentUser} 
            onViewProtocol={handleViewProtocol} 
          />
        )}

        {/* ROLE: COMMITTEE ROUTING */}
        {currentUser.role === 'committee' && activeTab === 'dashboard' && (
          <CommitteeDashboard 
            user={currentUser} 
            onViewProtocol={handleViewProtocol} 
          />
        )}

      </main>

    </div>
  );
}

export default App;