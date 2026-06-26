// ComprehensiveEyeExam.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  ProcedureTimeline
} from '../../components/ServiceComponents';
import '../../components/ServiceComponents.css';
import AppointmentButton from '../../components/AppointmentButton';

import img1 from '../../assets/stock_photos/comprehensive-eye-exam/What_is_an_Eye_Exam.jpg';
import img2 from '../../assets/stock_photos/comprehensive-eye-exam/What_an_Eye_Exam_is_Not.jpg';
import img3 from '../../assets/stock_photos/comprehensive-eye-exam/When_To_Get_an_Exam.jpg';
import img4 from '../../assets/stock_photos/comprehensive-eye-exam/Why_Get_an_Exam.jpg';

const ComprehensiveEyeExam = () => {
  const features = [
    { 
      icon: '👁️', 
      title: 'Early Disease Detection', 
      description: 'Detect eye diseases like glaucoma and macular degeneration before symptoms appear, preventing irreversible damage.' 
    },
    { 
      icon: '🩺', 
      title: 'Overall Health Monitoring', 
      description: 'Eye exams can reveal signs of chronic conditions like diabetes, high blood pressure, and high cholesterol.' 
    },
    { 
      icon: '👓', 
      title: 'Vision Correction', 
      description: 'Get accurate prescriptions for eyeglasses or contact lenses to ensure clear vision at all distances.' 
    },
  ];

  const sections = [
    {
      tag: 'What is an Eye Exam',
      title: 'WHAT IS A COMPREHENSIVE EYE EXAM?',
      content: 'An eye exam is different from a vision screening, which only tests vision. Only an eye doctor can perform a comprehensive eye exam to evaluate the overall health of the eye and detect any changes that may indicate a vision disorder. During a routine eye exam, your doctor will evaluate your eyes for refractive errors and common conditions such as amblyopia, strabismus, presbyopia, glaucoma, and diabetic retinopathy through a series of specialized tests.',
      image: img1,
      alt: 'Doctor performing a comprehensive eye exam',
    },
    {
      tag: 'What an Eye Exam is Not',
      title: 'WHAT A COMPREHENSIVE EYE EXAM IS NOT',
      content: 'You may have heard or seen sources of eye exams, such as computerized kiosks in malls or online exams, advertised as part of purchases for contact lenses or eyeglasses — one such example is 1-800 Contacts. In no way are these exams conducted personally by licensed doctors in a face-to-face setting. The exams are conducted remotely and in such a way that invites errors and missed diagnoses.\n\nThe Pennsylvania Society of Optometrists has issued patient safety alerts regarding kiosk eye exams. The American Optometric Association has stated that direct-to-patient technologies are not a substitute for a Comprehensive Eye Exam.\n\nPlease schedule an eye exam at our offices and be assured that all your eye care needs will be taken care of, in a personal and caring direct-to-patient fashion.',
      image: img2,
      alt: 'In-person eye exam versus remote kiosk exam',
    },
    {
      tag: 'When To Get an Exam',
      title: 'WHEN SHOULD YOU GET A COMPREHENSIVE EYE EXAM?',
      content: 'Patients should see their doctor for a comprehensive eye exam every year. Children need regular tests to ensure proper vision development and prevent interference with academic achievements. Older adults are at higher risk for conditions like glaucoma, macular degeneration, and cataracts. Even with healthy eyes, regular exams allow doctors to view blood vessels and detect chronic conditions early.',
      image: img3,
      alt: 'Patient scheduling a regular eye exam',
    },
    {
      tag: 'Why Get an Exam',
      title: 'WHY ARE REGULAR EYE EXAMS IMPORTANT?',
      content: 'Some diseases like glaucoma develop gradually without symptoms of pain or vision loss, so patients may not notice anything wrong until significant and irreversible damage has occurred. Early detection allows for treatment options and reduced risk of permanent damage. Regular exams are an essential tool in maintaining both eye health and overall wellness.',
      image: img4,
      alt: 'Early detection and prevention through regular eye exams',
    },
  ];

  const examTests = [
    { 
      title: 'Initial Consultation', 
      description: 'Review your medical history, current medications, and any vision concerns or symptoms you may be experiencing.' 
    },
    { 
      title: 'Vision Testing', 
      description: 'Perform visual field tests, refraction, and retinoscopy to measure your visual acuity and determine prescription needs.' 
    },
    { 
      title: 'Eye Health Evaluation', 
      description: 'Conduct slit-lamp examination, cover test, and glaucoma testing to assess the health of your eye structures.' 
    },
    { 
      title: 'Dilation & Imaging', 
      description: 'Dilate pupils to examine the retina and optic nerve for signs of disease or damage using specialized equipment.' 
    },
    { 
      title: 'Diagnosis & Treatment Plan', 
      description: 'Review findings and develop a personalized treatment plan, which may include prescriptions, medication, or further care.' 
    },
  ];

  const faqs = [
    {
      question: 'How often should I get a comprehensive eye exam?',
      answer: 'Adults should have a comprehensive eye exam every year. Children need regular exams to ensure proper vision development, and older adults are at higher risk for conditions like glaucoma and cataracts, making annual exams especially important.'
    },
    {
      question: 'What conditions can be detected during an eye exam?',
      answer: 'Comprehensive eye exams can detect refractive errors like myopia (nearsightedness), hyperopia (farsightedness), and astigmatism. They also screen for serious conditions including glaucoma, diabetic retinopathy, macular degeneration, cataracts, and signs of systemic diseases like diabetes and high blood pressure.'
    },
    {
      question: 'What is the difference between an eye exam and a vision screening?',
      answer: 'A vision screening only tests basic vision and is commonly performed by school nurses or pediatricians. A comprehensive eye exam, performed by an eye doctor, evaluates the overall health of the eye, detects vision disorders, and screens for eye diseases that may have no early symptoms.'
    },
    {
      question: 'What tests are included in a comprehensive eye exam?',
      answer: 'A comprehensive exam includes visual field tests, dilation, glaucoma testing, slit-lamp examination, cover test, retinoscopy, and refraction. These tests examine all aspects of eye health and are safe for all patients.'
    },
    {
      question: 'What happens after my comprehensive eye exam?',
      answer: 'After completing the exam and diagnosis, your doctor will develop a treatment plan based on the findings. This may include a prescription for eyeglasses or contact lenses, medication, vision therapy, eye vitamins, vision supplements, or in some cases, surgery.'
    },
    {
      question: 'Can an eye exam detect health problems beyond my eyes?',
      answer: 'Yes! During an eye exam, doctors can view the blood vessels in your eyes. This allows them to detect chronic conditions such as high cholesterol, diabetes, and high blood pressure. Early detection of these conditions can lead to early treatment and better health outcomes.'
    },
    {
      question: 'How are refractive errors treated?',
      answer: 'Refractive errors like myopia, hyperopia, and astigmatism can be effectively treated with eyeglasses or contact lenses. Eyewear may be needed for certain activities like driving or watching television, or for all-day use. Our optical shop offers a wide selection of frames, lenses, and contact lenses to choose from.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Comprehensive Eye Exams"
        subtitle="Protecting your vision and overall health through thorough eye care"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <ProcedureTimeline steps={examTests} />
        
        <AccordionFAQ faqs={faqs} />
        
        <div className="cta-section">
          <h2>Schedule Your Comprehensive Eye Exam Today</h2>
          <p>Regular eye exams are essential for maintaining healthy vision and detecting problems early. Book your appointment at our North Attleboro or North Dartmouth location.</p>
          <AppointmentButton className="cta-button" label="Book Your Exam" />
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveEyeExam;