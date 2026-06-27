// HomePage.js
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import AppointmentButton from '../../components/AppointmentButton';
import { R2_BASE_URL } from '../../config';

const HomePage = () => {
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isVideoTransitioning, setIsVideoTransitioning] = useState(false);
  const videoRef = useRef(null);

  const videos = [
    `${R2_BASE_URL}/b-roll/dji-fly-20250927-081338-18.mov`,
    `${R2_BASE_URL}/b-roll/dji-fly-20250927-082300-22.mov`,
    `${R2_BASE_URL}/b-roll/dji-fly-20250927-082358-23.mov`,
    `${R2_BASE_URL}/b-roll/dji-fly-20250927-082500-24.mov`,
    `${R2_BASE_URL}/b-roll/dji-fly-20250927-082848-27.mov`
  ];

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const handleVideoEnd = () => {
      setIsVideoTransitioning(true);
      setTimeout(() => {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        setIsVideoTransitioning(false);
      }, 500);
    };

    videoElement.addEventListener('ended', handleVideoEnd);
    return () => videoElement.removeEventListener('ended', handleVideoEnd);
  }, [videos.length]);

  const services = [
    { icon: '👁️', title: 'Comprehensive Eye Exams', description: 'Complete vision assessments with state-of-the-art diagnostic equipment.', link: '/services/comprehensive-eye-exam' },
    { icon: '💧', title: 'Dry Eye Treatment', description: 'Advanced therapies including TearLab testing and Regener-Eyes biologics.', link: '/services/eye-diseases/dry-eye' },
    { icon: '🔍', title: 'Glaucoma Care', description: 'Early detection and comprehensive treatment to preserve your vision.', link: '/services/eye-diseases/glaucoma' },
    { icon: '💉', title: 'Diabetic Eye Disease', description: 'Specialized monitoring and treatment for diabetic retinopathy.', link: '/services/eye-diseases/diabetic-eye-disease' },
    { icon: '👓', title: 'Contact Lenses', description: 'Expert fitting for all types of contact lenses.', link: '/services/contact-lenses' },
    { icon: '🎯', title: 'Macular Degeneration', description: 'Maculogix early detection and advanced AMD treatments.', link: '/services/eye-diseases/macular-degeneration' }
  ];

  const trustFactors = [
    { icon: '🏠', title: 'Family Owned', description: 'A trusted local practice serving our community for years' },
    { icon: '⚓', title: 'Deep Community Roots', description: 'Committed to the health and wellbeing of our neighbors' },
    { icon: '⭐', title: 'Expert Care', description: 'Experienced doctors using the latest technology' },
    { icon: '💙', title: 'Patient-Centered', description: 'Your vision and comfort are our top priorities' }
  ];

  const locations = [
    { name: 'North Attleboro', address: '1250 S. Washington St, North Attleborough, MA', phone: '508-717-0425', link: '/location/north-attleboro-fashion-crossing' },
    { name: 'Dartmouth', address: '382 State Road, Dartmouth MA', phone: '508-717-0425', link: '/location/north-dartmouth' }
  ];

  return (
    <div className="homepage">
      {/* Video Hero Section */}
      <section className="home-hero-video-section">
        <div className="home-video-container">
          <video
            ref={videoRef}
            className={`home-hero-video ${isVideoTransitioning ? 'transitioning' : ''}`}
            src={videos[currentVideoIndex]}
            autoPlay
            muted
            playsInline
            key={currentVideoIndex}
          />
          <div className="home-video-overlay"></div>
        </div>

        <div className="home-hero-content">
          <h1 className="home-hero-title">
            Dr. Magalhaes<br />
            <span className="highlight">& Associates</span>
          </h1>
          <div className="home-hero-actions">
            <AppointmentButton className="home-cta-primary">
              <span className="home-button-icon">📅</span>
              Schedule Appointment
            </AppointmentButton>
            <button className="home-cta-secondary" onClick={() => navigate('/services/')}>
              Explore Services
              <span className="arrow">→</span>
            </button>
          </div>
        </div>

        <div className="home-video-indicators">
          {videos.map((_, index) => (
            <button
              key={index}
              className={`home-indicator ${index === currentVideoIndex ? 'active' : ''}`}
              onClick={() => setCurrentVideoIndex(index)}
              aria-label={`Go to video ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Trust Section */}
      <section className="home-trust-section">
        <div className="home-section-container">
          <div className="home-section-header">
            <h2 className="home-section-title">A Local Practice You Can Trust</h2>
            <p className="home-section-subtitle">
              We're more than just an eye care provider – we're your neighbors, 
              committed to keeping our community's vision healthy and bright
            </p>
          </div>
          <div className="home-trust-grid">
            {trustFactors.map((factor, index) => (
              <div key={index} className="home-trust-card" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="home-trust-icon">{factor.icon}</div>
                <h3 className="home-trust-title">{factor.title}</h3>
                <p className="home-trust-description">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="home-maritime-decoration">
          <div className="home-wave home-wave-1"></div>
          <div className="home-wave home-wave-2"></div>
        </div>
      </section>

      {/* Services Section */}
      <section className="home-services-section">
        <div className="home-section-container">
          <div className="home-section-header">
            <h2 className="home-section-title">Comprehensive Eye Care Services</h2>
            <p className="home-section-subtitle">
              From routine exams to specialized treatments, we provide complete care 
              for your eyes using the latest technology
            </p>
          </div>
          <div className="home-services-grid">
            {services.map((service, index) => (
              <div
                key={index}
                className="home-service-card"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(service.link)}
              >
                <div className="home-service-icon-wrapper">
                  <div className="home-service-icon">{service.icon}</div>
                  <div className="home-icon-ripple"></div>
                </div>
                <h3 className="home-service-title">{service.title}</h3>
                <p className="home-service-description">{service.description}</p>
                <button className="home-service-link">
                  Learn More
                  <span className="home-link-arrow">→</span>
                </button>
              </div>
            ))}
          </div>
          <div className="home-services-cta">
            <button className="home-view-all-btn" onClick={() => navigate('/services/')}>
              View All Services
              <span className="home-btn-icon">⚓</span>
            </button>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="home-locations-section">
        <div className="home-section-container">
          <div className="home-section-header">
            <h2 className="home-section-title">Two Convenient Locations</h2>
          </div>
          <div className="home-locations-grid">
            {locations.map((location, index) => (
              <div key={index} className="home-location-quick-card" style={{ animationDelay: `${index * 0.15}s` }}>
                <div className="home-location-icon">📍</div>
                <h3 className="home-location-name">{location.name}</h3>
                <p className="home-location-address">{location.address}</p>
                <p className="home-location-phone">{location.phone}</p>
                <div className="home-location-actions">
                  <button className="home-location-btn directions" onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location.address)}`, '_blank')}>
                    <span>Get Directions</span>
                    <span className="home-btn-arrow">→</span>
                  </button>
                  <button className="home-location-btn details" onClick={() => navigate(location.link)}>
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="home-final-cta-section">
        <div className="home-cta-content-wrapper">
          <div className="home-cta-icon-large">⚓</div>
          <h2 className="home-cta-title">Ready to See Clearly?</h2>
          <p className="home-cta-text">
            Schedule your appointment today and experience the difference 
            of personalized, local eye care
          </p>
          <div className="home-cta-buttons">
            <AppointmentButton className="home-cta-btn-large primary">
              <span className="btn-text">Schedule Appointment</span>
              <span className="btn-icon">📅</span>
            </AppointmentButton>
            <button className="home-cta-btn-large secondary" onClick={() => window.location.href = 'tel:508-717-0425'}>
              <span className="btn-text">Call Us Today</span>
              <span className="btn-icon">📞</span>
            </button>
          </div>
          <p className="home-cta-subtext">New patients welcome • Most insurance accepted</p>
        </div>
        <div className="home-cta-waves">
          <div className="home-wave-bg home-wave-bg-1"></div>
          <div className="home-wave-bg home-wave-bg-2"></div>
          <div className="home-wave-bg home-wave-bg-3"></div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;