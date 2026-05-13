import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
    return (
        <section id="how-it-works" className="how-section">
            <div className="container">
                <div className="section-header center">
                    <div className="section-badge">
                        <i className="fas fa-cogs"></i>
                        <span>Simple Process</span>
                    </div>
                    <h2 className="section-title">How It<br /><span className="gradient-text">Works</span></h2>
                    <p className="section-description">
                        Getting started is easy. Choose your role and follow these simple steps.
                    </p>
                </div>

                <div className="how-grid">
                    {/* Donors */}
                    <div className="how-card donor-card">
                        <div className="how-header">
                            <div className="how-icon">
                                <i className="fas fa-hand-holding-heart"></i>
                            </div>
                            <h3>For Food Donors</h3>
                        </div>
                        <div className="how-steps">
                            <div className="how-step">
                                <div className="step-number">01</div>
                                <div className="step-info">
                                    <h4>Create Account</h4>
                                    <p>Sign up in less than 2 minutes</p>
                                </div>
                            </div>
                            <div className="how-step">
                                <div className="step-number">02</div>
                                <div className="step-info">
                                    <h4>List Your Food</h4>
                                    <p>Upload photos and details</p>
                                </div>
                            </div>
                            <div className="how-step">
                                <div className="step-number">03</div>
                                <div className="step-info">
                                    <h4>Get Notified</h4>
                                    <p>Receive instant alerts</p>
                                </div>
                            </div>
                            <div className="how-step">
                                <div className="step-number">04</div>
                                <div className="step-info">
                                    <h4>Share & Help</h4>
                                    <p>Make a difference</p>
                                </div>
                            </div>
                        </div>
                        <Link to="/donate" className="how-btn donor-btn" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                            <span>Start Donating</span>
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>

                    {/* Receivers */}
                    <div className="how-card receiver-card">
                        <div className="how-header">
                            <div className="how-icon blue">
                                <i className="fas fa-hands-helping"></i>
                            </div>
                            <h3>For Food Receivers</h3>
                        </div>
                        <div className="how-steps">
                            <div className="how-step">
                                <div className="step-number blue">01</div>
                                <div className="step-info">
                                    <h4>Join Community</h4>
                                    <p>Register with verification</p>
                                </div>
                            </div>
                            <div className="how-step">
                                <div className="step-number blue">02</div>
                                <div className="step-info">
                                    <h4>Browse Food</h4>
                                    <p>See real-time listings</p>
                                </div>
                            </div>
                            <div className="how-step">
                                <div className="step-number blue">03</div>
                                <div className="step-info">
                                    <h4>Request Items</h4>
                                    <p>Select what you need</p>
                                </div>
                            </div>
                            <div className="how-step">
                                <div className="step-number blue">04</div>
                                <div className="step-info">
                                    <h4>Receive Food</h4>
                                    <p>Get fresh food delivered</p>
                                </div>
                            </div>
                        </div>
                        <Link to="/receive" className="how-btn receiver-btn" style={{ textDecoration: 'none', display: 'inline-flex' }}>
                            <span>Request Food</span>
                            <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HowItWorks;