import React from "react";
import { HashRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import ResultsSummary from './pages/results-summary';
import QuizSetup from './pages/quiz-setup';
import QuizInterface from './pages/quiz-interface';

const Routes = () => {
  return (
    <HashRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          {/* Define your route here */}
          <Route path="/" element={<QuizSetup />} />
          <Route path="/results-summary" element={<ResultsSummary />} />
          <Route path="/quiz-setup" element={<QuizSetup />} />
          <Route path="/quiz-interface" element={<QuizInterface />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </HashRouter>
  );
};

export default Routes;
