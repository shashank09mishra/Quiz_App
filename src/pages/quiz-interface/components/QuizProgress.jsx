import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizProgress = ({ 
  currentQuestion = 1, 
  totalQuestions = 10, 
  answeredQuestions = 0,
  className = ""
}) => {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const answeredPercentage = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="FileText" size={18} className="text-primary" />
          <span className="text-sm font-medium text-muted-foreground">Progress</span>
        </div>
        <span className="text-lg font-semibold text-foreground">
          {currentQuestion} of {totalQuestions}
        </span>
      </div>
      
      <div className="space-y-2">
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Current Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Answered:</span>
          <span className="font-medium text-foreground">
            {answeredQuestions} / {totalQuestions}
          </span>
        </div>
        <div className="mt-1 w-full h-1 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-success transition-all duration-300 ease-out"
            style={{ width: `${answeredPercentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizProgress;