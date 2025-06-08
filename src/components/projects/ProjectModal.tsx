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

    setLoading(true);
    
    const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s.length > 0);
    
    createProject({
      title: formData.title,
      description: formData.description,
      type: formData.type,
      status: 'Planning',
      skills: skillsArray,
      teamSize: 1,
      maxTeamSize: formData.maxTeamSize,
      timeline: formData.timeline,
      budget: formData.budget ? parseFloat(formData.budget) : undefined,
      ownerId: user.id,
      ownerName: user.name,
    });

    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">Create New Project</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <Input
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter project title"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="Describe your project..."
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
            />

            <Input
              label="Timeline"
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              placeholder="e.g., 3 months, 6 weeks"
              required
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
            />
          )}

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              className="flex-1"
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