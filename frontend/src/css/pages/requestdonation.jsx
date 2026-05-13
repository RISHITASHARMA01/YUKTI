import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';

const RequestDonation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const donation = location.state?.donation;

    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        message: '',
        contactNumber: '',
        quantityNeeded: ''
    });

    // If no donation data is passed, handle gracefully
    if (!donation) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div className="container" style={{ marginTop: '150px', flex: 1, textAlign: 'center' }}>
                    <h2>Donation Not Found</h2>
                    <p>It seems you navigated here without selecting a donation.</p>
                    <button className="btn btn-primary" onClick={() => navigate('/receive')}>Go Back</button>
                </div>
                <Footer />
            </div>
        );
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            // Update donation status to "Requested"
            await api.put(`/api/donations/${donation._id}/status`, { status: 'Requested' });
            alert('Your request for this donation has been sent to the donor!');
            navigate('/receive');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error submitting request. Please ensure you are logged in.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className="container" style={{ marginTop: '100px', flex: 1 }}>
                <div className="section-header center">
                    <h2 className="section-title">Request <span className="gradient-text">Donation</span></h2>
                    <p className="section-description">Provide details to request this specific food donation.</p>
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
                    
                    {/* Donation Summary */}
                    <div style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#ff6b35' }}>{donation.title || donation.food}</h4>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-box-open" style={{ width: '20px' }}></i> Available: {donation.quantity}</p>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-map-marker-alt" style={{ width: '20px' }}></i> Location: {donation.location}</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message to Donor</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="E.g. I can come pick this up in 30 mins..."
                                rows="3"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Quantity Needed (Optional)</label>
                            <input
                                type="text"
                                name="quantityNeeded"
                                value={formData.quantityNeeded}
                                onChange={handleChange}
                                placeholder={`If you need less than ${donation.quantity}`}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Your Contact Number</label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                placeholder="+91..."
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                            Send Request
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RequestDonation;