import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import OverallScoreCard from './components/OverallScoreCard';
import QuestionReviewTable from './components/QuestionReviewTable';
import PerformanceMetrics from './components/PerformanceMetrics';
import ActionButtons from './components/ActionButtons';
import Icon from '../../components/AppIcon';

const ResultsSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Get quiz results from location state (passed from quiz interface)
  const resultsFromQuiz = location?.state;


  useEffect(() => {
    // Get quiz data from location state (passed from quiz interface)
    if (resultsFromQuiz) {
      // Format timing data
      const formatTime = (seconds) => {
        if (!seconds || seconds === 0) return 'N/A';
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
      };

      const formatTimePerQuestion = (seconds) => {
        if (!seconds || seconds === 0) return 'N/A';
        return `${seconds}s`;
      };

      // Transform the quiz results to match the expected format
      const transformedData = {
        questions: resultsFromQuiz.questions.map(q => ({
          question: q.question,
          correct_answer: q.correctAnswer,
          all_answers: q.options
        })),
        userAnswers: Object.values(resultsFromQuiz.answers).map(answer => answer.selectedAnswer),
        settings: {
          difficulty: resultsFromQuiz.settings?.difficulty || 'Medium',
          category: resultsFromQuiz.settings?.category || 'Mixed',
          totalQuestions: resultsFromQuiz.totalQuestions,
          timeTaken: formatTime(resultsFromQuiz.totalTimeSeconds),
          averageTimePerQuestion: formatTimePerQuestion(resultsFromQuiz.averageTimePerQuestion)
        },
        score: resultsFromQuiz.score,
        correctAnswers: resultsFromQuiz.correctAnswers,
        totalQuestions: resultsFromQuiz.totalQuestions,
        totalTimeSeconds: resultsFromQuiz.totalTimeSeconds,
        averageTimePerQuestion: resultsFromQuiz.averageTimePerQuestion
      };
      setQuizData(transformedData);
      setLoading(false);

    } else {
      // Redirect to quiz setup if no results available
      navigate('/quiz-setup');
    }
  }, [resultsFromQuiz, navigate]);


  const calculateResults = () => {
    if (!quizData) return { score: 0, percentage: 0, correctAnswers: 0, incorrectAnswers: 0 };

    const correctAnswers = quizData?.userAnswers?.filter((answer, index) => 
      answer === quizData?.questions?.[index]?.correct_answer
    )?.length;

    const incorrectAnswers = quizData?.userAnswers?.filter((answer, index) => 
      answer && answer !== quizData?.questions?.[index]?.correct_answer
    )?.length;

    const percentage = Math.round((correctAnswers / quizData?.questions?.length) * 100);

    return {
      score: correctAnswers,
      percentage,
      correctAnswers,
      incorrectAnswers,
      totalQuestions: quizData?.questions?.length
    };
  };

  const handleRestart = () => {
    // Clear quiz data and navigate to setup
    localStorage.removeItem('quizProgress');
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('userAnswers');
    navigate('/quiz-setup');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-slate-600">Calculating your results...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!quizData) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="mx-auto text-red-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No Quiz Data Found</h2>
            <p className="text-slate-600 mb-6">It looks like you haven't completed a quiz yet.</p>
            <button
              onClick={() => navigate('/quiz-setup')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-150"
            >
              Start a New Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const results = calculateResults();

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {/* Overall Score Card */}
        <OverallScoreCard
          score={results?.score}
          totalQuestions={results?.totalQuestions}
          percentage={results?.percentage}
          timeTaken={quizData?.settings?.timeTaken || "N/A"}
          difficulty={quizData?.settings?.difficulty || "Medium"}
          category={quizData?.settings?.category || "Mixed"}
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content Area */}
          <div className="xl:col-span-2 space-y-6 sm:space-y-8">
            {/* Question Review Table */}
            <QuestionReviewTable
              questions={quizData?.questions}
              userAnswers={quizData?.userAnswers}
            />
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            {/* Performance Metrics */}
            <PerformanceMetrics
              correctAnswers={results?.correctAnswers}
              incorrectAnswers={results?.incorrectAnswers}
              totalQuestions={results?.totalQuestions}
              timeTaken={quizData?.settings?.timeTaken || "N/A"}
              difficulty={quizData?.settings?.difficulty || "Medium"}
              averageTimePerQuestion={quizData?.settings?.averageTimePerQuestion || "N/A"}
            />


            {/* Action Buttons */}
            <ActionButtons
              onRestart={handleRestart}
            />
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-8 sm:mt-12 text-center">
          <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 sm:p-8">
            <Icon name="Heart" size={24} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-2">Thank You for Using Quiz Panther by AJ!</h3>
            <p className="text-sm sm:text-base text-slate-600 mb-4">
              Keep practicing and improving. Every quiz makes you better!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4 text-xs sm:text-sm text-slate-500">
              <span>© {new Date()?.getFullYear()} Quiz Panther by AJ</span>
              <span className="hidden sm:inline">•</span>
              <span>Built with React & Tailwind CSS</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ResultsSummary;