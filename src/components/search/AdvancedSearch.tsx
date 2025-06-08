import React, { useState } from 'react';
import { Search, Filter, X, Sliders, TrendingUp } from 'lucide-react';
import { SearchFilters } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';

interface AdvancedSearchProps {
  filters: SearchFilters;
  onFiltersChange: (filters: SearchFilters) => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({
  filters,
  onFiltersChange,
  onSearch,
  searchQuery
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [localQuery, setLocalQuery] = useState(searchQuery);

  const skillOptions = [
    'React', 'Vue.js', 'Angular', 'Node.js', 'Python', 'Java', 'TypeScript',
    'JavaScript', 'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native',
    'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP', 'MongoDB', 'PostgreSQL',
    'MySQL', 'Redis', 'GraphQL', 'REST API', 'Machine Learning', 'AI',
    'Blockchain', 'Web3', 'DevOps', 'CI/CD', 'Testing', 'UI/UX Design'
  ];

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const handleSkillToggle = (skill: string) => {
    const newSkills = filters.skills.includes(skill)
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    handleFilterChange('skills', newSkills);
  };

  const handleArrayToggle = (key: keyof SearchFilters, value: string) => {
    const currentArray = filters[key] as string[];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(item => item !== value)
      : [...currentArray, value];
    handleFilterChange(key, newArray);
  };

  const clearFilters = () => {
    onFiltersChange({
      skills: [],
      projectTypes: [],
      difficulty: [],
      timeCommitment: [],
      status: [],
      teamSize: { min: 1, max: 20 },
      hasBudget: false,
      trending: false
    });
  };

  const activeFiltersCount = 
    filters.skills.length +
    filters.projectTypes.length +
    filters.difficulty.length +
    filters.timeCommitment.length +
    filters.status.length +
    (filters.hasBudget ? 1 : 0) +
    (filters.trending ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search projects by name, description, or technology..."
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onSearch(localQuery)}
          className="pl-12 pr-4 py-3 w-full border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-white/80 backdrop-blur-sm"
        />
        <Button
          onClick={() => onSearch(localQuery)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1.5 text-sm rounded-lg"
        >
          Search
        </Button>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center space-x-2"
        >
          <Sliders className="h-4 w-4" />
          <span>Advanced Filters</span>
          {activeFiltersCount > 0 && (
            <span className="bg-primary-600 text-white text-xs rounded-full px-2 py-1">
              {activeFiltersCount}
            </span>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button variant="ghost" onClick={clearFilters} className="text-sm">
            <X className="h-4 w-4 mr-1" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Advanced Filters Panel */}
      {showFilters && (
        <Card className="p-6 space-y-6">
          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filters.trending ? "primary" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('trending', !filters.trending)}
              className="flex items-center space-x-1"
            >
              <TrendingUp className="h-3 w-3" />
              <span>Trending</span>
            </Button>
            <Button
              variant={filters.hasBudget ? "primary" : "outline"}
              size="sm"
              onClick={() => handleFilterChange('hasBudget', !filters.hasBudget)}
            >
              Paid Projects
            </Button>
          </div>

          {/* Skills Filter */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Technologies & Skills</h3>
            <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {skillOptions.map(skill => (
                <button
                  key={skill}
                  onClick={() => handleSkillToggle(skill)}
                  className={`px-3 py-1 text-sm rounded-lg border transition-all ${
                    filters.skills.includes(skill)
                      ? 'bg-primary-100 text-primary-800 border-primary-300'
                      : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Project Type */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Project Type</h3>
              <div className="space-y-2">
                {['Open Source', 'Freelance', 'Startup', 'Personal'].map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.projectTypes.includes(type)}
                      onChange={() => handleArrayToggle('projectTypes', type)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Difficulty */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Difficulty</h3>
              <div className="space-y-2">
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <label key={level} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.difficulty.includes(level)}
                      onChange={() => handleArrayToggle('difficulty', level)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{level}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Time Commitment */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Time Commitment</h3>
              <div className="space-y-2">
                {['part-time', 'full-time', 'flexible'].map(commitment => (
                  <label key={commitment} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.timeCommitment.includes(commitment)}
                      onChange={() => handleArrayToggle('timeCommitment', commitment)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{commitment.replace('-', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Status */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Project Status</h3>
              <div className="space-y-2">
                {['Planning', 'In Progress', 'Completed', 'On Hold'].map(status => (
                  <label key={status} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status)}
                      onChange={() => handleArrayToggle('status', status)}
                      className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Team Size */}
            <div className="md:col-span-2">
              <h3 className="font-semibold text-gray-900 mb-3">Team Size</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">Min:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={filters.teamSize.min}
                    onChange={(e) => handleFilterChange('teamSize', {
                      ...filters.teamSize,
                      min: parseInt(e.target.value) || 1
                    })}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <label className="text-sm text-gray-700">Max:</label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={filters.teamSize.max}
                    onChange={(e) => handleFilterChange('teamSize', {
                      ...filters.teamSize,
                      max: parseInt(e.target.value) || 20
                    })}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default AdvancedSearch;