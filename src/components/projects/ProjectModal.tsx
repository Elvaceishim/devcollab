import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Input from '../common/Input';

interface ProjectModalProps {
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ onClose }) => {
  const { createProject } = useData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Open Source' as const,
    skills: '',
    maxTeamSize: 3,
    timeline: '',
    budget: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'maxTeamSize' ? parseInt(value) || 1 : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Validation
    if (!formData.title.trim()) {
      setError('Project title is required');
      return;
    }
    if (!formData.description.trim()) {
      setError('Project description is required');
      return;
    }
    if (!formData.skills.trim()) {
      setError('At least one skill is required');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
      
      createProject({
        title: formData.title.trim(),
        description: formData.description.trim(),
        type: formData.type,
        status: 'Planning',
        skills: skillsArray,
        teamSize: 1,
        maxTeamSize: formData.maxTeamSize,
        timeline: formData.timeline.trim(),
        budget: formData.budget ? parseFloat(formData.budget) : undefined,
        ownerId: user.id,
        ownerName: user.name,
      });

      onClose();
    } catch (err) {
      setError('Failed to create project. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-sm text-red-600 font-medium">{error}</p>
            </div>
          )}

          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            required
            className="rounded-xl"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your project..."
              required
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
            >
              <option value="Open Source">Open Source</option>
              <option value="Freelance">Freelance</option>
              <option value="Startup">Startup</option>
              <option value="Personal">Personal</option>
            </select>
          </div>

          <Input
            label="Required Skills"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, Python (comma-separated)"
            required
            helperText="List the main technologies and skills needed for this project"
            className="rounded-xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Max Team Size"
              type="number"
              name="maxTeamSize"
              value={formData.maxTeamSize}
              onChange={handleChange}
              min="1"
              max="20"
              required
              className="rounded-xl"
            />

            <Input
              label="Timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="e.g., 3 months, 6 weeks"
              required
              className="rounded-xl"
            />
          </div>

          {formData.type === 'Freelance' && (
            <Input
              label="Budget (USD)"
              type="number"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="5000"
              helperText="Optional - specify if this is a paid project"
              className="rounded-xl"
            />
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1 rounded-xl"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="flex-1 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 rounded-xl shadow-lg"
            >
              Create Project
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectModal;