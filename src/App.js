import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';
import './App.css';
import OneYearBase from './contract-types/1-year-base';

const trackingId = 'G-E6M7CFVVWZ'; // Replace with your Google Analytics tracking ID

ReactGA.initialize(trackingId);

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <div className="container">
        <OneYearBase />
      </div>
    </Router>
  );
};

export default App;
