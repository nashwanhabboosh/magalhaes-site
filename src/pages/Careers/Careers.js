// CareersPage.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Careers.css';
import ColeenPhoto from '../../assets/Doctors/Coleen.jpg';

const CareersPage = () => {
  const [activeRole, setActiveRole] = useState('doctors');
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);
  const navigate = useNavigate();

  // Intersection Observer for fade-in animations
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

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [activeRole]);

  const doctorBenefits = [
    {
      icon: '🔬',
      title: 'High-Tech Equipment',
      description: 'OCT imaging, Maculogix, Zeiss Clarus, Marco Digital Refraction Systems'
    },
    {
      icon: '💼',
      title: 'Diverse Practice',
      description: 'Refractive, medical, specialty contact lenses, pre/post operative care'
    },
    {
      icon: '💡',
      title: 'Innovation Focus',
      description: 'Contribute to new procedures, technologies, and computer systems'
    },
    {
      icon: '🤝',
      title: 'Collaborative Team',
      description: 'Work with a staff of 20 delivering superlative care'
    },
    {
      icon: '👓',
      title: 'Premium Partnerships',
      description: 'LensCrafters flagship location with designer frames'
    },
    {
      icon: '📈',
      title: 'Professional Growth',
      description: 'Involved at every level of practice development'
    }
  ];

  const techBenefits = [
    {
      icon: '🎓',
      title: 'Comprehensive Training',
      description: 'From ground up or build upon existing experience'
    },
    {
      icon: '🔬',
      title: 'Advanced Equipment',
      description: 'OCT, Visual Fields, Maculogix, Zea Vision, Ultra Wide Field imaging'
    },
    {
      icon: '💻',
      title: 'Modern Systems',
      description: 'Master Crystal EMR and integrated practice management software'
    },
    {
      icon: '📚',
      title: 'Para-Optometric Program',
      description: 'AOA certification to perform 80% of modern eye exams'
    },
    {
      icon: '⬆️',
      title: 'Career Advancement',
      description: 'Opportunities for supervisor, billing head, or practice manager roles'
    },
    {
      icon: '🌟',
      title: 'Rewarding Experience',
      description: 'Memorable position in both optical and medical eye care'
    }
  ];

  const equipment = [
    'OCT Imaging (Macula & Optic Nerve)',
    'Humphrey Visual Fields (Liquid Lens)',
    'Maculogix Rod Intercept Measurements',
    'Zea Vision Carotenoid Testing',
    'Zeiss Clarus Ultra Wide Field',
    'Marco Digital Refraction Systems',
    'Crystal EMR System',
    'High Resolution Anterior Cameras',
    'Fundus Camera and Ultra Wide-Field Photography'
  ];

  return (
    <div className="careers-page">
      {/* Hero Section */}
      <section className="careers-hero">
        <div className="hero-overlay"></div>
        <div className="careers-hero-content">
          <h1 className="careers-hero-title">
            Build Your Career <br />
            <span className="highlight">With Us</span>
          </h1>
          <p className="careers-hero-subtitle">
            Join a passionate team dedicated to delivering exceptional eye care 
            with state-of-the-art technology and a commitment to innovation
          </p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="careers-content-wrapper">
        
        {/* Introduction Section */}
        <section 
          ref={el => sectionRefs.current[0] = el}
          className={`careers-section intro-section ${visibleSections.includes(0) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="intro-content">
              <h2 className="intro-title">
                Welcome to Dr. Magalhaes and Associates
              </h2>
              <p className="intro-text">
                Thank you for considering an opportunity with Dr. Magalhaes and Associates, D.M.A. 
                You've made, what we believe, is an excellent professional choice. From our 
                Optometric techs, our Para-Optometrics, our billing department, our eyeglasses 
                retail group, as well as our management team, we are in lock step on the pride 
                and dedication we have to our craft.
              </p>
              <p className="intro-text">
                <strong>We love what we do.</strong> Join a team that values innovation, collaboration, 
                and excellence in eye care.
              </p>
            </div>
          </div>
        </section>

        {/* Role Selector */}
        <section className="role-selector-section">
          <div className="section-container">
            <h2 className="selector-title">Explore Career Opportunities</h2>
            <div className="role-tabs">
              <button 
                className={`role-tab ${activeRole === 'doctors' ? 'active' : ''}`}
                onClick={() => setActiveRole('doctors')}
              >
                <span className="tab-icon">👨‍⚕️</span>
                <span className="tab-text">Doctors</span>
              </button>
              <button 
                className={`role-tab ${activeRole === 'techs' ? 'active' : ''}`}
                onClick={() => setActiveRole('techs')}
              >
                <span className="tab-icon">🔬</span>
                <span className="tab-text">Technicians</span>
              </button>
            </div>
          </div>
        </section>

        {/* Doctors Content */}
        <div className={`role-content ${activeRole === 'doctors' ? 'active' : 'hidden'}`}>
          <section 
            ref={el => sectionRefs.current[1] = el}
            className={`careers-section doctors-section ${visibleSections.includes(1) ? 'visible' : ''}`}
          >
              <div className="section-container">
                <div className="role-header">
                  <span className="section-badge">Optometrists</span>
                  <h2 className="section-title-careers">Doctor of Optometry Position</h2>
                  <p className="section-subtitle-careers">
                    Join our team of licensed optometrists delivering superlative, 
                    high-tech care to a diverse patient base
                  </p>
                </div>

                <div className="role-description-card">
                  <div className="description-icon">👁️</div>
                  <h3 className="description-title">What You'll Do</h3>
                  <p className="description-text">
                    As a licensed Doctor of Optometry, you will join a staff of 20 in delivering 
                    superlative and high tech care to our diverse patient base. Your day could 
                    consist of a wide range of refractive, medical, optical, specialty contact 
                    lens fittings, and pre/post operative care.
                  </p>
                  <p className="description-text">
                    <strong>No day is boring or monotonous at D.M.A. We keep busy.</strong> Doctors 
                    are involved at every level. We value their contribution to billing, designing 
                    new procedures and standards, evaluating new technologies, and integrating new 
                    computer systems. Any new innovation at D.M.A. can be traced back to critical 
                    contributions of our doctors.
                  </p>
                </div>

                <div className="benefits-grid">
                  {doctorBenefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="benefit-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="benefit-icon">{benefit.icon}</div>
                      <h4 className="benefit-title">{benefit.title}</h4>
                      <p className="benefit-description">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                <div className="partnership-section">
                  <div className="partnership-content">
                    <div className="partnership-icon">👓</div>
                    <h3 className="partnership-title">LensCrafters Partnership</h3>
                    <p className="partnership-text">
                      After your exam, patients are fortunate to have a wide array of choices in 
                      eyeglasses selection at LensCrafters. Our office is a flagship location with 
                      hundreds of designer frames by <strong>Versace, Oakley, Ray-Ban, Armani, Gucci, 
                      Burberry</strong> and many others.
                    </p>
                    <p className="partnership-text">
                      It is a pleasure to work with a known, branded organization that specializes 
                      in all things optical, while being an outstanding business partner with D.M.A. 
                      and respecting our total and unabated independence.
                    </p>
                  </div>
                </div>

                <div className="compensation-card">
                  <h3 className="compensation-title">Compensation & Benefits</h3>
                  <p className="compensation-text">
                    Our doctors enjoy a <strong>very generous package</strong> with their signed 
                    contracts and will be an integral part of our medical team. Doctors are expected 
                    to subscribe to the highest level of care, as determined by the State Board of 
                    Optometry in Massachusetts.
                  </p>
                </div>
              </div>
            </section>
          </div>

        {/* Techs Content */}
        <div className={`role-content ${activeRole === 'techs' ? 'active' : 'hidden'}`}>
          <section 
            ref={el => sectionRefs.current[2] = el}
            className={`careers-section techs-section ${visibleSections.includes(2) ? 'visible' : ''}`}
          >
              <div className="section-container">
                <div className="role-header">
                  <span className="section-badge">Technicians</span>
                  <h2 className="section-title-careers">Optometric Technician Position</h2>
                  <p className="section-subtitle-careers">
                    Whether you're experienced or new to eye care, we'll help you grow 
                    into a confident, skilled professional
                  </p>
                </div>

                <div className="tech-paths">
                  <div className="path-card new-tech">
                    <div className="path-icon">🌱</div>
                    <h3 className="path-title">New to Eye Care?</h3>
                    <p className="path-text">
                      We will train you from the ground up. You will be introduced into a new world 
                      of optical and medical. Optometry is unique in the sense that we treat and 
                      manage eye disease, while also dealing with a small retail component related 
                      to eyeglasses and certain eye care products.
                    </p>
                    <p className="path-text">
                      <strong>We thrive in this area of training.</strong> Our senior techs enjoy 
                      the experience of seeing novice candidates grow, while learning a new 
                      discipline. You will become confident in your newly acquired skills and enjoy 
                      your new job.
                    </p>
                  </div>

                  <div className="path-card experienced-tech">
                    <div className="path-icon">⭐</div>
                    <h3 className="path-title">Experienced Tech?</h3>
                    <p className="path-text">
                      We would love to take your knowledge and build upon it. It will be exciting 
                      for you to see a different approach to eye care. In the office, you will be 
                      introduced to the highest level of equipment in the areas of OCT, visual 
                      fields, Maculogix, Zea Vision, etc.
                    </p>
                    <p className="path-text">
                      You will be asked to participate in contact lens ordering, billing, and 
                      pre-testing with high level devices. You will master our EMR, Crystal and 
                      work with a variety of programs to verify insurances, sell year supply of 
                      contact lenses, learn about ocular nutraceuticals and manage our surgical cases.
                    </p>
                  </div>
                </div>

                <div className="benefits-grid">
                  {techBenefits.map((benefit, index) => (
                    <div 
                      key={index} 
                      className="benefit-card"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="benefit-icon">{benefit.icon}</div>
                      <h4 className="benefit-title">{benefit.title}</h4>
                      <p className="benefit-description">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                <div className="advancement-section">
                  <div className="advancement-header">
                    <h3 className="advancement-title">Career Growth Opportunities</h3>
                    <p className="advancement-subtitle">
                      There is room to grow in our practice with exciting opportunities 
                      in high level eye care
                    </p>
                  </div>
                  <div className="advancement-options">
                    <div className="advancement-card">
                      <div className="advancement-icon">🎓</div>
                      <h4>Para-Optometric Certification</h4>
                      <p>
                        Complete the American Optometric Association Para-Optometric program. 
                        This comprehensive approach to honing your eye care skills allows you 
                        to perform 80% of the modern day eye exam, under a doctor's supervision.
                      </p>
                    </div>
                    <div className="advancement-card">
                      <div className="advancement-icon">👔</div>
                      <h4>Leadership Roles</h4>
                      <p>
                        Opportunities include Practice Supervisor, Billing Department Head, 
                        and Practice Manager positions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

        {/* Equipment Showcase */}
        <section 
          ref={el => sectionRefs.current[3] = el}
          className={`careers-section equipment-section ${visibleSections.includes(3) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="equipment-header">
              <span className="section-badge">Technology</span>
              <h2 className="section-title-careers">State-of-the-Art Equipment</h2>
              <p className="section-subtitle-careers">
                Work with the latest technology in eye care diagnostics and treatment
              </p>
            </div>
            <div className="equipment-grid">
              {equipment.map((item, index) => (
                <div 
                  key={index} 
                  className="equipment-item"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <span className="equipment-checkmark">✓</span>
                  <span className="equipment-name">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="careers-cta-section">
          <div className="cta-content-wrapper">
            <div className="cta-icon-large">⚓</div>
            <h2 className="cta-title">Ready to Join Our Team?</h2>
            <p className="cta-text">
              Take the next step in your eye care career. Contact our Practice Administrator 
              to schedule an interview and learn more about opportunities at D.M.A.
            </p>
            <div className="contact-info-box">
              <div className="contact-person">
                <img
                  src={ColeenPhoto}
                  alt="Coleen Magalhaes"
                  className="contact-photo"
                />
                <div className="contact-details">
                  <h3 className="contact-name">Coleen Magalhaes</h3>
                  <p className="contact-title">Practice Administrator</p>
                </div>
              </div>
              <div className="contact-methods">
                <a href="tel:19788693705" className="contact-method">
                  <span className="method-icon">📞</span>
                  <span className="method-text">1-(978) 869-3705</span>
                </a>
                <a href="mailto:coleenmagalhaes@gmail.com" className="contact-method">
                  <span className="method-icon">✉️</span>
                  <span className="method-text">coleenmagalhaes@gmail.com</span>
                </a>
              </div>
            </div>
            <button className="cta-btn-large primary" onClick={() => navigate('/contact')}>
              <span className="btn-text">Request an Interview</span>
              <span className="btn-icon">📅</span>
            </button>
            <p className="cta-subtext">See you soon!</p>
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

export default CareersPage;