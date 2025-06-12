import React, { useState } from 'react';
import { Users, MessageCircle, UserPlus, Check, X, Mail } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types';
import Button from '../common/Button';
import Card from '../common/Card';

interface ConnectionRequest {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  message?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

const DeveloperConnections: React.FC = () => {
  const { users, sendConnectionRequest } = useData();
  const { user } = useAuth();
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [connectionMessage, setConnectionMessage] = useState('');
  const [connectionRequests, setConnectionRequests] = useState<ConnectionRequest[]>([]);

  const handleSendConnectionRequest = () => {
    if (!user || !selectedUser) return;

    const newRequest: ConnectionRequest = {
      id: Math.random().toString(36).substr(2, 9),
      fromUserId: user.id,
      fromUserName: user.name,
      toUserId: selectedUser.id,
      message: connectionMessage,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setConnectionRequests(prev => [...prev, newRequest]);
    sendConnectionRequest(user.id, selectedUser.id, connectionMessage);
    
    setShowConnectionModal(false);
    setSelectedUser(null);
    setConnectionMessage('');
  };

  const handleConnectionResponse = (requestId: string, status: 'accepted' | 'declined') => {
    setConnectionRequests(prev =>
      prev.map(req =>
        req.id === requestId ? { ...req, status } : req
      )
    );
  };

  const otherUsers = users.filter(u => u.id !== user?.id);
  const pendingRequests = connectionRequests.filter(req => 
    req.toUserId === user?.id && req.status === 'pending'
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Users className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">Developer Network</h2>
        </div>
        {pendingRequests.length > 0 && (
          <div className="relative">
            <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {pendingRequests.length}
            </div>
            <Button variant="outline" size="sm">
              <Mail className="h-4 w-4 mr-2" />
              Requests
            </Button>
          </div>
        )}
      </div>

      {/* Connection Requests */}
      {pendingRequests.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Connection Requests ({pendingRequests.length})
          </h3>
          <div className="space-y-4">
            {pendingRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{request.fromUserName}</h4>
                  {request.message && (
                    <p className="text-sm text-gray-600 mt-1">"{request.message}"</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => handleConnectionResponse(request.id, 'accepted')}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Check className="h-4 w-4 mr-1" />
                    Accept
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleConnectionResponse(request.id, 'declined')}
                  >
                    <X className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Developer Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {otherUsers.map(developer => (
          <Card key={developer.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  {developer.avatars? (
                    <img src={developer.avatars} alt={developer.name} className="w-12 h-12 rounded-full" />
                  ) : (
                    <span className="text-lg font-bold text-primary-600">
                      {developer.name.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{developer.name}</h3>
                  <p className="text-sm text-gray-600">{developer.experience}</p>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                <div className={`w-2 h-2 rounded-full ${
                  developer.availability === 'Available' ? 'bg-green-500' :
                  developer.availability === 'Busy' ? 'bg-yellow-500' : 'bg-red-500'
                }`}></div>
                <span className="text-xs text-gray-500">{developer.availability}</span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {developer.bio || 'No bio provided.'}
            </p>

            <div className="flex flex-wrap gap-1 mb-4">
              {developer.skills.slice(0, 3).map(skill => (
                <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
                  {skill}
                </span>
              ))}
              {developer.skills.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-md">
                  +{developer.skills.length - 3}
                </span>
              )}
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => {
                  setSelectedUser(developer);
                  setShowConnectionModal(true);
                }}
                className="flex-1"
              >
                <UserPlus className="h-4 w-4 mr-1" />
                Connect
              </Button>
              <Button size="sm" variant="outline">
                <MessageCircle className="h-4 w-4 mr-1" />
                Message
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Connection Modal */}
      {showConnectionModal && selectedUser && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Connect with {selectedUser.name}
              </h3>
              <button
                onClick={() => setShowConnectionModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="font-bold text-primary-600">
                    {selectedUser.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{selectedUser.name}</h4>
                  <p className="text-sm text-gray-600">{selectedUser.experience} Developer</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message (Optional)
              </label>
              <textarea
                value={connectionMessage}
                onChange={(e) => setConnectionMessage(e.target.value)}
                rows={3}
                placeholder="Hi! I'd like to connect and explore potential collaboration opportunities..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                variant="ghost"
                onClick={() => setShowConnectionModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSendConnectionRequest}
                className="flex-1"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Send Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperConnections;