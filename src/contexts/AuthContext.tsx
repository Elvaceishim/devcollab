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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (profile) {
        setUser({
          id: profile.id,
          email: profile.email,
          name: profile.name,
          avatar: profile.avatar,
          bio: profile.bio,
          location: profile.location,
          skills: profile.skills,
          experience: profile.experience,
          github: profile.github,
          linkedin: profile.linkedin,
          portfolio: profile.portfolio,
          hourlyRate: profile.hourly_rate,
          availability: profile.availability,
          joinedAt: profile.created_at,
          badges: profile.badges || [],
          endorsements: profile.endorsements || [],
          githubRepos: profile.github_repos || [],
          quizResults: profile.quiz_results || [],
          preferences: profile.preferences || {}
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        await fetchUserProfile(data.user.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error logging in:', error);
      return false;
    }
  };

  const signup = async (userData: Partial<User> & { email: string; password: string }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: userData.email,
        password: userData.password
      });

      if (error) {
        throw error;
      }

      if (data.user) {
        // Create initial profile
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              email: userData.email,
              name: userData.name || userData.email.split('@')[0],
              bio: '',
              location: '',
              skills: [],
              experience: 'Junior',
              availability: 'Available',
              badges: [],
              endorsements: [],
              github_repos: [],
              quiz_results: [],
              preferences: {}
            }
          ]);

        if (profileError) {
          throw profileError;
        }

        await fetchUserProfile(data.user.id);
        return true;
      }

      return false;
    } catch (error) {
      console.error('Error signing up:', error);
      return false;
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
      setUser(null);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: updates.name,
          avatar: updates.avatar,
          bio: updates.bio,
          location: updates.location,
          skills: updates.skills,
          experience: updates.experience,
          github: updates.github,
          linkedin: updates.linkedin,
          portfolio: updates.portfolio,
          hourly_rate: updates.hourlyRate,
          availability: updates.availability,
          badges: updates.badges,
          endorsements: updates.endorsements,
          github_repos: updates.githubRepos,
          quiz_results: updates.quizResults,
          preferences: updates.preferences
        })
        .eq('id', user.id);

      if (error) {
        throw error;
      }

      setUser(prev => prev ? { ...prev, ...updates } : null);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const endorseSkill = async (userId: string, skill: string, message?: string) => {
    if (!user) return;

    try {
      const endorsement = {
        id: crypto.randomUUID(),
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

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error endorsing skill:', error);
    }
  };

  const syncGitHubRepos = async () => {
    if (!user?.github) return;

    try {
      // Implement GitHub API integration here
      // This is a placeholder for the actual implementation
      console.log('Syncing GitHub repos...');
    } catch (error) {
      console.error('Error syncing GitHub repos:', error);
    }
  };

  const value = {
    user,
    login,
    signup,
    logout,
    updateProfile,
    endorseSkill,
    syncGitHubRepos
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};