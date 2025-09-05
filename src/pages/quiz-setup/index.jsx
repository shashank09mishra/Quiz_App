import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import WelcomeMessage from './components/WelcomeMessage';
import CategorySelector from './components/CategorySelector';
import DifficultySelector from './components/DifficultySelector';
import QuestionCountSelector from './components/QuestionCountSelector';
import StartQuizButton from './components/StartQuizButton';

const QuizSetup = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedCount, setSelectedCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load previous preferences if available
    const savedPreferences = localStorage.getItem('quizPreferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        setSelectedCategory(preferences?.category || '');
        setSelectedDifficulty(preferences?.difficulty || '');
        setSelectedCount(preferences?.questionCount || null);
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    }
    
    // Simulate loading time for better UX
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    // Save preferences when they change
    if (selectedCategory || selectedDifficulty || selectedCount) {
      const preferences = {
        category: selectedCategory,
        difficulty: selectedDifficulty,
        questionCount: selectedCount,
        lastUpdated: new Date()?.toISOString()
      };
      localStorage.setItem('quizPreferences', JSON.stringify(preferences));
    }
  }, [selectedCategory, selectedDifficulty, selectedCount]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleDifficultyChange = (difficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const handleCountChange = (count) => {
    setSelectedCount(count);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Quiz Setup - Quiz Panther by AJ</title>
          <meta name="description" content="Configure your React quiz preferences and start your assessment" />
        </Helmet>
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading quiz setup...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Quiz Setup - Quiz Panther by AJ</title>
        <meta name="description" content="Configure your React quiz preferences and start your assessment" />
        <meta name="keywords" content="React quiz, JavaScript assessment, frontend test, programming quiz" />
      </Helmet>
      
      <Header />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-4xl">
        {/* Main Configuration Panel */}
        <div className="bg-card border border-border rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
          <WelcomeMessage 
            selectedDifficulty={selectedDifficulty}
            selectedCount={selectedCount}
          />
          
          <div className="space-y-8 sm:space-y-10">
            <CategorySelector
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
            
            <div className="border-t border-border pt-8 sm:pt-10">
              <DifficultySelector
                selectedDifficulty={selectedDifficulty}
                onDifficultyChange={handleDifficultyChange}
              />
            </div>
            
            <div className="border-t border-border pt-8 sm:pt-10">
              <QuestionCountSelector
                selectedCount={selectedCount}
                onCountChange={handleCountChange}
              />
            </div>
            
            <div className="border-t border-border pt-8 sm:pt-10">
              <StartQuizButton
                selectedCategory={selectedCategory}
                selectedDifficulty={selectedDifficulty}
                selectedCount={selectedCount}
                disabled={!selectedDifficulty || !selectedCount}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizSetup;