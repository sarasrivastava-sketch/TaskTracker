import React, { useState, useEffect } from 'react';

// Helpers
const AVATAR_COLORS = [
  '#5b6af0', '#10b981', '#f59e0b', '#8b5cf6',
  '#ec4899', '#06b6d4', '#ef4444', '#84cc16',
];

const getAvatarColor = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

const getInitials = (name) =>
  name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

export default function Team({
  team: propTeam = [],
  tasks: propTasks = [],
  currentProject,
  onAddMember,
  onTeamChange,
  setActivePage,
}) {
  const members = propTeam || [];

  const updateMembers = (updaterFn) => {
    if (onTeamChange) {
      onTeamChange((prev) => updaterFn(prev || []));
    }
  };

  // Three-dot menu
  const [openMenuId, setOpenMenuId] = useState(null);
  useEffect(() => {
    const close = () => setOpenMenuId(null);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  // Add Member Modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addRole, setAddRole] = useState('Team Member');
  const [addError, setAddError] = useState('');

  const openAddModal = () => {
    setAddName('');
    setAddEmail('');
    setAddRole('Team Member');
    setAddError('');
    setShowAddModal(true);
  };
  const closeAddModal = () => {
    setShowAddModal(false);
    setAddError('');
    setAddEmail('');
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!addName.trim()) {
      setAddError('Please enter a member name.');
      return;
    }
    const newMember = {
      id: `m_${Date.now()}`,
      name: addName.trim(),
      email: addEmail.trim() || `${addName.trim().toLowerCase().replace(/\s+/g, '')}@college.edu`,
      role: addRole,
      isLeader: addRole === 'Team Leader',
      color: getAvatarColor(addName.trim()),
    };
    if (onAddMember) {
      onAddMember(newMember);
    } else {
      updateMembers((prev) => [...prev, newMember]);
    }
    closeAddModal();
  };

  // Edit Member Modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editRole, setEditRole] = useState('Team Member');
  const [editError, setEditError] = useState('');

  const openEditModal = (e, member) => {
    e.stopPropagation();
    setOpenMenuId(null);
    setEditingMember(member);
    setEditName(member.name);
    setEditEmail(member.email || '');
    setEditRole(member.role || (member.isLeader ? 'Team Leader' : 'Team Member'));
    setEditError('');
    setShowEditModal(true);
  };
  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingMember(null);
    setEditError('');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editName.trim()) {
      setEditError('Please enter a member name.');
      return;
    }
    updateMembers((prev) =>
      prev.map((m) =>
        m.id === editingMember.id
          ? {
              ...m,
              name: editName.trim(),
              email: editEmail.trim(),
              role: editRole,
              isLeader: editRole === 'Team Leader',
            }
          : m
      )
    );
    closeEditModal();
  };

  // Remove Member
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [removingMember, setRemovingMember] = useState(null);

  const openRemoveConfirm = (e, member) => {
    e.stopPropagation();
    setOpenMenuId(null);
    setRemovingMember(member);
    setShowRemoveConfirm(true);
  };
  const confirmRemove = () => {
    if (removingMember) updateMembers((prev) => prev.filter((m) => m.id !== removingMember.id));
    setShowRemoveConfirm(false);
    setRemovingMember(null);
  };

  // Task stats per member
  const getMemberStats = (member) => {
    const assigned = propTasks.filter((t) => t.assignee === member.name || t.assignedTo === member.name);
    const completed = assigned.filter((t) => t.status === 'Completed').length;
    return { assigned: assigned.length, completed };
  };

  // Shared modal styles
  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15,23,42,0.5)',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  };
  const modalStyle = {
    width: '100%',
    maxWidth: '420px',
    background: '#fff',
    borderRadius: '12px',
    padding: '24px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    maxHeight: '90vh',
    overflowY: 'auto',
  };
  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '5px' };
  const inputStyle = { width: '100%', padding: '8px 12px', fontSize: '13px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)', background: 'var(--bg)', outline: 'none', boxSizing: 'border-box' };

  const teamName = currentProject?.team || 'Team 7';
  const projectName = currentProject?.name || 'Campus Teamwork';
  const course = currentProject?.course || 'Design Thinking & Problem Solving';
  const projectColor = currentProject?.color || '#5b6af0';

  return (
    <div>
      {/* Breadcrumb */}
      {currentProject && setActivePage && (
        <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-outline"
            style={{ padding: '4px 10px', fontSize: '11.5px', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setActivePage('projects')}
          >
            <span>&larr;</span>
            <span>Back to My Projects</span>
          </button>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontSize: '12px', color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }} onClick={() => setActivePage('dashboard')}>
            {teamName} Dashboard
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Team</span>
        </div>
      )}

      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              {teamName} Management
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginTop: '6px' }}>
              <span
                style={{
                  background: projectColor,
                  color: '#ffffff',
                  borderRadius: '12px',
                  padding: '2px 10px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                }}
              >
                {teamName}
              </span>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                {projectName}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>•</span>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{course}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>•</span>
              <span style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: '20px', padding: '2px 10px', fontSize: '12px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                👥 {members.length} {members.length === 1 ? 'Member' : 'Members'}
              </span>
            </div>
          </div>
          <button
            id="btn-add-member"
            className="btn btn-primary"
            style={{ padding: '9px 18px', fontSize: '13.5px', fontWeight: 600, whiteSpace: 'nowrap' }}
            onClick={openAddModal}
          >
            + Add Member
          </button>
        </div>
      </div>

      {/* Member Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '28px' }}>
        {members.map((member) => {
          const stats = getMemberStats(member);
          const percent = stats.assigned > 0 ? Math.round((stats.completed / stats.assigned) * 100) : 0;
          const color = member.color || getAvatarColor(member.name);
          const isLeader = member.isLeader || member.role === 'Team Leader';

          return (
            <div
              key={member.id}
              className="card"
              style={{
                padding: '20px',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px',
                borderLeft: `4px solid ${color}`,
                transition: 'box-shadow 0.18s',
              }}
            >
              {/* Three-dot menu */}
              <div style={{ position: 'absolute', top: '14px', right: '14px' }} onMouseDown={(e) => e.stopPropagation()}>
                <button
                  id={`member-menu-${member.id}`}
                  onClick={(e) => { e.stopPropagation(); setOpenMenuId((prev) => (prev === member.id ? null : member.id)); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 7px', borderRadius: '6px', fontSize: '18px', color: 'var(--text-muted)', lineHeight: 1 }}
                  title="Member options"
                >
                  ⋮
                </button>

                {openMenuId === member.id && (
                  <div
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{ position: 'absolute', top: '32px', right: 0, background: '#fff', border: '1px solid var(--border)', borderRadius: '8px', boxShadow: '0 6px 20px rgba(0,0,0,0.12)', zIndex: 200, minWidth: '150px', overflow: 'hidden' }}
                  >
                    {[
                      { label: '✏️ Edit Member', fn: (e) => openEditModal(e, member), color: 'var(--text-primary)' },
                      { label: '🗑️ Remove Member', fn: (e) => openRemoveConfirm(e, member), color: 'var(--red)' },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onMouseDown={item.fn}
                        style={{ display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: 500, color: item.color }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = '#f5f6ff'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Avatar + Name + Role */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingRight: '28px' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: `${color}18`,
                    color,
                    fontWeight: 700,
                    fontSize: '17px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: `2px solid ${color}30`,
                  }}
                >
                  {getInitials(member.name)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{member.name}</span>
                    {isLeader && (
                      <span style={{ background: '#fef9c3', color: '#854d0e', border: '1px solid #fde68a', borderRadius: '10px', padding: '1px 8px', fontSize: '11px', fontWeight: 700 }}>
                        ★ Leader
                      </span>
                    )}
                  </div>
                  <span
                    style={{
                      display: 'inline-block',
                      marginTop: '3px',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      background: isLeader ? '#eff6ff' : 'var(--bg)',
                      color: isLeader ? '#1d4ed8' : 'var(--text-secondary)',
                      border: isLeader ? '1px solid #bfdbfe' : '1px solid var(--border)',
                      borderRadius: '20px',
                      padding: '1px 9px',
                    }}
                  >
                    {member.role}
                  </span>
                  {member.email && (
                    <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <span>✉️</span>
                      <span style={{ fontFamily: 'monospace', letterSpacing: '0.1px' }}>{member.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Task Stats */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, background: 'var(--bg)', borderRadius: '8px', padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)' }}>{stats.assigned}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px', fontWeight: 500 }}>Assigned</div>
                </div>
                <div style={{ flex: 1, background: 'var(--bg)', borderRadius: '8px', padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--green)' }}>{stats.completed}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px', fontWeight: 500 }}>Completed</div>
                </div>
                <div style={{ flex: 1, background: 'var(--bg)', borderRadius: '8px', padding: '10px 12px', textAlign: 'center' }}>
                  <div style={{ fontSize: '18px', fontWeight: 700, color }}>{percent}%</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px', fontWeight: 500 }}>Progress</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', color: 'var(--text-muted)', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 500 }}>Task Completion</span>
                  <span style={{ fontWeight: 600, color }}>{percent}%</span>
                </div>
                <div style={{ height: '6px', background: '#eef0f6', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${percent}%`, background: color, borderRadius: '3px', transition: 'width 0.4s ease' }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {members.length === 0 && (
        <div className="card empty-state" style={{ marginTop: '10px', textAlign: 'center', padding: '40px' }}>
          <p style={{ fontSize: '14px', fontWeight: 500 }}>No team members assigned to this project yet.</p>
          <button className="btn btn-primary" style={{ marginTop: '12px' }} onClick={openAddModal}>
            + Add First Member
          </button>
        </div>
      )}

      {/* Add Member Modal */}
      {showAddModal && (
        <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) closeAddModal(); }}>
          <div style={modalStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Add Team Member</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Add a new member specifically to <strong>{teamName}</strong> ({projectName}).
                </p>
              </div>
              <button type="button" className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '13px', lineHeight: 1 }} onClick={closeAddModal}>
                ✕
              </button>
            </div>
            {addError && (
              <div style={{ background: '#fef2f2', color: 'var(--red)', border: '1px solid #fecaca', padding: '9px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', marginBottom: '14px' }}>
                {addError}
              </div>
            )}
            <form onSubmit={handleAddMember}>
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="add-member-name" style={labelStyle}>
                  Student Name <span style={{ color: 'var(--red)' }}>*</span>
                </label>
                <input
                  id="add-member-name"
                  type="text"
                  placeholder="e.g. Priya Sharma"
                  value={addName}
                  autoFocus
                  onChange={(e) => { setAddName(e.target.value); if (addError) setAddError(''); }}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="add-member-email" style={labelStyle}>
                  Email / Student ID <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  id="add-member-email"
                  type="text"
                  placeholder="e.g. priya@college.edu"
                  value={addEmail}
                  onChange={(e) => setAddEmail(e.target.value)}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="add-member-role" style={labelStyle}>Role</label>
                <select id="add-member-role" value={addRole} onChange={(e) => setAddRole(e.target.value)} style={inputStyle}>
                  <option value="Team Member">Team Member</option>
                  <option value="Team Leader">Team Leader</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                <button type="button" className="btn btn-outline" onClick={closeAddModal}>Cancel</button>
                <button type="submit" id="btn-submit-add-member" className="btn btn-primary" style={{ fontWeight: 600 }}>
                  Add Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {showEditModal && (
        <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) closeEditModal(); }}>
          <div style={modalStyle}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '18px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>Edit Member</h3>
                <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>Updating {editingMember?.name} in {teamName}.</p>
              </div>
              <button type="button" className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '13px', lineHeight: 1 }} onClick={closeEditModal}>
                ✕
              </button>
            </div>
            {editError && (
              <div style={{ background: '#fef2f2', color: 'var(--red)', border: '1px solid #fecaca', padding: '9px 12px', borderRadius: 'var(--radius-sm)', fontSize: '12.5px', marginBottom: '14px' }}>
                {editError}
              </div>
            )}
            <form onSubmit={handleSaveEdit}>
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="edit-member-name" style={labelStyle}>Student Name <span style={{ color: 'var(--red)' }}>*</span></label>
                <input id="edit-member-name" type="text" value={editName} onChange={(e) => { setEditName(e.target.value); if (editError) setEditError(''); }} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="edit-member-email" style={labelStyle}>Email / Student ID</label>
                <input id="edit-member-email" type="text" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} style={inputStyle} />
              </div>
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="edit-member-role" style={labelStyle}>Role</label>
                <select id="edit-member-role" value={editRole} onChange={(e) => setEditRole(e.target.value)} style={inputStyle}>
                  <option value="Team Member">Team Member</option>
                  <option value="Team Leader">Team Leader</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px', paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
                <button type="button" className="btn btn-outline" onClick={closeEditModal}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ fontWeight: 600 }}>Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Remove Member Confirm Modal */}
      {showRemoveConfirm && (
        <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) setShowRemoveConfirm(false); }}>
          <div style={modalStyle}>
            <h3 style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>Remove Member</h3>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.5', marginBottom: '20px' }}>
              Are you sure you want to remove <strong>{removingMember?.name}</strong> from <strong>{teamName}</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button type="button" className="btn btn-outline" onClick={() => setShowRemoveConfirm(false)}>Cancel</button>
              <button type="button" className="btn btn-danger" style={{ background: 'var(--red)', color: '#ffffff', border: 'none' }} onClick={confirmRemove}>
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
