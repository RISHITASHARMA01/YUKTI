import React, { useState, useEffect } from 'react';
import api from '../api';

const LiveStats = () => {
    const [stats, setStats] = useState({
        users: 0,
        donations: { total: 0, available: 0, completed: 0 },
        requests: { total: 0, open: 0, fulfilled: 0 }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await api.get('/api/stats');
                setStats(res.data);
            } catch (err) {
                console.error("Failed to fetch live stats", err);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    if (loading) return null;

    return (
        <section className="stats-section" style={{ padding: '40px 0', background: '#fff', borderTop: '1px solid #eee' }}>
            <div className="container">
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '30px' }}>
                    
                    {/* Stat Card 1 */}
                    <div style={{ background: '#fffcfb', border: '1px solid #ffe8df', borderRadius: '20px', padding: '30px', textAlign: 'center', minWidth: '220px', flex: '1', boxShadow: '0 10px 30px rgba(255,107,53,0.05)' }}>
                        <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: 'white', fontSize: '24px' }}>
                            <i className="fas fa-users"></i>
                        </div>
                        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 5px 0' }}>{stats.users}</h2>
                        <p style={{ margin: 0, color: '#6b6b8c', fontSize: '15px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Active Members</p>
                    </div>

                    {/* Stat Card 2 */}
                    <div style={{ background: '#f5f8ff', border: '1px solid #e1ebff', borderRadius: '20px', padding: '30px', textAlign: 'center', minWidth: '220px', flex: '1', boxShadow: '0 10px 30px rgba(53,113,255,0.05)' }}>
                        <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #3571ff 0%, #5b8cff 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: 'white', fontSize: '24px' }}>
                            <i className="fas fa-box-open"></i>
                        </div>
                        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 5px 0' }}>{stats.donations.total}</h2>
                        <p style={{ margin: 0, color: '#6b6b8c', fontSize: '15px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Meals Donated</p>
                    </div>

                    {/* Stat Card 3 */}
                    <div style={{ background: '#f5fff5', border: '1px solid #e1ffe1', borderRadius: '20px', padding: '30px', textAlign: 'center', minWidth: '220px', flex: '1', boxShadow: '0 10px 30px rgba(0,179,0,0.05)' }}>
                        <div style={{ width: '60px', height: '60px', background: 'linear-gradient(135deg, #00cc00 0%, #33ff33 100%)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 15px', color: 'white', fontSize: '24px' }}>
                            <i className="fas fa-hand-holding-heart"></i>
                        </div>
                        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 5px 0' }}>{stats.requests.fulfilled}</h2>
                        <p style={{ margin: 0, color: '#6b6b8c', fontSize: '15px', fontWeight: '500', textTransform: 'uppercase', letterSpacing: '1px' }}>Requests Fulfilled</p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default LiveStats;