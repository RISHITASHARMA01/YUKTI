import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { AuthContext } from '../context/AuthContext';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState('');
    const { login, register } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                await login(formData.email, formData.password);
            } else {
                await register(formData.username, formData.email, formData.password);
            }
            navigate('/receive'); // Redirect to the receive/dashboard page upon successful auth
        } catch (err) {
            setError(err.response?.data?.msg || 'Authentication failed. Please try again.');
        }
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <div className="container" style={{ marginTop: '100px', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: '100%', maxWidth: '450px', background: 'white', padding: '40px', borderRadius: '30px', boxShadow: '0 20px 60px rgba(0,0,0,0.1)' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>
                        {isLogin ? 'Welcome Back' : 'Join the Movement'}
                    </h2>

                    {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '15px' }}>{error}</p>}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {!isLogin && (
                            <input 
                                type="text" 
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Full Name" 
                                style={{ padding: '15px', borderRadius: '12px', border: '1px solid #ddd', background: '#f9f9f9' }} 
                                required
                            />
                        )}
                        <input 
                            type="email" 
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address" 
                            style={{ padding: '15px', borderRadius: '12px', border: '1px solid #ddd', background: '#f9f9f9' }} 
                            required
                        />
                        <input 
                            type="password" 
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password" 
                            style={{ padding: '15px', borderRadius: '12px', border: '1px solid #ddd', background: '#f9f9f9' }} 
                            required
                        />

                        <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '15px', marginTop: '10px' }}>
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
                        {isLogin ? "Don't have an account? " : "Already have an account? "}
                        <span
                            onClick={() => { setIsLogin(!isLogin); setError(''); }}
                            style={{ color: '#ff6b35', fontWeight: '600', cursor: 'pointer' }}
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </span>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Auth;