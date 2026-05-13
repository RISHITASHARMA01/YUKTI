import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
    const { user, loading: authLoading } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState('donations');
    const [myDonations, setMyDonations] = useState([]);
    const [myRequests, setMyRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Redirect to login if unauthenticated
        if (!authLoading && !user) {
            navigate('/auth');
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        const fetchUserData = async () => {
            if (!user) return;
            setLoading(true);
            try {
                const [donationsRes, requestsRes] = await Promise.all([
                    api.get('/api/donations/my-donations'),
                    api.get('/api/requests/my-requests')
                ]);
                setMyDonations(donationsRes.data);
                setMyRequests(requestsRes.data);
            } catch (err) {
                console.error("Failed to fetch dashboard data:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [user]);

    const handleUpdateStatus = async (id, type, newStatus) => {
        try {
            await api.put(`/api/${type}/${id}/status`, { status: newStatus });
            
            // Update local state to reflect changes instantly
            if (type === 'donations') {
                setMyDonations(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
            } else {
                setMyRequests(prev => prev.map(item => item._id === id ? { ...item, status: newStatus } : item));
            }
        } catch (err) {
            console.error("Failed to update status", err);
            alert("Error updating status. Please try again.");
        }
    };

    if (authLoading || loading) {
        return (
            <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
                <Navbar />
                <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <p>Loading your dashboard...</p>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className="container" style={{ marginTop: '100px', flex: 1 }}>
                <div className="section-header center">
                    <h2 className="section-title">My <span className="gradient-text">Dashboard</span></h2>
                    <p className="section-description">Manage your active listings and update their statuses.</p>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px' }}>
                    <button 
                        onClick={() => setActiveTab('donations')}
                        className={`btn ${activeTab === 'donations' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '10px 30px' }}
                    >
                        My Donations
                    </button>
                    <button 
                        onClick={() => setActiveTab('requests')}
                        className={`btn ${activeTab === 'requests' ? 'btn-primary' : 'btn-secondary'}`}
                        style={{ padding: '10px 30px' }}
                    >
                        My Requests
                    </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
                    {activeTab === 'donations' && myDonations.map(item => (
                        <div key={item._id} style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold', background: item.status === 'Available' ? '#e6ffe6' : item.status === 'Requested' ? '#fff4e6' : '#f0f0f0', color: item.status === 'Available' ? '#00b300' : item.status === 'Requested' ? '#ff8e53' : '#666' }}>
                                {item.status}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', marginTop: '10px' }}>
                                <div style={{ width: '50px', height: '50px', background: '#fff5f2', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ff6b35', fontSize: '20px' }}>
                                    <i className="fas fa-utensils"></i>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', paddingRight: '60px' }}>{item.title || item.food}</h3>
                                    <p style={{ fontSize: '12px', color: '#6b6b8c', margin: 0 }}>
                                        {new Date(item.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-box-open" style={{ width: '20px', color: '#ff6b35' }}></i> {item.quantity}</p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-map-marker-alt" style={{ width: '20px', color: '#ff6b35' }}></i> {item.location}</p>
                            </div>
                            
                            {item.status !== 'Completed' && (
                                <button 
                                    onClick={() => handleUpdateStatus(item._id, 'donations', 'Completed')}
                                    className="btn btn-primary" 
                                    style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}
                                >
                                    Mark as Completed
                                </button>
                            )}
                        </div>
                    ))}

                    {activeTab === 'requests' && myRequests.map(item => (
                        <div key={item._id} style={{ background: 'white', padding: '25px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '15px', right: '15px', padding: '5px 10px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold', background: item.status === 'Open' ? '#eef4ff' : item.status === 'Fulfilled' ? '#e6ffe6' : '#f0f0f0', color: item.status === 'Open' ? '#3571ff' : item.status === 'Fulfilled' ? '#00b300' : '#666' }}>
                                {item.status}
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px', marginTop: '10px' }}>
                                <div style={{ width: '50px', height: '50px', background: '#f2f6ff', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3571ff', fontSize: '20px' }}>
                                    <i className="fas fa-hand-holding-heart"></i>
                                </div>
                                <div>
                                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0', paddingRight: '60px' }}>{item.title}</h3>
                                    <p style={{ fontSize: '12px', color: '#6b6b8c', margin: 0 }}>
                                        {new Date(item.date).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-info-circle" style={{ width: '20px', color: '#3571ff' }}></i> {item.description || item.desc}</p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-box-open" style={{ width: '20px', color: '#3571ff' }}></i> {item.quantityNeeded || item.quantity}</p>
                                <p style={{ margin: '5px 0', fontSize: '14px', color: '#4a4a68' }}><i className="fas fa-map-marker-alt" style={{ width: '20px', color: '#3571ff' }}></i> {item.location}</p>
                            </div>

                            {item.status !== 'Completed' && item.status !== 'Fulfilled' && (
                                <button 
                                    onClick={() => handleUpdateStatus(item._id, 'requests', 'Completed')}
                                    className="btn btn-primary" 
                                    style={{ width: '100%', justifyContent: 'center', fontSize: '14px' }}
                                >
                                    Mark as Completed
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty States */}
                {activeTab === 'donations' && myDonations.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '50px 0', color: '#666' }}>
                        <i className="fas fa-box-open" style={{ fontSize: '40px', color: '#ddd', marginBottom: '15px' }}></i>
                        <p>You haven't posted any food donations yet.</p>
                        <button onClick={() => navigate('/donate')} className="btn btn-primary" style={{ marginTop: '15px' }}>Donate Now</button>
                    </div>
                )}
                
                {activeTab === 'requests' && myRequests.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '50px 0', color: '#666' }}>
                        <i className="fas fa-hand-holding-heart" style={{ fontSize: '40px', color: '#ddd', marginBottom: '15px' }}></i>
                        <p>You haven't posted any food requests yet.</p>
                        <button onClick={() => navigate('/request-food')} className="btn btn-primary" style={{ marginTop: '15px' }}>Request Food</button>
                    </div>
                )}

            </div>
            <Footer />
        </div>
    );
};

export default Dashboard;