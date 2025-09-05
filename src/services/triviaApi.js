/**
 * Open Trivia DB API Service
 * Handles fetching questions from the Open Trivia Database API
 */

const API_BASE_URL = 'https://opentdb.com/api.php';

// Category mappings for better UX
export const CATEGORIES = {
  9: 'General Knowledge',
  10: 'Entertainment: Books',
  11: 'Entertainment: Film',
  12: 'Entertainment: Music',
  13: 'Entertainment: Musicals & Theatres',
  14: 'Entertainment: Television',
  15: 'Entertainment: Video Games',
  16: 'Entertainment: Board Games',
  17: 'Science & Nature',
  18: 'Science: Computers',
  19: 'Science: Mathematics',
  20: 'Mythology',
  21: 'Sports',
  22: 'Geography',
  23: 'History',
  24: 'Politics',
  25: 'Art',
  26: 'Celebrities',
  27: 'Animals',
  28: 'Vehicles',
  29: 'Entertainment: Comics',
  30: 'Science: Gadgets',
  31: 'Entertainment: Japanese Anime & Manga',
  32: 'Entertainment: Cartoon & Animations'
};

export const DIFFICULTIES = {
  easy: 'Easy',
  medium: 'Medium',
  hard: 'Hard'
};

export const QUESTION_TYPES = {
  multiple: 'Multiple Choice',
  boolean: 'True/False'
};

/**
 * Decode HTML entities in text
 * @param {string} text - Text with HTML entities
 * @returns {string} Decoded text
 */
const decodeHtmlEntities = (text) => {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
};

/**
 * Shuffle array using Fisher-Yates algorithm
 * @param {Array} array - Array to shuffle
 * @returns {Array} Shuffled array
 */
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Transform API question to app format
 * @param {Object} apiQuestion - Question from Open Trivia DB API
 * @param {number} index - Question index
 * @returns {Object} Transformed question
 */
const transformQuestion = (apiQuestion, index) => {
  const options = [
    ...apiQuestion.incorrect_answers.map(decodeHtmlEntities),
    decodeHtmlEntities(apiQuestion.correct_answer)
  ];
  
  return {
    id: index + 1,
    question: decodeHtmlEntities(apiQuestion.question),
    options: shuffleArray(options),
    correctAnswer: decodeHtmlEntities(apiQuestion.correct_answer),
    difficulty: DIFFICULTIES[apiQuestion.difficulty] || apiQuestion.difficulty,
    category: apiQuestion.category,
    type: QUESTION_TYPES[apiQuestion.type] || apiQuestion.type
  };
};

/**
 * Fetch questions from Open Trivia DB API
 * @param {Object} params - API parameters
 * @param {number} params.amount - Number of questions (1-50)
 * @param {number} params.category - Category ID (optional)
 * @param {string} params.difficulty - Difficulty level (easy, medium, hard)
 * @param {string} params.type - Question type (multiple, boolean)
 * @returns {Promise<Object>} API response with questions
 */
export const fetchQuestions = async (params = {}) => {
  const {
    amount = 10,
    category = null,
    difficulty = 'medium',
    type = 'multiple'
  } = params;

  // Validate parameters
  if (amount < 1 || amount > 50) {
    throw new Error('Amount must be between 1 and 50');
  }

  if (difficulty && !['easy', 'medium', 'hard'].includes(difficulty)) {
    throw new Error('Difficulty must be easy, medium, or hard');
  }

  if (type && !['multiple', 'boolean'].includes(type)) {
    throw new Error('Type must be multiple or boolean');
  }

  // Build query parameters
  const queryParams = new URLSearchParams({
    amount: amount.toString(),
    type
  });

  if (category) {
    queryParams.append('category', category.toString());
  }

  if (difficulty) {
    queryParams.append('difficulty', difficulty);
  }

  try {
    const response = await fetch(`${API_BASE_URL}?${queryParams}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.response_code !== 0) {
      throw new Error(`API error: Response code ${data.response_code}`);
    }

    // Transform questions to app format
    const transformedQuestions = data.results.map(transformQuestion);

    return {
      success: true,
      questions: transformedQuestions,
      totalQuestions: transformedQuestions.length,
      category: category ? CATEGORIES[category] : 'Mixed',
      difficulty: DIFFICULTIES[difficulty],
      type: QUESTION_TYPES[type]
    };

  } catch (error) {
    console.error('Error fetching questions:', error);
    return {
      success: false,
      error: error.message,
      questions: [],
      totalQuestions: 0
    };
  }
};

/**
 * Fetch available categories from Open Trivia DB
 * @returns {Promise<Array>} Array of available categories
 */
export const fetchCategories = async () => {
  try {
    const response = await fetch('https://opentdb.com/api_category.php');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    return {
      success: true,
      categories: data.trivia_categories.map(cat => ({
        id: cat.id,
        name: cat.name
      }))
    };
  } catch (error) {
    console.error('Error fetching categories:', error);
    return {
      success: false,
      error: error.message,
      categories: []
    };
  }
};

/**
 * Get random questions with fallback to default parameters
 * @param {Object} params - API parameters
 * @returns {Promise<Object>} API response with questions
 */
export const getRandomQuestions = async (params = {}) => {
  // Use default parameters if none provided
  const defaultParams = {
    amount: 10,
    difficulty: 'medium',
    type: 'multiple',
    ...params
  };

  return await fetchQuestions(defaultParams);
};

export default {
  fetchQuestions,
  fetchCategories,
  getRandomQuestions,
  CATEGORIES,
  DIFFICULTIES,
  QUESTION_TYPES
};
