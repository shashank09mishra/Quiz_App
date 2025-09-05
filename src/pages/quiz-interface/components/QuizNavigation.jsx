import React from 'react';
import Button from '../../../components/ui/Button';

const QuizNavigation = ({
  currentQuestion = 1,
  totalQuestions = 10,
  hasAnswer = false,
  onNext,
  onSkip,
  onFinish,
  isTimerExpired = false,
  className = ""
}) => {
  const isLastQuestion = currentQuestion === totalQuestions;
  const canProceed = hasAnswer || isTimerExpired;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 sm:p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end space-y-3 sm:space-y-0 sm:space-x-4">
        {/* Skip Button */}
        <div className="flex-shrink-0">
          <Button
            variant="ghost"
            size="default"
            onClick={onSkip}
            iconName="SkipForward"
            iconPosition="right"
            className="text-muted-foreground hover:text-foreground w-full sm:w-auto"
            disabled={isTimerExpired}
          >
            Skip
          </Button>
        </div>

        {/* Next/Finish Button */}
        <div className="flex-shrink-0">
          <Button
            variant={isLastQuestion ? "success" : "default"}
            size="default"
            onClick={isLastQuestion ? onFinish : onNext}
            iconName={isLastQuestion ? "CheckCircle" : "ChevronRight"}
            iconPosition="right"
            disabled={!canProceed}
            className="w-full sm:w-auto min-w-[120px]"
          >
            {isLastQuestion ? "Finish Quiz" : "Next"}
          </Button>
        </div>
      </div>

      {!hasAnswer && !isTimerExpired && (
        <div className="mt-3 text-center">
          <p className="text-sm text-muted-foreground">
            Please select an answer to continue
          </p>
        </div>
      )}

      {isTimerExpired && (
        <div className="mt-3 text-center">
          <p className="text-sm text-warning">
            Time expired - question automatically locked
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizNavigation;