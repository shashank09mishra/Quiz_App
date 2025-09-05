import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import QuestionCard from './components/QuestionCard';
import QuizTimer from './components/QuizTimer';
import QuizProgress from './components/QuizProgress';
import QuizNavigation from './components/QuizNavigation';
import QuizHeader from './components/QuizHeader';
import { CATEGORIES } from '../../services/triviaApi';

const QuizInterface = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get quiz data from localStorage (set by StartQuizButton)
  const [quizData, setQuizData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load quiz data from localStorage
  useEffect(() => {
    const loadQuizData = () => {
      try {
        const savedQuizConfig = localStorage.getItem('currentQuizConfig');
        if (savedQuizConfig) {
          const config = JSON.parse(savedQuizConfig);
          setQuizData(config);
          // Initialize quiz timing
          const startTime = new Date().toISOString();
          setQuizStartTime(startTime);
          setQuestionStartTimes({ [0]: startTime });
          // Initialize timer for first question
          setTimeExpired(false);
          setTimerReset(false);
        } else {
          setError('No quiz data found. Please start a new quiz.');
        }
      } catch (err) {
        console.error('Error loading quiz data:', err);
        setError('Failed to load quiz data. Please start a new quiz.');
      } finally {
        setIsLoading(false);
      }
    };

    loadQuizData();
  }, []);

  // Get quiz settings from loaded data
  const quizSettings = quizData ? {
    difficulty: quizData.difficulty,
    questionCount: quizData.questionCount,
    category: quizData.category,
    timeLimit: 30
  } : null;

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeExpired, setTimeExpired] = useState(false);
  const [timerReset, setTimerReset] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [quizStartTime, setQuizStartTime] = useState(null);
  const [questionStartTimes, setQuestionStartTimes] = useState({});

  // Get questions from loaded quiz data
  const filteredQuestions = quizData?.questions || [];

  const currentQuestion = filteredQuestions?.[currentQuestionIndex];
  const totalQuestions = filteredQuestions?.length;
  const answeredCount = Object.keys(answers)?.length;
  const currentScore = Object.values(answers)?.filter(answer => 
    filteredQuestions?.find(q => q?.id === answer?.questionId)?.correctAnswer === answer?.selectedAnswer
  )?.length;

  // Debug logging to help identify option disappearing issue
  useEffect(() => {
    if (currentQuestion) {
      console.log('Current question data:', {
        id: currentQuestion.id,
        question: currentQuestion.question,
        options: currentQuestion.options,
        optionsLength: currentQuestion.options?.length,
        correctAnswer: currentQuestion.correctAnswer
      });
    }
  }, [currentQuestion]);

  // Reset timer when question changes
  useEffect(() => {
    if (currentQuestionIndex >= 0) {
      console.log('Question changed - resetting timer for question:', currentQuestionIndex + 1);
      setTimeExpired(false);
      setTimerReset(prev => !prev);
    }
  }, [currentQuestionIndex]);

  // Handle answer selection
  const handleAnswerSelect = (selectedAnswer) => {
    if (timeExpired) return;
    
    const answerTime = new Date().toISOString();
    const questionStartTime = questionStartTimes[currentQuestionIndex];
    const timeSpent = questionStartTime ? 
      Math.round((new Date(answerTime) - new Date(questionStartTime)) / 1000) : 0;
    
    setAnswers(prev => ({
      ...prev,
      [currentQuestion?.id]: {
        questionId: currentQuestion?.id,
        selectedAnswer,
        timestamp: answerTime,
        timeSpent: timeSpent
      }
    }));
  };

  // Handle clearing selection
  const handleClearSelection = () => {
    if (timeExpired) return;
    
    setAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[currentQuestion?.id];
      return newAnswers;
    });
  };

  // Handle timer expiration
  const handleTimeUp = () => {
    setTimeExpired(true);
    
    // Auto-select no answer or mark as skipped
    if (!answers?.[currentQuestion?.id]) {
      const answerTime = new Date().toISOString();
      const questionStartTime = questionStartTimes[currentQuestionIndex];
      const timeSpent = questionStartTime ? 
        Math.round((new Date(answerTime) - new Date(questionStartTime)) / 1000) : 30; // Default to 30 seconds if no start time
      
      setAnswers(prev => ({
        ...prev,
        [currentQuestion?.id]: {
          questionId: currentQuestion?.id,
          selectedAnswer: null,
          timestamp: answerTime,
          timeSpent: timeSpent,
          timeExpired: true
        }
      }));
    }
    
    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        // Go to next question
        handleNext();
      } else {
        // Finish quiz if it's the last question
        handleFinish();
      }
    }, 1000); // 1 second delay to show the timer expired state
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const newIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newIndex);
      setTimeExpired(false);
      // Force timer reset for new question
      setTimerReset(prev => !prev);
      // Track question start time
      setQuestionStartTimes(prev => ({
        ...prev,
        [newIndex]: new Date().toISOString()
      }));
    }
  };

  const handleSkip = () => {
    if (timeExpired) return;
    
    const answerTime = new Date().toISOString();
    const questionStartTime = questionStartTimes[currentQuestionIndex];
    const timeSpent = questionStartTime ? 
      Math.round((new Date(answerTime) - new Date(questionStartTime)) / 1000) : 0;
    
    // Mark as skipped
    setAnswers(prev => ({
      ...prev,
      [currentQuestion?.id]: {
        questionId: currentQuestion?.id,
        selectedAnswer: null,
        timestamp: answerTime,
        timeSpent: timeSpent,
        skipped: true
      }
    }));
    
    if (currentQuestionIndex < totalQuestions - 1) {
      handleNext();
    }
  };

  const handleFinish = () => {
    setIsQuizCompleted(true);
    
    // Calculate timing data
    const endTime = new Date().toISOString();
    const totalTimeSeconds = quizStartTime ? 
      Math.round((new Date(endTime) - new Date(quizStartTime)) / 1000) : 0;
    
    // Calculate average time per question
    // Include all questions that have timing data (answered, skipped, or timed out)
    const allQuestionsWithTiming = Object.values(answers).filter(a => a.timeSpent !== undefined && a.timeSpent >= 0);
    const totalTimeSpent = allQuestionsWithTiming.reduce((sum, answer) => sum + (answer.timeSpent || 0), 0);
    
    let averageTimePerQuestion = 0;
    if (allQuestionsWithTiming.length > 0) {
      // Count questions without timing data and estimate their time (30 seconds each)
      const questionsWithoutTiming = totalQuestions - allQuestionsWithTiming.length;
      const estimatedTimeForMissing = questionsWithoutTiming * 30; // 30 seconds per question
      const totalEstimatedTime = totalTimeSpent + estimatedTimeForMissing;
      
      // Calculate average using ALL questions, not just answered ones
      averageTimePerQuestion = Math.round(totalEstimatedTime / totalQuestions);
      
      console.log('Average time calculation:', {
        questionsWithTiming: allQuestionsWithTiming.length,
        questionsWithoutTiming: questionsWithoutTiming,
        totalTimeSpent,
        estimatedTimeForMissing,
        totalEstimatedTime,
        totalQuestions,
        averageTimePerQuestion
      });
    } else if (totalTimeSeconds > 0 && totalQuestions > 0) {
      // Fallback: calculate average from total time if individual timing failed
      averageTimePerQuestion = Math.round(totalTimeSeconds / totalQuestions);
      console.log('Fallback average time calculation:', {
        totalTimeSeconds,
        totalQuestions,
        averageTimePerQuestion
      });
    }
    
    // Calculate final results
    const results = {
      answers,
      questions: filteredQuestions,
      totalQuestions,
      correctAnswers: currentScore,
      score: Math.round((currentScore / totalQuestions) * 100),
      completedAt: endTime,
      startTime: quizStartTime,
      totalTimeSeconds: totalTimeSeconds,
      averageTimePerQuestion: averageTimePerQuestion,
      settings: quizSettings,
      // Debug info
      debug: {
        allQuestionsWithTiming: allQuestionsWithTiming.length,
        totalTimeSpent,
        answersCount: Object.keys(answers).length
      }
    };
    
    // Navigate to results with data
    navigate('/results-summary', { state: results });
  };

  // Redirect if no quiz data or error
  useEffect(() => {
    if (!isLoading && (error || filteredQuestions?.length === 0)) {
      navigate('/quiz-setup');
    }
  }, [isLoading, error, filteredQuestions?.length, navigate]);


  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading quiz...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || filteredQuestions?.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
            <div className="text-center">
              <p className="text-error mb-4">{error || 'No questions available'}</p>
              <button 
                onClick={() => navigate('/quiz-setup')}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90"
              >
                Start New Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        {/* Quiz Header */}
        <QuizHeader
          quizTitle={quizSettings?.category ? `${CATEGORIES[quizSettings.category] || 'Trivia'} Quiz` : "Trivia Quiz"}
          difficulty={quizSettings?.difficulty}
          totalQuestions={totalQuestions}
          className="mb-4 sm:mb-6"
        />

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6">
          {/* Main Content */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {/* Question Card */}
            <QuestionCard
              question={currentQuestion}
              selectedAnswer={answers?.[currentQuestion?.id]?.selectedAnswer}
              onAnswerSelect={handleAnswerSelect}
              onClearSelection={handleClearSelection}
              isAnswered={!!answers?.[currentQuestion?.id]}
            />

            {/* Navigation */}
            <QuizNavigation
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              hasAnswer={!!answers?.[currentQuestion?.id]}
              onNext={handleNext}
              onSkip={handleSkip}
              onFinish={handleFinish}
              isTimerExpired={timeExpired}
            />
          </div>

          {/* Sidebar */}
          <div className="xl:col-span-1 space-y-4 sm:space-y-6">
            {/* Timer */}
            <QuizTimer
              timeLimit={quizSettings?.timeLimit}
              onTimeUp={handleTimeUp}
              isActive={!timeExpired && !isQuizCompleted}
              reset={timerReset}
            />

            {/* Progress */}
            <QuizProgress
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={totalQuestions}
              answeredQuestions={answeredCount}
            />
          </div>
        </div>

      </div>
    </div>
  );
};

export default QuizInterface;