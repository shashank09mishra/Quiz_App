# Quiz Panther by AJ

A modern React-based trivia quiz application powered by the Open Trivia Database API. Test your knowledge across various categories and difficulty levels with an interactive quiz experience.

## 🚀 Features

- **Open Trivia DB Integration** - Real trivia questions from the Open Trivia Database API
- **Multiple Categories** - Choose from 25+ categories including Science, History, Sports, and more
- **Difficulty Levels** - Easy, Medium, and Hard questions to match your skill level
- **Interactive Quiz Interface** - Modern, responsive design with timer and progress tracking
- **React 18** - React version with improved rendering and concurrent features
- **Vite** - Lightning-fast build tool and development server
- **TailwindCSS** - Utility-first CSS framework with extensive customization
- **React Router v6** - Declarative routing for React applications
- **Real-time Scoring** - Track your progress and see results instantly
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices

## 📋 Prerequisites

- Node.js (v14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```
   
2. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

## 🎮 How to Use

1. **Start the Application**: Run `npm start` to launch the development server
2. **Choose Your Quiz**: Select a category, difficulty level, and number of questions
3. **Take the Quiz**: Answer questions within the time limit and track your progress
4. **View Results**: See your score and review correct answers at the end

## 📁 Project Structure

```
quiz_panther/
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── ui/         # Base UI components (Button, Input, etc.)
│   │   └── ApiTestDemo.jsx  # API testing component
│   ├── pages/          # Page components
│   │   ├── quiz-setup/ # Quiz configuration page
│   │   ├── quiz-interface/ # Main quiz interface
│   │   └── results-summary/ # Results and scoring page
│   ├── services/       # API services
│   │   └── triviaApi.js # Open Trivia DB integration
│   ├── styles/         # Global styles and Tailwind configuration
│   ├── utils/          # Utility functions
│   ├── App.jsx         # Main application component
│   ├── Routes.jsx      # Application routes
│   └── index.jsx       # Application entry point
├── index.html          # HTML template
├── package.json        # Project dependencies and scripts
├── tailwind.config.js  # Tailwind CSS configuration
└── vite.config.mjs     # Vite configuration
```

## 🔧 API Integration

The application integrates with the Open Trivia Database API to fetch real trivia questions. The API service is located in `src/services/triviaApi.js` and provides:

- **fetchQuestions()** - Fetch questions with customizable parameters
- **fetchCategories()** - Get available question categories
- **Parameter validation** - Ensures valid API requests
- **Error handling** - Graceful handling of API failures

### API Parameters

- `amount`: Number of questions (1-50)
- `category`: Category ID (optional)
- `difficulty`: easy, medium, or hard
- `type`: multiple (multiple choice) or boolean (true/false)

### Example Usage

```javascript
import { fetchQuestions } from './services/triviaApi';

const result = await fetchQuestions({
  amount: 10,
  category: 19, // Science: Mathematics
  difficulty: 'medium',
  type: 'multiple'
});
```

## 🎨 Styling

This project uses Tailwind CSS for styling. The configuration includes:

- Forms plugin for form styling
- Typography plugin for text styling
- Aspect ratio plugin for responsive elements
- Container queries for component-specific responsive design
- Fluid typography for responsive text
- Animation utilities

## 📱 Responsive Design

The app is built with responsive design using Tailwind CSS breakpoints.


## 📦 Deployment

Build the application for production:

```bash
npm run build
```

## 🙏 Acknowledgments

- Powered by React and Vite
- Styled with Tailwind CSS

<<<<<<< HEAD
=======
Built with ❤️
>>>>>>> 43ebd9f (Update)
