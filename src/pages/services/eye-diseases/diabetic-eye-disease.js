// DiabeticEyeDisease.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  ProcedureTimeline,
  CTASection 
} from '../../../components/ServiceComponents';

import img1 from '../../../assets/stock_photos/eye-diseases/diabetic-eye-disease/Diabetic-eye-disease.jpg';
import img2 from '../../../assets/stock_photos/eye-diseases/diabetic-eye-disease/Stages.jpg';
import img3 from '../../../assets/stock_photos/eye-diseases/diabetic-eye-disease/Treatment.jpg';
import img4 from '../../../assets/stock_photos/eye-diseases/diabetic-eye-disease/Prevention.jpg';

const DiabeticEyeDisease = () => {
  const features = [
    { 
      icon: '🔍', 
      title: 'Early Detection', 
      description: 'Comprehensive dilated eye exams to detect diabetic retinopathy before vision loss occurs.' 
    },
    { 
      icon: '📊', 
      title: 'Advanced Diagnostics', 
      description: 'Fluorescein angiography, retinal exams, and visual acuity testing for accurate diagnosis.' 
    },
    { 
      icon: '💉', 
      title: 'Multiple Treatment Options', 
      description: 'Laser procedures, Anti-VEGF injections, and vitrectomy surgery for advanced cases.' 
    },
    { 
      icon: '💊', 
      title: 'DVS Prevention', 
      description: 'Strong nutraceutical proven to strengthen retinal blood vessels and support diabetic eye health.' 
    },
    { 
      icon: '👁️', 
      title: 'Vision Preservation', 
      description: 'Prompt treatment to prevent progression and preserve your precious vision.' 
    },
    { 
      icon: '🩺', 
      title: 'Ongoing Monitoring', 
      description: 'Twice-yearly comprehensive exams for diabetics to catch changes early.' 
    },
  ];

  const sections = [
    {
      tag: 'What is Diabetic Eye Disease',
      title: 'WHAT IS DIABETIC EYE DISEASE?',
      content: 'Patients with diabetes are at higher risk for developing eye conditions, with over 40 percent developing some form of eye disease. Diabetic retinopathy is the most common diabetic eye disease and the primary cause of blindness in the United States, especially in younger populations. Diabetes can damage blood vessels in the eye, causing blood or fluid to leak from the retina or new blood vessels to grow on its surface. Early stages usually show no symptoms, making regular comprehensive dilated eye exams crucial. As the disease progresses, symptoms may include blurry or doubled vision, flashing lights, blank spots, dark floaters, pain or pressure in the eyes, or problems with peripheral vision.',
      image: img1,
      alt: 'Diabetic eye disease and its effects on vision',
    },
    {
      tag: 'Stages',
      title: 'STAGES OF DIABETIC RETINOPATHY',
      content: 'There are four distinct stages: Mild nonproliferative (microaneurysms develop in tiny retinal blood vessels), Moderate nonproliferative (blood vessels become blocked), Severe nonproliferative (blood supply to retina is blocked), and Proliferative retinopathy (new blood vessels grow alongside the retina). During any stage, macula edema can develop — fluid buildup in the macula causing blurred vision. About half of people with proliferative retinopathy are diagnosed with macula edema.',
      image: img2,
      alt: 'Stages of diabetic retinopathy progression',
    },
    {
      tag: 'Treatment',
      title: 'TREATMENT OPTIONS',
      content: 'The first three stages require blood sugar, blood pressure, and cholesterol control. Proliferative retinopathy is treated with scatter laser treatment to shrink abnormal blood vessels. Severe bleeding may require vitrectomy surgery. Macula edema is treated with focal laser treatment — several hundred small laser burns placed around the macula to prevent leakage and reduce fluid. Anti-VEGF injections into the eye are also used. Our doctors carefully assess each individual situation.',
      image: img3,
      alt: 'Treatment options for diabetic eye disease',
    },
    {
      tag: 'Prevention',
      title: 'PREVENTION AND RISK REDUCTION',
      content: 'Prevention is best accomplished with careful and consistent eye examinations twice yearly. DVS, a strong nutraceutical, has been proven to strengthen retinal blood vessels and support diabetic eye health. Risk reduction includes monitoring vision changes, keeping A1C levels under 7%, managing blood pressure and cholesterol, eating a healthy diet, and participating in regular exercise. The length of time a patient has diabetes determines the likelihood of developing diabetic retinopathy.',
      image: img4,
      alt: 'Prevention and risk reduction for diabetic eye disease',
    },
  ];

  const riskReductionSteps = [
    { 
      title: 'Annual Comprehensive Eye Exams', 
      description: 'All diabetics need annual comprehensive dilated eye exams. We generally recommend diabetics be seen twice yearly for optimal monitoring.' 
    },
    { 
      title: 'Blood Sugar Management', 
      description: 'Keep A1C levels under 7% through diet, medication, and lifestyle modifications. Monitor blood sugar levels consistently to prevent disease progression.' 
    },
    { 
      title: 'Blood Pressure & Cholesterol Control', 
      description: 'Monitor and manage blood pressure and cholesterol levels as these significantly impact retinal blood vessel health.' 
    },
    { 
      title: 'DVS Supplementation', 
      description: 'Use DVS, a strong nutraceutical proven to strengthen retinal blood vessels and support eye health in diabetics.' 
    },
    { 
      title: 'Healthy Lifestyle', 
      description: 'Eat a healthy diet, participate in regular exercise, and monitor any changes in your vision closely.' 
    },
  ];

  const faqs = [
    {
      question: 'What is diabetic eye disease?',
      answer: 'Diabetic eye disease is a combination of various eye conditions that develop as a result of diabetes, including diabetic retinopathy, cataracts, and glaucoma. Patients with diabetes are at higher risk for developing these conditions, with over 40 percent of diabetics developing some form of eye disease. They are more likely to lose their precious vision without proper monitoring and treatment.'
    },
    {
      question: 'What is diabetic retinopathy?',
      answer: 'Diabetic retinopathy is the most common diabetic eye disease and the primary cause of blindness in the United States, especially in younger populations. It occurs when diabetes damages blood vessels in the eye, causing blood or fluid to leak from the retina or new blood vessels to grow on the retina surface, leading to significant vision damage and reduced quality of life.'
    },
    {
      question: 'What are the four stages of diabetic retinopathy?',
      answer: 'The four stages are: (1) Mild nonproliferative retinopathy - microaneurysms develop in tiny retinal blood vessels; (2) Moderate nonproliferative retinopathy - blood vessels to the retina become blocked; (3) Severe nonproliferative retinopathy - blood supply to the retina is blocked; (4) Proliferative retinopathy - new blood vessels grow alongside the retina to replace blocked vessels.'
    },
    {
      question: 'What is macula edema?',
      answer: 'Macula edema is the buildup of fluid in the macula, the light-sensitive part of the retina that allows us to see objects with great detail. As the macula swells, vision becomes blurred. It can develop during any stage of diabetic retinopathy. About half of people with proliferative retinopathy are diagnosed with macula edema. It is often monitored, treated with laser, or treated with Anti-VEGF injections into the eye.'
    },
    {
      question: 'What are the symptoms of diabetic retinopathy?',
      answer: 'Early stages usually show no symptoms. As the disease progresses, symptoms may include blurry or doubled vision, flashing lights, blank spots in vision, dark floaters or spots, pain or pressure in either or both eyes, problems with peripheral vision, or severe vision loss or blindness. Patients may not notice any changes at first, which is why regular eye exams are crucial.'
    },
    {
      question: 'How is diabetic retinopathy diagnosed?',
      answer: 'After a thorough medical examination of the eyes, diagnostic tests include visual acuity test, dilated eye examination, tonometry test (eye pressure), retinal exam, and fluorescein angiogram (imaging dye test that shows blood flow in the retina). These tests help determine the stage and severity of diabetic retinopathy.'
    },
    {
      question: 'How is diabetic retinopathy treated?',
      answer: 'Treatment depends on the stage. The first three stages require controlling blood pressure, cholesterol, and blood sugar - treatment is not always required. Proliferative retinopathy (stage 4) is treated with scatter laser treatment to shrink abnormal blood vessels. Severe bleeding may require vitrectomy surgery to remove blood from the eye. Macula edema is treated with focal laser treatment or Anti-VEGF injections.'
    },
    {
      question: 'What is scatter laser treatment?',
      answer: 'Scatter laser treatment is a laser surgery procedure used to treat proliferative retinopathy. During the procedure, the abnormal blood vessels are ablated (destroyed), causing them to shrink. This procedure works best once the blood vessels begin to bleed and helps prevent further vision loss.'
    },
    {
      question: 'What is focal laser treatment for macula edema?',
      answer: 'Focal laser treatment involves placing several hundred small laser burns in the areas of retinal leakage around the macula to prevent leakage and reduce fluid in the retina. This helps reduce the risk of vision loss and may improve lost vision in a small number of cases. The procedure is performed in your doctor\'s office and can usually be completed in just one session.'
    },
    {
      question: 'What are Anti-VEGF injections?',
      answer: 'Anti-VEGF injections are medications injected into the eye to treat macula edema and other complications of diabetic retinopathy. These injections help reduce abnormal blood vessel growth and leakage. Dr. Magalhaes and Associates carefully assess each individual situation to determine if Anti-VEGF injections are appropriate.'
    },
    {
      question: 'How often should diabetics have eye exams?',
      answer: 'Patients with diabetes need to have an annual comprehensive dilated eye exam at minimum. However, we generally like to see diabetics twice yearly for optimal monitoring. The length of time a patient has diabetes will determine the likelihood of developing diabetic retinopathy, making regular monitoring essential.'
    },
    {
      question: 'What is DVS and how does it help?',
      answer: 'DVS is a strong nutraceutical (nutritional supplement) that has been proven to strengthen the blood vessels of the retina. Prevention of diabetic bleeding into the retina is best accomplished with careful eye examinations and compliant use of DVS. This vitamin has been proven to help support the eye health of diabetics.'
    },
    {
      question: 'How can I reduce my risk of developing diabetic retinopathy?',
      answer: 'Reduce your risk by: monitoring changes in vision, keeping A1C levels under 7%, monitoring and managing blood pressure levels, eating a healthy diet, participating in regular exercise, monitoring and managing cholesterol levels, having comprehensive eye exams twice yearly, and using DVS supplementation to strengthen retinal blood vessels.'
    },
    {
      question: 'What percentage of diabetics develop eye disease?',
      answer: 'Over 40 percent of patients in the United States diagnosed with diabetes have some form of diabetic retinopathy. This makes regular eye examinations crucial for all diabetic patients, as early detection and treatment can prevent vision loss.'
    },
    {
      question: 'Can diabetic retinopathy be prevented?',
      answer: 'While it cannot always be completely prevented, the risks can be significantly minimized through careful blood sugar control (A1C under 7%), blood pressure and cholesterol management, healthy lifestyle choices, twice-yearly comprehensive eye exams, and DVS supplementation. Early detection through regular monitoring is key to preventing progression and vision loss.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Diabetic Eye Disease"
        subtitle="Comprehensive care to preserve your vision and prevent diabetic retinopathy"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <ProcedureTimeline steps={riskReductionSteps} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Protect Your Vision from Diabetes"
          description="If you have diabetes, regular eye exams are essential. Schedule your comprehensive dilated eye exam today to detect and prevent diabetic retinopathy."
          buttonText="Schedule Eye Exam"
        />
      </div>
    </div>
  );
};

export default DiabeticEyeDisease;