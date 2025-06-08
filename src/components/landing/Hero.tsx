import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code2, Users, Zap } from 'lucide-react';
import Button from '../common/Button';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%236366f1%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2 bg-white rounded-full px-4 py-2 shadow-lg border border-gray-100">
              <Code2 className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-2xl text-gray-900">DevCollab</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Where Developers
            <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent"> Collaborate</span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Join a thriving community of developers. Form teams, work on exciting projects, 
            and build your portfolio with like-minded creators from around the world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-8 py-4">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                Sign In
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-primary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Your Team</h3>
              <p className="text-gray-600">
                Connect with developers who complement your skills and share your passion for great projects.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-secondary-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Code2 className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Together</h3>
              <p className="text-gray-600">
                Work on open source projects, freelance opportunities, or startup ideas with organized project management.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-accent-100 rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <Zap className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Grow Your Career</h3>
              <p className="text-gray-600">
                Showcase your work, learn new technologies, and advance your career through collaborative development.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;