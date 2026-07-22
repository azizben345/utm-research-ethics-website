import React from 'react';
import { 
  FolderClock, 
  CheckSquare, 
  LogOut, 
  User
} from 'lucide-react';

export default function RoleNavbar({ user, onLogout, activeTab, setActiveTab }) {
  
  if (!user) return null;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* Left Zone: Brand Logo */}
        <div className="navbar-brand">
          <span className="navbar-brand-badge">UTM</span>
          <span>Research Ethics Portal</span>
        </div>

        {/* Center Zone: Role-Based Contextual Navigation */}
        <ul className="nav-links">
          {user.role === 'applicant' && (
            <>
              <li 
                className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
              >
                My Submissions
              </li>
              <li 
                className={`nav-item ${activeTab === 'new-submission' ? 'active' : ''}`}
                onClick={() => setActiveTab('new-submission')}
              >
                + New Application
              </li>
              <li 
                className={`nav-item ${activeTab === 'guidelines' ? 'active' : ''}`}
                onClick={() => setActiveTab('guidelines')}
              >
                Guidelines & Templates
              </li>
            </>
          )}

          {user.role === 'secretariat' && (
            <>
              {/* <li className="nav-item active">Early Screenings (Day 0)</li> */}
              <li className="nav-item active">Screenings</li>
              {/* <li className="nav-item">Meeting Agendas</li>
              <li className="nav-item">Approval Issuance</li> */}
            </>
          )}

          {user.role === 'committee' && (
            <>
              <li className="nav-item active">Assigned Evaluations</li>
              {/* <li className="nav-item">Subcommittee Re-reviews</li>
              <li className="nav-item">Archive</li> */}
            </>
          )}

          {user.role === 'dean' && (
            <>
              <li className="nav-item active">Pending Endorsements</li>
              {/* <li className="nav-item">Archive</li> */}
            </>
          )}
        </ul>

        {/* Right Zone: Authenticated User Profile & Sign Out */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          
          <div className="user-profile">
            <div style={{ 
              width: '32px', 
              height: '32px', 
              borderRadius: '50%', 
              backgroundColor: 'var(--primary-light)', 
              color: 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              fontWeight: 'bold',
              border: '1px solid var(--border-color)'
            }}>
              {user.name.charAt(0)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.8rem', lineHeight: 1, fontWeight: 700 }}>{user.name}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user.title}</span>
            </div>
          </div>

          <button 
            onClick={onLogout}
            className="btn" 
            style={{ 
              padding: '0.4rem 0.75rem', 
              backgroundColor: 'var(--danger-light)', 
              color: '#991b1b', 
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem'
            }}
            title="Sign Out of Portal"
          >
            <LogOut size={14} /> Sign Out
          </button>

        </div>

      </div>
    </nav>
  );
}
