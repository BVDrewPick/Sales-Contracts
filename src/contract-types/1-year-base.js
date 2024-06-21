import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const OneYearBase = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    contactName: '',
    billingAddress: '',
    email: '',
    phone: '',
    customerSiteAddress: '',
    subscriptionFee: '',
    implementationFee: '',
    //equipment: '',
    tableTechQuantity:'',
    todaysDate:'',
    customerTitle:'',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission here
    console.log('Form submitted:', formData);
    navigate('/signature');
  };

  return (
    <div className="container">
      <h2>BlueVerse Base Package 1-Year Order Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="contractTerm">Contract Term</label>
          <input
            type="text"
            id="contractTerm"
            name="contractTerm"
            value="BlueVerse SaaS Agreement Base Package 1-Year"
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="processingFee">Processing Fee</label>
          <input
            type="text"
            id="processingFee"
            name="processingFee"
            value="3%"
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="tableTechCost">Equipment</label>
          <input
            type="text"
            id="tableTechCost"
            name="tableTechCost"
            value="$25 Per Table Tech"
            readOnly
          />
        </div>
        {Object.keys(formData).map((key) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
            <input
              type={key === 'email' ? 'email' : key === 'phone' ? 'tel' : 'text'}
              id={key}
              name={key}
              value={formData[key]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <div className="form-group">
          <input type="submit" value="Submit Order" />
        </div>
      </form>
    </div>
  );
};

export default OneYearBase;