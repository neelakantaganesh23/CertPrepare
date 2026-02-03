import React from 'react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-600 to-primary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Master Your Certification Exams
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Interactive learning, practice tests, and real-time progress tracking
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-white text-primary-600 rounded-lg font-bold hover:bg-gray-100 transition">
              Get Started
            </button>
            <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-bold hover:bg-white hover:text-primary-600 transition">
              Learn More
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            {
              icon: '📚',
              title: 'Comprehensive Content',
              description: 'Thousands of questions covering all certification topics',
            },
            {
              icon: '🎯',
              title: 'Smart Analytics',
              description: 'Track your progress and identify weak areas',
            },
            {
              icon: '⚡',
              title: 'Adaptive Learning',
              description: 'Personalized practice paths based on your performance',
            },
          ].map((feature, idx) => (
            <div key={idx} className="bg-white bg-opacity-10 p-8 rounded-lg backdrop-blur">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
