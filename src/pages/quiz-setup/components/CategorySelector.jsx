import React, { useState, useEffect } from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { fetchCategories } from '../../../services/triviaApi';

const CategorySelector = ({ selectedCategory, onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const result = await fetchCategories();
        
        if (result.success) {
          setCategories(result.categories);
        } else {
          setError(result.error || 'Failed to load categories');
        }
      } catch (err) {
        setError('Failed to load categories');
        console.error('Error loading categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  const categoryOptions = [
    { value: '', label: 'Any Category', description: 'Mixed questions from all categories' },
    ...categories.map(cat => ({
      value: cat.id.toString(),
      label: cat.name,
      description: `Questions about ${cat.name.toLowerCase()}`
    }))
  ];

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Grid3X3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Select Category</h3>
        </div>
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
            <p className="text-sm text-muted-foreground">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center space-x-2 mb-6">
          <Icon name="Grid3X3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Select Category</h3>
        </div>
        <div className="p-4 bg-error/10 border border-error/20 rounded-lg">
          <div className="flex items-center space-x-2 text-error">
            <Icon name="AlertCircle" size={16} />
            <span className="text-sm font-medium">Failed to load categories</span>
          </div>
          <p className="text-xs text-error/80 mt-1">
            Using default category selection. You can still proceed with the quiz.
          </p>
        </div>
        <Select
          value={selectedCategory || ''}
          onChange={onCategoryChange}
          placeholder="Select a category"
          options={[
            { value: '', label: 'Any Category' }
          ]}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="Grid3X3" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Select Category</h3>
      </div>
      
      <div className="space-y-3">
        <Select
          value={selectedCategory || ''}
          onChange={onCategoryChange}
          placeholder="Choose a category for your quiz"
          options={categoryOptions}
        />
        
        {selectedCategory && (
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-2 text-sm text-primary">
              <Icon name="Info" size={14} />
              <span>
                {categoryOptions.find(opt => opt.value === selectedCategory)?.description}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
