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
  badges: Badge[];
  endorsements: Endorsement[];
  githubRepos?: GitHubRepo[];
  quizResults?: QuizResult[];
  preferences?: UserPreferences;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  earnedAt: string;
  category: 'skill' | 'contribution' | 'leadership' | 'community';
}

export interface Endorsement {
  id: string;
  skill: string;
  endorserId: string;
  endorserName: string;
  message?: string;
  createdAt: string;
}

export interface GitHubRepo {
  id: string;
  name: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  url: string;
  lastUpdated: string;
}

export interface QuizResult {
  id: string;
  quizType: 'matchmaking' | 'icebreaker';
  answers: Record<string, any>;
  score?: number;
  recommendations?: string[];
  completedAt: string;
}

export interface UserPreferences {
  projectTypes: string[];
  timeCommitment: 'part-time' | 'full-time' | 'flexible';
  remoteWork: boolean;
  teamSize: 'small' | 'medium' | 'large';
  communicationStyle: 'formal' | 'casual' | 'mixed';
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
  githubRepo?: string;
  gitlabRepo?: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  timeCommitment: 'part-time' | 'full-time' | 'flexible';
  tags: string[];
  trending?: TrendingData;
  tasks: Task[];
  discussions: Discussion[];
  icebreakerChallenges: IcebreakerChallenge[];
}

export interface TrendingData {
  score: number;
  views: number;
  applications: number;
  stars: number;
  activity: number;
  lastCalculated: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'done';
  assigneeId?: string;
  assigneeName?: string;
  priority: 'low' | 'medium' | 'high';
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  labels: string[];
}

export interface Discussion {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  replies: DiscussionReply[];
  tags: string[];
  isPinned: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface DiscussionReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
}

export interface IcebreakerChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  timeLimit: number; // in minutes
  language: string;
  starterCode?: string;
  testCases: TestCase[];
  submissions: ChallengeSubmission[];
  createdAt: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface ChallengeSubmission {
  id: string;
  userId: string;
  userName: string;
  code: string;
  language: string;
  status: 'pending' | 'passed' | 'failed';
  score: number;
  submittedAt: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: string;
  projectId?: string;
}

export interface SearchFilters {
  skills: string[];
  projectTypes: string[];
  difficulty: string[];
  timeCommitment: string[];
  status: string[];
  teamSize: { min: number; max: number };
  hasBudget: boolean;
  trending: boolean;
}

export interface MatchmakingQuiz {
  id: string;
  questions: QuizQuestion[];
  title: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'scale' | 'text';
  options?: string[];
  required: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (userData: Partial<User> & { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  endorseSkill: (userId: string, skill: string, message?: string) => void;
  syncGitHubRepos: () => Promise<void>;
}