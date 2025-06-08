import React, { useState } from 'react';
import { Github, ExternalLink, Star, GitFork, Calendar, Loader2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import Card from '../common/Card';

const GitHubIntegration: React.FC = () => {
  const { user, syncGitHubRepos, updateProfile } = useAuth();
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const handleConnectGitHub = async () => {
    setConnecting(true);
    
    // Simulate OAuth flow
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock GitHub username prompt
    const githubUsername = prompt('Enter your GitHub username:');
    if (githubUsername) {
      updateProfile({ github: githubUsername });
      await syncGitHubRepos();
    }
    
    setConnecting(false);
  };

  const handleSyncRepos = async () => {
    setSyncing(true);
    await syncGitHubRepos();
    setSyncing(false);
  };

  const isConnected = user?.github;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gray-900 rounded-lg">
            <Github className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">GitHub Integration</h3>
            <p className="text-sm text-gray-600">
              {isConnected ? 'Connected to GitHub' : 'Connect your GitHub account'}
            </p>
          </div>
        </div>
        
        {isConnected ? (
          <Button
            onClick={handleSyncRepos}
            loading={syncing}
            variant="outline"
            size="sm"
          >
            {syncing ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
            Sync Repos
          </Button>
        ) : (
          <Button
            onClick={handleConnectGitHub}
            loading={connecting}
            className="bg-gray-900 hover:bg-gray-800"
          >
            {connecting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Github className="h-4 w-4 mr-2" />}
            Connect GitHub
          </Button>
        )}
      </div>

      {isConnected ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium text-green-800">
                Connected as @{user.github}
              </span>
            </div>
            <a
              href={`https://github.com/${user.github}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          {user.githubRepos && user.githubRepos.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-medium text-gray-900">Recent Repositories</h4>
              {user.githubRepos.map(repo => (
                <div key={repo.id} className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-medium text-gray-900">{repo.name}</h5>
                      <p className="text-sm text-gray-600 mt-1">{repo.description}</p>
                    </div>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span className="flex items-center space-x-1">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span>{repo.language}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Star className="h-3 w-3" />
                        <span>{repo.stars}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <GitFork className="h-3 w-3" />
                        <span>{repo.forks}</span>
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Updated {new Date(repo.lastUpdated).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              <Github className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No repositories synced yet</p>
              <Button
                onClick={handleSyncRepos}
                loading={syncing}
                variant="outline"
                size="sm"
                className="mt-2"
              >
                Sync Now
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Github className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">Connect Your GitHub</h4>
          <p className="text-gray-600 mb-4">
            Automatically sync your repositories and showcase your work to potential collaborators.
          </p>
          <ul className="text-sm text-gray-500 space-y-1 mb-6">
            <li>• Showcase your best repositories</li>
            <li>• Auto-sync project data</li>
            <li>• Display contribution stats</li>
            <li>• Link projects to repositories</li>
          </ul>
        </div>
      )}
    </Card>
  );
};

export default GitHubIntegration;