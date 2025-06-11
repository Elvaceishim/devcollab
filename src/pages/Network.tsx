import React from 'react';
import { MapPin, Users, Star } from 'lucide-react';

const Network: React.FC = () => {
  const developers = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Full Stack Developer',
      location: 'San Francisco, CA',
      skills: ['React', 'Node.js', 'Python', 'AWS'],
      bio: 'Passionate about building scalable web applications and mentoring junior developers.',
      rating: 4.9,
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 2,
      name: 'Alex Rodriguez',
      title: 'Frontend Developer',
      location: 'New York, NY',
      skills: ['Vue.js', 'TypeScript', 'CSS', 'Design'],
      bio: 'UI/UX focused developer with a passion for creating beautiful user experiences.',
      rating: 4.8,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150'
    },
    {
      id: 3,
      name: 'Emily Johnson',
      title: 'Backend Developer',
      location: 'Austin, TX',
      skills: ['Java', 'Spring', 'PostgreSQL', 'Docker'],
      bio: 'Experienced in building robust backend systems and microservices architecture.',
      rating: 4.7,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-primary-50">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent mb-6">
            Developer Network
          </h1>
          <p className="text-xl text-gray-600">
            Connect with developers, share skills, and grow your professional network.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {developers.map((developer) => (
            <div
              key={developer.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={developer.avatar}
                    alt={developer.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{developer.name}</h3>
                    <p className="text-gray-600">{developer.title}</p>
                    <div className="flex items-center text-gray-500 text-sm mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{developer.location}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-sm font-medium text-gray-700">{developer.rating}</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {developer.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary-100 text-primary-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 text-sm mb-6 line-clamp-2">
                  {developer.bio}
                </p>

                <button className="w-full bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-2 px-4 rounded-lg hover:from-primary-700 hover:to-secondary-700 transition-colors">
                  Connect
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Network;