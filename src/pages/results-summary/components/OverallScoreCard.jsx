import React from 'react';
import Icon from '../../../components/AppIcon';

const OverallScoreCard = ({ 
  score, 
  totalQuestions, 
  percentage, 
  timeTaken = "5:30",
  difficulty = "Medium",
  category = "Mixed"
}) => {
  const getPerformanceLevel = () => {
    if (percentage >= 90) return { level: "Excellent", color: "text-emerald-600", bgColor: "bg-emerald-50", icon: "Trophy" };
    if (percentage >= 80) return { level: "Great", color: "text-green-600", bgColor: "bg-green-50", icon: "Award" };
    if (percentage >= 70) return { level: "Good", color: "text-blue-600", bgColor: "bg-blue-50", icon: "ThumbsUp" };
    if (percentage >= 60) return { level: "Fair", color: "text-yellow-600", bgColor: "bg-yellow-50", icon: "Meh" };
    return { level: "Needs Improvement", color: "text-red-600", bgColor: "bg-red-50", icon: "AlertCircle" };
  };

  const performance = getPerformanceLevel();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-8 mb-8">
      <div className="text-center mb-6">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${performance?.bgColor} mb-4`}>
          <Icon name={performance?.icon} size={32} className={performance?.color} />
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Complete!</h2>
        <p className={`text-lg font-semibold ${performance?.color}`}>{performance?.level}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="text-center">
          <div className="text-4xl font-bold text-slate-800 mb-2">
            {score}<span className="text-2xl text-slate-500">/{totalQuestions}</span>
          </div>
          <p className="text-slate-600 font-medium">Questions Correct</p>
        </div>

        <div className="text-center">
          <div className={`text-4xl font-bold mb-2 ${performance?.color}`}>
            {percentage}%
          </div>
          <p className="text-slate-600 font-medium">Accuracy Rate</p>
        </div>

        <div className="text-center">
          <div className="text-4xl font-bold text-slate-800 mb-2">{timeTaken}</div>
          <p className="text-slate-600 font-medium">Time Taken</p>
        </div>
      </div>
      <div className="flex items-center justify-center space-x-6 text-sm text-slate-600">
        <div className="flex items-center space-x-2">
          <Icon name="Grid3X3" size={16} />
          <span>Category: {category}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Target" size={16} />
          <span>Difficulty: {difficulty}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} />
          <span>Completed: {new Date()?.toLocaleDateString()}</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="mt-6">
        <div className="w-full bg-slate-200 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              percentage >= 80 ? 'bg-green-500' : 
              percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default OverallScoreCard;