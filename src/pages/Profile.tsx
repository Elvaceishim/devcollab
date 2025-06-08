import React, { useState } from 'react';
import { Edit3, Save, X, Github, Linkedin, Globe, MapPin, Clock, DollarSign, FolderSync as Sync } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import BadgeSystem from '../components/badges/BadgeSystem';
import EndorsementSystem from '../components/endorsements/EndorsementSystem';

const Profile: React.FC = () => {
  const { user, updateProfile, syncGitHubRepos } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    location: user?.location || '',
    skills: user?.skills.join(', ') || '',
    experience: user?.experience || 'Junior',
    github: user?.github || '',
    linkedin: user?.linkedin || '',
    portfolio: user?.portfolio || '',
    hourlyRate: user?.hourlyRate?.toString() || '',
    availability: user?.availability || 'Available',
  });

  if (!user) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    updateProfile({
      name: formData.name,
      bio: formData.bio,
      location: formData.location,
      skills: skillsArray,
      experience: formData.experience as any,
      github: formData.github,
      linkedin: formData.linkedin,
      portfolio: formData.portfolio,
      hourlyRate: formData.hourlyRate ? parseFloat(formData.hourlyRate) : undefined,
      availability: formData.availability as any,
    });
    
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user.name,
      bio: user.bio,
      location: user.location,
      skills: user.skills.join(', '),
      experience: user.experience,
      github: user.github || '',
      linkedin: user.linkedin || '',
      portfolio: user.portfolio || '',
      hourlyRate: user.hourlyRate?.toString() || '',
      availability: user.availability,
    });
    setIsEditing(false);
  };

  const handleSyncGitHub = async () => {
    setSyncing(true);
    await syncGitHubRepos();
    setSyncing(false);
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Not Available': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Profile</h1>
        <div className="flex items-center space-x-3">
          {user.github && (
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

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {/* Basic Info Card */}
          <Card className="p-6 text-center">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-24 h-24 rounded-full" />
              ) : (
                <span className="text-2xl font-bold text-primary-600">
                  {user.name.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            
            {isEditing ? (
              <Input
                value={formData.name}
                name="name"
                onChange={handleChange}
                className="text-center text-xl font-bold mb-2"
              />
            ) : (
              <h2 className="text-xl font-bold text-gray-900 mb-2">{user.name}</h2>
            )}

            <div className="flex justify-center mb-4">
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(user.availability)}`}>
                {user.availability}
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
                  href={`https://github.com/${user.github}`}
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
                  href={`https://linkedin.com/in/${user.linkedin}`}
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
                  href={user.portfolio}
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

          {/* GitHub Repos */}
          {user.githubRepos && user.githubRepos.length > 0 && (
            <Card className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">GitHub Repositories</h3>
              <div className="space-y-3">
                {user.githubRepos.slice(0, 3).map(repo => (
                  <div key={repo.id} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{repo.name}</h4>
                      <span className="text-xs text-gray-500">{repo.language}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{repo.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>⭐ {repo.stars}</span>
                      <span>🍴 {repo.forks}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}

          {/* Badges */}
          <BadgeSystem user={user} badges={user.badges} />
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            ) : (
              <p className="text-gray-600">{user.bio || 'No bio provided yet.'}</p>
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
                  <p className="text-gray-600">{user.experience}</p>
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
                  <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(user.availability)}`}>
                    {user.availability}
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
                  />
                ) : (
                  <p className="text-gray-600">
                    {user.hourlyRate ? `$${user.hourlyRate}/hour` : 'Not specified'}
                  </p>
                )}
              </div>
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