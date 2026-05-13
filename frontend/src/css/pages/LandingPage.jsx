import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import LiveStats from '../components/LiveStats';
import About from '../components/About';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

const LandingPage = () => {
    return (
        <div>
            <Navbar />
            <Hero />
            <LiveStats />
            <About />
            <Features />
            <HowItWorks />
            <CTA />
            <Footer />
        </div>
    );
};

export default LandingPage;