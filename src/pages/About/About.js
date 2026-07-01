// AboutPage.js
import React, { useState, useRef, useEffect } from 'react';
import './About.css';
import AppointmentButton from '../../components/AppointmentButton';
import { R2_BASE_URL } from '../../config';

import abb362 from '../../assets/ABB/ABB-2023-Powers-362.jpg';
import abb391 from '../../assets/ABB/ABB-2023-Powers-391.jpg';
import abb429 from '../../assets/ABB/ABB-2023-Powers-357.jpg';
import abb483 from '../../assets/ABB/ABB-2023-Powers-483.jpg';

import morocco1 from '../../assets/Missions/Morocco/Morocco1.jpg';
import morocco2 from '../../assets/Missions/Morocco/Morocco2.jpg';
import morocco3 from '../../assets/Missions/Morocco/Morocco3.jpg';

const testimonial1 = `${R2_BASE_URL}/Testimonials/Magalhaes-Sharon.mp4`;
const testimonial2 = `${R2_BASE_URL}/Testimonials/Magalhaes-Richard.mp4`;
const testimonial3 = `${R2_BASE_URL}/Testimonials/Magalhaes-John.mp4`;
const testimonial4 = `${R2_BASE_URL}/Testimonials/Magalhaes-Crystal.mp4`;

const tanzania1 = `${R2_BASE_URL}/Missions/Tanzania/Tanzania1.mov`;
const tanzania2 = `${R2_BASE_URL}/Missions/Tanzania/Tanzania2.mov`;
const tanzania3 = `${R2_BASE_URL}/Missions/Tanzania/Tanzania3.mov`;

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState('morocco');
  const [visibleSections, setVisibleSections] = useState([]);
  const [activeVideo, setActiveVideo] = useState(0);
  const [modalImage, setModalImage] = useState(null);
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setModalImage(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const sections = sectionRefs.current; // snapshot the array once

    const observers = sections.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSections(prev => [...new Set([...prev, index])]);
          }
        },
        { threshold: 0.1 }
      );
      if (ref) observer.observe(ref);
      return observer;
    });

    return () => {
      observers.forEach((observer, index) => {
        if (sections[index]) observer.unobserve(sections[index]); // use the snapshot, not sectionRefs.current
      });
    };
  }, []);

  const abbPhotos = [abb362, abb391, abb429, abb483];
  const moroccoPhotos = [morocco1, morocco2, morocco3];
  const tanzaniaVideos = [
    { src: tanzania1, title: 'Tanzania Mission 2023 — Part 1' },
    { src: tanzania2, title: 'Tanzania Mission 2023 — Part 2' },
    { src: tanzania3, title: 'Tanzania Mission 2023 — Part 3' },
  ];

  const testimonialVideos = [testimonial1, testimonial2, testimonial3, testimonial4];

  const testimonials = [
    {
      name: 'Nate Gowan',
      date: 'Oct 2025',
      quote: 'Dr. Magalhaes diagnosed me with a rare eye disease that was preventing me from being able to see properly. He and his team worked tirelessly to help me reach 20/40 vision in both of my eyes for a very important career opportunity. I saw him for nine appointments, with each appointment stepping closer and closer to that goal. He not only enabled me to pass an eye exam for this new career but also improved my quality of life by giving the gift of sight back to me. I really wish I could give Dr. Magalhaes a higher star rating than just 5 stars — say 10 out of 5 — because he truly is amazing!',
      rating: 5,
    },
    {
      name: 'Ben',
      date: 'Dec 2025',
      quote: 'Doctor Magalhaes found a very helpful treatment for my severe eyestrain, which many other eye specialists have been unable to do. His practice is excellent at treating uncommon eye conditions. For common issues they offer cutting edge therapies that you will not find elsewhere. Moreover Doctor Magalhaes himself is thoughtful, perceptive and collaborative and never gives up on his patients, which are the best qualities in any healthcare provider.',
      rating: 5,
    },
    {
      name: 'Eurome Larochelle',
      date: 'Feb 2025',
      quote: 'Dr. Magalhaes used the most technologically advanced equipment I had ever seen, he explained the details of my prescription, options for contact lenses, and as I type this now, I can say the adjustments he made to my prescription have me seeing more clearly than I have in years. His staff was welcoming and professional. My overall experience with Dr. Magalhaes was outstanding. I highly recommend his services.',
      rating: 5,
    },
    {
      name: 'Brooke Angell',
      date: 'Aug 2024',
      quote: 'I\'ve had a great experience with Dr. Magalhaes and his kind and well trained staff. He is very thorough in his examinations, explains things clearly and takes the time to answer all of my questions very in depth. I was recently diagnosed with keratoconus, and he has been so helpful in helping me understand the disease and has outlined a very thorough treatment plan. You will never feel rushed or not listened to here.',
      rating: 5,
    },
    {
      name: 'Lee Cam',
      date: 'Jun 2025',
      quote: 'I have been going to Dr Magalhaes for a better part of 20 years — they are great!! I can\'t thank them enough for helping me as I get older and my eyes need the attention he provides. His office is very friendly, helpful and accommodating with scheduling due to my work schedule. Highly recommend Dr Magalhaes and his crew to anyone who needs to see an Optometrist.',
      rating: 5,
    },
    {
      name: 'Buell Hollister',
      date: 'Jun 2024',
      quote: 'Friendly, direct and extremely competent. Diagnosed my cataracts and, after the operation, followed up meticulously with subsequent exams until we were both satisfied with the outcome. I now, at the age of 85, have 20/20 vision.',
      rating: 5,
    },
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="about-hero-content">
          <h1 className="about-hero-title">
            Our Focus Is On <br />
            <span className="highlight">Your Eyes</span>
          </h1>
          <p className="about-hero-subtitle">
            Bringing clarity, confidence, and a zest for life through 
            exceptional eye care and community service
          </p>
        </div>
        <div className="hero-wave">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 Q300,60 600,30 T1200,0 L1200,120 L0,120 Z" fill="#fafbfc"></path>
          </svg>
        </div>
      </section>

      <div className="about-content-wrapper">

        {/* Our Practice Section — index 0 */}
        <section
          ref={el => sectionRefs.current[0] = el}
          className={`about-section practice-section ${visibleSections.includes(0) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="section-header-about">
              <span className="section-badge">Our Practice</span>
              <h2 className="section-title-about">Optometry in Southeastern MA</h2>
            </div>
            <div className="practice-content">
              <div className="practice-text">
                <p>
                  We at Dr. Magalhaes and Associates will advocate for your visual needs to bring 
                  clarity, confidence, and a zest for life through high tech examinations of the 
                  visual system. Years of combined clinical experience have allowed our skilled 
                  doctors to gain experience in the areas of Lasik co-management, contact lens 
                  fitting expertise as the area's leading contact lens specialists, and medical 
                  management of common and complex eye conditions.
                </p>
                <p>
                  We work closely with local physicians and ophthalmologists to meet your medical 
                  and surgical needs. We bring this passionate energy and zeal into our daily 
                  treatment of you as a person, respecting your right to healthy use of your eyes 
                  while blending in detailed use of needed tools such as state-of-the-art contact 
                  lenses, premium eyeglasses, and carefully crafted eyecare treatment plans to meet 
                  each of your visual needs.
                </p>
              </div>
              <div className="practice-features">
                <div className="feature-item">
                  <div className="feature-icon">👁️</div>
                  <h3>Expert Care</h3>
                  <p>Years of combined clinical experience</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🔬</div>
                  <h3>Advanced Technology</h3>
                  <p>State-of-the-art diagnostic equipment</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">🤝</div>
                  <h3>Collaborative Approach</h3>
                  <p>Working with local physicians & specialists</p>
                </div>
                <div className="feature-item">
                  <div className="feature-icon">💙</div>
                  <h3>Patient-Centered</h3>
                  <p>Personalized treatment plans for you</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section — index 1 */}
        <section
          ref={el => sectionRefs.current[1] = el}
          className={`about-section about-testimonials-section ${visibleSections.includes(1) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="section-header-about centered">
              <span className="section-badge">Testimonials</span>
              <h2 className="section-title-about">What Our Patients Say</h2>
              <p className="section-subtitle-about">
                Hear from the patients we've had the privilege of caring for
              </p>
            </div>

            <div className="about-testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="about-testimonial-card"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className="about-testimonial-stars">
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <blockquote className="about-testimonial-quote">
                    {testimonial.quote}
                  </blockquote>
                  <div className="about-testimonial-author">
                    <span>— {testimonial.name}</span>
                    <span className="testimonial-date">{testimonial.date}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="about-testimonial-video-section">
              <h3 className="about-video-section-title">See What Patients Are Saying</h3>
              <div className="testimonial-video-slider">
                <div className="testimonial-video-wrapper">
                  <video
                    key={activeVideo}
                    controls
                    className="about-testimonial-video"
                    playsInline
                  >
                    <source src={testimonialVideos[activeVideo]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <div className="testimonial-video-dots">
                  {testimonialVideos.map((_, index) => (
                    <button
                      key={index}
                      className={`video-dot ${activeVideo === index ? 'active' : ''}`}
                      onClick={() => setActiveVideo(index)}
                      aria-label={`Testimonial video ${index + 1}`}
                    />
                  ))}
                </div>
                <div className="testimonial-video-nav">
                  <button
                    className="video-nav-btn"
                    onClick={() => setActiveVideo(prev => (prev - 1 + testimonialVideos.length) % testimonialVideos.length)}
                    aria-label="Previous video"
                  >
                    ←
                  </button>
                  <span className="video-nav-count">{activeVideo + 1} / {testimonialVideos.length}</span>
                  <button
                    className="video-nav-btn"
                    onClick={() => setActiveVideo(prev => (prev + 1) % testimonialVideos.length)}
                    aria-label="Next video"
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABB Partnership Section — index 2 */}
        <section
          ref={el => sectionRefs.current[2] = el}
          className={`about-section abb-section ${visibleSections.includes(2) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="section-header-about">
              <span className="section-badge">Recognition</span>
              <h2 className="section-title-about">Moments That Matter Campaign</h2>
            </div>
            <div className="abb-content">
              <div className="abb-text-block">
                <p>
                  In July of 2023, our distributor, ABB, and their Marketing team, executed a 
                  video-photo shoot to showcase our practice and our staff. We have been working 
                  with ABB Optical for our contact lens services for over 20 years. We have 
                  utilized ABB across all of their platforms.
                </p>
                <p>
                  The marketing campaign called "Moments that Matter", launched in Q4 of 2023. 
                  We were selected based on a rigorous process that evaluated optometric practices' 
                  successes, processes, and patient satisfaction surveys. Our office manager and 
                  staff were interviewed during professional sessions. Ideas were shared and 
                  articles written in national magazines.
                </p>
              </div>
              <div className="photo-gallery">
                {abbPhotos.map((photo, index) => (
                  <div key={index} className="gallery-item" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => setModalImage(photo)}>
                    <img src={photo} alt={`ABB Campaign ${index + 1}`} className="gallery-image" />
                    <div className="gallery-overlay"><span className="view-icon">🔍</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Work Section — index 3 */}
        <section
          ref={el => sectionRefs.current[3] = el}
          className={`about-section mission-section ${visibleSections.includes(3) ? 'visible' : ''}`}
        >
          <div className="section-container">
            <div className="section-header-about centered">
              <span className="section-badge">Global Impact</span>
              <h2 className="section-title-about">Vision Mission Work</h2>
              <p className="section-subtitle-about">
                Bringing the gift of sight to underserved communities around the world
              </p>
            </div>

            <div className="mission-tabs">
              <button className={`tab-button ${activeTab === 'morocco' ? 'active' : ''}`} onClick={() => setActiveTab('morocco')}>
                <span className="tab-icon">🌍</span>Morocco Mission
              </button>
              <button className={`tab-button ${activeTab === 'tanzania' ? 'active' : ''}`} onClick={() => setActiveTab('tanzania')}>
                <span className="tab-icon">🌍</span>Tanzania Mission
              </button>
            </div>

            {activeTab === 'morocco' && (
              <div className="mission-content fade-in">
                <div className="mission-text-card">
                  <div className="mission-year">1999 - 2001</div>
                  <h3 className="mission-card-title">Gift of Sight Program</h3>
                  <p>
                    In 1999, I was inspired to play a role in preventing and treating world 
                    blindness, by joining the Gift of Sight Program. For me, this was a small 
                    contribution to what is a silent global crisis, 150 million strong. For many 
                    people, clear eyesight is a luxury, not a necessity.
                  </p>
                  <p>
                    That is what I experienced during my medical mission to Bolivia in 1999 and 
                    Morocco in 2001 where our group examined and treated over 1,000 patients a day, 
                    over 2 weeks. The Gift of Sight Program, now OneSight®, provides eyecare to 
                    tens of thousands of people throughout the country and the world.
                  </p>
                  <div className="mission-stats">
                    <div className="stat-item"><div className="stat-number">1,000+</div><div className="stat-label">Patients per Day</div></div>
                    <div className="stat-item"><div className="stat-number">2 Weeks</div><div className="stat-label">Mission Duration</div></div>
                    <div className="stat-item"><div className="stat-number">2 Countries</div><div className="stat-label">Bolivia & Morocco</div></div>
                  </div>
                </div>
                <div className="mission-reflection">
                  <blockquote className="reflection-quote">
                    "The experiences were eye opening, and, at times, emotionally touching. Some 
                    walking, some wheeled in and yet others carried in on make-shift rugs, hundreds 
                    lined up every morning for their opportunity to see the world as god intended. 
                    Experiences such as these have a humility-producing effect on any human being, 
                    and I can say that I have grown both emotionally and spiritually from it. These 
                    overseas missions have taught me to appreciate the richness of life and a new 
                    appreciation for humanity."
                  </blockquote>
                  <div className="quote-author">— Dr. John Magalhaes</div>
                </div>
                <div className="photo-gallery mission-gallery portrait-gallery">
                  {moroccoPhotos.map((photo, index) => (
                    <div key={index} className="gallery-item portrait-item" style={{ animationDelay: `${index * 0.1}s` }} onClick={() => setModalImage(photo)}>
                      <img src={photo} alt={`Morocco Mission ${index + 1}`} className="gallery-image portrait-image" />
                      <div className="gallery-overlay"><span className="view-icon">🔍</span></div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'tanzania' && (
              <div className="mission-content fade-in">
                <div className="mission-text-card">
                  <div className="mission-year">2023</div>
                  <h3 className="mission-card-title">Tanzania Medical Mission</h3>
                  <p>
                    In Mid 2023, Dr Magalhaes and his family embarked on a medical mission to east 
                    Africa. This mission was executed in concert with a religious group known as 
                    Missions for Humanity, whose goal is to serve the less fortunate. The mission 
                    encompassed three efforts.
                  </p>
                  <p>
                    With the help of a local physician and her daughter, the rest of the team was 
                    made up of a nurse, several technicians and educators. The intent of the effort 
                    was to educate children living in impoverished communities in Africa as well as 
                    meeting the visual and medical needs of as many patients as possible.
                  </p>
                  <div className="mission-stats">
                    <div className="stat-item"><div className="stat-number">400+</div><div className="stat-label">Patients Examined</div></div>
                    <div className="stat-item"><div className="stat-number">4 Villages</div><div className="stat-label">Communities Served</div></div>
                    <div className="stat-item"><div className="stat-number">100s</div><div className="stat-label">Eyewear Dispensed</div></div>
                  </div>
                </div>
                <div className="tanzania-highlights">
                  <div className="highlight-card">
                    <div className="highlight-icon">👁️</div>
                    <h4>Medical Care</h4>
                    <p>Upwards of 400 patients were examined in remote villages outside of Dar-es-Salaam. Residents with conditions ranging from small infections to more significant medical problems were attended to.</p>
                  </div>
                  <div className="highlight-card">
                    <div className="highlight-icon">📚</div>
                    <h4>Education</h4>
                    <p>Several mission members taught the English language and American culture to children in impoverished communities, providing valuable educational opportunities.</p>
                  </div>
                  <div className="highlight-card">
                    <div className="highlight-icon">👓</div>
                    <h4>Optical Services</h4>
                    <p>Dr. Magalhaes, his family and staff gathered, sorted, and dispensed hundreds of pieces of eyewear to needy Tanzanians while treating many eye medical conditions.</p>
                  </div>
                </div>
                <div className="gumba-well-section">
                  <div className="well-content">
                    <div className="well-icon">💧</div>
                    <h3 className="well-title">The Gumba Water Well Project</h3>
                    <p>The planning of the meeting was inspired by the inception of a water well built in a small town, named Gumba. The funding for this well was realized by an effort put forth by Andrew and Maxwell Magalhaes.</p>
                    <p>The brothers completed the Appalachian Trail in five months, traveling over 2,000 miles which resulted in a significant donation to the Mission for Humanity Foundation. The people of Gumba could not have been happier to host their benefactors.</p>
                    <div className="well-stats">
                      <div className="well-stat"><span className="well-stat-number">2,190</span><span className="well-stat-label">Miles Hiked</span></div>
                      <div className="well-stat"><span className="well-stat-number">5</span><span className="well-stat-label">Months</span></div>
                      <div className="well-stat"><span className="well-stat-number">1</span><span className="well-stat-label">Fresh Water Well</span></div>
                    </div>
                  </div>
                </div>
                <div className="video-gallery mission-video-gallery">
                  {tanzaniaVideos.map((video, index) => (
                    <div key={index} className="mission-video-item" style={{ animationDelay: `${index * 0.1}s` }}>
                      <video
                        controls
                        className="mission-video"
                        playsInline
                      >
                        <source src={video.src} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      <p className="mission-video-title">{video.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </section>

        {/* CTA Section */}
        <section className="about-cta-section">
          <div className="cta-content-wrapper">
            <div className="cta-icon-large">⚓</div>
            <h2 className="cta-title">Experience Our Care</h2>
            <p className="cta-text">
              Schedule your appointment today and join the families we've been 
              serving for over 20 years
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

      {/* Image Modal */}
      {modalImage && (
        <div className="image-modal-backdrop" onClick={() => setModalImage(null)}>
          <div className="image-modal-content" onClick={e => e.stopPropagation()}>
            <button className="image-modal-close" onClick={() => setModalImage(null)} aria-label="Close">✕</button>
            <img src={modalImage} alt="Enlarged view" className="image-modal-img" />
          </div>
        </div>
      )}
    </div>
  );
};

export default AboutPage;