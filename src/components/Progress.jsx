import React from 'react';

export default function Progress({
  tasks = [],
  team = [],
  currentProject,
  setActivePage,
}) {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter((t) => t.status === 'Pending').length;

  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const memberList = team || [];

  const memberContributions = memberList.map((m) => {
    const memberTasks = tasks.filter((t) => t.assignee === m.name || t.assignedTo === m.name);
    const assignedCount = memberTasks.length;
    const completedCount = memberTasks.filter((t) => t.status === 'Completed').length;
    const completionPercent =
      assignedCount > 0 ? Math.round((completedCount / assignedCount) * 100) : 0;

    return {
      name: m.name,
      initial: m.avatar || m.initial || m.name[0],
      tasks: assignedCount,
      completed: completedCount,
      completionPercent,
      color: m.color || '#5b6af0',
    };
  });

  return (
    <div>
      {/* Breadcrumb */}
      {currentProject && setActivePage && (
        <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            className="btn btn-outline"
            style={{
              padding: '4px 10px',
              fontSize: '11.5px',
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
            onClick={() => setActivePage('projects')}
          >
            <span>&larr;</span>
            <span>Back to My Projects</span>
          </button>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/</span>
          <span
            style={{ fontSize: '12px', color: 'var(--accent)', cursor: 'pointer', fontWeight: 500 }}
            onClick={() => setActivePage('dashboard')}
          >
            {currentProject.team} Dashboard
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Progress</span>
        </div>
      )}

      {/* Page Header */}
      <div className="page-header">
        <h2>Team Progress</h2>
        <p>Track project completion and contribution.</p>
      </div>

      {/* Large Project Progress Card */}
      <div className="card" style={{ marginBottom: '24px', padding: '24px' }}>
        <div className="flex-between" style={{ marginBottom: '14px', alignItems: 'baseline' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Overall Project Progress
            </h3>
          </div>
          <span style={{ fontSize: '32px', fontWeight: 700, color: 'var(--accent)' }}>
            {overallProgress}%
          </span>
        </div>

        {/* Large Progress Bar */}
        <div className="progress-bar-wrap" style={{ height: '16px', background: '#eceef8', borderRadius: '30px' }}>
          <div
            className="progress-bar-fill"
            style={{
              width: `${overallProgress}%`,
              background: 'var(--accent)',
              borderRadius: '30px',
              transition: 'width 0.4s ease',
            }}
          />
        </div>
      </div>

      {/* Task Completion Section */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 className="section-title" style={{ marginBottom: '16px' }}>
          Task Completion
        </h3>

        <div className="stats-row" style={{ margin: 0 }}>
          <div className="stat-card" style={{ background: 'var(--bg)' }}>
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value">{totalTasks}</div>
          </div>
          <div className="stat-card" style={{ background: 'var(--bg)' }}>
            <div className="stat-label">Completed</div>
            <div className="stat-value" style={{ color: 'var(--green)' }}>{completedTasks}</div>
          </div>
          <div className="stat-card" style={{ background: 'var(--bg)' }}>
            <div className="stat-label">In Progress</div>
            <div className="stat-value" style={{ color: 'var(--yellow)' }}>{inProgressTasks}</div>
          </div>
          <div className="stat-card" style={{ background: 'var(--bg)' }}>
            <div className="stat-label">Pending</div>
            <div className="stat-value" style={{ color: 'var(--text-secondary)' }}>{pendingTasks}</div>
          </div>
        </div>
      </div>

      {/* Member Contribution Section */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <h3 className="section-title" style={{ marginBottom: '18px' }}>
          Member Contribution
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {memberContributions.map((member, index) => (
            <div
              key={index}
              style={{
                padding: '14px 16px',
                background: 'var(--bg)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
              }}
            >
              {/* Member Row Header */}
              <div
                className="flex-between"
                style={{
                  marginBottom: '10px',
                  flexWrap: 'wrap',
                  gap: '8px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: `${member.color}20`,
                      color: member.color,
                      fontSize: '12px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {member.initial}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {member.name}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12.5px' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {member.tasks} tasks
                  </span>
                  <span>&bull;</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    <strong style={{ color: 'var(--green)' }}>{member.completed}</strong> completed
                  </span>
                  <span>&bull;</span>
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {member.completionPercent}% completion
                  </span>
                </div>
              </div>

              {/* Simple Horizontal Progress Bar */}
              <div className="progress-bar-wrap" style={{ height: '8px', background: '#e5e7eb' }}>
                <div
                  className="progress-bar-fill"
                  style={{
                    width: `${member.completionPercent}%`,
                    backgroundColor: member.color,
                  }}
                />
              </div>
            </div>
          ))}
          {memberContributions.length === 0 && (
            <div className="empty-state">No team members enrolled in this project yet.</div>
          )}
        </div>
      </div>

      {/* Informational Box */}
      <div
        style={{
          background: 'var(--surface)',
          borderLeft: '4px solid var(--accent)',
          borderTop: '1px solid var(--border)',
          borderRight: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px 20px',
        }}
      >
        <h4
          style={{
            fontSize: '13.5px',
            fontWeight: 600,
            color: 'var(--text-primary)',
            marginBottom: '6px',
          }}
        >
          Why this matters
        </h4>
        <p
          style={{
            fontSize: '13px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            margin: 0,
          }}
        >
          TeamTrack makes individual responsibilities visible so teams can identify pending work early and distribute work more clearly.
        </p>
      </div>
    </div>
  );
}
