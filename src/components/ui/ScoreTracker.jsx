import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';

const ScoreTracker = ({
  currentScore = 0,
  totalQuestions = 10,
  correctAnswers = 0,
  incorrectAnswers = 0,
  showPercentage = true,
  showProgress = true,
  showDetails = false,
  variant = 'default', // 'default', 'compact', 'detailed'
  position = 'top-right', // 'top-right', 'top-left', 'center', 'inline'
  className = ''
}) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(currentScore);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentScore]);

  const getScoreColor = () => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'absolute top-4 left-4';
      case 'top-right':
        return 'absolute top-4 right-4';
      case 'center':
        return 'flex justify-center';
      case 'inline':
        return '';
      default:
        return 'absolute top-4 right-4';
    }
  };

  if (variant === 'compact') {
    return (
      <div className={`${getPositionClasses()} ${className}`}>
        <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-sm">
          <div className="flex items-center space-x-2">
            <Icon name="Target" size={16} className="text-primary" />
            <span className="text-sm font-semibold text-foreground">
              {correctAnswers}/{totalQuestions}
            </span>
            {showPercentage && (
              <span className={`text-xs font-medium ${getScoreColor()}`}>
                ({percentage}%)
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'detailed') {
    return (
      <div className={`${getPositionClasses()} ${className}`}>
        <div className="bg-card border border-border rounded-lg p-4 shadow-sm min-w-[200px]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-foreground">Score Tracker</h3>
            <Icon name="Award" size={16} className="text-primary" />
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Current Score</span>
              <span className={`text-lg font-bold ${getScoreColor()}`}>
                {animatedScore}
              </span>
            </div>
            
            {showProgress && (
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500 ease-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center space-x-1">
                <Icon name="Check" size={12} className="text-success" />
                <span className="text-muted-foreground">Correct: {correctAnswers}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="X" size={12} className="text-error" />
                <span className="text-muted-foreground">Wrong: {incorrectAnswers}</span>
              </div>
            </div>
            
            {showPercentage && (
              <div className="text-center pt-2 border-t border-border">
                <span className={`text-sm font-semibold ${getScoreColor()}`}>
                  {percentage}% Accuracy
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${getPositionClasses()} ${className}`}>
      <div className="bg-card border border-border rounded-lg px-4 py-3 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Icon name="Trophy" size={18} className="text-primary" />
            <span className="text-sm font-medium text-muted-foreground">Score:</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className={`text-xl font-bold transition-all duration-300 ${getScoreColor()}`}>
              {animatedScore}
            </span>
            <span className="text-sm text-muted-foreground">
              / {totalQuestions}
            </span>
          </div>
          
          {showPercentage && (
            <div className={`text-sm font-semibold px-2 py-1 rounded ${
              percentage >= 80 ? 'bg-success/10 text-success' :
              percentage >= 60 ? 'bg-warning/10 text-warning': 'bg-error/10 text-error'
            }`}>
              {percentage}%
            </div>
          )}
        </div>
        
        {showProgress && (
          <div className="mt-2 w-full h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-500 ease-out"
              style={{ width: `${percentage}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreTracker;