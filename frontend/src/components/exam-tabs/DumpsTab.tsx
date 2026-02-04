import React, { useState, useMemo } from 'react';

interface ExamData {
  dumps?: Array<{
    id: number;
    question: string;
    options: string[];
    correct_answer: string;
    explanation?: string;
  }>;
}

interface DumpsTabProps {
  exam?: ExamData;
}

export const DumpsTab: React.FC<DumpsTabProps> = ({ exam }) => {
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  // Use exam dumps if available
  const dumpQuestions = useMemo(() => {
    if (exam?.dumps) {
      return exam.dumps;
    }
    return [];
  }, [exam]);

  const paginatedQuestions = useMemo(() => {
    const startIdx = (page - 1) * itemsPerPage;
    return dumpQuestions.slice(startIdx, startIdx + itemsPerPage);
  }, [dumpQuestions, page]);

  const totalPages = Math.ceil(dumpQuestions.length / itemsPerPage);

  if (dumpQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
          <span className="text-3xl">📄</span>
        </div>
        <p className="text-gray-600 text-lg font-semibold">No exam dumps available yet</p>
        <p className="text-gray-500 text-sm mt-2">Dumps from certified professionals will be added soon</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Exam Dumps</h2>
        <p className="text-gray-600">Real exam questions from certified professionals</p>
      </div>

      {/* Questions */}
      <div className="space-y-6">
        {paginatedQuestions.map((question, idx) => (
          <div key={question.id} className="bg-white rounded-lg shadow-md p-6 pb-6 border-b last:border-b-0">
            <p className="text-sm font-semibold text-primary-600 mb-2">Question {(page - 1) * itemsPerPage + idx + 1}</p>
            <p className="font-semibold text-gray-900 mb-4">{question.question}</p>
            
            {/* Options */}
            <div className="space-y-2 mb-4 bg-gray-50 p-4 rounded-lg">
              {question.options.map((option, optIdx) => (
                <p key={optIdx} className="text-sm text-gray-700">
                  <span className="font-semibold">{String.fromCharCode(65 + optIdx)}.</span> {option}
                </p>
              ))}
            </div>
            
            {/* Correct Answer */}
            <div className="bg-green-50 p-4 rounded-lg mb-3 border-l-4 border-green-500">
              <p className="text-sm font-semibold text-green-900">Correct Answer:</p>
              <p className="text-sm text-green-800 mt-1">{question.correct_answer}</p>
            </div>

            {/* Explanation */}
            {question.explanation && (
              <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                <p className="text-sm font-semibold text-blue-900 mb-1">Explanation:</p>
                <p className="text-sm text-blue-800">{question.explanation}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setPage(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            ← Previous
          </button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-3 py-2 rounded-lg font-semibold transition ${
                  page === p
                    ? 'bg-primary-600 text-white'
                    : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next →
          </button>
        </div>
      )}

      {/* Note */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg">
        <h3 className="font-bold text-yellow-900 mb-2">📌 About Exam Dumps</h3>
        <p className="text-yellow-800 text-sm">
          Exam dumps are real questions from people who have passed the certification. 
          They help you understand the exam format and types of questions you'll encounter. 
          However, questions may vary across exam versions and regions.
        </p>
      </div>
    </div>
  );
};
