import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, Message, User, Task, Discussion, DiscussionReply, TrendingData } from '../types';

interface DataContextType {
  projects: Project[];
  messages: Message[];
  users: User[];
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'teamMembers' | 'applicants' | 'tasks' | 'discussions' | 'icebreakerChallenges' | 'difficulty' | 'timeCommitment' | 'tags'>) => void;
  applyToProject: (projectId: string, userId: string) => void;
  acceptApplication: (projectId: string, userId: string) => void;
  sendMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  getProjectMessages: (projectId: string) => Message[];
  updateProjectTasks: (projectId: string, tasks: Task[]) => void;
  createDiscussion: (projectId: string, discussion: Omit<Discussion, 'id' | 'replies' | 'isPinned' | 'createdAt' | 'updatedAt'>) => void;
  replyToDiscussion: (discussionId: string, reply: Omit<DiscussionReply, 'id' | 'createdAt'>) => void;
  calculateTrendingScores: () => void;
  getProjectRecommendations: (userId: string) => Project[];
  connectWithDeveloper: (userId: string, targetUserId: string) => void;
  sendConnectionRequest: (fromUserId: string, toUserId: string, message?: string) => void;
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
      try {
        const projectsData = JSON.parse(savedProjects);
        setProjects(projectsData);
      } catch (error) {
        console.error('Error loading projects:', error);
        setProjects([]);
      }
    }

    if (savedMessages) {
      try {
        const messagesData = JSON.parse(savedMessages);
        setMessages(messagesData);
      } catch (error) {
        console.error('Error loading messages:', error);
        setMessages([]);
      }
    }

    if (savedUsers) {
      try {
        const usersData = JSON.parse(savedUsers);
        setUsers(usersData.map(({ password, ...user }: any) => user));
      } catch (error) {
        console.error('Error loading users:', error);
        setUsers([]);
      }
    }

    // Calculate trending scores on load
    setTimeout(() => calculateTrendingScores(), 100);
  }, []);

  const createProject = (projectData: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'teamMembers' | 'applicants' | 'tasks' | 'discussions' | 'icebreakerChallenges' | 'difficulty' | 'timeCommitment' | 'tags'>) => {
    const newProject: Project = {
      ...projectData,
      id: Math.random().toString(36).substr(2, 9),
      teamMembers: [],
      applicants: [],
      tasks: [],
      discussions: [],
      icebreakerChallenges: [],
      difficulty: 'Intermediate',
      timeCommitment: 'flexible',
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedProjects = [...projects, newProject];
    setProjects(updatedProjects);
    
    try {
      localStorage.setItem('devcollab_projects', JSON.stringify(updatedProjects));
      console.log('Project created successfully:', newProject.title);
    } catch (error) {
      console.error('Error saving project:', error);
    }
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

  const updateProjectTasks = (projectId: string, tasks: Task[]) => {
    const updatedProjects = projects.map(project =>
      project.id === projectId
        ? { ...project, tasks, updatedAt: new Date().toISOString() }
        : project
    );

    setProjects(updatedProjects);
    localStorage.setItem('devcollab_projects', JSON.stringify(updatedProjects));
  };

  const createDiscussion = (projectId: string, discussionData: Omit<Discussion, 'id' | 'replies' | 'isPinned' | 'createdAt' | 'updatedAt'>) => {
    const newDiscussion: Discussion = {
      ...discussionData,
      id: Math.random().toString(36).substr(2, 9),
      replies: [],
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const updatedProjects = projects.map(project =>
      project.id === projectId
        ? {
            ...project,
            discussions: [...project.discussions, newDiscussion],
            updatedAt: new Date().toISOString()
          }
        : project
    );

    setProjects(updatedProjects);
    localStorage.setItem('devcollab_projects', JSON.stringify(updatedProjects));
  };

  const replyToDiscussion = (discussionId: string, replyData: Omit<DiscussionReply, 'id' | 'createdAt'>) => {
    const newReply: DiscussionReply = {
      ...replyData,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
    };

    const updatedProjects = projects.map(project => ({
      ...project,
      discussions: project.discussions.map(discussion =>
        discussion.id === discussionId
          ? {
              ...discussion,
              replies: [...discussion.replies, newReply],
              updatedAt: new Date().toISOString()
            }
          : discussion
      ),
      updatedAt: new Date().toISOString()
    }));

    setProjects(updatedProjects);
    localStorage.setItem('devcollab_projects', JSON.stringify(updatedProjects));
  };

  const calculateTrendingScores = () => {
    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const updatedProjects = projects.map(project => {
      const projectAge = (now.getTime() - new Date(project.createdAt).getTime()) / (1000 * 60 * 60 * 24);
      const recentActivity = project.updatedAt > weekAgo.toISOString() ? 1 : 0;
      
      // Calculate trending score based on various factors
      const applicationScore = Math.min(project.applicants.length * 10, 50);
      const teamScore = Math.min(project.teamSize * 5, 25);
      const activityScore = recentActivity * 20;
      const ageScore = Math.max(0, 20 - projectAge); // Newer projects get higher scores
      const discussionScore = Math.min(project.discussions.length * 3, 15);
      
      const totalScore = applicationScore + teamScore + activityScore + ageScore + discussionScore;

      const trending: TrendingData = {
        score: Math.round(totalScore),
        views: Math.floor(Math.random() * 100) + project.applicants.length * 5,
        applications: project.applicants.length,
        stars: Math.floor(Math.random() * 20),
        activity: recentActivity,
        lastCalculated: now.toISOString()
      };

      return {
        ...project,
        trending: totalScore > 30 ? trending : undefined
      };
    });

    setProjects(updatedProjects);
    localStorage.setItem('devcollab_projects', JSON.stringify(updatedProjects));
  };

  const getProjectRecommendations = (userId: string): Project[] => {
    const user = users.find(u => u.id === userId);
    if (!user) return [];

    // Simple recommendation algorithm based on user skills and preferences
    return projects
      .filter(project => 
        project.ownerId !== userId &&
        !project.teamMembers.some(member => member.id === userId) &&
        !project.applicants.some(applicant => applicant.id === userId)
      )
      .sort((a, b) => {
        const aSkillMatch = a.skills.filter(skill => user.skills.includes(skill)).length;
        const bSkillMatch = b.skills.filter(skill => user.skills.includes(skill)).length;
        return bSkillMatch - aSkillMatch;
      })
      .slice(0, 10);
  };

  const connectWithDeveloper = (userId: string, targetUserId: string) => {
    // Implementation for connecting with developers
    console.log(`User ${userId} connecting with ${targetUserId}`);
  };

  const sendConnectionRequest = (fromUserId: string, toUserId: string, message?: string) => {
    // Implementation for sending connection requests
    console.log(`Connection request from ${fromUserId} to ${toUserId}: ${message}`);
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
      updateProjectTasks,
      createDiscussion,
      replyToDiscussion,
      calculateTrendingScores,
      getProjectRecommendations,
      connectWithDeveloper,
      sendConnectionRequest,
    }}>
      {children}
    </DataContext.Provider>
  );
};