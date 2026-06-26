// PatientResourcesPage.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PatientResources.css';
import AppointmentButton from '../../components/AppointmentButton';

const PatientResourcesPage = () => {
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

  const insuranceProviders = [
    'Aetna', 'BCBS-MA', 'BCBS-RI', 'Boston Healthnet', 'Cigna', 'Eyemed',
    'Fallon', 'GIC', 'Harvard Pilgrim', 'Health Plans', 'Network health',
    'Humana', 'MassHealth', 'Medicare', 'Spectera (Optum Health)', 'Tricare',
    'Tufts', 'United Health'
  ];

  const helpfulLinks = [
    { title: 'All About Vision', description: 'Comprehensive resource for eye health, vision care, and eye conditions', url: 'https://www.allaboutvision.com', icon: '👁️' },
    { title: 'Learn About LASIK', description: 'Information about LASIK surgery, candidacy, and what to expect', url: 'https://www.allaboutvision.com/visionsurgery/lasik.htm', icon: '🔬' }
  ];

  return (
    <div className="patient-resources-page">
      {/* Hero Section */}
      <section className="resources-hero">
        <div className="hero-overlay"></div>
        <div className="resources-hero-content">
          <h1 className="resources-hero-title">
            Everything You Need <br />
            <span className="highlight">For Your Visit</span>
          </h1>
          <p className="resources-hero-subtitle">
            Insurance information, patient forms, and helpful resources 
            to make your experience seamless
          </p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
          </svg>
        </div>
      </section>

      <div className="resources-content-wrapper">

        {/* Insurance Section */}
        <section
          ref={el => sectionRefs.current[0] = el}
          className={`resources-section insurance-section ${visibleSections.includes(0) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="section-header-resources">
              <span className="section-badge">Insurance</span>
              <h2 className="section-title-resources">Insurance Resources</h2>
            </div>
            <div className="insurance-info-card">
              <div className="info-icon">🏥</div>
              <h3 className="info-title">Annual Eye Medical Exams</h3>
              <p className="info-text">
                The American Academy of Optometry advocates annual eye medical exams and more frequent 
                evaluations for diabetics. Most major medical plans stress preventative eye care 
                by allowing for annual exams.
              </p>
              <div className="info-highlight">
                <div className="highlight-icon">💡</div>
                <p className="highlight-text">
                  <strong>Have an HMO with a 2-year benefit?</strong> Simply request a referral 
                  from your primary care physician, and you will be covered for your annual eye 
                  medical exam.
                </p>
              </div>
            </div>
            <div className="insurance-disclaimer">
              <div className="disclaimer-icon">ℹ️</div>
              <div className="disclaimer-content">
                <h4 className="disclaimer-title">Important Information</h4>
                <p className="disclaimer-text">
                  We participate in the insurance plans listed below. However, we cannot guarantee 
                  payment when we submit a claim as they are subject to co-payments and deductibles 
                  set by the individual plans.
                </p>
                <p className="disclaimer-text">
                  <strong>Please note:</strong> Deductible information is not readily available to 
                  the practice. Overall knowledge of your plan, co-payment, plan details, and coverage 
                  is ultimately the responsibility of the individual patient.
                </p>
              </div>
            </div>
            <div className="insurance-providers-section">
              <h3 className="providers-title">Accepted Insurance Plans</h3>
              <div className="providers-grid">
                {insuranceProviders.map((provider, index) => (
                  <div key={index} className="provider-card" style={{ animationDelay: `${index * 0.03}s` }}>
                    <span className="provider-checkmark">✓</span>
                    <span className="provider-name">{provider}</span>
                  </div>
                ))}
              </div>
              <div className="additional-insurance-note">
                <p className="note-text">
                  <strong>Don't see your insurance listed?</strong> Please call for details as this 
                  is not an exhaustive list. We can also file your out-of-network benefits such as 
                  Vision Service Plan (VSP).
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Patient Forms Section */}
        <section
          ref={el => sectionRefs.current[1] = el}
          className={`resources-section forms-section ${visibleSections.includes(1) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="section-header-resources">
              <span className="section-badge">Forms</span>
              <h2 className="section-title-resources">Patient Forms</h2>
              <p className="section-subtitle-resources">
                To make your visit as efficient as possible, you can print and fill out 
                the forms before you come in
              </p>
            </div>
            <div className="forms-grid">
              <div className="form-card">
                <div className="form-icon">📋</div>
                <h3 className="form-title">Medical History Questionnaire</h3>
                <p className="form-description">
                  We utilize user-friendly iPads to facilitate collection of medical information 
                  from our patients, upon your arrival.
                </p>
              </div>
              <div className="form-tips-card">
                <div className="tips-icon">💡</div>
                <h4 className="tips-title">Tips for Your Visit</h4>
                <ul className="tips-list">
                  <li className="tip-item"><span className="tip-bullet">•</span><span>Arrive 15 minutes early to complete any remaining paperwork</span></li>
                  <li className="tip-item"><span className="tip-bullet">•</span><span>Bring your insurance card and photo ID</span></li>
                  <li className="tip-item"><span className="tip-bullet">•</span><span>Bring your current glasses and contact lenses</span></li>
                  <li className="tip-item"><span className="tip-bullet">•</span><span>List any medications you're currently taking</span></li>
                  <li className="tip-item"><span className="tip-bullet">•</span><span>Prepare questions you want to ask the doctor</span></li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Helpful Links Section */}
        <section
          ref={el => sectionRefs.current[2] = el}
          className={`resources-section links-section ${visibleSections.includes(2) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="section-header-resources">
              <span className="section-badge">Resources</span>
              <h2 className="section-title-resources">Helpful Links</h2>
              <p className="section-subtitle-resources">
                Explore these trusted resources for more information on eye health and vision care
              </p>
            </div>
            <div className="links-grid">
              {helpfulLinks.map((link, index) => (
                <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="link-card" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="link-icon">{link.icon}</div>
                  <h3 className="link-title">{link.title}</h3>
                  <p className="link-description">{link.description}</p>
                  <div className="link-arrow"><span>Visit Resource</span><span className="arrow">→</span></div>
                </a>
              ))}
            </div>
            <div className="additional-resources">
              <h3 className="additional-title">Need More Information?</h3>
              <p className="additional-text">
                Our staff is always happy to answer any questions you may have about your 
                eye care, insurance coverage, or appointment preparation.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="resources-cta-section">
          <div className="cta-content-wrapper">
            <div className="cta-icon-large">⚓</div>
            <h2 className="cta-title">Have Questions?</h2>
            <p className="cta-text">
              Our team is here to help with insurance questions, appointment scheduling, 
              or any other concerns you may have
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

export default PatientResourcesPage;