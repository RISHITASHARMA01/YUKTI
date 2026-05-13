import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="nav-content">
                    <Link to="/" className="logo">
                        <div className="logo-circle">
                            <i className="fas fa-heart"></i>
                        </div>
                        <span className="logo-text">Yukti — युक्ति</span>
                    </Link>
                    <div className="nav-menu">
                        <a href="/#about" className="nav-link">About</a>
                        <a href="/#features" className="nav-link">Features</a>
                        <a href="/#how-it-works" className="nav-link">How It Works</a>
                        <Link to="/donate" className="nav-link">Donate Food</Link>
                        <Link to="/request-food" className="nav-link">Request Food</Link>
                        <Link to="/receive" className="nav-link">Find Food</Link>
                        <a href="/#contact" className="nav-link">Contact</a>
                        
                        {user ? (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                <Link to="/dashboard" className="profile-icon" title="My Dashboard">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '5px 12px', background: 'linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%)', color: 'white', borderRadius: '20px', fontSize: '14px', fontWeight: '500' }}>
                                        <i className="fas fa-user"></i>
                                        <span>{user.username}</span>
                                    </div>
                                </Link>
                                <button 
                                    onClick={logout}
                                    style={{ background: 'none', border: 'none', color: '#ff6b35', cursor: 'pointer', fontSize: '18px' }}
                                    title="Logout"
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                </button>
                            </div>
                        ) : (
                            <Link to="/auth" className="profile-icon" title="Login / Sign Up">
                                <i className="fas fa-user-circle"></i>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;