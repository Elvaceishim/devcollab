import React from 'react';
import { Code, Users, Rocket, Shield } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Code,
      title: 'Developer-First Platform',
      description: 'Built by developers, for developers. Our platform understands the unique needs of software development teams.'
    },
    {
      icon: Users,
      title: 'Collaborative Workspace',
      description: 'Seamlessly collaborate with your team members in real-time, share code, and manage projects efficiently.'
    },
    {
      icon: Rocket,
      title: 'Fast & Efficient',
      description: 'Optimized for performance, ensuring your development workflow remains smooth and uninterrupted.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security with end-to-end encryption and regular security audits.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About DevCollab
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            DevCollab is a modern developer workspace platform designed to streamline collaboration
            and enhance productivity for development teams.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Icon className="h-10 w-10 text-primary-600 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <div className="space-y-4 text-lg text-gray-600">
            <p>
              At DevCollab, we're on a mission to revolutionize how development teams collaborate.
              We believe that great software is built through effective collaboration, and we're
              committed to providing the tools that make this possible.
            </p>
            <p>
              Our platform combines powerful features with an intuitive interface, making it
              easier than ever for teams to work together, share knowledge, and deliver
              exceptional software.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;