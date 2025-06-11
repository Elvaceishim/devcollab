import React from 'react';
import { Link } from 'react-router-dom';
import { Code, Users, Rocket, Shield, ArrowRight, Sparkles, Star, Zap } from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Code Collaboration',
      description: 'Real-time code editing and collaboration with your team members.',
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Team Management',
      description: 'Organize your team, manage roles, and track progress efficiently.',
      gradient: 'from-green-500 to-teal-600'
    },
    {
      icon: Rocket,
      title: 'Fast Development',
      description: 'Streamlined workflow for faster development and deployment.',
      gradient: 'from-orange-500 to-red-600'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Enterprise-grade security with end-to-end encryption.',
      gradient: 'from-purple-500 to-pink-600'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section with Animated Gradient */}
      <div className="relative overflow-hidden hero-gradient">
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-white/10 rounded-full float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-white/10 rounded-full float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-white/10 rounded-full float" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Logo with glow effect */}
            <div className="flex justify-center mb-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-white rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity pulse-glow"></div>
                <div className="relative bg-white/20 backdrop-blur-sm p-4 rounded-2xl border border-white/30">
                  <div className="flex items-center space-x-3">
                    <div className="bg-gradient-to-r from-white to-gray-100 p-2 rounded-xl">
                      <Code className="h-8 w-8 text-purple-600" />
                    </div>
                    <span className="text-2xl font-bold text-white">DevCollab</span>
                    <Sparkles className="h-6 w-6 text-yellow-300 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Where Developers
              <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-blue-300 bg-clip-text text-transparent animate-pulse">
                Collaborate
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join a thriving community of developers. Form teams, work on exciting projects, 
              and build your portfolio with like-minded creators from around the world.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
              <Link
                to="/register"
                className="group relative overflow-hidden bg-white text-purple-600 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center">
                  Get Started
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <Link
                to="/about"
                className="group bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-2xl text-lg font-bold border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </Link>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">10K+</div>
                <div className="text-white/80">Active Developers</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">5K+</div>
                <div className="text-white/80">Projects Created</div>
              </div>
              <div className="glass rounded-2xl p-6 text-center">
                <div className="text-3xl font-bold text-white mb-2">50+</div>
                <div className="text-white/80">Countries</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full px-6 py-2 mb-6">
              <Star className="h-5 w-5 text-purple-600" />
              <span className="text-purple-800 font-semibold">Why Choose DevCollab?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-blue-800 bg-clip-text text-transparent mb-6">
              Built for Modern Teams
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform is designed to make collaboration seamless and efficient
              for development teams of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100"
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                  
                  <div className="relative z-10">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full float"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full float" style={{ animationDelay: '3s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-6 py-2 mb-8">
            <Zap className="h-5 w-5 text-yellow-300" />
            <span className="text-white font-semibold">Ready to Start?</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Future of
            <span className="block bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent">
              Developer Collaboration
            </span>
          </h2>
          
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto">
            Join thousands of developers who are already using DevCollab to build
            amazing software together. Start your journey today.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/register"
              className="group bg-white text-purple-600 px-10 py-4 rounded-2xl text-lg font-bold hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <span className="flex items-center justify-center">
                Start Building Today
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/projects"
              className="bg-white/20 backdrop-blur-sm text-white px-10 py-4 rounded-2xl text-lg font-bold border-2 border-white/30 hover:bg-white/30 transition-all duration-300 transform hover:scale-105"
            >
              Explore Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;