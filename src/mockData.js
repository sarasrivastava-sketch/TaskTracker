// TeamTracker Mock Data with Independent Teams per Project

export const calculateProgress = (tasks = []) => {
  if (!tasks || tasks.length === 0) return 0;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  return Math.round((completed / tasks.length) * 100);
};

// ==========================================
// Project 1: Design Thinking & Problem Solving (Team 7)
// Name: Campus Teamwork
// Members: Sara, Rajdeep, Sourav, Aditi
// ==========================================
export const p1Team = [
  {
    id: "m1_1",
    name: "Sara",
    role: "Team Member",
    email: "sara@college.edu",
    avatar: "S",
    color: "#5b6af0",
    isLeader: false,
  },
  {
    id: "m1_2",
    name: "Rajdeep",
    role: "Team Leader",
    email: "rajdeep@college.edu",
    avatar: "R",
    color: "#10b981",
    isLeader: true,
  },
  {
    id: "m1_3",
    name: "Sourav",
    role: "Team Member",
    email: "sourav@college.edu",
    avatar: "S",
    color: "#f59e0b",
    isLeader: false,
  },
  {
    id: "m1_4",
    name: "Aditi",
    role: "Team Member",
    email: "aditi@college.edu",
    avatar: "A",
    color: "#8b5cf6",
    isLeader: false,
  },
];

export const p1Tasks = [
  {
    id: "t1_1",
    title: "Research & Survey",
    assignee: "Sara",
    dueDate: "5 Oct",
    status: "Completed",
    priority: "High",
    category: "Research",
  },
  {
    id: "t1_2",
    title: "Prototype Design",
    assignee: "Rajdeep",
    dueDate: "8 Oct",
    status: "Completed",
    priority: "High",
    category: "Design",
  },
  {
    id: "t1_3",
    title: "Presentation",
    assignee: "Sourav",
    dueDate: "12 Oct",
    status: "Completed",
    priority: "Medium",
    category: "Presentation",
  },
  {
    id: "t1_4",
    title: "Final Report",
    assignee: "Aditi",
    dueDate: "14 Oct",
    status: "Pending",
    priority: "High",
    category: "Documentation",
  },
  {
    id: "t1_5",
    title: "User Journey & Empathy Mapping",
    assignee: "Sara",
    dueDate: "2 Oct",
    status: "Completed",
    priority: "Medium",
    category: "Research",
  },
  {
    id: "t1_6",
    title: "Usability Evaluation & Metrics",
    assignee: "Aditi",
    dueDate: "15 Oct",
    status: "Pending",
    priority: "Low",
    category: "QA",
  },
];

// ==========================================
// Project 2: Web UI & Content Management (Team 3)
// Name: E-Commerce Website
// Members: Sara, Riya, Ananya
// ==========================================
export const p2Team = [
  {
    id: "m2_1",
    name: "Sara",
    role: "Team Member",
    email: "sara@college.edu",
    avatar: "S",
    color: "#5b6af0",
    isLeader: false,
  },
  {
    id: "m2_2",
    name: "Riya",
    role: "Team Leader",
    email: "riya@college.edu",
    avatar: "R",
    color: "#ec4899",
    isLeader: true,
  },
  {
    id: "m2_3",
    name: "Ananya",
    role: "Team Member",
    email: "ananya@college.edu",
    avatar: "A",
    color: "#06b6d4",
    isLeader: false,
  },
];

export const p2Tasks = [
  {
    id: "t2_1",
    title: "Homepage UI",
    assignee: "Sara",
    dueDate: "4 Oct",
    status: "Completed",
    priority: "High",
    category: "Design",
  },
  {
    id: "t2_2",
    title: "Product Page",
    assignee: "Riya",
    dueDate: "8 Oct",
    status: "Completed",
    priority: "High",
    category: "Development",
  },
  {
    id: "t2_3",
    title: "Responsive Design",
    assignee: "Sara",
    dueDate: "18 Oct",
    status: "Pending",
    priority: "High",
    category: "Design",
  },
  {
    id: "t2_4",
    title: "Testing",
    assignee: "Ananya",
    dueDate: "19 Oct",
    status: "Pending",
    priority: "Medium",
    category: "Testing",
  },
  {
    id: "t2_5",
    title: "Product Catalog & Search API",
    assignee: "Ananya",
    dueDate: "6 Oct",
    status: "Completed",
    priority: "High",
    category: "Development",
  },
  {
    id: "t2_6",
    title: "Checkout & Payment Flow",
    assignee: "Riya",
    dueDate: "15 Oct",
    status: "Pending",
    priority: "High",
    category: "Development",
  },
  {
    id: "t2_7",
    title: "Order Management & Analytics",
    assignee: "Ananya",
    dueDate: "20 Oct",
    status: "Pending",
    priority: "Low",
    category: "Development",
  },
];

// ==========================================
// Project 3: Cloud Computing (Team 5)
// Name: Cloud Security
// Members: Sara, Rahul, Karan, Neha, Arjun
// ==========================================
export const p3Team = [
  {
    id: "m3_1",
    name: "Sara",
    role: "Team Member",
    email: "sara@college.edu",
    avatar: "S",
    color: "#5b6af0",
    isLeader: false,
  },
  {
    id: "m3_2",
    name: "Rahul",
    role: "Team Leader",
    email: "rahul@college.edu",
    avatar: "R",
    color: "#10b981",
    isLeader: true,
  },
  {
    id: "m3_3",
    name: "Karan",
    role: "Team Member",
    email: "karan@college.edu",
    avatar: "K",
    color: "#f59e0b",
    isLeader: false,
  },
  {
    id: "m3_4",
    name: "Neha",
    role: "Team Member",
    email: "neha@college.edu",
    avatar: "N",
    color: "#ec4899",
    isLeader: false,
  },
  {
    id: "m3_5",
    name: "Arjun",
    role: "Team Member",
    email: "arjun@college.edu",
    avatar: "A",
    color: "#8b5cf6",
    isLeader: false,
  },
];

export const p3Tasks = [
  {
    id: "t3_1",
    title: "Cloud Architecture",
    assignee: "Rahul",
    dueDate: "4 Oct",
    status: "Completed",
    priority: "High",
    category: "Development",
  },
  {
    id: "t3_2",
    title: "AWS Configuration",
    assignee: "Karan",
    dueDate: "8 Oct",
    status: "Completed",
    priority: "High",
    category: "Development",
  },
  {
    id: "t3_3",
    title: "Security Report",
    assignee: "Sara",
    dueDate: "12 Oct",
    status: "Completed",
    priority: "High",
    category: "QA",
  },
  {
    id: "t3_4",
    title: "Presentation",
    assignee: "Neha",
    dueDate: "24 Oct",
    status: "Pending",
    priority: "Medium",
    category: "Presentation",
  },
];

// Backward-compatible exports
export const initialTeam = p1Team;
export const initialTasks = p1Tasks;

export const projectInfo = {
  name: "Campus Teamwork",
  teamSize: "4 Members",
  deadline: "15 October 2026",
};

// Initial Projects with Independent Teams and Tasks
export const initialProjects = [
  {
    id: "p1",
    course: "Design Thinking & Problem Solving",
    name: "Campus Teamwork",
    team: "Team 7",
    membersCount: p1Team.length,
    members: "4 Members",
    progress: 68,
    deadline: "15 October 2026",
    description: "Human-centered design, user research and iterative prototyping.",
    color: "#5b6af0",
    teamMembers: p1Team,
    tasks: p1Tasks,
  },
  {
    id: "p2",
    course: "Web UI & Content Management",
    name: "E-Commerce Website",
    team: "Team 3",
    membersCount: p2Team.length,
    members: "3 Members",
    progress: 42,
    deadline: "20 October 2026",
    description: "Responsive web portal, product catalog and checkout user flow.",
    color: "#10b981",
    teamMembers: p2Team,
    tasks: p2Tasks,
  },
  {
    id: "p3",
    course: "Cloud Computing",
    name: "Cloud Security",
    team: "Team 5",
    membersCount: p3Team.length,
    members: "5 Members",
    progress: 75,
    deadline: "25 October 2026",
    description: "Cloud microservices security, IAM policies and monitoring infrastructure.",
    color: "#f59e0b",
    teamMembers: p3Team,
    tasks: p3Tasks,
  },
];
