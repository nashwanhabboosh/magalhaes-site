// LASIK.js
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

import img1 from '../../assets/stock_photos/laser-vision-correction/LASIK.jpg';
import img2 from '../../assets/stock_photos/laser-vision-correction/Ideal_for_LASIK.jpg';
import img3 from '../../assets/stock_photos/laser-vision-correction/How_LASIK.jpg';
import img4 from '../../assets/stock_photos/laser-vision-correction/Recovery.jpg';
import img5 from '../../assets/stock_photos/laser-vision-correction/Approving_doctor.jpg';

const LASIK = () => {
  const features = [
    { 
      icon: '👁️', 
      title: '20/20 Vision or Better', 
      description: 'Over 95% of patients achieve 20/20 vision or better after LASIK treatment.' 
    },
    { 
      icon: '⚡', 
      title: 'Quick Procedure', 
      description: 'The entire surgery takes less than five minutes per eye with minimal discomfort.' 
    },
    { 
      icon: '🚀', 
      title: 'Fast Recovery', 
      description: 'Most patients return to work and regular activities the very next day after surgery.' 
    },
    { 
      icon: '👓', 
      title: 'Freedom from Glasses', 
      description: 'Eliminate or greatly reduce your dependence on eyeglasses and contact lenses.' 
    },
    { 
      icon: '🎯', 
      title: 'Customized Treatment', 
      description: 'Procedures are customized to correct your specific refractive errors for optimal results.' 
    },
    { 
      icon: '✓', 
      title: 'FDA Approved', 
      description: 'Safe and proven procedure with an exceedingly low complication rate.' 
    },
  ];

  const sections = [
    {
      tag: 'What is LASIK',
      title: 'WHAT IS LASIK?',
      content: 'LASIK, or Laser-Assisted In Situ Keratomileusis, is a refractive procedure that reshapes the cornea to correct nearsightedness, farsightedness and astigmatism. Using targeted excimer laser beam energy, the procedure reshapes corneal tissue so that light rays are focused more precisely on the retina to produce clear, sharp vision. LASIK is the most common type of refractive surgery, allowing patients to achieve clear vision without the need for glasses or contact lenses.',
      image: img1,
      alt: 'LASIK laser vision correction procedure',
    },
    {
      tag: 'Ideal Candidate',
      title: 'WHO IS THE IDEAL CANDIDATE?',
      content: 'While LASIK is considered a safe procedure, it is not ideal for everyone. Ideal candidates are over 18 years old, not pregnant or nursing, in general good health, have had stable vision for at least six months, have a healthy cornea thick enough for a flap, and have refractive errors that fall within the treatable range. A thorough medical evaluation will determine if LASIK is appropriate for you or if you would benefit from another type of refractive procedure.',
      image: img2,
      alt: 'Determining ideal LASIK candidates',
    },
    {
      tag: 'How LASIK Works',
      title: 'HOW DOES LASER VISION CORRECTION WORK?',
      content: 'Laser vision correction procedures reshape the cornea with laser energy to correct refractive errors. By reshaping the cornea, these procedures change the way that the eye focuses light, allowing you to enjoy clear vision. The excimer laser delivers customized pulses of light energy based on your unique prescription, with measurements determined prior to surgery for precise positioning and optimal results.',
      image: img3,
      alt: 'How laser vision correction reshapes the cornea',
    },
    {
      tag: 'Recovery',
      title: 'RECOVERY AND RESULTS',
      content: 'After LASIK, most patients can return to work and regular activities the next day, with certain strenuous activities avoided for at least a week. Though full results may take several months to develop, significant visual improvement is noticeable immediately. Most patients achieve vision that is 20/20 or better and are able to reduce or eliminate the need for glasses or contact lenses. Distance vision remains clear, though reading glasses may be needed after age 40 for presbyopia.',
      image: img4,
      alt: 'LASIK recovery and results',
    },
    {
      tag: 'Safety & FDA Approval',
      title: 'SAFETY AND FDA APPROVAL',
      content: 'LASIK is considered safe for most patients who are ideal candidates. As an FDA approved procedure, the complication rate is exceedingly low. The procedure is performed using only numbing eye drops to reduce discomfort, takes less than five minutes per eye, and most patients tolerate it well. Our experienced surgeons use the latest technology to ensure the best possible outcomes with minimal risk.',
      image: img5,
      alt: 'FDA approved LASIK safety and doctor approval',
    },
  ];

  const procedureSteps = [
    { 
      title: 'Pre-Operative Evaluation', 
      description: 'Comprehensive eye examination to determine candidacy and take precise measurements for customized treatment planning.' 
    },
    { 
      title: 'Preparation & Numbing', 
      description: 'Numbing eye drops are applied, and optional oral sedative is available. A speculum keeps the eye open and positioned.' 
    },
    { 
      title: 'Corneal Flap Creation', 
      description: 'A thin corneal flap is created using either a microkeratome blade or femtosecond laser, then gently lifted aside.' 
    },
    { 
      title: 'Laser Reshaping', 
      description: 'The excimer laser delivers customized pulses of light energy to reshape the cornea based on your prescription.' 
    },
    { 
      title: 'Flap Repositioning & Recovery', 
      description: 'The corneal flap is repositioned, protective shields are provided, and you rest briefly before going home with an escort.' 
    },
  ];

  const faqs = [
    {
      question: 'What is LASIK laser vision correction?',
      answer: 'LASIK (Laser-Assisted In Situ Keratomileusis) is a refractive procedure that reshapes the cornea to correct nearsightedness, farsightedness and astigmatism. Using targeted excimer laser beam energy, LASIK reshapes corneal tissue so that light rays are focused more precisely on the retina to produce clear, sharp vision without the need for glasses or contact lenses.'
    },
    {
      question: 'How successful is LASIK?',
      answer: 'LASIK is highly successful. Patients are able to achieve 20/20 vision or better after treatment in more than 95% of cases. Most patients achieve significant visual improvement immediately after the procedure and are able to reduce or eliminate their need for glasses or contact lenses.'
    },
    {
      question: 'Am I a good candidate for LASIK?',
      answer: 'Ideal candidates for LASIK are over 18 years old, not pregnant or nursing, in general good health, have had stable vision for at least six months, have a healthy cornea thick enough for a flap, and have refractive errors that fall within the treatable range. A thorough medical evaluation will determine if LASIK is right for you.'
    },
    {
      question: 'How long does the LASIK procedure take?',
      answer: 'The entire LASIK surgery takes less than five minutes per eye to perform. However, patients can expect to spend a few hours at the office for preparation, the procedure itself, and a brief recovery period before going home. Both eyes are typically treated during the same visit.'
    },
    {
      question: 'Is LASIK painful?',
      answer: 'LASIK is performed using only numbing eye drops to reduce any potential discomfort during the procedure. Most patients tolerate the procedure well with little to no discomfort. If requested, patients can receive an oral sedative prior to surgery to reduce any anxieties. Medication may be prescribed for any mild discomfort after the procedure.'
    },
    {
      question: 'How is the LASIK procedure performed?',
      answer: 'During LASIK, you lie in a reclining chair as the laser is positioned over your eye. A speculum keeps the eye open. A corneal flap is created with either a microkeratome blade or femtosecond laser. The surgeon gently lifts the flap, and the excimer laser reshapes the cornea with customized pulses of light energy based on your prescription. The flap is then repositioned.'
    },
    {
      question: 'What is recovery like after LASIK?',
      answer: 'After LASIK, you will rest in the office briefly before someone escorts you home. Most patients can return to work and regular activities the next day. Certain strenuous activities should be avoided for at least a week. The doctor will provide specific post-operative instructions to ensure proper healing and help you achieve the best possible vision.'
    },
    {
      question: 'When will I see results after LASIK?',
      answer: 'Significant visual improvement is noticeable immediately after the LASIK procedure. Though it may take several months for full results to develop, most patients achieve vision that is 20/20 or better right away and experience dramatic improvement in their daily vision.'
    },
    {
      question: 'Will LASIK eliminate my need for reading glasses?',
      answer: 'LASIK provides excellent distance vision correction. However, it does not prevent presbyopia, the age-related vision changes that occur after age 40. Many patients will still need reading glasses for close-up work after LASIK, but their distance vision will remain clear. Your doctor can discuss options for addressing presbyopia.'
    },
    {
      question: 'What are the risks of LASIK?',
      answer: 'While LASIK is considered safe and has an exceedingly low complication rate as an FDA approved procedure, all surgical procedures carry some risks. Rare potential complications include undercorrection, overcorrection, astigmatism, dry eyes, flap complications, infection, sensitivity to light, halos, night glare, or compromised vision. Your doctor will discuss all risks during your consultation.'
    },
    {
      question: 'Is LASIK FDA approved?',
      answer: 'Yes, LASIK is an FDA approved procedure. It is considered safe for most patients who are ideal candidates, and the complication rate is exceedingly low. LASIK has been performed successfully on millions of patients worldwide and continues to be one of the most popular elective surgical procedures.'
    },
    {
      question: 'How much does LASIK cost?',
      answer: 'The cost of LASIK varies depending on several factors including the technology used and the complexity of your prescription. During your consultation, we will provide you with detailed pricing information and discuss payment options. Many patients find that LASIK is cost-effective over time when compared to the ongoing expense of glasses and contact lenses.'
    },
    {
      question: 'Can both eyes be treated on the same day?',
      answer: 'Yes, both eyes are typically treated during the same LASIK procedure. The second eye is treated right after the first. Treating both eyes on the same day allows for balanced vision recovery and means you only need one recovery period.'
    },
    {
      question: 'What types of vision problems can LASIK correct?',
      answer: 'Laser vision correction procedures can correct nearsightedness (myopia), farsightedness (hyperopia), and astigmatism. The procedures are customized to provide the best possible results for each individual patient, allowing your surgeon to correct the very specific refractive errors that obscure your vision.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="LASIK Laser Vision Correction"
        subtitle="Experience the freedom of clear vision without glasses or contacts"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <ProcedureTimeline steps={procedureSteps} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Ready to Experience Life Without Glasses?"
          description="Schedule a consultation to find out if LASIK is right for you. Our experienced surgeons use the latest technology to help you achieve clear vision."
          buttonText="Schedule LASIK Consultation"
          onButtonClick={() => {
            console.log('Navigate to booking page');
          }}
        />
      </div>
    </div>
  );
};

export default LASIK;