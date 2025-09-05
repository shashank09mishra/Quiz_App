import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const QuestionReviewTable = ({ questions, userAnswers }) => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const toggleExpanded = (index) => {
    setExpandedQuestion(expandedQuestion === index ? null : index);
  };

  const getStatusIcon = (isCorrect) => {
    return isCorrect ? (
      <Icon name="CheckCircle" size={20} className="text-green-600" />
    ) : (
      <Icon name="XCircle" size={20} className="text-red-600" />
    );
  };

  const getAnswerStyle = (option, correctAnswer, userAnswer, isCorrect) => {
    if (option === correctAnswer) {
      return "bg-green-100 text-green-800 border-green-300";
    }
    if (option === userAnswer && !isCorrect) {
      return "bg-red-100 text-red-800 border-red-300";
    }
    return "bg-slate-50 text-slate-700 border-slate-200";
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
      <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
        <h3 className="text-xl font-semibold text-slate-800 flex items-center">
          <Icon name="FileText" size={24} className="mr-3 text-blue-600" />
          Question Review
        </h3>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 w-12">#</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Question</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 w-32">Your Answer</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700 w-32">Correct Answer</th>
              <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700 w-20">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {questions?.map((question, index) => {
              const userAnswer = userAnswers?.[index];
              const isCorrect = userAnswer === question?.correct_answer;
              
              return (
                <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                  <td className="px-6 py-4 text-sm font-medium text-slate-900">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-800 leading-relaxed max-w-md">
                      {question?.question}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium border ${
                      getAnswerStyle(userAnswer, question?.correct_answer, userAnswer, isCorrect)
                    }`}>
                      {userAnswer || "Not Answered"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 rounded-md text-xs font-medium border bg-green-100 text-green-800 border-green-300">
                      {question?.correct_answer}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    {getStatusIcon(isCorrect)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden divide-y divide-slate-200">
        {questions?.map((question, index) => {
          const userAnswer = userAnswers?.[index];
          const isCorrect = userAnswer === question?.correct_answer;
          const isExpanded = expandedQuestion === index;
          
          return (
            <div key={index} className="p-4">
              <div 
                className="flex items-center justify-between cursor-pointer"
                onClick={() => toggleExpanded(index)}
              >
                <div className="flex items-center space-x-3">
                  <span className="flex items-center justify-center w-8 h-8 bg-slate-100 rounded-full text-sm font-semibold text-slate-700">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800 line-clamp-2">
                      {question?.question}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(isCorrect)}
                  <Icon 
                    name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                    size={16} 
                    className="text-slate-400" 
                  />
                </div>
              </div>
              {isExpanded && (
                <div className="mt-4 pl-11 space-y-3">
                  <div className="text-sm text-slate-700">
                    <strong>Question:</strong> {question?.question}
                  </div>
                  
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-slate-600 block mb-1">Your Answer:</span>
                      <span className={`inline-block px-2 py-1 rounded text-xs font-medium border ${
                        getAnswerStyle(userAnswer, question?.correct_answer, userAnswer, isCorrect)
                      }`}>
                        {userAnswer || "Not Answered"}
                      </span>
                    </div>
                    
                    <div>
                      <span className="text-xs font-medium text-slate-600 block mb-1">Correct Answer:</span>
                      <span className="inline-block px-2 py-1 rounded text-xs font-medium border bg-green-100 text-green-800 border-green-300">
                        {question?.correct_answer}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {question?.all_answers?.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className={`p-2 rounded-md text-xs border ${
                          getAnswerStyle(option, question?.correct_answer, userAnswer, option === question?.correct_answer)
                        }`}
                      >
                        {option}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionReviewTable;