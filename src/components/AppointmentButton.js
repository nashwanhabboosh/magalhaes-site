// AppointmentButton.js
import React, { useState } from 'react';
import LocationPickerModal from './LocationPickerModal';

/**
 * AppointmentButton
 * 
 * A reusable button that opens the location picker modal.
 * 
 * Props:
 *   label      - button text (default: "Schedule Appointment")
 *   className  - CSS class(es) to apply to the button
 *   children   - optional: override label entirely with custom children
 */
const AppointmentButton = ({ label = 'Schedule Appointment', className = '', children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <LocationPickerModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <button className={className} onClick={() => setIsModalOpen(true)}>
        {children ?? label}
      </button>
    </>
  );
};

export default AppointmentButton;