import React from 'react';

export const HomePage: React.FC = () => {
  const certificationProviders = [
    {
      name: 'Microsoft Azure',
      icon: '☁️',
      exams: 12,
      color: 'bg-blue-100 text-blue-700',
      description: 'Cloud fundamentals to expert architecture',
    },
    {
      name: 'Amazon AWS',
      icon: '🔶',
      exams: 10,
      color: 'bg-orange-100 text-orange-700',
      description: 'Foundational to professional-level certifications',
    },
    {
      name: 'Google Cloud',
      icon: '🌐',
      exams: 9,
      color: 'bg-red-100 text-red-700',
      description: 'Data engineering to cloud architecture',
    },
    {
      name: 'Databricks',
      icon: '⚡',
      exams: 6,
      color: 'bg-purple-100 text-purple-700',
      description: 'Spark, data engineering, and AI expertise',
    },
  ];

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 mb-16">
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

        {/* Certification Providers Section */}
        <div className="mt-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Certification Providers & Tracks
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certificationProviders.map((provider, idx) => (
              <div
                key={idx}
                className="bg-white bg-opacity-10 backdrop-blur rounded-lg p-6 hover:bg-opacity-20 transition"
              >
                <div className="text-5xl mb-4">{provider.icon}</div>
                <h3 className="text-xl font-bold mb-1">{provider.name}</h3>
                <p className="text-sm opacity-75 mb-3">{provider.description}</p>
                <div className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                  {provider.exams}+ Exams
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certification Paths Section */}
        <div className="mt-20 bg-white bg-opacity-10 backdrop-blur rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-8">Popular Certification Paths</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-xl font-bold mb-2">☁️ Cloud Architecture</h3>
              <p className="opacity-90 text-sm">
                AWS Solutions Architect Associate → Professional<br/>
                Azure Administrator → Solutions Architect<br/>
                GCP Cloud Architect
              </p>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-xl font-bold mb-2">📊 Data Engineering</h3>
              <p className="opacity-90 text-sm">
                AWS Data Engineer Associate<br/>
                Azure Data Engineer (DP-203)<br/>
                GCP Professional Data Engineer + Databricks
              </p>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-xl font-bold mb-2">🤖 AI & Machine Learning</h3>
              <p className="opacity-90 text-sm">
                Azure AI Engineer + Data Scientist<br/>
                GCP Machine Learning Engineer<br/>
                Databricks Generative AI Engineer
              </p>
            </div>
            <div className="border-l-4 border-white pl-6">
              <h3 className="text-xl font-bold mb-2">🔧 DevOps & Development</h3>
              <p className="opacity-90 text-sm">
                AWS DevOps Engineer Professional<br/>
                Azure Developer + DevOps Engineer<br/>
                Infrastructure & CI/CD expertise
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
