// BlogCta.js
//
// The "Questions About Your Eyes?" band at the foot of the blog index
// and of each post.
import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentButton from '../../components/AppointmentButton';

const BlogCta = () => {
  const navigate = useNavigate();

  return (
    <section className="blog-cta-section">
      <div className="blog-cta-content">
        <h2 className="blog-cta-title">Questions About Your Eyes?</h2>
        <p className="blog-cta-text">
          Our doctors are happy to help. Schedule a visit at either of
          our locations, or get in touch with our team.
        </p>
        <div className="blog-cta-buttons">
          <AppointmentButton className="blog-cta-btn primary" label="Schedule Appointment" />
          <button className="blog-cta-btn secondary" onClick={() => navigate('/contact/')}>
            Contact Us
          </button>
        </div>
      </div>
      <div className="cta-waves">
        <div className="wave-bg wave-bg-1"></div>
        <div className="wave-bg wave-bg-2"></div>
      </div>
    </section>
  );
};

export default BlogCta;
