import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType, Badge, Endorsement } from '../types';
import { supabase } from '../lib/supabase';

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
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for changes on auth state (sign in, sign out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return;
    }

    if (data) {
      setUser({
        ...data,
        badges: data.badges || [],
        endorsements: data.endorsements || [],
        githubRepos: data.githubRepos || [],
        quizResults: data.quizResults || [],
        preferences: data.preferences || {}
      });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      return !!data.user;
    } catch (error) {
      console.error('Error signing in:', error);
      return false;
    }
  };

  const signup = async (userData: Partial<User> & { email: string; password: string }): Promise<boolean> => {
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password,
      });

      if (authError) throw authError;
      if (!authData.user) return false;

      // Create profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
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
            joined_at: new Date().toISOString(),
            badges: [],
            endorsements: [],
            github_repos: [],
            quiz_results: [],
            preferences: {}
          }
        ]);

      if (profileError) throw profileError;
      return true;
    } catch (error) {
      console.error('Error signing up:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const endorseSkill = async (userId: string, skill: string, message?: string) => {
    if (!user) return;

    try {
      const endorsement: Endorsement = {
        id: Math.random().toString(36).substr(2, 9),
        skill,
        endorserId: user.id,
        endorserName: user.name,
        message,
        createdAt: new Date().toISOString()
      };

      const { error } = await supabase
        .from('profiles')
        .update({
          endorsements: supabase.raw('array_append(endorsements, ?)', [endorsement])
        })
        .eq('id', userId);

      if (error) throw error;
    } catch (error) {
      console.error('Error endorsing skill:', error);
    }
  };

  const syncGitHubRepos = async () => {
    if (!user?.github) return;
    
    try {
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

      await updateProfile({ githubRepos: mockRepos });
    } catch (error) {
      console.error('Error syncing GitHub repos:', error);
    }
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