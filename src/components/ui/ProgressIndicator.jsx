import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentStep = 1, 
  totalSteps = 3, 
  stepLabels = ['Setup', 'Quiz', 'Results'],
  showLabels = true,
  variant = 'default' // 'default', 'compact', 'minimal'
}) => {
  const getStepStatus = (step) => {
    if (step < currentStep) return 'completed';
    if (step === currentStep) return 'current';
    return 'upcoming';
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-success text-success-foreground border-success';
      case 'current':
        return 'bg-primary text-primary-foreground border-primary';
      case 'upcoming':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getConnectorClasses = (step) => {
    return step < currentStep ? 'bg-success' : 'bg-border';
  };

  if (variant === 'compact') {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </span>
        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${(currentStep / totalSteps) * 100}%` }}
          />
        </div>
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className="w-full h-1 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / totalSteps) * 100}%` }}
        />
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center">
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalSteps }, (_, index) => {
          const step = index + 1;
          const status = getStepStatus(step);
          
          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full border-2 flex items-center justify-center text-sm font-semibold transition-all duration-200 ${getStepClasses(status)}`}
                >
                  {status === 'completed' ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    step
                  )}
                </div>
                {showLabels && stepLabels?.[index] && (
                  <span className={`mt-2 text-xs font-medium ${
                    status === 'current' ? 'text-primary' : 
                    status === 'completed'? 'text-success' : 'text-muted-foreground'
                  }`}>
                    {stepLabels?.[index]}
                  </span>
                )}
              </div>
              {step < totalSteps && (
                <div
                  className={`w-12 h-0.5 mx-2 transition-colors duration-200 ${getConnectorClasses(step)}`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressIndicator;