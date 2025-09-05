import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ActionButtons = ({ 
  onRestart 
}) => {
  const navigate = useNavigate();

  const handleRestart = () => {
    // Clear any stored quiz data
    localStorage.removeItem('quizProgress');
    localStorage.removeItem('currentQuestion');
    localStorage.removeItem('userAnswers');
    
    if (onRestart) {
      onRestart();
    }
    
    navigate('/quiz-setup');
  };

  const handlePrintResults = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
      <h3 className="text-lg sm:text-xl font-semibold text-slate-800 mb-4 sm:mb-6 flex items-center">
        <Icon name="Settings" size={20} className="mr-2 sm:mr-3 text-blue-600" />
        Actions
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <Button
          variant="default"
          size="lg"
          onClick={handleRestart}
          iconName="RotateCcw"
          iconPosition="left"
          className="w-full"
        >
          Restart Quiz
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={handlePrintResults}
          iconName="Printer"
          iconPosition="left"
          className="w-full"
        >
          Print Results
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;