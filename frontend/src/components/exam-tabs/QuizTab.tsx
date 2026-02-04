import React, { useState, useMemo } from 'react';

interface ExamData {
  quizzes?: Array<{
    id: number;
    category: string;
    question: string;
    options: string[];
    correct_answer: string;
    explanation?: string;
  }>;
}

interface QuizTabProps {
  exam?: ExamData;
}

export const QuizTab: React.FC<QuizTabProps> = ({ exam }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizResult, setQuizResult] = useState<any>(null);

  // Get only the first 10 questions and convert to display format
  const questions = useMemo(() => {
    if (exam?.quizzes) {
      return exam.quizzes.slice(0, 10).map((q) => ({
        id: q.id.toString(),
        question_text: q.question,
        category: q.category,
        options: q.options,
        correct_answer: q.correct_answer,
        explanation: q.explanation || '',
      }));
    }
    return [];
  }, [exam]);

  const handleSelectAnswer = (questionId: string, selectedOption: string) => {
    if (!quizSubmitted) {
      setUserAnswers({
        ...userAnswers,
        [questionId]: selectedOption,
      });
    }
  };

  const handleSubmitQuiz = () => {
    let correctCount = 0;
    const detailedResults = questions.map((q) => {
      const userAnswer = userAnswers[q.id];
      const isCorrect = userAnswer === q.correct_answer;
      if (isCorrect) correctCount++;

      return {
        id: q.id,
        question_text: q.question_text,
        user_answer: userAnswer || 'Not answered',
        correct_answer: q.correct_answer,
        is_correct: isCorrect,
        explanation: q.explanation,
      };
    });

    const score = (correctCount / questions.length) * 100;
    const passed = score >= 75;

    setQuizResult({
      correct_answers: correctCount,
      total_questions: questions.length,
      score,
      passed,
      details: detailedResults,
    });
    setQuizSubmitted(true);
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleResetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizSubmitted(false);
    setQuizResult(null);
  };

  if (questions.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 text-lg">No quiz questions available yet.</p>
        <p className="text-gray-500 text-sm mt-2">Questions will be added soon.</p>
      </div>
    );
  }

  if (quizSubmitted && quizResult) {
    return <QuizResultsComponent result={quizResult} onReset={handleResetQuiz} />;
  }

  const question = questions[currentQuestion];
  const allAnswered = Object.keys(userAnswers).length === questions.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Practice Quiz</h2>
            <p className="text-gray-600">Test your knowledge with 10 questions</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-gray-600">Progress</p>
            <p className="text-2xl font-bold text-primary-600">
              {currentQuestion + 1} / {questions.length}
            </p>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-primary-600 h-full transition-all duration-300"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Question Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm font-semibold text-primary-600">Question {currentQuestion + 1} of {questions.length}</p>
            <p className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded">
              {question.category}
            </p>
          </div>
          <h3 className="text-xl font-bold text-gray-900">{question.question_text}</h3>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, idx) => (
            <div
              key={idx}
              onClick={() => handleSelectAnswer(question.id, option)}
              className={`p-4 rounded-lg border-2 cursor-pointer transition duration-200 ${
                userAnswers[question.id] === option
                  ? 'border-primary-600 bg-gradient-to-r from-primary-50 to-primary-100 ring-2 ring-primary-300 shadow-md'
                  : 'border-gray-300 bg-white hover:border-primary-400 hover:bg-blue-50 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className={`relative w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                  userAnswers[question.id] === option
                    ? 'border-primary-600 bg-primary-600'
                    : 'border-gray-400 bg-white'
                }`}>
                  {userAnswers[question.id] === option && (
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <span className={`text-base font-medium transition ${
                  userAnswers[question.id] === option
                    ? 'text-primary-700'
                    : 'text-gray-700'
                }`}>
                  {option}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Question Navigator */}
        <div className="mb-6 pb-6 border-b">
          <p className="text-xs font-semibold text-gray-600 mb-3">QUICK NAVIGATION</p>
          <div className="flex gap-2 flex-wrap">
            {questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-10 h-10 rounded-full font-semibold text-sm transition ${
                  idx === currentQuestion
                    ? 'bg-primary-600 text-white ring-2 ring-primary-300'
                    : userAnswers[questions[idx].id]
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Status and Navigation */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            <span className="font-semibold">{Object.keys(userAnswers).length}/{questions.length}</span> answered
          </div>

          <div className="flex gap-3">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className={`px-6 py-2 rounded-lg font-semibold transition ${
                currentQuestion === 0
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              ← Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={handleSubmitQuiz}
                disabled={!allAnswered}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  allAnswered
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                Submit Quiz
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="px-6 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-lg font-semibold transition"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Results Component
interface ResultsProps {
  result: any;
  onReset: () => void;
}

const QuizResultsComponent: React.FC<ResultsProps> = ({ result, onReset }) => {
  const { correct_answers, total_questions, score, passed, details } = result;

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className={`rounded-lg p-8 text-center ${passed ? 'bg-green-50' : 'bg-red-50'}`}>
        <div className="text-6xl mb-4">{passed ? '✅' : '❌'}</div>
        <h2 className={`text-3xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
          {passed ? 'Congratulations! 🎉' : 'Keep Practicing! 💪'}
        </h2>
        <p className={`text-xl font-semibold ${passed ? 'text-green-600' : 'text-red-600'}`}>
          Your Score: <span className="text-2xl">{score.toFixed(1)}%</span>
        </p>
        <p className="text-gray-600 mt-2">Passing Score: 75%</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-blue-500">
          <p className="text-gray-600 text-sm font-semibold">Total Questions</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{total_questions}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-green-500">
          <p className="text-gray-600 text-sm font-semibold">Correct</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{correct_answers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-red-500">
          <p className="text-gray-600 text-sm font-semibold">Wrong</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{total_questions - correct_answers}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 text-center border-t-4 border-yellow-500">
          <p className="text-gray-600 text-sm font-semibold">Score</p>
          <p className="text-3xl font-bold text-yellow-600 mt-2">{score.toFixed(1)}%</p>
        </div>
      </div>

      {/* Detailed Review */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Answer Review</h3>
        <div className="space-y-6">
          {details.map((detail: any, idx: number) => (
            <div
              key={idx}
              className={`p-6 rounded-lg border-l-4 ${
                detail.is_correct ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
              }`}
            >
              {/* Question Number and Status */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{detail.is_correct ? '✅' : '❌'}</span>
                  <p className="font-bold text-gray-900">Question {idx + 1}</p>
                </div>
                {!detail.is_correct && (
                  <span className="text-xs font-semibold text-red-600 bg-red-100 px-3 py-1 rounded">
                    Incorrect
                  </span>
                )}
              </div>

              {/* Question Text */}
              <p className="text-gray-900 font-semibold mb-4">{detail.question_text}</p>

              {/* Answers */}
              <div className="space-y-3 text-sm">
                <div>
                  <p className="font-semibold text-gray-700 mb-1">Your Answer:</p>
                  <div className={`p-3 rounded ${detail.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {detail.user_answer}
                  </div>
                </div>

                {!detail.is_correct && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Correct Answer:</p>
                    <div className="p-3 rounded bg-green-100 text-green-800">
                      {detail.correct_answer}
                    </div>
                  </div>
                )}

                {detail.explanation && (
                  <div>
                    <p className="font-semibold text-gray-700 mb-1">Explanation:</p>
                    <p className="text-gray-700 bg-white p-3 rounded border border-gray-200">
                      {detail.explanation}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-center pt-6">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition"
        >
          Retake Quiz
        </button>
        <button
          className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
        >
          Back to Quiz
        </button>
      </div>
    </div>
  );
};
