// Glaucoma.js
import React from 'react';
import { 
  ServiceHero, 
  AlternatingImageSection, 
  FeatureCards, 
  AccordionFAQ, 
  ProcedureTimeline,
  CTASection 
} from '../../../components/ServiceComponents';
import '../../../components/ServiceComponents.css';

import img1 from '../../../assets/stock_photos/eye-diseases/glaucoma/glaucoma.jpg';
import img2 from '../../../assets/stock_photos/eye-diseases/glaucoma/Risk.jpg';
import img3 from '../../../assets/stock_photos/eye-diseases/glaucoma/Test.jpg';
import img4 from '../../../assets/stock_photos/eye-diseases/glaucoma/Treatment.jpg';

const Glaucoma = () => {
  const features = [
    { 
      icon: '👁️', 
      title: 'Early Detection', 
      description: 'Comprehensive eye exams and annual glaucoma screenings to catch the "sneaky thief of sight" early.' 
    },
    { 
      icon: '🔬', 
      title: 'Advanced Diagnostics', 
      description: 'State-of-the-art equipment including tonometry, visual field testing, and retinal evaluation.' 
    },
    { 
      icon: '💊', 
      title: 'Medical Management', 
      description: 'Prescription eye drops and oral medications to reduce eye pressure and preserve vision.' 
    },
    { 
      icon: '⚡', 
      title: 'Laser Treatments', 
      description: 'Advanced laser procedures including trabeculoplasty, iridotomy, and cyclophotocoagulation.' 
    },
    { 
      icon: '🏥', 
      title: 'Surgical Options', 
      description: 'Trabeculectomy and other surgical interventions when medication and laser are unsuccessful.' 
    },
    { 
      icon: '🛡️', 
      title: 'Vision Preservation', 
      description: 'Comprehensive treatment plans to minimize permanent vision loss and protect your sight.' 
    },
  ];

  const sections = [
    {
      tag: 'What is Glaucoma',
      title: 'WHAT IS GLAUCOMA?',
      content: 'Glaucoma is a group of related diseases that damage the optic nerve resulting in vision loss and blindness. Known as the "sneaky thief of sight," many people with glaucoma experience no symptoms and may not be aware they have the disease until significant vision has been lost. Primary open-angle glaucoma (POAG) is the most common type, accounting for 95% of cases, where fluid drains too slowly causing gradual pressure buildup. Other types include angle-closure glaucoma, which requires immediate attention; low tension glaucoma, which damages the optic nerve despite normal pressure; congenital glaucoma in children; and secondary glaucoma arising from conditions like diabetes or cataracts. With early detection and treatment, eyes can be protected against serious vision loss.',
      image: img1,
      alt: 'Glaucoma and its effect on the optic nerve and vision',
    },
    {
      tag: 'Causes & Risk Factors',
      title: 'CAUSES AND RISK FACTORS',
      content: 'Conditions that contribute to glaucoma include increased pressure within the eye, severe eye infection, injury to the eye, blocked blood vessels, and inflammatory conditions. Risk factors include age, ethnicity, family history of glaucoma, myopia, hyperopia, thin corneas, elevated eye pressure, diabetes, low blood pressure, certain medications, and previous eye conditions or injuries. Glaucoma is more prevalent in African Americans over 40, diabetics, and anyone over 60. It affects 3 million Americans and is the second leading cause of blindness.',
      image: img2,
      alt: 'Glaucoma risk factors and causes',
    },
    {
      tag: 'Symptoms & Diagnosis',
      title: 'SYMPTOMS AND DIAGNOSIS',
      content: 'Open-angle glaucoma symptoms include blind spots in vision that enlarge, loss of peripheral vision, and tunnel vision. Angle-closure glaucoma causes severe eye pain, nausea, vomiting, blurry vision, rainbow halos around lights, red eyes, and headaches — and requires immediate medical attention. Diagnosis requires a comprehensive examination including tonometry to measure eye pressure, dilated eye examination, visual field testing, retinal evaluation, pachymetry to measure cornea thickness, gonioscopy to examine drainage angles, and visual acuity testing. Dr. Magalhaes and Associates are well equipped with state-of-the-art equipment to diagnose this disease.',
      image: img3,
      alt: 'Glaucoma diagnostic testing and symptoms evaluation',
    },
    {
      tag: 'Treatment & Prevention',
      title: 'TREATMENT AND PREVENTION',
      content: 'There is no cure for glaucoma, so treatment focuses on relieving symptoms and preventing further damage. Medical management includes eye drops or oral medications to reduce fluid production or help drain excess fluid. Laser surgery options — including trabeculoplasty, iridotomy, and cyclophotocoagulation — increase fluid outflow or eliminate blockages. Surgical intervention with trabeculectomy creates a new drainage channel when other methods are unsuccessful. Patients can now be treated for all forms of non-surgical glaucoma in our offices. While glaucoma cannot be prevented from developing, regular comprehensive eye examinations, annual glaucoma screenings, and consistent adherence to your treatment plan are essential for preventing progression and preserving vision.',
      image: img4,
      alt: 'Glaucoma treatment options and prevention strategies',
    },
  ];

  const treatmentSteps = [
    { 
      title: 'Comprehensive Eye Examination', 
      description: 'Complete diagnostic evaluation including tonometry, visual field testing, retinal evaluation, pachymetry, and gonioscopy to accurately diagnose glaucoma type and severity.' 
    },
    { 
      title: 'Medical Management Plan', 
      description: 'Prescription eye drops or oral medications tailored to your condition to reduce intraocular pressure and prevent further optic nerve damage.' 
    },
    { 
      title: 'Regular Monitoring', 
      description: 'Ongoing eye pressure checks and visual field tests to ensure treatment effectiveness and adjust medications as needed to maintain optimal eye health.' 
    },
    { 
      title: 'Laser Treatment (If Needed)', 
      description: 'Advanced laser procedures like trabeculoplasty or iridotomy to improve fluid drainage when medications alone are insufficient.' 
    },
    { 
      title: 'Surgical Intervention (When Required)', 
      description: 'Trabeculectomy or other surgical options to create new drainage channels when medication and laser treatments have not achieved desired results.' 
    },
  ];

  const faqs = [
    {
      question: 'What is glaucoma?',
      answer: 'Glaucoma is a group of related diseases that damage the optic nerve resulting in vision loss and blindness. It is a leading cause of blindness and visual impairment in the United States and can affect patients of all ages. Known as the "sneaky thief of sight," many people with glaucoma do not experience any symptoms and may not be aware they have the disease until significant vision loss has occurred.'
    },
    {
      question: 'Why is glaucoma called the "sneaky thief of sight"?',
      answer: 'Glaucoma is called the "sneaky thief of sight" because many people affected with glaucoma do not experience any symptoms and may not be aware that they have the disease until they have lost a significant amount of vision. The disease often progresses silently, making regular eye exams crucial for early detection and treatment.'
    },
    {
      question: 'What causes glaucoma?',
      answer: 'Glaucoma can be caused by several conditions including increased pressure within the eye, severe eye infection, injury to the eye, blocked blood vessels, and inflammatory conditions of the eye. These factors can damage the optic nerve and lead to vision loss if not properly treated.'
    },
    {
      question: 'What is primary open-angle glaucoma (POAG)?',
      answer: 'Primary open-angle glaucoma, or POAG, is the most common type of glaucoma, accounting for about 95 percent of all glaucoma cases. It occurs when the fluid in the eye drains too slowly through the network of tiny drainage channels known as the trabecula. The pressure in the eye increases as fluid continues to build, and vision loss occurs gradually and may not be noticed until it becomes irreversible.'
    },
    {
      question: 'What is angle-closure glaucoma?',
      answer: 'Angle-closure glaucoma occurs when the tiny drainage channels (trabecula) become blocked, causing a sudden rise in eye pressure. This condition is not common but when it occurs it requires immediate medical attention. Symptoms include severe eye pain, nausea, vomiting, blurry vision, rainbow halos around lights, red eyes, and headache.'
    },
    {
      question: 'What is low tension glaucoma?',
      answer: 'Low tension glaucoma (LTG) is a form of open-angle glaucoma that occurs when the optic nerve is damaged despite normal eye pressure levels. A reduction in the blood supply to the optic nerve may be the cause of this condition. This type demonstrates that glaucoma can occur even without elevated eye pressure.'
    },
    {
      question: 'What is congenital glaucoma?',
      answer: 'Congenital glaucoma affects children who have a defect in the angle of the eye that causes fluid to drain slowly from the eye. With prompt surgical intervention, this condition can be corrected. Early detection and treatment are crucial for preserving vision in children with this condition.'
    },
    {
      question: 'What is secondary glaucoma?',
      answer: 'Secondary glaucoma develops as a complication from another medical condition such as diabetes, cataract, eye tumor, eye injury, or uveitis. It may also result from previous eye surgery. Treatment focuses on addressing both the underlying condition and managing the glaucoma itself.'
    },
    {
      question: 'What are pigmentary and pseudoexfoliation glaucoma?',
      answer: 'Pigmentary glaucoma occurs when pigment from the iris blocks the trabecula, resulting in slower fluid drainage. Pseudoexfoliation glaucoma develops when extra material in the eye blocks the trabecula, also causing slower drainage. Both types can lead to increased eye pressure and optic nerve damage.'
    },
    {
      question: 'Who is at risk for developing glaucoma?',
      answer: 'Risk factors include age (especially over 60), ethnicity (more prevalent in African Americans over 40), family history of glaucoma, myopia or hyperopia, thin corneas, elevated eye pressure, diabetes, low blood pressure, certain medications, previous eye injury, or existing eye conditions. Glaucoma affects 3 million Americans and is the second leading cause of blindness.'
    },
    {
      question: 'What are the symptoms of open-angle glaucoma?',
      answer: 'Symptoms of open-angle glaucoma include blank spots in the vision that enlarge over time, loss of peripheral vision, and tunnel vision in one or both eyes. However, in early stages, there may be no noticeable symptoms, which is why regular eye exams are so important for detection.'
    },
    {
      question: 'What are the symptoms of angle-closure glaucoma?',
      answer: 'Symptoms of angle-closure glaucoma include severe eye pain, nausea, vomiting, blurry vision, rainbow halos around lights, red eyes, and headache. This is a medical emergency that requires immediate attention to prevent permanent vision loss.'
    },
    {
      question: 'How is glaucoma diagnosed?',
      answer: 'Glaucoma is diagnosed after a comprehensive medical examination of the eye and review of medical history. Tests include tonometry to measure eye pressure, dilated eye examination, visual field testing (perimetry), retinal evaluation, pachymetry to measure cornea thickness, gonioscopy to examine drainage angles, and visual acuity testing. Dr. Magalhaes and Associates are equipped with state-of-the-art equipment for accurate diagnosis.'
    },
    {
      question: 'What is tonometry?',
      answer: 'Tonometry is a diagnostic test that measures the pressure inside your eye (intraocular pressure). Elevated eye pressure is a major risk factor for glaucoma, and regular tonometry testing is essential for monitoring and managing the condition. This quick, painless test is a standard part of comprehensive eye examinations.'
    },
    {
      question: 'What is a visual field test?',
      answer: 'A visual field test (perimetry) measures your entire scope of vision, including peripheral vision. It helps detect blind spots or areas of vision loss caused by glaucoma damage to the optic nerve. This test is crucial for diagnosing glaucoma and monitoring its progression over time.'
    },
    {
      question: 'How is glaucoma treated?',
      answer: 'There is no cure for glaucoma, so treatment focuses on relieving symptoms and preventing further damage. Treatment should begin as soon as possible after diagnosis to minimize the risk of permanent vision loss. Options include medication (eye drops or oral), laser surgery, and conventional surgery, depending on the type and severity of glaucoma.'
    },
    {
      question: 'What medications are used to treat glaucoma?',
      answer: 'Eye drops or oral medications are used to either reduce fluid production in the front of the eye or help drain excess fluid, lowering eye pressure. Side effects may include redness, stinging, irritation, or blurry vision. While glaucoma often has no symptoms, regular use of medication is needed to keep eye pressure under control. Patients should inform their doctor about any medications they are taking or allergies they have.'
    },
    {
      question: 'What laser treatments are available for glaucoma?',
      answer: 'Laser surgery options include trabeculoplasty, iridotomy, and cyclophotocoagulation. These procedures aim to increase the outflow of fluid from the eye or eliminate fluid blockages. Laser treatments are typically used when medications are insufficient or as an alternative to medication in some cases.'
    },
    {
      question: 'What is a trabeculectomy?',
      answer: 'A trabeculectomy is a surgical procedure that creates a new channel to drain fluid from the eye and reduce the pressure that causes glaucoma. This surgery is performed only after medication and laser procedures have been unsuccessful. It is an effective option for controlling eye pressure when other treatments have not worked.'
    },
    {
      question: 'Can glaucoma be prevented?',
      answer: 'There is no way to prevent glaucoma from developing. However, you can prevent it from progressing by getting regular comprehensive eye examinations, annual glaucoma screenings, and following your doctor-recommended treatment plan. Early detection and consistent treatment are key to preserving vision.'
    },
    {
      question: 'How often should I have my eyes examined for glaucoma?',
      answer: 'Everyone should have regular comprehensive eye examinations, and those at higher risk should have annual glaucoma screenings. The frequency may increase based on your age, risk factors, and whether you have been diagnosed with glaucoma. Regular monitoring is essential since glaucoma can progress without noticeable symptoms.'
    },
    {
      question: 'Can glaucoma cause blindness?',
      answer: 'Yes, glaucoma is the second leading cause of blindness and a leading cause of visual impairment in the United States. However, with early detection and proper treatment, vision loss can often be prevented or minimized. This is why regular eye exams are so important, especially for those at higher risk.'
    },
    {
      question: 'Can glaucoma be treated in your office?',
      answer: 'Yes, patients can now be treated for all forms of non-surgical glaucoma in our offices, avoiding needless referrals. Dr. Magalhaes and Associates are well equipped with state-of-the-art equipment to both diagnose and treat this debilitating disease. We offer comprehensive care from initial diagnosis through medical and laser treatment.'
    },
    {
      question: 'What happens if I don\'t treat my glaucoma?',
      answer: 'Without treatment, glaucoma will continue to damage the optic nerve, leading to progressive vision loss. This damage is irreversible, and if left untreated, glaucoma can result in permanent blindness. Once vision is lost to glaucoma, it cannot be restored, which is why early detection and consistent treatment are absolutely critical.'
    },
    {
      question: 'Is glaucoma hereditary?',
      answer: 'Yes, family history of glaucoma is a significant risk factor. If you have a parent, sibling, or other close family member with glaucoma, your risk of developing the disease is increased. This is another reason why regular eye exams are important, especially if glaucoma runs in your family.'
    },
  ];

  return (
    <div className="service-page">
      <ServiceHero 
        title="Glaucoma Treatment"
        subtitle="Protecting your vision from the 'sneaky thief of sight' with advanced care"
      />
      
      <div className="service-page-content">
        <FeatureCards features={features} />
        
        <AlternatingImageSection sections={sections} />
        
        <ProcedureTimeline steps={treatmentSteps} />
        
        <AccordionFAQ faqs={faqs} />
        
        <CTASection 
          title="Protect Your Vision from Glaucoma"
          description="Early detection is key to preventing vision loss. Schedule your comprehensive glaucoma screening today with our state-of-the-art diagnostic equipment."
          buttonText="Schedule Glaucoma Screening"
          onButtonClick={() => {
            console.log('Navigate to booking page');
          }}
        />
      </div>
    </div>
  );
};

export default Glaucoma;