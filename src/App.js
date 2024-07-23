import React from 'react';
import { BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import OneYearBase from './contract-types/1-year-base';

const App = () => {
  return (
    <Router>
      <div className="container">
        <OneYearBase />
      </div>
    </Router>
  );
};

export default App;
