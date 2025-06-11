import React from 'react';
import { Users, Star, Clock, Code } from 'lucide-react';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'AI-Powered Code Review',
      description: 'Building an AI system to automate code reviews and suggest improvements.',
      type: 'Open Source',
      teamSize: 5,
      maxTeamSize: 8,
      timeline: '2 months',
      skills: ['Python', 'Machine Learning', 'React', 'FastAPI'],
      rating: 4.8,
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'E-commerce Platform',
      description: 'Modern e-commerce solution with microservices architecture.',
      type: 'Freelance',
      teamSize: 3,
      maxTeamSize: 6,
      timeline: '4 months',
      skills: ['Node.js', 'React', 'PostgreSQL', 'Docker'],
      rating: 4.9,
      status: 'Planning'
    },
    {
      id: 3,
      title: 'Mobile Fitness App',
      description: 'Cross-platform fitness tracking app with social features.',
      type: 'Startup',
      teamSize: 4,
      maxTeamSize: 7,
      timeline: '6 months',
      skills: ['React Native', 'Firebase', 'TypeScript', 'Redux'],
      rating: 4.7,
      status: 'In Progress'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Planning':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-green-100 text-green-800';
      case 'Completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Open Source':
        return 'bg-green-100 text-green-800';
      case 'Freelance':
        return 'bg-blue-100 text-blue-800';
      case 'Startup':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
            Collaborative Projects
          </h1>
          <p className="text-xl text-gray-600">
            Join exciting projects or create your own. Collaborate with developers worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex space-x-2">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getTypeColor(project.type)}`}>
                      {project.type}
                    </span>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium text-gray-700">{project.rating}</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{project.description}</p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                      +{project.skills.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{project.teamSize}/{project.maxTeamSize}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{project.timeline}</span>
                  </div>
                </div>

                <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-colors">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Projects;