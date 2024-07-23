import React, { useState } from 'react';
import { TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Typography, Checkbox, Container, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BVLogo, POSButton, POSButtonTableNumber, CallServer, CheckIn, dealWithTableNumber, dealsWithOutTableNumber, InstagramFollow, Menu, scootersMenu, OrderHere, ReviewUs } from '../Images/ImageRepository';

const StyledForm = styled('form')({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  padding: '2rem',
  backgroundColor: '#f7f9fc',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const StyledButton = styled(Button)({
  marginTop: '1.5rem',
  padding: '0.75rem',
  fontSize: '1rem',
  fontWeight: 'bold',
});

const FormSection = styled('div')({
  marginBottom: '1rem',
});

const TableTechOrderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    design: '',
    businessName: '',
    logo: null,
    colorCode: '',
    requestProof: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      logo: e.target.files[0],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add form submission logic here
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img
          src={BVLogo}
          alt="Form preview"
          style={{
            display: 'block',
            margin: '0 auto 20px',
            maxWidth: '150px',
            height: 'auto',
          }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome! Thank You For Your Purchase!
        </Typography>
        <Typography variant="body1" component="p" gutterBottom>
          Please use this form to complete checkout and upload your logo!
        </Typography>
        <Typography variant="body2" component="p" color="textSecondary">
          Table-Tech Dimensions: 3.75” inches x 3.75” x 0.12” MDF Material (Stronger than Plywood) Sticks to any surface NFC Technology does not work on metal surfaces
        </Typography>
      </Box>
      <StyledForm onSubmit={handleSubmit}>
        <FormSection>
          <TextField
            label="First and Last Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormSection>
        <FormSection>
          <TextField
            label="Email (Same used with purchase)"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormSection>
        <FormSection>
          <TextField
            label="Shipping Address (Include State & Zip)"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormSection>
        <FormSection>
          <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend">Pick the Table-Tech design</FormLabel>
            <RadioGroup name="design" value={formData.design} onChange={handleChange} row>
              <FormControlLabel value="leaveReview" control={<Radio />} label={<img src={ReviewUs} alt="Leave Us A Review" style={{ width: '100px' }} />} />
              <FormControlLabel value="callServer" control={<Radio />} label={<img src={CallServer} alt="Don't Wait; Call Your Server" style={{ width: '100px' }} />} />
              <FormControlLabel value="genericLogo" control={<Radio />} label={<img src={POSButton} alt="Generic Logo" style={{ width: '100px' }} />} />
              <FormControlLabel value="actionButton" control={<Radio />} label={<img src={POSButtonTableNumber} alt="Action Button" style={{ width: '100px' }} />} />
              <FormControlLabel value="menu" control={<Radio />} label={<img src={Menu} alt="Menu" style={{ width: '100px' }} />} />
              <FormControlLabel value="menu" control={<Radio />} label={<img src={CheckIn} alt="Menu" style={{ width: '100px' }} />} />
              <FormControlLabel value="menu" control={<Radio />} label={<img src={dealWithTableNumber} alt="Menu" style={{ width: '100px' }} />} />
              <FormControlLabel value="menu" control={<Radio />} label={<img src={dealsWithOutTableNumber} alt="Menu" style={{ width: '100px' }} />} />
              <FormControlLabel value="menu" control={<Radio />} label={<img src={dealsWithOutTableNumber} alt="Menu" style={{ width: '100px' }} />} />
              <FormControlLabel value="menu" control={<Radio />} label={<img src={InstagramFollow} alt="Menu" style={{ width: '100px' }} />} />
              <FormControlLabel value="menu" control={<Radio />} label={<img src={scootersMenu} alt="Menu" style={{ width: '100px' }} />} />
              <FormControlLabel value="menu" control={<Radio />} label={<img src={OrderHere} alt="Menu" style={{ width: '100px' }} />} />
            </RadioGroup>
          </FormControl>
        </FormSection>
        <FormSection>
          <TextField
            label="Business Name"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormSection>
        <FormSection>
          <FormLabel component="legend">Upload Your Logo</FormLabel>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
          <Typography variant="body2" color="textSecondary">
            (Must be high quality; minimum of 1000x1000 pixels or better)
            <br />
            Note: Low-quality images may result in blurry prints. If the uploaded logo does not meet the quality requirements, we will use a default font for the design.
          </Typography>
        </FormSection>
        <FormSection>
          <TextField
            label="Enter the Preferred Color Code"
            name="colorCode"
            value={formData.colorCode}
            onChange={handleChange}
            fullWidth
            required
          />
        </FormSection>
        <FormSection>
          <FormControlLabel
            control={
              <Checkbox
                name="requestProof"
                checked={formData.requestProof}
                onChange={handleChange}
              />
            }
            label="Request Design Proof (see design before it enters production)"
          />
        </FormSection>
        <StyledButton type="submit" variant="contained" color="primary">
          Submit
        </StyledButton>
      </StyledForm>
    </Container>
  );
};

export default TableTechOrderForm;
