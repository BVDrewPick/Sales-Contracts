import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga';
import './App.css';
import OneYearBase from './contract-types/1-year-base';
import { ContactForm } from './contract-types/1-year-TTQ1';
import { ContactFormQ2 } from './contract-types/TTQ2';
import ReactStickerDesigner from './contract-types/CustomTTQ1';
import { ContactFormQ3 } from './contract-types/TTQ3';
import { ContactFormQ4 } from './contract-types/TTQ4';
import { ContactFormQ5 } from './contract-types/TTQ5';

const trackingId = 'G-E6M7CFVVWZ';

ReactGA.initialize(trackingId);

const ContactFormWrapper = ({ Component }) => {
  const navigate = useNavigate();

  const handleFormSubmitSuccess = () => {
    navigate('/tabletech/checkout/design');
  };

  return <Component onFormSubmitSuccess={handleFormSubmitSuccess} />;
};

const App = () => {
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  }, []);

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<OneYearBase />} />
          <Route path="/tabletech/checkout/contactform/1" element={<ContactFormWrapper Component={ContactForm} />} />
          <Route path="/tabletech/checkout/contactform/2" element={<ContactFormWrapper Component={ContactFormQ2} />} />
          <Route path="/tabletech/checkout/contactform/3" element={<ContactFormWrapper Component={ContactFormQ3} />} />
          <Route path="/tabletech/checkout/contactform/4" element={<ContactFormWrapper Component={ContactFormQ4} />} />
          <Route path="/tabletech/checkout/contactform/5" element={<ContactFormWrapper Component={ContactFormQ5} />} />
          <Route path="/tabletech/checkout/design" element={<ReactStickerDesigner />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;