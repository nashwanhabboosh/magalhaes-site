// Sitemap.js
//
// Human-readable site map. The link groups below are kept in sync by hand
// with the routes registered in src/App.js (routing is fully manual in this
// project). Doctors are pulled from the central data source so that section
// stays in sync automatically.
import React from 'react';
import { Link } from 'react-router-dom';
import './Sitemap.css';
import { doctors } from '../../data/doctors';

// Grouped links mirroring the routes in src/App.js.
const mainPages = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about/' },
  { label: 'Patient Info', to: '/patient-info/' },
  { label: 'Careers', to: '/careers/' },
  { label: 'Contact Us', to: '/contact/' },
];

const locationPages = [
  { label: 'North Attleboro (Fashion Crossing)', to: '/location/north-attleboro-fashion-crossing' },
  { label: 'North Dartmouth', to: '/location/north-dartmouth' },
];

const servicePages = [
  { label: 'Comprehensive Eye Exam', to: '/services/comprehensive-eye-exam' },
  { label: 'Eye Care', to: '/services/eye-care' },
  { label: 'Contact Lenses', to: '/services/contact-lenses' },
  { label: 'Laser Vision Correction', to: '/services/laser-vision-correction' },
  { label: 'Latisse', to: '/services/latisse' },
  { label: 'New Eyecare Meds', to: '/services/new-eyecare-meds' },
  { label: 'Optical Shop', to: '/services/optical-shop' },
  { label: 'Vision Problems', to: '/services/vision-problems' },
];

const eyeDiseasePages = [
  { label: 'Eye Diseases Overview', to: '/services/eye-diseases' },
  { label: 'Cataracts Treatment', to: '/services/eye-diseases/cataracts-treatment' },
  { label: 'Conjunctivitis (Pink Eye)', to: '/services/eye-diseases/conjunctivitis-pink-eye' },
  { label: 'Diabetic Eye Disease', to: '/services/eye-diseases/diabetic-eye-disease' },
  { label: 'Dry Eye', to: '/services/eye-diseases/dry-eye' },
  { label: 'Glaucoma', to: '/services/eye-diseases/glaucoma' },
  { label: 'Macular Degeneration', to: '/services/eye-diseases/macular-degeneration' },
];

const doctorPages = doctors.map((doc) => ({
  label: doc.credentials ? `${doc.name}, ${doc.credentials}` : doc.name,
  to: `/doctors/${doc.slug}`,
}));

const SitemapColumn = ({ icon, title, overviewTo, links }) => (
  <div className="sitemap-column">
    <h2 className="sitemap-column-title">
      <span className="sitemap-column-icon" aria-hidden="true">{icon}</span>
      {overviewTo ? <Link to={overviewTo}>{title}</Link> : title}
    </h2>
    <ul className="sitemap-links">
      {links.map((link) => (
        <li key={link.to}>
          <Link to={link.to}>{link.label}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const Sitemap = () => {
  return (
    <div className="sitemap-page">
      {/* Hero */}
      <section className="sitemap-hero">
        <div className="sitemap-hero-overlay"></div>
        <div className="sitemap-hero-content">
          <h1 className="sitemap-hero-title">Site Map</h1>
          <p className="sitemap-hero-subtitle">
            Find your way around Dr. Magalhães and Associates — every page on our
            site, all in one place.
          </p>
        </div>
        <div className="sitemap-hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
          </svg>
        </div>
      </section>

      {/* Content */}
      <div className="sitemap-content">
        <div className="sitemap-grid">
          <SitemapColumn icon="🏠" title="Main Pages" links={mainPages} />
          <SitemapColumn icon="📍" title="Locations" overviewTo="/locations/" links={locationPages} />
          <SitemapColumn icon="👨‍⚕️" title="Doctors" overviewTo="/doctors/" links={doctorPages} />
          <SitemapColumn icon="👁️" title="Services" overviewTo="/services/" links={servicePages} />
          <SitemapColumn icon="🩺" title="Eye Diseases" overviewTo="/services/eye-diseases" links={eyeDiseasePages} />
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
