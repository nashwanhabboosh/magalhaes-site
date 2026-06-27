// Cataracts.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  ProcedureTimeline,
  CTASection 
} from '../../../components/ServiceComponents';

import img1 from '../../../assets/stock_photos/eye-diseases/cataracts/What_is_cataracts.jpg';
import img2 from '../../../assets/stock_photos/eye-diseases/cataracts/Causes_cataracts.jpg';
import img3 from '../../../assets/stock_photos/eye-diseases/cataracts/signs_cataracts.jpg';
import img4 from '../../../assets/stock_photos/eye-diseases/cataracts/Treatment.jpg';

const Cataracts = () => {
  const features = [
    { 
      icon: '👁️', 
      title: 'Expert Diagnosis', 
      description: 'Comprehensive testing with dilated exams and precision microscopes to accurately diagnose cataracts.' 
    },
    { 
      icon: '🏥', 
      title: 'Trusted Referrals', 
      description: 'Access to well-trained eye surgeons with decades-long relationships for optimal surgical outcomes.' 
    },
    { 
      icon: '⚡', 
      title: 'Quick Procedure', 
      description: 'Minimally invasive outpatient surgery taking approximately 30 minutes or less with topical anesthesia.' 
    },
    { 
      icon: '🔬', 
      title: 'Advanced IOL Options', 
      description: 'Artificial intraocular lenses to restore clear vision and focus light properly on the retina.' 
    },
    { 
      icon: '🩺', 
      title: 'Comprehensive Care', 
      description: 'Pre-operative testing, surgical recommendations, and post-operative care with direct surgeon communication.' 
    },
    { 
      icon: '✨', 
      title: 'Vision Restoration', 
      description: 'Effective treatment to eliminate cloudiness and restore clear, vibrant vision.' 
    },
  ];

  const sections = [
    {
      tag: 'What is a Cataract',
      title: 'WHAT IS A CATARACT?',
      content: 'A cataract is a common condition that causes vision loss due to clouding of the lens of the eye. Cloudiness develops as a result of protein buildup in the lens that prevents light from reaching the retina. Cataracts affect millions of people each year, including more than half of all Americans 60 years of age and older. The lens within the eye clouds naturally as we age, causing a gradual reduction of vision.',
      image: img1,
      alt: 'Illustration of what a cataract is and how it affects the eye',
    },
    {
      tag: 'Causes',
      title: 'WHAT CAUSES CATARACTS?',
      content: 'While natural aging is the primary cause, there are numerous other factors that can lead to cataract development including injury, certain medications, illness, diabetes, excessive alcohol use, prolonged UV light exposure, smoking, family history, radiation exposure, and previous eye surgery. Understanding these risk factors helps in prevention and early detection.',
      image: img2,
      alt: 'Causes and risk factors of cataract development',
    },
    {
      tag: 'Signs & Symptoms',
      title: 'SIGNS AND SYMPTOMS',
      content: 'Patients often experience no symptoms when cataracts first develop. As they progress, you may notice blurry or hazy vision, faded colors, double vision, poor vision in bright light, halos around lights, poor night vision, yellowish vision, or frequent changes in eyeglass prescriptions. Early detection through regular eye exams is crucial for timely treatment.',
      image: img3,
      alt: 'Signs and symptoms of cataracts',
    },
    {
      tag: 'Treatment Options',
      title: 'TREATMENT OPTIONS',
      content: 'Early cataracts can sometimes be managed with non-surgical methods including new eyeglass prescriptions, anti-glare sunglasses, magnifying lenses, and stronger lighting. However, when cataracts begin to interfere with your ability to read, work, exercise or drive, surgery is recommended. Cataract surgery is a minimally invasive outpatient procedure using topical anesthesia in which the clouded natural lens is replaced with a clear artificial intraocular lens (IOL) that focuses light onto the retina. The procedure takes approximately 30 minutes or less. We refer patients to well-trained eye surgeons with whom we have decades-long relationships, ensuring optimal results with comprehensive pre and post-operative care.',
      image: img4,
      alt: 'Cataract treatment options including surgery and non-surgical approaches',
    },
  ];

  const surgerySteps = [
    { 
      title: 'Pre-Operative Testing & Consultation', 
      description: 'Comprehensive eye evaluation including measuring the cornea\'s curve and the eye\'s size and shape. Our doctors provide recommendations to increase chances of optimal surgical results.' 
    },
    { 
      title: 'Surgical Referral & Preparation', 
      description: 'Referral to our trusted eye surgeons. Patients fast for 12-24 hours before surgery. Dilating drops are placed in the eye at the surgical facility.' 
    },
    { 
      title: 'Lens Removal Procedure', 
      description: 'Either phacoemulsification (ultrasound probe breaks up lens) or extracapsular surgery (larger incision for solid lens removal) is performed based on cataract condition.' 
    },
    { 
      title: 'IOL Implantation', 
      description: 'Clear plastic intraocular lens is implanted to replace the natural lens, focusing light onto the retina for improved vision.' 
    },
    { 
      title: 'Post-Operative Care & Recovery', 
      description: 'Same-day discharge with escort required. Our offices provide post-operative care with direct surgeon communication. Eye drops and protective shield used during healing.' 
    },
  ];

  const faqs = [
    {
      question: 'What is a cataract?',
      answer: 'A cataract is a common condition that causes vision loss due to clouding of the lens of the eye. Cloudiness develops as a result of a buildup of protein in the lens that prevents light from reaching the retina. Cataracts affect millions of people each year, including more than half of all Americans 60 years of age and older.'
    },
    {
      question: 'What causes cataracts to develop?',
      answer: 'The lens within the eye clouds naturally as we age, which is the primary cause. Other causes include injury, certain medications, illness, diabetes, excessive alcohol use, prolonged exposure to ultraviolet light, smoking, family history of cataracts, exposure to radiation, previous eye surgery, and the natural aging process.'
    },
    {
      question: 'What are the symptoms of cataracts?',
      answer: 'Patients with cataracts often experience no symptoms when the condition first develops. As cataracts progress, symptoms may include blurry or hazy vision, faded colors, double vision, poor vision in bright light, halos around lights, poor night vision, yellowish vision, and frequent changes in eyeglass or contact lens prescriptions.'
    },
    {
      question: 'How are cataracts diagnosed?',
      answer: 'A series of tests are performed to diagnose cataracts including a dilated eye exam, visual acuity test, and inspection with a precision microscope. These comprehensive tests allow our doctors to accurately identify cataracts and determine their severity.'
    },
    {
      question: 'Can cataracts be treated without surgery?',
      answer: 'Early cataracts can sometimes be treated with non-surgical methods including a new eyeglass prescription, anti-glare sunglasses, magnifying lenses, and the use of stronger lighting. However, the only effective long-term treatment for cataracts is surgery. These methods can help delay surgery when the cataract is fairly new.'
    },
    {
      question: 'When should I consider cataract surgery?',
      answer: 'If cataracts begin to interfere with your ability to read, work, exercise or drive, cataract surgery may be recommended. When non-surgical methods are no longer providing adequate vision improvement, surgery becomes the best option to restore clear sight.'
    },
    {
      question: 'What happens during cataract surgery?',
      answer: 'Cataract surgery is a minimally invasive outpatient procedure using topical (eye drop) anesthesia. The procedure takes approximately 30 minutes or less. The clouded natural lens is removed and replaced with a clear artificial intraocular lens (IOL). Each eye is done separately.'
    },
    {
      question: 'What are the types of cataract surgery?',
      answer: 'There are two main approaches: Phacoemulsification (phaco) involves inserting a probe that emits ultrasound waves to break up the lens into fragments that are removed by suction. Extracapsular surgery requires a larger incision to remove the lens in one solid piece, usually performed when the cataract cannot be broken up by phacoemulsification.'
    },
    {
      question: 'What is an intraocular lens (IOL)?',
      answer: 'An IOL is a clear plastic artificial lens implanted after the natural lens is removed during cataract surgery. It focuses light onto the retina to improve vision. Some people with eye disease or other medical issues who cannot have an IOL implanted may use soft contact lenses or magnification glasses as alternatives.'
    },
    {
      question: 'How long does recovery take after cataract surgery?',
      answer: 'Patients return home the same day but need an escort. Healing takes time, and medication may be prescribed to prevent infection and control eye pressure. After the eye is fully healed, vision will be re-evaluated. Restrictions on activities will be provided by the doctor. Post-surgery eye drops and a protective shield will be used.'
    },
    {
      question: 'What pre-operative testing is required?',
      answer: 'Before the surgical procedure, tests may be conducted including measuring the curve of the cornea and measuring the size and shape of the eye. Serious eye conditions and medical history should be discussed with our doctors prior to undergoing cataract surgery to ensure optimal surgical planning.'
    },
    {
      question: 'Will I need glasses after cataract surgery?',
      answer: 'Each eye is done separately and, at times, limited eyeglass use will be needed after surgery. Your vision needs will be re-evaluated after healing is complete. The type of IOL chosen can also affect your need for glasses after surgery, which your surgeon will discuss with you.'
    },
    {
      question: 'What are the risks of cataract surgery?',
      answer: 'While rare, some risks of cataract surgery may include incomplete removal of lens fragments, infection, bleeding, swelling of the cornea, and retinal detachment. Your surgeon will discuss all potential risks during your consultation. Cataract surgery is generally very safe and successful.'
    },
    {
      question: 'How do you coordinate my cataract care?',
      answer: 'Dr. Magalhaes and Associates refer cataract patients to well-trained eye surgeons with whom they have had relationships for decades. Appropriate pre-operative testing and recommendations made by our doctors will increase the chances of an optimum surgical result. Generally, when appropriate, our offices will take care of you post-operatively with direct communications with our ophthalmic surgeon.'
    },
    {
      question: 'What should I do before cataract surgery?',
      answer: 'Patients are asked not to eat or drink anything for 12 to 24 hours prior to surgery. At the surgical facility, drops are placed into the eye to dilate the pupil. Your surgeon will provide specific pre-operative instructions tailored to your procedure.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Cataract Treatment"
        subtitle="Comprehensive diagnosis and surgical coordination for clear vision restoration"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <ProcedureTimeline steps={surgerySteps} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Don't Let Cataracts Cloud Your Vision"
          description="If you're experiencing symptoms of cataracts or are ready to explore treatment options, schedule a comprehensive evaluation today."
          buttonText="Schedule Cataract Evaluation"
        />
      </div>
    </div>
  );
};

export default Cataracts;