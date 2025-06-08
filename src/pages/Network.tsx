import React, { useState } from 'react';
import { Search, MapPin, Github, Linkedin, Globe, MessageCircle, Award } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import EndorsementSystem from '../components/endorsements/EndorsementSystem';

const Network: React.FC = () => {
  const { users } = useData();
  const { user: currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [skillFilter, setSkillFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);

  const otherUsers = users.filter(user => user.id !== currentUser?.id);

  const filteredUsers = otherUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = !skillFilter || 
                        user.skills.some(skill => 
                          skill.toLowerCase().includes(skillFilter.toLowerCase())
                        );
    
    return matchesSearch && matchesSkill;
  });

  const allSkills = Array.from(new Set(otherUsers.flatMap(user => user.skills))).sort();

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800';
      case 'Busy': return 'bg-yellow-100 text-yellow-800';
      case 'Not Available': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Junior': return 'bg-blue-100 text-blue-800';
      case 'Mid-level': return 'bg-purple-100 text-purple-800';
      case 'Senior': return 'bg-orange-100 text-orange-800';
      case 'Lead': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Developer Network</h1>
        <p className="text-gray-600">Connect with talented developers from around the world</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search developers by name, bio, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="">All Skills</option>
          {allSkills.map(skill => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <Card key={user.id} hover className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <span className="text-lg font-bold text-primary-600">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{user.name}</h3>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getExperienceColor(user.experience)}`}>
                    {user.experience}
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAvailabilityColor(user.availability)}`}>
                  {user.availability}
                </span>
                {user.badges && user.badges.length > 0 && (
                  <div className="flex items-center space-x-1">
                    <Award className="h-3 w-3 text-yellow-500" />
                    <span className="text-xs text-gray-500">{user.badges.length}</span>
                  </div>
                )}
              </div>
            </div>

            {user.location && (
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1" />
                <span className="text-sm">{user.location}</span>
              </div>
            )}

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {user.bio || 'No bio provided yet.'}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {user.skills.slice(0, 4).map(skill => (
                <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  {skill}
                </span>
              ))}
              {user.skills.length > 4 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                  +{user.skills.length - 4} more
                </span>
              )}
            </div>

            {/* Endorsement count */}
            {user.endorsements && user.endorsements.length > 0 && (
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium">{user.endorsements.length} endorsements</span>
              </div>
            )}

            {user.hourlyRate && (
              <div className="text-sm text-gray-600 mb-4">
                <span className="font-medium">${user.hourlyRate}/hour</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex space-x-2">
                {user.github && (
                  <a
                    href={`https://github.com/${user.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Github className="h-4 w-4" />
                  </a>
                )}
                {user.linkedin && (
                  <a
                    href={`https://linkedin.com/in/${user.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                  </a>
                )}
                {user.portfolio && (
                  <a
                    href={user.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                  </a>
                )}
              </div>
              <div className="flex space-x-2">
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => setSelectedUser(user)}
                >
                  View Profile
                </Button>
                <Button size="sm" variant="outline">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Connect
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No developers found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {/* User Profile Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                    {selectedUser.avatar ? (
                      <img src={selectedUser.avatar} alt={selectedUser.name} className="w-16 h-16 rounded-full" />
                    ) : (
                      <span className="text-2xl font-bold text-primary-600">
                        {selectedUser.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedUser.name}</h2>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getExperienceColor(selectedUser.experience)}`}>
                        {selectedUser.experience}
                      </span>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${getAvailabilityColor(selectedUser.availability)}`}>
                        {selectedUser.availability}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                  <p className="text-gray-600 mb-6">{selectedUser.bio || 'No bio provided.'}</p>
                  
                  {selectedUser.location && (
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{selectedUser.location}</span>
                    </div>
                  )}
                </div>

                <div>
                  <EndorsementSystem user={selectedUser} canEndorse={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Network;