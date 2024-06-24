import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import { Base1YearOF } from './Images/ImageRepository';

const SignaturePage = () => {
  const { state: formData } = useLocation();
  const [signature, setSignature] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  const handleSignatureChange = (e) => {
    setSignature(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formBody = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      formBody.append(key, formData[key]);
    });
    formBody.append('signature', signature);

    fetch('https://hooks.zapier.com/hooks/catch/16953346/2bhk0it/', {
      method: 'POST',
      body: formBody,
    })
      .then((response) => {
        if (response.ok) {
          if (parseInt(formData.tableTechQuantity, 10) > 0) {
            window.location.href = 'https://buy.stripe.com/fZeeVH1lO3UW01O01q';
          } else {
            console.log('Form submitted successfully');
            window.location.href = 'https://buy.stripe.com/cN228Vc0s4Z001O29H'
          }
        } else {
          console.error('Error submitting the form');
        }
      })
      .catch((error) => {
        console.error('Error submitting the form:', error);
      });
  };

  return (
    <div className="container">
      <h2>Signature Required for Submission of Base Package Order Form</h2>
      <div className="form-group">
        <p>This document authorizes BlueVerse to submit your 1 Year Base Package order form <a href="https://docs.google.com/document/d/e/2PACX-1vRbxJaaE_ijGbyGv24WtwhtVlFsDMK3puYRuy9eQQEWdlh3dmkD4Dh7zAeBfLdsnbrKjOzrs_l2__n_/pub" target="_blank" rel="noopener noreferrer">View form</a></p>
        <img src={Base1YearOF} alt="Form preview" className="form-preview" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="signature">Signature</label>
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
