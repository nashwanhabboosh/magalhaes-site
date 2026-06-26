// EyeDiseases.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ServiceHero
} from '../../components/ServiceComponents';
import '../../components/ServiceComponents.css';
import './eye-diseases.css';
import AppointmentButton from '../../components/AppointmentButton';

const EyeDiseases = () => {
  const navigate = useNavigate();

  const conditions = [
    { 
      icon: '👁️', 
      title: 'Cataract Treatment', 
      description: 'Comprehensive evaluation and treatment options for cataracts, including surgical referrals when needed.',
      link: '/services/eye-diseases/cataracts-treatment'
    },
    { 
      icon: '👀', 
      title: 'Conjunctivitis (Pink Eye)', 
      description: 'Diagnosis and treatment of viral, bacterial, and allergic conjunctivitis to relieve discomfort and prevent spread.',
      link: '/services/eye-diseases/conjunctivitis-pink-eye'
    },
    { 
      icon: '💉', 
      title: 'Diabetic Eye Disease', 
      description: 'Specialized care for diabetic retinopathy, including screening, monitoring, and advanced treatment options.',
      link: '/services/eye-diseases/diabetic-eye-disease'
    },
    { 
      icon: '💧', 
      title: 'Dry Eye', 
      description: 'Advanced diagnostics with TearLab and cutting-edge treatments including Regener-Eyes and amniotic membrane therapy.',
      link: '/services/eye-diseases/dry-eye'
    },
    { 
      icon: '🔍', 
      title: 'Glaucoma', 
      description: 'Early detection and comprehensive treatment of the "sneaky thief of sight" to preserve your vision.',
      link: '/services/eye-diseases/glaucoma'
    },
    { 
      icon: '🎯', 
      title: 'Macular Degeneration', 
      description: 'Advanced AMD detection with Maculogix technology and treatment options including anti-VEGF injections.',
      link: '/services/eye-diseases/macular-degeneration'
    },
  ];

  const emergencyCards = [
    {
      icon: '⚡',
      title: 'Flashes & Floaters',
      description: 'New symptoms of flashes of lights and/or spots floating in your vision require immediate attention.'
    },
    {
      icon: '🚨',
      title: 'Sudden Vision Loss',
      description: 'Sudden loss of vision in one or both eyes is a medical emergency requiring immediate care.'
    },
    {
      icon: '⚠️',
      title: 'Severe Eye Pain',
      description: 'Sudden eye pain may indicate a serious condition and should be evaluated immediately.'
    },
  ];

  const handleConditionClick = (link) => {
    navigate(link);
  };

  return (
    <div className="service-page">
      <ServiceHero 
        title="Eye Diseases"
        subtitle="Comprehensive diagnosis and treatment for a wide range of eye conditions"
      />
      
      <div className="service-page-content">
        <div className="eye-diseases-intro">
          <p>
            At Dr. Magalhaes and Associates, we provide expert care for a comprehensive range of eye diseases 
            and conditions. Our state-of-the-art diagnostic equipment and experienced team ensure you receive 
            the highest quality treatment to preserve your vision and eye health.
          </p>
          <p>
            Click on any condition below to learn more about symptoms, diagnosis, and treatment options.
          </p>
        </div>

        <div className="conditions-grid">
          {conditions.map((condition, index) => (
            <div 
              key={index} 
              className="condition-card clickable"
              onClick={() => handleConditionClick(condition.link)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleConditionClick(condition.link);
                }
              }}
            >
              <div className="card-icon">{condition.icon}</div>
              <h3 className="card-title">{condition.title}</h3>
              <p className="card-description">{condition.description}</p>
              <div className="card-arrow">→</div>
            </div>
          ))}
        </div>

        <div className="emergency-section">
          <h2 className="emergency-title">Eye Emergencies</h2>
          <p className="emergency-subtitle">
            If you experience any of these symptoms, please contact your eye care provider immediately.
          </p>
          
          <div className="emergency-cards">
            {emergencyCards.map((card, index) => (
              <div key={index} className="emergency-card">
                <div className="emergency-icon">{card.icon}</div>
                <h3 className="emergency-card-title">{card.title}</h3>
                <p className="emergency-description">{card.description}</p>
              </div>
            ))}
          </div>

          <div className="emergency-notice">
            <strong>⚠️ Important:</strong> Eye emergencies require prompt attention. 
            If you are experiencing any of these symptoms, please call our office immediately 
            or visit the nearest emergency room if after hours.
          </div>
        </div>

        <div className="cta-section">
          <h2>Concerned About Your Eye Health?</h2>
          <p>Schedule a comprehensive eye examination to protect your vision and detect eye diseases early when they're most treatable.</p>
          <AppointmentButton className="cta-button" label="Schedule Eye Exam" />
        </div>
      </div>
    </div>
  );
};

export default EyeDiseases;