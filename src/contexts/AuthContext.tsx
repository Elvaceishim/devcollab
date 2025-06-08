import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, Badge, Endorsement } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('devcollab_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      // Ensure new fields exist
      setUser({
        ...userData,
        badges: userData.badges || [],
        endorsements: userData.endorsements || [],
        githubRepos: userData.githubRepos || [],
        quizResults: userData.quizResults || [],
        preferences: userData.preferences || {}
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('devcollab_users') || '[]');
    const foundUser = users.find((u: User & { password: string }) => 
      u.email === email && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      const enhancedUser = {
        ...userWithoutPassword,
        badges: userWithoutPassword.badges || [],
        endorsements: userWithoutPassword.endorsements || [],
        githubRepos: userWithoutPassword.githubRepos || [],
        quizResults: userWithoutPassword.quizResults || [],
        preferences: userWithoutPassword.preferences || {}
      };
      setUser(enhancedUser);
      localStorage.setItem('devcollab_user', JSON.stringify(enhancedUser));
      return true;
    }
    return false;
  };

  const signup = async (userData: Partial<User> & { email: string; password: string }): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const users = JSON.parse(localStorage.getItem('devcollab_users') || '[]');
    const existingUser = users.find((u: User) => u.email === userData.email);
    
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email: userData.email,
      name: userData.name || '',
      bio: userData.bio || '',
      location: userData.location || '',
      skills: userData.skills || [],
      experience: userData.experience || 'Junior',
      github: userData.github || '',
      linkedin: userData.linkedin || '',
      portfolio: userData.portfolio || '',
      availability: 'Available',
      joinedAt: new Date().toISOString(),
      badges: [],
      endorsements: [],
      githubRepos: [],
      quizResults: [],
      preferences: {}
    };

    users.push({ ...newUser, password: userData.password });
    localStorage.setItem('devcollab_users', JSON.stringify(users));
    
    setUser(newUser);
    localStorage.setItem('devcollab_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devcollab_user');
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('devcollab_user', JSON.stringify(updatedUser));
    
    // Update in users list
    const users = JSON.parse(localStorage.getItem('devcollab_users') || '[]');
    const updatedUsers = users.map((u: User & { password: string }) => 
      u.id === user.id ? { ...u, ...updates } : u
    );
    localStorage.setItem('devcollab_users', JSON.stringify(updatedUsers));
  };

  const endorseSkill = (userId: string, skill: string, message?: string) => {
    if (!user) return;

    const endorsement: Endorsement = {
      id: Math.random().toString(36).substr(2, 9),
      skill,
      endorserId: user.id,
      endorserName: user.name,
      message,
      createdAt: new Date().toISOString()
    };

    // Update the endorsed user's profile
    const users = JSON.parse(localStorage.getItem('devcollab_users') || '[]');
    const updatedUsers = users.map((u: User & { password: string }) => {
      if (u.id === userId) {
        const endorsements = u.endorsements || [];
        return {
          ...u,
          endorsements: [...endorsements, endorsement]
        };
      }
      return u;
    });

    localStorage.setItem('devcollab_users', JSON.stringify(updatedUsers));
  };

  const syncGitHubRepos = async () => {
    if (!user?.github) return;
    
    // Simulate GitHub API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock GitHub repos data
    const mockRepos = [
      {
        id: '1',
        name: 'awesome-project',
        description: 'A really awesome project built with React',
        language: 'JavaScript',
        stars: 42,
        forks: 8,
        url: `https://github.com/${user.github}/awesome-project`,
        lastUpdated: new Date().toISOString()
      },
      {
        id: '2',
        name: 'python-ml-toolkit',
        description: 'Machine learning utilities and tools',
        language: 'Python',
        stars: 156,
        forks: 23,
        url: `https://github.com/${user.github}/python-ml-toolkit`,
        lastUpdated: new Date().toISOString()
      }
    ];

    updateProfile({ githubRepos: mockRepos });
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      signup, 
      logout, 
      updateProfile, 
      endorseSkill, 
      syncGitHubRepos 
    }}>
      {children}
    </AuthContext.Provider>
  );
};