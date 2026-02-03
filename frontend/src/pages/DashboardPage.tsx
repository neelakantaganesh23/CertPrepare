import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/stores/authStore';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  if (!user) {
    navigate('/login');
    return null;
  }

  const providers = [
    {
      name: 'AWS Solutions Architect',
      provider: 'AWS',
      description: 'Professional certification for AWS',
      icon: '☁️',
    },
    {
      name: 'Azure Administrator',
      provider: 'Azure',
      description: 'Microsoft Azure administration',
      icon: '🔵',
    },
    {
      name: 'PMP Certification',
      provider: 'PMP',
      description: 'Project Management Professional',
      icon: '📊',
    },
    {
      name: 'Kubernetes (CKAD)',
      provider: 'Kubernetes',
      description: 'Kubernetes Application Developer',
      icon: '🐳',
    },
    {
      name: 'CompTIA Security+',
      provider: 'CompTIA',
      description: 'Security+ IT Security',
      icon: '🔒',
    },
    {
      name: 'Google Cloud Associate',
      provider: 'Google Cloud',
      description: 'Google Cloud Platform Associate',
      icon: '🟡',
    },
    // Snowflake Foundation Level
    {
      name: 'SnowPro Core (COF-C02)',
      provider: 'Snowflake',
      description: 'Foundation Level - Understanding Snowflake architecture, data loading, and account management',
      icon: '❄️',
      level: 'Foundation',
    },
    // Snowflake Advanced Role-Based
    {
      name: 'SnowPro Advanced: Data Engineer (DEA-C01)',
      provider: 'Snowflake',
      description: 'Build data pipelines, ETL/ELT, data modeling, and query optimization for engineering workloads',
      icon: '❄️',
      level: 'Advanced',
    },
    {
      name: 'SnowPro Advanced: Data Scientist (DSA-C01)',
      provider: 'Snowflake',
      description: 'Machine learning workflows, feature engineering, model training using Snowpark and SQL',
      icon: '❄️',
      level: 'Advanced',
    },
    {
      name: 'SnowPro Advanced: Architect (ARA-C01)',
      provider: 'Snowflake',
      description: 'Design end-to-end solutions with cross-account replication and security compliance strategies',
      icon: '❄️',
      level: 'Advanced',
    },
    {
      name: 'SnowPro Advanced: Administrator (ADA-C01)',
      provider: 'Snowflake',
      description: 'Manage costs, RBAC, governance, and monitor usage credits for operations',
      icon: '❄️',
      level: 'Advanced',
    },
    {
      name: 'SnowPro Advanced: Data Analyst (DA-C01)',
      provider: 'Snowflake',
      description: 'Advanced SQL analytics, data visualization integration, and descriptive statistics',
      icon: '❄️',
      level: 'Advanced',
    },
    // Snowflake Specialty
    {
      name: 'SnowPro Specialty: Gen AI',
      provider: 'Snowflake',
      description: 'LLMs, Cortex, and generative workflows within Snowflake',
      icon: '❄️',
      level: 'Specialty',
    },
    {
      name: 'SnowPro Specialty: Snowpark',
      provider: 'Snowflake',
      description: 'Using Python/Java/Scala inside Snowflake for advanced programming',
      icon: '❄️',
      level: 'Specialty',
    },
    {
      name: 'SnowPro Specialty: Native Apps',
      provider: 'Snowflake',
      description: 'Building and monetizing applications on the Snowflake Marketplace',
      icon: '❄️',
      level: 'Specialty',
    },
  ];

  // Get unique providers
  const uniqueProviders = Array.from(new Map(
    providers.map(cert => [cert.provider, cert])
  ).values());

  // Get certifications for selected provider
  const certsByProvider = selectedProvider
    ? providers.filter(cert => cert.provider === selectedProvider)
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header with back button */}
        {selectedProvider ? (
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setSelectedProvider(null)}
              className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-semibold transition"
            >
              <span>←</span>
              Back to Home
            </button>
          </div>
        ) : null}

        <h1 className="text-4xl font-bold mb-2">
          {selectedProvider ? `${selectedProvider} Certifications` : `Welcome, ${user.first_name || user.email}!`}
        </h1>
        <p className="text-gray-600 mb-8">
          {selectedProvider 
            ? `Explore all certifications from ${selectedProvider}`
            : 'Select a certification to begin your preparation journey'
          }
        </p>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(selectedProvider ? certsByProvider : uniqueProviders).map((cert, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
              onClick={() => {
                if (!selectedProvider) {
                  setSelectedProvider(cert.provider);
                } else {
                  navigate(`/exam/${encodeURIComponent(cert.name)}`);
                }
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{cert.icon}</div>
                {cert.level && (
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                    cert.level === 'Foundation' ? 'bg-green-100 text-green-800' :
                    cert.level === 'Advanced' ? 'bg-orange-100 text-orange-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {cert.level}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{cert.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{cert.description}</p>
              <button className="text-primary-600 font-semibold hover:text-primary-700">
                {selectedProvider ? 'Start →' : 'View →'}
              </button>
            </div>
          ))}
        </div>

        {/* Stats Section - Only show on home view */}
        {!selectedProvider && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Exams Taken', value: '0' },
              { label: 'Average Score', value: '-' },
              { label: 'Study Streak', value: '0 days' },
            ].map((stat, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
                <p className="text-3xl font-bold text-primary-600">{stat.value}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
