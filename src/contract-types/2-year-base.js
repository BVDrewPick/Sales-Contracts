import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { BVLogo } from '../Images/ImageRepository';

const TwoYearBase = () => {
  const [formData, setFormData] = useState({
    contractTerm: 'BlueVerse SaaS Agreement Base Package 2-Year',
    processingFee: '3%',
    tableTechCost: '$20 Per Table Tech',
    businessName: '',
    customerName: '',
    contactName: '',
    billingAddress: '',
    email: '',
    phone: '',
    customerSiteAddress: '',
    subscriptionFee: '$85',
    implementationFee: '$150',
    tableTechQuantity: '1',
    customerTitle: '',
    locations: '1 Location',
    sameAddress: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === 'checkbox') {
      if (name === 'sameAddress') {
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
          customerSiteAddress: checked ? prevData.billingAddress : prevData.customerSiteAddress,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: checked,
        }));
      }
    } else if (name === 'locations') {
      let subscriptionFee;
      let implementationFee;

      switch (value) {
        case '1 Location':
          subscriptionFee = '$85';
          implementationFee = '$150';
          break;
        case '2 Locations':
          subscriptionFee = '$145';
          implementationFee = '$300';
          break;
        case '3 Locations':
          subscriptionFee = '$205';
          implementationFee = '$450';
          break;
        case '4 Locations':
          subscriptionFee = '$265';
          implementationFee = '$600';
          break;
        case '5+ Locations':
          subscriptionFee = 'Please contact a representative for Enterprise Pricing';
          implementationFee = 'Please contact a representative for Enterprise Pricing';
          break;
        default:
          subscriptionFee = '$85';
          implementationFee = '$150';
          break;
      }

      setFormData({
        ...formData,
        [name]: value,
        subscriptionFee,
        implementationFee,
      });
    } else if (name === 'tableTechQuantity') {
      const quantity = Math.max(1, value);
      const additionalTableTechCost = (quantity - 1) * 20;
      const newImplementationFee = 150 + additionalTableTechCost;

      setFormData({
        ...formData,
        [name]: quantity,
        implementationFee: `$${newImplementationFee}`,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/signature', { state: formData });
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

  const readOnlyInputStyle = {
    ...inputStyle,
    backgroundColor: '#e9ecef',
    color: '#6c757d',
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
      <h2>BlueVerse Base Package 2-Year Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label htmlFor="contractTerm" style={labelStyle}>Contract Term</label>
          <input
            type="text"
            id="contractTerm"
            name="contractTerm"
            value={formData.contractTerm}
            readOnly
            style={readOnlyInputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="processingFee" style={labelStyle}>Processing Fee</label>
          <input
            type="text"
            id="processingFee"
            name="processingFee"
            value={formData.processingFee}
            readOnly
            style={readOnlyInputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="tableTechCost" style={labelStyle}>Equipment</label>
          <input
            type="text"
            id="tableTechCost"
            name="tableTechCost"
            value={formData.tableTechCost}
            readOnly
            style={readOnlyInputStyle}
          />
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
        {Object.keys(formData).map((key) => (
          key !== 'contractTerm' && key !== 'processingFee' && key !== 'tableTechCost' && key !== 'locations' && key !== 'billingAddress' && key !== 'customerSiteAddress' && key !== 'tableTechQuantity' && key !== 'subscriptionFee' && key !== 'implementationFee' && key !== 'sameAddress' && (
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
            min="1"
            required
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="subscriptionFee" style={labelStyle}>Subscription Fee</label>
          <input
            type="text"
            id="subscriptionFee"
            name="subscriptionFee"
            value={formData.subscriptionFee}
            readOnly
            style={readOnlyInputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <label htmlFor="implementationFee" style={labelStyle}>Implementation Fee</label>
          <input
            type="text"
            id="implementationFee"
            name="implementationFee"
            value={formData.implementationFee}
            readOnly
            style={readOnlyInputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <button
            type="submit"
            style={submitButtonStyle}
          >
            Submit Order
          </button>
        </div>
      </form>
    </div>
  );
};

export default TwoYearBase;
