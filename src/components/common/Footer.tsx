import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Code2, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-black/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-teal-500"></div>
      
      <div className="relative max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-2 rounded-xl">
                <Code2 className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                DevCollab
              </span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Empowering developers worldwide to collaborate, innovate, and build the future of technology together.
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span>by developers, for developers</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/about" className="block text-gray-300 hover:text-purple-300 transition-colors">
                About Us
              </Link>
              <Link to="/faq" className="block text-gray-300 hover:text-purple-300 transition-colors">
                FAQ
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-purple-300 transition-colors">
                Contact
              </Link>
              <Link to="/privacy" className="block text-gray-300 hover:text-purple-300 transition-colors">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              >
                <Github className="h-5 w-5 text-gray-300 group-hover:text-white" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              >
                <Twitter className="h-5 w-5 text-gray-300 group-hover:text-blue-400" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/10 p-3 rounded-xl hover:bg-white/20 transition-all duration-300 transform hover:scale-110"
              >
                <Linkedin className="h-5 w-5 text-gray-300 group-hover:text-blue-500" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 DevCollab. All rights reserved.
          </div>
          <div className="text-gray-400 text-sm">
            Building the future of developer collaboration
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;