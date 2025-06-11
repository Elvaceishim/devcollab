import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Moon, Sun, Code2, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const toggleColorMode = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 p-2 rounded-xl">
                  <Code2 className="h-6 w-6 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                DevCollab
              </span>
              <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/about"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/about')
                  ? 'text-purple-600 bg-gradient-to-r from-purple-50 to-blue-50 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              About
            </Link>
            <Link
              to="/faq"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/faq')
                  ? 'text-purple-600 bg-gradient-to-r from-purple-50 to-blue-50 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                isActive('/contact')
                  ? 'text-purple-600 bg-gradient-to-r from-purple-50 to-blue-50 shadow-sm'
                  : 'text-gray-600 hover:text-purple-600 hover:bg-gray-50'
              }`}
            >
              Contact
            </Link>
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={toggleColorMode}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all duration-200"
            >
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  {user.email}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-xl text-sm font-medium hover:from-red-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-600 hover:text-purple-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl text-sm font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200">
            <Link
              to="/about"
              className="block px-3 py-2 rounded-xl text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            <Link
              to="/faq"
              className="block px-3 py-2 rounded-xl text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all"
              onClick={() => setIsOpen(false)}
            >
              FAQ
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 rounded-xl text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 rounded-xl text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleSignOut();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-xl text-base font-medium text-red-600 hover:text-red-900 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 transition-all"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-xl text-base font-medium text-gray-600 hover:text-purple-600 hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="block px-3 py-2 rounded-xl text-base font-medium bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;