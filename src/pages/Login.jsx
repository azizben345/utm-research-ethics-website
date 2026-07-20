import React, { useState } from 'react';
import { Shield, Lock, Mail, ArrowRight, UserCheck, AlertCircle } from 'lucide-react';

export default function LoginPage({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Standard manual login against json-server
  const handleManualLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Query database for matching email
      const res = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}`);
      const users = await res.json();

      if (users.length > 0 && users[0].password === password) {
        onLogin(users[0]);
      } else {
        setError('Invalid email or password. Try using the quick demo buttons below.');
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Could not connect to database. Is json-server running?');
    } finally {
      setLoading(false);
    }
  };

  // 1-Click Demo Login (Bypasses typing for evaluators)
  const handleDemoLogin = async (targetEmail) => {
    setError('');
    try {
      const res = await fetch(`http://localhost:3001/users?email=${encodeURIComponent(targetEmail)}`);
      const users = await res.json();
      if (users.length > 0) {
        onLogin(users[0]);
      }
    } catch (err) {
      setError('Could not connect to database. Ensure npm run server is active.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--bg-app)', padding: '1rem' }}>
      
      <div className="card" style={{ maxWidth: '440px', width: '100%', padding: '2.5rem', boxShadow: 'var(--shadow-md)' }}>
        
        {/* Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ 
            width: '48px', 
            height: '48px', 
            borderRadius: '12px', 
            backgroundColor: 'var(--primary-light)', 
            color: 'var(--primary)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            margin: '0 auto 1rem auto' 
          }}>
            <Shield size={28} />
          </div>
          <h1 style={{ fontSize: '1.5rem', margin: '0 0 0.25rem 0' }}>UTM REC Portal</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', margin: 0 }}>
            Institutional Research Ethics Review System
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div style={{ 
            backgroundColor: 'var(--danger-light)', 
            color: '#991b1b', 
            padding: '0.75rem', 
            borderRadius: 'var(--radius-sm)', 
            fontSize: '0.85rem', 
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {/* Traditional Form Input */}
        <form onSubmit={handleManualLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Institutional Email
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Mail size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px' }} />
              <input 
                type="email" 
                required
                placeholder="sarah.r@utm.my"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.6rem 0.6rem 0.6rem 2.25rem', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }} 
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <Lock size={16} color="var(--text-muted)" style={{ position: 'absolute', left: '12px' }} />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ 
                  width: '100%', 
                  padding: '0.6rem 0.6rem 0.6rem 2.25rem', 
                  borderRadius: 'var(--radius-sm)', 
                  border: '1px solid var(--border-color)',
                  fontSize: '0.9rem',
                  outline: 'none',
                  boxSizing: 'border-box'
                }} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={loading}
            style={{ justifyContent: 'center', marginTop: '0.5rem', padding: '0.75rem' }}
          >
            {loading ? 'Authenticating...' : 'Sign In to Portal'} <ArrowRight size={16} />
          </button>
        </form>

        {/* Prototype Quick-Demo Login Footer */}
        <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
          <p style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 1rem 0' }}>
            ⚡ Prototype Demo Access (1-Click Login)
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            
            <button 
              type="button"
              onClick={() => handleDemoLogin('sarah.r@utm.my')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
            >
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block' }}>Dr. Sarah Razak</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role: Applicant (Researcher)</span>
              </div>
              <span className="badge badge-primary">PI</span>
            </button>

            <button 
              type="button"
              onClick={() => handleDemoLogin('nurul.aini@utm.my')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
            >
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block' }}>Nurul Aini</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role: REC Secretariat</span>
              </div>
              <span className="badge badge-warning">Admin</span>
            </button>

            <button 
              type="button"
              onClick={() => handleDemoLogin('ariffin@utm.my')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
            >
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block' }}>Prof. Dr. Ariffin</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role: Committee Member</span>
              </div>
              <span className="badge badge-purple">Panel</span>
            </button>

            <button 
              type="button"
              onClick={() => handleDemoLogin('dean.computing@utm.my')}
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 1rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', background: '#fff', cursor: 'pointer', textAlign: 'left', transition: 'all 0.2s' }}
            >
              <div>
                <strong style={{ fontSize: '0.85rem', color: 'var(--text-main)', display: 'block' }}>Prof. Dr. Kasim</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Role: Dean</span>
              </div>
              <span className="badge badge-danger">Dean</span>
            </button>

          </div>
        </div>

      </div>
    </div>
  );
}