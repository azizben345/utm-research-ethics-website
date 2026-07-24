import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Settings2, 
  Search, 
  X, 
  Save, 
  ShieldCheck, 
  Tag,
  AlertCircle
} from 'lucide-react';

// 1. MOCK DATA: Fallback if backend is unavailable
const MOCK_USERS = [
  { id: 'usr_01', name: 'Dr. Ahmad Faizal', email: 'ahmad.f@utm.my', role: 'Committee', researchTypes: ['Clinical'], designation: 'Scientific' },
  { id: 'usr_02', name: 'Prof. Sarah Lim', email: 'sarah.lim@utm.my', role: 'Committee', researchTypes: ['Non-Clinical', 'Animal'], designation: 'Scientific' },
  { id: 'usr_03', name: 'Mr. David Tan', email: 'dtan.community@gmail.com', role: 'Committee', researchTypes: ['Non-Clinical'], designation: 'Non-Scientific' },
  { id: 'usr_04', name: 'Dr. Aminah Yusuf', email: 'aminah.y@utm.my', role: 'Secretariat', researchTypes: [], designation: '' } // Should be filtered out
];

const RESEARCH_TYPES = ['Clinical', 'Non-Clinical', 'Animal'];

export default function ConfigureEvaluators() {
  const [evaluators, setEvaluators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for the configuration modal
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ researchTypes: [], designation: 'Scientific' });

  // Fetch users and filter by 'Committee' role
  const fetchEvaluators = async () => {
    setLoading(true);
    try {
      // Replace with your actual API endpoint
      const res = await fetch('http://localhost:3001/users');
      const data = await res.json();
      
      const committeeMembers = (Array.isArray(data) ? data : MOCK_USERS)
        .filter(user => user.role === 'committee');
        
      setEvaluators(committeeMembers);
    } catch (err) {
      console.warn('Backend unavailable. Loading mock data.');
      setEvaluators(MOCK_USERS.filter(user => user.role === 'committee'));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluators();
  }, []);

  // Filter for search bar
  const filteredEvaluators = evaluators.filter(ev => 
    ev.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    ev.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Open edit modal and populate form data
  const handleEditClick = (user) => {
    setEditingUser(user);
    setFormData({
      researchTypes: user.researchTypes || [],
      designation: user.designation || 'Scientific'
    });
  };

  // Toggle checkbox arrays
  const handleTypeToggle = (type) => {
    setFormData(prev => {
      const exists = prev.researchTypes.includes(type);
      return {
        ...prev,
        researchTypes: exists 
          ? prev.researchTypes.filter(t => t !== type) 
          : [...prev.researchTypes, type]
      };
    });
  };

  // Save changes to backend
  const handleSaveConfiguration = async () => {
    const updatedPayload = {
      ...editingUser,
      researchTypes: formData.researchTypes,
      designation: formData.designation
    };

    try {
      const res = await fetch(`http://localhost:3001/users/${editingUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPayload)
      });

      if (res.ok || res.status === 404) {
        // Update local state to reflect changes instantly (404 caught for mock demo)
        setEvaluators(prev => prev.map(ev => ev.id === editingUser.id ? updatedPayload : ev));
        setEditingUser(null);
        alert('Evaluator configuration updated successfully!');
      }
    } catch (err) {
      alert('Network error: Changes saved locally for demo purposes.');
      setEvaluators(prev => prev.map(ev => ev.id === editingUser.id ? updatedPayload : ev));
      setEditingUser(null);
    }
  };

  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading Committee Roster...</div>;

  return (
    <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '2rem' }}>
      
      {/* Header Section */}
      <div className="card flex-between" style={{ borderLeft: '4px solid #3b82f6', marginBottom: '1.5rem', padding: '1.5rem', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div>
          <h1 style={{ margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Users size={24} color="#3b82f6" /> Configure Evaluators
          </h1>
          <p style={{ margin: 0, color: '#6b7280' }}>
            Manage committee member profiles, set their expertise categories, and assign evaluation scopes.
          </p>
        </div>
      </div>

      {/* Roster List View */}
      <div className="card" style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '1.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        
        {/* Search Bar */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '0.75rem', background: '#f9fafb', padding: '0.75rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
          <Search size={20} color="#9ca3af" />
          <input 
            type="text" 
            placeholder="Search evaluators by name or email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.95rem' }}
          />
          {searchTerm && (
            <button style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} onClick={() => setSearchTerm('')}>
              <X size={16} color="#9ca3af" />
            </button>
          )}
        </div>

        {/* Evaluator Table */}
        <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '1rem 0.5rem', color: '#6b7280' }}>Member Name</th>
              <th style={{ padding: '1rem 0.5rem', color: '#6b7280' }}>Reviewer Designation</th>
              <th style={{ padding: '1rem 0.5rem', color: '#6b7280' }}>Research Types</th>
              <th style={{ padding: '1rem 0.5rem', color: '#6b7280', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEvaluators.length > 0 ? (
              filteredEvaluators.map((user) => (
                <tr key={user.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <div style={{ fontWeight: 600, color: '#111827' }}>{user.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{user.email}</div>
                  </td>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <span style={{ 
                      backgroundColor: user.designation === 'Scientific' ? '#dbeafe' : '#fce7f3', 
                      color: user.designation === 'Scientific' ? '#1d4ed8' : '#be185d',
                      padding: '0.25rem 0.75rem', borderRadius: '999px', fontSize: '0.85rem', fontWeight: 600 
                    }}>
                      {user.designation || 'Unassigned'}
                    </span>
                  </td>
                  <td style={{ padding: '1rem 0.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      {(user.researchTypes || []).map(type => (
                        <span key={type} style={{ background: '#f3f4f6', color: '#4b5563', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', border: '1px solid #d1d5db' }}>
                          {type}
                        </span>
                      ))}
                      {(!user.researchTypes || user.researchTypes.length === 0) && (
                         <span style={{ color: '#9ca3af', fontSize: '0.85rem', fontStyle: 'italic' }}>None mapped</span>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '1rem 0.5rem', textAlign: 'right' }}>
                    <button 
                      onClick={() => handleEditClick(user)}
                      style={{ backgroundColor: '#fff', border: '1px solid #d1d5db', color: '#374151', padding: '0.5rem 1rem', borderRadius: '6px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}
                    >
                      <Settings2 size={16} /> Configure
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
                  No committee members found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Configuration Modal Overlay */}
      {editingUser && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', maxWidth: '500px', width: '100%', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
              <div>
                <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.25rem', color: '#111827' }}>Configure Profile</h3>
                <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>{editingUser.name} ({editingUser.email})</p>
              </div>
              <button onClick={() => setEditingUser(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#6b7280" />
              </button>
            </div>

            {/* Form Section 1: Reviewer Designation */}
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#374151', marginBottom: '0.75rem' }}>
                <ShieldCheck size={18} color="#3b82f6" /> Expertise Category
              </label>
              <select 
                value={formData.designation} 
                onChange={(e) => setFormData({...formData, designation: e.target.value})}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.95rem', backgroundColor: '#fff' }}
              >
                <option value="Scientific">Scientific Member (Technical)</option>
                <option value="Non-Scientific">Non-Scientific Member (Layperson)</option>
              </select>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '0.5rem', display: 'flex', gap: '0.25rem' }}>
                <AlertCircle size={14} /> Dictates which evaluation criteria they prioritize during reviews.
              </p>
            </div>

            {/* Form Section 2: Research Type Mapping */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, color: '#374151', marginBottom: '0.75rem' }}>
                <Tag size={18} color="#3b82f6" /> Assignable Research Types
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: '#f9fafb', padding: '1rem', borderRadius: '6px', border: '1px solid #e5e7eb' }}>
                {RESEARCH_TYPES.map(type => (
                  <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                    <input 
                      type="checkbox" 
                      checked={formData.researchTypes.includes(type)}
                      onChange={() => handleTypeToggle(type)}
                      style={{ width: '16px', height: '16px', accentColor: '#3b82f6' }}
                    />
                    <span style={{ fontSize: '0.95rem', color: '#4b5563' }}>{type} Protocols</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button 
                onClick={() => setEditingUser(null)}
                style={{ padding: '0.75rem 1.25rem', backgroundColor: '#fff', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer', fontWeight: 500 }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSaveConfiguration}
                style={{ padding: '0.75rem 1.25rem', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}
              >
                <Save size={18} /> Save Configuration
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}