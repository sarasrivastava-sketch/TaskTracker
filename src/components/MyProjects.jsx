import React, { useState, useEffect } from 'react';

export default function MyProjects({
  projects = [],
  onSelectProject,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All Courses');
  const [showModal, setShowModal] = useState(false);

  // Three-dot menu state
  const [openMenuId, setOpenMenuId] = useState(null);

  // Edit Project modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [editName, setEditName] = useState('');
  const [editCourse, setEditCourse] = useState('');
  const [editTeam, setEditTeam] = useState('');
  const [editDeadline, setEditDeadline] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editError, setEditError] = useState('');

  // Delete confirmation state
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);

  // New Project Form State
  const [projectName, setProjectName] = useState('');
  const [courseSubject, setCourseSubject] = useState('Design Thinking & Problem Solving');
  const [teamName, setTeamName] = useState('');
  const [deadline, setDeadline] = useState('');
  const [description, setDescription] = useState('');
  const [validationError, setValidationError] = useState('');

  const getCourseColor = (course) => {
    switch (course) {
      case 'Design Thinking & Problem Solving': return '#5b6af0';
      case 'Web UI & Content Management': return '#10b981';
      case 'Cloud Computing': return '#f59e0b';
      case 'Software Development': return '#8b5cf6';
      default: return '#ec4899';
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    try {
      const [year, month, day] = dateStr.split('-');
      if (!year || !month || !day) return dateStr;
      const dateObj = new Date(Number(year), Number(month) - 1, Number(day));
      return dateObj.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch { return dateStr; }
  };

  const parseDateForInput = (displayDate) => {
    if (!displayDate) return '';
    try {
      const d = new Date(displayDate);
      if (isNaN(d)) return '';
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    } catch { return ''; }
  };

  // Close menu on outside click
  useEffect(() => {
    const close = () => setOpenMenuId(null);
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  // Create New Project
  const handleOpenModal = () => {
    setProjectName('');
    setCourseSubject('Design Thinking & Problem Solving');
    setTeamName('');
    setDeadline('');
    setDescription('');
    setValidationError('');
    setShowModal(true);
  };
  const handleCloseModal = () => { setShowModal(false); setValidationError(''); };

  const handleCreateProject = (e) => {
    e.preventDefault();
    if (!projectName.trim()) { setValidationError('Please enter a Project Name.'); return; }
    if (!courseSubject) { setValidationError('Please select a Course / Subject.'); return; }
    if (!teamName.trim()) { setValidationError('Please enter a Team Name.'); return; }
    setValidationError('');
    onAddProject({
      id: `p_${Date.now()}`,
      name: projectName.trim(),
      course: courseSubject,
      team: teamName.trim(),
      progress: 0,
      deadline: deadline || '',
      description: description.trim() || 'College group project deliverable tracking.',
      color: getCourseColor(courseSubject),
    });
    handleCloseModal();
  };

  // Three-dot menu toggle
  const handleMenuToggle = (e, projectId) => {
    e.stopPropagation();
    setOpenMenuId((prev) => (prev === projectId ? null : projectId));
  };

  // Edit Project
  const handleOpenEdit = (e, project) => {
    e.stopPropagation();
    setOpenMenuId(null);
    setEditingProject(project);
    setEditName(project.name);
    setEditCourse(project.course);
    setEditTeam(project.team);
    setEditDeadline(parseDateForInput(project.deadline));
    setEditDescription(project.description || '');
    setEditError('');
    setShowEditModal(true);
  };
  const handleCloseEdit = () => { setShowEditModal(false); setEditingProject(null); setEditError(''); };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editName.trim()) { setEditError('Please enter a Project Name.'); return; }
    if (!editCourse) { setEditError('Please select a Course / Subject.'); return; }
    if (!editTeam.trim()) { setEditError('Please enter a Team Name.'); return; }
    if (!editDeadline) { setEditError('Please select a Final Deadline date.'); return; }
    onUpdateProject({
      ...editingProject,
      name: editName.trim(),
      course: editCourse,
      team: editTeam.trim(),
      deadline: formatDate(editDeadline),
      description: editDescription.trim(),
      color: getCourseColor(editCourse),
    });
    handleCloseEdit();
  };

  // Delete Project
  const handleOpenDelete = (e, project) => {
    e.stopPropagation();
    setOpenMenuId(null);
    setDeletingProject(project);
    setShowDeleteConfirm(true);
  };
  const handleConfirmDelete = () => {
    if (deletingProject) onDeleteProject(deletingProject.id);
    setShowDeleteConfirm(false);
    setDeletingProject(null);
  };
  const handleCancelDelete = () => { setShowDeleteConfirm(false); setDeletingProject(null); };

  // Filter
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.team.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = selectedCourse === 'All Courses' || project.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const overlayStyle = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.5)',
    backdropFilter: 'blur(2px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    padding: '20px',
  };

  const modalCardStyle = {
    width: '100%',
    maxWidth: '500px',
    background: '#ffffff',
    borderRadius: '12px',
    padding: '28px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
    maxHeight: '90vh',
    overflowY: 'auto',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '13px',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: '6px',
  };

  const inputStyle = {
    width: '100%',
    padding: '9px 12px',
    fontSize: '13.5px',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-sm)',
    background: 'var(--bg)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const courseOptions = [
    'Design Thinking & Problem Solving',
    'Web UI & Content Management',
    'Cloud Computing',
    'Software Development',
    'Other',
  ];

  // Course cards computation for Courses summary section
  const primaryCourses = [
    { name: 'Design Thinking & Problem Solving', color: '#5b6af0' },
    { name: 'Web UI & Content Management', color: '#10b981' },
    { name: 'Cloud Computing', color: '#f59e0b' },
  ];

  const courseCards = primaryCourses.map((c) => ({
    ...c,
    count: projects.filter((p) => p.course === c.name).length,
  }));

  const additionalCourses = Array.from(
    new Set(projects.map((p) => p.course).filter((c) => !primaryCourses.some((pc) => pc.name === c)))
  );
  additionalCourses.forEach((c) => {
    courseCards.push({
      name: c,
      color: getCourseColor(c),
      count: projects.filter((p) => p.course === c).length,
    });
  });

  return (
    <div>
      {/* Page Header */}
      <div className="flex-between" style={{ marginBottom: '24px', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>My Projects</h2>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Manage all your college projects and independent teams in one place.
          </p>
        </div>
        <button
          id="btn-new-project"
          className="btn btn-primary"
          style={{ padding: '10px 20px', fontSize: '14px', fontWeight: 600 }}
          onClick={handleOpenModal}
        >
          + New Project
        </button>
      </div>

      {/* Search and Filter */}
      <div className="card" style={{ marginBottom: '20px', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '220px', position: 'relative' }}>
            <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '14px' }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Search projects by name, course, or team..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                fontSize: '13.5px',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg)',
                outline: 'none',
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label htmlFor="course-filter-dropdown" style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
              Filter by Course:
            </label>
            <select
              id="course-filter-dropdown"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              style={{
                padding: '9px 12px',
                fontSize: '13px',
                fontWeight: 500,
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface)',
                color: 'var(--text-primary)',
                outline: 'none',
                cursor: 'pointer',
                minWidth: '220px',
              }}
            >
              <option value="All Courses">All Courses</option>
              {courseOptions.filter((c) => c !== 'Other').map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Courses Summary Section */}
      <div style={{ marginBottom: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
              Courses
            </h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '2px 0 0' }}>
              Select a course to view only its project.
            </p>
          </div>
          <button
            id="btn-view-all-projects"
            className={`btn ${selectedCourse === 'All Courses' ? 'btn-primary' : 'btn-outline'}`}
            style={{ padding: '6px 14px', fontSize: '12.5px', fontWeight: 600 }}
            onClick={() => setSelectedCourse('All Courses')}
          >
            View All Projects
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {courseCards.map((c) => {
            const isSelected = selectedCourse === c.name;
            return (
              <div
                key={c.name}
                id={`course-card-${c.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="card"
                onClick={() => setSelectedCourse(c.name)}
                style={{
                  cursor: 'pointer',
                  padding: '16px 18px',
                  border: isSelected ? `2px solid ${c.color}` : '1px solid var(--border)',
                  borderLeft: `4px solid ${c.color}`,
                  background: isSelected ? 'var(--surface)' : 'var(--surface)',
                  transition: 'all 0.15s ease',
                  transform: isSelected ? 'translateY(-2px)' : 'none',
                  boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
                }}
              >
                <div style={{ fontSize: '13.5px', fontWeight: 700, color: isSelected ? c.color : 'var(--text-primary)', marginBottom: '8px', lineHeight: '1.3' }}>
                  {c.name}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    {c.count} {c.count === 1 ? 'Project' : 'Projects'}
                  </span>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: c.color }}>
                    {isSelected ? '✓ Active' : 'Filter →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Summary Header */}
      <div style={{ marginBottom: '16px', display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '0 2px' }}>
        <div>
          <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
            {selectedCourse === 'All Courses' ? 'All Independent Projects' : selectedCourse}
          </div>
<div style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '2px', fontWeight: 500 }}>
            Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'Project' : 'Projects'} with dedicated team rosters
          </div>
        </div>
        {selectedCourse !== 'All Courses' && (
          <button
            className="btn btn-outline"
            style={{ padding: '4px 12px', fontSize: '12px' }}
            onClick={() => setSelectedCourse('All Courses')}
          >
            Show All Courses
          </button>
        )}
      </div>

      {/* Projects Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))', gap: '22px' }}>
{filteredProjects.map((project) => {
          const cardColor = project.color || 'var(--accent)';
          const members = project.teamMembers || [];
          const memberCount = members.length;
          const progress = project.progress || 0;
          return (
            <div
              key={project.id}
              id={`project-card-${project.id}`}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '22px',
                position: 'relative',
                borderRadius: '12px',
                border: '1px solid var(--border)',
                borderTop: `5px solid ${cardColor}`,
                background: '#ffffff',
                boxShadow: '0 4px 14px rgba(0,0,0,0.05)',
                minHeight: '240px',
              }}
            >
              {/* Three-dot menu */}
              <div style={{ position: 'absolute', top: '16px', right: '16px' }} onMouseDown={(e) => e.stopPropagation()}>
                <button
                  id={`menu-btn-${project.id}`}
                  onClick={(e) => handleMenuToggle(e, project.id)}
                  title="Project options"
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '18px',
                    color: 'var(--text-muted)',
                    lineHeight: 1,
                  }}
                >
                  ⋮
                </button>

                {openMenuId === project.id && (
                  <div
                    onMouseDown={(e) => e.stopPropagation()}
                    style={{
                      position: 'absolute',
                      top: '32px',
                      right: 0,
                      background: '#ffffff',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
                      zIndex: 200,
                      minWidth: '160px',
                      overflow: 'hidden',
                    }}
                  >
                    {[
                      {
                        label: '📂 Open Project',
                        fn: (e) => {
                          e.stopPropagation();
                          setOpenMenuId(null);
                          onSelectProject(project);
                        },
                        color: 'var(--text-primary)',
                      },
                      {
                        label: '✏️ Edit Project',
                        fn: (e) => handleOpenEdit(e, project),
                        color: 'var(--text-primary)',
                      },
                      {
                        label: '🗑️ Delete Project',
                        fn: (e) => handleOpenDelete(e, project),
                        color: 'var(--red)',
                      },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onMouseDown={item.fn}
                        style={{
                          display: 'block',
                          width: '100%',
                          textAlign: 'left',
                          padding: '10px 16px',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          fontSize: '13px',
                          fontWeight: 500,
                          color: item.color,
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f5f6ff';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'none';
                        }}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div>
                {/* Course Header */}
                <div
                  style={{
                    display: 'inline-block',
                    fontSize: '11px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.6px',
                    color: cardColor,
                    background: `${cardColor}15`,
                    padding: '3px 8px',
                    borderRadius: '4px',
                    border: `1px solid ${cardColor}30`,
                    marginBottom: '12px',
                  }}
                >
                  {project.course}
                </div>

                {/* Project Name */}
                <h3
                  style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                    lineHeight: '1.3',
                    marginBottom: '10px',
                  }}
                >
                  {project.name}
                </h3>

                {/* Team Info */}
                <div style={{ marginBottom: '14px' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingBottom: '8px',
                      marginBottom: '8px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          background: cardColor,
                          color: '#ffffff',
                          padding: '2px 10px',
                          borderRadius: '12px',
                          fontWeight: 700,
                          fontSize: '12px',
                        }}
                      >
                        {project.team}
                      </span>
                      <span style={{ fontSize: '12.5px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                        {memberCount} {memberCount === 1 ? 'Member' : 'Members'}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
                      {progress}% Complete
                    </span>
                  </div>

                  {/* Member Roster */}
                  <div style={{ marginTop: '6px' }}>
                    <div
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: 'var(--text-muted)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '4px',
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <span>Team Members</span>
                      <span style={{ color: cardColor, fontWeight: 700 }}>{project.team}</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {members.map((m) => (
                        <span
                          key={m.id || m.name}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            background: '#ffffff',
                            border: '1px solid var(--border)',
                            borderRadius: '14px',
                            padding: '2px 8px 2px 4px',
                            fontSize: '12px',
                            fontWeight: 500,
                            color: 'var(--text-primary)',
                          }}
                        >
                          <span
                            style={{
                              width: '18px',
                              height: '18px',
                              borderRadius: '50%',
                              background: m.color || cardColor,
                              color: '#ffffff',
                              fontSize: '10px',
                              fontWeight: 700,
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            {m.name ? m.name[0] : 'S'}
                          </span>
                          <span>{m.name}</span>
                          {m.isLeader && (
                            <span
                              style={{
                                fontSize: '9px',
                                background: '#fef9c3',
                                color: '#059669',
                                padding: '1px 4px',
                                borderRadius: '6px',
                                fontWeight: 700,
                              }}
                            >
                              Lead
                            </span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  id={`btn-open-project-${project.id}`}
                  className="btn btn-primary"
                  style={{
                    width: '100%',
                    justifyContent: 'center',
                    padding: '10px 14px',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    borderRadius: '8px',
                  }}
                  onClick={() => onSelectProject(project)}
                >
                  Open Project &rarr;
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {filteredProjects.length === 0 && (
        <div style={{ marginTop: '20px', textAlign: 'center', padding: '40px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>
            No projects yet
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>
            Create your first project to start managing your team, tasks, and progress.
          </p>
          <button
            className="btn btn-primary"
            style={{ marginTop: '16px', padding: '10px 20px', fontSize: '14px' }}
            onClick={handleOpenModal}
          >
            + Create New Project
          </button>
        </div>
      )}

      {/* Create New Project Modal */}
      {showModal && (
        <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) handleCloseModal(); }}>
          <div style={modalCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Create New Project
              </h3>
              <button
                onClick={handleCloseModal}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            {validationError && (
              <div
                style={{
                  background: '#fee2e2',
                  color: '#991b1b',
                  padding: '9px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}
              >
                {validationError}
              </div>
            )}

            <form onSubmit={handleCreateProject}>
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="modal-project-name" style={labelStyle}>
                  Project Name <span style={{ color: 'var(--red)' }}>*</span>
                </label>
                <input
                  id="modal-project-name"
                  type="text"
                  placeholder="e.g. Android Application"
                  value={projectName}
                  onChange={(e) => {
                    setProjectName(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="modal-course-subject" style={labelStyle}>
                  Course / Subject <span style={{ color: 'var(--red)' }}>*</span>
                </label>
                <select
                  id="modal-course-subject"
                  value={courseSubject}
                  onChange={(e) => {
                    setCourseSubject(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  style={inputStyle}
                >
                  {courseOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="modal-team-name" style={labelStyle}>
                  Team Name <span style={{ color: 'var(--red)' }}>*</span>
                </label>
                <input
                  id="modal-team-name"
                  type="text"
                  placeholder="e.g. Team 8"
                  value={teamName}
                  onChange={(e) => {
                    setTeamName(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="modal-deadline" style={labelStyle}>
                  Final Deadline <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  id="modal-deadline"
                  type="date"
                  value={deadline}
                  onChange={(e) => {
                    setDeadline(e.target.value);
                    if (validationError) setValidationError('');
                  }}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label htmlFor="modal-description" style={labelStyle}>
                  Project Description <span style={{ color: 'var(--text-muted)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <textarea
                  id="modal-description"
                  rows={3}
                  placeholder="Brief description of the college project deliverable..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={handleCloseModal}>
                  Cancel
                </button>
                <button type="submit" id="btn-submit-new-project" className="btn btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Project Modal */}
      {showEditModal && (
        <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) handleCloseEdit(); }}>
          <div style={modalCardStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Edit Project
              </h3>
              <button
                onClick={handleCloseEdit}
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: 'var(--text-muted)' }}
              >
                ✕
              </button>
            </div>

            {editError && (
              <div
                style={{
                  background: '#fee2e2',
                  color: '#991b1b',
                  padding: '9px 14px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '13px',
                  marginBottom: '16px',
                  fontWeight: 500,
                }}
              >
                {editError}
              </div>
            )}

            <form onSubmit={handleSaveEdit}>
              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="edit-project-name" style={labelStyle}>
                  Project Name <span style={{ color: 'var(--red)' }}>*</span>
                </label>
                <input
                  id="edit-project-name"
                  type="text"
                  value={editName}
                  onChange={(e) => {
                    setEditName(e.target.value);
                    if (editError) setEditError('');
                  }}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="edit-course-subject" style={labelStyle}>
                  Course / Subject <span style={{ color: 'var(--red)' }}>*</span>
                </label>
                <select
                  id="edit-course-subject"
                  value={editCourse}
                  onChange={(e) => {
                    setEditCourse(e.target.value);
                    if (editError) setEditError('');
                  }}
                  style={inputStyle}
                >
                  {courseOptions.map((o) => (
                    <option key={o} value={o}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="edit-team-name" style={labelStyle}>
                  Team Name <span style={{ color: 'var(--red)' }}>*</span>
                </label>
                <input
                  id="edit-team-name"
                  type="text"
                  value={editTeam}
                  onChange={(e) => {
                    setEditTeam(e.target.value);
                    if (editError) setEditError('');
                  }}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '14px' }}>
                <label htmlFor="edit-deadline" style={labelStyle}>
                  Final Deadline <span style={{ color: 'var(--red)' }}>*</span>
                </label>
                <input
                  id="edit-deadline"
                  type="date"
                  value={editDeadline}
                  onChange={(e) => {
                    setEditDeadline(e.target.value);
                    if (editError) setEditError('');
                  }}
                  style={inputStyle}
                />
              </div>

              <div style={{ marginBottom: '18px' }}>
                <label htmlFor="edit-description" style={labelStyle}>
                  Project Description
                </label>
                <textarea
                  id="edit-description"
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-outline" onClick={handleCloseEdit}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div style={overlayStyle} onClick={(e) => { if (e.target === e.currentTarget) handleCancelDelete(); }}>
          <div style={modalCardStyle}>
            <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '10px' }}>
              Delete Project
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px', lineHeight: '1.5' }}>
              Are you sure you want to delete <strong style={{ color: 'var(--text-primary)' }}>{deletingProject?.name}</strong>? This will permanently delete all associated tasks and team records for this project.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button className="btn btn-outline" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button
                className="btn btn-danger"
                style={{ background: 'var(--red)', color: '#ffffff', border: 'none' }}
                onClick={handleConfirmDelete}
              >
                Delete Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
