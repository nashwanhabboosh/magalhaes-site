// LocationPage.js
import React, { useState, useEffect, useRef } from 'react';
import './LocationPage.css';
import AppointmentButton from './AppointmentButton';
import { formatAddress } from '../data/locations';

const LocationPage = ({ location }) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [activeDay, setActiveDay] = useState(null);
  const mapRef = useRef(null);

  const locationData = location;

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setIsMapLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Get current day to highlight
  useEffect(() => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const today = days[new Date().getDay()];
    setActiveDay(today);
  }, []);

  const handleDirections = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(formatAddress(locationData.address))}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${locationData.phone.replace(/[^0-9]/g, '')}`;
  };

  return (
    <div className="location-page">
      {/* Hero Section */}
      <div className="location-hero">
        <div className="hero-background">
          <div className="gradient-orb orb-1"></div>
          <div className="gradient-orb orb-2"></div>
          <div className="gradient-orb orb-3"></div>
        </div>
        <div className="hero-content">
          <div className="hero-label">Visit Us</div>
          <h1 className="location-title">{locationData.name}</h1>
          <p className="hero-subtitle">Experience exceptional eye care in a welcoming environment</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="location-content">
        {/* Map Section */}
        <div className="map-section">
          <div className={`map-container ${isMapLoaded ? 'loaded' : ''}`}>
            <iframe
              ref={mapRef}
              title="Office Location Map"
              src={locationData.mapEmbed}
              className="location-map"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="map-overlay" onClick={handleDirections}>
              <div className="map-pin">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
            </div>
          </div>
          <button className="directions-btn" onClick={handleDirections}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 5l7 7-7 7"/>
            </svg>
            Get Directions
          </button>
        </div>

        {/* Info Cards Grid */}
        <div className="info-grid">
          {/* Address Card */}
          <div className="info-card address-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
            <h3 className="card-title">Address</h3>
            <div className="card-content">
              <p className="address-line">{locationData.address.street}</p>
              {locationData.address.street2 && (
                <p className="address-line">{locationData.address.street2}</p>
              )}
              <p className="address-line">
                {locationData.address.city}, {locationData.address.state} {locationData.address.zip}
              </p>
            </div>
            <button className="card-action" onClick={handleDirections}>
              View on Map →
            </button>
          </div>

          {/* Contact Card */}
          <div className="info-card contact-card">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2c0-4.97-4.03-9-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
              </svg>
            </div>
            <h3 className="card-title">Contact</h3>
            <div className="card-content">
              <div className="contact-item">
                <span className="contact-label">Phone:</span>
                <a href={`tel:${locationData.phone.replace(/[^0-9]/g, '')}`} className="contact-link">
                  {locationData.phone}
                </a>
              </div>
              <div className="contact-item">
                <span className="contact-label">Fax:</span>
                <span className="contact-value">{locationData.fax}</span>
              </div>
            </div>
            <button className="card-action" onClick={handleCall}>
              Call Now →
            </button>
          </div>

          {/* Hours Card */}
          <div className="info-card hours-card full-width">
            <div className="card-icon">
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
              </svg>
            </div>
            <h3 className="card-title">Office Hours</h3>
            <div className="hours-list">
              {locationData.hours.map((schedule, index) => (
                <div 
                  key={index} 
                  className={`hours-item ${schedule.day === activeDay ? 'active' : ''}`}
                >
                  <span className="day-name">
                    {schedule.day}
                    {schedule.day === activeDay && <span className="today-badge">Today</span>}
                  </span>
                  <span className="hours-time">{schedule.hours}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <AppointmentButton className="action-button primary" label="Schedule Appointment" />
          <button className="action-button secondary" onClick={handleDirections}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            Get Directions
          </button>
        </div>
      </div>
    </div>
  );
};

export default LocationPage;