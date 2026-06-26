import React from 'react';
import './DoctorProfile.css';
// DoctorProfile Component
export const DoctorProfile = ({ doctor }) => {
  return (
    <div className="doctor-profile-container">
      <div className="profile-card">
        <div className="sidebar">
          <div className="image-container">
            {doctor.image ? (
              <img 
                src={doctor.image} 
                alt={`Dr. ${doctor.name}`}
                className="profile-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className="profile-image-placeholder" 
              style={{ display: doctor.image ? 'none' : 'flex' }}
            >
              <span className="placeholder-initials">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            <div className="image-info">
              <h1 className="image-name">Dr. {doctor.name}</h1>
              {doctor.credentials && (
                <p className="image-credentials">{doctor.credentials}</p>
              )}
            </div>
          </div>
          
          {doctor.testimonials && doctor.testimonials.length > 0 && (
            <div className="testimonials-section">
              <h3 className="testimonials-title">Patient Testimonials</h3>
              <div className="testimonials-list">
                {doctor.testimonials.map((testimonial, index) => (
                  <div key={index} className="testimonial-card">
                    <p className="testimonial-text">"{testimonial.text}"</p>
                    <p className="testimonial-author">— {testimonial.author}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="content">
          <div className="section">
            <h2 className="section-title">About</h2>
            <p className="bio">{doctor.bio}</p>
          </div>
          
          {doctor.specialties && doctor.specialties.length > 0 && (
            <div className="section">
              <h2 className="section-title">Specialties</h2>
              <ul className="list">
                {doctor.specialties.map((specialty, index) => (
                  <li key={index} className="list-item">{specialty}</li>
                ))}
              </ul>
            </div>
          )}
          
          {doctor.education && doctor.education.length > 0 && (
            <div className="section">
              <h2 className="section-title">Education</h2>
              <ul className="list">
                {doctor.education.map((edu, index) => (
                  <li key={index} className="list-item">{edu}</li>
                ))}
              </ul>
            </div>
          )}
          
          {doctor.experience && doctor.experience.length > 0 && (
            <div className="section">
              <h2 className="section-title">Experience</h2>
              <ul className="list">
                {doctor.experience.map((exp, index) => (
                  <li key={index} className="list-item">{exp}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};