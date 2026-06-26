// OpticalShop.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  ProcedureTimeline,
  CTASection 
} from '../../components/ServiceComponents';
import '../../components/ServiceComponents.css';

import img1 from '../../assets/stock_photos/optical-shop/Shop.jpg';
import img2 from '../../assets/stock_photos/optical-shop/Lenses.jpg';
import img3 from '../../assets/stock_photos/optical-shop/Frames.jpg';
import img4 from '../../assets/stock_photos/optical-shop/Professional.jpg';

const OpticalShop = () => {
  const features = [
    { 
      icon: '👓', 
      title: '900+ Frame Styles', 
      description: 'Extensive selection from newest fashion and designer frames to value-priced options for every budget.' 
    },
    { 
      icon: '🎨', 
      title: 'Expert Styling', 
      description: 'Over 100 years of combined experience from our stylists and opticians to help you find the perfect frames.' 
    },
    { 
      icon: '🔬', 
      title: 'Premium Lens Technology', 
      description: 'Authorized providers for Varilux, Zeiss and Hoya - the most technologically superior lens products available.' 
    },
    { 
      icon: '💻', 
      title: 'Specialized Lens Options', 
      description: 'Custom lens designs for computer users, office workers, students, and every lifestyle need.' 
    },
    { 
      icon: '✨', 
      title: 'Advanced Coatings', 
      description: 'Multi-layer anti-reflective coating, UV blockers, Polaroid sun lenses, and various tints available.' 
    },
    { 
      icon: '✅', 
      title: '30-Day Warranty', 
      description: 'No-risk 30-day warranty on all eyewear - we guarantee your satisfaction and stand by our products.' 
    },
  ];

  const sections = [
    {
      tag: 'Our Shop',
      title: 'COMPREHENSIVE OPTICAL SERVICES',
      content: <>Our practice features a full-service optical center with a wide array of eyeglass frames and contact lenses to suit every look and budget. We customize your prescription with the latest optical lens design to optimize your vision in every situation. With more than 900 different frame styles in stock, we offer choices from newest fashion and designer frames to less expensive value lines. Our full-service lab can prepare lenses for you while you wait. Our optical shop is conveniently located within <a href="https://www.lenscrafters.com" target="_blank" rel="noopener noreferrer">LensCrafters</a>, giving you access to an even wider selection of premium eyewear.</>,
      image: img1,
      alt: 'Our full-service optical shop',
    },
    {
      tag: 'Lens Technology',
      title: 'PREMIUM LENS TECHNOLOGY',
      content: 'As authorized providers for Varilux, Zeiss and Hoya products, we offer the most technologically superior lens products available today. We feature special lens design options for computer users, office workers and students. Our variety includes multi-layer anti-reflective coating to minimize glare, ultraviolet blockers to protect your eye health, and Polaroid sun lenses for ultimate comfort and vision while outdoors.',
      image: img2,
      alt: 'Premium lens technology from Varilux, Zeiss and Hoya',
    },
    {
      tag: 'Choosing Frames',
      title: 'CHOOSING THE RIGHT FRAMES FOR YOU',
      content: 'When choosing eyeglass frames, the shape of your face is one of the most important aspects to consider. A patient with a square face may look most attractive in a rounded frame that provides curves, while a frame with a higher bridge and hinges can add the illusion of length. Skin, hair and eye coloring also play a factor — skin tones are either cool (blue or pink hue) or warm (yellow hue). If your overall coloring is cool, consider frames in dark tortoise, black, pink, blue or plum. For warm coloring, the best choices may be gold, red, camel, pale tortoise or green. Our staff is happy to analyze your coloring and help you find eyewear that enhances your appearance.',
      image: img3,
      alt: 'Choosing the right eyeglass frames for your face shape and skin tone',
    },
    {
      tag: 'Expert Guidance',
      title: 'EXPERT GUIDANCE & PERSONALIZED SERVICE',
      content: 'Our stylists and opticians have over 100 years of combined experience helping patients find eyewear that matches their appearance, personal taste, and visual needs. We take time to understand your lifestyle, preferences, and specific vision requirements to recommend the best options for you. We guarantee your eyewear with our no-risk 30-day warranty.',
      image: img4,
      alt: 'Expert optical staff providing personalized eyewear guidance',
    },
  ];

  const shoppingSteps = [
    { 
      title: 'Comprehensive Eye Exam', 
      description: 'Start with a thorough eye examination to determine your precise prescription and vision needs.' 
    },
    { 
      title: 'Frame Selection Consultation', 
      description: 'Work with our expert stylists to choose frames that complement your face shape, skin tone, and personal style.' 
    },
    { 
      title: 'Lens Technology Discussion', 
      description: 'Select the best lens options for your lifestyle, including coatings, tints, and specialized designs for your activities.' 
    },
    { 
      title: 'Custom Fitting & Measurements', 
      description: 'Precise measurements ensure optimal comfort, vision, and appearance with your new eyewear.' 
    },
    { 
      title: 'Quality Check & Adjustment', 
      description: 'Final fitting and adjustments to ensure perfect comfort and vision, backed by our 30-day warranty.' 
    },
  ];

  const faqs = [
    {
      question: 'How many frame styles do you have in stock?',
      answer: 'We have more than 900 different frame styles in stock, ranging from the newest fashion and designer frames to less expensive value lines. We have an array of choices to fit every budget and style preference.'
    },
    {
      question: 'What lens brands do you carry?',
      answer: 'We are authorized providers for Varilux, Zeiss and Hoya products - the most technologically superior lens products available today. These premium brands offer the latest in optical lens design to optimize your vision in every situation.'
    },
    {
      question: 'Do you offer specialized lens options?',
      answer: 'Yes! We offer special lens design options customized for computer users, office workers, students, and various lifestyle needs. We can customize your prescription with the latest optical lens design to optimize your vision for your specific activities and work environment.'
    },
    {
      question: 'What lens coatings and treatments are available?',
      answer: 'We feature a variety of options including multi-layer anti-reflective coating to minimize glare, ultraviolet blockers to protect your eye health, Polaroid sun lenses for outdoor comfort and vision, and various tints. Our staff can help you select the best options for your needs.'
    },
    {
      question: 'How do I choose frames that suit my face shape?',
      answer: 'The most common face shapes are round, oval, square or heart-shaped, and each may suit different frame styles. For example, a square face may look best in rounded frames that provide curves, while frames with a higher bridge can add length. Our experienced staff has years of expertise helping patients find the perfect frame style for their face shape.'
    },
    {
      question: 'How does skin tone affect frame selection?',
      answer: 'Skin tones are either cool (blue or pink hue) or warm (yellow hue). If your coloring is cool, consider frames in dark tortoise, black, pink, blue or plum. For warm coloring, try gold, red, camel, pale tortoise or green. Our staff can analyze your coloring and help you find eyewear that enhances your appearance.'
    },
    {
      question: 'Do you have an on-site lab?',
      answer: 'Yes! We feature a full-service lab that can prepare your lenses while you wait. This allows for quick turnaround and immediate adjustments if needed, so you can leave with your new eyewear the same day in many cases.'
    },
    {
      question: 'What is your warranty on eyewear?',
      answer: 'We guarantee your eyewear and stand by our no-risk 30-day warranty. If you are not completely satisfied with your glasses for any reason within 30 days, we will work with you to make it right. Your satisfaction is our priority.'
    },
    {
      question: 'Can you help me choose frames that match my personal style?',
      answer: 'Absolutely! Personal taste plays a big part in selecting eyewear. Our stylists and opticians have over 100 years of combined experience helping patients find frames that suit their looks, preferences and visual needs. We take time to understand your style and lifestyle to recommend the best options.'
    },
    {
      question: 'Do you offer both fashion and budget-friendly options?',
      answer: 'Yes! We offer frames ranging from the newest fashion and designer styles to less expensive value lines. With over 900 frame styles in stock, we have options to fit every budget without compromising on quality or style.'
    },
    {
      question: 'What makes Varilux, Zeiss, and Hoya lenses special?',
      answer: 'Varilux, Zeiss and Hoya are industry leaders in lens technology, offering the most technologically superior products available. These brands provide advanced optical designs, superior clarity, better durability, and cutting-edge features that optimize your vision in every situation.'
    },
    {
      question: 'Can I get prescription sunglasses?',
      answer: 'Yes! We offer Polaroid sun lenses that provide the ultimate in comfort and vision while outdoors. These can be made with your prescription and include UV blockers to protect your eye health. We can help you select the right tint and polarization for your outdoor activities.'
    },
    {
      question: 'How experienced is your optical staff?',
      answer: 'Our stylists and opticians have over 100 years of combined experience. They have helped thousands of patients find the perfect eyewear and stay current with the latest trends, technologies, and fitting techniques to provide you with expert guidance.'
    },
    {
      question: 'Do you sell contact lenses in addition to glasses?',
      answer: 'Yes! In addition to our comprehensive eyeglass selection, our optical center features a wide array of contact lenses to suit every need. We can help you find the right contact lens option, whether for daily wear, extended wear, or specialized needs.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Optical Shop"
        subtitle="Premium eyewear for every style, budget, and vision need"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <ProcedureTimeline steps={shoppingSteps} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Find Your Perfect Eyewear Today"
          description="Visit our optical shop to browse over 900 frame styles and experience personalized service from our expert staff. Backed by our 30-day satisfaction guarantee."
          buttonText="Visit Our Optical Shop"
          onButtonClick={() => {
            console.log('Navigate to optical shop or booking page');
          }}
        />
      </div>
    </div>
  );
};

export default OpticalShop;