export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio: string;
  location: string;
  skills: string[];
  experience: 'Junior' | 'Mid-level' | 'Senior' | 'Lead';
  github?: string;
  linkedin?: string;
  portfolio?: string;
  hourlyRate?: number;
  availability: 'Available' | 'Busy' | 'Not Available';
  joinedAt: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  type: 'Open Source' | 'Freelance' | 'Startup' | 'Personal';
  status: 'Planning' | 'In Progress' | 'Completed' | 'On Hold';
  skills: string[];
  teamSize: number;
  maxTeamSize: number;
  budget?: number;
  timeline: string;
  ownerId: string;
  ownerName: string;
  teamMembers: User[];
  applicants: User[];
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  projectId?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User> & { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}