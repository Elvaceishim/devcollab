import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Message, User } from '../types';

interface DataContextType {
  projects: Project[];
  messages: Message[];
  users: User[];
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'teamMembers' | 'applicants'>) => void;
  applyToProject: (projectId: string, userId: string) => void;
  acceptApplication: (projectId: string, userId: string) => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  getProjectMessages: (projectId: string) => Message[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Load data from localStorage
    const savedProjects = localStorage.getItem('devcollab_projects');
    const savedMessages = localStorage.getItem('devcollab_messages');
    const savedUsers = localStorage.getItem('devcollab_users');

    if (savedProjects) {
      setProjects(JSON.parse(savedProjects));
    } else {
      // Initialize with sample data
      const sampleProjects: Project[] = [
        {
          id: '1',
          title: 'E-commerce Platform',
          description: 'Building a modern e-commerce platform with React and Node.js. We need developers who are passionate about creating scalable, user-friendly applications.',
          type: 'Open Source',
          status: 'In Progress',
          skills: ['React', 'Node.js', 'MongoDB', 'TypeScript'],
          teamSize: 2,
          maxTeamSize: 5,
          timeline: '3 months',
          ownerId: 'demo-user-1',
          ownerName: 'Demo User',
          teamMembers: [],
          applicants: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '2',
          title: 'Mobile Fitness App',
          description: 'Creating a comprehensive fitness tracking mobile app with React Native. Looking for developers interested in health tech and mobile development.',
          type: 'Freelance',
          status: 'Planning',
          skills: ['React Native', 'Firebase', 'UI/UX Design', 'TypeScript'],
          teamSize: 1,
          maxTeamSize: 4,
          budget: 8000,
          timeline: '4 months',
          ownerId: 'demo-user-2',
          ownerName: 'Jane Smith',
          teamMembers: [],
          applicants: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: '3',
          title: 'AI-Powered Analytics Dashboard',
          description: 'Building an intelligent analytics dashboard that uses machine learning to provide insights. Perfect for developers interested in AI and data visualization.',
          type: 'Startup',
          status: 'Planning',
          skills: ['Python', 'React', 'Machine Learning', 'D3.js', 'PostgreSQL'],
          teamSize: 1,
          maxTeamSize: 6,
          timeline: '6 months',
          ownerId: 'demo-user-3',
          ownerName: 'Alex Johnson',
          teamMembers: [],
          applicants: [],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setProjects(sampleProjects);
      localStorage.setItem('devcollab_projects', JSON.stringify(sampleProjects));
    }

    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }

    if (savedUsers) {
      const usersData = JSON.parse(savedUsers);
      setUsers(usersData.map(({ password, ...user }: any) => user));
    }
  }, []);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'teamMembers' | 'applicants'>) => {
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      teamMembers: [],
      applicants: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    localStorage.setItem('devcollab_projects', JSON.stringify(updatedProjects));
  };

  const applyToProject = (projectId: string, userId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const user = users.find(u => u.id === userId);
        if (user && !project.applicants.some(a => a.id === userId)) {
          return {
            ...project,
            applicants: [...project.applicants, user],
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return project;
    });

    setProjects(updatedProjects);
    localStorage.setItem('devcollab_projects', JSON.stringify(updatedProjects));
  };

  const acceptApplication = (projectId: string, userId: string) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        const applicant = project.applicants.find(a => a.id === userId);
        if (applicant && project.teamMembers.length < project.maxTeamSize) {
          return {
            ...project,
            teamMembers: [...project.teamMembers, applicant],
            applicants: project.applicants.filter(a => a.id !== userId),
            teamSize: project.teamSize + 1,
            updatedAt: new Date().toISOString(),
          };
        }
      }
      return project;
    });

    setProjects(updatedProjects);
    localStorage.setItem('devcollab_projects', JSON.stringify(updatedProjects));
  };

  const sendMessage = (messageData: Omit<Message, 'id' | 'timestamp'>) => {
    const newMessage: Message = {
      ...messageData,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    localStorage.setItem('devcollab_messages', JSON.stringify(updatedMessages));
  };

  const getProjectMessages = (projectId: string) => {
    return messages.filter(m => m.projectId === projectId);
  };

  return (
    <DataContext.Provider value={{
      projects,
      messages,
      users,
      createProject,
      applyToProject,
      acceptApplication,
      sendMessage,
      getProjectMessages,
    }}>
      {children}
    </DataContext.Provider>
  );
};