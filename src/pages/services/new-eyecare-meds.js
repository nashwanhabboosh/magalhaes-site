// NewEyecareMeds.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  CTASection 
} from '../../components/ServiceComponents';
import '../../components/ServiceComponents.css';

import img1 from '../../assets/stock_photos/eye-meds/Tyrvaya .jpg';
import img2 from '../../assets/stock_photos/eye-meds/Miebo.jpg';
import img3 from '../../assets/stock_photos/eye-meds/Xdemvy.jpg';
import img4 from '../../assets/stock_photos/eye-meds/Comprehensive.jpg';

const NewEyecareMeds = () => {
  const features = [
    { 
      icon: '💧', 
      title: 'Tyrvaya', 
      description: 'Innovative nasal spray that awakens your eyes\' natural ability to produce tears for dry eye relief.' 
    },
    { 
      icon: '👁️', 
      title: 'Miebo', 
      description: 'Preservative-free lubricating eye drop that targets moisture evaporation and oil gland dysfunction.' 
    },
    { 
      icon: '🔬', 
      title: 'Xdemvy', 
      description: 'First FDA-approved treatment for Demodex blepharitis caused by eyelid mite infestation.' 
    },
  ];

  const sections = [
    {
      tag: 'Tyrvaya',
      title: 'TYRVAYA - INNOVATIVE DRY EYE THERAPY',
      content: 'Introducing an innovative therapy for dry eyes! If your eyes are gritty and dry, you likely have dry eye disease. Tyrvaya is a new treatment proving effective for the signs and symptoms you are experiencing. Unlike traditional ointments, plugs, or eye drops, Tyrvaya awakens the eye\'s ability to produce moisture by utilizing a nasal spray system to stimulate your eye\'s natural tear production. Used twice daily as a spray, it stimulates the nerve that produces moisture, providing almost immediate relief.',
      image: img1,
      alt: 'Tyrvaya nasal spray dry eye therapy',
    },
    {
      tag: 'Miebo',
      title: 'MIEBO - ADVANCED LUBRICATING DROPS',
      content: 'Miebo is a lubricating eye drop that acts as medicine to improve the health of the surface of your eyes. Prescribed for dry eye and oil gland dysfunction, this medication targets the causes of moisture evaporation. It is preservative and steroid-free and may be effective for children under 18. Apply one drop four times daily, removing contact lenses before application. The Miebo website offers significant savings, and your eye doctor will work with your insurance company to check for coverage.',
      image: img2,
      alt: 'Miebo lubricating eye drops for dry eye',
    },
    {
      tag: 'Xdemvy',
      title: 'XDEMVY - FDA-APPROVED DEMODEX TREATMENT',
      content: 'Xdemvy is the first FDA-approved treatment for Demodex blepharitis, a condition caused by eyelid mite infestation. These mites grow out of control and cause eye inflammation, redness, irritation, itchiness, and crusty, flaky collarettes around the base of the eyelashes. The treatment protocol is use for a full 6 weeks. The mites are sensitive to light, cannot survive without a host, and are contagious. Patients across all ages can get Demodex, making daily use of the medication important.',
      image: img3,
      alt: 'Xdemvy treatment for Demodex blepharitis',
    },
    {
      tag: 'Comprehensive Care',
      title: 'COMPREHENSIVE TREATMENT APPROACH',
      content: 'Traditional dry eye treatments included ointments, tiny plugs inserted into the corners of eyelids, and therapeutic lubricant eye drops. Now, advanced medications like Tyrvaya work by stimulating the trigeminal nerve to produce natural tears, while Miebo creates a protective barrier to prevent tear evaporation. Our doctors stay current with the latest breakthrough medications and will work with you to determine the best treatment plan for your specific condition. Whether you have dry eye disease, oil gland dysfunction, or Demodex blepharitis, we can prescribe appropriate medications and work with your insurance company for coverage. We provide ongoing monitoring to ensure your treatment is effective and adjust your care plan as needed.',
      image: img4,
      alt: 'Comprehensive eyecare medication treatment approach',
    },
  ];

  const faqs = [
    {
      question: 'What is Tyrvaya and how does it work?',
      answer: 'Tyrvaya is an innovative nasal spray therapy for dry eye disease. Unlike traditional treatments, it awakens the eye\'s ability to produce moisture by stimulating the trigeminal nerve that controls natural tear production. Used twice daily as a nasal spray, it stimulates the nerve that produces moisture, providing almost immediate dry eye relief.'
    },
    {
      question: 'How quickly does Tyrvaya work?',
      answer: 'Almost immediately after using Tyrvaya, you will feel dry eye relief. The medication works by stimulating your eye\'s natural ability to produce tears through nasal spray application. Your eye doctor will monitor your progress and may couple Tyrvaya with other dry eye medications for comprehensive treatment.'
    },
    {
      question: 'What is Miebo used for?',
      answer: 'Miebo is a lubricating eye drop prescribed for dry eye and oil gland dysfunction. It acts as medicine to improve the health of the surface of your eyes by targeting the causes of moisture evaporation. It creates a protective barrier to keep tears on the eye surface longer, reducing dryness and discomfort.'
    },
    {
      question: 'How do I use Miebo eye drops?',
      answer: 'Apply one drop of Miebo four times daily. Remember to remove your contact lenses before applying the drops. Miebo is preservative and steroid-free, making it safe for long-term use. The Miebo website has significant savings available, and your eye doctor will work with your insurance company to check for coverage.'
    },
    {
      question: 'Can children use Miebo?',
      answer: 'Yes, Miebo may be effective for children under the age of 18. Because it is preservative and steroid-free, it is considered safe for pediatric use. Your eye doctor will determine if Miebo is appropriate for your child\'s specific dry eye condition.'
    },
    {
      question: 'What is Demodex blepharitis?',
      answer: 'Demodex blepharitis is a condition caused by eyelid infestation with mites. It affects mostly the eyelid area and causes redness, irritation, and itchiness around the eyelids. The eyelid mites grow out of control and cause eye inflammation, creating crusty, flaky collarettes around the base of the eyelashes. The mites are sensitive to light, cannot survive without a host, and are contagious.'
    },
    {
      question: 'What is Xdemvy and how is it used?',
      answer: 'Xdemvy is the first FDA-approved treatment for Demodex blepharitis. The treatment protocol requires use for a full 6 weeks. It is important to use the medication daily throughout the entire treatment period to effectively eliminate the mite infestation and reduce inflammation.'
    },
    {
      question: 'Who can get Demodex mites?',
      answer: 'Patients across all ages can get Demodex, and initially mites can be acquired early on in life. The mites are contagious and can spread from person to person. Anyone experiencing symptoms like eyelid redness, irritation, itchiness, or crusty debris at the base of eyelashes should be evaluated for possible Demodex infestation.'
    },
    {
      question: 'How do these new medications compare to traditional treatments?',
      answer: 'Traditional dry eye treatments included ointments, tiny plugs inserted into the corners of eyelids, and therapeutic lubricant eye drops. The new medications offer more targeted approaches: Tyrvaya stimulates natural tear production through nasal application, Miebo prevents tear evaporation with a protective barrier, and Xdemvy directly treats the underlying cause of Demodex blepharitis rather than just symptoms.'
    },
    {
      question: 'Will my insurance cover these medications?',
      answer: 'Coverage varies by insurance plan. Your eye doctor will work with your insurance company to check for coverage of these medications. Additionally, manufacturer websites like Miebo and Xdemvy offer significant savings programs and patient assistance options to help make these treatments more affordable.'
    },
    {
      question: 'Can I use these medications with contact lenses?',
      answer: 'For Miebo, you must remove your contact lenses before applying the drops. Your doctor will provide specific guidance on when you can reinsert your lenses. For other medications, consult with your eye doctor about contact lens compatibility based on your specific treatment plan.'
    },
    {
      question: 'Can I combine multiple dry eye treatments?',
      answer: 'Yes! Your eye doctor may combine treatments for optimal results. For example, Tyrvaya can be coupled with other dry eye medications. Your doctor will monitor your progress and adjust your treatment plan to ensure you\'re getting the most effective combination of therapies for your specific condition.'
    },
    {
      question: 'Where can I learn more about these medications?',
      answer: 'There are extensive resources available on the manufacturer websites for each medication. Visit the Xdemvy website at xdemvy.com for information about Demodex treatment, and the Miebo website for savings programs and detailed product information. Your eye doctor can also provide educational materials and answer any questions about these treatments.'
    },
    {
      question: 'How will my doctor monitor my treatment progress?',
      answer: 'Your eye doctor will schedule follow-up appointments to monitor your progress with any of these medications. They will assess symptom improvement, check for any side effects, and adjust your treatment plan as needed. For Xdemvy, completion of the full 6-week protocol is essential, and your doctor will verify treatment success at the end of the course.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="New Eyecare Medications"
        subtitle="Breakthrough treatments for dry eye and eyelid conditions"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Experience Relief with Advanced Eyecare Medications"
          description="Ask your doctor about Tyrvaya, Miebo, or Xdemvy to find the right treatment for your dry eye or eyelid condition. We'll work with your insurance for coverage."
          buttonText="Schedule Consultation"
          onButtonClick={() => {
            console.log('Navigate to booking page');
          }}
        />
      </div>
    </div>
  );
};

export default NewEyecareMeds;