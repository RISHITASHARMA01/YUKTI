import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../api';

const RequestFood = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        quantityNeeded: '',
        location: '',
        requesterPhone: '',
        imageUrl: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            await api.post('/api/requests', formData);
            setSuccess('Your food request has been submitted successfully!');
            setFormData({
                title: '',
                description: '',
                quantityNeeded: '',
                location: '',
                requesterPhone: '',
                imageUrl: ''
            });
        } catch (err) {
            setError(err.response?.data?.msg || 'Error submitting request. Please try again.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className="container" style={{ marginTop: '100px', flex: 1 }}>
                <div className="section-header center">
                    <h2 className="section-title">Request <span className="gradient-text">Food</span></h2>
                    <p className="section-description">Fill out the details below if you or your community are in need of food assistance.</p>
                </div>

                <div style={{ maxWidth: '600px', margin: '0 auto', background: 'white', padding: '40px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}
                    {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '15px' }}>{success}</p>}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Request Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Need Rice and Dal for 50 people"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Description & Reason</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Please provide some context..."
                                rows="3"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Quantity Needed</label>
                            <input
                                type="text"
                                name="quantityNeeded"
                                value={formData.quantityNeeded}
                                onChange={handleChange}
                                placeholder="e.g. 50 servings, 10 kgs"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Delivery/Pickup Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="Enter specific area/address"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Contact Number</label>
                            <input
                                type="tel"
                                name="requesterPhone"
                                value={formData.requesterPhone}
                                onChange={handleChange}
                                placeholder="+91..."
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: '100%', justifyContent: 'center' }}>
                            Submit Request
                        </button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RequestFood;