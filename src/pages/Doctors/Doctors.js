// DoctorsPage.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Doctors.css';
import AppointmentButton from '../../components/AppointmentButton';

import johnImg from '../../assets/Doctors/John.jpg';
import domenicImg from '../../assets/Doctors/Domenic.jpg';
import nicoleImg from '../../assets/Doctors/Nicole.jpg';
import patriciaImg from '../../assets/Doctors/Patricia.jpg';
import tinaImg from '../../assets/Doctors/Tina.jpg';
import evanImg from '../../assets/Doctors/Evan.jpg';
import michelleImg from '../../assets/Doctors/Michelle.jpg';
import jacquelineImg from '../../assets/Doctors/Jacqueline.jpg';

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

  const doctors = [
    { name: 'Dr. John Magalhães', credentials: 'OD, FAAO', specialty: 'Managing Doctor, Medical Eye Care', summary: 'Nearly 26 years of clinical experience with a focus on the highest level of clinical care and technology. Board Certified and former President of the Massachusetts Society of Optometrists.', image: johnImg, slug: 'john-magalhaes', highlights: ['26 Years Experience', 'Board Certified', 'Medical Missions', 'Young OD of the Year 2012'] },
    { name: 'Dr. Domenic Covello', credentials: 'OD', specialty: 'Comprehensive Family Eye Care', summary: 'Graduate of Pennsylvania College of Optometry with 10 years at Dr. Magalhães and Associates. Specialized training in retinal disease, cataracts, and glaucoma from VA Hospital internships.', image: domenicImg, slug: 'domenic-covello', highlights: ['10 Years at DMA', 'Beta Sigma Kappa', 'VA Hospital Training', 'Contact Lens Expert'] },
    { name: 'Dr. Nicole Patricio', credentials: 'OD, MPH', specialty: 'Comprehensive Eye Care & Public Health', summary: 'Double doctorate in Optometry and Master in Public Health from MCPHS University. Dedicated to patient education and personalized care with community health focus.', image: nicoleImg, slug: 'nicole-patricio', highlights: ['MPH Degree', 'Community Health Focus', 'Patient Education', 'AAO Member'] },
    { name: 'Dr. Patricia Garcia', credentials: 'OD', specialty: 'Post-Operative Care & Specialty Contact Lenses', summary: 'MCPHS graduate specializing in post-operative care of cataracts, LASIK, and glaucoma. Expert in specialty contact lenses and bilingual Spanish services.', image: patriciaImg, slug: 'patricia-garcia', highlights: ['Post-Op Specialist', 'Specialty Contact Lenses', 'Bilingual Spanish', 'Anterior Segment Expert'] },
    { name: 'Dr. Tina Parker', credentials: 'OD', specialty: 'Pediatrics & Vision Rehabilitation', summary: "New England College of Optometry graduate with Pediatric Residency. Advanced expertise in children's vision care, dry eye management, and scleral contact lenses.", image: tinaImg, slug: 'tina-parker', highlights: ['Pediatric Residency', "Children's Vision", 'Dry Eye Management', 'Scleral Lenses'] },
    { name: 'Dr. Evan Hosney', credentials: 'OD', specialty: 'Comprehensive Eye Care', summary: 'MCPHS University graduate with unique hands-on experience in optical lab work and patient care. Comprehensive understanding from fabrication to clinical practice.', image: evanImg, slug: 'evan-hosney', highlights: ['Lab Experience', 'Comprehensive Care', 'Contact Lenses', 'Sports Enthusiast'] },
    { name: 'Dr. Michelle Vining', credentials: 'OD', specialty: 'Primary Eye Care & Ocular Disease', summary: 'Board-certified SUNY College of Optometry graduate. Specializes in diabetic retinopathy, macular degeneration, and dry eye. Fluent in Spanish.', image: michelleImg, slug: 'michelle-vining', highlights: ['Board Certified', 'Bilingual Spanish', 'Disease Management', 'Post-Surgical Care'] },
    { name: 'Dr. Jacqueline Klombers', credentials: 'OD', specialty: 'Comprehensive Eye Care & Low Vision', summary: 'New England College of Optometry graduate with internship experience at Jamaica Plain VA Medical Center, Boston University Eye, and Dorchester Community Health Center. Experienced in comprehensive eye care and low vision exams.', image: jacquelineImg, slug: 'jacqueline-klombers', highlights: ['Low Vision Exams', 'VA Medical Training', 'Medical Optometry', 'NECO Graduate'] }
  ];

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
                      alt={`Headshot of ${doctor.name}`}
                      className="doctor-image"
                    />
                  </div>
                  <div className="doctor-info">
                    <h3 className="doctor-name">{doctor.name}</h3>
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