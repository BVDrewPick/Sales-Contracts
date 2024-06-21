import React, { useState } from 'react';
import '../App.css';

const OneYearTableTech = () => {
  const [formData, setFormData] = useState({
    customerName: '',
    contactName: '',
    billingAddress: '',
    email: '',
    phone: '',
    customerSite: '',
    equipment: '',
    maintenanceFee: '',
  });

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
  };

  return (
    <div className="container">
      <h2>BlueVerse Table Tech 1-Year Order Form</h2>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
          <label htmlFor="contractTerm">Contract Term</label>
          <input
            type="text"
            id="contractTerm"
            name="contractTerm"
            value="BlueVerse Table Tech 1-Year Agreement"
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

export default OneYearTableTech;