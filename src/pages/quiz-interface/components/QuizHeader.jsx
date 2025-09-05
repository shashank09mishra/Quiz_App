import React from 'react';
import Icon from '../../../components/AppIcon';

const QuizHeader = ({ 
  quizTitle = "Quiz",
  difficulty = "Medium",
  totalQuestions = 10,
  className = ""
}) => {
  const getDifficultyColor = () => {
    switch (difficulty?.toLowerCase()) {
      case 'easy':
        return 'text-success bg-success/10 border-success/20';
      case 'hard':
        return 'text-error bg-error/10 border-error/20';
      default:
        return 'text-warning bg-warning/10 border-warning/20';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-lg p-4 sm:p-6 ${className}`}>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
        <div className="flex-1 min-w-0">
          <h1 className="text-lg sm:text-xl font-bold text-foreground mb-2 truncate">
            {quizTitle}
          </h1>
          <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor()} w-fit`}>
              {difficulty}
            </span>
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <Icon name="HelpCircle" size={16} />
              <span>{totalQuestions} Questions</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Trophy" size={20} className="sm:w-6 sm:h-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizHeader;