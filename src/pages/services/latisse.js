// Latisse.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  ProcedureTimeline
} from '../../components/ServiceComponents';
import AppointmentButton from '../../components/AppointmentButton';

import img1 from '../../assets/stock_photos/latisse/Lashes.jpg';
import img2 from '../../assets/stock_photos/latisse/Full_lashes.jpg';
import img3 from '../../assets/stock_photos/latisse/Candidate.jpg';
import img4 from '../../assets/stock_photos/latisse/Safety.jpg';

const Latisse = () => {
  const features = [
    { 
      icon: '✨', 
      title: 'FDA-Approved', 
      description: 'The first and only FDA-approved cosmetic treatment for enhancing eyelash growth.' 
    },
    { 
      icon: '📏', 
      title: 'Longer Lashes', 
      description: 'Clinically proven to increase the length of your natural eyelashes.' 
    },
    { 
      icon: '💪', 
      title: 'Fuller & Thicker', 
      description: 'Enhances both the thickness and fullness of your lashes for a dramatic look.' 
    },
    { 
      icon: '🎨', 
      title: 'Darker Appearance', 
      description: 'Increases the darkness of eyelashes for more defined, beautiful eyes.' 
    },
    { 
      icon: '🏠', 
      title: 'Easy Home Application', 
      description: 'Simple once-daily application at home using disposable applicators.' 
    },
    { 
      icon: '⏱️', 
      title: 'Visible Results', 
      description: 'See results in as little as 4 weeks, with full results in 16 weeks.' 
    },
  ];

  const sections = [
    {
      tag: 'What is LATISSE®',
      title: 'WHAT IS LATISSE®?',
      content: <>LATISSE® eyelash enhancer is the first and only U.S. Food and Drug Administration-approved cosmetic treatment for increasing the length, thickness and darkness of eyelashes. Available only through prescription, LATISSE is applied once a day to the base of the upper eyelashes. This revolutionary treatment offers a safe and effective way to enhance your natural lashes without the need for extensions or false lashes. Learn more at <a href="https://www.latisse.com" target="_blank" rel="noopener noreferrer">latisse.com</a>.</>,
      image: img1,
      alt: 'LATISSE eyelash enhancement treatment',
    },
    {
      tag: 'How It Works & Results',
      title: 'HOW LATISSE® WORKS & RESULTS',
      content: 'LATISSE\'s active ingredient, bimatoprost, increases the number of hairs in, and the duration of, a hair follicle\'s growth period — resulting in longer, fuller, and darker lashes. Results may be apparent within four weeks of consistent use, with full results taking sixteen weeks. You will gradually notice your lashes becoming longer, thicker, and darker as treatment progresses. It is important to understand that LATISSE results are not permanent — once treatment is discontinued, your eyelashes will gradually return to their previous appearance over time.',
      image: img2,
      alt: 'Full, longer lashes achieved with LATISSE',
    },
    {
      tag: 'Candidates & Application',
      title: 'GOOD CANDIDATES & APPLICATION',
      content: 'Anyone who wants longer, fuller and darker eyelashes may be a candidate for LATISSE. However, those with eye infections, broken or irritated skin on their eyelids, or who use products for elevated intraocular pressure should not use LATISSE. A full medical history is taken prior to starting treatment. LATISSE is applied at night after removing contact lenses and makeup. Apply one drop to a single-use disposable applicator and draw it along the base of the upper eyelid at the lash line, moving from the inside to the outside. Blot excess solution and use a separate applicator for each eye. Contact lenses can be reinserted 15 minutes after application.',
      image: img3,
      alt: 'Good candidates for LATISSE treatment and application process',
    },
    {
      tag: 'Safety & Side Effects',
      title: 'SIDE EFFECTS & SAFETY',
      content: 'Common side effects of LATISSE end when treatment ends and include eye itchiness, eye redness, skin darkening around the application area, eyelid redness, eye irritation, and eye dryness. There is one potentially serious side effect: LATISSE may cause increased brown iris pigmentation of the colored part of the eye, which is likely to be permanent, although this is very infrequent according to the manufacturer. A full consultation with our doctors will help you understand all risks and benefits before beginning treatment.',
      image: img4,
      alt: 'LATISSE safety information and side effects',
    },
  ];

  const applicationSteps = [
    { 
      title: 'Prepare Your Eyes', 
      description: 'Remove contact lenses and all makeup. Complete your evening skincare routine before applying LATISSE.' 
    },
    { 
      title: 'Apply One Drop', 
      description: 'Place one drop of LATISSE solution onto a single-use sterile applicator. Do not reuse applicators.' 
    },
    { 
      title: 'Apply to Upper Lash Line', 
      description: 'Carefully draw the applicator along the base of the upper eyelashes at the lash line, from inner to outer edge.' 
    },
    { 
      title: 'Blot Excess Solution', 
      description: 'Blot any excess solution beyond the eyelid margin to prevent it from spreading to other areas.' 
    },
    { 
      title: 'Repeat for Other Eye', 
      description: 'Discard the applicator and use a fresh applicator for your second eye. Never reuse applicators between eyes.' 
    },
  ];

  const faqs = [
    {
      question: 'What is LATISSE®?',
      answer: <>LATISSE® eyelash enhancer is the first and only U.S. Food and Drug Administration-approved cosmetic treatment for increasing the length, thickness and darkness of eyelashes. It is available only through prescription and is applied once a day to the base of the upper eyelashes. For more information, visit <a href="https://www.latisse.com" target="_blank" rel="noopener noreferrer">latisse.com</a>.</>
    },
    {
      question: 'How does LATISSE® work?',
      answer: 'Exactly why LATISSE liquid solution causes eyelashes to grow is unknown. However, its active ingredient, bimatoprost, seems to increase the number of hairs in, and the duration of, a hair follicle\'s growth period. By extending the growth phase, the result is longer, fuller, and darker lashes.'
    },
    {
      question: 'Is LATISSE® FDA-approved?',
      answer: 'Yes, LATISSE is the first and only FDA-approved cosmetic treatment specifically designed for enhancing eyelash growth. This approval ensures that LATISSE has been rigorously tested for safety and effectiveness.'
    },
    {
      question: 'Who is a good candidate for LATISSE®?',
      answer: 'Anyone who wants longer, fuller and darker eyelashes may be a candidate for LATISSE treatment. However, those who have eye infections, broken or irritated skin on their eyelids, or who use products for elevated intraocular pressure should not use LATISSE. A full medical history is taken prior to starting treatment.'
    },
    {
      question: 'Who should not use LATISSE®?',
      answer: 'You should not use LATISSE if you have eye infections, broken or irritated skin on your eyelids, or if you use products for elevated intraocular pressure (such as glaucoma medications). Always consult with your doctor before starting LATISSE treatment to ensure it is safe for you.'
    },
    {
      question: 'Do I need a prescription for LATISSE®?',
      answer: 'Yes, LATISSE is available only through prescription. You must consult with a healthcare provider who will perform a full medical history evaluation before prescribing LATISSE to ensure it is safe and appropriate for you.'
    },
    {
      question: 'How do I apply LATISSE®?',
      answer: 'LATISSE solution is applied at night. Remove contact lenses and makeup, and apply skincare products first. Place one drop of solution on a single-use disposable applicator and apply it to the base of the upper eyelid at the lash line, moving from inside to outside. Blot excess solution and use a separate applicator for each eye to prevent contamination.'
    },
    {
      question: 'How often do I need to apply LATISSE®?',
      answer: 'LATISSE is applied once daily, typically at night as part of your evening routine. Consistent daily application is important for achieving and maintaining results.'
    },
    {
      question: 'Can I apply LATISSE® to my lower lashes?',
      answer: 'No, LATISSE should only be applied to the upper eyelid at the base of the upper eyelashes. Do not apply to the lower lash line. Some solution may naturally transfer to lower lashes through blinking.'
    },
    {
      question: 'Why can\'t I reuse the applicators?',
      answer: 'Single-use disposable applicators are essential to prevent contamination of the LATISSE solution. Each applicator should be used once and then discarded. Use a fresh, sterile applicator for each eye to maintain hygiene and prevent potential eye infections.'
    },
    {
      question: 'Can I wear contact lenses with LATISSE®?',
      answer: 'Yes, but contact lenses must be removed before applying LATISSE. You can put your contact lenses back in 15 minutes after LATISSE treatment. Always remove lenses before application and wait the full 15 minutes before reinserting them.'
    },
    {
      question: 'Can I wear makeup while using LATISSE®?',
      answer: 'Yes, you can wear makeup while using LATISSE. However, you must remove all makeup before applying LATISSE at night. You can apply makeup as normal in the morning after your nighttime LATISSE application.'
    },
    {
      question: 'When will I see results from LATISSE®?',
      answer: 'Results may be apparent within four weeks of consistent daily use. However, full results take sixteen weeks (about 4 months). You will gradually notice your lashes becoming longer, thicker, and darker as treatment progresses. Patience and consistency are key to achieving optimal results.'
    },
    {
      question: 'Are LATISSE® results permanent?',
      answer: 'No, LATISSE results are not permanent. Once LATISSE treatment is discontinued, its benefits gradually end and your eyelashes will return to their previous appearance over time. To maintain your results, you must continue using LATISSE as directed.'
    },
    {
      question: 'What happens if I stop using LATISSE®?',
      answer: 'If you stop using LATISSE, your eyelashes will gradually return to their previous appearance. The benefits of LATISSE are maintained only with continued use. Your lashes will not be worse than before treatment, but they will return to their original state.'
    },
    {
      question: 'What are the common side effects of LATISSE®?',
      answer: 'Common side effects of LATISSE include eye itchiness, eye redness, skin darkening around the application area, eyelid redness, eye irritation, and eye dryness. These side effects typically end when treatment ends. Most side effects are mild and temporary.'
    },
    {
      question: 'Are there any serious side effects of LATISSE®?',
      answer: 'According to the manufacturer, there is one potentially serious side effect: LATISSE may cause increased brown iris pigmentation of the colored part of the eye, which is likely to be permanent. However, this side effect is very infrequent. Your doctor will discuss all potential risks during your consultation.'
    },
    {
      question: 'Can LATISSE® change my eye color?',
      answer: 'In very rare cases, LATISSE may cause increased brown pigmentation of the iris (the colored part of the eye), which is likely to be permanent. This side effect is very infrequent according to the manufacturer. Your doctor will monitor for this during your treatment.'
    },
    {
      question: 'Will LATISSE® darken the skin around my eyes?',
      answer: 'Skin darkening around the application area is a common side effect of LATISSE. This typically occurs if excess solution spreads beyond the lash line. To minimize this, carefully apply LATISSE only to the base of the upper lashes and blot any excess. This darkening is usually reversible and ends when treatment stops.'
    },
    {
      question: 'What is the active ingredient in LATISSE®?',
      answer: 'The active ingredient in LATISSE is bimatoprost, which appears to increase the number of hairs and extend the growth period of hair follicles. This results in longer, fuller, and darker eyelashes.'
    },
    {
      question: 'How much does LATISSE® cost?',
      answer: 'The cost of LATISSE varies depending on your treatment duration and needs. Please contact our office for current pricing information and to schedule a consultation to determine if LATISSE is right for you.'
    },
    {
      question: 'Is LATISSE® covered by insurance?',
      answer: 'LATISSE is a cosmetic treatment and is typically not covered by insurance. However, we recommend checking with your insurance provider. Our office can provide information about pricing and payment options during your consultation.'
    },
    {
      question: 'How long does a bottle of LATISSE® last?',
      answer: 'With once-daily application using the proper technique, one bottle of LATISSE typically lasts approximately one month. Your doctor will provide guidance on proper usage to ensure you get the full benefit from each bottle.'
    },
    {
      question: 'Can men use LATISSE®?',
      answer: 'Yes, LATISSE can be used by both men and women who desire longer, fuller, and darker eyelashes. Anyone who is a good candidate based on their medical history can benefit from LATISSE treatment.'
    },
    {
      question: 'Do I need to see a doctor before using LATISSE®?',
      answer: 'Yes, LATISSE is prescription-only and requires a doctor consultation. A full medical history is taken prior to the start of LATISSE treatment to ensure it is safe and appropriate for you. This consultation is important for identifying any contraindications or potential risks.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="LATISSE® Eyelash Enhancement"
        subtitle="The only FDA-approved prescription treatment for longer, fuller, darker lashes"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <ProcedureTimeline steps={applicationSteps} />
        
        <AccordionFAQ faqs={faqs} />

        <div className="cta-section">
          <h2>Ready for Beautiful, Longer Lashes?</h2>
          <p>
            Schedule a consultation to learn if LATISSE® is right for you. Our doctors will evaluate 
            your candidacy and prescribe this FDA-approved treatment to help you achieve the lashes 
            you've always wanted. For more information about LATISSE®, visit{' '}
            <a href="https://www.latisse.com" target="_blank" rel="noopener noreferrer">latisse.com</a>.
          </p>
          <AppointmentButton className="cta-button" label="Schedule LATISSE® Consultation" />
        </div>
      </div>
    </div>
  );
};

export default Latisse;