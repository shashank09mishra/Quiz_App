import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeMessage = ({ selectedDifficulty, selectedCount }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return 'text-success';
      case 'medium':
        return 'text-warning';
      case 'hard':
        return 'text-error';
      default:
        return 'text-primary';
    }
  };

  const getMotivationalMessage = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return "Perfect for getting started with trivia!";
      case 'medium':
        return "Ready to test your knowledge? Let's dive deeper!";
      case 'hard':
        return "Challenge accepted! Time to prove your trivia mastery!";
      default:
        return "Choose your difficulty level to get started!";
    }
  };

  return (
    <div className="text-center space-y-4 mb-8">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Icon name="Rocket" size={24} className="text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Quiz Panther by AJ</h1>
      </div>
      
      <div className="max-w-md mx-auto">
        <p className="text-base text-muted-foreground leading-relaxed">
          Test your knowledge with our interactive trivia quiz platform powered by Open Trivia DB. 
          Choose your category, difficulty level and question count to customize your experience.
        </p>
      </div>
      
      {selectedDifficulty && selectedCount && (
        <div className="mt-6 p-4 bg-card border border-border rounded-lg shadow-sm">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <Icon name="Info" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Quiz Configuration</span>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Difficulty:</span>
              <span className={`font-medium capitalize ${getDifficultyColor(selectedDifficulty)}`}>
                {selectedDifficulty}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Questions:</span>
              <span className="font-medium text-foreground">{selectedCount}</span>
            </div>
          </div>
          
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-center text-muted-foreground">
              {getMotivationalMessage(selectedDifficulty)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomeMessage;