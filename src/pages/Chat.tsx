import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, Users } from 'lucide-react';
import { useData } from '../contexts/DataContext';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/common/Card';
import Button from '../components/common/Button';

const Chat: React.FC = () => {
  const { projects, messages, sendMessage, getProjectMessages } = useData();
  const { user } = useAuth();
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const userProjects = projects.filter(project => 
    project.ownerId === user?.id || 
    project.teamMembers.some(member => member.id === user?.id)
  );

  const selectedProjectData = projects.find(p => p.id === selectedProject);
  const projectMessages = selectedProject ? getProjectMessages(selectedProject) : [];

  useEffect(() => {
    scrollToBottom();
  }, [projectMessages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedProject || !user) return;

    sendMessage({
      senderId: user.id,
      senderName: user.name,
      content: messageText.trim(),
      projectId: selectedProject,
    });

    setMessageText('');
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-8rem)]">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Chat</h1>
        <p className="text-gray-600">Communicate with your project teams</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 h-full">
        <div className="lg:col-span-1">
          <Card className="p-4 h-full">
            <h2 className="font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Your Projects
            </h2>
            <div className="space-y-2">
              {userProjects.map(project => (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    selectedProject === project.id
                      ? 'bg-primary-100 text-primary-800 border border-primary-200'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  <div className="font-medium truncate">{project.title}</div>
                  <div className="text-sm text-gray-500">
                    {project.teamSize} members
                  </div>
                </button>
              ))}
              {userProjects.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No projects yet</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card className="h-full flex flex-col">
            {selectedProject && selectedProjectData ? (
              <>
                <div className="border-b p-4">
                  <h3 className="font-semibold text-gray-900">{selectedProjectData.title}</h3>
                  <p className="text-sm text-gray-600">
                    {selectedProjectData.teamMembers.length + 1} members
                  </p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
                  {projectMessages.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    projectMessages.map(message => (
                      <div
                        key={message.id}
                        className={`flex ${
                          message.senderId === user?.id ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.senderId === user?.id
                              ? 'bg-primary-600 text-white'
                              : 'bg-gray-100 text-gray-900'
                          }`}
                        >
                          {message.senderId !== user?.id && (
                            <div className="text-xs font-medium mb-1 opacity-75">
                              {message.senderName}
                            </div>
                          )}
                          <div className="text-sm">{message.content}</div>
                          <div className="text-xs opacity-75 mt-1">
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form onSubmit={handleSendMessage} className="border-t p-4">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    />
                    <Button type="submit" disabled={!messageText.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Select a project to start chatting</p>
                  <p className="text-sm">Choose from your projects on the left</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Chat;