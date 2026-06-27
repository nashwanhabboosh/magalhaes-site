// DryEye.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  ProcedureTimeline
} from '../../../components/ServiceComponents';
import AppointmentButton from '../../../components/AppointmentButton';

import img1 from '../../../assets/stock_photos/eye-diseases/dry-eye/What_is_dry_eye.jpg';
import img2 from '../../../assets/stock_photos/eye-diseases/dry-eye/Causes.jpg';
import img3 from '../../../assets/stock_photos/eye-diseases/dry-eye/Doctor_discussing.jpg';
import img4 from '../../../assets/stock_photos/eye-diseases/dry-eye/Treatment.jpg';

const DryEye = () => {
  const features = [
    { 
      icon: '🔬', 
      title: 'Advanced Diagnostics', 
      description: 'TearLab Osmolarity testing and Schirmer tear test for precise dry eye diagnosis.' 
    },
    { 
      icon: '💧', 
      title: 'Multiple Treatment Options', 
      description: 'Punctal plugs, medicated eye drops, and treatment of oil glands in the eyelids.' 
    },
    { 
      icon: '🧬', 
      title: 'Cutting-Edge Biologics', 
      description: 'FDA-approved amniotic membranes used for advanced ocular healing.' 
    },
    { 
      icon: '🎯', 
      title: 'Personalized Care', 
      description: 'Customized treatment plans based on the cause and severity of your condition.' 
    },
    { 
      icon: '👁️', 
      title: 'Vision Protection', 
      description: 'Prevent complications like corneal damage and vision loss with proper treatment.' 
    },
    { 
      icon: '✨', 
      title: 'Symptom Relief', 
      description: 'Effective solutions to relieve burning, irritation, and discomfort.' 
    },
  ];

  const sections = [
    {
      tag: 'What is Dry Eye',
      title: 'WHAT IS DRY EYE?',
      content: 'Dry eye is a common condition that occurs when the eyes are insufficiently moisturized, leading to itching, redness and pain from dry spots on the surface of the eye. The eyes may become dry and irritated because the tear ducts don\'t produce enough tears, or because of a chemical imbalance in the tears. Symptoms usually affect both eyes and may include stinging or burning, a scratchy feeling, eye fatigue, sensitivity to light, difficulty wearing contact lenses, excessive tearing, and blurry vision. Left untreated, dry eye can damage the eye\'s tissues, leaving tiny abrasions on the surface and potentially causing pain, corneal ulcers or scars, and loss of vision.',
      image: img1,
      alt: 'Dry eye condition affecting the ocular surface',
    },
    {
      tag: 'Causes',
      title: 'CAUSES OF DRY EYE',
      content: 'People usually begin experiencing dry eye symptoms as they age, but the condition can also result from certain medications, conditions or injuries. Dry eye tends to affect women more often than men due to hormonal changes during pregnancy or menopause, and is more common in people over 50. Other causes include medications like antihistamines and blood pressure medication, medical conditions such as rheumatoid arthritis and diabetes, environmental conditions, long-term contact lens use, eye surgery, sun exposure, smoking, thyroid eye disease, eyelid surgery, and inflammation of the conjunctiva.',
      image: img2,
      alt: 'Causes and risk factors of dry eye syndrome',
    },
    {
      tag: 'TearLab Diagnostics',
      title: 'TEARLAB OSMOLARITY TESTING',
      content: 'TearLab is an essential diagnostic test for dry eye syndrome that provides precise and predictive information at the point-of-care. The test measures tear osmolarity (salt content) using nanoliter volumes of tear fluid collected directly from the eyelid margin. Abnormal osmolarity is defined by an elevated reading over 300 mOsm/L or when the inter-eye difference is greater than 8 mOsm/L. TearLab has a positive predictive value of 89% and is more precise than other universally accepted point-of-care tests. This impressive technology helps in accurate diagnosis and treatment planning.',
      image: img3,
      alt: 'Doctor discussing TearLab dry eye diagnostic testing with patient',
    },
    {
      tag: 'Treatment',
      title: 'ADVANCED TREATMENT OPTIONS',
      content: 'Treatment depends on the cause, severity, and patient preference. Non-surgical options include artificial tears, blinking exercises, increased humidity, omega-3 supplementation, and prescription medications like Cequa and Regener-Eyes. Surgical options include punctal plugs to limit tear drainage and punctal cautery to permanently close drainage holes. Dr. Magalhaes also uses Oxervate, a neuro-regenerative therapeutic eye drop, for advanced dry eye cases. Additionally, Dr. Magalhaes is the only doctor in the area using FDA-approved amniotic membrane therapy — a unique collagenous tissue derived from the placenta with anti-inflammatory and anti-microbial properties that acts as a natural scaffold to expedite healing of the ocular surface.',
      image: img4,
      alt: 'Advanced dry eye treatment options including amniotic membrane therapy',
    },
  ];

  const treatmentSteps = [
    { 
      title: 'Comprehensive Diagnostic Evaluation', 
      description: 'Thorough eye examination including Schirmer tear test and TearLab Osmolarity testing to accurately diagnose dry eye and determine the underlying cause.' 
    },
    { 
      title: 'Personalized Treatment Plan', 
      description: 'Based on your diagnosis, we develop a customized treatment approach that may include lifestyle modifications, artificial tears, or prescription medications.' 
    },
    { 
      title: 'Advanced Medical Therapy', 
      description: 'Prescription treatments like Cequa or Regener-Eyes biologic drops to address inflammation and increase tear production.' 
    },
    { 
      title: 'Procedural Interventions', 
      description: 'When needed, we offer punctal plugs, amniotic membrane therapy, or other procedures to provide lasting relief and promote healing.' 
    },
    { 
      title: 'Ongoing Monitoring & Care', 
      description: 'Regular follow-up appointments to assess treatment effectiveness and adjust your care plan for optimal long-term eye health.' 
    },
  ];

  const faqs = [
    {
      question: 'What is dry eye syndrome?',
      answer: 'Dry eye is a common condition that occurs when the eyes are insufficiently moisturized, leading to itching, redness and pain from dry spots on the surface of the eye. The eyes may become dry and irritated because the tear ducts don\'t produce enough tears, or because of a chemical imbalance in the tears. It is important for patients with this condition to take special care of their eyes to alleviate symptoms and prevent complications.'
    },
    {
      question: 'What causes dry eye?',
      answer: 'Dry eye can result from aging, medications (antihistamines, decongestants, blood pressure medications, antidepressants), medical conditions (rheumatoid arthritis, diabetes, thyroid problems), environmental factors (smoke, wind, air conditioning, dry climates), long-term contact lens use, eye surgery, sun exposure, smoking, thyroid eye disease, eye injury, eyelid surgery, inflammation of the conjunctiva, and exposure keratitis. Women are more affected due to hormonal changes during pregnancy or menopause.'
    },
    {
      question: 'What are the symptoms of dry eye?',
      answer: 'Symptoms usually affect both eyes and may include stinging or burning sensation, irritation from smoke or wind, eyes that feel scratchy, eye fatigue, sensitivity to light, difficulty wearing contact lenses, excessive tearing, and blurry vision. These symptoms can significantly impact daily activities and quality of life if left untreated.'
    },
    {
      question: 'What complications can occur if dry eye is left untreated?',
      answer: 'Left untreated, dry eye can lead to pain, ulcers or scars on the cornea, and loss of vision. Dry eye can damage the eye\'s tissues leaving tiny abrasions on the surface of your eyes, impairing vision. This is why proper diagnosis and treatment are essential for maintaining long-term eye health and clear vision.'
    },
    {
      question: 'What is TearLab Osmolarity testing?',
      answer: <>TearLab is an essential diagnostic test for dry eye syndrome that provides precise and predictive information at the point-of-care. The test measures the osmolarity (salt content) of human tears using nanoliter volumes collected directly from the eyelid margin. It has a positive predictive value of 89% and is more precise than other universally accepted point-of-care tests like cholesterol and glucose. Abnormal osmolarity is indicated by a reading over 300 mOsm/L or an inter-eye difference greater than 8 mOsm/L. Learn more at <a href="https://www.labtician.com" target="_blank" rel="noopener noreferrer">labtician.com</a>.</>
    },
    {
      question: 'How is the TearLab test performed?',
      answer: 'The TearLab Osmolarity Test Card, used with the TearLab Osmolarity System, provides a quick and simple method for determining tear osmolarity. The test card is held by an Osmolarity Test Pen for safe collection of nanoliter volumes of tear fluid directly from the eyelid margin. The test utilizes a temperature-corrected impedance measurement to provide an indirect assessment of osmolarity, which is then calculated and displayed as a quantitative numerical value.'
    },
    {
      question: 'What non-surgical treatments are available for dry eye?',
      answer: 'Non-surgical treatments include blinking on purpose, increasing humidity levels at home or work, using artificial tears or moisturizing ointment, prescription drops like Cequa and Regener-Eyes, stopping smoking or exposure to second-hand smoke, avoiding air conditioning or windy conditions, stopping the use of allergy and cold medicines, and adding omega-3 fatty acids to the diet as food or supplements. Your doctor will recommend the best options based on your condition.'
    },
    {
      question: 'What is Cequa and how does it work?',
      answer: 'Cequa is an FDA-approved medical eye drop specifically for the treatment of chronic dry eye. It works by reducing inflammation and producing natural tears. Dr. Magalhaes may work with your insurance company in approving this medication for your eye condition.'
    },
    {
      question: 'What is Regener-Eyes?',
      answer: 'Regener-Eyes is a powerful biologic eye drop for the treatment of uncomfortable, dry, irritated eyes. It works as an anti-inflammatory and immunomodulatory medicine, containing cytokines, growth factors, and chemokines which help treat corneas and dry eye disease. This is a first-class, natural, biologic ophthalmic solution that represents a truly groundbreaking treatment tool for dry, gritty, irritated eyes. Our office carries this restorative medicine for your convenience.'
    },
    {
      question: 'What are punctal plugs?',
      answer: 'Punctal plugs are small devices inserted into the corners of the eyelids. The procedure is practically painless. They help keep tears on the surface of the eye longer, providing relief from dry eye symptoms. These plugs are a non-permanent solution that can be removed if needed. They are often used when artificial tears and other treatments are not providing sufficient relief.'
    },
    {
      question: 'What is punctal cautery?',
      answer: 'Punctal cautery is a procedure to permanently close the tear drainage holes in the corners of the eyes. This is a more permanent solution than punctal plugs and is considered when long-term blockage of tear drainage is needed. The procedure helps keep natural tears on the eye surface longer, reducing dry eye symptoms.'
    },
    {
      question: 'What is amniotic membrane therapy and how does it help dry eye?',
      answer: <>Amniotic membrane is a unique collagenous tissue derived from the innermost layer of the placenta. It has anti-inflammatory and anti-microbial properties while acting as a natural scaffold that expedites healing. In dry eye treatment, it helps manage corneal and conjunctival disease, promoting rapid healing of damaged ocular surfaces. Dr. Magalhaes is the one and only doctor in the area using this FDA-approved treatment. Learn more at <a href="https://www.biotissue.com" target="_blank" rel="noopener noreferrer">biotissue.com</a>.</>
    },
    {
      question: 'What conditions can amniotic membrane therapy treat?',
      answer: 'Amniotic membranes are used to treat corneal erosions, corneal abrasions, foreign body removal, keratitis, corneal ulcers, chemical and thermal burns, superficial keratectomy, PRK haze, neurotrophic corneal epithelial defects, dry eye, exposure keratopathy, Salzmann\'s nodular degeneration, shield ulcers, and more. Dr. Magalhaes and Associates will determine if you are a candidate for amniotic membrane therapy.'
    },
    {
      question: 'When is surgical treatment necessary for dry eye?',
      answer: 'If non-surgical methods are unsuccessful, surgical treatments may be an option. These include punctal plugs or punctal cautery to reduce tear drainage, and eyelid surgery if an eyelid condition is causing your dry eyes. Your doctor will evaluate your condition and recommend surgical options only when conservative treatments have not provided adequate relief.'
    },
    {
      question: 'How can I prevent dry eye symptoms?',
      answer: 'Prevention includes wearing protective glasses on windy days, giving your eyes breaks during reading or computer work, using a humidifier, staying hydrated, taking omega-3 supplements, avoiding smoke and air conditioning drafts, blinking regularly, and limiting screen time. These lifestyle modifications can effectively reduce the frequency and severity of symptoms, especially for those at increased risk.'
    },
    {
      question: 'Why do women experience dry eye more often than men?',
      answer: 'Dry eye tends to affect women more often than men due to hormonal changes that take place during pregnancy or menopause. Oral contraceptives can also affect the consistency of tears. These hormonal fluctuations can impact tear production and tear film stability, making women more susceptible to dry eye symptoms.'
    },
    {
      question: 'Can medications cause dry eye?',
      answer: 'Yes, many medications can cause or worsen dry eye, including antihistamines, decongestants, blood pressure medications, antidepressants, and certain hormonal medications. If you suspect your medication is contributing to dry eye symptoms, talk to your doctor about possible alternatives or additional treatments to manage the symptoms.'
    },
    {
      question: 'How does Dr. Magalhaes diagnose dry eye?',
      answer: 'Dr. Magalhaes diagnoses dry eye after a thorough evaluation of your eyes and tear production. This includes a comprehensive eye examination, Schirmer tear test to measure tear production, and TearLab Osmolarity testing to measure the salt content of tears. These advanced diagnostic tools help determine the type and severity of dry eye, allowing for a personalized treatment plan.'
    },
    {
      question: 'Is TearLab testing available at your office?',
      answer: 'Yes, we are fortunate to showcase this impressive TearLab technology in our practice to help in the diagnosis and treatment of dry eye. The test provides objective and quantitative point-of-care diagnostic information that is both precise and predictive. Please contact our office for a dry eye evaluation to determine if TearLab testing can help you.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Dry Eye Treatment"
        subtitle="Advanced diagnostics and cutting-edge treatments for lasting relief"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <ProcedureTimeline steps={treatmentSteps} />
        
        <AccordionFAQ faqs={faqs} />

        <div className="cta-section">
          <h2>Find Relief from Dry Eye Discomfort</h2>
          <p>Don't let dry eye affect your quality of life. Schedule a comprehensive evaluation with TearLab testing to get the personalized treatment you need.</p>
          <AppointmentButton className="cta-button" label="Schedule Dry Eye Evaluation" />
        </div>
      </div>
    </div>
  );
};

export default DryEye;