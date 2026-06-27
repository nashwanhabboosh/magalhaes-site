// PinkEye.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  CTASection 
} from '../../../components/ServiceComponents';

import img1 from '../../../assets/stock_photos/eye-diseases/pink-eye/pink-eye.jpg';
import img2 from '../../../assets/stock_photos/eye-diseases/pink-eye/pink-eye-cause.jpg';
import img3 from '../../../assets/stock_photos/eye-diseases/pink-eye/pink-eye-symptoms.jpg';
import img4 from '../../../assets/stock_photos/eye-diseases/pink-eye/pink-eye-treatment.jpg';
import img5 from '../../../assets/stock_photos/eye-diseases/pink-eye/Pink-eye-doctor.jpg';

const PinkEye = () => {
  const features = [
    { 
      icon: '👁️', 
      title: 'Accurate Diagnosis', 
      description: 'Expert evaluation to determine if pink eye is bacterial, viral, or allergic for proper treatment.' 
    },
    { 
      icon: '💊', 
      title: 'Effective Treatment', 
      description: 'Prescription antibiotics for bacterial infections and supportive care recommendations for viral cases.' 
    },
    { 
      icon: '⚡', 
      title: 'Fast Relief', 
      description: 'Quick symptom relief with appropriate medications, eye drops, and cold compresses.' 
    },
    { 
      icon: '🛡️', 
      title: 'Prevent Spreading', 
      description: 'Expert guidance on preventing contagious conjunctivitis from spreading to others.' 
    },
    { 
      icon: '🩺', 
      title: 'Professional Care', 
      description: 'Warm, friendly, and thorough care from our experienced eye care specialists.' 
    },
    { 
      icon: '🔍', 
      title: 'Complete Evaluation', 
      description: 'Comprehensive examination to identify the underlying cause and rule out serious conditions.' 
    },
  ];

  const sections = [
    {
      tag: 'What is Pink Eye',
      title: 'WHAT IS PINK EYE (CONJUNCTIVITIS)?',
      content: 'Conjunctivitis, also known as pink eye, is an infection or inflammation of the conjunctiva, the membrane that lines the eyelid and covers the white part of the eyeball. The inflammation affects the blood vessels in the eye and gives the eye a pink or red appearance. Because it can be contagious, proper diagnosis and treatment is important.',
      image: img1,
      alt: 'Pink eye conjunctivitis affecting the eye',
    },
    {
      tag: 'Causes',
      title: 'WHAT CAUSES PINK EYE?',
      content: 'Pink eye can be caused by several factors including bacterial infection, viral infection, allergic reactions, a foreign object in the eye, or a blocked tear duct. Each type requires different treatment approaches. Our eye care specialists will help discuss your diagnosis and the proper course of treatment during your appointment to ensure the most effective care.',
      image: img2,
      alt: 'Causes of pink eye conjunctivitis',
    },
    {
      tag: 'Symptoms',
      title: 'SYMPTOMS OF PINK EYE',
      content: 'The most common symptoms include redness in one or both eyes, itchiness, a discharge that may become crusty overnight, excessive tearing, and a feeling of grittiness in the eye. These symptoms can vary in severity depending on the cause. If you experience these symptoms, schedule an appointment for proper evaluation and treatment.',
      image: img3,
      alt: 'Symptoms of pink eye conjunctivitis',
    },
    {
      tag: 'Treatment',
      title: 'TREATMENT OPTIONS',
      content: 'Treatment depends on the type of conjunctivitis. Bacterial conjunctivitis may require prescription antibiotic eyedrops or ointment. Viral conjunctivitis has no specific treatment and will ease over time, though supportive care with lubricant eye drops, cold compresses, and oral antihistamines may be recommended. If herpes simplex virus is the source, antiviral medication may be needed. Allergic conjunctivitis can be treated with allergy eyedrops once allergies are confirmed as the cause.',
      image: img4,
      alt: 'Treatment options for pink eye conjunctivitis',
    },
    {
      tag: 'When to Seek Care',
      title: 'WHEN TO SEEK CARE',
      content: 'Because conjunctivitis can be contagious and symptoms may indicate other serious eye conditions, professional evaluation is important. Our eye care specialists provide thorough, engaged care to accurately diagnose your condition and recommend the best treatment plan. We are warm, friendly, and professional, ensuring you receive the care you need quickly and comfortably.',
      image: img5,
      alt: 'Eye doctor evaluating pink eye patient',
    },
  ];

  const faqs = [
    {
      question: 'What is pink eye (conjunctivitis)?',
      answer: 'Conjunctivitis, commonly known as pink eye, is an infection or inflammation of the conjunctiva - the thin, clear membrane that lines the eyelid and covers the white part of the eyeball. The inflammation affects the blood vessels in the eye, causing them to become more visible and giving the eye a characteristic pink or red appearance.'
    },
    {
      question: 'What causes pink eye?',
      answer: 'Pink eye can be caused by several factors: bacterial infection, viral infection, allergic reactions, a foreign object in the eye, or a blocked tear duct. Each cause requires a different treatment approach, which is why accurate diagnosis by an eye care specialist is important.'
    },
    {
      question: 'Is pink eye contagious?',
      answer: 'Yes, pink eye can be contagious, especially bacterial and viral conjunctivitis. This is why proper diagnosis and treatment is important - not only for your recovery but also to prevent spreading the infection to others. Your doctor will provide guidance on preventing transmission.'
    },
    {
      question: 'What are the symptoms of pink eye?',
      answer: 'The most common symptoms of pink eye include redness in one or both eyes, itchiness in one or both eyes, a discharge that may become crusty overnight (especially upon waking), excessive tearing, and a feeling of grittiness or a foreign body sensation in the eye.'
    },
    {
      question: 'How is bacterial conjunctivitis treated?',
      answer: 'Treatment for bacterial conjunctivitis typically includes a prescription for antibiotic eyedrops or ointment. These medications help eliminate the bacterial infection and usually provide relief within a few days. It\'s important to complete the full course of antibiotics as prescribed.'
    },
    {
      question: 'Is there treatment for viral conjunctivitis?',
      answer: 'There is no specific treatment that will cure viral conjunctivitis, and the condition will eventually ease over the course of time as your immune system fights the infection. However, supportive care can help relieve symptoms - your doctor may recommend lubricant eye drops, cold compresses, and oral antihistamines for comfort.'
    },
    {
      question: 'What if my pink eye is caused by herpes?',
      answer: 'If the source of viral conjunctivitis is the herpes simplex virus, your doctor will determine if antiviral medication should be used. Herpes-related eye infections require special attention and treatment to prevent complications, so accurate diagnosis is crucial.'
    },
    {
      question: 'How is allergic conjunctivitis treated?',
      answer: 'Allergic conjunctivitis can be treated with eyedrops specifically designed for people with allergies. However, it must first be determined that allergies are actually the cause of your symptoms. Your doctor will help identify triggers and recommend appropriate allergy medications or eyedrops.'
    },
    {
      question: 'Can pink eye affect both eyes?',
      answer: 'Yes, pink eye can affect one or both eyes. Viral and bacterial conjunctivitis often start in one eye and can spread to the other if you touch the infected eye and then touch the other eye. Allergic conjunctivitis typically affects both eyes simultaneously.'
    },
    {
      question: 'How long does pink eye last?',
      answer: 'The duration depends on the type: bacterial conjunctivitis usually improves within a few days with antibiotic treatment. Viral conjunctivitis can last 1-2 weeks or longer. Allergic conjunctivitis persists as long as you\'re exposed to the allergen but improves quickly once the allergen is removed or treated.'
    },
    {
      question: 'What can I do at home to relieve pink eye symptoms?',
      answer: 'Supportive home care includes using cold compresses on the affected eye, applying lubricant eye drops for comfort, avoiding touching or rubbing your eyes, washing your hands frequently, changing pillowcases regularly, and avoiding sharing towels or washcloths. Your doctor may also recommend oral antihistamines.'
    },
    {
      question: 'Should I wear contact lenses if I have pink eye?',
      answer: 'No, you should not wear contact lenses while you have pink eye. Remove your lenses immediately if you develop symptoms and do not wear them again until your eye has completely healed and your doctor says it\'s safe. You may need to replace your contact lenses and case to prevent reinfection.'
    },
    {
      question: 'When should I see a doctor for pink eye?',
      answer: 'You should see a doctor if you experience eye redness with pain, sensitivity to light, blurred vision that doesn\'t improve when discharge is wiped away, intense redness, symptoms in a newborn, or symptoms that don\'t improve with home care. Professional diagnosis ensures you receive the appropriate treatment.'
    },
    {
      question: 'How can I prevent spreading pink eye to others?',
      answer: 'To prevent spreading conjunctivitis: wash your hands frequently and thoroughly, avoid touching or rubbing your eyes, don\'t share towels, washcloths, or pillows, clean surfaces that may be contaminated, avoid sharing eye makeup or makeup applicators, and stay home from work or school if your doctor recommends it.'
    },
    {
      question: 'Can pink eye lead to serious complications?',
      answer: 'While most cases of pink eye are mild and resolve without complications, some types (especially those caused by certain bacteria or viruses like herpes) can lead to serious problems if left untreated. This is why professional evaluation and proper treatment are important for protecting your vision and eye health.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Pink Eye (Conjunctivitis)"
        subtitle="Expert diagnosis and treatment for fast relief and prevention"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Experiencing Pink Eye Symptoms?"
          description="Don't wait - get proper diagnosis and treatment from our eye care specialists. Available at our North Attleboro, North Dartmouth, and Brockton locations."
          buttonText="Schedule Consultation"
        />
      </div>
    </div>
  );
};

export default PinkEye;