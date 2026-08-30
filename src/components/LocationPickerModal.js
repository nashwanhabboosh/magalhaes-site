// LocationPickerModal.js
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { locations as officeLocations } from '../data/locations';
import './LocationPickerModal.css';

const locations = officeLocations.map(({ shortName, scheduleUrl }) => ({
  name: shortName,
  scheduleUrl
}));

const LocationPickerModal = ({ isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLocationClick = (url) => {
    // LensCrafters' scheduling site sits behind a WAF that rejects
    // requests carrying a Referer header from an unrecognized domain
    // (confirmed via testing: works with rel="noreferrer", fails without).
    // window.open's third argument supports "noopener,noreferrer" as
    // window features to suppress the referrer, matching the anchor-tag
    // rel="noreferrer" behavior that fixed this in testing.
    window.open(url, '_blank', 'noopener,noreferrer');
    onClose();
  };

  return createPortal(
    <div className="lpm-backdrop" onClick={onClose}>
      <div className="lpm-modal" onClick={(e) => e.stopPropagation()}>
        <button className="lpm-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="lpm-header">
          <div className="lpm-icon">📅</div>
          <h2 className="lpm-title">Schedule an Appointment</h2>
          <p className="lpm-subtitle">Choose your preferred location</p>
        </div>
        <div className="lpm-locations">
          {locations.map((loc) => (
            <button
              key={loc.name}
              className="lpm-location-btn"
              onClick={() => handleLocationClick(loc.scheduleUrl)}
            >
              <span className="lpm-location-pin">📍</span>
              <span className="lpm-location-name">{loc.name}</span>
              <span className="lpm-location-arrow">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LocationPickerModal;