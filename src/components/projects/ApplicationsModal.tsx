import React, { useState } from 'react';
import { X, User, Check, MessageSquare, MapPin, Star } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Project, User as UserType } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';

interface ApplicationsModalProps {
  project: Project;
  onClose: () => void;
}

const ApplicationsModal: React.FC<ApplicationsModalProps> = ({ project, onClose }) => {
  const { acceptApplication } = useData();
  const [selectedApplicant, setSelectedApplicant] = useState<UserType | null>(null);

  const handleAcceptApplication = (userId: string) => {
    acceptApplication(project.id, userId);
    // Close the modal if no more applicants
    if (project.applicants.length === 1) {
      onClose();
    }
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'Junior': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Mid-level': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Senior': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Lead': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'Available': return 'bg-green-100 text-green-800 border-green-200';
      case 'Busy': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Not Available': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSkillMatch = (applicantSkills: string[], projectSkills: string[]) => {
    const matches = applicantSkills.filter(skill => 
      projectSkills.some(pSkill => 
        pSkill.toLowerCase().includes(skill.toLowerCase()) || 
        skill.toLowerCase().includes(pSkill.toLowerCase())
      )
    );
    return {
      count: matches.length,
      percentage: Math.round((matches.length / projectSkills.length) * 100),
      matchedSkills: matches
    };
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">Project Applications</h2>
            <h3 className="text-xl opacity-90">{project.title}</h3>
            <p className="text-sm opacity-75 mt-2">
              {project.applicants.length} application{project.applicants.length !== 1 ? 's' : ''} • 
              {project.maxTeamSize - project.teamSize} spot{project.maxTeamSize - project.teamSize !== 1 ? 's' : ''} available
            </p>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* Applicants List */}
          <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Applicants ({project.applicants.length})</h3>
              <div className="space-y-3">
                {project.applicants.map(applicant => {
                  const skillMatch = getSkillMatch(applicant.skills, project.skills);
                  return (
                    <div
                      key={applicant.id}
                      onClick={() => setSelectedApplicant(applicant)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                        selectedApplicant?.id === applicant.id
                          ? 'border-primary-300 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center shadow-sm">
                          {applicant.avatars? (
                            <img src={applicant.avatars} alt={applicant.name} className="w-10 h-10 rounded-full" />
                          ) : (
                            <User className="h-5 w-5 text-primary-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 truncate">{applicant.name}</h4>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getExperienceColor(applicant.experience)}`}>
                              {applicant.experience}
                            </span>
                            <span className={`px-2 py-1 text-xs font-medium rounded-md border ${getAvailabilityColor(applicant.availability)}`}>
                              {applicant.availability}
                            </span>
                          </div>
                          <div className="flex items-center mt-2">
                            <Star className="h-3 w-3 text-yellow-500 mr-1" />
                            <span className="text-xs text-gray-600">
                              {skillMatch.percentage}% skill match
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Applicant Details */}
          <div className="flex-1 overflow-y-auto">
            {selectedApplicant ? (
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center shadow-lg">
                      {selectedApplicant.avatars ? (
                        <img src={selectedApplicant.avatars} alt={selectedApplicant.name} className="w-16 h-16 rounded-full" />
                      ) : (
                        <User className="h-8 w-8 text-primary-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{selectedApplicant.name}</h3>
                      <div className="flex items-center space-x-3 mt-2">
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getExperienceColor(selectedApplicant.experience)}`}>
                          {selectedApplicant.experience} Developer
                        </span>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getAvailabilityColor(selectedApplicant.availability)}`}>
                          {selectedApplicant.availability}
                        </span>
                      </div>
                      {selectedApplicant.location && (
                        <div className="flex items-center text-gray-600 mt-2">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{selectedApplicant.location}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button
                    onClick={() => handleAcceptApplication(selectedApplicant.id)}
                    disabled={project.teamSize >= project.maxTeamSize}
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-lg"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Accept Application
                  </Button>
                </div>

                {/* Bio */}
                <Card className="p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    About
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedApplicant.bio || 'No bio provided.'}
                  </p>
                </Card>

                {/* Skills Match */}
                <Card className="p-4 mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Skills Analysis</h4>
                  {(() => {
                    const skillMatch = getSkillMatch(selectedApplicant.skills, project.skills);
                    return (
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm text-gray-600">Skill Match</span>
                          <span className="font-semibold text-primary-600">{skillMatch.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                          <div 
                            className="bg-gradient-to-r from-primary-600 to-secondary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${skillMatch.percentage}%` }}
                          ></div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Required Skills</h5>
                            <div className="flex flex-wrap gap-1">
                              {project.skills.map(skill => {
                                const isMatched = skillMatch.matchedSkills.some(matched => 
                                  matched.toLowerCase().includes(skill.toLowerCase()) || 
                                  skill.toLowerCase().includes(matched.toLowerCase())
                                );
                                return (
                                  <span 
                                    key={skill} 
                                    className={`px-2 py-1 text-xs rounded-md ${
                                      isMatched 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-gray-100 text-gray-600 border border-gray-200'
                                    }`}
                                  >
                                    {skill}
                                  </span>
                                );
                              })}
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">Applicant Skills</h5>
                            <div className="flex flex-wrap gap-1">
                              {selectedApplicant.skills.map(skill => (
                                <span 
                                  key={skill} 
                                  className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md border border-blue-200"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </Card>

                {/* Additional Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Experience</h4>
                    <p className="text-gray-600">{selectedApplicant.experience} level developer</p>
                    {selectedApplicant.hourlyRate && (
                      <p className="text-sm text-gray-500 mt-1">${selectedApplicant.hourlyRate}/hour</p>
                    )}
                  </Card>

                  <Card className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-3">Joined</h4>
                    <p className="text-gray-600">
                      {new Date(selectedApplicant.joinedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </Card>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <div className="text-center">
                  <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select an applicant</p>
                  <p className="text-sm">Choose from the list to view their details</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationsModal;