// LocationsPage.js
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Locations.css';
import AppointmentButton from '../../components/AppointmentButton';
import { locations, formatAddress, getWeekdaySummary } from '../../data/locations';

const LocationsPage = () => {
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
  }, []);

  const handleViewLocation = (route) => {
    navigate(route);
  };

  const handleGetDirections = (address) => {
    const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formatAddress(address))}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="locations-page">
      {/* Hero Section */}
      <section className="locations-hero">
        <div className="hero-overlay"></div>
        <div className="locations-hero-content">
          <h1 className="locations-hero-title">
            Serving the South Coast <br />
            <span className="highlight">With Two Convenient Locations</span>
          </h1>
          <p className="locations-hero-subtitle">
            Quality eye care close to home with the same exceptional service at both offices
          </p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <div className="locations-content-wrapper">
        
        {/* Locations Grid */}
        <section 
          ref={el => sectionRefs.current[0] = el}
          className={`locations-section ${visibleSections.includes(0) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="locations-grid">
              {locations.map((location, index) => (
                <div 
                  key={index} 
                  className="location-card"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="location-map">
                    <iframe
                      src={location.mapEmbed}
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={`Map of ${location.shortName}`}
                    ></iframe>
                  </div>

                  <div className="location-info">
                    <h2 className="location-name">{location.name}</h2>
                    
                    <div className="info-section">
                      <div className="info-item">
                        <span className="info-icon">📍</span>
                        <div className="info-text">
                          <p className="address-line">{location.address.street}</p>
                          {location.address.street2 && (
                            <p className="address-line">{location.address.street2}</p>
                          )}
                          <p className="address-line">
                            {location.address.city}, {location.address.state} {location.address.zip}
                          </p>
                        </div>
                      </div>

                      <div className="info-item">
                        <span className="info-icon">📞</span>
                        <div className="info-text">
                          <a href={`tel:${location.phone}`} className="phone-link">
                            {location.phone}
                          </a>
                          <p className="fax-text">Fax: {location.fax}</p>
                        </div>
                      </div>

                      <div className="info-item">
                        <span className="info-icon">🕐</span>
                        <div className="info-text">
                          {(() => {
                            const weekdaySummary = getWeekdaySummary(location.hours);
                            return (
                              <>
                                <p className="hours-line">Mon - Fri: {weekdaySummary.weekday}</p>
                                <p className="hours-line">Saturday: {weekdaySummary.saturday}</p>
                                <p className="hours-line">Sunday: {weekdaySummary.sunday}</p>
                              </>
                            );
                          })()}
                        </div>
                      </div>
                    </div>

                    <div className="location-actions">
                      <button 
                        className="location-btn primary"
                        onClick={() => handleGetDirections(location.address)}
                      >
                        <span className="btn-icon">🗺️</span>
                        <span className="btn-text">Get Directions</span>
                      </button>
                      <button 
                        className="location-btn secondary"
                        onClick={() => handleViewLocation(location.route)}
                      >
                        <span className="btn-text">View Details</span>
                        <span className="btn-arrow">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="locations-cta-section">
          <div className="cta-content-wrapper">
            <div className="cta-icon-large">⚓</div>
            <h2 className="cta-title">Ready to Visit Us?</h2>
            <p className="cta-text">
              Schedule your appointment at the location most convenient for you
            </p>
            <AppointmentButton className="cta-btn-large primary">
              <span className="btn-text">Schedule Appointment</span>
              <span className="btn-icon">📅</span>
            </AppointmentButton>
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

export default LocationsPage;