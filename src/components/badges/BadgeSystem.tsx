import React from 'react';
import { Award, Star, Users, Code, Trophy, Target } from 'lucide-react';
import { Badge, User } from '../../types';
import Card from '../common/Card';

interface BadgeSystemProps {
  user: User;
  badges: Badge[];
  showAll?: boolean;
}

const BadgeSystem: React.FC<BadgeSystemProps> = ({ user, badges, showAll = false }) => {
  const getBadgeIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      'award': <Award className="h-5 w-5" />,
      'star': <Star className="h-5 w-5" />,
      'users': <Users className="h-5 w-5" />,
      'code': <Code className="h-5 w-5" />,
      'trophy': <Trophy className="h-5 w-5" />,
      'target': <Target className="h-5 w-5" />
    };
    return icons[iconName] || <Award className="h-5 w-5" />;
  };

  const getBadgeColor = (color: string) => {
    const colors: Record<string, string> = {
      'gold': 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white',
      'silver': 'bg-gradient-to-r from-gray-300 to-gray-500 text-white',
      'bronze': 'bg-gradient-to-r from-orange-400 to-orange-600 text-white',
      'blue': 'bg-gradient-to-r from-blue-400 to-blue-600 text-white',
      'green': 'bg-gradient-to-r from-green-400 to-green-600 text-white',
      'purple': 'bg-gradient-to-r from-purple-400 to-purple-600 text-white',
      'red': 'bg-gradient-to-r from-red-400 to-red-600 text-white'
    };
    return colors[color] || 'bg-gradient-to-r from-gray-400 to-gray-600 text-white';
  };

  const displayBadges = showAll ? user.badges : user.badges.slice(0, 6);

  if (user.badges.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No Badges Yet</h3>
        <p className="text-gray-600">Complete projects and contribute to earn your first badge!</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Badges ({user.badges.length})
        </h3>
        {!showAll && user.badges.length > 6 && (
          <span className="text-sm text-gray-500">
            +{user.badges.length - 6} more
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {displayBadges.map(badge => (
          <div
            key={badge.id}
            className={`p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 ${getBadgeColor(badge.color)}`}
          >
            <div className="flex justify-center mb-2">
              {getBadgeIcon(badge.icon)}
            </div>
            <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
            <p className="text-xs opacity-90 line-clamp-2">{badge.description}</p>
            <p className="text-xs opacity-75 mt-2">
              {new Date(badge.earnedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BadgeSystem;