import React from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const QuizControls = ({
  currentQuestion = 1,
  totalQuestions = 10,
  canGoBack = true,
  canSkip = true,
  canNext = false,
  onPrevious,
  onNext,
  onSkip,
  showQuestionCounter = true,
  layout = 'horizontal', // 'horizontal', 'vertical', 'compact'
  className = ''
}) => {
  const renderQuestionCounter = () => {
    if (!showQuestionCounter) return null;
    
    return (
      <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
        <Icon name="FileText" size={16} />
        <span>
          Question {currentQuestion} of {totalQuestions}
        </span>
      </div>
    );
  };

  const renderControls = () => {
    const controls = [];

    if (canGoBack && currentQuestion > 1) {
      controls?.push(
        <Button
          key="previous"
          variant="outline"
          size="sm"
          onClick={onPrevious}
          iconName="ChevronLeft"
          iconPosition="left"
          className="min-w-[100px]"
        >
          Previous
        </Button>
      );
    }

    if (canSkip) {
      controls?.push(
        <Button
          key="skip"
          variant="ghost"
          size="sm"
          onClick={onSkip}
          iconName="SkipForward"
          iconPosition="right"
          className="min-w-[80px] text-muted-foreground hover:text-foreground"
        >
          Skip
        </Button>
      );
    }

    if (canNext) {
      controls?.push(
        <Button
          key="next"
          variant="default"
          size="sm"
          onClick={onNext}
          iconName="ChevronRight"
          iconPosition="right"
          className="min-w-[100px]"
        >
          {currentQuestion === totalQuestions ? 'Finish' : 'Next'}
        </Button>
      );
    }

    return controls;
  };

  if (layout === 'compact') {
    return (
      <div className={`flex items-center justify-between space-x-4 ${className}`}>
        {renderQuestionCounter()}
        <div className="flex items-center space-x-2">
          {renderControls()}
        </div>
      </div>
    );
  }

  if (layout === 'vertical') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        {renderQuestionCounter()}
        <div className="flex flex-col space-y-2 w-full max-w-xs">
          {renderControls()}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {renderQuestionCounter()}
      <div className="flex items-center justify-center space-x-3">
        {renderControls()}
      </div>
    </div>
  );
};

export default QuizControls;