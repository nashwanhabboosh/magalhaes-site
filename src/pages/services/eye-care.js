// EyeCareServices.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  CTASection 
} from '../../components/ServiceComponents';
import '../../components/ServiceComponents.css';

import img1 from '../../assets/stock_photos/eye-care/Eye_Allergies.jpg';
import img2 from '../../assets/stock_photos/eye-care/Kids_and_Vision.jpg';
import img3 from '../../assets/stock_photos/eye-care/Nutrition.jpg';
import img4 from '../../assets/stock_photos/eye-care/Elder_vision.jpg';
import img5 from '../../assets/stock_photos/eye-care/Computers.jpg';

const EyeCareServices = () => {
  const features = [
    { 
      icon: '👶', 
      title: 'Pediatric Eye Care', 
      description: 'Specialized care for children to ensure healthy vision development and early detection of any problems.' 
    },
    { 
      icon: '🌿', 
      title: 'Eye Allergies', 
      description: 'Comprehensive treatment for allergic conjunctivitis to relieve itching, redness, and discomfort.' 
    },
    { 
      icon: '👴', 
      title: 'Mature Vision Care', 
      description: 'Expert care for age-related vision changes including presbyopia and other conditions affecting older adults.' 
    },
    { 
      icon: '💊', 
      title: 'Nutrition & Prevention', 
      description: 'Guidance on proper nutrition and supplements to maintain eye health and reduce risk of age-related diseases.' 
    },
    { 
      icon: '💻', 
      title: 'Digital Eye Strain', 
      description: 'Solutions for computer and screen-related vision problems affecting both children and adults.' 
    },
    { 
      icon: '📺', 
      title: 'Vision Health Education', 
      description: 'Expert advice on proper viewing habits and protecting your eyes during daily activities.' 
    },
  ];

  const sections = [
    {
      tag: 'Eye Allergies',
      title: 'EYE ALLERGIES',
      content: 'Allergic eye disease, or allergic conjunctivitis, makes the eyes feel itchy, red, watery and light-sensitive and can cause swelling of the eyelids. The allergy may be seasonal, often occurring alongside hay fever, or perennial as a result of exposure to allergens such as dust mites, mold or animal dander. Treatment varies depending on the cause and may include topical or oral antihistamines, mast cell stabilizers or topical corticosteroids. We work with your ENT specialist or allergist to mitigate your symptoms.',
      image: img1,
      alt: 'Eye allergy treatment and care',
    },
    {
      tag: 'Kids & Vision',
      title: 'KIDS & VISION',
      content: 'Parents should schedule an eye exam for their children at six to twelve months old to ensure healthy development of vision. A second exam is recommended around age two or three years, and then again before starting school. Early detection allows for treatment to begin before the child experiences difficulty in school due to poor vision. Our doctors are highly trained in pediatric eye conditions and offer specialized care to effectively treat these conditions.',
      image: img2,
      alt: 'Pediatric eye care for children',
    },
    {
      tag: 'Prevention & Nutrition',
      title: 'PREVENTION & NUTRITION',
      content: 'Good nutrition is essential in maintaining strong, healthy eyes and clear vision, especially as you age. Research has shown that proper nutrition can reduce your risk of age-related eye diseases. The most important nutrients for eye health are carotenoids, which contain vitamins A, C and E, typically found in dark green leafy vegetables. We offer ZeaVision EyePromise supplements with natural Zeaxanthin formulas to protect your eyes and reduce the risk of diseases such as macular degeneration.',
      image: img3,
      alt: 'Nutrition and eye health',
    },
    {
      tag: 'Mature Vision',
      title: 'MATURE VISION',
      content: 'As we age, our vision begins to change and our eyes may become more susceptible to certain conditions. After age 40, you may experience presbyopia, difficulty seeing up close that may require reading glasses. Older patients are also at higher risk of developing glaucoma, flashes and floaters, retinal disorders and more. Many of these conditions cause progressive vision loss that is often irreversible. Regular eye exams are the best prevention for early detection and treatment.',
      image: img4,
      alt: 'Mature vision care for older adults',
    },
    {
      tag: 'Computers & Vision',
      title: 'COMPUTERS & VISION',
      content: 'Excessive computer work can cause eyestrain for both children and adults, which can lead to headaches, blurred vision or other symptoms related to vision stress. We provide assessments and solutions to help reduce digital eye strain and protect your vision during screen time. If you experience symptoms while using computers, you may need special glasses to protect your eyes.',
      image: img5,
      alt: 'Digital eye strain and computer vision solutions',
    },
  ];

  const faqs = [
    {
      question: 'What are the symptoms of eye allergies?',
      answer: 'Allergic eye disease makes the eyes feel itchy, red, watery and light-sensitive and can cause swelling of the eyelids. The months of late February through May in New England can be especially difficult for contact lens wearers. Patients with this condition may also suffer from dry eyes and blepharitis.'
    },
    {
      question: 'How are eye allergies treated?',
      answer: 'Treatment varies depending on the cause, history and symptoms, and may include topical or oral antihistamines, mast cell stabilizers or topical corticosteroids. Cold compresses may also relieve discomfort. We may recommend over-the-counter treatments and will work with your ENT specialist or allergist to mitigate your symptoms. Daily replacement contact lenses are recommended as the best type of lenses during peak allergy season.'
    },
    {
      question: 'When should my child have their first eye exam?',
      answer: 'According to the AOA Foundation\'s InfantSEE program, parents should schedule an eye exam for their children at six to twelve months old to ensure healthy development of vision. A second exam is recommended around age two or three years, and then again before starting school. After that, comprehensive eye exams should be performed every two years for healthy eyes.'
    },
    {
      question: 'What conditions do children\'s eye exams detect?',
      answer: 'Children\'s eye exams test visual acuity, eye tracking, and focusing skills, and detect problems such as nearsightedness, farsightedness, amblyopia (lazy eye), crossed eyes, dyslexia, and color blindness. Early detection allows for treatment to begin before the child experiences difficulty in school.'
    },
    {
      question: 'What nutrients are important for eye health?',
      answer: 'The most important nutrients for eye health are carotenoids, which contain vitamins A, C and E and are typically found in fruits and vegetables, especially dark green, leafy vegetables. Other important nutrients include zinc, copper and certain antioxidants that must be attained through a healthy diet or supplements.'
    },
    {
      question: 'What eye conditions can nutrition help prevent?',
      answer: 'Proper nutrition can reduce the risk of age-related eye diseases including macular degeneration, dry eye disease, and diabetic eye disease. We offer ZeaVision EyePromise supplements in our office, which contain natural Zeaxanthin formulas to protect your eyes and reduce disease risk.'
    },
    {
      question: 'What is presbyopia and when does it occur?',
      answer: 'Presbyopia is a condition that typically begins after age 40 where you experience difficulty seeing up close. It involves a loss of flexibility within the crystalline lens and may require reading glasses. This is a natural part of aging and affects nearly everyone eventually.'
    },
    {
      question: 'What vision problems are common in older adults?',
      answer: 'In addition to presbyopia, older patients are at higher risk of developing glaucoma, flashes and floaters, retinal disorders, cataracts, and macular degeneration. Many of these conditions cause progressive vision loss that is often irreversible, making regular eye exams essential for early detection.'
    },
    {
      question: 'Is watching TV bad for my eyes?',
      answer: 'Despite common misconceptions, watching television is not necessarily harmful to your eyes when following simple guidelines. Ideal viewing conditions involve a well-lit room with no glare on the screen. Watching in a dark room creates excessive contrast that can strain vision. The ideal viewing distance is five times the width of the screen.'
    },
    {
      question: 'How can I prevent computer eye strain?',
      answer: 'Excessive computer work can cause eyestrain leading to headaches, blurred vision or other symptoms. Take regular breaks using the 20-20-20 rule (every 20 minutes, look at something 20 feet away for 20 seconds), ensure proper lighting, adjust screen brightness and contrast, and maintain proper posture. You may also need special computer glasses.'
    },
    {
      question: 'Should children sit close to the TV?',
      answer: 'It is important to keep children from sitting too close to the screen. The ideal viewing distance is five times the width of the screen, from which images will appear sharpest and most defined. If you or your child experiences watery eyes or other symptoms while watching television, notify your doctor.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Eye Care Services"
        subtitle="Comprehensive care for patients of all ages and lifestyles"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Experience Personalized Eye Care"
          description="Whether you're dealing with allergies, need pediatric care, or want to protect your vision as you age, we're here to help."
          buttonText="Schedule an Appointment"
          onButtonClick={() => {
            console.log('Navigate to booking page');
          }}
        />
      </div>
    </div>
  );
};

export default EyeCareServices;