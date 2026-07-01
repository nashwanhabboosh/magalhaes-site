// ContactLenses.js
import React from 'react';
import { 
  ServiceHero,
  AlternatingImageSection,
  FeatureCards,
  AccordionFAQ,
  ProcedureTimeline,
  VideoEmbed,
  CTASection
} from '../../components/ServiceComponents';

import img1 from '../../assets/practice/20250928_magalhaes_406.jpg';
import img2 from '../../assets/practice/20250929_magalhaes_522.jpg';
import img3 from '../../assets/practice/20250928_magalhaes_366.jpg';
import img4 from '../../assets/practice/20250929_magalhaes_603.jpg';
import img5 from '../../assets/practice/20250929_magalhaes_576.jpg';

const ContactLenses = () => {
  const features = [
    { 
      icon: '👁️', 
      title: 'Wider Field of Vision', 
      description: 'Contact lenses move with your eyes, providing a larger field of vision with fewer distortions than glasses.' 
    },
    { 
      icon: '☔', 
      title: 'Weather Resistant', 
      description: 'No frames fogging up on cold days or lenses getting wet in the rain - contacts adapt to any weather.' 
    },
    { 
      icon: '🎯', 
      title: 'Specialized Options', 
      description: 'From scleral lenses for irregular corneas to MISIGHT for myopia control - advanced solutions for every need.' 
    },
    { 
      icon: '👶', 
      title: 'For All Ages', 
      description: 'New technology allows children and adults of all ages to benefit from contact lens correction.' 
    },
    { 
      icon: '📅', 
      title: 'Daily Replacement', 
      description: 'Convenient daily disposable lenses provide the best eye health, comfort, and hygiene.' 
    },
    { 
      icon: '🔬', 
      title: 'Expert Fitting', 
      description: 'Our experienced doctors specialize in custom fitting, including advanced scleral lens options.' 
    },
  ];

  const sections = [
    {
      tag: 'Benefits',
      title: 'BENEFITS OF CONTACT LENSES',
      content: 'Unlike glasses, contact lenses move with your eyes so you can enjoy a larger field of vision with fewer distortions. You also don\'t have to deal with frames hovering in your peripheral vision or external lenses that fog up on cold days or get wet in the rain. Over 140 million people wear contact lenses worldwide, and new advances in technology now allow children with refractive errors to wear contact lenses at a young age under experienced supervision.',
      image: img1,
      alt: 'Contact lens consultation at our practice',
    },
    {
      tag: 'Lens Types',
      title: 'TYPES OF CONTACT LENSES',
      content: 'Several different types of contact lenses are available to correct a wide range of refractive errors. Spherical lenses correct nearsightedness and farsightedness. Toric lenses correct astigmatism. Bifocal lenses correct presbyopia. Scleral lenses address distorted corneas from injury or Keratoconus, as well as dry eye cases. Lenses may also be clear or tinted for convenience, therapeutic or cosmetic purposes.',
      image: img2,
      alt: 'Variety of contact lens options',
    },
    {
      tag: 'Schedules',
      title: 'REPLACEMENT SCHEDULES',
      content: 'For optimal vision and safety, contact lenses should be worn only for a designated amount of time before replacement. With continued wear, protein and lipid deposits accumulate on the lens surface, weakening its corrective powers. Depending on the type selected, replacements may be needed quarterly, monthly, every 1-2 weeks or daily. Daily replacement contact lenses have become the preferred regimen, fostering the best eye health, comfort, and convenience.',
      image: img3,
      alt: 'Doctor explaining lens replacement schedule to patient',
    },
    {
      tag: 'Scleral Lenses',
      title: 'SCLERAL CONTACT LENSES',
      content: 'We specialize in custom fitting scleral lenses, which are larger than your cornea and rest on the sclera. Being gas permeable, they allow oxygen to reach your cornea and are better for eye health. They provide superior vision and can be used for longer periods. They\'re valuable if you cannot wear regular contact lenses due to irregular corneal shape, keratoconus, dry eye disease, or after corneal surgery or LASIK.',
      image: img4,
      alt: 'Scleral lens fitting appointment',
    },
    {
      tag: 'Lens Care',
      title: 'PROPER LENS CARE',
      content: 'Your eyes are precious, and taking care of your lenses is important for keeping them healthy. Always wash your hands before handling lenses, remove them when sleeping, keep them away from water, and clean them with proper disinfecting solution. Clean your contact lens case with the same solution and change it every three months. Improper care can cause serious eye infections that may lead to blindness. Watch our helpful guide on proper contact lens care: https://www.youtube.com/watch?v=OrQ9nr9lQzY',
      image: img5,
      alt: 'Proper contact lens care demonstration',
    },
  ];

  const careSteps = [
    { 
      title: 'Consult & Assessment', 
      description: 'Meet with our experienced doctors to discuss your vision needs, lifestyle, and determine if contact lenses are right for you.' 
    },
    { 
      title: 'Professional Fitting', 
      description: 'Receive a custom fitting to ensure proper lens size, curvature, and prescription for optimal comfort and vision.' 
    },
    { 
      title: 'Lens Selection', 
      description: 'Choose from daily, weekly, or monthly replacement options, and select any tints or special features you need.' 
    },
    { 
      title: 'Insertion & Care Training', 
      description: 'Learn proper techniques for inserting, removing, and caring for your lenses to ensure safe and effective use.' 
    },
    { 
      title: 'Follow-Up Care', 
      description: 'Schedule regular check-ups to monitor eye health and ensure your lenses continue to provide clear, comfortable vision.' 
    },
  ];

  const faqs = [
    {
      question: 'What are the benefits of contact lenses over glasses?',
      answer: 'Contact lenses move with your eyes, providing a larger field of vision with fewer distortions. You don\'t have frames hovering in your peripheral vision, and lenses won\'t fog up on cold days or get wet in the rain. They\'re ideal for sports and active lifestyles.'
    },
    {
      question: 'Can children wear contact lenses?',
      answer: 'Yes! New advances in contact lens technology now allow some children with refractive errors to wear contact lenses at a young age, under the supervision of an experienced doctor. Additionally, MISIGHT technology can assist children in controlling progression of their nearsightedness - this FDA approved tool has proven instrumental in controlling myopia.'
    },
    {
      question: 'How often should contact lenses be replaced?',
      answer: 'Depending on the type of lenses selected, replacements may be needed quarterly, monthly, every 1-2 weeks or daily. With continued wear, protein and lipid deposits accumulate on the lens surface, weakening its corrective powers. Daily replacement contact lenses have become the preferred replacement regimen, fostering the best eye health, comfort, and convenience.'
    },
    {
      question: 'What types of contact lenses are available?',
      answer: 'Spherical lenses correct nearsightedness and farsightedness. Toric lenses correct astigmatism. Bifocal lenses correct presbyopia (age-related focusing problems). Scleral lenses address distorted corneas from injury or Keratoconus, as well as dry eye cases. Lenses can also be clear or tinted for cosmetic, therapeutic, or visibility purposes.'
    },
    {
      question: 'What are scleral contact lenses?',
      answer: 'Scleral contact lenses are larger than soft contact lenses and rest on the sclera (the white part of your eye) rather than the cornea. They\'re gas permeable, allowing oxygen to reach your cornea. They\'re valuable for people with irregular corneal shapes, keratoconus, severe dry eye, or those who cannot wear regular contact lenses. The space between the lens and eye holds saline, providing comfort for dry eyes.'
    },
    {
      question: 'How long can I wear my contact lenses each day?',
      answer: 'Daily wear lenses should be worn while you are awake, for up to 10 hours a day, and removed each night for cleaning. Extended wear lenses can be worn continuously for up to seven days including while you sleep, but require careful monitoring by your doctor. Always follow your specific lens wearing schedule.'
    },
    {
      question: 'How do I care for my contact lenses?',
      answer: <>Wash your hands before handling lenses. Clean daily wear lenses each night with proper disinfecting solution. Always remove lenses when sleeping. Keep lenses away from water - never wear them while swimming or showering. Clean your contact lens case with disinfecting solution and replace it every three months. Follow your doctor's instructions precisely. For a step-by-step visual guide, watch <a href="https://www.youtube.com/watch?v=OrQ9nr9lQzY" target="_blank" rel="noopener noreferrer">this helpful video</a>.</>
    },
    {
      question: 'What contact lens solution should I use?',
      answer: 'Your doctor will recommend a lens care system to clean and disinfect your lenses. Most solutions perform daily cleaning, disinfecting, rinsing and storing functions. Some also include comfort drops and protein removal. Avoid mixing different solutions, which may lead to discolored lenses or eye discomfort. Always follow your doctor\'s specific recommendations.'
    },
    {
      question: 'Are scleral lenses more expensive than regular contacts?',
      answer: 'Scleral lenses are more expensive than soft contact lenses due to their high specificity of fit and the specialized training required. However, they can be used for much longer periods, often making them cost-effective over time. They\'re especially valuable for patients who cannot wear other types of lenses.'
    },
    {
      question: 'What if my eyes feel uncomfortable with contacts?',
      answer: 'If your eyes feel sensitive to light, look infected, or experience any discomfort, remove your contact lenses immediately and call us for assistance. We\'re available seven days a week. Serious eye infections can happen with improper contact lens use and may cause vision problems if not addressed promptly.'
    },
    {
      question: 'Can I wear contacts if I have dry eyes?',
      answer: 'Yes! Scleral contact lenses are particularly valuable for people with dry eyes. The space between the scleral lens and the eye acts as a reservoir filled with saline, keeping your cornea moist for longer periods. We can help determine the best lens option for your specific dry eye condition.'
    },
    {
      question: 'What are gas permeable contact lenses?',
      answer: 'Gas permeable contact lenses are made of a rigid material that holds its shape but allows oxygen to pass through - about two to four times more oxygen than soft lenses. They provide crisper, clearer vision and are more durable, but may require some time to get used to. They\'re smaller than regular contacts and cover about three-quarters of the cornea.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Contact Lenses"
        subtitle="Advanced lens technology for clear, comfortable vision"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />

        <VideoEmbed
          title="How to Insert Your Contact Lenses"
          description="New to contacts? This short step-by-step tutorial walks you through safely putting your lenses in. Remember to always wash and dry your hands first."
          videoId="WuTHmJe2ZUY"
        />

        <ProcedureTimeline steps={careSteps} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Ready to Experience the Freedom of Contact Lenses?"
          description="Our experienced doctors specialize in contact lens fittings, including advanced scleral lenses. Schedule your consultation today!"
          buttonText="Schedule Consultation"
        />
      </div>
    </div>
  );
};

export default ContactLenses;