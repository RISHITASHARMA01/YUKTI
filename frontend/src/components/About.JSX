import React from 'react';

const About = () => {
    return (
        <section id="about" className="about-section">
            <div className="container">
                <div className="section-header center">
                    <div className="section-badge">
                        <i className="fas fa-lightbulb"></i>
                        <span>Why We Started</span>
                    </div>
                    <h2 className="section-title">A Simple Idea,<br /><span className="gradient-text">A Powerful Impact</span></h2>
                    <p className="section-description">
                        We believe that no one should go hungry while perfectly good food goes to waste.
                        Our platform bridges the gap between abundance and need.
                    </p>
                </div>

                <div className="about-grid">
                    <div className="about-card">
                        <div className="about-image">
                            <img src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBob21lJTIwY29va2VkJTIwZm9vZHxlbnwxfHx8fDE3NjM5MDUyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Authentic Indian home cooked meal" />
                            <div className="about-overlay">
                                <div className="about-icon">
                                    <i className="fas fa-utensils"></i>
                                </div>
                            </div>
                        </div>
                        <div className="about-content">
                            <h3>Traditional Meals</h3>
                            <p>Share authentic Indian food with those in need</p>
                        </div>
                    </div>

                    <div className="about-card">
                        <div className="about-image">
                            <img src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB2ZWdldGFibGUlMjBtYXJrZXR8ZW58MXx8fHwxNzYzOTA1MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Fresh vegetables at Indian market" />
                            <div className="about-overlay">
                                <div className="about-icon">
                                    <i className="fas fa-leaf"></i>
                                </div>
                            </div>
                        </div>
                        <div className="about-content">
                            <h3>Fresh Produce</h3>
                            <p>Connect farmers with communities</p>
                        </div>
                    </div>

                    <div className="about-card">
                        <div className="about-image">
                            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZG9uYXRpb24lMjBpbmRpYXxlbnwxfHx8fDE3NjM5MDUyOTN8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Food distribution" />
                            <div className="about-overlay">
                                <div className="about-icon">
                                    <i className="fas fa-store"></i>
                                </div>
                            </div>
                        </div>
                        <div className="about-content">
                            <h3>Surplus Food</h3>
                            <p>Reduce waste from restaurants</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;