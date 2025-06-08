import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Users, Zap, Sparkles } from 'lucide-react';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-secondary-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%236366f1%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-secondary-400 to-accent-400 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-gradient-to-r from-accent-400 to-primary-400 rounded-full opacity-20 animate-pulse delay-2000"></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full opacity-20 animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
              <div className="relative flex items-center space-x-3 bg-white rounded-2xl px-6 py-4 shadow-2xl border border-gray-100">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-xl blur opacity-75"></div>
                  <div className="relative bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-xl">
                    <Code2 className="h-8 w-8 text-white" />
                  </div>
                </div>
                <span className="font-bold text-3xl bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent">
                  DevCollab
                </span>
                <Sparkles className="h-6 w-6 text-accent-500 animate-pulse" />
              </div>
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Where Developers
            <span className="block bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-600 bg-clip-text text-transparent animate-pulse">
              Collaborate
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Join a thriving community of developers. Form teams, work on exciting projects, 
            and build your portfolio with like-minded creators from around the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <Link to="/signup">
              <Button 
                size="lg" 
                className="text-lg px-10 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl transform hover:scale-105"
              >
                Get Started
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-10 py-4 border-2 border-gray-300 hover:border-primary-500 hover:bg-gradient-to-r hover:from-primary-50 hover:to-secondary-50 rounded-2xl transition-all duration-300 transform hover:scale-105"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <Users className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Find Your Team</h3>
                <p className="text-gray-600 leading-relaxed">
                  Connect with developers who complement your skills and share your passion for great projects.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-secondary-600 to-accent-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-secondary-100 to-accent-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <Code2 className="h-8 w-8 text-secondary-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Build Together</h3>
                <p className="text-gray-600 leading-relaxed">
                  Work on open source projects, freelance opportunities, or startup ideas with organized project management.
                </p>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity"></div>
              <div className="relative bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="bg-gradient-to-r from-accent-100 to-primary-100 rounded-2xl w-16 h-16 flex items-center justify-center mb-6 mx-auto">
                  <Zap className="h-8 w-8 text-accent-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Grow Your Career</h3>
                <p className="text-gray-600 leading-relaxed">
                  Showcase your work, learn new technologies, and advance your career through collaborative development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;