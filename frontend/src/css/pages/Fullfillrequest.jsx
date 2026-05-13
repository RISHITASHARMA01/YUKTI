import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';

const FulfillRequest = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const request = location.state?.request;

    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        message: '',
        contactNumber: '',
        quantitySupplying: ''
    });

    // If no request data is passed, handle gracefully
    if (!request) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div className="container" style={{ marginTop: '150px', flex: 1, textAlign: 'center' }}>
                    <h2>Request Not Found</h2>
                    <p>It seems you navigated here without selecting a food request.</p>
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
            await api.put(`/api/requests/${request._id}/status`, { status: 'Fulfilled' });
            alert('Your offer to fulfill this request has been sent!');
            navigate('/receive');
        } catch (err) {
            setError(err.response?.data?.msg || 'Error submitting fulfillment. Please ensure you are logged in.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className="container" style={{ marginTop: '100px', flex: 1 }}>
                <div className="section-header center">
                    <h2 className="section-title">Fulfill <span className="gradient-text">Request</span></h2>
                    <p className="section-description">Provide details to help fulfill this food request.</p>
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

                    {/* Request Summary */}
                    <div style={{ marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '12px', border: '1px solid #e9ecef' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#3571ff' }}>{request.title}</h4>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-info-circle" style={{ width: '20px' }}></i> {request.description || request.desc}</p>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-box-open" style={{ width: '20px' }}></i> Needed: {request.quantityNeeded || request.quantity}</p>
                        <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-map-marker-alt" style={{ width: '20px' }}></i> Location: {request.location}</p>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message to Requester</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="E.g. I can provide the 50 servings and drop them off today."
                                rows="3"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Quantity You Can Supply</label>
                            <input
                                type="text"
                                name="quantitySupplying"
                                value={formData.quantitySupplying}
                                onChange={handleChange}
                                placeholder={`E.g. Full ${request.quantity} or partial amount`}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
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
                            Submit Fulfillment
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default FulfillRequest;
