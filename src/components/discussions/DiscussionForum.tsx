import React, { useState } from 'react';
import { MessageSquare, Plus, Pin, Reply, ThumbsUp, Clock } from 'lucide-react';
import { Discussion, Project } from '../../types';
import { useData } from '../../contexts/DataContext';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Card from '../common/Card';

interface DiscussionForumProps {
  project: Project;
}

const DiscussionForum: React.FC<DiscussionForumProps> = ({ project }) => {
  const { createDiscussion, replyToDiscussion } = useData();
  const { user } = useAuth();
  const [showNewDiscussion, setShowNewDiscussion] = useState(false);
  const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
  const [newDiscussionData, setNewDiscussionData] = useState({
    title: '',
    content: '',
    tags: ''
  });
  const [replyContent, setReplyContent] = useState('');

  const handleCreateDiscussion = () => {
    if (!user || !newDiscussionData.title.trim() || !newDiscussionData.content.trim()) return;

    const tags = newDiscussionData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    
    createDiscussion(project.id, {
      title: newDiscussionData.title,
      content: newDiscussionData.content,
      tags,
      authorId: user.id,
      authorName: user.name
    });

    setNewDiscussionData({ title: '', content: '', tags: '' });
    setShowNewDiscussion(false);
  };

  const handleReply = () => {
    if (!user || !selectedDiscussion || !replyContent.trim()) return;

    replyToDiscussion(selectedDiscussion.id, {
      content: replyContent,
      authorId: user.id,
      authorName: user.name
    });

    setReplyContent('');
  };

  const sortedDiscussions = [...project.discussions].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  const canParticipate = user && (
    user.id === project.ownerId ||
    project.teamMembers.some(member => member.id === user.id)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <MessageSquare className="h-6 w-6 text-primary-600" />
          <h2 className="text-2xl font-bold text-gray-900">Discussions</h2>
          <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
            {project.discussions.length}
          </span>
        </div>
        
        {canParticipate && (
          <Button
            onClick={() => setShowNewDiscussion(true)}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Discussion</span>
          </Button>
        )}
      </div>

      {/* New Discussion Form */}
      {showNewDiscussion && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Start a New Discussion</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Discussion title..."
              value={newDiscussionData.title}
              onChange={(e) => setNewDiscussionData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <textarea
              placeholder="What would you like to discuss?"
              value={newDiscussionData.content}
              onChange={(e) => setNewDiscussionData(prev => ({ ...prev, content: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <input
              type="text"
              placeholder="Tags (comma-separated)"
              value={newDiscussionData.tags}
              onChange={(e) => setNewDiscussionData(prev => ({ ...prev, tags: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
            <div className="flex space-x-3">
              <Button onClick={handleCreateDiscussion}>
                Create Discussion
              </Button>
              <Button variant="ghost" onClick={() => setShowNewDiscussion(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Discussion List */}
      <div className="space-y-4">
        {sortedDiscussions.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No discussions yet</h3>
            <p className="text-gray-600">Start the conversation by creating the first discussion!</p>
          </Card>
        ) : (
          sortedDiscussions.map(discussion => (
            <Card key={discussion.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  {discussion.isPinned && (
                    <Pin className="h-4 w-4 text-orange-500" />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">
                    {discussion.title}
                  </h3>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Clock className="h-4 w-4" />
                  <span>{new Date(discussion.createdAt).toLocaleDateString()}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{discussion.content}</p>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    by {discussion.authorName}
                  </span>
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Reply className="h-4 w-4" />
                    <span>{discussion.replies.length} replies</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {discussion.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {tag}
                    </span>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setSelectedDiscussion(discussion)}
                  >
                    View
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Discussion Detail Modal */}
      {selectedDiscussion && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {selectedDiscussion.isPinned && (
                    <Pin className="h-5 w-5 text-orange-500" />
                  )}
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedDiscussion.title}
                  </h2>
                </div>
                <button
                  onClick={() => setSelectedDiscussion(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span>by {selectedDiscussion.authorName}</span>
                <span>{new Date(selectedDiscussion.createdAt).toLocaleDateString()}</span>
                <div className="flex space-x-1">
                  {selectedDiscussion.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="prose max-w-none mb-6">
                <p className="text-gray-700">{selectedDiscussion.content}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                  Replies ({selectedDiscussion.replies.length})
                </h3>
                
                {selectedDiscussion.replies.map(reply => (
                  <div key={reply.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{reply.authorName}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-gray-700">{reply.content}</p>
                  </div>
                ))}
              </div>
            </div>

            {canParticipate && (
              <div className="p-6 border-t">
                <div className="flex space-x-3">
                  <textarea
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                    placeholder="Write a reply..."
                    rows={3}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                  <Button onClick={handleReply} disabled={!replyContent.trim()}>
                    Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;