// ServicesPage.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ServicePage.css';
import AppointmentButton from '../../components/AppointmentButton';

const ServicesPage = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);
  const navigate = useNavigate();

  useEffect(() => {
    const observers = sectionRefs.current
      .filter(ref => ref !== null)
      .map((ref, index) => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleSections(prev => [...new Set([...prev, index])]);
            }
          },
          { threshold: 0.1 }
        );
        observer.observe(ref);
        return observer;
      });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  const primaryServices = [
    { icon: '👁️', title: 'Comprehensive Eye Exams', description: 'Complete vision assessments using state-of-the-art diagnostic equipment to evaluate your overall eye health and visual performance.', link: '/services/comprehensive-eye-exam', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { icon: '💧', title: 'Dry Eye Treatment', description: 'Advanced therapies including TearLab testing, Regener-Eyes biologics, and amniotic membrane therapy for lasting relief.', link: '/services/eye-diseases/dry-eye', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { icon: '🔍', title: 'Glaucoma Care', description: 'Early detection and comprehensive treatment to preserve your vision with the latest technology and therapeutic approaches.', link: '/services/eye-diseases/glaucoma', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
    { icon: '💉', title: 'Diabetic Eye Disease', description: 'Specialized monitoring and treatment for diabetic retinopathy with DVS supplementation and advanced imaging.', link: '/services/eye-diseases/diabetic-eye-disease', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
    { icon: '👓', title: 'Contact Lenses', description: 'Expert fitting for all types of contact lenses including specialty lenses and advanced materials.', link: '/services/contact-lenses', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
    { icon: '🎯', title: 'Macular Degeneration', description: 'Maculogix early detection and advanced AMD treatments including anti-VEGF injections and specialized vitamins.', link: '/services/eye-diseases/macular-degeneration', color: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)' }
  ];

  const additionalServices = [
    { icon: '🔬', title: 'Eye Diseases', description: 'Comprehensive diagnosis and treatment of various eye conditions including cataracts, conjunctivitis, and more.', link: '/services/eye-diseases' },
    { icon: '💄', title: 'Latisse', description: 'FDA-approved prescription treatment for eyelash enhancement with visible results in just 4 weeks.', link: '/services/latisse' },
    { icon: '⚡', title: 'Laser Vision Correction', description: 'Expert co-management for LASIK and other refractive surgery procedures.', link: '/services/laser-vision-correction' },
    { icon: '🛍️', title: 'Optical Shop', description: 'Premium eyewear from designer brands including Versace, Oakley, Ray-Ban, Armani, Gucci, and Burberry.', link: '/services/optical-shop' }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-overlay"></div>
        <div className="services-hero-content">
          <h1 className="services-hero-title">
            Comprehensive Eye Care <br />
            <span className="highlight">For Every Need</span>
          </h1>
          <p className="services-hero-subtitle">
            From routine exams to specialized treatments, we provide complete care 
            for your eyes using the latest technology and proven techniques
          </p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
          </svg>
        </div>
      </section>

      <div className="services-content-wrapper">

        {/* Introduction */}
        <section
          ref={el => sectionRefs.current[0] = el}
          className={`services-section intro-section ${visibleSections.includes(0) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="intro-content">
              <h2 className="intro-title">Complete Eye Care Solutions</h2>
              <p className="intro-text">
                At Dr. Magalhaes and Associates, we offer a full spectrum of eye care services 
                to meet all your vision needs. Our experienced team uses state-of-the-art 
                technology to provide the highest quality care, from routine eye exams to 
                advanced treatments for complex eye conditions.
              </p>
            </div>
          </div>
        </section>

        {/* Primary Services */}
        <section
          ref={el => sectionRefs.current[1] = el}
          className={`services-section primary-services-section ${visibleSections.includes(1) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="section-header-services">
              <span className="section-badge">Core Services</span>
              <h2 className="section-title-services">Our Primary Services</h2>
              <p className="section-subtitle-services">
                Specialized care backed by years of experience and cutting-edge technology
              </p>
            </div>
            <div className="primary-services-grid">
              {primaryServices.map((service, index) => (
                <div
                  key={index}
                  className="primary-service-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(service.link)}
                >
                  <div className="service-card-background" style={{ background: service.color }}></div>
                  <div className="service-card-content">
                    <div className="service-card-icon">{service.icon}</div>
                    <h3 className="service-card-title">{service.title}</h3>
                    <p className="service-card-description">{service.description}</p>
                    <button className="service-card-button">
                      <span>Learn More</span>
                      <span className="button-arrow">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section
          ref={el => sectionRefs.current[2] = el}
          className={`services-section additional-services-section ${visibleSections.includes(2) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="section-header-services">
              <span className="section-badge">More Services</span>
              <h2 className="section-title-services">Additional Services</h2>
            </div>
            <div className="additional-services-grid">
              {additionalServices.map((service, index) => (
                <div
                  key={index}
                  className="additional-service-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => navigate(service.link)}
                >
                  <div className="additional-service-icon">{service.icon}</div>
                  <h3 className="additional-service-title">{service.title}</h3>
                  <p className="additional-service-description">{service.description}</p>
                  <div className="additional-service-link">
                    <span>View Details</span>
                    <span className="link-arrow">→</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Highlight */}
        <section
          ref={el => sectionRefs.current[3] = el}
          className={`services-section technology-section ${visibleSections.includes(3) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="technology-content">
              <div className="technology-icon">🔬</div>
              <h2 className="technology-title">State-of-the-Art Technology</h2>
              <p className="technology-text">
                We invest in the latest diagnostic and treatment technologies to ensure you 
                receive the most advanced eye care available. From Maculogix early detection 
                to TearLab osmolarity testing, we use cutting-edge equipment to provide 
                accurate diagnoses and effective treatments.
              </p>
              <div className="technology-features">
                {['OCT Imaging', 'Maculogix Detection', 'TearLab Testing', 'Ultra Wide Field Imaging'].map(feat => (
                  <div className="tech-feature" key={feat}>
                    <span className="tech-feature-icon">✓</span>
                    <span className="tech-feature-text">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="services-cta-section">
          <div className="cta-content-wrapper">
            <div className="cta-icon-large">⚓</div>
            <h2 className="cta-title">Ready to Experience Expert Care?</h2>
            <p className="cta-text">
              Schedule your appointment today and discover why families throughout 
              the South Coast trust us with their vision
            </p>
            <div className="cta-buttons">
              <AppointmentButton className="cta-btn-large primary">
                <span className="btn-text">Schedule Appointment</span>
                <span className="btn-icon">📅</span>
              </AppointmentButton>
              <button className="cta-btn-large secondary" onClick={() => navigate('/contact')}>
                <span className="btn-text">Contact Us</span>
                <span className="btn-icon">📞</span>
              </button>
            </div>
          </div>
          <div className="cta-waves">
            <div className="wave-bg wave-bg-1"></div>
            <div className="wave-bg wave-bg-2"></div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ServicesPage;