import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-background"></div>
            <div className="container">
                <div className="hero-grid">
                    <div className="hero-left">
                        <div className="hero-badge">
                            <i className="fas fa-sparkles"></i>
                            <span>Building a hunger-free India</span>
                        </div>
                        <h1 className="hero-heading">
                            Share Food,<br />
                            <span className="gradient-text">Spread Kindness</span>
                        </h1>
                        <p className="hero-subtitle">
                            Join us in creating a platform where surplus food finds those who need it.
                            Every meal shared is a step towards a better tomorrow.
                        </p>
                        <div className="hero-buttons">
                            <Link to="/donate" className="btn btn-primary">
                                <span>Donate Food</span>
                                <i className="fas fa-heart"></i>
                            </Link>
                            <Link to="/receive" className="btn btn-secondary">
                                <span>Request Food</span>
                                <div className="btn-icon">
                                    <i className="fas fa-arrow-right"></i>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div className="hero-right">
                        <div className="hero-image-wrapper">
                            <div className="image-decoration"></div>
                            <img src="https://images.unsplash.com/photo-1584107733107-c3665df08cf9?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Indian community sharing food" className="hero-image" />
                            <div className="floating-card card-1">
                                <i className="fas fa-users"></i>
                                <span>Community Driven</span>
                            </div>
                            <div className="floating-card card-2">
                                <i className="fas fa-shield-alt"></i>
                                <span>Safe & Secure</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;