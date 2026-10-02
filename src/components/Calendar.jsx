import React from 'react';

export default function Calendar({ projects = [], tasks = [] }) {
  const events = [
    {
      date: '2 Oct 2026',
      title: 'Problem Definition & Empathy Map Due',
      project: 'Design Thinking & Problem Solving',
      tag: 'Deliverable',
      status: 'Completed',
    },
    {
      date: '4 Oct 2026',
      title: 'User Flow & Wireframing Due',
      project: 'Design Thinking & Problem Solving',
      tag: 'Milestone',
      status: 'Completed',
    },
    {
      date: '7 Oct 2026',
      title: 'Survey Insights & Synthesis Due',
      project: 'Design Thinking & Problem Solving',
      tag: 'Task',
      status: 'Pending',
    },
    {
      date: '10 Oct 2026',
      title: 'Component Library Review',
      project: 'Web UI & Content Management',
      tag: 'Milestone',
      status: 'In Progress',
    },
    {
      date: '15 Oct 2026',
      title: 'Final Project Submission & Presentation',
      project: 'Design Thinking & Problem Solving (Team 7)',
      tag: 'Final Deadline',
      status: 'Pending',
      isMajor: true,
    },
    {
      date: '20 Oct 2026',
      title: 'Final Deliverable Submission',
      project: 'Web UI & Content Management (Team 3)',
      tag: 'Final Deadline',
      status: 'Pending',
      isMajor: true,
    },
    {
      date: '25 Oct 2026',
      title: 'Cloud Architecture & Demo Submission',
      project: 'Cloud Computing (Team 5)',
      tag: 'Final Deadline',
      status: 'Pending',
      isMajor: true,
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h2>Academic Calendar &amp; Deadlines</h2>
        <p>Keep track of project milestones, submissions, and final deadlines.</p>
      </div>

      {/* Summary Cards */}
      <div className="stats-row" style={{ marginBottom: '24px' }}>
        <div className="stat-card">
          <div className="stat-label">Active Projects</div>
          <div className="stat-value">{projects.length || 3}</div>
          <div className="stat-sub">Across 3 courses</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Upcoming Deadlines</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>3</div>
          <div className="stat-sub">This month</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">Next Final Deadline</div>
          <div className="stat-value" style={{ fontSize: '18px', color: 'var(--red)', marginTop: '8px' }}>
            15 Oct 2026
          </div>
          <div className="stat-sub">Design Thinking</div>
        </div>
      </div>

      {/* Timeline Card */}
      <div className="card">
        <h3 className="section-title" style={{ marginBottom: '16px' }}>
          October 2026 Schedule
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {events.map((evt, idx) => (
            <div
              key={idx}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 18px',
                background: evt.isMajor ? '#f8f9ff' : 'var(--bg)',
                border: evt.isMajor ? '1px solid #c7d2fe' : '1px solid var(--border)',
                borderLeft: evt.isMajor ? '4px solid var(--accent)' : '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                flexWrap: 'wrap',
                gap: '10px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div
                  style={{
                    background: evt.isMajor ? 'var(--accent)' : '#ffffff',
                    color: evt.isMajor ? '#ffffff' : 'var(--text-primary)',
                    border: evt.isMajor ? 'none' : '1px solid var(--border)',
                    padding: '6px 12px',
                    borderRadius: '6px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    textAlign: 'center',
                    minWidth: '95px',
                  }}
                >
                  {evt.date.split(' 2026')[0]}
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {evt.title}
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {evt.project}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span
                  className="badge badge-purple"
                  style={{ fontSize: '11px', padding: '3px 9px' }}
                >
                  {evt.tag}
                </span>
                <span
                  className={`status-badge ${
                    evt.status === 'Completed'
                      ? 'status-completed'
                      : evt.status === 'In Progress'
                      ? 'status-in-progress'
                      : 'status-pending'
                  }`}
                >
                  {evt.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
