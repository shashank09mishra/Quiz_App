import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();

  const getPageTitle = () => {
    switch (location?.pathname) {
      case '/quiz-setup':
        return 'Quiz Setup';
      case '/quiz-interface':
        return 'Quiz in Progress';
      case '/results-summary':
        return 'Results Summary';
      default:
        return 'Quiz Setup';
    }
  };

  const getCurrentStep = () => {
    switch (location?.pathname) {
      case '/quiz-setup':
        return 1;
      case '/quiz-interface':
        return 2;
      case '/results-summary':
        return 3;
      default:
        return 1;
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50 w-full">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/quiz-setup" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-150">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="Brain" size={20} color="white" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-semibold text-foreground">Quiz Panther by AJ</span>
              <span className="text-xs text-muted-foreground">Assessment Platform</span>
            </div>
          </Link>

          {/* Progress Indicator */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[1, 2, 3]?.map((step) => (
                  <div key={step} className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                        step < getCurrentStep()
                          ? 'bg-success text-success-foreground'
                          : step === getCurrentStep()
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {step < getCurrentStep() ? (
                        <Icon name="Check" size={16} />
                      ) : (
                        step
                      )}
                    </div>
                    {step < 3 && (
                      <div
                        className={`w-8 h-0.5 mx-1 transition-colors duration-200 ${
                          step < getCurrentStep() ? 'bg-success' : 'bg-muted'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium text-foreground ml-3">
                {getPageTitle()}
              </span>
            </div>
          </div>

          {/* Mobile Progress */}
          <div className="md:hidden flex items-center space-x-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {getCurrentStep()} of 3
            </span>
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${(getCurrentStep() / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* Navigation Actions */}
          <div className="flex items-center space-x-2">
            {location?.pathname === '/results-summary' && (
              <Link
                to="/quiz-setup"
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-150"
              >
                <Icon name="RotateCcw" size={16} className="mr-2" />
                <span className="hidden sm:inline">Restart Quiz</span>
                <span className="sm:hidden">Restart</span>
              </Link>
            )}
            
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-150">
              <Icon name="HelpCircle" size={20} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;