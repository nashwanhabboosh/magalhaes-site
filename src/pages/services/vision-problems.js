// VisionProblems.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  CTASection 
} from '../../components/ServiceComponents';

import img1 from '../../assets/stock_photos/vision-problems/glasses.jpg';
import img2 from '../../assets/stock_photos/vision-problems/reading_glasses.jpg';
import img3 from '../../assets/stock_photos/vision-problems/astigmatism.jpg';
import img4 from '../../assets/stock_photos/vision-problems/Elder.jpg';
import img5 from '../../assets/stock_photos/vision-problems/Floaters.jpg';

const VisionProblems = () => {
  const features = [
    { 
      icon: '👓', 
      title: 'Refractive Errors', 
      description: 'Comprehensive diagnosis and treatment for myopia, hyperopia, astigmatism, and presbyopia.' 
    },
    { 
      icon: '🔬', 
      title: 'Advanced Testing', 
      description: 'Routine eye exams include thorough testing for all common vision problems and conditions.' 
    },
    { 
      icon: '💡', 
      title: 'Multiple Solutions', 
      description: 'Treatment options include eyeglasses, contact lenses, and surgical procedures like LASIK.' 
    },
    { 
      icon: '⚡', 
      title: 'Early Detection', 
      description: 'Identifying vision problems early prevents complications and ensures optimal treatment outcomes.' 
    },
    { 
      icon: '👁️', 
      title: 'Retinal Care', 
      description: 'Immediate assessment of flashes and floaters to detect serious conditions like retinal detachment.' 
    },
    { 
      icon: '🎯', 
      title: 'Clear Vision', 
      description: 'Personalized treatment plans to restore and maintain clear, comfortable vision at all distances.' 
    },
  ];

  const sections = [
    {
      tag: 'Nearsightedness',
      title: 'MYOPIA (NEARSIGHTEDNESS)',
      content: 'Nearsightedness is a vision condition in which nearby objects are clear and distant objects appear blurry. This may be caused by excess corneal curvature or an oblong rather than spherical shape to the eye. Almost a third of people in the U.S. experience some degree of nearsightedness, which normally emerges by age 20. Symptoms include difficulty focusing on distant objects like a chalkboard or TV. It may be hereditary or caused by sustained focus on nearby objects.',
      image: img1,
      alt: 'Eyeglasses for myopia nearsightedness correction',
    },
    {
      tag: 'Farsightedness',
      title: 'HYPEROPIA (FARSIGHTEDNESS)',
      content: 'Farsightedness is the condition in which the eye focuses on distant objects better than on objects closer to the eye, so nearby objects appear blurry. This happens when the cornea is incorrectly curved, causing light rays to focus behind the surface of the retina instead of directly on it. Treatment options include reading glasses, contact lenses, or laser surgeries like PRK and LASIK for more permanent correction.',
      image: img2,
      alt: 'Reading glasses for hyperopia farsightedness correction',
    },
    {
      tag: 'Astigmatism',
      title: 'ASTIGMATISM',
      content: 'Astigmatism occurs when the cornea is curved slightly in one direction, causing blurred vision. Some light focuses in front of or behind the retina, making vision blurry for nearby, far-away, or all objects. Indications include headaches, eye strain, fatigue, and distorted vision. The severity of symptoms depends on the degree of astigmatism. It can usually be corrected with prescription eyeglasses, contact lenses, or corneal modification techniques like LASIK.',
      image: img3,
      alt: 'Astigmatism vision condition and correction',
    },
    {
      tag: 'Presbyopia',
      title: 'PRESBYOPIA',
      content: 'Presbyopia is a natural change in our eyes\' ability to focus that occurs when the crystalline lens loses its flexibility. You may need to hold reading materials further away or experience blurry vision at close range, along with eye fatigue and headaches. Symptoms develop over years and typically begin in the early- to mid-40s. Treatment includes multifocal and progressive lenses, monovision contact lenses, or surgical options like CK, PRK, monovision LASIK, and intraocular lenses.',
      image: img4,
      alt: 'Presbyopia age-related vision changes in older adults',
    },
    {
      tag: 'Flashes & Floaters',
      title: 'FLASHES AND FLOATERS',
      content: 'Flashes appear as flashing lights or lightning streaks caused by pressure on the retina. Floaters are small specks or dots seen against clear backgrounds, caused by fibers moving within the vitreous humor. While most occur in healthy or nearsighted eyes, they can indicate serious problems including injury, retinal detachment, or posterior vitreous detachment. Serious vision loss can occur if the retina or vitreous detach from the eye wall. Contact your doctor immediately if you experience these symptoms.',
      image: img5,
      alt: 'Eye floaters and flashes visual disturbances',
    },
  ];

  const faqs = [
    {
      question: 'What is myopia (nearsightedness)?',
      answer: 'Myopia is a vision condition in which nearby objects are clear and distant objects appear blurry. It may be caused by excess corneal curvature or an oblong eye shape, affecting how light focuses on the retina. Almost a third of people in the U.S. experience some degree of nearsightedness, which normally emerges by age 20.'
    },
    {
      question: 'How is nearsightedness treated?',
      answer: 'Eyeglasses and contact lenses are common methods of correcting nearsightedness. Eyewear may be used for certain activities like watching television or driving, or for all activities. Alternatively, vision correction procedures such as refractive and laser surgery (like LASIK) and orthokeratology (a non-invasive procedure involving rigid contact lenses) may rectify the problem.'
    },
    {
      question: 'What is hyperopia (farsightedness)?',
      answer: 'Hyperopia is the condition in which the eye focuses on distant objects better than on objects closer to the eye, so nearby objects appear blurry. This happens when the cornea is incorrectly curved, causing light rays to focus behind the retina instead of directly on its surface, producing a blurry image.'
    },
    {
      question: 'How is farsightedness corrected?',
      answer: 'Hyperopia can be treated in a variety of ways. The most common is a pair of reading glasses or contact lenses. It can also be treated with medical procedures, including the laser surgeries PRK (photorefractive keratectomy) and LASIK (laser-assisted in situ keratomileusis) for more permanent correction.'
    },
    {
      question: 'What causes astigmatism?',
      answer: 'Astigmatism occurs when the cornea, the front surface of the eye, is curved slightly in one direction rather than being perfectly round. This causes light to focus incorrectly - some light focuses in front of or behind the retina instead of directly on it. This results in blurred or distorted vision at various distances.'
    },
    {
      question: 'What are the symptoms of astigmatism?',
      answer: 'Indications of astigmatism can include headaches, eye strain, fatigue, and blurred or distorted vision for nearby, far-away, or all objects. The severity of symptoms depends on the degree of astigmatism in your eyes. Routine eye exams include testing for astigmatism, which affects many people.'
    },
    {
      question: 'How is astigmatism treated?',
      answer: 'Once diagnosed, astigmatism can usually be corrected with prescription eyeglasses or contact lenses designed specifically for astigmatism (toric lenses). Corneal modification techniques such as LASIK (laser vision correction) are also useful treatment options for more permanent correction.'
    },
    {
      question: 'What is presbyopia and when does it occur?',
      answer: 'Presbyopia is a natural change in our eyes\' ability to focus that occurs when the crystalline lens of the eye loses its flexibility, causing objects at close range to appear blurry. Symptoms develop over years and typically begin to show in the early- to mid-40s. Classic symptoms include needing to hold reading materials further away, blurry vision at close range, eye fatigue, and headaches when working with materials up close.'
    },
    {
      question: 'How is presbyopia corrected?',
      answer: 'The effects of presbyopia can be corrected with several options: glasses or contact lenses including multifocal and progressive lenses; monovision correction; and conventional or laser surgery options such as CK (conductive keratoplasty), PRK, monovision LASIK, and intraocular lenses (IOLs).'
    },
    {
      question: 'What are eye floaters?',
      answer: 'Floaters are small specks or dots that can be seen against clear backgrounds. They are caused when fibers move within the vitreous humor, the gelatinous substance made of water and protein fibers that fills the eye. While most floaters occur in people with healthy or merely nearsighted eyes, they can sometimes indicate more serious problems.'
    },
    {
      question: 'What causes flashes in vision?',
      answer: 'Flashes in vision are caused by pressure on the retina, the bundle of nerves in the back of the eye where images are detected and transmitted to the brain. Patients typically see flashing lights or lightning streaks. While they can occur in healthy eyes, flashes can also be symptoms of serious problems including injury and retinal detachment.'
    },
    {
      question: 'When should I be concerned about flashes and floaters?',
      answer: 'Although most flashes and floaters occur in people with healthy eyes, they can be symptoms of serious problems including injury, retinal detachment, and posterior vitreous detachment. Serious vision loss can occur if the retina or vitreous detach from the eye wall. Patients experiencing flashes and floaters should contact their doctor immediately so an examination can be performed.'
    },
    {
      question: 'Can vision problems be hereditary?',
      answer: 'Yes, many vision problems have a hereditary component. Nearsightedness (myopia) may be hereditary, and there is evidence that if parents are nearsighted, their children are more likely to develop the condition. Family history is an important factor your eye doctor will consider during comprehensive eye exams.'
    },
    {
      question: 'How often should I have my eyes examined for vision problems?',
      answer: 'Routine comprehensive eye exams include testing for all common vision problems including myopia, hyperopia, astigmatism, and presbyopia. Adults should have eye exams every 1-2 years, or annually if you have vision problems, wear corrective lenses, or have risk factors. Children should have regular exams to detect problems early before they affect school performance.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Vision Problems"
        subtitle="Expert diagnosis and treatment for all refractive errors"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Experiencing Vision Problems?"
          description="Don't let blurry vision or eye discomfort affect your quality of life. Schedule a comprehensive eye exam to get an accurate diagnosis and personalized treatment plan."
          buttonText="Schedule Your Exam"
        />
      </div>
    </div>
  );
};

export default VisionProblems;