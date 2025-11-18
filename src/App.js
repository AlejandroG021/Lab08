// src/App.js
import React, { useState } from 'react';
import './App.css';
import Quiz from './components/Quiz.js';
import HomePage from './components/HomePage.js';
import ResultsPage from './components/ResultsPage.js';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [scoreData, setScoreData] = useState(null);

  const handleNavigation = (page, data = null) => {
    setCurrentPage(page);
    if (data) {
      setScoreData(data);
    }
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigation} />;
      case 'quiz':
        return <Quiz onNavigate={handleNavigation} />;
      case 'results':
        return <ResultsPage scoreData={scoreData} onNavigate={handleNavigation} />;
      default:
        return <HomePage onNavigate={handleNavigation} />;
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {renderPage()}
      </header>
    </div>
  );
}

export default App;