import React, { useState } from 'react';
import { Plus, Search, Filter, Clock, Users, DollarSign } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import ProjectModal from '../components/projects/ProjectModal';

const Dashboard: React.FC = () => {
  const { projects } = useData();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filterType === 'All' || project.type === filterType;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Progress': return 'bg-accent-100 text-accent-800';
      case 'Planning': return 'bg-primary-100 text-primary-800';
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'On Hold': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Open Source': return 'bg-green-100 text-green-800';
      case 'Freelance': return 'bg-blue-100 text-blue-800';
      case 'Startup': return 'bg-purple-100 text-purple-800';
      case 'Personal': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Project Dashboard</h1>
          <p className="text-gray-600">Discover and join exciting development projects</p>
        </div>
        <Button onClick={() => setShowCreateModal(true)} className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects by name, description, or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          />
        </div>
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
          <Card key={project.id} hover className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex space-x-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                  {project.status}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(project.type)}`}>
                  {project.type}
                </span>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
            <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

            <div className="flex flex-wrap gap-1 mb-4">
              {project.skills.slice(0, 3).map(skill => (
                <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  {skill}
                </span>
              ))}
              {project.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                  +{project.skills.length - 3} more
                </span>
              )}
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                <span>{project.teamSize}/{project.maxTeamSize} members</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{project.timeline}</span>
              </div>
            </div>

            {project.budget && (
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>${project.budget.toLocaleString()}</span>
              </div>
            )}

            <div className="border-t pt-4">
              <p className="text-sm text-gray-600 mb-2">Project Owner</p>
              <p className="font-medium text-gray-900">{project.ownerName}</p>
            </div>

            <div className="mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                disabled={
                  project.ownerId === user?.id || 
                  project.teamSize >= project.maxTeamSize ||
                  project.teamMembers.some(member => member.id === user?.id) ||
                  project.applicants.some(applicant => applicant.id === user?.id)
                }
              >
                {project.ownerId === user?.id 
                  ? 'Your Project' 
                  : project.teamMembers.some(member => member.id === user?.id)
                  ? 'Already Member'
                  : project.applicants.some(applicant => applicant.id === user?.id)
                  ? 'Application Sent'
                  : project.teamSize >= project.maxTeamSize
                  ? 'Team Full'
                  : 'Apply to Join'
                }
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <Search className="h-12 w-12 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {showCreateModal && (
        <ProjectModal onClose={() => setShowCreateModal(false)} />
      )}
    </div>
  );
};

export default Dashboard;