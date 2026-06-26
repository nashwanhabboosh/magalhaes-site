// Header.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import Dropdown from './Dropdown';
import AppointmentButton from './AppointmentButton';

export default function Header() {
  const [activeNav, setActiveNav] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 195);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navItems = [
    'HOME', 'ABOUT', 'DOCTORS', 'SERVICES',
    'PATIENT INFO', 'CAREERS', 'LOCATIONS', 'CONTACT US'
  ];
  
  const dropdownItems = {
    DOCTORS: [
      'John Magalhaes', 'Domenic Covello', 'Nicole Patricio',
      'Patricia Garcia', 'Tina Parker', 'Evan Hosney', 'Michelle Vining', 'Jacquelin Klombers'
    ],
    SERVICES: [
      'Comprehensive Eye Exam', 'Eye Care', 'Contact Lenses',
      {
        label: 'Eye Diseases',
        children: [
          'Cataracts Treatment', 'Conjunctivitis (Pink Eye)', 'Diabetic Eye Disease',
          'Dry Eye', 'Glaucoma', 'Macular Degeneration'
        ]
      },
      'Laser Vision Correction', 'Latisse', 'New Eyecare Meds', 'Optical Shop', 'Vision Problems'
    ],
    LOCATIONS: ['Dartmouth', 'North Attleboro']
  };

  const createSlug = (text) =>
    text.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '');

  const handleNavigation = (category, itemLabel) => {
    const urlSlug = createSlug(itemLabel);
    if (category === 'SERVICES') {
      const eyeDiseasesItem = dropdownItems.SERVICES.find(item => item.label === 'Eye Diseases');
      const isEyeDisease = eyeDiseasesItem?.children?.includes(itemLabel);
      navigate(isEyeDisease ? `/services/eye-diseases/${urlSlug}` : `/services/${urlSlug}`);
    } else if (category === 'DOCTORS') {
      navigate(`/doctors/${urlSlug}`);
    } else if (category === 'LOCATIONS') {
      if (itemLabel === 'Dartmouth') navigate('/location/north-dartmouth/');
      else if (itemLabel === 'North Attleboro') navigate('/location/north-attleboro-fashion-crossing/');
      else navigate(`/locations/${urlSlug}`);
    }
  };

  const handleSimpleNavClick = (item) => {
    setActiveNav(item);
    if (item === 'CONTACT US') navigate('/contact/');
    else if (item === 'HOME') navigate('/');
    else if (item === 'SERVICES') navigate('/services/');
    else if (item === 'DOCTORS') navigate('/doctors/');
    else navigate(`/${createSlug(item)}/`);
  };

  const navList = (
    <ul className="nav-list">
      {navItems.map((item) => (
        <li key={item} className="nav-item">
          {dropdownItems[item] ? (
            <Dropdown
              label={item}
              items={dropdownItems[item]}
              onItemClick={(itemLabel) => handleNavigation(item, itemLabel)}
              onLabelClick={() => handleSimpleNavClick(item)}
            />
          ) : (
            <button
              onClick={() => handleSimpleNavClick(item)}
              className={`nav-link ${activeNav === item ? 'active' : ''}`}
            >
              {item}
            </button>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Regular Header */}
      <header className="header-regular">
        <div className="top-bar">
          <div className="top-bar-container">
            <div className="logo-container" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <img src="/logo_transparent.png" alt="Eye Health Vision Centers" className="logo-img" />
            </div>
            <div className="top-bar-actions">
              <a href="https://portal.drcontactlens.com" target="_blank" rel="noopener noreferrer" className="action-link">ORDER CONTACTS</a>
              <div className="divider"></div>
              <a href="https://www.convergepay.com/hosted-payments/#!/payment-method" target="_blank" rel="noopener noreferrer" className="action-link">PAY INVOICE</a>
              <div className="divider"></div>
              <AppointmentButton className="pay-online-btn" label="SCHEDULE APPOINTMENT" />
            </div>
          </div>
        </div>
        <nav className="nav-bar">
          <div className="nav-container">
            {navList}
          </div>
        </nav>
      </header>

      {/* Sticky Header */}
      <header className={`header-sticky ${isScrolled ? 'visible' : ''}`}>
        <nav className="nav-bar">
          <div className="nav-container">
            <div className="nav-logo" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
              <img src="/logo_transparent.png" alt="Eye Health Vision Centers" className="nav-logo-img" />
            </div>
            {navList}
            <AppointmentButton className="nav-appointment-btn" label="SCHEDULE APPOINTMENT" />
          </div>
        </nav>
      </header>
    </>
  );
}