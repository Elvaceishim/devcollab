import React, { useState } from 'react';
import { ThumbsUp, MessageSquare, Plus, X } from 'lucide-react';
import { User, Endorsement } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Card from '../common/Card';

interface EndorsementSystemProps {
  user: User;
  canEndorse?: boolean;
}

const EndorsementSystem: React.FC<EndorsementSystemProps> = ({ user, canEndorse = false }) => {
  const { user: currentUser, endorseSkill } = useAuth();
  const [showEndorseModal, setShowEndorseModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [endorsementMessage, setEndorsementMessage] = useState('');

  // Check if user is defined and has skills
  if (!user || !user.skills) {
    return <div>No skills available.</div>;
  }

  const handleEndorse = () => {
    if (!selectedSkill || !currentUser) return;
    
    endorseSkill(user.id, selectedSkill, endorsementMessage);
    setShowEndorseModal(false);
    setSelectedSkill('');
    setEndorsementMessage('');
  };

  const getSkillEndorsements = (skill: string) => {
    return user.endorsements.filter(e => e.skill === skill);
  };

  const hasUserEndorsed = (skill: string) => {
    return user.endorsements.some(e => e.skill === skill && e.endorserId === currentUser?.id);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Skills & Endorsements</h3>
        {canEndorse && currentUser && currentUser.id !== user.id && (
          <Button
            size="sm"
            onClick={() => setShowEndorseModal(true)}
            className="flex items-center space-x-1"
          >
            <Plus className="h-4 w-4" />
            <span>Endorse</span>
          </Button>
        )}
      </div>

      <div className="grid gap-4">
        {user.skills.map(skill => {
          const endorsements = getSkillEndorsements(skill);
          const userEndorsed = hasUserEndorsed(skill);
          
          return (
            <Card key={skill} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{skill}</h4>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{endorsements.length}</span>
                  </div>
                  {canEndorse && currentUser && currentUser.id !== user.id && !userEndorsed && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setSelectedSkill(skill);
                        setShowEndorseModal(true);
                      }}
                      className="text-xs px-2 py-1"
                    >
                      +1
                    </Button>
                  )}
                </div>
              </div>

              {endorsements.length > 0 && (
                <div className="space-y-2">
                  {endorsements.slice(0, 3).map(endorsement => (
                    <div key={endorsement.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium text-sm text-gray-900">
                            {endorsement.endorserName}
                          </p>
                          {endorsement.message && (
                            <p className="text-sm text-gray-600 mt-1">
                              "{endorsement.message}"
                            </p>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(endorsement.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))}
                  {endorsements.length > 3 && (
                    <p className="text-sm text-gray-500 text-center">
                      +{endorsements.length - 3} more endorsements
                    </p>
                  )}
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Endorsement Modal */}
      {showEndorseModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Endorse {user.name}</h3>
              <button
                onClick={() => setShowEndorseModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Skill
                </label>
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">Choose a skill...</option>
                  {user.skills.map(skill => (
                    <option key={skill} value={skill}>{skill}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  value={endorsementMessage}
                  onChange={(e) => setEndorsementMessage(e.target.value)}
                  rows={3}
                  placeholder="Share your experience working with this person..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>

              <div className="flex space-x-3">
                <Button
                  variant="ghost"
                  onClick={() => setShowEndorseModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleEndorse}
                  disabled={!selectedSkill}
                  className="flex-1"
                >
                  Endorse
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EndorsementSystem;