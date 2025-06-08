import React, { useState } from 'react';
import { X, Send, User, FileText } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { Project } from '../../types';
import Button from '../common/Button';
import Input from '../common/Input';

interface ApplicationModalProps {
  project: Project;
  onClose: () => void;
}

const ApplicationModal: React.FC<ApplicationModalProps> = ({ project, onClose }) => {
  const { applyToProject } = useData();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    message: '',
    relevantExperience: '',
    availability: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    applyToProject(project.id, user.id);
    setLoading(false);
    onClose();
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 p-6 rounded-t-2xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="text-white">
            <h2 className="text-2xl font-bold mb-2">Apply to Join Project</h2>
            <h3 className="text-xl opacity-90">{project.title}</h3>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-xl p-4 mb-6">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                <User className="h-5 w-5 text-primary-600" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{user.name}</h4>
                <p className="text-sm text-gray-600">{user.experience} Developer</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {user.skills.slice(0, 4).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-white text-gray-700 text-xs rounded-md shadow-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                <FileText className="h-4 w-4 mr-2" />
                Why do you want to join this project?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Tell the project owner why you're interested and what you can contribute..."
                required
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Relevant Experience
              </label>
              <textarea
                name="relevantExperience"
                value={formData.relevantExperience}
                onChange={handleChange}
                rows={3}
                placeholder="Describe your experience with the required technologies..."
                className="block w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Availability
              </label>
              <Input
                name="availability"
                value={formData.availability}
                onChange={handleChange}
                placeholder="e.g., 10-15 hours per week, weekends only, etc."
                className="rounded-xl"
              />
            </div>

            <div className="bg-gray-50 rounded-xl p-4">
              <h4 className="font-medium text-gray-900 mb-2">Project Requirements:</h4>
              <div className="flex flex-wrap gap-2">
                {project.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white text-gray-700 text-sm rounded-lg shadow-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

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
                <Send className="h-4 w-4 mr-2" />
                Send Application
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;