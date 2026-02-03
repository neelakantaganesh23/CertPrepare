import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { examDatabase } from '@/data/examData';

export const ExamDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { examName } = useParams<{ examName: string }>();
  const [activeTab, setActiveTab] = useState<'overview' | 'quizzes' | 'dumps' | 'materials' | 'mocks'>('overview');
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [quizStats, setQuizStats] = useState({ correct: 0, total: 0 });

  const decodedExamName = examName ? decodeURIComponent(examName) : '';
  const exam = examDatabase[decodedExamName];

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

  const currentQuiz = exam.quizzes[currentQuizIndex];
  const isAnswered = selectedAnswer !== null;

  const handleAnswerSelect = (answer: string) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setShowExplanation(true);
      if (answer === currentQuiz.correct_answer) {
        setQuizStats((prev) => ({
          ...prev,
          correct: prev.correct + 1,
          total: prev.total + 1,
        }));
      } else {
        setQuizStats((prev) => ({
          ...prev,
          total: prev.total + 1,
        }));
      }
    }
  };

  const handleNextQuestion = () => {
    if (currentQuizIndex < exam.quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuizIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setQuizStats({ correct: 0, total: 0 });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-primary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 mb-4 hover:opacity-80 transition"
          >
            <span>←</span>
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-4xl font-bold mb-2">{exam.name}</h1>
          <p className="text-primary-100">{exam.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex gap-8 overflow-x-auto">
            {['overview', 'quizzes', 'dumps', 'materials', 'mocks'].map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab as typeof activeTab);
                  resetQuiz();
                }}
                className={`py-4 px-2 font-semibold border-b-2 transition whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'dumps' && exam.dumps && ` (${exam.dumps.length})`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold mb-2">Study Materials</h3>
              <p className="text-gray-600 mb-4">{exam.learningMaterials.length} resources</p>
              <button
                onClick={() => setActiveTab('materials')}
                className="text-primary-600 font-semibold hover:text-primary-700"
              >
                Explore →
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">✏️</div>
              <h3 className="text-xl font-bold mb-2">Practice Quizzes</h3>
              <p className="text-gray-600 mb-4">{exam.quizzes.length} questions</p>
              <button
                onClick={() => setActiveTab('quizzes')}
                className="text-primary-600 font-semibold hover:text-primary-700"
              >
                Start →
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Mock Tests</h3>
              <p className="text-gray-600 mb-4">{exam.mockTests.length} full tests</p>
              <button
                onClick={() => setActiveTab('mocks')}
                className="text-primary-600 font-semibold hover:text-primary-700"
              >
                Take Test →
              </button>
            </div>
          </div>
        )}

        {/* Quizzes Tab */}
        {activeTab === 'quizzes' && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">
                  Question {currentQuizIndex + 1} of {exam.quizzes.length}
                </h2>
                <span className="text-sm text-gray-600">
                  Category: <span className="font-semibold">{currentQuiz.category}</span>
                </span>
              </div>

              {quizStats.total > 0 && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                  <p className="text-sm">
                    Score: <span className="font-bold text-primary-600">{quizStats.correct}/{quizStats.total}</span>
                  </p>
                </div>
              )}

              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentQuizIndex + 1) / exam.quizzes.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-6">{currentQuiz.question}</h3>

            <div className="space-y-3 mb-6">
              {currentQuiz.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleAnswerSelect(option)}
                  disabled={isAnswered}
                  className={`w-full p-4 text-left rounded-lg border-2 transition ${
                    !isAnswered
                      ? 'border-gray-200 hover:border-primary-600 cursor-pointer'
                      : option === currentQuiz.correct_answer
                      ? 'border-green-500 bg-green-50'
                      : option === selectedAnswer
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                  } ${isAnswered ? 'cursor-not-allowed' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {isAnswered && option === currentQuiz.correct_answer && (
                      <span className="text-green-600 font-bold">✓</span>
                    )}
                    {isAnswered && option === selectedAnswer && option !== currentQuiz.correct_answer && (
                      <span className="text-red-600 font-bold">✗</span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showExplanation && (
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <h4 className="font-bold text-blue-900 mb-2">Explanation</h4>
                <p className="text-blue-800">{currentQuiz.explanation}</p>
                {selectedAnswer === currentQuiz.correct_answer && (
                  <p className="text-green-700 font-semibold mt-2">✓ Correct!</p>
                )}
                {selectedAnswer !== currentQuiz.correct_answer && (
                  <p className="text-red-700 font-semibold mt-2">✗ Incorrect. The correct answer is: {currentQuiz.correct_answer}</p>
                )}
              </div>
            )}

            <div className="flex justify-between items-center">
              <button
                onClick={handlePrevQuestion}
                disabled={currentQuizIndex === 0}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold disabled:opacity-50 hover:bg-gray-300 transition"
              >
                ← Previous
              </button>

              <button
                onClick={resetQuiz}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Reset Quiz
              </button>

              <button
                onClick={handleNextQuestion}
                disabled={!isAnswered || currentQuizIndex === exam.quizzes.length - 1}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold disabled:opacity-50 hover:bg-primary-700 transition"
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Dumps Tab */}
        {activeTab === 'dumps' && exam.dumps && (
          <div className="bg-white p-8 rounded-lg shadow-md">
            {exam.dumps.length > 0 ? (
              <div className="space-y-6">
                {exam.dumps.map((dump, idx) => (
                  <div key={idx} className="border border-gray-300 rounded-lg p-6 hover:shadow-md transition">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">{dump.question}</h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      {dump.options.map((option, optIdx) => (
                        <div key={optIdx} className="flex items-start gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50">
                          <input
                            type="radio"
                            id={`dump-${idx}-option-${optIdx}`}
                            name={`dump-${idx}`}
                            value={option}
                            className="mt-1"
                          />
                          <label htmlFor={`dump-${idx}-option-${optIdx}`} className="flex-1 cursor-pointer">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>

                    <details className="border-t pt-4">
                      <summary className="cursor-pointer font-semibold text-primary-600 hover:text-primary-700">
                        View Answer
                      </summary>
                      <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-500 rounded">
                        <p className="font-semibold text-green-900 mb-2">Correct Answer: {dump.correct_answer}</p>
                        {dump.explanation && <p className="text-green-800">{dump.explanation}</p>}
                      </div>
                    </details>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-600">
                <p>No dump questions available for this exam yet.</p>
              </div>
            )}
          </div>
        )}

        {/* Learning Materials Tab */}
        {activeTab === 'materials' && (
          <div className="space-y-4">
            {exam.learningMaterials.map((material) => (
              <a
                key={material.id}
                href={material.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">
                        {material.type === 'documentation' && '📖'}
                        {material.type === 'video' && '🎥'}
                        {material.type === 'article' && '📰'}
                      </span>
                      <span className="inline-block px-3 py-1 bg-primary-100 text-primary-800 rounded-full text-xs font-semibold">
                        {material.type}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">{material.title}</h3>
                    <p className="text-gray-600">{material.description}</p>
                  </div>
                  <span className="text-primary-600 font-bold text-xl ml-4">→</span>
                </div>
              </a>
            ))}
          </div>
        )}

        {/* Mock Tests Tab */}
        {activeTab === 'mocks' && (
          <div className="space-y-4">
            {exam.mockTests.map((test, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{test.name}</h3>
                    <div className="flex gap-6 text-gray-600">
                      <span className="flex items-center gap-2">
                        <span>❓</span>
                        <span>{test.questions} questions</span>
                      </span>
                      <span className="flex items-center gap-2">
                        <span>⏱️</span>
                        <span>{test.duration} minutes</span>
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition">
                    Start Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
