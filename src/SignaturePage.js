import React, { useState } from 'react';
import './App.css';
import { Base1YearOF } from './Images/ImageRepository';

const SignaturePage = () => {
  const [signature, setSignature] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signature submission here
    console.log('Signature submitted:', signature);
  };

  return (
    <div className="container">
      <h2>Signature Required for Submission of Base Package Order Form</h2>
      <div className="form-group">
        <p>This document authorizes BlueVerse to submit your 1 Year ase ackage order form <a href="/view-form" target="_blank" rel="noopener noreferrer">View form</a></p>
        <img src={Base1YearOF} alt="Form preview" className="form-preview" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Signature</label>
          <label htmlFor="signature">Type your full name</label>
          <input
            type="text"
            id="signature"
            name="signature"
            value={signature}
            onChange={handleSignatureChange}
            className="signature-input"
            required
          />
        </div>
        <div className="form-group checkbox-container">
          <input
            type="checkbox"
            id="agree"
            name="agree"
            checked={isChecked}
            onChange={handleCheckboxChange}
            required
          />
          <label htmlFor="agree">I agree to electronically sign this form.</label>
        </div>
        <div className="form-group button-container">
          <button type="button" className="cancel" onClick={() => window.history.back()}>Cancel</button>
          <input type="submit" value="Sign" />
        </div>
      </form>
    </div>
  );
};

export default SignaturePage;