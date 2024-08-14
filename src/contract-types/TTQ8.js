import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// ContactFormQ8 Component
export function ContactFormQ8() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        businessAddress: "",
        quantity:"8",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            // Store form data in localStorage
            localStorage.setItem('contactFormData', JSON.stringify({
                ...formData,
                submissionDateTime: new Date().toISOString()
            }));

            // Google Ads Conversion Tracking (if still needed at this stage)
            window.gtag('event', 'conversion', {
                send_to: 'AW-16635514632/izEiCI64ksUZEIiet_w9',
            });

            // Redirect to ReactStickerDesigner
            navigate('/tabletech/checkout/design');
        } catch (error) {
            console.error('Error saving form data:', error);
            setError(`An error occurred: ${error.message}. Please try again.`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const styles = {
        formContainer: {
            maxWidth: '500px',
            margin: '0 auto',
            padding: '20px',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        formHeading: {
            textAlign: 'center',
            color: '#333',
            marginBottom: '20px',
        },
        formGroup: {
            marginBottom: '15px',
        },
        label: {
            display: 'block',
            marginBottom: '5px',
            color: '#555',
        },
        input: {
            width: '100%',
            padding: '8px',
            border: '1px solid #ddd',
            borderRadius: '4px',
            fontSize: '16px',
        },
        submitButton: {
            width: '100%',
            padding: '10px',
            backgroundColor: '#4A90E2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        errorMessage: {
            color: '#d32f2f',
            marginBottom: '15px',
            textAlign: 'center',
        },
    };

    return (
        <div style={styles.formContainer}>
            <h2 style={styles.formHeading}>Contact Information</h2>
            {error && <div style={styles.errorMessage}>{error}</div>}
            <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>First and Last Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="phone" style={styles.label}>Phone Number</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="businessName" style={styles.label}>Business Name</label>
                    <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="businessAddress" style={styles.label}>Business Address</label>
                    <input
                        type="text"
                        id="businessAddress"
                        name="businessAddress"
                        value={formData.businessAddress}
                        onChange={handleChange}
                        required
                        style={styles.input}
                    />
                </div>
                <button 
                    type="submit" 
                    style={{
                        ...styles.submitButton,
                        backgroundColor: isSubmitting ? '#ccc' : '#4A90E2',
                        cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    }} 
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Submitting..." : "Continue to Customize"}
                </button>
            </form>
        </div>
    );
}