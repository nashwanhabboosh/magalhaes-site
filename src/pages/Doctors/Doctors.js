// DoctorsPage.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Doctors.css';
import AppointmentButton from '../../components/AppointmentButton';
import { doctors } from '../../data/doctors';

const DoctorsPage = () => {
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

  return (
    <div className="doctors-page">
      {/* Hero Section */}
      <section className="doctors-hero">
        <div className="hero-overlay"></div>
        <div className="doctors-hero-content">
          <h1 className="doctors-hero-title">
            Meet Our Expert Team <br />
            <span className="highlight">of Eye Care Professionals</span>
          </h1>
          <p className="doctors-hero-subtitle">
            Board-certified optometrists dedicated to providing exceptional care 
            with the latest technology and proven expertise
          </p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
          </svg>
        </div>
      </section>

      <div className="doctors-content-wrapper">

        {/* Introduction */}
        <section
          ref={el => sectionRefs.current[0] = el}
          className={`doctors-section intro-section ${visibleSections.includes(0) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="intro-content">
              <h2 className="intro-title">Experience You Can Trust</h2>
              <p className="intro-text">
                Our team of highly skilled optometrists brings together decades of combined experience, 
                advanced training, and a genuine passion for helping you achieve and maintain optimal 
                eye health. Each doctor is committed to providing personalized, compassionate care using 
                the most advanced diagnostic and treatment technologies available.
              </p>
            </div>
          </div>
        </section>

        {/* Doctors Grid */}
        <section
          ref={el => sectionRefs.current[1] = el}
          className={`doctors-section doctors-grid-section ${visibleSections.includes(1) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="doctors-grid">
              {doctors.map((doctor, index) => (
                <div key={index} className="doctor-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="doctor-image-container">
                    <img
                      src={doctor.image}
                      alt={`Headshot of Dr. ${doctor.name}`}
                      className="doctor-image"
                    />
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">Dr. {doctor.name}</h3>
                    <p className="doctor-credentials">{doctor.credentials}</p>
                    <p className="doctor-specialty">{doctor.specialty}</p>
                    <p className="doctor-summary">{doctor.summary}</p>
                    <div className="doctor-highlights">
                      {doctor.highlights.map((highlight, idx) => (
                        <span key={idx} className="highlight-badge">{highlight}</span>
                      ))}
                    </div>
                    <button className="learn-more-btn" onClick={() => navigate(`/doctors/${doctor.slug}`)}>
                      <span className="btn-text">Learn More</span>
                      <span className="btn-arrow">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section
          ref={el => sectionRefs.current[2] = el}
          className={`doctors-section why-choose-section ${visibleSections.includes(2) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="why-choose-content">
              <h2 className="why-choose-title">Why Choose Our Practice?</h2>
              <div className="why-choose-grid">
                <div className="why-choose-card">
                  <div className="why-icon">🎓</div>
                  <h3 className="why-title">Advanced Training</h3>
                  <p className="why-text">Our doctors have completed specialized residencies and continuing education to stay at the forefront of eye care</p>
                </div>
                <div className="why-choose-card">
                  <div className="why-icon">🔬</div>
                  <h3 className="why-title">Latest Technology</h3>
                  <p className="why-text">State-of-the-art diagnostic equipment including OCT, Maculogix, and TearLab testing</p>
                </div>
                <div className="why-choose-card">
                  <div className="why-icon">💙</div>
                  <h3 className="why-title">Patient-Centered Care</h3>
                  <p className="why-text">We take time to listen, educate, and develop personalized treatment plans for every patient</p>
                </div>
                <div className="why-choose-card">
                  <div className="why-icon">🌍</div>
                  <h3 className="why-title">Community Commitment</h3>
                  <p className="why-text">Dedicated to serving our local community and participating in global medical missions</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="doctors-cta-section">
          <div className="cta-content-wrapper">
            <div className="cta-icon-large">⚓</div>
            <h2 className="cta-title">Ready to Meet Your Eye Care Team?</h2>
            <p className="cta-text">
              Schedule your appointment today and experience the difference that 
              expert, compassionate care can make
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

export default DoctorsPage;