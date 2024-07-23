import React, { useState } from 'react';
//import { useNavigate } from 'react-router-dom';
import '../App.css';
import { BVLogo } from '../Images/ImageRepository';

const OneYearBase = () => {
  const [formData, setFormData] = useState({
    contractTerm: 'Base Package 1-Year',
    processingFee: '3%',
    tableTechCost: '20',
    customerName: '',
    businessName: '',
    contactName: '',
    billingAddress: '',
    email: '',
    phone: '',
    customerSiteAddress: '',
    subscriptionFee: '85',
    implementationFee: 150, 
    tableTechQuantity: 1, 
    customerTitle: '',
    locations: '1 Location',
    sameAddress: false,
    isChecked: false
  });

 // const navigate = useNavigate();

  const calculateImplementationFee = (locations, tableTechQuantity) => {
    let baseImplementationFee;
    switch (locations) {
      case '1 Location':
        baseImplementationFee = 150;
        break;
      case '2 Locations':
        baseImplementationFee = 300;
        break;
      case '3 Locations':
        baseImplementationFee = 450;
        break;
      case '4 Locations':
        baseImplementationFee = 600;
        break;
      case '5+ Locations':
        baseImplementationFee = 750;  // Assuming special pricing, set to 0 for now
        break;
      default:
        baseImplementationFee = 150;
        break;
    }
    return baseImplementationFee + (tableTechQuantity - 1) * 20;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => {
      let newFormData = { ...prevData };

      if (type === 'checkbox') {
        newFormData[name] = checked;
        if (name === 'sameAddress') {
          newFormData.customerSiteAddress = checked ? prevData.billingAddress : prevData.customerSiteAddress;
        }
      } else if (name === 'locations') {
        newFormData[name] = value;
        newFormData.implementationFee = calculateImplementationFee(value, prevData.tableTechQuantity);
      } else if (name === 'tableTechQuantity') {
        const quantity = Math.max(1, Number(value));
        newFormData[name] = value ? quantity : value; // Keep the value if it's not empty
        newFormData.implementationFee = calculateImplementationFee(prevData.locations, quantity);
      } else {
        newFormData[name] = value;
      }

      return newFormData;
    });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === 'tableTechQuantity' && !value) {
      setFormData((prevData) => ({
        ...prevData,
        tableTechQuantity: 1,
        implementationFee: calculateImplementationFee(prevData.locations, 1)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formBody = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      formBody.append(key, formData[key]);
    });
    formBody.append('submissionDateTime', new Date().toISOString());

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

  const getTermsOfServiceLink = (contractTerm) => {
    if (contractTerm === 'Base Package 1-Year') {
      return 'https://docs.google.com/document/d/e/2PACX-1vRbxJaaE_ijGbyGv24WtwhtVlFsDMK3puYRuy9eQQEWdlh3dmkD4Dh7zAeBfLdsnbrKjOzrs_l2__n_/pub';
    } else if (contractTerm === 'Base Package 2-Year') {
      return 'https://docs.google.com/document/d/e/2PACX-1vS_K3etw5LsuPyDwHuedCQrrx40ZncMhNNoxS4Ax9gJY5urNAskKmMWzOAUTaytwOoZUTaHUUCof18X/pub';
    } else {
      return '#';
    }
  };

  const containerStyle = {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '5px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  };

  const formGroupStyle = {
    marginBottom: '15px',
    textAlign: 'left',
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '5px',
  };

  const inputStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  };

  const submitButtonStyle = {
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '5px',
    padding: '10px 20px',
    width: '100%',
    textAlign: 'center',
    margin: '0 auto',
  };

  const selectStyle = {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    boxSizing: 'border-box',
  };

  const descriptionStyle = {
    color: 'grey',
    fontSize: '12px',
    marginTop: '5px',
  };

  return (
    <div style={containerStyle}>
      <img
        src={BVLogo}
        alt="Form preview"
        style={{
          display: 'block',
          margin: '0 auto 20px',
          maxWidth: '100px',
          height: 'auto',
        }}
      />
      <h2>BlueVerse Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="contractTerm" style={labelStyle}>Contract Term</label>
          <select
            id="contractTerm"
            name="contractTerm"
            value={formData.contractTerm}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="Base Package 1-Year">Base Package 1-Year</option>
            <option value="Base Package 2-Year">Base Package 2-Year</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="locations" style={labelStyle}>Locations</label>
          <p style={descriptionStyle}>Select the number of locations.</p>
          <select
            id="locations"
            name="locations"
            value={formData.locations}
            onChange={handleChange}
            required
            style={selectStyle}
          >
            <option value="1 Location">1 Location</option>
            <option value="2 Locations">2 Locations</option>
            <option value="3 Locations">3 Locations</option>
            <option value="4 Locations">4 Locations</option>
            <option value="5+ Locations">5+ Locations</option>
          </select>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="customerName" style={labelStyle}>First and Last Name</label>
          <p style={descriptionStyle}>Enter your first and last name here.</p>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        {Object.keys(formData).map((key) => (
          key !== 'contractTerm' && key !== 'processingFee' && key !== 'tableTechCost' && key !== 'locations' && key !== 'billingAddress' && key !== 'customerSiteAddress' && key !== 'tableTechQuantity' && key !== 'subscriptionFee' && key !== 'implementationFee' && key !== 'sameAddress' && key !== 'isChecked' && key !== 'customerName' && (
            <div style={formGroupStyle} key={key}>
              <label htmlFor={key} style={labelStyle}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
              <p style={descriptionStyle}>
                {key === 'contactName' ? "BlueVerse representative's name" : key === 'email' ? "Enter the customer's email" : 
                key === 'phone' ? "Enter the customer's phone number" :
                key === 'customerTitle' ? "Enter the contact's position in the company" : `Enter the ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`}
              </p>
              <input
                type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          )
        ))}
        <div style={formGroupStyle}>
          <label htmlFor="billingAddress" style={labelStyle}>Billing Address</label>
          <p style={descriptionStyle}>Enter the customer's billing address.</p>
          <input
            type="text"
            id="billingAddress"
            name="billingAddress"
            value={formData.billingAddress}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="customerSiteAddress" style={labelStyle}>Customer Site Address</label>
          <p style={descriptionStyle}>Enter the customer's business site address.</p>
          <input
            type="text"
            id="customerSiteAddress"
            name="customerSiteAddress"
            value={formData.sameAddress ? formData.billingAddress : formData.customerSiteAddress}
            onChange={handleChange}
            required
            style={inputStyle}
            readOnly={formData.sameAddress}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="sameAddress" style={labelStyle}>
            <input
              type="checkbox"
              id="sameAddress"
              name="sameAddress"
              checked={formData.sameAddress}
              onChange={handleChange}
            /> Same as Billing Address
          </label>
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="tableTechQuantity" style={labelStyle}>Table Tech Quantity</label>
          <p style={descriptionStyle}>Enter the quantity of table tech in the order (default is the 1 complementary table tech).</p>
          <input
            type="number"
            id="tableTechQuantity"
            name="tableTechQuantity"
            value={formData.tableTechQuantity}
            onChange={handleChange}
            onBlur={handleBlur}
            min="1"
            required
            style={inputStyle}
          />
        </div>

        <div style={formGroupStyle}>
          <label htmlFor="isChecked" style={labelStyle}>
            <input
              type="checkbox"
              id="isChecked"
              name="isChecked"
              checked={formData.isChecked}
              onChange={handleChange}
              required
            /> I Agree to The <a href={getTermsOfServiceLink(formData.contractTerm)} target="_blank" rel="noopener noreferrer">Terms of Service</a>
          </label>
        </div>
        <div style={formGroupStyle}>
          <button
            type="submit"
            style={submitButtonStyle}
          >
            Continue to Payment!
          </button>
        </div>

        <input type="hidden" name="processingFee" value={formData.processingFee} />
        <input type="hidden" name="tableTechCost" value={formData.tableTechCost} />
        <input type="hidden" name="subscriptionFee" value={formData.subscriptionFee} />
        <input type="hidden" name="implementationFee" value={formData.implementationFee} />
      </form>
    </div>
  );
};

export default OneYearBase;
