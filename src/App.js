import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import OneYearBase from './contract-types/1-year-base';
import OneYearTableTech from './contract-types/1-year-TT';
import TwoYearBase from './contract-types/2-year-base';
import TwoYearTableTech from './contract-types/2-year-TT';
import SignaturePage from './SignaturePage';
import { BVLogo } from './Images/ImageRepository';

const App = () => {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <img
                  src={BVLogo}
                  alt="Form preview"
                  style={{
                    display: 'block',
                    margin: '0 auto 20px',
                    maxWidth: '150px',
                    height: 'auto'
                  }}
                />
                <h2>Select a Package</h2>
                <Link to="/1-year-base">
                  <button>BlueVerse SaaS Agreement Base Package 1-Year</button>
                </Link>
                <Link to="/2-year-base">
                  <button>BlueVerse SaaS Agreement Base Package 2-Year</button>
                </Link>
               { /* <Link to="/1-year-table-tech">
                  <button>BlueVerse SaaS Agreement Table Tech 1-Year</button>
                </Link>
                <Link to="/2-year-table-tech">
                  <button>BlueVerse SaaS Agreement Table Tech 2-Year</button>
                </Link> */}
              </div>
            }
          />
          <Route path="/1-year-base" element={<OneYearBase />} />
          <Route path="/1-year-table-tech" element={<OneYearTableTech />} />
          <Route path="/2-year-base" element={<TwoYearBase />} />
          <Route path="/2-year-table-tech" element={<TwoYearTableTech />} />
          <Route path="/signature" element={<SignaturePage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
