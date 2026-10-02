import React from 'react';

export default function Dashboard({
  tasks = [],
  team = [],
  currentUser,
  onCompleteTask,
  setActivePage,
  currentProject,
}) {
  // Calculations
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'Completed').length;
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Active user's task stats
  const userName = currentUser?.name || 'Sara';
  const isMemberOfProject = team.some((m) => m.name === userName);
  const myTasks = tasks.filter(
    (t) => t.assignee === userName || t.assignedTo === userName
  );
  const myTotal = myTasks.length;
  const myCompleted = myTasks.filter((t) => t.status === 'Completed').length;
  const myPending = Math.max(0, myTotal - myCompleted);

  // Active / Upcoming pending tasks
  const pendingTasksCount = tasks.filter((t) => t.status !== 'Completed').length;

  const summaryCards = [
    {
      title: isMemberOfProject ? 'My Tasks' : 'Project Tasks',
      value: (isMemberOfProject ? myTotal : totalTasks).toString(),
      subtitle: isMemberOfProject
        ? myPending === 1
          ? '1 pending'
          : myPending === 0
          ? '0 pending (All caught up! 🎉)'
          : `${myPending} pending`
        : `${completedTasks} completed`,
    },
    {
      title: 'Team Progress',
      value: `${completionPercentage}%`,
      subtitle: 'Overall completion',
    },
    {
      title: 'Upcoming',
      value: pendingTasksCount.toString(),
      subtitle: 'Due this week',
    },
    {
      title: 'Team Members',
      value: (team?.length || currentProject?.membersCount || 0).toString(),
      subtitle: `${currentProject?.team || 'Team'} members`,
    },
  ];

  // Specific upcoming tasks to show in the Dashboard view (first 4 tasks of this project)
  const displayTasks = tasks.slice(0, 4);

  return (
    <div>
      {/* Back to My Projects Breadcrumb */}
      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          className="btn btn-outline"
          style={{
            padding: '5px 12px',
            fontSize: '12px',
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
        <span style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500 }}>
          {currentProject?.name || 'Design Thinking & Problem Solving'}
        </span>
      </div>

      {/* College Project Meta Bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '8px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)',
          padding: '8px 14px',
          marginBottom: '20px',
          fontSize: '12.5px',
          color: 'var(--text-secondary)',
        }}
      >
        <div>
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>Project: </span>
          {currentProject?.name || 'Design Thinking & Problem Solving'}
        </div>
        <div style={{ display: 'flex', gap: '16px' }}>
          <span>
            <strong style={{ color: 'var(--text-primary)' }}>Team:</strong> {currentProject?.team || 'Team 7'} ({currentProject?.members || '4 Members'})
          </span>
          <span>
            <strong style={{ color: 'var(--text-primary)' }}>Final Deadline:</strong> {currentProject?.deadline || '15 October 2026'}
          </span>
        </div>
      </div>

      {/* Welcome Section */}
      <div
        className="flex-between"
        style={{
          marginBottom: '24px',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div>
          <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Good morning, {currentUser?.name || 'Sara'} 👋
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '3px' }}>
            Here's what's happening with {currentProject?.team || 'your team'}.
          </p>
        </div>

        <button
          className="btn btn-primary"
          style={{
            padding: '9px 18px',
            fontSize: '13.5px',
            fontWeight: 600,
            boxShadow: 'var(--shadow-sm)',
          }}
          onClick={() => setActivePage('tasks')}
        >
          + Add Task
        </button>
      </div>

      {/* 4 Small Summary Cards */}
      <div className="stats-row" style={{ marginBottom: '24px' }}>
        {summaryCards.map((card, idx) => (
          <div key={idx} className="stat-card">
            <div className="stat-label">{card.title}</div>
            <div
              className="stat-value"
              style={{
                color:
                  card.title === 'Team Progress'
                    ? 'var(--accent)'
                    : 'var(--text-primary)',
                transition: 'color 0.2s',
              }}
            >
              {card.value}
            </div>
            <div className="stat-sub">{card.subtitle}</div>
          </div>
        ))}
      </div>

      {/* Project Progress Section */}
      <div className="card" style={{ marginBottom: '24px' }}>
        <div className="flex-between" style={{ marginBottom: '10px' }}>
          <h3 className="section-title" style={{ margin: 0 }}>
            Project Progress
          </h3>
          <span
            style={{
              fontSize: '15px',
              fontWeight: 700,
              color: 'var(--accent)',
              transition: 'all 0.3s ease',
            }}
          >
            {completionPercentage}% completed
          </span>
        </div>

        <div className="progress-bar-wrap" style={{ height: '11px', background: '#eceef8' }}>
          <div
            className="progress-bar-fill"
            style={{
              width: `${completionPercentage}%`,
              background: 'var(--accent)',
              transition: 'width 0.4s ease',
            }}
          />
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '11.5px',
            color: 'var(--text-muted)',
            marginTop: '8px',
          }}
        >
          <span>
            {completedTasks} of {totalTasks} deliverables completed
          </span>
          <span>Target: {currentProject?.deadline || 'Ongoing'}</span>
        </div>
      </div>

      {/* Upcoming Tasks Section */}
      <div className="card">
        <div className="flex-between" style={{ marginBottom: '16px' }}>
          <div>
            <h3 className="section-title" style={{ margin: 0 }}>
              Upcoming Tasks
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
              Tasks can be marked complete below to update project progress.
            </p>
          </div>
          <button
            className="btn btn-outline"
            style={{ fontSize: '12px', padding: '4px 10px' }}
            onClick={() => setActivePage('tasks')}
          >
            View all tasks &rarr;
          </button>
        </div>

        <div className="task-list">
          {displayTasks.map((task) => {
            const isCompleted = task.status === 'Completed';

            return (
              <div
                key={task.id}
                className="task-item"
                style={{
                  alignItems: 'center',
                  padding: '14px 18px',
                  border: '1px solid var(--border)',
                  background: isCompleted ? '#f9fafb' : '#ffffff',
                  transition: 'background 0.2s',
                }}
              >
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)',
                      textDecoration: isCompleted ? 'line-through' : 'none',
                      marginBottom: '4px',
                      transition: 'color 0.2s',
                    }}
                  >
                    {task.title}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                      flexWrap: 'wrap',
                    }}
                  >
                    <span>
                      Assigned to:{' '}
                      <strong style={{ color: 'var(--text-primary)' }}>
                        {task.assignee || task.assignedTo}
                      </strong>
                    </span>
                    <span>&bull;</span>
                    <span>
                      Due: <strong>{task.dueDate || task.due}</strong>
                    </span>
                  </div>
                </div>

                {/* Right Action: Mark Complete / Toggle status */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  {isCompleted ? (
                    <button
                      className="btn"
                      style={{
                        padding: '6px 14px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        background: '#dcfce7',
                        color: '#15803d',
                        border: '1px solid #bbf7d0',
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                      onClick={() => onCompleteTask(task.id)}
                      title="Click to toggle back to pending"
                    >
                      ✓ Completed
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary"
                      style={{
                        padding: '6px 14px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        borderRadius: 'var(--radius-sm)',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: 'var(--shadow-sm)',
                      }}
                      onClick={() => onCompleteTask(task.id)}
                      title="Click to mark this task complete"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
          {displayTasks.length === 0 && (
            <div className="empty-state">No upcoming deliverables for this project.</div>
          )}
        </div>
      </div>

      {/* Why TeamTrack? Section */}
      <div className="card" style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h3 className="section-title" style={{ margin: 0, fontSize: '15px' }}>
            Why TeamTrack?
          </h3>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            A simple Before &amp; After comparison of college team collaboration.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '16px',
          }}
        >
          {/* Before TeamTrack */}
          <div
            style={{
              background: '#fef2f2',
              border: '1px solid #fee2e2',
              borderRadius: 'var(--radius-sm)',
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#b91c1c',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '13px' }}>✕</span>
              <span>BEFORE TEAMTRACK</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              {[
                'WhatsApp messages',
                '"Who is doing this?"',
                'Unclear responsibilities',
                'Missed deadlines',
                "One student completes someone else's work",
              ].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #fecaca',
                      borderRadius: 'var(--radius-sm)',
                      padding: '7px 10px',
                      fontSize: '12px',
                      color: '#991b1b',
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    {step}
                  </div>
                  {idx < arr.length - 1 && (
                    <span style={{ color: '#f87171', fontSize: '12px', lineHeight: '1.2' }}>↓</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* After TeamTrack */}
          <div
            style={{
              background: '#f0fdf4',
              border: '1px solid #dcfce7',
              borderRadius: 'var(--radius-sm)',
              padding: '14px 16px',
            }}
          >
            <div
              style={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#15803d',
                letterSpacing: '0.6px',
                textTransform: 'uppercase',
                marginBottom: '10px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span style={{ fontSize: '13px' }}>✓</span>
              <span>AFTER TEAMTRACK</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}>
              {[
                'Assign task',
                'Set deadline',
                'Track progress',
                'Complete task',
                'Everyone sees responsibility',
              ].map((step, idx, arr) => (
                <React.Fragment key={idx}>
                  <div
                    style={{
                      width: '100%',
                      background: '#ffffff',
                      border: '1px solid #bbf7d0',
                      borderRadius: 'var(--radius-sm)',
                      padding: '7px 10px',
                      fontSize: '12px',
                      color: '#166534',
                      fontWeight: 500,
                      textAlign: 'center',
                    }}
                  >
                    {step}
                  </div>
                  {idx < arr.length - 1 && (
                    <span style={{ color: '#4ade80', fontSize: '12px', lineHeight: '1.2' }}>↓</span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
