import React from 'react';

export default function FacultyView({ tasks = [], team = [], currentProject }) {
  const students = (team || []).map((st) => {
    const assigned = tasks.filter((t) => t.assignee === st.name || t.assignedTo === st.name);
    const completed = assigned.filter((t) => t.status === 'Completed').length;
    const progress = assigned.length > 0 ? `${Math.round((completed / assigned.length) * 100)}%` : '0%';
    return {
      ...st,
      assigned: assigned.length,
      completed,
      progress,
    };
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const overallProgress =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div>
      {/* Page Header */}
      <div className="page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <h2>Faculty Project Overview</h2>
          <span className="badge badge-purple" style={{ fontSize: '11px' }}>
            Faculty View
          </span>
        </div>
        <p>Monitor team progress and individual contribution for {currentProject?.name || 'this project'}.</p>
      </div>

      {/* Project Summary Card */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '16px',
          }}
        >
          <div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Project
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {currentProject?.name || 'Academic Project'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Team
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {currentProject?.team || 'Team'}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Overall Progress
            </div>
            <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--accent)', marginTop: '2px' }}>
              {overallProgress}%
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11.5px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
              Final Deadline
            </div>
            <div style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '4px' }}>
              {currentProject?.deadline || 'Ongoing'}
            </div>
          </div>
        </div>

        {/* Overall progress indicator bar */}
        <div className="progress-bar-wrap" style={{ height: '8px', background: '#eceef8', marginTop: '16px' }}>
          <div className="progress-bar-fill" style={{ width: `${overallProgress}%`, background: 'var(--accent)', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      {/* Individual Contribution Table */}
      <div className="card" style={{ marginBottom: '24px', padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px 12px', borderBottom: '1px solid var(--border)' }}>
          <h3 className="section-title" style={{ margin: 0 }}>
            Individual Student Contribution
          </h3>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              textAlign: 'left',
              fontSize: '13px',
            }}
          >
            <thead>
              <tr style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)' }}>
                <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Student
                </th>
                <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Assigned
                </th>
                <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Completed
                </th>
                <th style={{ padding: '12px 20px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Progress
                </th>
              </tr>
            </thead>
            <tbody>
              {students.map((student, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: idx < students.length - 1 ? '1px solid var(--border)' : 'none',
                  }}
                >
                  <td style={{ padding: '14px 20px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: `${student.color || 'var(--accent)'}18`,
                          color: student.color || 'var(--accent)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '11px',
                          fontWeight: 700,
                        }}
                      >
                        {student.avatar || student.name[0]}
                      </div>
                      <span>{student.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 20px', color: 'var(--text-secondary)', fontWeight: 500 }}>
                    {student.assigned}
                  </td>
                  <td style={{ padding: '14px 20px', color: 'var(--green)', fontWeight: 600 }}>
                    {student.completed}
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div className="progress-bar-wrap" style={{ width: '80px', height: '6px', background: '#e5e7eb' }}>
                        <div
                          className="progress-bar-fill"
                          style={{ width: student.progress, backgroundColor: student.color || 'var(--accent)' }}
                        />
                      </div>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                        {student.progress}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                    No team members enrolled in this project yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Faculty Informational Note */}
      <div
        style={{
          background: 'var(--surface)',
          borderLeft: '4px solid var(--accent)',
          borderTop: '1px solid var(--border)',
          borderRight: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '14px 18px',
        }}
      >
        <p
          style={{
            fontSize: '12.5px',
            color: 'var(--text-secondary)',
            lineHeight: '1.5',
            margin: 0,
          }}
        >
          Faculty can use this view to understand project progress and individual contribution.
        </p>
      </div>
    </div>
  );
}
