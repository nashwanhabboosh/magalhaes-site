// ServiceComponents.js
import React, { useState, useEffect, useRef } from 'react';
import './ServiceComponents.css';
import AppointmentButton from './AppointmentButton';

// 1. Service Hero Section with wave decoration and maritime gradient
export const ServiceHero = ({ title, subtitle, backgroundImage }) => {
  const heroStyle = backgroundImage 
    ? { 
        backgroundImage: `linear-gradient(rgba(26, 26, 46, 0.85), rgba(44, 62, 80, 0.85)), url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }
    : {};
    
  return (
    <div className="hero" style={heroStyle}>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        {subtitle && <p className="hero-subtitle">{subtitle}</p>}
      </div>
      <div className="hero-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
        </svg>
      </div>
    </div>
  );
};

// 2. Content Section with Fade-In Animation
export const ContentSection = ({ title, content, icon }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`content-section ${isVisible ? 'visible' : ''}`}
    >
      <div className="section-header">
        {icon && <span className="section-icon">{icon}</span>}
        <h2 className="section-title">{title}</h2>
      </div>
      <div className="section-content">{content}</div>
    </div>
  );
};

// 3. Alternating Content Blocks with Images
export const AlternatingImageSection = ({ sections }) => {
  const [visibleSections, setVisibleSections] = useState([]);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const currentRefs = sectionRefs.current;
    const observers = sections.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.1 }
      );
      if (currentRefs[index]) observer.observe(currentRefs[index]);
      return observer;
    });
    return () => {
      observers.forEach((observer, index) => {
        if (currentRefs[index]) observer.unobserve(currentRefs[index]);
      });
    };
  }, [sections]);

  return (
    <div className="alternating-container">
      {sections.map((section, index) => {
        const isEven = index % 2 === 0;
        const isVisible = visibleSections.includes(index);

        return (
          <div
            key={index}
            ref={el => sectionRefs.current[index] = el}
            className={`alternating-section ${isEven ? 'left' : 'right'} ${isVisible ? 'visible' : ''}`}
          >
            <div className="alternating-content">
              {section.tag && <p className="alternating-tag">{section.tag}</p>}
              <h3 className="alternating-title">{section.title}</h3>
              <p className="alternating-text">{section.content}</p>
            </div>
            <div className="alternating-image">
              <img
                src={section.image}
                alt={section.alt || section.title}
                onError={e => {
                  e.currentTarget.parentElement.innerHTML =
                    '<div class="image-error">Image unavailable</div>';
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};

// 4. Accordion FAQ Component
export const AccordionFAQ = ({ faqs }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="accordion-container">
      <h2 className="accordion-main-title">Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="accordion-item">
          <button
            onClick={() => toggleAccordion(index)}
            className="accordion-button"
          >
            <span className="accordion-question">{faq.question}</span>
            <span className={`accordion-icon ${openIndex === index ? 'open' : ''}`}>
              ▼
            </span>
          </button>
          <div className={`accordion-content ${openIndex === index ? 'open' : ''}`}>
            <p className="accordion-answer">{faq.answer}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// 5. Hoverable Feature Cards
export const FeatureCards = ({ features }) => {
  return (
    <div className="cards-container">
      {features.map((feature, index) => (
        <div key={index} className="feature-card">
          <div className="card-icon">{feature.icon}</div>
          <h3 className="card-title">{feature.title}</h3>
          <p className="card-description">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

// 6. Call-to-Action Section
export const CTASection = ({ title, description, buttonText, icon = '📅' }) => {
  return (
    <section className="about-cta-section">
      <div className="cta-content-wrapper">
        {icon && <div className="cta-icon-large">{icon}</div>}
        <h2 className="cta-title">{title}</h2>
        <p className="cta-text">{description}</p>
        <AppointmentButton className="cta-btn-large primary">
          <span className="btn-text">{buttonText}</span>
          <span className="btn-icon">📅</span>
        </AppointmentButton>
      </div>
      <div className="cta-waves">
        <div className="wave-bg wave-bg-1"></div>
        <div className="wave-bg wave-bg-2"></div>
      </div>
    </section>
  );
};

// 7. Timeline/Steps Component
export const ProcedureTimeline = ({ steps }) => {
  const [visibleSteps, setVisibleSteps] = useState([]);
  const stepRefs = useRef([]);

  useEffect(() => {
    const currentRefs = stepRefs.current;
    const observers = steps.map((_, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps(prev => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.3 }
      );

      if (currentRefs[index]) {
        observer.observe(currentRefs[index]);
      }

      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (currentRefs[index]) {
          observer.unobserve(currentRefs[index]);
        }
      });
    };
  }, [steps]);

  return (
    <div className="timeline-container">
      <h2 className="timeline-title">The Process</h2>
      {steps.map((step, index) => {
        const isVisible = visibleSteps.includes(index);
        return (
          <div
            key={index}
            ref={el => stepRefs.current[index] = el}
            className={`timeline-step ${isVisible ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
          >
            <div className={`step-number ${isVisible ? 'visible' : ''}`}>
              {index + 1}
            </div>
            <div className="step-content">
              <h3 className="step-title">{step.title}</h3>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};