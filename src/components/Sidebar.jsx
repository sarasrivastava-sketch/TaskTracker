import React from 'react';

export default function Sidebar({
  activePage,
  setActivePage,
  currentUser,
  onLogout,
  currentProject,
  projects = [],
  onSelectProject,
}) {
  const mainNavItems = [
    {
      id: 'projects',
      label: 'My Projects',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      ),
    },
    {
      id: 'calendar',
      label: 'Calendar',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      id: 'faculty',
      label: 'Faculty View',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      ),
    },
  ];

  const projectNavItems = [
    {
      id: 'dashboard',
      label: 'Project Dashboard',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      ),
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4" />
          <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
        </svg>
      ),
    },
    {
      id: 'team',
      label: 'Team',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
    {
      id: 'progress',
      label: 'Progress',
      icon: (
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      ),
    },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h1>TeamTrack</h1>
        <p>Make teamwork clear.</p>
      </div>

      <nav className="sidebar-nav">
        {/* Main top-level navigation: My Projects, Calendar, Faculty View */}
        {mainNavItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            className={`nav-item ${activePage === item.id ? 'active' : ''}`}
            onClick={() => setActivePage(item.id)}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}

        {/* Selected Project Sub-navigation when a project is open */}
        {currentProject && (
          <div
            style={{
              marginTop: '14px',
              paddingTop: '12px',
              borderTop: '1px solid var(--border)',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                letterSpacing: '0.4px',
                padding: '0 8px 6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {currentProject.team || 'Active Project'}
              </span>
              <span
                style={{
                  fontSize: '9.5px',
                  background: 'var(--accent-light)',
                  color: 'var(--accent)',
                  padding: '1px 6px',
                  borderRadius: '10px',
                  fontWeight: 700,
                }}
              >
                Project
              </span>
            </div>

            {projectNavItems.map((item) => (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                className={`nav-item ${activePage === item.id ? 'active' : ''}`}
                onClick={() => setActivePage(item.id)}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ))}

            {/* Project Selector */}
            <div
              style={{
                marginTop: '12px',
                padding: '8px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>
                Switch Project:
              </span>
              <select
                onChange={(e) => {
                  const project = projects.find((p) => p.id === e.target.value);
                  if (project && onSelectProject) {
                    onSelectProject(project);
                  }
                }}
                style={{
                  width: '100%',
                  padding: '6px 10px',
                  fontSize: '12px',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--bg)',
                  color: 'var(--text-primary)',
                }}
              >
                <option value="">-- Select Project --</option>
                {projects.map((project) => (
                  <option
                    key={project.id}
                    value={project.id}
                    style={{
                      background: project.color || 'var(--accent-light)',
                      color: project.color ? '#fff' : 'var(--text-primary)',
                    }}
                  >
                    {project.name} — {project.team}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </nav>

      {/* Sidebar Footer with user Sara & Student */}
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{currentUser.name ? currentUser.name[0] : 'S'}</div>
          <div className="user-details">
            <div className="user-name">{currentUser.name || 'Sara'}</div>
            <div className="user-role">{currentUser.role || 'Student'}</div>
          </div>
        </div>
        <button id="btn-logout" className="btn-logout" onClick={onLogout}>
          Log Out
        </button>
      </div>
    </aside>
  );
}
