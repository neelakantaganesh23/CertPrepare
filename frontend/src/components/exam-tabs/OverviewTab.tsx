import React from 'react';

interface ExamOverview {
  examVersion: string;
  totalQuestions: number;
  duration: number; // in minutes
  passingScore: string; // e.g., "750+"
  domains: Array<{
    name: string;
    percentage: number;
  }>;
  prerequisites?: string[];
  deliveryOptions?: string[];
  recommendedTraining?: string;
}

interface ExamData {
  overview?: ExamOverview;
}

interface OverviewTabProps {
  certification: {
    name: string;
    description?: string;
    passing_score: number;
    duration_minutes: number;
    total_questions: number;
  };
  exam?: ExamData;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ certification, exam }) => {
  const overview = exam?.overview || {
    examVersion: 'Professional Certification',
    totalQuestions: certification.total_questions,
    duration: certification.duration_minutes,
    passingScore: `${certification.passing_score}%`,
    domains: [],
  };

  return (
    <div className="space-y-8">
      {/* Overview Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{certification.name}</h2>
        <p className="text-gray-600">{certification.description}</p>
        {overview.examVersion && (
          <p className="text-sm text-gray-500 mt-2">Exam Version: <span className="font-semibold">{overview.examVersion}</span></p>
        )}
      </div>

      {/* Key Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Questions */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Total Questions</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{overview.totalQuestions}</p>
            </div>
            <div className="text-4xl">❓</div>
          </div>
        </div>

        {/* Duration */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Duration</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{overview.duration} min</p>
            </div>
            <div className="text-4xl">⏱️</div>
          </div>
        </div>

        {/* Passing Score */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Passing Score</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">{overview.passingScore}</p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        {/* Exam Type */}
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-semibold">Exam Type</p>
              <p className="text-3xl font-bold text-gray-900 mt-2">Multiple Choice</p>
            </div>
            <div className="text-4xl">📋</div>
          </div>
        </div>
      </div>

      {/* Domain Breakdown - Only if domains are provided */}
      {overview.domains && overview.domains.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Exam Domains Breakdown</h3>
          <div className="space-y-4">
            {overview.domains.map((domain, idx) => (
              <div key={idx}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{domain.name}</span>
                  <span className="font-bold text-blue-600">{domain.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all duration-300"
                    style={{ width: `${domain.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Exam Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* About Exam */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">About This Exam</h3>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">•</span>
              <span>Comprehensive assessment of core competencies and skills</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">•</span>
              <span>Covers all major topics and domains in the certification path</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">•</span>
              <span>Industry-recognized and valued by employers</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-3 mt-1">•</span>
              <span>Valid for professional development and career advancement</span>
            </li>
          </ul>
        </div>

        {/* How to Prepare */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">How to Prepare</h3>
          <ol className="space-y-4 text-gray-600">
            <li className="flex">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold text-sm">1</span>
              <span>Review study materials and documentation</span>
            </li>
            <li className="flex">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold text-sm">2</span>
              <span>Complete practice quizzes to assess knowledge</span>
            </li>
            <li className="flex">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold text-sm">3</span>
              <span>Study exam dumps from certified professionals</span>
            </li>
            <li className="flex">
              <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0 font-semibold text-sm">4</span>
              <span>Take full-length mock exams under timed conditions</span>
            </li>
          </ol>
        </div>
      </div>

      {/* Prerequisites and Requirements */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Prerequisites & Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Prerequisites</h4>
            <ul className="space-y-2 text-gray-600">
              {overview.prerequisites && overview.prerequisites.length > 0 ? (
                overview.prerequisites.map((prereq, idx) => (
                  <li key={idx}>✓ {prereq}</li>
                ))
              ) : (
                <>
                  <li>✓ Basic understanding of platform concepts</li>
                  <li>✓ Practical hands-on experience (varies by certification)</li>
                  <li>✓ Recommended: 6-12 months of professional experience</li>
                </>
              )}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Delivery Options</h4>
            <ul className="space-y-2 text-gray-600">
              {overview.deliveryOptions && overview.deliveryOptions.length > 0 ? (
                overview.deliveryOptions.map((option, idx) => (
                  <li key={idx}>✓ {option}</li>
                ))
              ) : (
                <>
                  <li>✓ Online Proctoring</li>
                  <li>✓ Onsite Testing Centers</li>
                  <li>✓ Available in multiple languages</li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg p-8 text-white">
        <h3 className="text-xl font-bold mb-4">Quick Stats</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold">28</p>
            <p className="text-indigo-100 text-sm">Quiz Questions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">13</p>
            <p className="text-indigo-100 text-sm">Study Materials</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">21</p>
            <p className="text-indigo-100 text-sm">Dump Questions</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">4</p>
            <p className="text-indigo-100 text-sm">Mock Exams</p>
          </div>
        </div>
      </div>
    </div>
  );
};
