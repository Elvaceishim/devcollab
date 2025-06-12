import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, User as UserIcon, LogOut, MessageSquare, FolderOpen, Users } from 'lucide-react';
import { useAuth, AuthContextType } from '../../contexts/AuthContext';
import type { User } from '@supabase/auth-js';


const Header: React.FC = () => {
  const { user, logout } = useAuth() as AuthContextType;
  const location = useLocation();
  // const { toggle } = useContext(ThemeContext);
  const isActive = (path: string) => location.pathname === path;

  if (!user) return null;

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-xl">
                <Code2 className="h-6 w-6 text-white" />
              </div>
            </div>
            <span className="font-bold text-2xl bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
              DevCollab
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-2">
            <Link
              to="/dashboard"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/dashboard')
                  ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <FolderOpen className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <Link
              to="/network"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/network')
                  ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <Users className="h-4 w-4" />
              <span>Network</span>
            </Link>
            <Link
              to="/chat"
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/chat')
                  ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Chat</span>
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link
              to="/profile"
              className={`flex items-center space-x-3 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/profile')
                  ? 'text-primary-600 bg-gradient-to-r from-primary-50 to-secondary-50 shadow-sm'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-gray-50'
              }`}
            >
              <div className="relative">
                <div className="h-8 w-8 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                  {'avatars' in user && user.avatars ? (
                    <img src={typeof user.avatars === 'string' ? user.avatars: ''} alt={user.email} className="h-8 w-8 rounded-full" />
                  ) : (
                    <UserIcon className="h-4 w-4 text-primary-600" />
                  )}
                </div>
              </div>
              <span className="hidden sm:block font-medium">{user.email}</span>
            </Link>
            <button
              onClick={logout}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 transition-all duration-200"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:block">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
// Define UserType according to your user object structure
// (Removed duplicate UserType and AuthContextType definitions, use the ones from '../../contexts/AuthContext')

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);

  // ...other logic

  const logout = () => {
    // Your logout logic here
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// Use the User type from @supabase/auth-js instead of redefining it// Add other user fields as needed
};