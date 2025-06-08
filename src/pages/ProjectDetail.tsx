import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, Users, DollarSign, Github, ExternalLink, MessageSquare, Kanban, Code } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import KanbanBoard from '../components/kanban/KanbanBoard';
import DiscussionForum from '../components/discussions/DiscussionForum';

const ProjectDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { projects } = useData();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'tasks' | 'discussions' | 'challenges'>('overview');

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Project Not Found</h2>
          <p className="text-gray-600">The project you're looking for doesn't exist.</p>
        </Card>
      </div>
    );
  }

  const isTeamMember = user && (
    user.id === project.ownerId ||
    project.teamMembers.some(member => member.id === user.id)
  );

  const tabs = [
    { id: 'overview', label: 'Overview', icon: ExternalLink },
    { id: 'tasks', label: 'Tasks', icon: Kanban },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare },
    { id: 'challenges', label: 'Challenges', icon: Code }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Project Header */}
      <Card className="p-8 mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{project.title}</h1>
            <p className="text-gray-600 text-lg">{project.description}</p>
          </div>
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <span className="px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
              {project.status}
            </span>
            <span className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium">
              {project.type}
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="flex items-center space-x-3">
            <Users className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Team Size</p>
              <p className="font-semibold">{project.teamSize}/{project.maxTeamSize}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">Timeline</p>
              <p className="font-semibold">{project.timeline}</p>
            </div>
          </div>
          {project.budget && (
            <div className="flex items-center space-x-3">
              <DollarSign className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Budget</p>
                <p className="font-semibold">${project.budget.toLocaleString()}</p>
              </div>
            </div>
          )}
          {project.githubRepo && (
            <div className="flex items-center space-x-3">
              <Github className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Repository</p>
                <a 
                  href={project.githubRepo} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-primary-600 hover:text-primary-700"
                >
                  View Code
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {project.skills.map(skill => (
            <span key={skill} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm">
              {skill}
            </span>
          ))}
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="flex space-x-8">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Details</h3>
                <p className="text-gray-600 leading-relaxed">{project.description}</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Required Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map(skill => (
                    <span key={skill} className="px-3 py-2 bg-primary-100 text-primary-800 rounded-lg">
                      {skill}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Project Owner</h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">
                      {project.ownerName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{project.ownerName}</p>
                    <p className="text-sm text-gray-500">Project Lead</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Members</h3>
                <div className="space-y-3">
                  {project.teamMembers.map(member => (
                    <div key={member.id} className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-secondary-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-secondary-600">
                          {member.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.experience}</p>
                      </div>
                    </div>
                  ))}
                  {project.teamMembers.length === 0 && (
                    <p className="text-gray-500 text-sm">No team members yet</p>
                  )}
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <Card className="p-6 h-full">
            {isTeamMember ? (
              <KanbanBoard project={project} />
            ) : (
              <div className="text-center py-12">
                <Kanban className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Team Members Only</h3>
                <p className="text-gray-600">Join the project team to access task management</p>
              </div>
            )}
          </Card>
        )}

        {activeTab === 'discussions' && (
          <DiscussionForum project={project} />
        )}

        {activeTab === 'challenges' && (
          <Card className="p-8 text-center">
            <Code className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Icebreaker Challenges</h3>
            <p className="text-gray-600 mb-4">Complete coding challenges to join this project</p>
            <Button>View Challenges</Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProjectDetail;