import React, { useState } from 'react';
import { Plus, Search, Filter, Clock, Users, DollarSign, Sparkles, UserCheck, Bell } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ProjectModal from '../components/projects/ProjectModal';
import ApplicationModal from '../components/projects/ApplicationModal';
import ApplicationsModal from '../components/projects/ApplicationsModal';
import { Project } from '../types';

const Dashboard: React.FC = () => {
  const { projects, applyToProject } = useData();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [showApplicationsModal, setShowApplicationsModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');
  const [viewMode, setViewMode] = useState<'all' | 'my-projects'>('all');

  const myProjects = projects.filter(project => project.ownerId === user?.id);
  const otherProjects = projects.filter(project => project.ownerId !== user?.id);
  
  const displayProjects = viewMode === 'my-projects' ? myProjects : otherProjects;

  const filteredProjects = displayProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'All' || project.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const handleApplyClick = (project: Project) => {
    setSelectedProject(project);
    setShowApplicationModal(true);
  };

  const handleViewApplications = (project: Project) => {
    setSelectedProject(project);
    setShowApplicationsModal(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-gradient-to-r from-accent-100 to-accent-200 text-accent-800 border border-accent-300';
      case 'Planning': return 'bg-gradient-to-r from-primary-100 to-primary-200 text-primary-800 border border-primary-300';
      case 'Completed': return 'bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300';
      case 'On Hold': return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Open Source': return 'bg-gradient-to-r from-green-100 to-emerald-200 text-green-800 border border-green-300';
      case 'Freelance': return 'bg-gradient-to-r from-blue-100 to-cyan-200 text-blue-800 border border-blue-300';
      case 'Startup': return 'bg-gradient-to-r from-purple-100 to-violet-200 text-purple-800 border border-purple-300';
      case 'Personal': return 'bg-gradient-to-r from-orange-100 to-amber-200 text-orange-800 border border-orange-300';
      default: return 'bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300';
    }
  };

  const canApplyToProject = (project: Project) => {
    if (!user) return false;
    if (project.ownerId === user.id) return false;
    if (project.teamSize >= project.maxTeamSize) return false;
    if (project.teamMembers.some(member => member.id === user.id)) return false;
    if (project.applicants.some(applicant => applicant.id === user.id)) return false;
    return true;
  };

  const getButtonText = (project: Project) => {
    if (!user) return 'Sign in to Apply';
    if (project.ownerId === user.id) return 'Your Project';
    if (project.teamMembers.some(member => member.id === user.id)) return 'Team Member';
    if (project.applicants.some(applicant => applicant.id === user.id)) return 'Application Sent';
    if (project.teamSize >= project.maxTeamSize) return 'Team Full';
    return 'Apply to Join';
  };

  const totalApplications = myProjects.reduce((total, project) => total + project.applicants.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-primary-800 to-secondary-800 bg-clip-text text-transparent mb-2">
              Project Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              {viewMode === 'my-projects' ? 'Manage your projects and applications' : 'Discover and join exciting development projects'}
            </p>
          </div>
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            {totalApplications > 0 && (
              <div className="relative">
                <Button
                  variant="outline"
                  onClick={() => setViewMode('my-projects')}
                  className="relative"
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Applications
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalApplications}
                  </span>
                </Button>
              </div>
            )}
            <Button 
              onClick={() => setShowCreateModal(true)} 
              className="bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Button>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center space-x-2 mb-6">
          <Button
            variant={viewMode === 'all' ? 'primary' : 'outline'}
            onClick={() => setViewMode('all')}
            size="sm"
            className="rounded-xl"
          >
            All Projects
          </Button>
          <Button
            variant={viewMode === 'my-projects' ? 'primary' : 'outline'}
            onClick={() => setViewMode('my-projects')}
            size="sm"
            className="rounded-xl relative"
          >
            My Projects
            {totalApplications > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {totalApplications}
              </span>
            )}
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by name, description, or skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/80 backdrop-blur-sm"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/80 backdrop-blur-sm"
          >
            <option value="All">All Types</option>
            <option value="Open Source">Open Source</option>
            <option value="Freelance">Freelance</option>
            <option value="Startup">Startup</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(project => (
            <Card key={project.id} className="p-6 hover:shadow-xl transition-all duration-300 bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:scale-[1.02]">
              <div className="flex justify-between items-start mb-4">
                <div className="flex flex-wrap gap-2">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                    {project.status}
                  </span>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(project.type)}`}>
                    {project.type}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {project.type === 'Startup' && (
                    <Sparkles className="h-5 w-5 text-purple-500" />
                  )}
                  {viewMode === 'my-projects' && project.applicants.length > 0 && (
                    <div className="relative">
                      <Bell className="h-5 w-5 text-orange-500" />
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center">
                        {project.applicants.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{project.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-lg border border-gray-300">
                    {skill}
                  </span>
                ))}
                {project.skills.length > 3 && (
                  <span className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 text-xs rounded-lg border border-gray-300">
                    +{project.skills.length - 3} more
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                  <Users className="h-4 w-4 mr-2 text-primary-600" />
                  <span className="font-medium">{project.teamSize}/{project.maxTeamSize} members</span>
                </div>
                <div className="flex items-center bg-gray-50 rounded-lg px-3 py-2">
                  <Clock className="h-4 w-4 mr-2 text-secondary-600" />
                  <span className="font-medium">{project.timeline}</span>
                </div>
              </div>

              {project.budget && (
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center bg-green-50 rounded-lg px-3 py-2">
                    <DollarSign className="h-4 w-4 mr-2 text-green-600" />
                    <span className="font-medium text-green-700">${project.budget.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <div className="border-t border-gray-100 pt-4 mb-4">
                <p className="text-sm text-gray-500 mb-1">Project Owner</p>
                <p className="font-semibold text-gray-900">{project.ownerName}</p>
              </div>

              <div className="mt-4 space-y-2">
                {viewMode === 'my-projects' ? (
                  <>
                    {project.applicants.length > 0 && (
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full rounded-xl bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 shadow-md hover:shadow-lg"
                        onClick={() => handleViewApplications(project)}
                      >
                        <UserCheck className="h-4 w-4 mr-2" />
                        View Applications ({project.applicants.length})
                      </Button>
                    )}
                    <Button 
                      variant="outline"
                      size="sm" 
                      className="w-full rounded-xl border-gray-300 text-gray-600"
                      disabled
                    >
                      Your Project
                    </Button>
                  </>
                ) : (
                  <Button 
                    variant={canApplyToProject(project) ? "primary" : "outline"}
                    size="sm" 
                    className={`w-full rounded-xl transition-all duration-300 ${
                      canApplyToProject(project) 
                        ? 'bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-md hover:shadow-lg' 
                        : 'border-gray-300 text-gray-500'
                    }`}
                    disabled={!canApplyToProject(project)}
                    onClick={() => canApplyToProject(project) && handleApplyClick(project)}
                  >
                    {getButtonText(project)}
                  </Button>
                )}
              </div>
            </Card>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-gradient-to-r from-gray-100 to-gray-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {viewMode === 'my-projects' ? 'No projects created yet' : 'No projects found'}
            </h3>
            <p className="text-gray-600">
              {viewMode === 'my-projects' 
                ? 'Create your first project to start collaborating with other developers'
                : 'Try adjusting your search or filter criteria'
              }
            </p>
          </div>
        )}

        {showCreateModal && (
          <ProjectModal onClose={() => setShowCreateModal(false)} />
        )}

        {showApplicationModal && selectedProject && (
          <ApplicationModal 
            project={selectedProject} 
            onClose={() => {
              setShowApplicationModal(false);
              setSelectedProject(null);
            }} 
          />
        )}

        {showApplicationsModal && selectedProject && (
          <ApplicationsModal
            project={selectedProject}
            onClose={() => {
              setShowApplicationsModal(false);
              setSelectedProject(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;