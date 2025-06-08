import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

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
      setUser(JSON.parse(savedUser));
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
      setUser(userWithoutPassword);
      localStorage.setItem('devcollab_user', JSON.stringify(userWithoutPassword));
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

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};