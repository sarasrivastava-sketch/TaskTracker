import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import MyProjects from './components/MyProjects';
import Calendar from './components/Calendar';
import Dashboard from './components/Dashboard';
import Tasks from './components/Tasks';
import Team from './components/Team';
import Progress from './components/Progress';
import FacultyView from './components/FacultyView';
import { calculateProgress } from './mockData';

const STORAGE_KEY = 'teamtrack_projects';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({ name: 'Sara', role: 'Student' });
  const [activePage, setActivePage] = useState('projects');

  // Load projects from localStorage, return empty array if none stored
  // (DO NOT fallback to initialProjects/demo data on every render)
  const loadProjectsFromStorage = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return parsed.projects || [];
      }
    } catch (e) {
      console.error('Failed to load projects from localStorage', e);
    }
    return [];
  };

  // Save projects to localStorage
  const saveProjectsToStorage = (projectsArray) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: projectsArray }));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  };

  useEffect(() => {
    const loadedProjects = loadProjectsFromStorage();
    setProjects(loadedProjects);
    setCurrentProject(loadedProjects[0] || null);
    setTasks(loadedProjects[0]?.tasks || []);
    setTeam(loadedProjects[0]?.teamMembers || []);
  }, []);

  // React State for Projects
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);

  // Tasks & Team for the active project (isolated per project)
  const [tasks, setTasks] = useState([]);
  const [team, setTeam] = useState([]);

  const handleLogin = (user) => {
    setCurrentUser(user);
    setIsLoggedIn(true);
    setActivePage('projects');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // Open a selected project from My Projects: loads ONLY this project's tasks & team
  const handleSelectProject = (project) => {
    const latest = projects.find((p) => p.id === project.id) || project;
    setCurrentProject(latest);
    setTasks(latest.tasks ? [...latest.tasks] : []);
    setTeam(latest.teamMembers ? [...latest.teamMembers] : []);
    setActivePage('dashboard');
  };

  // Synchronize task changes with current project and projects list
  const updateProjectTasks = (newTasks) => {
    setTasks(newTasks);
    if (!currentProject) return;
    const newProgress = calculateProgress(newTasks);

    const newProjects = projects.map((p) =>
      p.id === currentProject.id
        ? { ...p, tasks: newTasks, progress: newProgress }
        : p
    );

    setProjects(newProjects);
    setCurrentProject((prev) =>
      prev ? { ...prev, tasks: newTasks, progress: newProgress } : prev
    );
    saveProjectsToStorage(newProjects);
  };

  // Synchronize team changes with current project and projects list
  const updateProjectTeam = (updater) => {
    setTeam((prevTeam) => {
      const nextTeam = typeof updater === 'function' ? updater(prevTeam) : updater;
      if (currentProject) {
        const count = nextTeam.length;
        const membersLabel = `${count} ${count === 1 ? 'Member' : 'Members'}`;

        const newProjects = projects.map((p) =>
          p.id === currentProject.id
            ? { ...p, teamMembers: nextTeam, membersCount: count, members: membersLabel }
            : p
        );

        setProjects(newProjects);
        setCurrentProject((prev) =>
          prev
            ? { ...prev, teamMembers: nextTeam, membersCount: count, members: membersLabel }
            : prev
        );
        saveProjectsToStorage(newProjects);
      }
      return nextTeam;
    });
  };

  // Add new project with its own isolated team and empty task list
  const handleAddProject = (newProject) => {
    const defaultMember = {
      id: `m_${Date.now()}`,
      name: currentUser.name || 'Sara',
      role: 'Team Leader',
      email: `${(currentUser.name || 'sara').toLowerCase()}@college.edu`,
      avatar: (currentUser.name || 'S')[0],
      color: '#5b6af0',
      isLeader: true,
    };

    const projectWithData = {
      ...newProject,
      teamMembers: newProject.teamMembers || [defaultMember],
      tasks: newProject.tasks || [],
      progress: 0,
      membersCount: 1,
      members: '1 Member',
    };

    const newProjects = [projectWithData, ...projects];
    setProjects(newProjects);
    setCurrentProject((prev) => ({ ...prev, ...projectWithData }));
    saveProjectsToStorage(newProjects);
  };

  // Update existing project
  const handleUpdateProject = (updatedProject) => {
    const newProjects = projects.map((p) => (p.id === updatedProject.id ? { ...p, ...updatedProject } : p));
    setProjects(newProjects);
    if (currentProject?.id === updatedProject.id) {
      setCurrentProject((prev) => ({ ...prev, ...updatedProject }));
    }
    saveProjectsToStorage(newProjects);
  };

  // Delete project
  const handleDeleteProject = (projectId) => {
    const newProjects = projects.filter((p) => p.id !== projectId);
    setProjects(newProjects);
    if (currentProject?.id === projectId) {
      const remaining = newProjects.filter((p) => p.id !== projectId);
      if (remaining.length > 0) {
        const nextProject = remaining[0];
        setCurrentProject(nextProject);
        setTasks(nextProject.tasks ? [...nextProject.tasks] : []);
        setTeam(nextProject.teamMembers ? [...nextProject.teamMembers] : []);
      } else {
        setCurrentProject(null);
        setTasks([]);
        setTeam([]);
      }
    }
    saveProjectsToStorage(newProjects);
  };

  // Complete / toggle task status for the current project
  const handleCompleteTask = (taskId) => {
    const nextTasks = tasks.map((t) => {
      if (t.id === taskId) {
        const isFinished = t.status === 'Completed';
        return { ...t, status: isFinished ? 'Pending' : 'Completed' };
      }
      return t;
    });
    updateProjectTasks(nextTasks);
  };

  // Toggle task status
  const handleToggleTask = (taskId) => {
    handleCompleteTask(taskId);
  };

  // Add new task to current project
  const handleAddTask = (newTask) => {
    const taskObj = {
      ...newTask,
      id: `t_${Date.now()}`,
    };
    const nextTasks = [taskObj, ...tasks];
    updateProjectTasks(nextTasks);
  };

  // Delete task from current project
  const handleDeleteTask = (taskId) => {
    const nextTasks = tasks.filter((t) => t.id !== taskId);
    updateProjectTasks(nextTasks);
  };

  // Add new team member to current project
  const handleAddMember = (newMember) => {
    const memberObj = {
      ...newMember,
      id: newMember.id || `m_${Date.now()}`,
    };
    updateProjectTeam((prev) => {
      if (prev.some((m) => m.id === memberObj.id)) return prev;
      return [...prev, memberObj];
    });
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        currentUser={currentUser}
        onLogout={handleLogout}
        currentProject={currentProject}
        projects={projects}
        onSelectProject={handleSelectProject}
      />

      <main className="main-content">
        {/* Step 1: My Projects workspace */}
        {activePage === 'projects' && (
          <MyProjects
            projects={projects}
            onSelectProject={handleSelectProject}
            onAddProject={handleAddProject}
            onUpdateProject={handleUpdateProject}
            onDeleteProject={handleDeleteProject}
          />
        )}

        {/* Academic Calendar Page */}
        {activePage === 'calendar' && (
          <Calendar
            projects={projects}
            tasks={tasks}
          />
        )}

        {/* Step 2: Project Dashboard (isolated to current project) */}
        {activePage === 'dashboard' && (
          <Dashboard
            tasks={tasks}
            team={team}
            currentProject={currentProject}
            currentUser={currentUser}
            onCompleteTask={handleCompleteTask}
            onToggleTask={handleToggleTask}
            setActivePage={setActivePage}
          />
        )}

        {/* Step 3: Project Tasks (isolated to current project) */}
        {activePage === 'tasks' && (
          <Tasks
            tasks={tasks}
            team={team}
            currentProject={currentProject}
            onToggleTask={handleToggleTask}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            setActivePage={setActivePage}
          />
        )}

        {/* Step 3: Project Team Management (isolated to current project) */}
        {activePage === 'team' && (
          <Team
            team={team}
            tasks={tasks}
            currentProject={currentProject}
            onAddMember={handleAddMember}
            onTeamChange={updateProjectTeam}
            setActivePage={setActivePage}
          />
        )}

        {/* Step 3: Project Progress (isolated to current project) */}
        {activePage === 'progress' && (
          <Progress
            tasks={tasks}
            team={team}
            currentProject={currentProject}
            setActivePage={setActivePage}
          />
        )}

        {/* Faculty View (isolated to current project) */}
        {activePage === 'faculty' && (
          <FacultyView
            tasks={tasks}
            team={team}
            currentProject={currentProject}
            setActivePage={setActivePage}
          />
        )}
      </main>
    </div>
  );
}
