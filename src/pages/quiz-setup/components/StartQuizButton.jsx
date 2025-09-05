import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryActionButton from '../../../components/ui/PrimaryActionButton';
import { fetchQuestions } from '../../../services/triviaApi';

const StartQuizButton = ({ selectedCategory, selectedDifficulty, selectedCount, disabled }) => {
  const [isStarting, setIsStarting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleStartQuiz = async () => {
    if (disabled || isStarting) return;
    
    setIsStarting(true);
    setError(null);
    
    try {
      // Fetch questions from Open Trivia DB API
      const apiParams = {
        amount: selectedCount,
        difficulty: selectedDifficulty,
        type: 'multiple'
      };

      if (selectedCategory) {
        apiParams.category = selectedCategory;
      }

      const result = await fetchQuestions(apiParams);
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to fetch questions');
      }

      if (result.questions.length === 0) {
        throw new Error('No questions available for the selected criteria');
      }

      // Store quiz configuration and questions in localStorage
      const quizConfig = {
        category: selectedCategory,
        difficulty: selectedDifficulty,
        questionCount: selectedCount,
        questions: result.questions,
        startTime: new Date()?.toISOString(),
        currentQuestion: 0,
        answers: {},
        score: 0,
        totalQuestions: result.questions.length
      };
      
      localStorage.setItem('currentQuizConfig', JSON.stringify(quizConfig));
      
      // Navigate to quiz interface
      navigate('/quiz-interface');
    } catch (error) {
      console.error('Error starting quiz:', error);
      setError(error.message);
      setIsStarting(false);
    }
  };

  const isDisabled = disabled || !selectedDifficulty || !selectedCount || isStarting;

  return (
    <div className="mt-8">
      {error && (
        <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2 text-error">
            <span className="text-sm font-medium">Error: {error}</span>
          </div>
          <p className="text-xs text-error/80 mt-1">
            Please try again or adjust your quiz settings.
          </p>
        </div>
      )}
      
      <PrimaryActionButton
        onClick={handleStartQuiz}
        disabled={isDisabled}
        loading={isStarting}
        variant="default"
        size="lg"
        iconName="Play"
        iconPosition="right"
        fullWidth
        className="min-h-[56px]"
      >
        {isStarting ? 'Loading Questions...' : 'Start Quiz'}
      </PrimaryActionButton>
      
      {isDisabled && !isStarting && (
        <p className="text-center text-sm text-muted-foreground mt-3">
          Please select both difficulty level and question count to continue
        </p>
      )}
      
      {selectedDifficulty && selectedCount && !isStarting && !error && (
        <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center justify-center space-x-2 text-sm text-primary">
            <span>Ready to start your</span>
            <span className="font-semibold capitalize">{selectedDifficulty}</span>
            <span>quiz with</span>
            <span className="font-semibold">{selectedCount}</span>
            <span>questions!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default StartQuizButton;