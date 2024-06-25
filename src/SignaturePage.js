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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formBody = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      formBody.append(key, formData[key]);
    });
    formBody.append('signature', signature);

    try {
      const response = await fetch(process.env.REACT_APP_ZAPIER_HOOK_URL, {
        method: 'POST',
        body: formBody,
        mode: 'no-cors',
      });

      console.log('Response:', response);

      const tableTechQuantity = parseInt(formData.tableTechQuantity, 10);
      let redirectUrl = '';

      switch (formData.locations) {
        case '1 Location':
          redirectUrl = tableTechQuantity === 1 
            ? 'https://buy.stripe.com/fZe00Nd4wgHI01O01G' 
            : 'https://buy.stripe.com/6oE00N5C4crsaGseWB';
          break;
        case '2 Locations':
          redirectUrl = tableTechQuantity === 1 
            ? 'https://buy.stripe.com/9AQ7tf0hKfDE9Co01J' 
            : 'https://buy.stripe.com/3csfZL7KcezA6qccOu';
          break;
        case '3 Locations':
          redirectUrl = tableTechQuantity === 1 
            ? 'https://buy.stripe.com/7sI9Bn7KcgHI9Cog0I' 
            : 'https://buy.stripe.com/aEUaFrggIcrsdSEbKt';
          break;
        case '4 Locations':
          redirectUrl = tableTechQuantity === 1 
            ? 'https://buy.stripe.com/3cs5l7aWogHIg0MbKw' 
            : 'https://buy.stripe.com/bIY28V8Ogajk29W9Cp';
          break;
        case '5+ Locations':
          redirectUrl = 'https://buy.stripe.com/6oE7tf4y0bno3e0g04';
          break;
        default:
          console.error('Unknown location');
          break;
      }

      window.location.href = redirectUrl;

    } catch (error) {
      console.error('Error submitting the form:', error);
    }
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
