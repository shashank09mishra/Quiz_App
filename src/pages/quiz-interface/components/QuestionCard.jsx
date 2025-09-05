import React from 'react';
import Icon from '../../../components/AppIcon';

const QuestionCard = ({ 
  question, 
  selectedAnswer, 
  onAnswerSelect, 
  onClearSelection,
  isAnswered = false,
  showCorrectAnswer = false,
  correctAnswer = null
}) => {
  const getAnswerButtonClass = (option) => {
    let baseClass = "w-full p-4 text-left border-2 rounded-lg transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary/50 ";
    
    if (showCorrectAnswer) {
      if (option === correctAnswer) {
        return baseClass + "bg-success/10 border-success text-success-foreground";
      } else if (option === selectedAnswer && option !== correctAnswer) {
        return baseClass + "bg-error/10 border-error text-error-foreground";
      } else {
        return baseClass + "bg-muted border-border text-muted-foreground";
      }
    }
    
    if (selectedAnswer === option) {
      return baseClass + "bg-primary/10 border-primary text-primary";
    }
    
    return baseClass + "bg-card border-border text-foreground hover:border-primary/50 hover:bg-primary/5";
  };

  const getAnswerIcon = (option) => {
    if (!showCorrectAnswer) return null;
    
    if (option === correctAnswer) {
      return <Icon name="Check" size={20} className="text-success" />;
    } else if (option === selectedAnswer && option !== correctAnswer) {
      return <Icon name="X" size={20} className="text-error" />;
    }
    
    return null;
  };

  // Debug logging to help identify option disappearing issue
  console.log('QuestionCard render:', {
    questionId: question?.id,
    questionText: question?.question,
    options: question?.options,
    optionsLength: question?.options?.length,
    selectedAnswer,
    showCorrectAnswer
  });

  return (
    <div className="bg-card border border-border rounded-xl p-4 sm:p-6 shadow-sm">
      <div className="mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between space-y-3 sm:space-y-0">
          <h2 className="text-lg sm:text-xl font-semibold text-foreground leading-relaxed flex-1 min-w-0">
            {question?.question}
          </h2>
          {selectedAnswer && !showCorrectAnswer && onClearSelection && (
            <button
              onClick={onClearSelection}
              className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:border-primary/50 transition-colors duration-150 flex-shrink-0 w-fit"
              title="Clear selection"
            >
              <Icon name="X" size={16} className="inline mr-1" />
              Clear
            </button>
          )}
        </div>
      </div>
      <div className="space-y-2 sm:space-y-3">
        {question?.options?.map((option, index) => {
          console.log(`Rendering option ${index}:`, option);
          return (
            <button
              key={`${question?.id}-${index}`}
              onClick={() => !showCorrectAnswer && onAnswerSelect(option)}
              disabled={showCorrectAnswer}
              className={getAnswerButtonClass(option)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
                  <span className="w-6 h-6 sm:w-8 sm:h-8 bg-muted rounded-full flex items-center justify-center text-xs sm:text-sm font-medium text-muted-foreground flex-shrink-0">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="font-medium text-sm sm:text-base break-words" style={{ color: 'inherit' }}>{option || 'No option text'}</span>
                </div>
                {getAnswerIcon(option)}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;