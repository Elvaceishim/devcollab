import React, { useState, useEffect } from 'react';
import { Edit3, Save, X, Github, Linkedin, Globe, MapPin, FolderSync as Sync } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import ImageUpload from '../components/common/ImageUpload';
import BadgeSystem from '../components/badges/BadgeSystem';
import EndorsementSystem from '../components/endorsements/EndorsementSystem';
import GitHubIntegration from '../components/github/GitHubIntegration';
import { useImageUpload } from '../hooks/useImageUpload';
import { User } from '../types';

const getUserData = (user: any): User | null => {
  if (!user) return null;

  const now = new Date().toISOString();
  const userData: User = {
    id: user.id || '',
    email: user.email || '',
    name: user.user_metadata?.name || user.user_metadata?.full_name || 'Anonymous User',
    bio: user.user_metadata?.bio || 'No bio provided yet.',
    location: user.user_metadata?.location || 'Not specified',
    skills: user.user_metadata?.skills || [],
    experience: user.user_metadata?.experience || 'Junior',
    github: user.user_metadata?.github || '',
    linkedin: user.user_metadata?.linkedin || '',
    portfolio: user.user_metadata?.portfolio || '',
    hourlyRate: user.user_metadata?.hourlyRate || user.user_metadata?.hourly_rate,
    availability: user.user_metadata?.availability || 'Available',
    avatar: user.user_metadata?.avatar || '',
    joinedAt: user.user_metadata?.joinedAt || now,
    badges: user.user_metadata?.badges || [],
    endorsements: user.user_metadata?.endorsements || [],
    githubRepos: user.user_metadata?.githubRepos || [],
    quizResults: user.user_metadata?.quizResults || [],
    preferences: user.user_metadata?.preferences || {
      projectTypes: [],
      timeCommitment: 'flexible',
      remoteWork: true,
      teamSize: 'small',
      communicationStyle: 'casual'
    },
    profile: user.user_metadata?.profile
  };

  return userData;
};

interface FormData {
  name: string;
  bio: string;
  location: string;
  skills: string;
  experience: 'Junior' | 'Mid-level' | 'Senior' | 'Lead';
  github: string;
  linkedin: string;
  portfolio: string;
  hourlyRate: string;
  availability: 'Available' | 'Busy' | 'Not Available';
  avatar: string;
}

const Profile: React.FC = () => {
  const { user, updateProfile, syncGitHubRepos } = useAuth();
  const { uploadAvatar } = useImageUpload();
  const [isEditing, setIsEditing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form data with better defaults and null checks
  const [formData, setFormData] = useState<FormData>({
    name: '',
    bio: '',
    location: '',
    skills: '',
    experience: 'Junior',
    github: '',
    linkedin: '',
    portfolio: '',
    hourlyRate: '',
    availability: 'Available',
    avatar: ''
  });

  // Get user data with proper null handling
  const userData = getUserData(user);

  // Update form data when user data changes
  useEffect(() => {
    if (userData) {
      setFormData({
        name: userData.name,
        bio: userData.bio,
        location: userData.location,
        skills: userData.skills.join(', '),
        experience: userData.experience,
        github: userData.github || '',
        linkedin: userData.linkedin || '',
        portfolio: userData.portfolio || '',
        hourlyRate: userData.hourlyRate?.toString() || '',
        availability: userData.availability,
        avatar: userData.avatar || ''
      });
    }
  }, [userData]);

  // Early return with loading state
  if (!userData) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center items-center min-h-64">
          <div className="text-gray-500">Loading profile...</div>
        </div>
      </div>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setError(null);
      
      if (!formData.name.trim()) {
        setError('Name is required');
        return;
      }
  
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      const hourlyRate = formData.hourlyRate ? parseFloat(formData.hourlyRate) : undefined;
      if (formData.hourlyRate && (isNaN(hourlyRate!) || hourlyRate! < 0)) {
        setError('Please enter a valid hourly rate');
        return;
      }
      
      // This will now properly update the user state in AuthContext
      await updateProfile({
        name: formData.name.trim(),
        bio: formData.bio.trim(),
        location: formData.location.trim(),
        skills: skillsArray,
        experience: formData.experience,
        github: formData.github.trim(),
        linkedin: formData.linkedin.trim(),
        portfolio: formData.portfolio.trim(),
        hourlyRate,
        availability: formData.availability,
        avatar: formData.avatar || undefined
      });
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset form data to current user data
    if (userData) {
      setFormData({
        name: userData.name,
        bio: userData.bio,
        location: userData.location,
        skills: userData.skills.join(', '),
        experience: userData.experience,
        github: userData.github || '',
        linkedin: userData.linkedin || '',
        portfolio: userData.portfolio || '',
        hourlyRate: userData.hourlyRate?.toString() || '',
        availability: userData.availability,
        avatar: userData.avatar || ''
      });
    }
    setIsEditing(false);
    setError(null);
  };

  const handleSyncGitHub = async () => {
    if (!syncGitHubRepos) {
      setError('GitHub sync is not available');
      return;
    }
    
    setSyncing(true);
    setError(null);
    
    try {
      await syncGitHubRepos();
    } catch (error) {
      console.error('Error syncing GitHub repos:', error);
      setError('Failed to sync GitHub repos. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  const handleAvatarChange = async (file: File | null) => {
    if (file) {
      try {
        setError(null);
        const uploadedUrl = await uploadAvatar(file);
        if (uploadedUrl) {
          setFormData(prev => ({ ...prev, avatar: uploadedUrl }));
        }
      } catch (err) {
        console.error('Error uploading avatar:', err);
        setError('Failed to upload avatar. Please try again.');
      }
    } else {
      setFormData(prev => ({ ...prev, avatar: '' }));
    }
  };

  const getAvailabilityColor = (availability: string): string => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Not Available': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Safe URL construction with better validation
  const getGitHubUrl = (username: string): string => {
    if (!username) return '';
    const cleanUsername = username.trim();
    if (cleanUsername.startsWith('http')) return cleanUsername;
    // Remove @ symbol if present
    const cleanedUsername = cleanUsername.replace(/^@/, '');
    return `https://github.com/${cleanedUsername}`;
  };

  const getLinkedInUrl = (username: string): string => {
    if (!username) return '';
    const cleanUsername = username.trim();
    if (cleanUsername.startsWith('http')) return cleanUsername;
    // Remove @ symbol if present
    const cleanedUsername = cleanUsername.replace(/^@/, '');
    return `https://linkedin.com/in/${cleanedUsername}`;
  };

  const getPortfolioUrl = (url: string): string => {
    if (!url) return '';
    const cleanUrl = url.trim();
    if (cleanUrl.startsWith('http')) return cleanUrl;
    return `https://${cleanUrl}`;
  };

  // Add a type guard to ensure userData is a User
  const isUser = (data: any): data is User => {
    return data && typeof data === 'object' && 'id' in data && 'email' in data;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <div className="flex items-center space-x-3">
          {userData.github && syncGitHubRepos && (
            <Button
              variant="outline"
              onClick={handleSyncGitHub}
              disabled={syncing}
              size="sm"
            >
              <Sync className="h-4 w-4 mr-2" />
              {syncing ? 'Syncing...' : 'Sync GitHub'}
            </Button>
          )}
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <div className="flex space-x-2">
              <Button onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
              <Button variant="ghost" onClick={handleCancel}>
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="text-sm text-red-600 font-medium">{error}</div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info Card */}
          <Card className="p-6 text-center">
            <div className="flex flex-col items-center space-y-4 mb-6">
              <ImageUpload
                currentImage={formData.avatar || ''}
                onImageChange={handleAvatarChange}
                onImageUpload={uploadAvatar}
                className="w-32 h-32"
                size="lg"
                shape="circle"
                label="Change Avatar"
                accept="image/*"
              />
              {isEditing ? (
                <Input
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                  className="text-center text-xl font-bold mb-2"
                  placeholder="Enter your name"
                  required
                />
              ) : (
                <h2 className="text-xl font-bold text-gray-900 mb-2">{userData.name || 'Anonymous User'}</h2>
              )}
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(userData.availability)}`}>{userData.availability}</span>
              {userData.location && (
                <div className="flex items-center justify-center text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{userData.location}</span>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              {userData.github && (
                <a
                  href={getGitHubUrl(userData.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              )}
              {userData.linkedin && (
                <a
                  href={getLinkedInUrl(userData.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              )}
              {userData.portfolio && (
                <a
                  href={getPortfolioUrl(userData.portfolio)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Globe className="h-4 w-4 mr-2" />
                  Portfolio
                </a>
              )}
            </div>
          </Card>

          {/* GitHub Integration */}
          <GitHubIntegration />

          {/* Badges - Only render if badges exist */}
          {isUser(userData) && userData.badges && userData.badges.length > 0 && (() => {
            const validUser = userData;
            return (
              <BadgeSystem 
                user={validUser}
                badges={validUser.badges}
              />
            );
          })()}
        </div>

        <div className="lg:col-span-2 space-y-6">
          {/* About Section */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">About</h3>
            {isEditing ? (
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Tell us about yourself..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-vertical"
              />
            ) : (
              <p className="text-gray-600 whitespace-pre-wrap">{userData.bio || 'No bio provided yet.'}</p>
            )}
          </Card>

          {/* Skills & Endorsements */}
          <EndorsementSystem user={user} canEndorse={false} />

          {/* Professional Details */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Details</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Experience Level
                </label>
                {isEditing ? (
                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Junior">Junior</option>
                    <option value="Mid-level">Mid-level</option>
                    <option value="Senior">Senior</option>
                    <option value="Lead">Lead</option>
                  </select>
                ) : (
                  <p className="text-gray-600">{userData.experience || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Availability
                </label>
                {isEditing ? (
                  <select
                    name="availability"
                    value={formData.availability}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="Available">Available</option>
                    <option value="Busy">Busy</option>
                    <option value="Not Available">Not Available</option>
                  </select>
                ) : (
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(userData.availability)}`}>
                    {userData.availability}
                  </span>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                {isEditing ? (
                  <Input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., San Francisco, CA"
                  />
                ) : (
                  <p className="text-gray-600">{userData.location || 'Not specified'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Hourly Rate (USD)
                </label>
                {isEditing ? (
                  <Input
                    type="number"
                    name="hourlyRate"
                    value={formData.hourlyRate}
                    onChange={handleChange}
                    placeholder="50"
                    min="0"
                    step="0.01"
                  />
                ) : (
                  <p className="text-gray-600">
                    {userData.hourlyRate ? `$${userData.hourlyRate}/hour` : 'Not specified'}
                  </p>
                )}
              </div>

              {isEditing && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Skills
                  </label>
                  <Input
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    placeholder="React, Node.js, Python (comma-separated)"
                  />
                </div>
              )}
            </div>
          </Card>

          {/* Links */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Links</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  GitHub Username
                </label>
                {isEditing ? (
                  <Input
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="username"
                  />
                ) : (
                  <p className="text-gray-600">{userData.github || 'Not provided'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  LinkedIn Username
                </label>
                {isEditing ? (
                  <Input
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="username"
                  />
                ) : (
                  <p className="text-gray-600">{userData.linkedin || 'Not provided'}</p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Portfolio Website
                </label>
                {isEditing ? (
                  <Input
                    name="portfolio"
                    value={formData.portfolio}
                    onChange={handleChange}
                    placeholder="https://yourportfolio.com"
                    type="url"
                  />
                ) : (
                  <p className="text-gray-600">{userData.portfolio || 'Not provided'}</p>
                )}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;