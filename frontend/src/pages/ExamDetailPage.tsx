import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { examDatabase } from '@/data/examData';
import { OverviewTab } from '@/components/exam-tabs/OverviewTab';
import { StudyMaterialsTab } from '@/components/exam-tabs/StudyMaterialsTab';
import { QuizTab } from '@/components/exam-tabs/QuizTab';
import { DumpsTab } from '@/components/exam-tabs/DumpsTab';
import { MocksTab } from '@/components/exam-tabs/MocksTab';
import api from '@/services/api';

export const ExamDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { examName } = useParams<{ examName: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'study-materials' | 'quiz' | 'dumps' | 'mocks'>('overview');
  const [certificationId, setCertificationId] = useState<string | null>(null);
  const [loadingCert, setLoadingCert] = useState(true);

  const decodedExamName = examName ? decodeURIComponent(examName) : '';
  const exam = examDatabase[decodedExamName];

  // Get provider from exam data
  const provider = exam?.provider;

  // Get or create certification record
  useEffect(() => {
    const fetchOrCreateCertification = async () => {
      try {
        // First try to find existing certification
        const response = await api.get(`/certifications?name=${encodeURIComponent(decodedExamName)}`);
        const certs = response.data.data || [];
        if (certs.length > 0) {
          setCertificationId(certs[0].id);
        } else {
          // Create new certification
          const createResponse = await api.post('/certifications', {
            name: decodedExamName,
            description: exam?.description || '',
            passing_score: 70,
            duration_minutes: 120,
            total_questions: exam?.quizzes?.length || 50,
          });
          setCertificationId(createResponse.data.data.id);
        }
      } catch (error) {
        console.error('Failed to load certification:', error);
        // Use exam name as a temporary ID if API call fails
        setCertificationId(btoa(decodedExamName));
      } finally {
        setLoadingCert(false);
      }
    };

    if (decodedExamName) {
      fetchOrCreateCertification();
    }
  }, [decodedExamName]);


  if (!exam) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Exam not found</h1>
          <button
            onClick={() => navigate('/dashboard')}
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (loadingCert) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate(provider ? `/exams/${provider}` : '/dashboard')}
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
          >
            <span>←</span>
            <span>Back to Exams</span>
          </button>
          <h1 className="text-4xl font-bold mb-2">{exam.name}</h1>
          <p className="text-primary-100">{exam.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: '📊' },
              { id: 'study-materials', label: 'Study Materials', icon: '📚' },
              { id: 'quiz', label: 'Quiz', icon: '✏️' },
              { id: 'dumps', label: 'Dumps', icon: '📝' },
              { id: 'mocks', label: 'Mock Exams', icon: '🎯' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as typeof activeTab);
                }}
                className={`py-4 px-2 font-semibold border-b-2 transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && certificationId && (
          <OverviewTab
            certification={{
              name: exam?.name || '',
              description: exam?.description || '',
              passing_score: 70,
              duration_minutes: 120,
              total_questions: exam?.quizzes?.length || 50,
            }}
          />
        )}

        {/* Study Materials Tab */}
        {activeTab === 'study-materials' && certificationId && (
          <StudyMaterialsTab exam={exam} />
        )}

        {/* Quiz Tab */}
        {activeTab === 'quiz' && certificationId && (
          <QuizTab exam={exam} />
        )}

        {/* Dumps Tab */}
        {activeTab === 'dumps' && certificationId && (
          <DumpsTab exam={exam} />
        )}

        {/* Mocks Tab */}
        {activeTab === 'mocks' && certificationId && (
          <MocksTab exam={exam} />
        )}
      </div>
    </div>
  );
};

