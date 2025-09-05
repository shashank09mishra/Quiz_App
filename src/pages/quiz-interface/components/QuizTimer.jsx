import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const QuizTimer = ({ 
  timeLimit = 30, 
  onTimeUp, 
  isActive = true, 
  reset = false,
  className = ""
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    if (reset) {
      console.log('Timer reset triggered - reset prop changed:', reset, 'timeLimit:', timeLimit);
      setTimeLeft(timeLimit);
      setIsExpired(false);
    }
  }, [reset, timeLimit]);

  // Reset timer when timeLimit changes (for new questions)
  useEffect(() => {
    console.log('Timer reset - timeLimit changed:', timeLimit);
    setTimeLeft(timeLimit);
    setIsExpired(false);
  }, [timeLimit]);

  useEffect(() => {
    if (!isActive || isExpired) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsExpired(true);
          onTimeUp && onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, isExpired, onTimeUp]);

  const getTimerColor = () => {
    if (isExpired) return 'text-error';
    if (timeLeft <= 10) return 'text-warning';
    return 'text-foreground';
  };

  const getProgressColor = () => {
    if (isExpired) return 'bg-error';
    if (timeLeft <= 10) return 'bg-warning';
    return 'bg-primary';
  };

  const progressPercentage = (timeLeft / timeLimit) * 100;

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon 
            name={isExpired ? "AlertTriangle" : "Clock"} 
            size={18} 
            className={getTimerColor()} 
          />
          <span className="text-sm font-medium text-muted-foreground">
            {isExpired ? "Time's Up!" : "Time Remaining"}
          </span>
        </div>
        <span className={`text-2xl font-bold ${getTimerColor()}`}>
          {Math.floor(timeLeft / 60)}:{(timeLeft % 60)?.toString()?.padStart(2, '0')}
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ease-linear ${getProgressColor()}`}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
      {isExpired && (
        <div className="mt-2 text-xs text-error font-medium">
          Question automatically locked
        </div>
      )}
    </div>
  );
};

export default QuizTimer;