import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '@/services/api';
import { examDatabase } from '@/data/examData';

interface Certification {
  id: string;
  name: string;
  description: string;
  passing_score: number;
  duration_minutes: number;
  total_questions: number;
}

export const ProviderExamsPage: React.FC = () => {
  const { provider } = useParams<{ provider: string }>();
  const navigate = useNavigate();
  const [filteredCertifications, setFilteredCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCertifications = async () => {
      try {
        const response = await api.get('/certifications');
        const allCerts = response.data.data;

        // Filter by provider
        let filtered = allCerts;
        if (provider === 'Snowflake') {
          filtered = allCerts.filter((cert: Certification) => cert.name.includes('Snowflake') || cert.name.includes('SnowPro'));
        } else if (provider === 'Microsoft Azure') {
          filtered = allCerts.filter((cert: Certification) => cert.name.includes('Azure'));
        } else if (provider === 'Amazon AWS') {
          filtered = allCerts.filter((cert: Certification) => cert.name.includes('AWS'));
        } else if (provider === 'Google Cloud') {
          filtered = allCerts.filter((cert: Certification) => cert.name.includes('Google'));
        } else if (provider === 'Databricks') {
          filtered = allCerts.filter((cert: Certification) => cert.name.includes('Databricks'));
        }

        setFilteredCertifications(filtered);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };

    fetchCertifications();
  }, [provider]);

  const getProviderColor = (name: string): string => {
    if (name.includes('Azure')) return 'border-l-4 border-blue-500 bg-blue-50';
    if (name.includes('AWS')) return 'border-l-4 border-orange-500 bg-orange-50';
    if (name.includes('Google')) return 'border-l-4 border-red-500 bg-red-50';
    if (name.includes('Databricks')) return 'border-l-4 border-purple-500 bg-purple-50';
    if (name.includes('Snowflake') || name.includes('SnowPro')) return 'border-l-4 border-blue-400 bg-blue-50';
    return 'border-l-4 border-gray-500 bg-gray-50';
  };

  const getExamLevel = (name: string): string => {
    if (name.includes('Professional') || name.includes('Expert')) return 'Expert';
    if (name.includes('Associate')) return 'Associate';
    return 'Foundational';
  };

  const handleExamClick = (examName: string) => {
    const encodedName = encodeURIComponent(examName);
    navigate(`/exam/${encodedName}`);
  };

  const providerIcon: Record<string, string> = {
    'Snowflake': '❄️',
    'Microsoft Azure': '☁️',
    'Amazon AWS': '🔶',
    'Google Cloud': '🌐',
    'Databricks': '⚡',
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700 font-semibold mb-4 flex items-center gap-2"
          >
            ← Back to Providers
          </button>
          <div className="flex items-center gap-4 mb-2">
            <span className="text-4xl">{providerIcon[provider as string] || '📚'}</span>
            <h1 className="text-4xl font-bold text-gray-900">{provider}</h1>
          </div>
          <p className="text-lg text-gray-600">
            {filteredCertifications.length} certification{filteredCertifications.length !== 1 ? 's' : ''} available
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="text-gray-600 mt-4">Loading exams...</p>
          </div>
        )}

        {/* Exams Grid */}
        {!loading && filteredCertifications.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCertifications.map((exam) => {
              const hasStudyMaterial = Object.keys(examDatabase).some(
                (key) => key.toLowerCase() === exam.name.toLowerCase()
              );

              return (
                <button
                  key={exam.id}
                  onClick={() => handleExamClick(exam.name)}
                  className={`${getProviderColor(exam.name)} rounded-lg p-6 shadow-md hover:shadow-lg transition text-left cursor-pointer hover:scale-105 duration-200`}
                >
                  {/* Header */}
                  <div className="mb-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                        getExamLevel(exam.name) === 'Expert'
                          ? 'bg-red-100 text-red-800'
                          : getExamLevel(exam.name) === 'Associate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {getExamLevel(exam.name)}
                    </span>
                  </div>

                  {/* Exam Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{exam.name}</h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4">{exam.description}</p>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 gap-3 text-sm mb-4 border-t pt-4">
                    <div>
                      <span className="text-gray-500">Duration</span>
                      <p className="font-semibold text-gray-900">{exam.duration_minutes} min</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Questions</span>
                      <p className="font-semibold text-gray-900">{exam.total_questions}</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Pass Score</span>
                      <p className="font-semibold text-gray-900">{exam.passing_score}%</p>
                    </div>
                    <div>
                      <span className="text-gray-500">Study</span>
                      <p className="font-semibold text-gray-900">{hasStudyMaterial ? '✓' : '—'}</p>
                    </div>
                  </div>

                  {/* Action */}
                  <div className="text-primary-600 font-semibold text-sm flex items-center gap-2">
                    Start Exam <span>→</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredCertifications.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No exams found for {provider}</p>
            <button
              onClick={() => navigate('/dashboard')}
              className="text-primary-600 hover:text-primary-700 font-semibold mt-4"
            >
              Browse other providers
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
