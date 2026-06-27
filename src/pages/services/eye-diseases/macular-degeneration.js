// MacularDegeneration.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  ProcedureTimeline
} from '../../../components/ServiceComponents';
import AppointmentButton from '../../../components/AppointmentButton';
import bioHeadsetImg from '../../../assets/practice/20250928_magalhaes_397.jpg';

import img1 from '../../../assets/stock_photos/eye-diseases/macular-degeneration/macular-degeneration.jpg';
import img2 from '../../../assets/stock_photos/eye-diseases/macular-degeneration/Elder-Eye-exam.jpg';
import img3 from '../../../assets/stock_photos/eye-diseases/macular-degeneration/prevention.jpg';
import img4 from '../../../assets/stock_photos/eye-diseases/macular-degeneration/Doctor.jpg';

const MacularDegeneration = () => {
  const features = [
    { 
      icon: '🔍', 
      title: 'Early Detection', 
      description: 'Maculogix technology detects AMD three years before traditional diagnosis methods.' 
    },
    { 
      icon: '👁️', 
      title: 'Amsler Grid Testing', 
      description: 'Central vision testing to detect early signs of macular degeneration before symptoms appear.' 
    },
    { 
      icon: '💉', 
      title: 'Anti-VEGF Injections', 
      description: 'Intraocular injections to stop abnormal blood vessel growth in wet macular degeneration.' 
    },
    { 
      icon: '💊', 
      title: 'High-Dose Vitamins', 
      description: 'Specialized vitamin and mineral supplements to slow disease progression and clear toxic substances.' 
    },
    { 
      icon: '⚡', 
      title: 'Photodynamic Therapy', 
      description: 'Advanced treatment to remove newly developing abnormal blood vessels.' 
    },
    { 
      icon: '🛡️', 
      title: 'Vision Preservation', 
      description: 'Comprehensive treatment plans to manage the condition and prevent permanent vision loss.' 
    },
  ];

  const sections = [
    {
      tag: 'What is AMD',
      title: 'WHAT IS MACULAR DEGENERATION?',
      content: 'Macular degeneration (AMD) is a leading cause of vision loss in people over the age of 50 and the leading cause of blindness in the United States for this age group. It affects the macula, the part of the retina responsible for crisp, detailed central vision needed for reading or driving. Dry (non-neovascular) AMD is the more common form, developing gradually from aging and thinning of macula tissues. Only about 10 percent of patients progress to the more advanced wet (neovascular) form, in which new blood vessels develop beneath the macula and leak blood and fluid — leading to permanent central vision damage and blind spots that can develop in as little as a few days or weeks.',
      image: img1,
      alt: 'Macular degeneration and its effect on central vision',
    },
    {
      tag: 'Symptoms & Detection',
      title: 'SYMPTOMS AND DETECTION',
      content: 'Dry AMD symptoms include gradual shadowy areas in central vision, fuzzy or distorted vision, difficulty seeing at night, difficulty reading in dim light, worsened visual acuity, and central vision loss. With wet AMD, patients may see straight lines as wavy. Your doctor can detect early signs before symptoms appear through regular eye exams and Amsler grid testing. We also use Ocular Computerized Tomography (OCT) to detect elevations and abnormalities in the retina. Regular comprehensive eye exams are crucial for early detection before permanent side effects occur.',
      image: img2,
      alt: 'Elder patient receiving eye exam for macular degeneration detection',
    },
    {
      tag: 'Causes & Risk Factors',
      title: 'CAUSES AND RISK FACTORS',
      content: 'Many cases result from aging and natural deterioration of eye tissue. Nearly half of AMD-related blindness cases are linked to a genetic deficiency in the complement factor H gene variant. Non-modifiable risk factors include age fifty or older, family history, Caucasian race, female gender, and lighter eye color. Modifiable risk factors include smoking, high cholesterol, diabetes, obesity, chronic sun exposure, high blood pressure, high fat diet, and certain drug side effects. Over 30 percent of adults over 75 have been diagnosed with advanced or intermediate AMD.',
      image: img3,
      alt: 'Risk factors and prevention of macular degeneration',
    },
    {
      tag: 'Technology & Treatment',
      title: 'MACULOGIX TECHNOLOGY & TREATMENT',
      content: 'Maculogix is a revolutionary device that detects AMD three years prior to traditional diagnosis, allowing us to slow disease progression at the subclinical stage before significant damage occurs. Dr. Magalhaes and Associates are proud to bring this cutting-edge technology to the community. While there is no cure for AMD, several treatments help manage the condition and preserve vision. Intraocular anti-VEGF injections are often successful in stopping abnormal blood vessel growth in wet AMD, administered monthly. Photodynamic therapy effectively removes newly developing abnormal blood vessels. High-dose AREDS2 vitamins and mineral supplements slow progression in advanced cases. Continuous treatment is essential to prevent permanent vision loss.',
      image: img4,
      alt: 'Doctor using Maculogix technology and providing AMD treatment',
    },
  ];

  const treatmentSteps = [
    { 
      title: 'Comprehensive Eye Examination', 
      description: 'Complete retinal evaluation including Amsler grid testing and Maculogix screening to detect AMD at the earliest possible stage, even before symptoms appear.' 
    },
    { 
      title: 'Type and Severity Assessment', 
      description: 'Determine whether you have dry or wet macular degeneration and the extent of vision loss to create an appropriate treatment plan.' 
    },
    { 
      title: 'Nutritional Intervention', 
      description: 'Prescription of high-dose AREDS2 vitamins and mineral supplements specifically formulated to slow AMD progression and support retinal health.' 
    },
    { 
      title: 'Advanced Treatment (For Wet AMD)', 
      description: 'Anti-VEGF intraocular injections on a monthly basis and/or photodynamic therapy to stop abnormal blood vessel growth and prevent further damage.' 
    },
    { 
      title: 'Ongoing Monitoring & Lifestyle Modification', 
      description: 'Regular follow-up exams to track disease progression, adjust treatments, and implement lifestyle changes including diet, exercise, and smoking cessation.' 
    },
  ];

  const faqs = [
    {
      question: 'What is macular degeneration?',
      answer: 'Macular degeneration, also known as age-related macular degeneration (AMD), is a common condition in older adults and a leading cause of vision loss in people over the age of 50. It affects the macula, the part of the retina responsible for the crisp, detailed central vision needed for reading or driving. As we age, the tissue in the eye responsible for vision slowly begins to deteriorate, which can significantly affect a patient\'s quality of life.'
    },
    {
      question: 'What is the difference between dry and wet macular degeneration?',
      answer: 'Dry (non-neovascular) macular degeneration is the more common diagnosis and is considered an early stage of the disease, usually developing from aging and thinning of macula tissues. Wet (neovascular) macular degeneration, affecting only about 10 percent of patients, involves new blood vessels developing beneath the macula that cause leakage of blood and fluid. This leakage can lead to permanent damage in central vision and creation of blind spots. Wet AMD is more severe and can cause rapid vision loss.'
    },
    {
      question: 'What are the symptoms of macular degeneration?',
      answer: 'Symptoms of dry AMD include gradual changes to vision such as shadowy areas in central vision, fuzzy and distorted vision, difficulty seeing at night, difficulty reading in dim light, worsened visual acuity, and trouble seeing color and fine details. With wet macular degeneration, patients may see straight lines as wavy, and central vision loss can occur rapidly, sometimes in as little as a few days or weeks.'
    },
    {
      question: 'How quickly can vision loss occur with macular degeneration?',
      answer: 'With dry macular degeneration, vision changes occur gradually over time. However, if the disease progresses to the wet form, central vision loss can occur rapidly, sometimes in as little as a few days or weeks. This is why regular monitoring and prompt treatment of wet AMD are so critical for preserving vision.'
    },
    {
      question: 'What causes macular degeneration?',
      answer: 'Many cases of macular degeneration are a result of aging and the natural deterioration of eye tissue needed for clear vision. The disease can also be related to genetic factors - nearly half of the cases of blindness associated with macular degeneration are linked to a genetic deficiency in the complement factor H gene variant. Other contributing factors include lifestyle and health conditions.'
    },
    {
      question: 'Who is at risk for developing macular degeneration?',
      answer: 'Macular degeneration is most common in females and whites, and risk increases with age. It is the leading cause of blindness in the United States for patients over 50. Over 30 percent of adults over 75 have been diagnosed with advanced or intermediate AMD. Non-modifiable risk factors include age fifty or older, family history, Caucasian race, and lighter eye color.'
    },
    {
      question: 'What modifiable risk factors increase the chance of developing AMD?',
      answer: 'Modifiable risk factors include smoking, high cholesterol, diabetes, obesity, chronic sun exposure, high blood pressure, high fat diet, and side effects of certain drugs. Patients can minimize their risk by practicing a healthy, active lifestyle with regular exercise, avoiding smoking, and eating a balanced diet that includes foods known to preserve vision and prevent eye diseases.'
    },
    {
      question: 'How is macular degeneration diagnosed?',
      answer: 'Your doctor may be able to detect early signs of macular degeneration, before any symptoms occur, through a regular eye exam. Any signs can be further confirmed by testing your central vision with an Amsler grid test. We also use advanced Maculogix technology that can detect AMD three years before traditional diagnosis methods. Helpful to the diagnosis of Macular Degeneration is the use of Ocular Computerized Tomography (OCT), a state of the art device that looks at the critical area and detects elevations and other abnormalities. Regular eye exams are important in detecting macular degeneration as early as possible.'
    },
    {
      question: 'What is an Amsler grid test?',
      answer: 'An Amsler grid test is a simple diagnostic tool used to detect problems with central vision. It consists of a grid of horizontal and vertical lines with a dot in the center. Patients look at the dot and report if any lines appear wavy, blurry, or missing. This test helps confirm signs of macular degeneration and monitor disease progression.'
    },
    {
      question: 'What is Maculogix technology?',
      answer: 'Maculogix is a revolutionary device that detects AMD within the eye three years prior to being diagnosed with traditional methods. Structural changes in the retina are not always easily discernible and often become evident only after AMD has progressed from a subclinical state. Being able to identify the earliest AMD biomarker with such accuracy helps improve outcomes. Dr. Magalhaes and Associates are proud to bring this cutting-edge technology to the community.'
    },
    {
      question: 'How does early detection with Maculogix help?',
      answer: 'With detecting AMD early at the subclinical stage using Maculogix, we can hopefully slow the disease progression. This three-year head start allows us to implement preventive measures and treatments before significant vision damage occurs. Early intervention is key to preserving vision and maintaining quality of life.'
    },
    {
      question: 'Is there a cure for macular degeneration?',
      answer: 'While there is no cure for macular degeneration, there are several treatment options available to help patients manage this condition and preserve their vision. The best treatment option for each patient depends on the severity and type of the condition, as well as how much, if any, permanent vision loss has occurred. Early detection and continuous treatment are essential.'
    },
    {
      question: 'What are anti-VEGF injections?',
      answer: 'Intraocular injections of vascular endothelial growth factor (anti-VEGF) are often successful in stopping abnormal blood vessel growth in wet macular degeneration. The medications are injected into the vitreous of the eye on a monthly basis to control the damaging effects of wet macular degeneration. These injections can help preserve vision and prevent further deterioration.'
    },
    {
      question: 'What is photodynamic therapy?',
      answer: 'Photodynamic therapy is an effective treatment for removing newly developing abnormal blood vessels that are characteristic of wet macular degeneration. This advanced procedure helps control the progression of wet AMD and preserve central vision by targeting and destroying abnormal blood vessels without damaging surrounding healthy tissue.'
    },
    {
      question: 'What role do vitamins play in treating macular degeneration?',
      answer: 'Macular degeneration is considered a nutritional disease, and Dr. Magalhaes and Associates prescribe high-dose vitamins for treatment. Many patients benefit from specialized vitamin and mineral supplements (such as AREDS2 formula), which can clear out toxic substances that may build up in advanced cases of this condition. These supplements have been shown to slow disease progression, particularly in intermediate to advanced stages.'
    },
    {
      question: 'What vitamins are recommended for AMD?',
      answer: 'High-dose AREDS2 formula vitamins are typically recommended for macular degeneration. These contain specific combinations of vitamins C and E, zinc, copper, lutein, and zeaxanthin that have been proven in clinical studies to reduce the risk of progression to advanced AMD. Dr. Magalhaes and Associates will prescribe the appropriate formulation based on your specific condition.'
    },
    {
      question: 'Can lifestyle changes help prevent or slow macular degeneration?',
      answer: 'Yes, patients can minimize their risk and slow progression by practicing a healthy, active lifestyle. This includes regular exercise, avoiding smoking (the most important modifiable risk factor), eating a balanced diet rich in leafy greens and fish, protecting eyes from prolonged sun exposure with UV-blocking sunglasses, managing blood pressure and cholesterol, maintaining a healthy weight, and getting regular eye exams.'
    },
    {
      question: 'What foods help preserve vision and prevent AMD?',
      answer: 'A balanced diet that includes leafy green vegetables (kale, spinach, collards), fish high in omega-3 fatty acids (salmon, tuna, sardines), nuts and legumes, citrus fruits, and colorful vegetables can help preserve vision and support eye health. These foods contain antioxidants and nutrients that protect the macula and may slow AMD progression.'
    },
    {
      question: 'How often should I have eye exams if I have macular degeneration?',
      answer: 'It is essential for patients with macular degeneration, wet or dry, to seek continuous medical treatment to manage their condition and prevent permanent vision loss. The frequency of exams depends on the type and severity of your AMD. Patients with wet AMD receiving injections typically need monthly visits, while those with dry AMD may be monitored every few months to check for progression.'
    },
    {
      question: 'Can macular degeneration be detected before symptoms appear?',
      answer: 'Yes, your doctor may be able to detect early signs of macular degeneration before any symptoms occur through a regular eye exam. Our Maculogix technology can detect AMD three years before traditional diagnosis. This is why regular comprehensive eye exams are so important, especially for those over 50 or with risk factors.'
    },
    {
      question: 'What is the genetic link to macular degeneration?',
      answer: 'Macular degeneration can be related to a genetic factor in patients who have a gene variant known as complement factor H. Nearly half of the cases of blindness associated with macular degeneration are linked to this genetic deficiency. If you have a family history of AMD, you are at increased risk and should have regular eye exams.'
    },
    {
      question: 'Does macular degeneration cause complete blindness?',
      answer: 'Macular degeneration is a leading cause of vision loss and blindness in people over 50, but it typically affects central vision rather than peripheral vision. While patients may lose the ability to see fine details, recognize faces, read, or drive, they usually retain some peripheral vision. However, the vision loss can significantly impact quality of life and independence.'
    },
    {
      question: 'How experienced is Dr. Magalhaes in treating macular degeneration?',
      answer: 'Our doctors have extensive experience in the treatment of macular degeneration and can offer patients the latest, most advanced treatments to help preserve vision and overall quality of life. We use cutting-edge technology like Maculogix for early detection and provide comprehensive treatment options including high-dose vitamins, anti-VEGF injections, and photodynamic therapy.'
    },
    {
      question: 'Why is continuous treatment important for AMD?',
      answer: 'It is essential for patients with macular degeneration, wet or dry, to seek continuous medical treatment to manage their condition and prevent permanent vision loss from occurring. AMD is a progressive disease that can worsen over time without proper management. Regular monitoring allows for timely adjustments to treatment plans and early intervention if the condition progresses from dry to wet AMD. In advanced Wet Macular Degeneration, a proper and timely referral to a retina specialist, locally or in Boston, may be indicated.'
    },
    {
      question: 'What percentage of people over 75 have macular degeneration?',
      answer: 'Over 30 percent of adults over the age of 75 have been diagnosed with advanced or intermediate age-related macular degeneration. This statistic underscores the importance of regular eye exams for older adults and the need for effective treatments to manage this common condition.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Macular Degeneration"
        subtitle="Advanced detection and treatment to preserve your central vision"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />

        {/* Retinal Exam Photo */}
        <div className="practice-photo-banner">
          <img
            src={bioHeadsetImg}
            alt="Doctor performing retinal examination with binocular indirect ophthalmoscope"
            className="practice-photo-banner-img"
          />
          <div className="practice-photo-banner-caption">
            <h3>Advanced Retinal Examination</h3>
            <p>Our doctors use the latest equipment to examine the retina and detect early signs of macular degeneration.</p>
          </div>
        </div>
        
        <ProcedureTimeline steps={treatmentSteps} />
        
        <AccordionFAQ faqs={faqs} />
        
        <div className="cta-section">
          <h2>Protect Your Central Vision</h2>
          <p>Early detection is crucial for preserving your vision. Schedule a comprehensive AMD screening with Maculogix technology to detect macular degeneration years before traditional methods.</p>
          <AppointmentButton className="cta-button" label="Schedule AMD Screening" />
        </div>
      </div>
    </div>
  );
};

export default MacularDegeneration;