import React, { useState } from 'react';
import { Edit3, Save, X, Github, Linkedin, Globe, MapPin, Clock, DollarSign, FolderSync as Sync, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import ImageUpload from '../components/common/ImageUpload';
import BadgeSystem from '../components/badges/BadgeSystem';
import EndorsementSystem from '../components/endorsements/EndorsementSystem';
import GitHubIntegration from '../components/github/GitHubIntegration';
import { useImageUpload } from '../hooks/useImageUpload';

// Add type definitions for better type safety
interface User {
  id: string;
  name: string;
  bio?: string;
  location?: string;
  skills?: string[];
  experience?: 'Junior' | 'Mid-level' | 'Senior' | 'Lead';
  github?: string;
  linkedin?: string;
  portfolio?: string;
  hourlyRate?: number;
  availability?: 'Available' | 'Busy' | 'Not Available';
  avatar?: string | null;
  badges?: any[];
}

const Profile: React.FC = () => {
  const { user, updateProfile, syncGitHubRepos } = useAuth();
  const { uploadAvatar, isUploading: avatarUploading } = useImageUpload();
  const [isEditing, setIsEditing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize form data with better defaults and null checks
  const [formData, setFormData] = useState({
    name: user?.name ?? '',
    bio: user?.bio ?? '',
    location: user?.location ?? '',
    skills: Array.isArray(user?.skills) ? user.skills.join(', ') : '',
    experience: user?.experience ?? 'Junior',
    github: user?.github ?? '',
    linkedin: user?.linkedin ?? '',
    portfolio: user?.portfolio ?? '',
    hourlyRate: user?.hourlyRate?.toString() ?? '',
    availability: user?.availability ?? 'Available',
    avatar: user?.avatar ?? null
  });

  // Early return with loading state instead of null
  if (!user) {
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
      const skillsArray = formData.skills
        .split(',')
        .map(s => s.trim())
        .filter(s => s.length > 0);
      
      await updateProfile({
        name: formData.name,
        bio: formData.bio,
        location: formData.location,
        skills: skillsArray,
        experience: formData.experience as User['experience'],
        github: formData.github,
        linkedin: formData.linkedin,
        portfolio: formData.portfolio,
        hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : undefined,
        availability: formData.availability as User['availability'],
        avatar: formData.avatar || undefined
      });
      
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  const handleCancel = () => {
    // Reset form data to current user data
    setFormData({
      name: user.name ?? '',
      bio: user.bio ?? '',
      location: user.location ?? '',
      skills: Array.isArray(user.skills) ? user.skills.join(', ') : '',
      experience: user.experience ?? 'Junior',
      github: user.github ?? '',
      linkedin: user.linkedin ?? '',
      portfolio: user.portfolio ?? '',
      hourlyRate: user.hourlyRate?.toString() ?? '',
      availability: user.availability ?? 'Available',
      avatar: user.avatar ?? null
    });
    setIsEditing(false);
  };

  const handleSyncGitHub = async () => {
    if (!syncGitHubRepos) {
      console.warn('syncGitHubRepos function not available');
      return;
    }
    
    setSyncing(true);
    try {
      await syncGitHubRepos();
      setError(null);
    } catch (error) {
      console.error('Error syncing GitHub repos:', error);
      setError('Failed to sync GitHub repos. Please try again.');
    } finally {
      setSyncing(false);
    }
  };

  const handleAvatarChange = async (file: File | null, previewUrl: string | null) => {
    if (file) {
      try {
        const uploadedUrl = await uploadAvatar(file);
        if (uploadedUrl) {
          setFormData(prev => ({ ...prev, avatar: uploadedUrl }));
          setError(null);
        }
      } catch (err) {
        console.error('Error uploading avatar:', err);
        setError('Failed to upload avatar. Please try again.');
      }
    } else {
      setFormData(prev => ({ ...prev, avatar: null }));
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Not Available': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Safe URL construction
  const getGitHubUrl = (username: string) => {
    if (!username) return '';
    return username.startsWith('http') ? username : `https://github.com/${username}`;
  };

  const getLinkedInUrl = (username: string) => {
    if (!username) return '';
    return username.startsWith('http') ? username : `https://linkedin.com/in/${username}`;
  };

  const getPortfolioUrl = (url: string) => {
    if (!url) return '';
    return url.startsWith('http') ? url : `https://${url}`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <div className="flex items-center space-x-3">
          {user.github && syncGitHubRepos && (
            <Button
              variant="outline"
              onClick={handleSyncGitHub}
              loading={syncing}
              size="sm"
            >
              <Sync className="h-4 w-4 mr-2" />
              Sync GitHub
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
        <div className="text-sm text-red-600 font-medium">{error}</div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info Card */}
          <Card className="p-6 text-center">
            {/* Avatar Upload */}
            <div className="mb-6">
              <ImageUpload
                currentImage={user.avatar}
                onImageChange={handleAvatarChange}
                onImageUpload={uploadAvatar}
                size="lg"
                shape="circle"
                label="Change Avatar"
                className="mx-auto"
              />
            </div>
            
            {isEditing ? (
              <Input
                value={formData.name}
                name="name"
                onChange={handleChange}
                className="text-center text-xl font-bold mb-2"
                placeholder="Enter your name"
              />
            ) : (
              <h2 className="text-xl font-bold text-gray-900 mb-2">{user.name || 'Anonymous User'}</h2>
            )}

            <div className="flex justify-center mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(user.availability || 'Available')}`}>
                {user.availability || 'Available'}
              </span>
            </div>

            {user.location && (
              <div className="flex items-center justify-center text-gray-600 mb-4">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{user.location}</span>
              </div>
            )}

            <div className="space-y-2">
              {user.github && (
                <a
                  href={getGitHubUrl(user.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </a>
              )}
              {user.linkedin && (
                <a
                  href={getLinkedInUrl(user.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </a>
              )}
              {user.portfolio && (
                <a
                  href={getPortfolioUrl(user.portfolio)}
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
          {user.badges && <BadgeSystem user={user} badges={user.badges} />}
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
              <p className="text-gray-600 whitespace-pre-wrap">{user.bio || 'No bio provided yet.'}</p>
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
                  <p className="text-gray-600">{user.experience || 'Not specified'}</p>
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
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(user.availability || 'Available')}`}>
                    {user.availability || 'Available'}
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
                  <p className="text-gray-600">{user.location || 'Not specified'}</p>
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
                    {user.hourlyRate ? `$${user.hourlyRate}/hour` : 'Not specified'}
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
                  <p className="text-gray-600">{user.github || 'Not provided'}</p>
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
                  <p className="text-gray-600">{user.linkedin || 'Not provided'}</p>
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
                  <p className="text-gray-600">{user.portfolio || 'Not provided'}</p>
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