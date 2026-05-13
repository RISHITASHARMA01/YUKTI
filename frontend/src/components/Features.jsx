import React from 'react';

const Features = () => {
    return (
        <section id="features" className="features-section">
            <div className="container">
                <div className="section-header center">
                    <div className="section-badge">
                        <i className="fas fa-star"></i>
                        <span>Platform Features</span>
                    </div>
                    <h2 className="section-title">Everything You Need to<br /><span className="gradient-text">Make a Difference</span>
                    </h2>
                    <p className="section-description">
                        Our platform makes it simple and secure to share food with those who need it most.
                    </p>
                </div>

                <div className="features-grid">
                    <div className="feature-box">
                        <div className="feature-icon-wrapper orange">
                            <i className="fas fa-heart"></i>
                        </div>
                        <h3>Easy Donations</h3>
                        <p>List your surplus food in minutes and help those in need</p>
                    </div>

                    <div className="feature-box">
                        <div className="feature-icon-wrapper blue">
                            <i className="fas fa-mobile-alt"></i>
                        </div>
                        <h3>Mobile Friendly</h3>
                        <p>Access anywhere, anytime with our responsive design</p>
                    </div>

                    <div className="feature-box">
                        <div className="feature-icon-wrapper purple">
                            <i className="fas fa-shield-alt"></i>
                        </div>
                        <h3>Safe & Verified</h3>
                        <p>All users are verified for trustworthy sharing</p>
                    </div>

                    <div className="feature-box">
                        <div className="feature-icon-wrapper pink">
                            <i className="fas fa-bolt"></i>
                        </div>
                        <h3>Real-Time Updates</h3>
                        <p>Instant notifications for all donations and requests</p>
                    </div>

                    <div className="feature-box">
                        <div className="feature-icon-wrapper teal">
                            <i className="fas fa-bell"></i>
                        </div>
                        <h3>Smart Alerts</h3>
                        <p>Get notified about food matching your preferences</p>
                    </div>

                    <div className="feature-box">
                        <div className="feature-icon-wrapper indigo">
                            <i className="fas fa-map-marker-alt"></i>
                        </div>
                        <h3>Location Based</h3>
                        <p>Connect with people in your neighborhood</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;