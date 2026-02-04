import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export const CertificationProvidersPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const providers = [
    {
      name: 'Snowflake',
      icon: '❄️',
      color: 'from-blue-600 to-blue-800',
      description: 'Data Cloud Certifications',
      exams: 11,
    },
    {
      name: 'Microsoft Azure',
      icon: '☁️',
      color: 'from-blue-600 to-blue-700',
      description: 'Cloud Infrastructure & Services',
      exams: 11,
    },
    {
      name: 'Amazon AWS',
      icon: '🔶',
      color: 'from-orange-600 to-orange-800',
      description: 'Cloud Computing Platform',
      exams: 10,
    },
    {
      name: 'Google Cloud',
      icon: '🌐',
      color: 'from-red-600 to-red-800',
      description: 'Cloud Data & AI Platform',
      exams: 9,
    },
    {
      name: 'Databricks',
      icon: '⚡',
      color: 'from-purple-600 to-purple-800',
      description: 'Data Engineering & AI',
      exams: 6,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Welcome Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.first_name || 'User'}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Choose a certification provider to start your exam preparation
          </p>
        </div>

        {/* Provider Tiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {providers.map((provider, idx) => (
            <button
              key={idx}
              onClick={() => navigate(`/exams/${provider.name}`)}
              className={`bg-gradient-to-br ${provider.color} text-white rounded-lg p-8 shadow-lg hover:shadow-2xl hover:scale-105 transition duration-200 cursor-pointer text-left`}
            >
              <div className="text-5xl mb-4">{provider.icon}</div>
              <h2 className="text-2xl font-bold mb-2">{provider.name}</h2>
              <p className="mb-4 opacity-90">{provider.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold bg-white bg-opacity-20 px-3 py-1 rounded-full">
                  {provider.exams}+ Exams
                </span>
                <span className="text-2xl">→</span>
              </div>
            </button>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 bg-white rounded-lg p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Learning Journey</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-primary-600">48+</p>
              <p className="text-gray-600">Total Certifications</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">5</p>
              <p className="text-gray-600">Providers</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">500+</p>
              <p className="text-gray-600">Practice Questions</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">24/7</p>
              <p className="text-gray-600">Access</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
