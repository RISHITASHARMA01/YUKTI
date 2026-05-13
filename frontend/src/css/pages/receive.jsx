import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Receive = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('donations');
    const [searchTerm, setSearchTerm] = useState('');
    const [locationFilter, setLocationFilter] = useState('');

    // Real data for donations
    const [donations, setDonations] = useState([]);
    // Real data for requests
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                // Fetch both concurrently
                const [donationsRes, requestsRes] = await Promise.all([
                    api.get('/api/donations'),
                    api.get('/api/requests')
                ]);
                setDonations(donationsRes.data);
                setRequests(requestsRes.data);
            } catch (err) {
                console.error("Failed to fetch data:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className="container" style={{ marginTop: '100px', flex: 1 }}>
                <div className="section-header center">
                    <h2 className="section-title">Find <span className="gradient-text">Food</span> & Needs</h2>
                    <p className="section-description">Browse available food donations or fulfill food requests.</p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                    <button 
                        onClick={() => setActiveTab('donations')}
                        className={`btn ${activeTab === 'donations' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '10px 30px' }}
                    >
                        Available Donations
                    </button>
                    <button 
                        onClick={() => setActiveTab('requests')}
                        className={`btn ${activeTab === 'requests' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '10px 30px' }}
                    >
                        Food Requests
                    </button>
                </div>

                {/* Filters */}
                <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '0 15px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', flex: '1', minWidth: '250px', maxWidth: '400px' }}>
                        <i className="fas fa-search" style={{ color: '#ff6b35' }}></i>
                        <input 
                            type="text" 
                            placeholder={`Search ${activeTab === 'donations' ? 'food item' : 'requests'}...`}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            style={{ border: 'none', padding: '12px', width: '100%', outline: 'none', background: 'transparent' }}
                        />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'white', padding: '0 15px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', flex: '1', minWidth: '200px', maxWidth: '300px' }}>
                        <i className="fas fa-map-marker-alt" style={{ color: '#ff6b35' }}></i>
                        <input 
                            type="text" 
                            placeholder="Filter by location"
                            value={locationFilter}
                            onChange={(e) => setLocationFilter(e.target.value)}
                            style={{ border: 'none', padding: '12px', width: '100%', outline: 'none', background: 'transparent' }}
                        />
                    </div>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '50px 0' }}>Loading data...</div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                        {activeTab === 'donations' && donations
                            .filter(item => (item.title || item.food || '').toLowerCase().includes(searchTerm.toLowerCase()) && item.location.toLowerCase().includes(locationFilter.toLowerCase()))
                            .map(item => (
                            <div key={item._id || item.id} style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                    <div style={{ width: '50px', height: '50px', background: '#fff5f2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b35', fontSize: '20px' }}>
                                        <i className="fas fa-utensils"></i>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{item.title || item.food}</h3>
                                        <p style={{ fontSize: '14px', color: '#6b6b8c', margin: 0 }}>
                                            {item.date ? new Date(item.date).toLocaleDateString() : item.time}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-box-open" style={{ width: '20px', color: '#ff6b35' }}></i> {item.quantity}</p>
                                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-map-marker-alt" style={{ width: '20px', color: '#ff6b35' }}></i> {item.location}</p>
                                </div>
                                <button 
                                    onClick={() => navigate('/request-donation', { state: { donation: item } })}
                                    className="btn btn-secondary" 
                                    style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}
                                >
                                    Request This
                                </button>
                            </div>
                        ))}

                        {activeTab === 'requests' && requests
                            .filter(item => (item.title || '').toLowerCase().includes(searchTerm.toLowerCase()) && item.location.toLowerCase().includes(locationFilter.toLowerCase()))
                            .map(item => (
                            <div key={item._id || item.id} style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                                    <div style={{ width: '50px', height: '50px', background: '#f2f6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3571ff', fontSize: '20px' }}>
                                        <i className="fas fa-hand-holding-heart"></i>
                                    </div>
                                    <div>
                                        <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>{item.title}</h3>
                                        <p style={{ fontSize: '14px', color: '#6b6b8c', margin: 0 }}>
                                            {item.date ? new Date(item.date).toLocaleDateString() : item.time}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-info-circle" style={{ width: '20px', color: '#3571ff' }}></i> {item.description || item.desc}</p>
                                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-box-open" style={{ width: '20px', color: '#3571ff' }}></i> {item.quantityNeeded || item.quantity}</p>
                                    <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-map-marker-alt" style={{ width: '20px', color: '#3571ff' }}></i> {item.location}</p>
                                </div>
                                <button 
                                    onClick={() => navigate('/fulfill-request', { state: { request: item } })}
                                    className="btn btn-primary" 
                                    style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}
                                >
                                    Fulfill Request
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Receive;