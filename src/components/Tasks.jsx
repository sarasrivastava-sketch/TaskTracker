import React, { useState, useEffect } from 'react';

export default function Tasks({
  tasks = [],
  team = [],
  onToggleTask,
  onAddTask,
  onDeleteTask,
  currentProject,
  setActivePage,
}) {
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterMember, setFilterMember] = useState('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // New task form fields
  const [newTitle, setNewTitle] = useState('');
  const [newAssignee, setNewAssignee] = useState(() => team[0]?.name || 'Sara');

  useEffect(() => {
    const names = team.map((m) => m.name);
    if (!names.includes(newAssignee)) {
      setNewAssignee(team[0]?.name || 'Sara');
    }
  }, [team]);

  const [newDueDate, setNewDueDate] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [newCategory, setNewCategory] = useState('Development');

  const handleCreateTask = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddTask({
      title: newTitle.trim(),
      assignee: newAssignee || (team[0] ? team[0].name : 'Sara'),
      dueDate: newDueDate || 'Nov 01',
      priority: newPriority,
      category: newCategory,
      status: 'Pending',
    });

    setNewTitle('');
    setNewDueDate('');
    setShowAddForm(false);
  };

  const filteredTasks = tasks.filter((task) => {
    const statusMatch = filterStatus === 'All' || task.status === filterStatus;
    const memberMatch = filterMember === 'All' || task.assignee === filterMember;
    return statusMatch && memberMatch;
  });

  const projectColor = currentProject?.color || '#5b6af0';
  const teamName = currentProject?.team || 'Team 7';
  const projectName = currentProject?.name || 'Campus Teamwork';

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
            {teamName} Dashboard
          </span>
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/</span>
          <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>Tasks</span>
        </div>
      )}

      <div className="page-header flex-between" style={{ flexWrap: 'wrap', gap: '14px', marginBottom: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <span
              style={{
                background: projectColor,
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '10px',
                fontSize: '11.5px',
                fontWeight: 700,
              }}
            >
              {teamName}
            </span>
            <span style={{ fontSize: '13.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>
              {projectName}
            </span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>
            Project Tasks
          </h2>
          <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Assign and track individual contributions for {teamName}.
          </p>
        </div>
        <button
          id="btn-add-task"
          className="btn btn-primary"
          style={{ padding: '9px 18px', fontSize: '13.5px', fontWeight: 600 }}
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? 'Close Form' : '+ Add New Task'}
        </button>
      </div>

      {/* Add Task Modal / Form */}
      {showAddForm && (
        <div className="card mb-12" style={{ background: '#fafbff', borderColor: '#dce2fb', padding: '20px', marginBottom: '20px' }}>
          <h3 className="section-title" style={{ marginBottom: '14px', fontSize: '16px', fontWeight: 700 }}>
            Assign New Task to {teamName}
          </h3>
          <form onSubmit={handleCreateTask}>
            <div className="form-group" style={{ marginBottom: '14px' }}>
              <label htmlFor="task-title" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                Task Description / Deliverable <span style={{ color: 'var(--red)' }}>*</span>
              </label>
              <input
                id="task-title"
                type="text"
                placeholder="e.g. Conduct user interviews and summarize findings"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
                style={{ width: '100%', padding: '9px 12px', fontSize: '13.5px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '14px', marginBottom: '16px' }}>
              <div className="form-group">
                <label htmlFor="task-assignee" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Assign To
                </label>
                <select
                  id="task-assignee"
                  value={newAssignee}
                  onChange={(e) => setNewAssignee(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '13px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                >
                  {team.map((member) => (
                    <option key={member.id} value={member.name}>
                      {member.name} {member.isLeader ? '(Leader)' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="task-due" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Due Date
                </label>
                <input
                  id="task-due"
                  type="text"
                  placeholder="e.g. 20 Oct"
                  value={newDueDate}
                  onChange={(e) => setNewDueDate(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '13px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="task-priority" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Priority
                </label>
                <select
                  id="task-priority"
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '13px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="task-category" style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  id="task-category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  style={{ width: '100%', padding: '8px 12px', fontSize: '13px', border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}
                >
                  <option value="Research">Research</option>
                  <option value="Design">Design</option>
                  <option value="Documentation">Documentation</option>
                  <option value="Development">Development</option>
                  <option value="Presentation">Presentation</option>
                  <option value="QA">QA & Review</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="submit" id="btn-submit-task" className="btn btn-primary" style={{ fontWeight: 600 }}>
                Add Task
              </button>
              <button
                type="button"
                className="btn btn-outline"
                onClick={() => setShowAddForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter Bar */}
      <div className="card" style={{ padding: '12px 16px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Status:
            </span>
            {['All', 'Pending', 'Completed'].map((st) => (
              <button
                key={st}
                className={`filter-chip ${filterStatus === st ? 'active' : ''}`}
                onClick={() => setFilterStatus(st)}
                style={{
                  padding: '3px 10px',
                  borderRadius: '14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid var(--border)',
                  background: filterStatus === st ? 'var(--accent)' : 'var(--surface)',
                  color: filterStatus === st ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {st}
              </button>
            ))}
          </div>

          <div style={{ width: '1px', height: '20px', background: 'var(--border)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '12.5px', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Member:
            </span>
            <button
              className={`filter-chip ${filterMember === 'All' ? 'active' : ''}`}
              onClick={() => setFilterMember('All')}
              style={{
                padding: '3px 10px',
                borderRadius: '14px',
                fontSize: '12px',
                fontWeight: 600,
                border: '1px solid var(--border)',
                background: filterMember === 'All' ? 'var(--accent)' : 'var(--surface)',
                color: filterMember === 'All' ? '#ffffff' : 'var(--text-secondary)',
                cursor: 'pointer',
              }}
            >
              All Members
            </button>
            {team.map((m) => (
              <button
                key={m.id}
                className={`filter-chip ${filterMember === m.name ? 'active' : ''}`}
                onClick={() => setFilterMember(m.name)}
                style={{
                  padding: '3px 10px',
                  borderRadius: '14px',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid var(--border)',
                  background: filterMember === m.name ? 'var(--accent)' : 'var(--surface)',
                  color: filterMember === m.name ? '#ffffff' : 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tasks List */}
      <div className="card" style={{ padding: '8px 16px' }}>
        {filteredTasks.map((task) => {
          const isDone = task.status === 'Completed';
          return (
            <div
              key={task.id}
              className="task-item"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 8px',
                borderBottom: '1px solid var(--border)',
                gap: '12px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={isDone}
                  onChange={() => onToggleTask(task.id)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: 'var(--accent)' }}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: isDone ? 'var(--text-muted)' : 'var(--text-primary)',
                      textDecoration: isDone ? 'line-through' : 'none',
                      marginBottom: '4px',
                    }}
                  >
                    {task.title}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', fontSize: '12px', color: 'var(--text-secondary)' }}>
                    <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>👤 {task.assignee}</span>
                    <span>•</span>
                    <span>📅 Due: {task.dueDate}</span>
                    <span>•</span>
                    <span
                      style={{
                        background: 'var(--bg)',
                        padding: '1px 8px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: 600,
                        border: '1px solid var(--border)',
                      }}
                    >
                      {task.category || 'General'}
                    </span>
                    <span
                      style={{
                        padding: '1px 8px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: isDone ? '#ecfdf5' : '#fffbeb',
                        color: isDone ? '#059669' : '#d97706',
                      }}
                    >
                      {task.status}
                    </span>
                    <span
                      style={{
                        padding: '1px 8px',
                        borderRadius: '10px',
                        fontSize: '11px',
                        fontWeight: 700,
                        background: task.priority === 'High' ? '#fee2e2' : '#f3f4f6',
                        color: task.priority === 'High' ? '#dc2626' : 'var(--text-secondary)',
                      }}
                    >
                      {task.priority} Priority
                    </span>
                  </div>
                </div>
              </div>

              <button
                className="btn btn-outline"
                style={{
                  padding: '4px 8px',
                  fontSize: '12px',
                  color: 'var(--text-muted)',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onClick={() => onDeleteTask(task.id)}
                title="Delete task"
              >
                ✕
              </button>
            </div>
          );
        })}

        {filteredTasks.length === 0 && (
          <div style={{ padding: '36px 16px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '14.5px', fontWeight: 500 }}>
              {tasks.length === 0
                ? 'No tasks assigned to this project yet. Click "+ Add New Task" to start planning deliverables!'
                : 'No tasks match the selected filters.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
