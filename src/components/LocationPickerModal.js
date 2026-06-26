// LocationPickerModal.js
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './LocationPickerModal.css';

const locations = [
  {
    name: 'North Attleboro',
    scheduleUrl: 'https://www.lenscrafters.com/ScheduleExamView?catalogId=11651&clearExams=1&langId=-1&storeNumber=0546&storeId=10851&refid=hicButton#/steps/appointment-type'
  },
  {
    name: 'Dartmouth',
    scheduleUrl: 'https://www.lenscrafters.com/ScheduleExamView?catalogId=11651&clearExams=1&langId=-1&storeNumber=0488&storeId=10851&refid=hicButton#/steps/appointment-type'
  }
];

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
    window.open(url, '_blank');
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