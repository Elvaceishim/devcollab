import React from 'react';
import { TrendingUp, Star, Users, Clock, Eye } from 'lucide-react';
import { Project } from '../../types';
import Card from '../common/Card';
import Button from '../common/Button';

interface TrendingProjectsProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

const TrendingProjects: React.FC<TrendingProjectsProps> = ({ projects, onProjectClick }) => {
  const trendingProjects = projects
    .filter(p => p.trending)
    .sort((a, b) => (b.trending?.score || 0) - (a.trending?.score || 0))
    .slice(0, 6);

  if (trendingProjects.length === 0) {
    return null;
  }

  const getTrendingBadgeColor = (score: number) => {
    if (score >= 80) return 'bg-gradient-to-r from-red-500 to-pink-500';
    if (score >= 60) return 'bg-gradient-to-r from-orange-500 to-yellow-500';
    return 'bg-gradient-to-r from-blue-500 to-purple-500';
  };

  return (
    <div className="mb-8">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center space-x-2">
          <TrendingUp className="h-6 w-6 text-orange-500" />
          <h2 className="text-2xl font-bold text-gray-900">Trending Projects</h2>
        </div>
        <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-orange-100 to-red-100 rounded-full">
          <Star className="h-4 w-4 text-orange-600" />
          <span className="text-sm font-medium text-orange-800">Hot Right Now</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trendingProjects.map((project, index) => (
          <Card key={project.id} className="p-6 relative overflow-hidden group hover:shadow-2xl transition-all duration-300">
            {/* Trending Badge */}
            <div className="absolute top-4 right-4 flex items-center space-x-1">
              <div className={`px-2 py-1 rounded-full text-white text-xs font-bold ${getTrendingBadgeColor(project.trending?.score || 0)}`}>
                #{index + 1}
              </div>
            </div>

            {/* Trending Score */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center space-x-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                <TrendingUp className="h-3 w-3 text-orange-500" />
                <span className="text-xs font-bold text-orange-600">
                  {project.trending?.score || 0}
                </span>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                {project.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {project.description}
              </p>

              {/* Skills */}
              <div className="flex flex-wrap gap-1 mb-4">
                {project.skills.slice(0, 3).map(skill => (
                  <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                    {skill}
                  </span>
                ))}
                {project.skills.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                    +{project.skills.length - 3}
                  </span>
                )}
              </div>

              {/* Trending Stats */}
              <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                <div className="flex items-center space-x-1 bg-gray-50 rounded-lg px-2 py-1">
                  <Eye className="h-3 w-3 text-blue-500" />
                  <span className="font-medium">{project.trending?.views || 0}</span>
                </div>
                <div className="flex items-center space-x-1 bg-gray-50 rounded-lg px-2 py-1">
                  <Users className="h-3 w-3 text-green-500" />
                  <span className="font-medium">{project.trending?.applications || 0}</span>
                </div>
                <div className="flex items-center space-x-1 bg-gray-50 rounded-lg px-2 py-1">
                  <Star className="h-3 w-3 text-yellow-500" />
                  <span className="font-medium">{project.trending?.stars || 0}</span>
                </div>
              </div>

              <Button
                onClick={() => onProjectClick(project)}
                size="sm"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600"
              >
                View Project
              </Button>
            </div>

            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TrendingProjects;