import React, { useState } from 'react';
import RoleNavbar from './components/RoleNavbar';
import LoginPage from './pages/Login';

import ApplicantDashboard from './pages/ApplicantDashboard';
import NewSubmissionWizard from './pages/applicant/NewSubmissionWizard';
import GuidelinesPage from './pages/GuidelinesPage';

import SecretariatDashboard from './pages/secretariat/SecretariatDashboard';

function App() {
  // Authentication State: null means logged out
  const [currentUser, setCurrentUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Handle Login and Logout
  const handleLogin = (userObject) => {
    setCurrentUser(userObject);
    setActiveTab('dashboard'); // Reset tab on login
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  // 1. THE AUTHENTICATION GATE: If not logged in, show Login Screen
  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 2. THE AUTHENTICATED WORKSPACE
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Dynamic Navbar powered by active user session */}
      <RoleNavbar 
        user={currentUser} 
        onLogout={handleLogout}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <main style={{ flex: 1, paddingBottom: '3rem' }}>
        
        {/* ROLE: APPLICANT ROUTING */}
        {currentUser.role === 'applicant' && activeTab === 'dashboard' && (
          <ApplicantDashboard />
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
        {currentUser.role === 'secretariat' && (
          <SecretariatDashboard user={currentUser} />
        )}

        {/* ROLE: COMMITTEE MEMBER ROUTING */}
        {currentUser.role === 'committee' && (
          <div className="container">
            <div className="card" style={{ borderLeft: '4px solid var(--purple)' }}>
              <h2>Committee Member Evaluation Workspace (In Development)</h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Logged in as Reviewer ({currentUser.name}). This workspace will allow panel evaluations, revision requests, and risk classifications.
              </p>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           type="button"
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
