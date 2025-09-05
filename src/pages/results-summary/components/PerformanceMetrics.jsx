import React from 'react';
import Icon from '../../../components/AppIcon';

const PerformanceMetrics = ({ 
  correctAnswers, 
  incorrectAnswers, 
  totalQuestions,
  timeTaken = "N/A",
  difficulty = "Medium",
  averageTimePerQuestion = "N/A"
}) => {
  const accuracy = Math.round((correctAnswers / totalQuestions) * 100);
  const completionRate = Math.round(((correctAnswers + incorrectAnswers) / totalQuestions) * 100);

  const metrics = [
    {
      icon: "Target",
      label: "Accuracy Rate",
      value: `${accuracy}%`,
      color: accuracy >= 80 ? "text-green-600" : accuracy >= 60 ? "text-yellow-600" : "text-red-600",
      bgColor: accuracy >= 80 ? "bg-green-50" : accuracy >= 60 ? "bg-yellow-50" : "bg-red-50"
    },
    {
      icon: "Clock",
      label: "Total Time",
      value: timeTaken,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: "Zap",
      label: "Avg. per Question",
      value: averageTimePerQuestion,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: "BarChart3",
      label: "Completion Rate",
      value: `${completionRate}%`,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  const difficultyColors = {
    Easy: { color: "text-green-600", bgColor: "bg-green-50", icon: "Smile" },
    Medium: { color: "text-yellow-600", bgColor: "bg-yellow-50", icon: "Meh" },
    Hard: { color: "text-red-600", bgColor: "bg-red-50", icon: "Frown" }
  };

  const difficultyStyle = difficultyColors?.[difficulty] || difficultyColors?.Medium;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 space-y-3 sm:space-y-0">
        <h3 className="text-lg sm:text-xl font-semibold text-slate-800 flex items-center">
          <Icon name="BarChart3" size={20} className="mr-2 sm:mr-3 text-blue-600 flex-shrink-0" />
          <span className="truncate">Performance Metrics</span>
        </h3>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${difficultyStyle?.bgColor} flex-shrink-0 w-fit`}>
          <Icon name={difficultyStyle?.icon} size={16} className={difficultyStyle?.color} />
          <span className={`text-sm font-medium ${difficultyStyle?.color}`}>
            {difficulty}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4 sm:mb-6">
        {metrics?.map((metric, index) => (
          <div key={index} className={`p-3 sm:p-4 rounded-lg ${metric?.bgColor} border border-opacity-20 min-w-0`}>
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
              <div className={`p-2 rounded-lg bg-white shadow-sm flex-shrink-0`}>
                <Icon name={metric?.icon} size={18} className={metric?.color} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-slate-600 truncate">{metric?.label}</p>
                <p className={`text-base sm:text-lg font-bold ${metric?.color} truncate`}>{metric?.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Answer Breakdown */}
      <div className="border-t border-slate-200 pt-4 sm:pt-6">
        <h4 className="text-base sm:text-lg font-semibold text-slate-800 mb-3 sm:mb-4">Answer Breakdown</h4>
        <div className="grid grid-cols-1 gap-3 sm:gap-4">
          <div className="flex items-center justify-between p-3 sm:p-4 bg-green-50 rounded-lg border border-green-200 min-w-0">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Icon name="CheckCircle" size={16} className="text-green-600 flex-shrink-0" />
              <span className="text-sm font-medium text-green-800 truncate">Correct</span>
            </div>
            <span className="text-lg font-bold text-green-600 flex-shrink-0 ml-2">{correctAnswers}</span>
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 bg-red-50 rounded-lg border border-red-200 min-w-0">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Icon name="XCircle" size={16} className="text-red-600 flex-shrink-0" />
              <span className="text-sm font-medium text-red-800 truncate">Incorrect</span>
            </div>
            <span className="text-lg font-bold text-red-600 flex-shrink-0 ml-2">{incorrectAnswers}</span>
          </div>

          <div className="flex items-center justify-between p-3 sm:p-4 bg-slate-50 rounded-lg border border-slate-200 min-w-0">
            <div className="flex items-center space-x-2 min-w-0 flex-1">
              <Icon name="HelpCircle" size={16} className="text-slate-600 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-800 truncate">Skipped</span>
            </div>
            <span className="text-lg font-bold text-slate-600 flex-shrink-0 ml-2">
              {totalQuestions - correctAnswers - incorrectAnswers}
            </span>
          </div>
        </div>
      </div>
      {/* Performance Insights */}
      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-slate-50 rounded-lg">
        <h5 className="text-sm font-semibold text-slate-800 mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-yellow-600 flex-shrink-0" />
          <span className="truncate">Performance Insights</span>
        </h5>
        <div className="text-xs sm:text-sm text-slate-600 space-y-1">
          {accuracy >= 90 && (
            <p className="break-words">🎉 Outstanding performance! You've mastered this topic.</p>
          )}
          {accuracy >= 80 && accuracy < 90 && (
            <p className="break-words">👍 Great job! You have a solid understanding of the material.</p>
          )}
          {accuracy >= 70 && accuracy < 80 && (
            <p className="break-words">📚 Good work! Consider reviewing the topics you missed.</p>
          )}
          {accuracy >= 60 && accuracy < 70 && (
            <p className="break-words">💪 Keep practicing! Focus on the areas where you struggled.</p>
          )}
          {accuracy < 60 && (
            <p className="break-words">📖 More study needed. Review the fundamentals and try again.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PerformanceMetrics;