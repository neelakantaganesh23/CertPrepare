import React, { useMemo } from 'react';

interface MockTest {
  id: number;
  name: string;
  questionsCount: number;
  duration: number; // in minutes
}

interface ExamData {
  mockTests?: MockTest[];
}

interface MocksTabProps {
  exam?: ExamData;
}

export const MocksTab: React.FC<MocksTabProps> = ({ exam }) => {
  const mockTests = useMemo(() => {
    return exam?.mockTests || [];
  }, [exam]);

  if (mockTests.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg font-semibold">No mock exams available yet.</p>
        <p className="text-gray-500 text-sm mt-2">Check back soon for full-length mock exams.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Full-Length Mock Exams</h2>
        <p className="text-gray-600">Simulate real exam conditions with timed full-length exams</p>
      </div>

      {/* Mock Exams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockTests.map((mock) => (
          <div key={mock.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition border-t-4 border-blue-600">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{mock.name}</h3>
              </div>
              <span className="text-3xl">🎯</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="text-center bg-blue-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-blue-600">{mock.duration}</p>
                <p className="text-xs text-gray-600 mt-1">Minutes</p>
              </div>
              <div className="text-center bg-purple-50 rounded-lg p-4">
                <p className="text-3xl font-bold text-purple-600">{mock.questionsCount}</p>
                <p className="text-xs text-gray-600 mt-1">Questions</p>
              </div>
            </div>

            <button
              onClick={() => alert(`Starting ${mock.name}. Mock exam functionality coming soon!`)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Start Exam
            </button>
          </div>
        ))}
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-lg">
        <h3 className="font-bold text-blue-900 mb-3">💡 Mock Exam Tips</h3>
        <ul className="text-blue-800 text-sm space-y-2">
          <li>• Find a quiet place to ensure uninterrupted exam time</li>
          <li>• Take the exam in one sitting without breaks</li>
          <li>• Use this as a final assessment before the real exam</li>
          <li>• Review your weak areas after completing the exam</li>
        </ul>
      </div>
    </div>
  );
};
