import React from 'react';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DifficultySelector = ({ selectedDifficulty, onDifficultyChange }) => {
  const difficultyOptions = [
    {
      value: 'easy',
      label: 'Easy',
      description: 'Basic level',
      icon: 'Smile',
      color: 'text-success'
    },
    {
      value: 'medium',
      label: 'Medium',
      description: 'Intermediate level',
      icon: 'Zap',
      color: 'text-warning'
    },
    {
      value: 'hard',
      label: 'Hard',
      description: 'Advanced level',
      icon: 'Flame',
      color: 'text-error'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Target" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Select Difficulty Level</h3>
      </div>
      <div className="space-y-3">
        {difficultyOptions?.map((option) => (
          <div
            key={option?.value}
            className={`relative border-2 rounded-lg p-4 cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedDifficulty === option?.value
                ? 'border-primary bg-primary/5 shadow-sm'
                : 'border-border bg-card hover:border-primary/50'
            }`}
            onClick={() => onDifficultyChange(option?.value)}
          >
            <div className="flex items-start space-x-4">
              <div className="flex items-center mt-1">
                <input
                  type="radio"
                  name="difficulty"
                  value={option?.value}
                  checked={selectedDifficulty === option?.value}
                  onChange={() => onDifficultyChange(option?.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-primary focus:ring-2"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name={option?.icon} size={18} className={option?.color} />
                  <span className="text-base font-medium text-foreground">
                    {option?.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {option?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;