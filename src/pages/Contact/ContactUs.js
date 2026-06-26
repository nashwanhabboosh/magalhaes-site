import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    preferredContact: 'email',
    message: '',
    appointmentType: 'general'
  });

  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setFormStatus('Thank you for contacting us! We will get back to you shortly.');
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        location: '',
        preferredContact: 'email',
        message: '',
        appointmentType: 'general'
      });
      setFormStatus('');
    }, 3000);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Contact Us</h1>
        <p>We're here to help with all your eye care needs</p>
      </div>

      <div className="contact-container">
        {/* Contact Information Section */}
        <div className="contact-info-section">
          <div className="office-locations">
            <h2>Our Locations</h2>
            
            <div className="location-card">
              <h3>North Attleboro Office</h3>
              <div className="location-details">
                <div className="detail-item">
                  <span className="icon">📍</span>
                  <div>
                    <p>1250 S. Washington St</p>
                    <p>Marshall</p>
                    <p>North Attleborough, MA 02760</p>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="icon">📞</span>
                  <p>(508) 717-0425</p>
                </div>
                <div className="detail-item">
                  <span className="icon">📠</span>
                  <p>Fax: (508) 992-3239</p>
                </div>
                <div className="detail-item">
                  <span className="icon">🕒</span>
                  <div>
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:30 PM</p>
                    <p><strong>Saturday:</strong> 9:00 AM - 4:30 PM</p>
                    <p><strong>Sunday:</strong> 12:00 PM - 3:30 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="location-card">
              <h3>North Dartmouth Office</h3>
              <div className="location-details">
                <div className="detail-item">
                  <span className="icon">📍</span>
                  <div>
                    <p>382 State Road</p>
                    <p>Dartmouth Towne Center</p>
                    <p>North Dartmouth, MA 02747</p>
                  </div>
                </div>
                <div className="detail-item">
                  <span className="icon">📞</span>
                  <p>(508) 717-0425</p>
                </div>
                <div className="detail-item">
                  <span className="icon">📠</span>
                  <p>Fax: (508) 992-3239</p>
                </div>
                <div className="detail-item">
                  <span className="icon">🕒</span>
                  <div>
                    <p><strong>Monday - Friday:</strong> 9:00 AM - 6:30 PM</p>
                    <p><strong>Saturday:</strong> 9:00 AM - 4:30 PM</p>
                    <p><strong>Sunday:</strong> 12:00 PM - 3:30 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="contact-form-section">
          <h2>Send Us a Message</h2>
          <p className="form-subtitle">Have a question or want to schedule an appointment? Fill out the form below.</p>
          
          {formStatus && (
            <div className="form-status-message">
              {formStatus}
            </div>
          )}

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location">Preferred Location *</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select a location</option>
                  <option value="north-attleboro">North Attleboro</option>
                  <option value="north-dartmouth">North Dartmouth</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="appointmentType">Appointment Type</label>
                <select
                  id="appointmentType"
                  name="appointmentType"
                  value={formData.appointmentType}
                  onChange={handleChange}
                >
                  <option value="general">General Eye Exam</option>
                  <option value="contact-lens">Contact Lens Fitting</option>
                  <option value="emergency">Eye Emergency</option>
                  <option value="consultation">Consultation</option>
                  <option value="follow-up">Follow-up Visit</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="preferredContact">Preferred Contact Method</label>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="email"
                    checked={formData.preferredContact === 'email'}
                    onChange={handleChange}
                  />
                  Email
                </label>
                <label className="radio-label">
                  <input
                    type="radio"
                    name="preferredContact"
                    value="phone"
                    checked={formData.preferredContact === 'phone'}
                    onChange={handleChange}
                  />
                  Phone
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us how we can help you..."
                required
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="additional-info">
        <div className="info-container">
          <div className="info-card">
            <h3>Insurance Accepted</h3>
            <p>We accept most major insurance plans. Please contact us to verify your specific coverage.</p>
          </div>
          <div className="info-card">
            <h3>New Patients Welcome</h3>
            <p>We're always happy to welcome new patients to our practice. Schedule your first appointment today!</p>
          </div>
          <div className="info-card">
            <h3>Bilingual Services</h3>
            <p>We offer services in English, Portuguese, and Spanish to better serve our diverse community.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;